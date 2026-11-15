import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=resolve(root,'apps/api/prisma/data');
const out=resolve(root,'apps/web/public/laboratoriya');
mkdirSync(out,{recursive:true});
export const sections=readdirSync(dir).filter(n=>/^\d\d-.*\.ts$/.test(n)).sort().map(file=>{
 const source=stripTypeScriptTypes(readFileSync(resolve(dir,file),'utf8')).replace(/export const (\w+)/,'const $1');
 const name=source.match(/const (\w+)\s*=\s*\{/)[1];
 return vm.runInNewContext(source+';'+name,{}, {timeout:1000});
});
writeFileSync(resolve(out,'catalog.js'),'globalThis.PHYSICS_CATALOG = '+JSON.stringify(sections,null,2)+';\n');
writeFileSync(resolve(out,'catalog.json'),JSON.stringify(sections,null,2));
console.log(sections.map(s=>s.code+' '+s.titleUz+': '+s.topics.length).join('\n'));
console.log('TOTAL',sections.reduce((n,s)=>n+s.topics.length,0));
if(process.argv.includes('--list'))for(const s of sections)for(const t of s.topics)console.log(t.code+' '+t.slug+' '+JSON.stringify([t.sim.paramA,t.sim.paramB]));
const require=createRequire(import.meta.url);
for(const file of ['engine','mechanics','fields-fluids','thermal-electric','optics-quantum','scenes'])require(resolve(out,file+'.js'));
const topics=sections.flatMap(s=>s.topics.map(t=>({...t,sectionSlug:s.slug,sectionTitle:s.titleUz})));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shell=readFileSync(resolve(out,'shell.html'),'utf8');
for(const t of topics){
 const model=globalThis.PhysicsEngine.models[t.code];
 if(!model||!globalThis.PhysicsScenes.kinds.has(model.kind))throw Error('Missing implementation: '+t.code);
 const html=shell.replace('data-topic=""','data-topic="'+escape(t.slug)+'"').replace('<title>PhysicsLab — 123 interaktiv tajriba</title>','<title>'+escape(t.code+' '+t.titleUz)+' — PhysicsLab</title>');
 writeFileSync(resolve(out,t.slug+'.html'),html);
}
writeFileSync(resolve(out,'index.html'),shell);
writeFileSync(resolve(root,'apps/web/src/lib/lab-index.json'),JSON.stringify(topics.map(t=>({slug:t.slug,title:t.titleUz,section:t.sectionSlug})),null,2));
writeFileSync(resolve(out,'coverage.json'),JSON.stringify(sections.map(s=>({section:s.titleUz,code:s.code,topics:s.topics.map(t=>({code:t.code,slug:t.slug,title:t.titleUz,scene:globalThis.PhysicsEngine.models[t.code].kind,formula:globalThis.PhysicsEngine.models[t.code].formula}))})),null,2));
console.log('Generated '+topics.length+' standalone topic pages and index.html');

