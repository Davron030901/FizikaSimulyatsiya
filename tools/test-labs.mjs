import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../apps/web/public/laboratoriya');
const require=createRequire(import.meta.url);
for(const file of ['engine','mechanics','fields-fluids','thermal-electric','optics-quantum','scenes'])require(resolve(root,file+'.js'));
const {models,collision,damped,kepler}=globalThis.PhysicsEngine;
const catalog=JSON.parse(readFileSync(resolve(root,'catalog.json'),'utf8'));
const topics=catalog.flatMap(s=>s.topics);
const near=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
function parameters(topic){const m=models[topic.code];return m.parameters||[topic.sim.paramA,topic.sim.paramB,...m.extra];}
function defaults(code){const t=topics.find(t=>t.code===code);return Object.fromEntries(parameters(t).map(p=>[p.key,p.value]));}
function calc(code,p,t=0){return models[code].evaluate({...defaults(code),...p},t);}
function finiteTree(value,path){if(typeof value==='number')assert.ok(Number.isFinite(value),path);else if(value&&typeof value==='object')for(const [k,v] of Object.entries(value))finiteTree(v,path+'.'+k);}
const ctx=new Proxy({}, {get:(_,name)=> (...args)=>{for(const arg of args)if(typeof arg==='number')assert.ok(Number.isFinite(arg),'Canvas '+String(name)+' received '+arg);if(name==='arc')assert.ok(args[2]>0);},set:()=>true});
test('13 sections, 123 unique topics, exact model and scene coverage',()=>{
 assert.equal(catalog.length,13);assert.equal(topics.length,123);assert.equal(new Set(topics.map(t=>t.slug)).size,123);
 assert.deepEqual(Object.keys(models).sort(),topics.map(t=>t.code).sort());
 for(const t of topics){assert.ok(PhysicsScenes.kinds.has(models[t.code].kind),t.code);assert.ok(existsSync(resolve(root,t.slug+'.html')),t.slug);assert.match(readFileSync(resolve(root,t.slug+'.html'),'utf8'),new RegExp('data-topic="'+t.slug+'"'));}
});
for(const section of catalog)test(section.code+' '+section.titleUz+': all parameter corners and times yield finite models and canvas calls',()=>{
 for(const topic of section.topics){const model=models[topic.code],params=parameters(topic),base=defaults(topic.code);assert.equal(new Set(params.map(p=>p.key)).size,params.length,'duplicate parameters '+topic.code);
  const cases=[base];for(let mask=0;mask<2**params.length;mask++)cases.push(Object.fromEntries(params.map((p,i)=>[p.key,mask&(1<<i)?p.max:p.min])));
  for(const p of cases){const end=model.duration(p);assert.ok(Number.isFinite(end)&&end>0,topic.code+' duration');for(const time of [0,end*.25,end*.5,end]){const result=model.evaluate(p,time);assert.ok(result.metrics.length,topic.code);finiteTree(result,topic.code);PhysicsScenes.draw(ctx,model,p,result,time,true);}}
 }
});
test('Every parameter sweep used by graphs is defined; no NaN/Infinity',()=>{
 for(const topic of topics){const model=models[topic.code],base=defaults(topic.code);for(const p of parameters(topic))for(let i=0;i<=40;i++){let value=p.min+(p.max-p.min)*i/40;if(['n','Z','N','A','m'].includes(p.key)&&['6.11','8.8','13.3','13.4','13.6','13.7'].includes(topic.code))value=Math.round(value);const input={...base,[p.key]:value};const result=model.evaluate(input,model.duration(input)/2);finiteTree(result,topic.code+' '+p.key);}}
});
test('Projectile landing, complementary ranges, free-fall energy',()=>{
 const a=calc('1.5',{v0:20,theta:30}),b=calc('1.5',{v0:20,theta:60});near(a.scene.range,b.scene.range);
 near(calc('1.5',{v0:20,theta:30},a.scene.flight).scene.y,0);
 for(const t of [0,.2,.5,1]){const r=calc('3.5',{h:10,m:5},t);near(r.scene.kinetic+r.scene.potential,490);}
});
test('Collision momentum and restitution hold for all masses and e; energy never grows',()=>{
 for(const m1 of [.5,3,20])for(const m2 of [.5,8,20])for(const e of [0,.25,.75,1]){const r=collision(m1,m2,8,-2,e);near(m1*r.v1+m2*r.v2,r.p);near(r.v2-r.v1,e*10);assert.ok(r.after<=r.before+1e-9);if(e===1)near(r.after,r.before);if(e===0)near(r.v1,r.v2);}
});
test('Damped motion initial conditions and critical/overdamped limits',()=>{
 for(const [g,w] of [[.3,5],[1,1],[3,.5],[0,5]]){near(damped(g,w,0),1);near((damped(g,w,1e-6)-1)/1e-6,0,1e-4);assert.ok(Math.abs(damped(g,w,3))<=1);}
 near(damped(1,1,1),2/Math.E);
});
test('Kepler solutions lie on ellipse and obey equation',()=>{
 for(const e of [0,.2,.9,.95])for(let mean=0;mean<6.2;mean+=.1){const q=kepler(2,e,mean);near(q.E-e*Math.sin(q.E),mean);near((q.x+2*e)**2/4+q.y*q.y/(4*(1-e*e)),1);}
 near(calc('7.8',{a:4,M:1}).metrics[0].value,8);
});
test('Hydraulics, energy, and circuit reference values',()=>{
 near(calc('9.3',{F1:100,ratio:20}).metrics[0].value,2000);
 near(calc('9.2',{rho:1000,h:10}).metrics[0].value,98000);
 near(calc('10.2',{T:600,V:22}).metrics[0].value/calc('10.2',{T:300,V:22}).metrics[0].value,2);
 near(calc('10.6',{Q:1000,dV:2}).metrics[1].value,800);
 near(calc('11.6',{U:12,R:30}).metrics[0].value,.4);
 near(calc('11.7',{R1:20,R2:30}).metrics[1].value,12);
});
test('Optical singularities and quantum thresholds are explicit',()=>{
 near(calc('12.3',{alpha:40,n:1}).metrics[0].value,40);
 assert.equal(calc('12.4',{alpha:60,n:1.5}).scene.tir,true);
 assert.equal(calc('12.6',{d:10,F:10}).scene.image,null);
 assert.ok(calc('12.6',{d:5,F:10}).scene.image<0);
 near(calc('12.10',{phi:90,I0:50}).metrics[0].value,0);
 assert.equal(calc('13.2',{lambda:800,A:6}).scene.emit,false);
 assert.equal(calc('13.2',{lambda:100,A:1}).scene.emit,true);
 assert.ok(calc('13.4',{n:3,m:3}).warning);
 near(calc('13.9',{T:5730,t:5730},5730).scene.fraction,.5);
});
test('Invalid physical combinations are identified',()=>{
 assert.ok(calc('10.9',{Q1:100,Q2:9000}).warning);
 assert.ok(calc('10.10',{T1:300,T2:600}).warning);
 assert.ok(calc('6.2',{I:.05,d:2,mass:50}).warning);
 assert.ok(calc('9.11',{eta:.001,r:20}).warning);
});
test('Every local script and stylesheet reference resolves',()=>{
 const html=readFileSync(resolve(root,'index.html'),'utf8');for(const match of html.matchAll(/(?:src|href)="([^"#?]+\.(?:js|css))"/g))assert.ok(existsSync(resolve(root,match[1])),match[1]);
});
