(()=>{
'use strict';
const params=new URLSearchParams(location.search),version=document.getElementById('demo-version'),palette=document.getElementById('demo-palette'),frame=document.querySelector('.assistant-model'),panel=document.querySelector('.assistant-panel'),layout=document.querySelector('.help-layout'),open=document.querySelector('.open-chat');
version.value=params.get('version')==='ligero'?'ligero':'3d';palette.value=['A','B','C'].includes(params.get('palette'))?params.get('palette'):'C';
function update(){frame.src=`muestras/${version.value==='ligero'?'ligero':'3d-suave'}.html?embed=1&palette=${palette.value}&pose=${document.querySelector('.demo-conversation').hidden?'saludo':'respuesta'}&angle=-15`;}
version.addEventListener('change',update);palette.addEventListener('change',update);
document.querySelector('.close-chat').addEventListener('click',()=>{panel.hidden=true;layout.classList.add('chat-closed');open.hidden=false;open.focus();});
open.addEventListener('click',()=>{panel.hidden=false;layout.classList.remove('chat-closed');open.hidden=true;document.querySelector('.close-chat').focus();panel.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});});
document.querySelector('.example-question').addEventListener('click',e=>{document.querySelector('.demo-conversation').hidden=false;e.currentTarget.hidden=true;update();});
document.querySelector('.search').addEventListener('submit',e=>{e.preventDefault();const term=document.getElementById('help-search').value.trim().toLocaleLowerCase('es');let matches=0;for(const item of document.querySelectorAll('.topic,.manual')){const show=!term||(item.dataset.search+' '+item.textContent).toLocaleLowerCase('es').includes(term);item.hidden=!show;if(show)matches++;}document.getElementById('search-status').textContent=term?(matches?`${matches} resultado${matches===1?'':'s'} en el contenido de ejemplo.`:'No hay coincidencias en esta maqueta. Prueba con «manuales», «clientes» o «ventas».'):'';});update();
})();
