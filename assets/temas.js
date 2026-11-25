(function(root){
'use strict';
const themes={crm:{mark:'CRM',description:'Tablero comercial, oportunidades, prospectos, agenda y rutas.'},ventas:{mark:'VTA',description:'Vendedor, cotizaciones, punto de venta, tienda y aplicación móvil.'},cxc:{mark:'CxC',description:'Clientes, facturación, cobranza, comprobantes y autorizaciones.'},cxp:{mark:'CxP',description:'Proveedores, facturas, cuentas por pagar y pagos.'},inventario:{mark:'INV',description:'Inventario, manufactura, sucursales y almacenes.'},costos:{mark:'CST',description:'Análisis de costos, importaciones y reportes gerenciales.'},bancos:{mark:'BAN',description:'Bancos, movimientos y conciliación bancaria.'},otros:{mark:'MÁS',description:'Visión general, recursos humanos, órdenes de pago y contabilidad.'}};
const driveGroups={ventas:['01','01b','02','03','04'],cxc:['05','08','10','12','14'],cxp:['06','07','09','11'],inventario:['15','16','17'],costos:['21','22','23'],bancos:['13'],otros:['18','19','20']};
function driveTheme(video){const prefix=video.sourceFilename?.match(/^(\d{2}[a-z]?)-/)?.[1];return Object.keys(driveGroups).find(key=>driveGroups[key].includes(prefix))||'otros';}
function videos(data,source){return source==='drive'?data.drive.map(v=>({...v,module:driveTheme(v)})):data.academy;}
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();}
function grouped(data,source,search=''){const term=normalize(search);return data.modules.map(m=>{const all=videos(data,source).filter(v=>v.module===m.key),matched=all.filter(v=>!term||normalize([m.name,v.title,v.description||''].join(' ')).includes(term));return {...m,...themes[m.key],total:all.length,videos:matched};}).filter(m=>m.videos.length);}
function topicUrl(key,source,search=''){const params=new URLSearchParams({tema:key,origen:source});if(search)params.set('buscar',search);return 'videos-tema.html?'+params.toString();}
function assistantUrl(key,source){return 'centro-ayuda-demo.html?'+new URLSearchParams({preguntar:'1',tema:key,origen:source}).toString();}
const api={themes,driveTheme,videos,grouped,normalize,topicUrl,assistantUrl};if(typeof module==='object'&&module.exports)module.exports=api;else root.GesproTopics=api;
})(typeof window!=='undefined'?window:globalThis);
