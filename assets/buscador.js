(function(root){
'use strict';
function normalize(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
const stop=new Set('a al algo alguna alguno con como cual cuales de del donde el en es esta este esto la las lo los me mi necesito para por puedo que quiero se sobre tengo un una unos unas ver video videos tutorial tutoriales manual manuales buscar busca encontrar consulta consultar informacion ayuda hacer'.split(' '));
const aliases={cotizaciones:'cotizacion',facturas:'factura',pagos:'pago',clientes:'cliente',proveedores:'proveedor',bancos:'banco',ventas:'venta',cobros:'cobro',cxc:'cobrar',cxp:'pagar'};
function words(text){return normalize(text).split(' ').map(t=>aliases[t]||t).filter(Boolean);}
function search(data,topics,query){
const raw=normalize(query),wantsManual=/\bmanual(?:es)?\b/.test(raw),wantsVideo=/\b(?:videos?|tutorial(?:es)?)\b/.test(raw),kind=wantsManual&&!wantsVideo?'manual':wantsVideo&&!wantsManual?'video':null;
const terms=[...new Set(words(query).filter(t=>!stop.has(t)))];if(!terms.length&&!kind)return [];
const resources=[];for(const source of ['academy','drive'])for(const v of topics.videos(data,source)){const group=data.modules.find(m=>m.key===v.module);resources.push({kind:'video',title:v.title,description:v.description||'',module:group?.name||'',source:source==='academy'?'Academia':'Drive',href:topics.playbackUrl(data,v.url)});}
for(const m of data.manuals)resources.push({kind:'manual',title:m.title,description:m.description,module:'',source:'Manual',href:m.url});
return resources.map((r,index)=>{if(kind&&r.kind!==kind)return null;const title=words(r.title),module=words(r.module),all=[...title,...module,...words(r.description)];const matches=t=>all.some(w=>w===t||(t.length>=5&&w.startsWith(t)));if(!terms.every(matches))return null;const score=terms.reduce((n,t)=>n+(title.includes(t)?4:module.includes(t)?2:1),0);return {...r,score,index};}).filter(Boolean).sort((a,b)=>b.score-a.score||a.index-b.index);
}
const api={normalize,search};if(typeof module==='object'&&module.exports)module.exports=api;else root.GesproSearch=api;
})(typeof window!=='undefined'?window:globalThis);
