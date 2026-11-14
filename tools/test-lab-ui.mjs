// DOM contract tests, not browser rendering tests.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve('apps/web/public/laboratoriya');
const catalog=JSON.parse(readFileSync(resolve(root,'catalog.json'),'utf8'));
const scripts=['engine','mechanics','fields-fluids','thermal-electric','optics-quantum','scenes','app'].map(f=>readFileSync(resolve(root,f+'.js'),'utf8'));
function boot(slug){
 const elements=new Map(),storage=new Map(),downloads=[];
 const canvas=new Proxy({}, {get:()=>()=>{},set:()=>true});
 function el(id){if(elements.has(id))return elements.get(id);const e={id,value:'',hidden:false,disabled:false,checked:true,dataset:{},textContent:'',attrs:{},events:{},options:[],getContext:()=>canvas,addEventListener(n,f){this.events[n]=f;},setAttribute(k,v){this.attrs[k]=v;},focus(){},click(){downloads.push(this.download);},get selectedOptions(){return this.options.filter(o=>o.value===this.value);},set innerHTML(html){this.html=html;this.options=[...html.matchAll(/<option value="([^"]*)"[^>]*>(.*?)<\/option>/g)].map(m=>({value:m[1],textContent:m[2]}));if(this.options.length)this.value=this.options[0].value;},get innerHTML(){return this.html||'';}};elements.set(id,e);return e;}
 el('section-select').innerHTML='<option value="">Barcha bo‘limlar</option>';
 const tabs=['explain','formula','practice'].map(x=>{const e=el('tab-'+x);e.dataset.tab=x;return e;});
 const doc={body:{dataset:{topic:slug}},hidden:false,getElementById:el,querySelectorAll:()=>tabs,createElement:()=>el('download'),addEventListener(){}};
 const context=vm.createContext({document:doc,location:{href:'http://localhost/laboratoriya/index.html'},URL,Blob,Intl,console,setTimeout:()=>0,clearTimeout(){},requestAnimationFrame(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},PHYSICS_CATALOG:catalog});
 for(const src of scripts)vm.runInContext(src,context,{timeout:5000});
 return {el,context,storage,downloads};
}
for(const section of catalog)test(section.titleUz+' UI initialization, controls, graphs, snapshots and export',()=>{
 for(const topic of section.topics){const {el,context,storage,downloads}=boot(topic.slug);assert.equal(el('topic-title').textContent,topic.titleUz);assert.ok(el('metrics').innerHTML.includes('metric'));
 el('favorite').onclick();assert.ok(storage.get('physicslab-favorites-v2').includes(topic.slug));el('complete').onclick();
 el('snapshot').onclick();assert.equal(el('comparison').hidden,false);el('clear-snapshots').onclick();assert.equal(el('comparison').hidden,true);
 const m=context.PhysicsEngine.models[topic.code],params=m.parameters||[topic.sim.paramA,topic.sim.paramB,...m.extra];
 for(const p of params){el('range-'+p.key).events.input({target:{value:String(p.max)}});assert.equal(el('number-'+p.key).value,String(p.max));}
 el('defaults').onclick();el('timeline').oninput({target:{value:'500'}});el('graph-y').value='0';el('graph-y').onchange();
 el('export').onclick();assert.equal(downloads.at(-1),'physicslab-'+topic.slug+'.csv');el('reset').onclick();
 }
});
test('Catalog search, section and favorite filters',()=>{const {el}=boot('');assert.equal((el('cards').innerHTML.match(/class="topic-card/g)||[]).length,123);el('search').value='xyz-no-match';el('search').events.input();assert.equal(el('empty').hidden,false);el('search').value='';el('section-select').value=catalog[0].slug;el('section-select').events.change();assert.equal((el('cards').innerHTML.match(/class="topic-card/g)||[]).length,8);});

