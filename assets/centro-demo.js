(()=>{
'use strict';
const q=s=>document.querySelector(s),data=window.GesproContent,knowledge=window.GesproDemo,params=new URLSearchParams(location.search);
const version=q('#demo-version'),palette=q('#demo-palette'),frame=q('.assistant-model'),panel=q('.assistant-panel'),layout=q('.help-layout'),open=q('.open-chat');
let lastQuestion='',lastAnswer=null,ticketText='',pose='saludo',videoSource=params.get('origen')==='drive'?'drive':'academy',searchTerm='';
const viewedVideo=window.GesproTopics.videos(data,params.get('origen')==='drive'?'drive':'academy').find(v=>v.id===params.get('video'));
function videoContext(){if(!viewedVideo)return '';const second=Number(params.get('tiempo'));const at=Number.isFinite(second)&&second>0?' · '+Math.floor(second/60)+':'+String(Math.floor(second)%60).padStart(2,'0'):'';return 'Video consultado: '+viewedVideo.title+at+'.';}
version.value=params.get('version')==='ligero'?'ligero':'3d';palette.value=['A','B','C'].includes(params.get('palette'))?params.get('palette'):'A';
function updateModel(){const wanted=`muestras/${version.value==='ligero'?'ligero':'3d-suave'}.html?embed=1&palette=${palette.value}&pose=${pose}&angle=-15${version.value==='3d'?'&interactive=1&v=vida-1':''}`;if(frame.getAttribute('src')!==wanted)frame.src=wanted;}

function sendAttention(active){panel.dataset.attention=active?'on':'off';frame.contentWindow?.postMessage({type:'escudito-attention',active},location.protocol==='file:'?'*':location.origin);}
q('#ask-input').addEventListener('focus',()=>sendAttention(true));q('#ask-input').addEventListener('input',()=>sendAttention(true));q('#ask-input').addEventListener('blur',()=>sendAttention(false));
window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||location.protocol!=='file:'&&e.origin!==location.origin)return;if(e.data?.type==='escudito-engage'){q('#assistant-engagement').textContent='¡Aquí estoy! Escribe lo que necesitas encontrar.';q('#ask-input').focus({preventScroll:true});sendAttention(true);}else if(e.data?.type==='escudito-ready')sendAttention(document.activeElement===q('#ask-input'));});
frame.addEventListener('load',()=>sendAttention(document.activeElement===q('#ask-input')));
version.addEventListener('change',updateModel);palette.addEventListener('change',updateModel);
q('.close-chat').addEventListener('click',()=>{panel.hidden=true;layout.classList.add('chat-closed');open.hidden=false;open.focus();});open.addEventListener('click',()=>{panel.hidden=false;layout.classList.remove('chat-closed');open.hidden=true;q('.close-chat').focus();panel.scrollIntoView({block:'nearest',behavior:'smooth'});});
function node(tag,text,cls){const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el;}
function link(text,url,cls){const a=node('a',text,cls);a.href=url;if(!url.startsWith('videos-tema.html')){a.target='_blank';a.rel='noopener';}return a;}
function showSearchResults(resources){const section=q('#assistant-search-results'),grid=q('#assistant-result-grid');grid.replaceChildren();section.hidden=!resources.length;if(!resources.length)return;q('#assistant-results-summary').textContent=resources.length+' materiales para «'+lastQuestion+'»';for(const item of resources){const card=node('article','','assistant-result-card');card.append(node('span',item.kind==='video'?'VIDEO · '+item.source:'MANUAL','assistant-result-kind'),node('h3',item.title));if(item.description)card.append(node('p',item.description));card.append(link(item.kind==='video'?'Reproducir aquí':'Leer manual',item.href));grid.append(card);}}
function ask(question){
lastQuestion=question.trim();if(!lastQuestion)return;
lastAnswer=knowledge.answer(lastQuestion);const materials=lastAnswer.found?[]:window.GesproSearch.search(data,window.GesproTopics,lastQuestion);
if(materials.length)lastAnswer={...lastAnswer,heading:'Encontré estos materiales para ti.',detail:'Puedes abrirlos aquí. Si no resuelven tu duda, te ayudo a preparar una solicitud de soporte.',context:'Búsqueda por títulos, descripciones y temas: '+lastQuestion+'. '+materials.length+' materiales encontrados.'};
if(viewedVideo)lastAnswer={...lastAnswer,context:lastAnswer.context+' '+videoContext()};
q('#conversation').hidden=false;q('#asked-question').textContent=lastQuestion;const container=q('#answer');container.replaceChildren(node('strong',lastAnswer.heading));
if(lastAnswer.steps){const list=node('ol');for(const step of lastAnswer.steps)list.append(node('li',step));container.append(list);}container.append(node('p',lastAnswer.detail));
if(lastAnswer.sources.length){container.append(node('span','Fuente verificada','source-label'));for(const source of lastAnswer.sources)container.append(link(source.label,window.GesproTopics.playbackUrl(data,source.url),'source-link'));container.append(link(lastAnswer.related.label,lastAnswer.related.url,'source-link'));}
if(materials.length){const list=node('ul','','assistant-result-preview');for(const item of materials.slice(0,3)){const li=node('li');li.append(link(item.title,item.href));list.append(li);}container.append(list);const all=node('a','Ver los '+materials.length+' materiales encontrados','all-results-link');all.href='#assistant-search-results';container.append(all);}
showSearchResults(materials);const hasHelp=lastAnswer.found||materials.length>0;q('#ticket-offer').hidden=hasHelp;q('#not-helpful').hidden=!hasHelp;pose=hasHelp?'respuesta':'pensando';updateModel();q('#answer-status').textContent=lastAnswer.found?'Respuesta disponible con fuente.':materials.length?materials.length+' materiales encontrados.':'Sin respuesta verificada; puedes preparar una solicitud de ayuda.';
}
const answerStatus=node('p','','sr-only');answerStatus.id='answer-status';answerStatus.setAttribute('role','status');q('#conversation').append(answerStatus);
for(const b of document.querySelectorAll('[data-scenario]'))b.addEventListener('click',()=>{q('#ask-input').value=knowledge.examples[b.dataset.scenario];ask(q('#ask-input').value);});q('#ask-form').addEventListener('submit',e=>{e.preventDefault();ask(q('#ask-input').value);});
const dialog=q('#ticket-dialog');let ticketTrigger=null;
function showTicket(e){ticketTrigger=e.currentTarget;q('#ticket-form').hidden=false;q('#ticket-receipt').hidden=true;q('#copy-feedback').textContent='';q('#ticket-subject').value=lastQuestion.slice(0,180);q('#ticket-details').value=`Consulta: ${lastQuestion}\n\nLo que intenté:\n`;q('#ticket-email').value='';q('#ticket-context').textContent=lastAnswer.context;dialog.showModal();}
q('#ticket-offer').addEventListener('click',showTicket);q('#not-helpful').addEventListener('click',showTicket);q('#close-ticket').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>ticketTrigger?.focus());
q('#ticket-form').addEventListener('submit',e=>{e.preventDefault();ticketText=`SOLICITUD DE PRUEBA · DEMO-001\nAsunto: ${q('#ticket-subject').value}\nMódulo: ${q('#ticket-module').value}\nDetalle: ${q('#ticket-details').value}\nContacto de prueba: ${q('#ticket-email').value||'No indicado'}\nContexto: ${lastAnswer.context}\n\nEsta solicitud no se ha enviado ni guardado.`;q('#ticket-form').hidden=true;q('#ticket-receipt').hidden=false;q('#receipt-summary').textContent=`${q('#ticket-subject').value} · ${q('#ticket-module').value}`;});
q('#copy-ticket').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(ticketText);q('#copy-feedback').textContent='Resumen de prueba copiado.';}catch{q('#copy-feedback').textContent='No se pudo copiar automáticamente. Puedes seleccionar y copiar los datos de la solicitud.';}});
q('#catalog-source').value=videoSource;
function renderCatalog(){const groups=window.GesproTopics.grouped(data,videoSource,searchTerm),catalog=q('#video-catalog');catalog.replaceChildren();let count=0;for(const group of groups){count+=group.videos.length;const card=node('a','','topic-card');card.href=window.GesproTopics.topicUrl(group.key,videoSource,searchTerm);card.dataset.theme=group.key;card.append(node('span',group.mark,'topic-mark'),node('h3',group.name),node('p',group.description),node('span',searchTerm?group.videos.length+' de '+group.total+' videos coinciden':group.total+' video'+(group.total===1?'':'s'),'topic-count'),node('span','Ver videos','topic-enter'));catalog.append(card);}q('#catalog-empty').hidden=groups.length>0;q('#catalog-count').textContent=groups.length+' temas · '+count+' videos';return count;}
function renderManuals(){const catalog=q('#manual-catalog');catalog.replaceChildren();let n=0;for(const manual of data.manuals){if(searchTerm&&!knowledge.normalize(manual.title+' '+manual.description).includes(searchTerm))continue;const a=link('',manual.url,'manual');const body=node('span');body.append(node('strong',manual.title),node('span',manual.description));a.append(node('span','≡','doc-mark'),body,node('span','Leer manual','read-label'));catalog.append(a);n++;}q('#manual-empty').hidden=n>0;return n;}
function filter(){renderCatalog();renderManuals();}
q('#catalog-source').addEventListener('change',e=>{videoSource=e.target.value;filter();});
const featuredHelp=q('.featured-ask');if(featuredHelp)featuredHelp.addEventListener('click',()=>{const time=q('#featured-video').currentTime;featuredHelp.href=window.GesproTopics.assistantUrl('crm','academy','crm-07',time);q('#featured-video').pause();});
filter();updateModel();if(knowledge.examples[params.get('consulta')]){q('#ask-input').value=knowledge.examples[params.get('consulta')];ask(q('#ask-input').value);}

if(params.get('preguntar')==='1'){
panel.hidden=false;layout.classList.remove('chat-closed');open.hidden=true;
const selectedTopic=data.modules.find(m=>m.key===params.get('tema'));
if(selectedTopic){const text=viewedVideo?videoContext()+' ¿Qué necesitas resolver?':'Vienes de los videos de '+selectedTopic.name+'. ¿Qué necesitas resolver?';const context=node('p',text,'assistant-topic-context');q('#ask-form').before(context);q('#ask-input').placeholder=viewedVideo?'Pregunta sobre este video…':'Pregunta sobre '+selectedTopic.name+'…';}
q('#ask-input').focus({preventScroll:true});q('#ask-input').scrollIntoView({block:'center',behavior:'auto'});
}
})();
