import { Kind, values } from './physics';
export default function ExperimentGraph({kind,p}:{kind:Kind;p:number[]}) {
 const base=values(kind,p,0);
 const timed=['projectile','pendulum','spring','wave','orbit'].includes(kind);
 const end=kind==='projectile'?base.flight:kind==='orbit'?base.period:base.period?base.period*2:5;
 const max=timed?end:kind==='circuit'?24:kind==='optics'?80:600;
 const key=kind==='projectile'?'y':kind==='pendulum'?'angle':kind==='spring'?'x':kind==='circuit'?'current':kind==='optics'?'angle':'pressure';
 const pts=Array.from({length:121},(_,i)=>{const x=max*i/120;let y:number;if(kind==='wave')y=p[2]*Math.sin(-2*Math.PI*p[0]*x);else if(kind==='orbit')y=Math.sin(2*Math.PI*x/base.period)*(6371+p[0]);else {const params=timed?p:[x,...p.slice(1)];y=values(kind,params,x)[key];if(kind==='pendulum')y*=180/Math.PI;}return {x,y};});
 const lo=Math.min(0,...pts.map(q=>q.y)),hi=Math.max(.001,...pts.map(q=>q.y)),ys=(y:number)=>140-(y-lo)/(hi-lo)*110;
 const label=kind==='projectile'?'Balandlik (m)':kind==='pendulum'?'Burchak (°)':kind==='spring'||kind==='wave'?'Siljish (m)':kind==='orbit'?'Orbital y koordinatasi (km)':kind==='circuit'?'Tok (A)':kind==='optics'?'Sinish burchagi (°)':'Bosim (kPa)';
 return <div style={{width:'100%'}}><p>{label} · {timed?'vaqtga bog‘liqlik':kind==='circuit'?'kuchlanishga bog‘liqlik':kind==='optics'?'tushish burchagiga bog‘liqlik':'haroratga bog‘liqlik'}</p><svg viewBox="0 0 700 180" role="img" aria-label={label+' grafigi'} style={{width:'100%',maxHeight:220}}><path d="M50 20 V140 H680" fill="none" stroke="#b6c6ab"/><path d={`M50 ${ys(0)} H680`} stroke="#dce5d7"/><polyline points={pts.map(q=>`${50+q.x/max*630},${ys(q.y)}`).join(' ')} stroke="#739b47" strokeWidth="2.5" fill="none"/><g fill="#819173" fontSize="11"><text x="5" y="30">{hi.toFixed(1)}</text><text x="5" y="140">{lo.toFixed(1)}</text><text x="50" y="165">0</text><text x="600" y="165">{max.toFixed(1)} {timed?'s':kind==='circuit'?'V':kind==='optics'?'°':'K'}</text></g></svg><small>Parametrlar o‘zgarganda grafik qayta hisoblanadi.</small></div>;
}
