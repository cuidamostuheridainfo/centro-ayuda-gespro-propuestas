(function(root){
'use strict';
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[¿?¡!.,;:]/g,'').replace(/\s+/g,' ').trim();}
const video='https://drive.google.com/file/d/1IUPqjDxMGmYSdyR7VtnWJrbqsVtIMsyE/view';
const examples={cotizacion:'¿Cómo convierto una cotización en pedido?','sin-respuesta':'Mi cotización muestra un error que no aparece en el tutorial.'};
const known=new Set(['como convierto una cotizacion en pedido','como convertir una cotizacion en pedido','como paso una cotizacion a pedido','como aceptar una cotizacion']);
function answer(question){
if(known.has(normalize(question)))return {found:true,heading:'Sí, el tutorial explica ese proceso.',steps:['Abre la cotización que el cliente aceptó.','Pulsa «El cliente la aceptó».','Se genera un pedido en firme con los mismos renglones y precios.'],detail:'El tutorial también explica que el pedido reserva la mercancía por 24 horas hábiles.',sources:[{label:'Cotizaciones · video de Drive · 1:01–1:12',url:video}],related:{label:'Material relacionado: Manual 01 · Ventas',url:'https://academia.gespro.ai/manuales/01-Manual-Ventas.html'},context:'Respuesta basada en la transcripción del tutorial 02-GesPro-Entrenamiento-Cotizaciones.mp4, tramo 1:01–1:12.'};
return {found:false,heading:'Necesito ayuda de soporte para orientarte con seguridad.',detail:'No tengo una respuesta verificada para esta consulta entre las respuestas preparadas de esta demostración. Puedo dejar tu pregunta lista en una solicitud de ayuda para que el equipo la revise.',sources:[],context:'Sin una respuesta verificada en esta demostración. No se ha diagnosticado el problema ni se ha enviado una solicitud.'};
}
const api={normalize,answer,examples};if(typeof module==='object'&&module.exports)module.exports=api;else root.GesproDemo=api;
})(typeof window!=='undefined'?window:globalThis);
