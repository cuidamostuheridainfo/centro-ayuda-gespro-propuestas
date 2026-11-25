# Centro de Ayuda GesPro · Propuestas de diseño

Repositorio **público**, solo para mostrar propuestas de diseño al equipo y recoger su opinión.
Se publica con GitHub Pages, y el enlace se comparte con el equipo.

**Aquí no va contenido interno**: ni manuales, ni videos, ni datos de empresas, ni la app de campo.
El sitio real vive en el repositorio privado `centro-ayuda-gespro`.

## Propuestas abiertas

| Propuesta | Archivo | Estado |
| --- | --- | --- |
| Escudito Ligero y 3D suave: comparación y elección | `index.html` | En revisión del equipo |
| Muestra del Centro de Ayuda, con ambas versiones | `centro-ayuda-demo.html` | Maqueta con repertorios reales y flujos guiados |
| Propuesta original de colores (opciones A, B y C) | `colores-originales.html` | Conservada |

## Cómo se publica

1. En GitHub: Settings → Pages → Branch `main`, carpeta `/ (root)` → Save.
2. El enlace queda así: `https://<cuenta>.github.io/centro-ayuda-gespro-propuestas/`.
3. Cada cambio que se sube a `main` actualiza la página en uno o dos minutos.

## Revisión de Escudito

- Comparación: https://cuidamostuheridainfo.github.io/centro-ayuda-gespro-propuestas/
- Maqueta: https://cuidamostuheridainfo.github.io/centro-ayuda-gespro-propuestas/centro-ayuda-demo.html
- Las dos versiones comparten controles de color, gesto y giro. 3D suave conserva el grosor reducido un 40 %.
- Cada integrante copia su elección y la envía al grupo. La página no registra votos ni transmite información.
- La maqueta muestra referencias al catálogo real: 40 videos de la academia, 28 videos de Drive y seis manuales por módulo. Son repertorios separados y pueden compartir temas; no se presentan como 68 videos únicos. Los originales permanecen en sus ubicaciones.
- Incluye una respuesta guiada con fuente y tiempos del tutorial de Cotizaciones, y un flujo alternativo para preparar un ticket de prueba. No hay IA, envío de tickets ni almacenamiento de formularios.
- El modelo 3D carga Three.js 0.170.0 desde jsDelivr y requiere WebGL. Se muestra un aviso si no puede iniciarse.
- Respeta la preferencia de movimiento reducido. La propuesta original de colores se conserva sin cambios.

## Contenido real y demostraciones

- Respuesta con fuente: `centro-ayuda-demo.html?consulta=cotizacion`.
- Sin respuesta y oferta de soporte: `centro-ayuda-demo.html?consulta=sin-respuesta`.
- La demostración responde solo a las formulaciones preparadas de conversión de cotización a pedido. Cualquier otra consulta ofrece ayuda sin afirmar que se buscó exhaustivamente en todo el repertorio.
- La respuesta procede de la transcripción de `02-GesPro-Entrenamiento-Cotizaciones.mp4`, tramo 1:01–1:12. El manual de ventas aparece como material relacionado.
- «Simular creación del ticket» produce únicamente una vista previa DEMO-001 en memoria. No envía ni guarda datos.
- La página mantiene a Escudito primero en teléfono y a la derecha en escritorio.
- Catálogo contrastado con las páginas y la carpeta de Drive el 25 de noviembre de 2026.

## Selección de identidad

Jenny eligió Escudito **3D suave (volumen redondeado), color A: gris y azul GESPRO**. La maqueta usa esta selección de forma predeterminada; mantiene el grosor reducido un 40 %. Los controles permiten comparar otras opciones.

## Navegación por temas

- «Explora los videos» muestra tarjetas de temas siguiendo los ocho módulos de la academia. Se conserva la selección de repertorio Academia/Drive; los videos de Drive se agrupan por los temas que indican sus títulos.
- Cada tarjeta abre `videos-tema.html` con los videos del tema y del repertorio elegidos. Los enlaces originales permanecen intactos.
- La página del tema incluye el icono de Escudito en color A: vuelve a la página principal, abre el asistente y enfoca la consulta. Se conserva el tema como orientación; no se envía ninguna pregunta automáticamente.
- La búsqueda filtra los temas y conserva su término al abrir los videos. La vuelta a todos los temas respeta el repertorio elegido.

## Reproducción dentro del Centro de Ayuda

- Cada tema tiene un reproductor propio y botones «Reproducir aquí». Se mantiene un solo video activo.
- Los 40 videos de la academia usan las URLs MP4 y portadas de su catálogo público, sin duplicar los archivos. Los 28 videos de Drive usan su visor incrustado y conservan sus permisos.
- Al elegir un video no se inicia el audio automáticamente.
- El icono de Escudito junto al reproductor lleva a la consulta con el tema y video seleccionados. Para MP4 también conserva el instante actual; en Drive no se puede leer el tiempo del visor externo.
- Los enlaces de video de la respuesta de ejemplo abren el reproductor del Centro de Ayuda.
- El alojamiento definitivo sigue pendiente. No se han migrado ni subido videos a otra plataforma.

## Escudito como entrada única de búsqueda

- La cabecera principal conserva el título y los indicadores de contenido. Se retiraron los dos textos introductorios y el buscador separado.
- El campo de Escudito acepta palabras, temas y consultas. Las palabras y temas buscan en los títulos, descripciones y módulos de ambos repertorios, además de los manuales. Los resultados de video se reproducen en el centro.
- Las consultas preparadas conservan sus respuestas con fuentes; cuando no hay respuesta ni materiales coincidentes, se ofrece el ticket de prueba. La búsqueda no sustituye al agente de IA pendiente.
- La búsqueda local dentro de una lista de videos se mantiene para recorrer ese tema.

## Interacción y color

- Escudito 3D suave reacciona al toque, clic, Enter o espacio con un saludo breve y activa la consulta.
- Al enfocar o escribir en la consulta dirige la mirada hacia abajo, al campo. Al salir recupera su mirada habitual.
- Las tarjetas de temas tienen acentos de color; el personaje conserva gris `#A9B4C2`, azul GESPRO `#1F5FAA` y copete `#D9A04A` (paleta A).
- Se conservan las dos preguntas de ejemplo y la profundidad reducida un 40 %.
- El saludo respeta movimiento reducido y los mensajes entre la figura y el asistente validan origen y ventana.
