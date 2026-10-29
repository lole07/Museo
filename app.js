/* =====================================================================
   1) CONTENIDO — edita aquí.
   Cada piso tiene 4 salas (rooms). En cada sala:
   art: [ ['Título','Artista','Año','Técnica','Descripción', 'img.jpg', ancho_m, alto_m], ... ]
        img, ancho y alto son opcionales (sin img se genera un cuadro de ejemplo).
        Máximo 10 cuadros por sala; se colocan solos en las paredes.
   esc: número de pedestales vacíos (1-5) o lista de fichas
        [['Título','Artista','Año','Material','Descripción'], ...]
   Carga tus modelos 3D con:  setSculpture(n, objeto3D, escala)
   (n = número que aparece en la ficha de cada pedestal).
   light: iluminación inicial del piso (0 Galería, 1 Atardecer, 2 Nocturna, 3 Fría)
   ===================================================================== */
const FLOORS=[
 {name:'Piso 1 · Arte Clásico',wall:0xefe9dd,tile:0xffffff,light:0,rooms:[
  {name:'Gran Hall de la Antigüedad',rug:0x8a3b2e,esc:[['Piedad (Pietat)','Museu Frederic Marès','—','Escultura','Grupo escultórico de la Piedad.']],art:[['Piedad (Pietat)','Museu Frederic Marès','—','Modelo 3D','Grupo escultórico de la Piedad conservado en el Museu Frederic Marès.','',2.2,1.7],['Griegos contra persas','Por confirmar','—','Modelo 3D','Escena de combate entre griegos y persas.','',2.2,1.7]]},
  {name:'Sala Renacimiento',rug:0x2e5a8a,esc:0,art:[['La Anunciación','Fra Angelico','Siglo XV','Modelo 3D','El arcángel Gabriel anuncia a María que será madre de Jesús.','',2.2,1.7],['La joven de la perla','Johannes Vermeer','h. 1665','Modelo 3D','Retrato de una joven con turbante y pendiente de perla.','',2.2,1.7]]},
  {name:'Sala Barroco',rug:0x6b2e5a,esc:0,art:[['Emma con sombrero de paja','Por confirmar','—','Modelo 3D','Retrato identificado en el título del modelo de Sketchfab.','',2.2,1.7],['Virgen María con el Niño Jesús','Por confirmar','—','Modelo 3D','Representación de la Virgen María con el Niño Jesús.','',2.2,1.7]]},
  {name:'Sala Romanticismo',rug:0x2e6b4a,esc:0,art:[['El caminante sobre el mar de nubes','Caspar David Friedrich','1818','Modelo 3D','Un caminante contempla un paisaje de montañas entre la niebla.','',2.2,1.7],['El gran dragón rojo','William Blake','h. 1805','Modelo 3D','Imagen apocalíptica del dragón rojo, de la serie de Blake.','',2.2,1.7]]}]} ,
 {name:'Piso 2 · Arte Moderno',wall:0xe3d6c4,tile:0xe0cfae,light:1,rooms:[
  {name:'Sala Impresionismo',rug:0x4a6b8a,esc:0,art:[['La noche estrellada','Vincent van Gogh','1889','Modelo 3D','Diorama inmersivo inspirado en el cielo nocturno de Van Gogh.','',2.2,1.7],['Tarde de domingo en la isla de la Grande Jatte','Georges Seurat','1884–1886','Diorama 3D','Escena de ocio junto al río construida con pequeñas pinceladas de color.','',2.2,1.7]]},
  {name:'Sala Vanguardias',rug:0xa83b2e,esc:0,art:[['Guernica','Pablo Picasso','1937','Modelo 3D','Interpretación tridimensional de la obra antibélica de Picasso.','',2.2,1.7],['Composición VIII','Wassily Kandinsky','1923','Modelo 3D','Composición abstracta de formas geométricas y líneas dinámicas.','',2.2,1.7]]},
  {name:'Sala Expresionismo',rug:0x8a6b2e,esc:0,art:[['El grito','Edvard Munch','1893','Modelo 3D','Versión tridimensional de la icónica imagen expresionista de Munch.','',2.2,1.7],['El grito 3D','Edvard Munch','1893','Modelo 3D','Otra interpretación tridimensional de la figura y el paisaje de El grito.','',2.2,1.7]]},
  {name:'Sala Surrealismo',rug:0x5a2e8a,esc:0,art:[['La persistencia de la memoria','Salvador Dalí','1931','Modelo 3D','Paisaje surrealista con relojes blandos y formas oníricas.','',2.2,1.7],['Nighthawks','Edward Hopper','1942','Diorama 3D','Diorama inspirado en la escena nocturna de un café urbano.','',2.2,1.7]]}]} ,
 {name:'Piso 3 · Pintura y Arte Gráfico',wall:0xd3d6dc,tile:0xaab0ba,light:2,rooms:[
  {name:'Sala Abstracta',rug:0x2e8a8a,esc:0,art:[['Mano con esfera reflectante','M. C. Escher','1935','Modelo 3D','Una mano sostiene una esfera que refleja el entorno.','',2.2,1.7],['El beso','Gustav Klimt','1907–1908','Modelo 3D','Pareja abrazada cubierta de patrones ornamentales y dorados.','',2.2,1.7]]},
  {name:'Galería de Pintura',rug:0x333333,esc:4,art:[['La ofrenda','Por confirmar','—','Modelo 3D','Obra tridimensional identificada como La ofrenda.','',2.2,1.7]]},
  {name:'Sala Nuevos Medios',rug:0x8a2e6b,esc:0,art:[['We Can Do It!','J. Howard Miller','1943','Modelo 3D','Versión tridimensional del conocido cartel de Rosie the Riveter.','',2.2,1.7]]},
  {name:'Sala Experimental',rug:0x8a8a2e,esc:0,art:[['Autorretrato de Van Gogh','Vincent van Gogh','1889','Modelo 3D','Retrato del artista realizado durante su etapa en Saint-Rémy.','',2.2,1.7]]}]} 
];

/* =====================================================================
   ENLACES DE LAS OBRAS — completa esta sección sin tocar el motor.
   sketchfabUrl: enlace normal a la página del modelo de Sketchfab.
   modelUrl: URL directa a un archivo .glb/.gltf alojado en un servidor con CORS.
             Este segundo campo sustituye la imagen por geometría 3D en la sala.
             Un enlace de página de Sketchfab no es un archivo 3D descargable.
   links: enlaces opcionales adicionales, por ejemplo [{label:'Más información',url:'https://...'}].
   Los campos quedan vacíos hasta añadir los enlaces definitivos.
   ===================================================================== */
const ART_ASSETS = {
  'La noche estrellada': { sketchfabUrl: 'https://sketchfab.com/models/3e0b5185d1f8435b993e1bad2f82928e', modelUrl: '', links: [] },
  'La joven de la perla': { sketchfabUrl: 'https://sketchfab.com/models/d8d676cbfea44a2db2569fabc4ed6562', modelUrl: '', links: [] },
  'Guernica': { sketchfabUrl: 'https://sketchfab.com/models/53c260bbb42a483ab0c0d7173d058ce7', modelUrl: '', links: [] },
  'Piedad (Pietat)': { sketchfabUrl: 'https://sketchfab.com/models/b7e59f69cdd942f7b696a82f105f51c1', modelUrl: '', links: [] },
  'La Anunciación': { sketchfabUrl: 'https://sketchfab.com/models/3eb14c4fcd8a4a56bba23c46c829ac38', modelUrl: '', links: [] },
  'El gran dragón rojo': { sketchfabUrl: 'https://sketchfab.com/models/6dabe5a43d954aa88455ed301b947d1b', modelUrl: '', links: [] },
  'Griegos contra persas': { sketchfabUrl: 'https://sketchfab.com/models/6c9ddaafbe8946378283a612606730fd', modelUrl: '', links: [] },
  'Composición VIII': { sketchfabUrl: 'https://sketchfab.com/models/3047638c5dfe42dfbcc0aae5a7814afb', modelUrl: '', links: [] },
  'El grito': { sketchfabUrl: 'https://sketchfab.com/models/215c5e61133b4d57864cad78b0ed37c0', modelUrl: '', links: [] },
  'La persistencia de la memoria': { sketchfabUrl: 'https://sketchfab.com/models/ab3e99facbdb4d9d8661d3f07815638e', modelUrl: '', links: [] },
  'El caminante sobre el mar de nubes': { sketchfabUrl: 'https://sketchfab.com/models/518e605e9b734c86aab5bc22f9797f77', modelUrl: '', links: [] },
  'Mano con esfera reflectante': { sketchfabUrl: 'https://sketchfab.com/models/70dc424ec1c14607b8bd0870f425a067', modelUrl: '', links: [] },
  'Nighthawks': { sketchfabUrl: 'https://sketchfab.com/models/7d6c083ed7e743249040eaa195f0f678', modelUrl: '', links: [] },
  'Autorretrato de Van Gogh': { sketchfabUrl: 'https://sketchfab.com/models/2d49b39eb3ab451d9b2d51b25ddfb751', modelUrl: '', links: [] },
  'Tarde de domingo en la isla de la Grande Jatte': { sketchfabUrl: 'https://sketchfab.com/models/b0dce767b1ee4f0faa34a4308a8474e9', modelUrl: '', links: [] },
  'El grito 3D': { sketchfabUrl: 'https://sketchfab.com/models/dcadeca9eb7048459c97015e2afa20ff', modelUrl: '', links: [] },
  'El beso': { sketchfabUrl: 'https://sketchfab.com/models/a4193867eee64962aee21d557d2b038e', modelUrl: '', links: [] },
  'Emma con sombrero de paja': { sketchfabUrl: 'https://sketchfab.com/models/4bc5ec09f5d546afb36b149e5bb5873b', modelUrl: '', links: [] },
  'La ofrenda': { sketchfabUrl: 'https://sketchfab.com/models/8272d36554d5498f95761d7d33679531', modelUrl: '', links: [] },
  'We Can Do It!': { sketchfabUrl: 'https://sketchfab.com/models/9eadbc40f4eb488cbe22f93967afca0d', modelUrl: '', links: [] },
  'Virgen María con el Niño Jesús': { sketchfabUrl: 'https://sketchfab.com/models/81183c4d3e284ce3b8a7a5166348db7a', modelUrl: '', links: [] },
  'Kanagawa Sculpture 2.0': { sketchfabUrl: 'https://sketchfab.com/models/f03ac9a2fcba4959922493ca62715858', modelUrl: '', links: [] },
  'Salón de baile / Ballroom': { sketchfabUrl: 'https://sketchfab.com/models/8f25bda06f9542f4acb93ece4ae250c5', modelUrl: '', links: [] },
  'Le Rêve 3D': { sketchfabUrl: 'https://sketchfab.com/models/2b9c4910c2044441a4a06b01ac43dddf', modelUrl: '', links: [] },
  'Sylvia Plath 3D': { sketchfabUrl: 'https://sketchfab.com/models/90650d78c4cf4904a88d190bdbba7372', modelUrl: '', links: [] },
  'Vitruvian Man 3D': { sketchfabUrl: 'https://sketchfab.com/models/922621b4e0dd499d817cd3a039664289', modelUrl: '', links: [] },
  'Portrait of Françoise Gilot 3D': { sketchfabUrl: 'https://sketchfab.com/models/139bb018c01145e697489aeb838a7bce', modelUrl: '', links: [] },
  'Le Chat Noir Chibi 2.5D': { sketchfabUrl: 'https://sketchfab.com/models/38f7b41feb264204bddac45b2e191cc2', modelUrl: '', links: [] },
  'Salvador Dalí — Mae West': { sketchfabUrl: 'https://sketchfab.com/models/2e919bce737440b78823e648008a8067', modelUrl: '', links: [] },
  'Bodegón con granada': { sketchfabUrl: 'https://sketchfab.com/models/9dd2295299a94c4ca7b9beaf60b49b1f', modelUrl: '', links: [] },
  'Bodegón con naranja': { sketchfabUrl: 'https://sketchfab.com/models/4fc1350e7c544fb99a715a22770fb9b5', modelUrl: '', links: [] },
  'Pintura antigua (1857)': { sketchfabUrl: 'https://sketchfab.com/models/f24f183f124d4d488b40efa0a41284fe', modelUrl: '', links: [] },
  'Taurus Geryón': { sketchfabUrl: 'https://sketchfab.com/models/f0bd1d7eacba45cb94ef2b82be32d41d', modelUrl: '', links: [] },
  'Virgen con el Niño (1944.89)': { sketchfabUrl: 'https://sketchfab.com/models/86f68f98896c45658ae6593d5d460427', modelUrl: '', links: [] },
  'Las Tres Gracias (1872)': { sketchfabUrl: 'https://sketchfab.com/models/44a0231626254f76938048d902154610', modelUrl: '', links: [] },
  'Pelike de Eros': { sketchfabUrl: 'https://sketchfab.com/models/3b81be98b310473f952931088a7b1930', modelUrl: '', links: [] },
  'Heracles y las aves del lago Estínfalo': { sketchfabUrl: 'https://sketchfab.com/models/13ec7e29dd1f4526bec5997373c11962', modelUrl: '', links: [] },
  'Ramsés III con Horus y Seth': { sketchfabUrl: 'https://sketchfab.com/models/babf15e52fe843acbc9c01e79acea01b', modelUrl: '', links: [] },
  'Le Drame au Désert': { sketchfabUrl: 'https://sketchfab.com/models/db0bf869752b464a9dc9c9179c78bf54', modelUrl: '', links: [] },
  'Zoomorfo P de Quiriguá': { sketchfabUrl: 'https://sketchfab.com/models/d53a8c1dd53f44c282c4bb2b56f26d26', modelUrl: '', links: [] },
  'David de Miguel Ángel': { sketchfabUrl: 'https://sketchfab.com/models/98ae336dcfe94073889013f236d19ba0', modelUrl: '', links: [] },
  'El pensador': { sketchfabUrl: 'https://sketchfab.com/models/3e4f13b0e23f408b91ed8aca82205159', modelUrl: '', links: [] },
  'El nacimiento de Venus (3DGS)': { sketchfabUrl: 'https://sketchfab.com/models/f1e481dce56a4c5f91ba884dc21ec352', modelUrl: '', links: [] },
  'Venus de Willendorf': { sketchfabUrl: 'https://sketchfab.com/models/b31e485baf5a469787dae54a68d48d14', modelUrl: '', links: [] },
  'El nacimiento de Venus': { sketchfabUrl: 'https://sketchfab.com/models/4bf39fdadc7941aa9a8cda3e88645247', modelUrl: '', links: [] },
  'Rómulo y Remo': { sketchfabUrl: 'https://sketchfab.com/models/3d839aadacb34322b1d1dd48dc2a818b', modelUrl: '', links: [] },
  'Laocoön and His Sons (46)': { sketchfabUrl: 'https://sketchfab.com/models/b9de5c1eda2d44f5887f062f816eac95', modelUrl: '', links: [] },
  'Laocoön and His Sons (47)': { sketchfabUrl: 'https://sketchfab.com/models/b9de5c1eda2d44f5887f062f816eac95', modelUrl: '', links: [] },
  'Abduction of the Sabine Woman': { sketchfabUrl: 'https://sketchfab.com/models/06e1ba8944614a74ad801d0533a8326b', modelUrl: '', links: [] }
};


// Catálogo de pinturas y obras gráficas enmarcadas.
// Todas las obras enlazadas se distribuyen en orden por las 12 salas y se repiten para vestir más paredes; incluso los modelos de esculturas se muestran solo como cuadros.
const PAINTINGS = [
 ['La noche estrellada','Vincent van Gogh','1889','Óleo sobre lienzo (original); modelo digital 3D','Pintada en junio de 1889 durante la estancia de Van Gogh en Saint-Rémy. El cielo ocupa casi toda la superficie y está construido con pinceladas curvas y empastadas; el ciprés vertical conecta el primer plano con el cielo. La agitación del firmamento y la escala de los astros convierten una vista observada desde la ventana en una imagen expresiva, no en una transcripción literal.'],
 ['La joven de la perla','Johannes Vermeer','c. 1665','Óleo sobre lienzo (original); modelo digital 3D','No es un retrato documental de una persona identificada, sino una tronie: estudio de expresión, vestuario y carácter. Vermeer modela el rostro con transiciones suaves, contrasta el fondo oscuro con el turbante azul y amarillo y sugiere la perla con muy pocas pinceladas luminosas.'],
 ['Guernica','Pablo Picasso','1937','Óleo sobre lienzo (mural; original); modelo digital 3D','Picasso realizó el mural en París para el Pabellón de la República Española de la Exposición Internacional de 1937, como respuesta al bombardeo de Guernica durante la Guerra Civil española. El formato panorámico, la paleta monocroma y las figuras fragmentadas —caballo, toro, madres y cuerpos caídos— comunican terror, duelo y violencia sin representar una escena militar literal.'],
 ['Piedad (Pietat)','Autoría y fecha por confirmar','No confirmada','Imagen digital enmarcada de una obra escultórica','El enlace identifica una Piedad conservada o documentada en relación con el Museu Frederic Marès. El motivo iconográfico representa a María sosteniendo el cuerpo muerto de Cristo. Esta ficha muestra el recurso digital como cuadro; no se instala una escultura en la sala. La autoría, cronología, material y procedencia exactos deben verificarse en el registro del museo.'],
 ['La Anunciación','Fra Angelico','c. 1440–1445 (si corresponde al fresco de San Marco)','Fresco mural (obra de referencia); modelo digital 3D','La escena representa el anuncio del arcángel Gabriel a María. En la versión célebre del convento de San Marco, Florencia, la arquitectura sobria, la perspectiva y los gestos contenidos invitan a la contemplación religiosa. Como el título puede corresponder a más de una versión de Fra Angelico, la fecha y técnica deben cotejarse con el modelo enlazado.'],
 ['El gran dragón rojo','William Blake','c. 1805–1810','Acuarela y técnica mixta sobre papel (serie); modelo digital 3D','Pertenece a la serie de ilustraciones de Blake inspiradas en el Libro del Apocalipsis. La figura monumental del dragón y el cuerpo humano idealizado combinan imaginación visionaria, simbolismo religioso y anatomía dramática. Blake trabajó estas imágenes con acuarela, tinta y otros medios sobre papel; el modelo enlazado debe cotejarse para precisar qué versión de la serie reproduce.'],
 ['Griegos contra persas','Autoría por confirmar','No confirmada','Modelo digital 3D de escena histórica','El título describe un enfrentamiento de las guerras médicas, pero no identifica por sí solo una pintura histórica concreta. La composición puede aludir a la tradición de escenas de batalla con figuras superpuestas, armas y diagonales para intensificar el movimiento. No se atribuyen artista, fecha ni técnica original hasta identificar la obra fuente del modelo.'],
 ['Composición VIII','Wassily Kandinsky','1923','Óleo sobre lienzo (original); modelo digital 3D','Pintada en 1923 durante la etapa de Kandinsky en la Bauhaus, combina círculos, arcos, triángulos y líneas sobre un campo claro. Las formas no narran un episodio reconocible: funcionan como relaciones autónomas de ritmo, equilibrio, tensión y color, vinculadas a la búsqueda de una expresión espiritual mediante la abstracción.'],
 ['La persistencia de la memoria','Salvador Dalí','1931','Óleo sobre lienzo (original); modelo digital 3D','Dalí construye un paisaje casi vacío en el que relojes blandos se deforman sobre ramas, una plataforma y una figura biomórfica. La precisión casi ilusionista del dibujo contrasta con lo imposible de la escena; suele relacionarse con el tiempo subjetivo, el sueño y las imágenes del inconsciente, sin reducir la obra a una única interpretación.'],
 ['El caminante sobre el mar de nubes','Caspar David Friedrich','c. 1818','Óleo sobre lienzo (original); modelo digital 3D','Un hombre de espaldas ocupa el primer plano y contempla un paisaje montañoso cubierto de niebla. La figura aislada, el punto de vista elevado y la profundidad atmosférica son rasgos del Romanticismo: el paisaje se convierte en experiencia de lo sublime y en reflexión sobre la relación entre individuo, naturaleza e infinitud.'],
 ['Mano con esfera reflectante','M. C. Escher','1935','Litografía (obra gráfica original); modelo digital 3D','Escher representa una mano que sostiene una esfera pulida en la que se refleja el artista y el espacio que lo rodea. La superficie convexa altera la perspectiva y convierte la imagen en una investigación sobre autorrepresentación, punto de vista y distorsión óptica. El modelo 3D es una adaptación digital de una estampa, no el medio original.'],
 ['Nighthawks','Edward Hopper','1942','Óleo sobre lienzo (original); diorama digital 3D','Hopper pintó una cafetería nocturna de una ciudad estadounidense, con grandes ventanales y figuras que comparten espacio sin interacción visible. La luz artificial recorta el interior frente a la calle vacía; la composición geométrica y la ausencia de una narración explícita producen una atmósfera de aislamiento urbano. El diorama es una recreación digital de la pintura.'],
 ['Autorretrato de Van Gogh','Vincent van Gogh','1889 (si corresponde al autorretrato de Saint-Rémy)','Óleo sobre lienzo (serie de autorretratos); modelo digital 3D','Van Gogh construye el rostro mediante pinceladas direccionales y ondulantes que continúan en el fondo, integrando figura y entorno. Los azules y verdes contrastan con los tonos rojizos del cabello y la barba. El artista realizó varios autorretratos; el año y la versión concreta deben comprobarse contra el modelo enlazado.'],
 ['Tarde de domingo en la isla de la Grande Jatte','Georges Seurat','1884–1886','Óleo sobre lienzo; puntillismo/divisionismo (original)','Seurat trabajó en esta escena del ocio dominical en una isla del Sena, junto a París, mediante estudios preparatorios y una composición cuidadosamente organizada. Los pequeños toques de color separados buscan que la mezcla óptica ocurra en la percepción del espectador. La quietud de las figuras y sus perfiles casi frisos convierten la vida moderna en una escena deliberadamente estructurada.'],
 ['El grito 3D','Edvard Munch','1893 (la composición original; versión exacta por confirmar)','La versión original más conocida es temple y óleo sobre cartón; modelo digital 3D','La figura central se lleva las manos a la cabeza ante un paisaje de líneas ondulantes; el cielo y el fiordo parecen vibrar con su angustia. Munch describió la experiencia de un grito que atravesaba la naturaleza. Existen varias versiones de la composición en diferentes medios, así que el soporte exacto de la imagen reproducida depende del modelo enlazado.'],
 ['El beso','Gustav Klimt','1907–1908','Óleo y pan de oro/hoja metálica sobre lienzo (original); modelo digital 3D','Klimt representa una pareja abrazada sobre un campo dorado, con patrones geométricos en la vestimenta masculina y motivos circulares y florales en la femenina. El uso ornamental del oro recuerda mosaicos y artes decorativas, mientras que el abrazo fusiona los cuerpos en una imagen de intimidad, deseo y unión.'],
 ['Emma con sombrero de paja','Autoría por confirmar','No confirmada','Modelo digital 3D; medio original por confirmar','El título identifica un retrato de una figura llamada Emma con sombrero de paja, pero no basta para atribuir artista, fecha o soporte con rigor. La ficha se mantiene provisional hasta comprobar los metadatos del modelo y la obra fuente; el recurso se exhibe únicamente como imagen enmarcada.'],
 ['La ofrenda','Autoría por confirmar','No confirmada','Modelo digital 3D; medio original por confirmar','«La ofrenda» es un título usado por distintas obras. Sin una atribución y una ficha de procedencia verificadas no es seguro asignar técnica, fecha ni significado específico. Se conserva el título del recurso enlazado y se marca la identificación como pendiente, evitando presentar una interpretación no comprobada como dato histórico.'],
 ['We Can Do It!','J. Howard Miller','1943','Cartel impreso original; modelo digital 3D','El cartel fue producido para Westinghouse Electric durante la Segunda Guerra Mundial y se difundió en un contexto laboral interno; su asociación posterior con el feminismo y Rosie the Riveter se consolidó décadas después. La figura, el gesto del brazo y el lema condensan un mensaje de confianza y movilización laboral. La versión digital se presenta como cuadro gráfico.'],
 ['Virgen María con el Niño Jesús','Autoría por confirmar','No confirmada','Imagen digital enmarcada de iconografía mariana','La iconografía de la Virgen con el Niño presenta a María sosteniendo o acompañando a Jesús niño y puede expresar maternidad, encarnación y devoción. Es un tema extendido en muchas épocas y escuelas; sin identificar la obra concreta no se pueden asegurar autoría, fecha, soporte ni procedencia. Se expone como imagen enmarcada, no como escultura física.'],
 ['Kanagawa Sculpture 2.0','Autoría por confirmar','No confirmada','Modelo digital 3D mostrado como cuadro','El título parece aludir a la tradición visual de La gran ola de Kanagawa, de Katsushika Hokusai, pero el nombre «Sculpture 2.0» indica una adaptación tridimensional y no confirma que sea una reproducción fiel de la estampa. Se conserva como recurso visual enmarcado; autoría, fecha y técnica del modelo deben verificarse con su ficha original.'],
 ['Salón de baile / Ballroom','Autoría por confirmar','No confirmada','Modelo digital 3D de interior, mostrado como cuadro','El modelo parece representar un espacio arquitectónico de salón de baile, no una pintura histórica identificada. Como pieza de la colección digital se muestra dentro de un marco; no se infieren artista, periodo o técnica pictórica. La fecha y los materiales corresponden al activo 3D y requieren consultar su ficha de Sketchfab.'],
 ['Le Rêve 3D','Autoría por confirmar','No confirmada','Modelo digital 3D; obra de referencia por confirmar','El título francés significa «El sueño» y puede corresponder a distintas obras. No debe atribuirse automáticamente a Picasso ni a otro artista sin verificar el modelo. La ficha distingue la recreación tridimensional de la obra fuente; artista, fecha, técnica y lectura iconográfica quedan pendientes de confirmar.'],
 ['Sylvia Plath 3D','Autoría del modelo por confirmar','No confirmada','Retrato digital 3D mostrado como cuadro','El título identifica un retrato asociado a Sylvia Plath, poeta y novelista estadounidense. La identidad de la persona representada no confirma por sí sola el autor, la fecha ni el medio del original. Se presenta como retrato enmarcado y se mantiene pendiente la ficha técnica del recurso digital.'],
 ['Vitruvian Man 3D','Leonardo da Vinci (obra de referencia)','c. 1490','Pluma y tinta con lavados sobre papel (dibujo original); modelo digital 3D','El dibujo relaciona las proporciones del cuerpo humano con el círculo y el cuadrado, a partir de la tradición arquitectónica de Vitruvio. Las superposiciones de brazos y piernas registran distintas posiciones y estudian la relación entre anatomía y geometría. El original es un dibujo sobre papel; la pieza del museo es una versión digital.'],
 ['Portrait of Françoise Gilot 3D','Autoría por confirmar','No confirmada','Retrato digital 3D; medio original por confirmar','El título señala a Françoise Gilot, artista y escritora francesa, pero no identifica por sí solo quién realizó el retrato ni cuál obra concreta reproduce. Para evitar atribuciones erróneas, se exhibe como imagen enmarcada y se dejan pendientes autor, fecha, técnica y procedencia hasta consultar la ficha completa del modelo.'],
 ['Le Chat Noir Chibi 2.5D','Autoría por confirmar','No confirmada','Gráfica digital 2.5D; original de referencia por confirmar','El título combina una versión «chibi» estilizada con la referencia a Le Chat Noir, célebre cartel de cabaré asociado a Théophile-Alexandre Steinlen y fechado en 1896. La variante 2.5D parece una reinterpretación contemporánea, no el cartel original; se distingue expresamente el diseño digital de la litografía histórica.'],
 ['Salvador Dalí — Mae West','Salvador Dalí (obra de referencia)','1934–1935','Instalación surrealista; modelo digital 3D','Interpretación tridimensional de la célebre composición de Dalí en la que los rasgos de Mae West forman una habitación surrealista.'],
 ['Bodegón con granada','Autoría por confirmar','No confirmada','Modelo digital 3D de naturaleza muerta','Composición de naturaleza muerta centrada en una granada. La identificación del modelo no permite confirmar por sí sola autoría, fecha ni técnica de una obra original.'],
 ['Bodegón con naranja','Autoría por confirmar','No confirmada','Modelo digital 3D de naturaleza muerta','Bodegón con una naranja como motivo principal. Se conserva el título descriptivo del recurso y se deja pendiente la identificación de su obra fuente.'],
 ['Pintura antigua (1857)','Autoría por confirmar','1857 (según el título del modelo)','Modelo digital 3D de pintura histórica','El título del recurso señala el año 1857, pero no aporta suficiente información para atribuir artista, tema o procedencia con seguridad.'],
 ['Taurus Geryón','Autoría por confirmar','No confirmada','Modelo digital 3D de figura mitológica','Figura titulada Taurus Geryón. El nombre remite a imaginarios mitológicos, aunque la identificación precisa y el contexto de la pieza deben verificarse en la ficha original del modelo.'],
 ['Virgen con el Niño (1944.89)','Autoría por confirmar','No confirmada','Modelo digital 3D de escultura religiosa','Representación de la Virgen con el Niño Jesús. El código 1944.89 forma parte del título del recurso, pero no se interpreta aquí como fecha de creación.'],
 ['Las Tres Gracias (1872)','Autoría por confirmar','1872 (según el título del modelo)','Modelo digital 3D de escultura','Grupo escultórico relacionado por su título con el motivo clásico de las Tres Gracias. La autoría y los detalles del registro deben cotejarse con la ficha del modelo.'],
 ['Pelike de Eros','Autoría antigua por confirmar','Antigüedad; fecha exacta pendiente','Cerámica griega; modelo digital 3D','Una pelike es una forma de recipiente cerámico griego. El título asocia la pieza con Eros, pero la escena y la cronología concretas requieren comprobar el registro del objeto.'],
 ['Heracles y las aves del lago Estínfalo','Autoría por confirmar','No confirmada','Modelo digital 3D de escena mitológica','La escena representa uno de los trabajos de Heracles: enfrentarse a las aves del lago Estínfalo. La pieza digital recrea un episodio de la mitología griega.'],
 ['Ramsés III con Horus y Seth','Arte egipcio antiguo; autoría individual no identificada','Antiguo Egipto; fecha exacta pendiente','Escultura egipcia; modelo digital 3D','La figura relaciona al faraón Ramsés III con las divinidades Horus y Seth. La composición refleja el lenguaje simbólico y político de la realeza egipcia; la datación exacta debe confirmarse en la ficha del objeto.'],
 ['Le Drame au Désert','Georges Gardet (según el título del modelo)','1887 (según el título del modelo)','Escultura; modelo digital 3D','El título atribuye la obra a Georges Gardet y la fecha a 1887. La escena dramática y sus detalles iconográficos deben cotejarse con el registro del modelo.'],
 ['Zoomorfo P de Quiriguá','Civilización maya; autoría individual no aplicable','Periodo clásico maya; fecha exacta pendiente','Monumento escultórico en piedra; modelo digital 3D','Monumento zoomorfo de Quiriguá, en la actual Guatemala, asociado al arte monumental maya. Las formas animales y los relieves tallados articulan imágenes y símbolos de la tradición política y religiosa local.'],
 ['David de Miguel Ángel','Miguel Ángel Buonarroti','1501–1504 (obra de referencia)','Escultura en mármol; modelo digital 3D','La figura de David representa al héroe bíblico antes de enfrentarse a Goliat. Miguel Ángel enfatizó la concentración, la anatomía y la tensión contenida; el modelo digital permite observar la escultura desde distintos ángulos.'],
 ['El pensador','Auguste Rodin (obra de referencia)','1880–1904 (desarrollo de la obra)','Escultura en bronce; modelo digital 3D','La figura sentada y ensimismada se ha convertido en símbolo de reflexión. La postura compacta y la tensión muscular de Rodin hacen visible el pensamiento como esfuerzo físico.'],
 ['El nacimiento de Venus (3DGS)','Sandro Botticelli (obra de referencia por confirmar)','c. 1484–1486 (si corresponde a la pintura de Botticelli)','Reconstrucción digital 3DGS','El título sugiere una reconstrucción digital de El nacimiento de Venus. La técnica 3DGS indica una representación tridimensional basada en muestras visuales y no la técnica material de la pintura histórica.'],
 ['Venus de Willendorf','Autoría prehistórica desconocida','Paleolítico superior; aprox. 29.000–25.000 a. C. (referencia habitual)','Estatuilla prehistórica; modelo digital 3D','Pequeña figura prehistórica conocida por sus formas volumétricas y rasgos corporales enfatizados. Su función y significado exactos siguen en debate; se evita asignarle una interpretación única.'],
 ['El nacimiento de Venus','Sandro Botticelli (obra de referencia por confirmar)','c. 1484–1486 (si corresponde a la pintura de Botticelli)','Modelo digital 3D de obra pictórica','El título remite a la conocida composición mitológica de Venus emergiendo del mar. Como existen adaptaciones digitales distintas, la correspondencia exacta del modelo con la obra de Botticelli debe verificarse.'],
 ['Rómulo y Remo','Autoría por confirmar','No confirmada','Modelo digital 3D de tema mitológico','Rómulo y Remo son los gemelos de la tradición fundacional de Roma, asociados al relato de la loba que los amamantó. La obra concreta y su fecha no se pueden confirmar solo a partir del título.'],
 ['Laocoön and His Sons (46)','Agesandro, Atenodoro y Polidoro (atribución tradicional; verificar el modelo)','Periodo helenístico; fecha exacta por confirmar','Grupo escultórico; modelo digital 3D','Grupo escultórico que representa a Laocoonte y sus hijos en lucha con serpientes. El modelo enlazado corresponde al recurso de Sketchfab proporcionado.'],
 ['Laocoön and His Sons (47)','Agesandro, Atenodoro y Polidoro (atribución tradicional; verificar el modelo)','Periodo helenístico; fecha exacta por confirmar','Grupo escultórico; modelo digital 3D','Segunda entrada solicitada para el mismo modelo de Laocoonte y sus hijos; conserva el enlace de Sketchfab indicado.'],
 ['Abduction of the Sabine Woman','Autoría por confirmar según el modelo enlazado','No confirmada','Escultura de tema mitológico; modelo digital 3D','Representación del rapto de las sabinas, episodio de la tradición legendaria de la antigua Roma. La autoría, fecha y versión exacta deben confirmarse en la ficha del modelo.']
];

const ART_DETAILS = {
 'La noche estrellada': { place:'Saint-Rémy-de-Provence, Francia; pintada durante la estancia en el asilo de Saint-Paul-de-Mausole.', collection:'Museum of Modern Art (MoMA), Nueva York.', meaning:'La observación del paisaje se transforma mediante ritmo curvo, color intenso y escala expresiva. El ciprés suele interpretarse como nexo entre tierra y cielo, aunque el significado no es único.' },
 'La joven de la perla': { place:'Probablemente Delft, Países Bajos; el lugar exacto de ejecución no está documentado.', collection:'Mauritshuis, La Haya, Países Bajos.', meaning:'Tronie holandesa: no se conoce la identidad de la modelo. El turbante exótico, la mirada vuelta y el brillo mínimo de la perla concentran la atención en la expresión y la luz.' },
 'Guernica': { place:'París, Francia; realizada para el Pabellón Español de la Exposición Internacional de 1937.', collection:'Museo Nacional Centro de Arte Reina Sofía, Madrid.', meaning:'Condena de la brutalidad de la guerra, asociada al bombardeo de Guernica del 26 de abril de 1937. Picasso evitó un relato documental literal y recurrió a símbolos y cuerpos fragmentados.' },
 'Piedad (Pietat)': { place:'No confirmable con el título del modelo; debe comprobarse el registro del Museu Frederic Marès.', collection:'Referencia indicada por el enlace: Museu Frederic Marès.', meaning:'La Piedad pertenece a la iconografía cristiana del duelo de María ante el cuerpo de Cristo. Datos de autoría, fecha y material pendientes de verificación.' },
 'La Anunciación': { place:'Si el modelo corresponde al fresco de San Marco: convento de San Marco, Florencia, Italia.', collection:'La versión exacta del modelo debe confirmarse; Fra Angelico realizó varias Anunciaciones.', meaning:'La escena anuncia la Encarnación. En la versión de San Marco, el espacio austero y los gestos contenidos favorecen una lectura meditativa.' },
 'El gran dragón rojo': { place:'Serie realizada en Inglaterra, aproximadamente entre 1805 y 1810; ubicación exacta de la versión enlazada pendiente.', collection:'William Blake produjo varias imágenes de la serie; la obra exacta del enlace requiere identificación.', meaning:'Visión apocalíptica inspirada en el Libro del Apocalipsis. La anatomía monumental y el contraste entre figura y fondo convierten el símbolo religioso en una imagen visionaria.' },
 'Griegos contra persas': { place:'No identificable con seguridad sin conocer la obra histórica que reproduce el modelo.', collection:'Obra fuente pendiente de identificación.', meaning:'El título remite a las guerras médicas de la Antigüedad, pero no basta para fijar un episodio o significado iconográfico concreto.' },
 'Composición VIII': { place:'Weimar, Alemania, durante la etapa de Kandinsky en la Bauhaus.', collection:'Solomon R. Guggenheim Museum, Nueva York.', meaning:'Kandinsky explora la capacidad expresiva autónoma de color, línea y geometría; no representa un relato figurativo específico.' },
 'La persistencia de la memoria': { place:'Realizada en 1931; Dalí trabajaba entre París y Portlligat/Cadaqués. El lugar exacto de ejecución no se afirma aquí.', collection:'Museum of Modern Art (MoMA), Nueva York.', meaning:'Los relojes blandos cuestionan la estabilidad del tiempo medido y crean una lógica onírica. La lectura psicoanalítica es influyente, pero no agota la obra.' },
 'El caminante sobre el mar de nubes': { place:'Alemania; lugar exacto de ejecución no documentado de forma concluyente.', collection:'Hamburger Kunsthalle, Hamburgo, Alemania.', meaning:'Figura de espaldas y paisaje sublime: el espectador comparte la mirada del caminante ante una naturaleza vasta e inabarcable.' },
 'Mano con esfera reflectante': { place:'Países Bajos; estampa de 1935.', collection:'La estampa se conserva en distintas colecciones; la localización de la versión enlazada no está confirmada.', meaning:'La esfera curva refleja al propio artista y su entorno, haciendo visible que toda representación depende de un punto de vista.' },
 'Nighthawks': { place:'Pintada en el estudio de Hopper en Nueva York; inspirada en un restaurante urbano, sin local real identificado.', collection:'Art Institute of Chicago, Chicago.', meaning:'El vidrio separa el interior iluminado de la calle vacía. La distancia entre las figuras crea una sensación de silencio y aislamiento moderno.' },
 'Autorretrato de Van Gogh': { place:'Si corresponde al autorretrato de 1889: Saint-Rémy-de-Provence, Francia; versión exacta pendiente.', collection:'Van Gogh pintó varios autorretratos; la ubicación de la versión enlazada requiere confirmar cuál reproduce.', meaning:'El autorretrato usa pincelada direccional, color contrastado y fondo activo para construir una presencia psicológica, no solo un parecido físico.' },
 'Tarde de domingo en la isla de la Grande Jatte': { place:'Isla de la Grande Jatte, en el Sena, cerca de París; trabajada en el estudio entre 1884 y 1886.', collection:'Art Institute of Chicago, Chicago.', meaning:'La mezcla óptica de puntos de color, la composición calculada y las figuras casi inmóviles transforman una escena de ocio en una investigación sobre percepción y vida moderna.' },
 'El grito 3D': { place:'La composición de 1893 fue concebida en Noruega; el lugar de ejecución de la versión digital no aplica.', collection:'Existen versiones en distintas colecciones, entre ellas el Museo Nacional de Noruega y el MUNCH de Oslo.', meaning:'La figura y el paisaje parecen compartir una misma vibración emocional. La imagen expresa angustia existencial; la versión exacta del modelo debe cotejarse con una de las versiones históricas.' },
 'El beso': { place:'Viena, Austria, durante la etapa dorada de Klimt.', collection:'Belvedere, Viena, Austria.', meaning:'La ornamentación dorada y los patrones distintos de cada figura funden intimidad corporal y superficie decorativa, característica del Jugendstil vienés.' },
 'Emma con sombrero de paja': { place:'No confirmable con el título del modelo.', collection:'Identificación de la obra fuente pendiente.', meaning:'El título por sí solo no permite asociar con seguridad la imagen a un artista o movimiento.' },
 'La ofrenda': { place:'No confirmable: existen varias obras con este título.', collection:'Identificación de la obra fuente pendiente.', meaning:'La interpretación depende de identificar la obra concreta. No se atribuye un simbolismo específico sin evidencia catalográfica.' },
 'We Can Do It!': { place:'Estados Unidos, producido para Westinghouse Electric en 1943.', collection:'Cartel histórico; existen ejemplares y reproducciones en varias colecciones.', meaning:'Su recepción posterior lo convirtió en icono de empoderamiento femenino, aunque su uso original fue una campaña interna de motivación laboral durante la guerra.' },
 'Virgen María con el Niño Jesús': { place:'No confirmable sin identificar la obra concreta.', collection:'Obra fuente pendiente de identificación.', meaning:'La iconografía mariana suele vincular maternidad y Encarnación, pero los detalles teológicos y estilísticos varían según época y tradición.' },
 'Kanagawa Sculpture 2.0': { place:'Recurso digital de Sketchfab; lugar de creación del modelo no verificado.', collection:'Modelo 3D contemporáneo; no equivale automáticamente a la estampa original de Hokusai.', meaning:'El título evoca La gran ola de Kanagawa, pero se requiere comprobar la ficha para saber si es reinterpretación, escultura digital o adaptación fiel.' },
 'Salón de baile / Ballroom': { place:'Escena digital; localización arquitectónica no identificada.', collection:'Modelo 3D de Sketchfab.', meaning:'Se cataloga como representación de un interior. No se le asigna significado histórico-artístico sin una obra fuente identificada.' },
 'Le Rêve 3D': { place:'No confirmable sin identificar la obra fuente del modelo.', collection:'Modelo 3D de Sketchfab.', meaning:'El título «El sueño» se usa en distintas obras; se evita atribuirlo a un artista específico sin confirmación.' },
 'Sylvia Plath 3D': { place:'Retrato digital; lugar de ejecución del modelo no verificado.', collection:'Modelo 3D de Sketchfab.', meaning:'El nombre identifica a la persona representada según el título, pero no determina autoría, fecha ni intención del retrato.' },
 'Vitruvian Man 3D': { place:'Probablemente realizado en Milán, Italia, hacia 1490; localización exacta de creación no documentada.', collection:'Gallerie dell’Accademia, Venecia, Italia.', meaning:'Leonardo estudia la proporción humana en relación con geometría clásica, anatomía y arquitectura; el círculo y el cuadrado funcionan como esquemas proporcionales.' },
 'Portrait of Françoise Gilot 3D': { place:'Modelo digital; obra fuente y lugar de creación pendientes de identificar.', collection:'No confirmada.', meaning:'El título indica a Françoise Gilot, pero no basta para determinar el artista o la etapa de su retrato.' },
 'Le Chat Noir Chibi 2.5D': { place:'La versión 2.5D es digital contemporánea; el cartel histórico de Steinlen fue creado en París en 1896.', collection:'Cartel histórico en múltiples colecciones; el activo enlazado es una adaptación digital.', meaning:'El cartel original anunciaba el cabaré Le Chat Noir. La versión «chibi» transforma la gráfica de cabaré en una estilización contemporánea y no debe confundirse con la litografía original.' },
 'Laocoön and His Sons (46)': { place:'Localización del modelo digital por verificar.', collection:'Modelo 3D de Sketchfab; registro de la obra fuente por confirmar.', meaning:'El grupo representa el episodio de Laocoonte y sus hijos atacados por serpientes. Esta es la entrada 46 del catálogo.' },
 'Laocoön and His Sons (47)': { place:'Localización del modelo digital por verificar.', collection:'Modelo 3D de Sketchfab; registro de la obra fuente por confirmar.', meaning:'Entrada 47 solicitada para el mismo modelo de Laocoonte y sus hijos.' },
 'Abduction of the Sabine Woman': { place:'Localización de creación del modelo por verificar.', collection:'Modelo 3D de Sketchfab; obra fuente exacta por confirmar.', meaning:'El título alude al episodio legendario romano del rapto de las sabinas; la versión concreta del modelo requiere verificación.' }
};

let paintingIndex=0;
FLOORS.forEach(F=>F.rooms.forEach(R=>{
 R.esc=0;
 R.art=[];
 for(let j=0;j<4;j++){
  const a=PAINTINGS[paintingIndex % PAINTINGS.length]; paintingIndex++;
  R.art.push([...a,'',2.2,1.7]);
 }
}));

/* =====================================================================
   2) MOTOR
   ===================================================================== */
const T=THREE,P=Math.PI,H=7,EYE=1.7,FH=10,HS=16;
const cv=document.getElementById('c'),fade=document.getElementById('fade'),card=document.getElementById('card');
const renderer=new T.WebGLRenderer({canvas:cv,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.xr.enabled=true;
renderer.xr.setReferenceSpaceType('local-floor');
let xrSession=null;
const scene=new T.Scene();scene.background=new T.Color(0x14110f);scene.fog=new T.Fog(0x14110f,25,80);
const cam=new T.PerspectiveCamera(70,1,.1,130);cam.rotation.order='YXZ';
let yaw=0,pitch=0,cf=0,tw=null;
function resize(){renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();

const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const mkCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};

/* ---- Iluminaciones ---- */
const PRE=[
 {n:'Galería',h:[0xfff4e0,0x6b5a48,1],p:[0xfff0d0,.55],pan:0xfffaf0,bg:0x14110f,art:1,wash:.12},
 {n:'Atardecer',h:[0xffb067,0x3a2a4a,.6],p:[0xff9a4d,.75],pan:0xffc27a,bg:0x2a1420,art:.92,wash:.25},
 {n:'Nocturna',h:[0x8aa2ff,0x101020,.28],p:[0x9ab8ff,.35],pan:0x6f86c8,bg:0x05060c,art:.8,wash:.5},
 {n:'Fría',h:[0xe6f0ff,0x5b6675,1.05],p:[0xdbe8ff,.5],pan:0xf2f7ff,bg:0x10151a,art:1,wash:.1}];
const hemi=new T.HemisphereLight(0xfff4e0,0x6b5a48,1);scene.add(hemi);
const panelMat=new T.MeshBasicMaterial({color:0xfffaf0}),lampMat=new T.MeshBasicMaterial({color:0xfff2cc});
const washTex=(()=>{const c=mkCanvas(128,128),g=c.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);
 r.addColorStop(0,'rgba(255,240,200,1)');r.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return new T.CanvasTexture(c)})();
const washMat=new T.MeshBasicMaterial({map:washTex,transparent:true,opacity:.12,blending:T.AdditiveBlending,depthWrite:false});
const plights=[],artMats=[];let pre=0;
const museumRoot=new T.Group();scene.add(museumRoot);
const gltfLoader=new T.GLTFLoader();gltfLoader.setCrossOrigin('anonymous');
const lt=document.getElementById('lt');
function setPre(i){
 pre=i;const p=PRE[i];hemi.color.set(p.h[0]);hemi.groundColor.set(p.h[1]);hemi.intensity=p.h[2];
 plights.forEach(l=>{l.color.set(p.p[0]);l.intensity=p.p[1]});
 panelMat.color.set(p.pan);washMat.color.set(p.pan);washMat.opacity=p.wash;
 scene.background.set(p.bg);scene.fog.color.set(p.bg);artMats.forEach(m=>m.color.setScalar(p.art));
 lt.textContent='💡 '+p.n;
}
lt.onclick=()=>setPre((pre+1)%PRE.length);

/* ---- Texturas ---- */
const floorTex=(()=>{
 const c=mkCanvas(256,256),g=c.getContext('2d'),r=rng(7);
 for(let i=0;i<2;i++)for(let j=0;j<2;j++){g.fillStyle=(i+j)%2?'#c9bfae':'#e6dfd2';g.fillRect(i*128,j*128,128,128)}
 g.strokeStyle='rgba(120,105,85,.15)';
 for(let i=0;i<40;i++){g.beginPath();g.moveTo(r()*256,r()*256);g.lineTo(r()*256,r()*256);g.stroke()}
 g.strokeStyle='rgba(90,80,65,.5)';g.strokeRect(0,0,256,256);
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(16,16);t.anisotropy=4;return t})();
function sample(seed,w,h){
 const c=mkCanvas(640,Math.round(640*h/w)),g=c.getContext('2d'),r=rng(seed*977+13),hu=r()*360;
 const gr=g.createLinearGradient(0,0,0,c.height);
 gr.addColorStop(0,`hsl(${hu},45%,70%)`);gr.addColorStop(1,`hsl(${(hu+50)%360},50%,32%)`);
 g.fillStyle=gr;g.fillRect(0,0,c.width,c.height);
 for(let i=0;i<16;i++){
  g.fillStyle=`hsla(${(hu+r()*140)%360},${40+r()*40}%,${25+r()*50}%,${.35+r()*.5})`;
  const x=r()*c.width,y=r()*c.height,s=30+r()*150;g.beginPath();
  if(r()>.5)g.arc(x,y,s/1.5,0,7);else g.rect(x-s/2,y-s/3,s,s*(.4+r()));g.fill();
 }
 return c;
}
function plaque(a){
 const c=mkCanvas(320,120),g=c.getContext('2d');
 g.fillStyle='#f6f1e6';g.fillRect(0,0,320,120);g.strokeStyle='#8a7550';g.lineWidth=4;g.strokeRect(2,2,316,116);
 g.fillStyle='#2a2118';g.font='bold 25px Georgia';g.fillText(a[0].slice(0,22),14,42);
 g.font='italic 21px Georgia';g.fillText(a[1].slice(0,26),14,76);g.font='19px Georgia';g.fillText(a[2],14,102);
 return new T.CanvasTexture(c);
}

/* Miniatura de Sketchfab como imagen de la pintura (necesita internet al abrir el museo) */
function sfThumb(id,cb){fetch('https://api.sketchfab.com/v3/models/'+id).then(r=>r.json()).then(d=>{
 const L=((d.thumbnails&&d.thumbnails.images)||[]).slice().sort((x,y)=>x.width-y.width),im=L.find(i=>i.width>=900)||L[L.length-1];
 if(im)cb(im.url)}).catch(e=>console.warn('Sin miniatura de Sketchfab',id,e))}

/* ---- Construcción de pisos ---- */
const frameMat=new T.MeshStandardMaterial({color:0x7a5a2c,roughness:.5,metalness:.3});
const pedMat=new T.MeshStandardMaterial({color:0xd9d2c4,roughness:.4});
const SZ=[[2.6,1.7],[1.8,2.4],[2.4,1.6],[2,2]],SO=[[0,0],[-7,7],[7,-7],[-7,-7],[7,7]];
const sculpts={};let sc=0,ci=0;
function roomSlots(cx,cz){
 const sd=[{p:t=>[cx+t,cz-HS+.25],ry:0,ex:cz<0},{p:t=>[cx+t,cz+HS-.25],ry:P,ex:cz>0},
  {p:t=>[cx-HS+.25,cz+t],ry:P/2,ex:cx<0},{p:t=>[cx+HS-.25,cz+t],ry:-P/2,ex:cx>0}];
 const a=[],b=[];
 sd.forEach(s=>{if(s.ex)a.push([...s.p(0),s.ry]);[-8,8].forEach(t=>b.push([...s.p(t),s.ry]))});
 return a.concat(b);
}
const floors=FLOORS.map((F,li)=>{
 const g=new T.Group();g.position.y=li*FH;museumRoot.add(g);
 const fl={g,col:[],items:[],solid:[],y:li*FH};
 const wm=new T.MeshStandardMaterial({color:F.wall,roughness:.9});
 const box=(x,z,w,d,h,y0=0,col=true)=>{
  const m=new T.Mesh(new T.BoxGeometry(w,h,d),wm);m.position.set(x,y0+h/2,z);g.add(m);fl.solid.push(m);
  if(col)fl.col.push({a:x-w/2,b:x+w/2,c:z-d/2,d:z+d/2});};
 const fm=new T.Mesh(new T.PlaneGeometry(64,64),new T.MeshStandardMaterial({map:floorTex,color:F.tile,roughness:.35}));
 fm.rotation.x=-P/2;g.add(fm);
 const ce=new T.Mesh(new T.PlaneGeometry(64,64),new T.MeshStandardMaterial({color:0xf5f1ea}));
 ce.rotation.x=P/2;ce.position.y=H;g.add(ce);
 const pg=new T.PlaneGeometry(4,1.2);
 for(const x of [-24,-8,8,24])for(const z of [-24,-8,8,24]){
  const p=new T.Mesh(pg,panelMat);p.rotation.x=P/2;p.position.set(x,H-.02,z);g.add(p)}
 // muros: perímetro + cruz con puertas en el centro de cada lado de sala
 box(0,-32,64.4,.4,H);box(0,32,64.4,.4,H);box(-32,0,.4,64,H);box(32,0,.4,64,H);
 for(const [a,b] of [[-32,-18.5],[-13.5,13.5],[18.5,32]]){box(0,(a+b)/2,.4,b-a,H);box((a+b)/2,0,b-a,.4,H)}
 for(const c of [-16,16]){box(0,c,.4,5,H-3.6,3.6,false);box(c,0,5,.4,H-3.6,3.6,false)}
 F.rooms.forEach((R,ri)=>{
  const cx=ri%2?16:-16,cz=ri>1?16:-16;
  const rug=new T.Mesh(new T.PlaneGeometry(14,14),new T.MeshStandardMaterial({color:R.rug,roughness:1}));
  rug.rotation.x=-P/2;rug.position.set(cx,.02,cz);g.add(rug);
  const pl=new T.PointLight(0xfff0d0,.55,34);pl.position.set(cx,H-.8,cz);g.add(pl);plights.push(pl);
  const sl=roomSlots(cx,cz);
  R.art.forEach((a,i)=>{
   const [x,z,ry]=sl[i],d=SZ[(ri+i)%4],w=a[6]||d[0],h=a[7]||d[1],grp=new T.Group();
   const asset=ART_ASSETS[a[0]]||{};
   grp.add(new T.Mesh(new T.BoxGeometry(w+.22,h+.22,.1),frameMat));
   const mat=new T.MeshBasicMaterial({map:new T.CanvasTexture(sample(++ci,w,h))});artMats.push(mat);
   const pic=new T.Mesh(new T.PlaneGeometry(w,h),mat);pic.position.z=.056;grp.add(pic);
   const fit=t=>{const ia=t.image.width/t.image.height,fa=w/h;t.repeat.set(1,1);t.offset.set(0,0);
    if(ia>fa){t.repeat.x=fa/ia;t.offset.x=(1-t.repeat.x)/2}else{t.repeat.y=ia/fa;t.offset.y=(1-t.repeat.y)/2}
    mat.map=t;mat.needsUpdate=true};
   const loadImg=u=>new T.TextureLoader().setCrossOrigin('anonymous').load(u,fit,undefined,()=>console.warn('No se pudo cargar',u));
   if(a[5])loadImg(a[5]);else{const m=(asset.sketchfabUrl||'').match(/[0-9a-f]{32}/);if(m)sfThumb(m[0],loadImg)}
   const pq=new T.Mesh(new T.PlaneGeometry(.55,.206),new T.MeshBasicMaterial({map:plaque(a)}));pq.position.set(w/2+.55,-h/2+.3,.01);grp.add(pq);
   const lp=new T.Mesh(new T.BoxGeometry(.8,.05,.1),lampMat);lp.position.set(0,h/2+.32,.1);grp.add(lp);
   const wash=new T.Mesh(new T.PlaneGeometry(w+3,h+2.6),washMat);wash.position.z=-.04;grp.add(wash);
   grp.position.set(x,2.3,z);grp.rotation.y=ry;g.add(grp);
   const it={pos:new T.Vector3(x,fl.y+2.3,z),n:new T.Vector3(Math.sin(ry),0,Math.cos(ry)),size:Math.max(w,h),w,h,range:5.5,
    info:{title:a[0],artist:a[1],year:a[2],tech:a[3],desc:a[4],size:`${w*50|0} × ${h*50|0} cm`,
     place:(ART_DETAILS[a[0]]||{}).place||'Pendiente de verificación',
     collection:(ART_DETAILS[a[0]]||{}).collection||'No confirmada',
     meaning:(ART_DETAILS[a[0]]||{}).meaning||'La identificación de la obra fuente está pendiente.',
     digital:'El cuadro del museo es una presentación digital del recurso enlazado; la técnica indicada corresponde a la obra original cuando está identificada.',
     sketchfabUrl:asset.sketchfabUrl||'',modelUrl:asset.modelUrl||'',links:Array.isArray(asset.links)?asset.links:[]}};
   grp.userData.item=it;
   fl.solid.push(grp);fl.items.push(it);
   // Un archivo GLB/GLTF directo se carga como un objeto 3D dentro del marco.
   if(asset.modelUrl){
    gltfLoader.load(asset.modelUrl,gltf=>{
     const model=gltf.scene;const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
     const maxX=Math.max(size.x,.001),maxY=Math.max(size.y,.001),maxZ=Math.max(size.z,.001);
     const scale=Math.min((w*.76)/maxX,(h*.76)/maxY,.85/maxZ);
     model.scale.setScalar(scale);model.position.set(-center.x*scale,-center.y*scale,-center.z*scale+.16);
     grp.add(model);pic.visible=false;wash.visible=false;
    },undefined,err=>console.warn('No se pudo cargar el modelo 3D de '+a[0],err));
   }
  });
 });
 return fl;
});
window.setSculpture=(n,o,s=1)=>{
 const k=sculpts[n];if(!k)return;
 if(k.ph){k.ho.remove(k.ph);k.ph=null}if(k.c)k.ho.remove(k.c);
 o.scale.setScalar(s);k.ho.add(o);k.c=o;
};

let cur=null,clickedItem=null,locT='';const locEl=document.getElementById('loc');

/* ---- Pisos (ascensor) ---- */
function show(i){
 cf=i;floors.forEach((f,k)=>f.g.visible=k==i);
 if(renderer.xr.isPresenting){museumRoot.position.set(16,-floors[i].y,-24);museumRoot.rotation.set(0,0,0)}
 else{museumRoot.position.set(0,0,0);museumRoot.rotation.set(0,0,0);cam.position.set(-16,floors[i].y+EYE,24);yaw=0;pitch=0}
 tw=null;showCard(null);setPre(FLOORS[i].light);
 document.querySelectorAll('[data-f]').forEach(b=>b.classList.toggle('on',b.dataset.f==i));
}
document.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
 const i=+b.dataset.f;if(i==cf)return;fade.style.opacity=1;setTimeout(()=>{show(i);fade.style.opacity=0},280)});
show(0);

/* ---- Entrada a Meta Quest / WebXR ---- */
const vrBtn=document.getElementById('vrBtn');
async function checkVRSupport(){
 if(!navigator.xr||!navigator.xr.isSessionSupported){vrBtn.disabled=true;vrBtn.textContent='VR requiere HTTPS';vrBtn.title='Publica el museo en HTTPS para entrar en WebXR.';return}
 try{const ok=await navigator.xr.isSessionSupported('immersive-vr');if(!ok){vrBtn.disabled=true;vrBtn.textContent='VR no disponible'}}catch(e){vrBtn.disabled=true;vrBtn.textContent='VR no disponible'}
}
checkVRSupport();
vrBtn.addEventListener('click',async()=>{
 if(!navigator.xr){alert('Para usar Meta Quest, publica este archivo en una dirección HTTPS y ábrelo con Quest Browser.');return}
 try{
  const ok=await navigator.xr.isSessionSupported('immersive-vr');if(!ok)throw new Error('Este navegador no ofrece immersive-vr.');
  xrSession=await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor','bounded-floor','hand-tracking','dom-overlay'],domOverlay:{root:document.body}});
  museumRoot.position.set(16,-floors[cf].y,-24);museumRoot.rotation.set(0,0,0);
  cam.position.set(0,0,0);cam.rotation.set(0,0,0);yaw=0;pitch=0;
  await renderer.xr.setSession(xrSession);document.body.classList.add('xr-mode');vrBtn.textContent='VR ACTIVO';
  xrSession.addEventListener('end',()=>{document.body.classList.remove('xr-mode');museumRoot.position.set(0,0,0);museumRoot.rotation.set(0,0,0);xrSession=null;show(cf);vrBtn.textContent='ENTRAR EN VR'});
 }catch(e){console.error(e);alert('No se pudo iniciar VR. Abre el museo desde Meta Quest Browser usando HTTPS y permite el acceso a VR.');}
});

/* ---- Ir frente a una obra ---- */
function teleportXR(it){
 const n=it.n?it.n.clone():new T.Vector3(0,0,1);
 const angle=Math.atan2(n.x,n.z);museumRoot.rotation.set(0,-angle,0);
 const rotated=it.pos.clone().applyAxisAngle(new T.Vector3(0,1,0),-angle);
 museumRoot.position.x=-rotated.x;museumRoot.position.y=-floors[cf].y;museumRoot.position.z=-(it.n?Math.min(4,Math.max(1.8,it.size*.75+.8)):2.8)-rotated.z;
}
function viewDist(it){ // la obra ocupa ~70% de la vista, según el campo de visión y la pantalla
 const vf=cam.fov*P/180,hf=2*Math.atan(Math.tan(vf/2)*cam.aspect);
 return Math.min(6,Math.max(1.8,Math.max(it.h/(2*Math.tan(vf/2)),it.w/(2*Math.tan(hf/2)))/.7+.3))}
function approach(it){syncTour(it);
 if(renderer.xr.isPresenting){teleportXR(it);showCard(it);return}
 const fl=floors[cf],p=cam.position,c=it.pos;let dx,dz,d;
 if(it.n){dx=it.n.x;dz=it.n.z;d=viewDist(it)}
 else{dx=p.x-c.x;dz=p.z-c.z;const l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;d=3.6}
 const tx=c.x+dx*d,tz=c.z+dz*d,to={x:tx,z:tz,yaw:Math.atan2(tx-c.x,tz-c.z),p:Math.atan2(c.y-fl.y-EYE,d)-(it.n?.07:0)};
 if(Math.hypot(tx-p.x,tz-p.z)>16){
  fade.style.opacity=1;tw=null;
  setTimeout(()=>{p.x=tx;p.z=tz;yaw=to.yaw;pitch=to.p;fade.style.opacity=0},260);
 }else tw={t:0,f:{x:p.x,z:p.z,yaw,p:pitch},to};
}
const ray=new T.Raycaster();ray.far=45;
function tap(x,y){
 ray.setFromCamera({x:x/innerWidth*2-1,y:-(y/innerHeight)*2+1},cam);
 const h=ray.intersectObjects(floors[cf].solid,true)[0];if(!h)return;
 if(h.object.userData.view3DId){openViewer(h.object.userData.view3DId);return}
 let o=h.object;while(o&&!o.userData.item)o=o.parent;if(o){clickedItem=o.userData.item;approach(clickedItem);showCard(clickedItem)}
}

/* Los gatillos de los mandos seleccionan una obra y teletransportan al visitante. */
const xrControllers=[];
for(let i=0;i<2;i++){
 const controller=renderer.xr.getController(i);
 controller.addEventListener('select',()=>{
  const origin=new T.Vector3();controller.getWorldPosition(origin);
  const direction=new T.Vector3(0,0,-1).transformDirection(controller.matrixWorld).normalize();
  ray.set(origin,direction);ray.far=60;
  const hb=ray.intersectObjects(hudBtns)[0];if(hb){hb.object.userData.act();return}
  const hit=ray.intersectObjects(floors[cf].solid,true)[0];if(!hit)return;
  if(hit.object.userData.view3DId){openViewer(hit.object.userData.view3DId);return}
  let obj=hit.object;while(obj&&!obj.userData.item)obj=obj.parent;
  if(obj){const item=obj.userData.item;approach(item);showCard(item)}
 });
 const beamGeom=new T.BufferGeometry().setFromPoints([new T.Vector3(0,0,0),new T.Vector3(0,0,-8)]);
 const beam=new T.Line(beamGeom,new T.LineBasicMaterial({color:0xd8b26a,transparent:true,opacity:.8}));beam.frustumCulled=false;controller.add(beam);
 scene.add(controller);xrControllers.push(controller);
}

/* ---- Recorrido guiado: siguiente / anterior, listado y panel en VR ---- */
const ACTIVE_FLOORS=3; // los tres pisos están activos
const TOUR=[];let tourIdx=-1,guided=false,hudPlace=false;
floors.slice(0,ACTIVE_FLOORS).forEach((f,fi)=>{let k=0;FLOORS[fi].rooms.forEach(R=>{
 const n=R.art.length+(typeof R.esc=='number'?R.esc:R.esc.length);
 for(let j=0;j<n;j++)TOUR.push({it:f.items[k++],fi,room:R.name})})});
const navLbl=document.getElementById('navLbl'),listEl=document.getElementById('list');
// Panel 3D para VR (se coloca frente al visitante; apúntalo con el mando y pulsa el gatillo)
const hud=new T.Group();hud.visible=false;scene.add(hud);const hudBtns=[];let hudC,hudT;
function lbl(c,txt){const g=c.getContext('2d');g.fillStyle='rgba(20,17,15,.92)';g.fillRect(0,0,c.width,c.height);
 g.strokeStyle='#d8b26a';g.lineWidth=4;g.strokeRect(2,2,c.width-4,c.height-4);g.fillStyle='#f3ede2';
 g.font='bold '+(c.height*.38|0)+'px Georgia';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,c.width/2,c.height/2)}
function mkHud(txt,w,h,x,act){
 const c=mkCanvas(Math.round(w*800),Math.round(h*800));lbl(c,txt);const t=new T.CanvasTexture(c);
 const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:t,transparent:true,depthTest:false,fog:false}));
 m.renderOrder=999;m.position.x=x;m.userData.act=act;hud.add(m);if(act)hudBtns.push(m);return [c,t]}
mkHud('◀',.3,.12,-.62,()=>step(-1));mkHud('▶',.3,.12,.62,()=>step(1));
[hudC,hudT]=mkHud('',.9,.12,0,null);
let activeModelId='';let hud3DC,hud3DT;
[hud3DC,hud3DT]=mkHud('3D',.32,.12,1.18,()=>{if(activeModelId)openViewer(activeModelId)});
function setHud3D(id){activeModelId=id||'';lbl(hud3DC,activeModelId?'3D':'—');hud3DT.needsUpdate=true}
function updateNav(){
 const t=tourIdx>=0?TOUR[tourIdx]:null;
 navLbl.textContent=(tourIdx+1)+' / '+TOUR.length;
 listEl.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('on',i==tourIdx));
 lbl(hudC,t?(tourIdx+1)+'/'+TOUR.length+' · '+t.it.info.title.slice(0,24):'Pulsa ▶ para empezar');hudT.needsUpdate=true;
}
function syncTour(it){const k=TOUR.findIndex(t=>t.it===it);if(k>=0){tourIdx=k;updateNav()}}
function goTo(i){
 i=(i+TOUR.length)%TOUR.length;tourIdx=i;const t=TOUR[i];updateNav();hudPlace=true;
 if(t.fi!==cf){fade.style.opacity=1;setTimeout(()=>{show(t.fi);approach(t.it);showCard(t.it);fade.style.opacity=0},280)}
 else{approach(t.it);showCard(t.it)}
}
const step=d=>goTo(tourIdx<0?(d>0?0:TOUR.length-1):tourIdx+d);
const toggleList=v=>listEl.classList.toggle('on',v);
(()=>{let lf=-1,lr='';listEl.innerHTML='<h3>OBRAS</h3>';
 TOUR.forEach((t,i)=>{
  if(t.fi!==lf){lf=t.fi;lr='';const d=document.createElement('div');d.className='fl';d.textContent=FLOORS[t.fi].name;listEl.appendChild(d)}
  if(t.room!==lr){lr=t.room;const d=document.createElement('div');d.className='rm';d.textContent=t.room;listEl.appendChild(d)}
  const b=document.createElement('button');b.textContent=(i+1)+'. '+t.it.info.title;b.onclick=()=>{goTo(i);toggleList(false)};listEl.appendChild(b)})})();
document.getElementById('pv').onclick=()=>step(-1);document.getElementById('nx').onclick=()=>step(1);
document.getElementById('lb').onclick=()=>toggleList();
const gdB=document.getElementById('gd');
gdB.onclick=()=>{guided=!guided;gdB.classList.toggle('on',guided);document.body.classList.toggle('guided',guided);tw=null};
addEventListener('keydown',e=>{if(e.repeat)return;
 if(e.code==='PageDown'||(guided&&e.code==='ArrowRight'))step(1);
 else if(e.code==='PageUp'||(guided&&e.code==='ArrowLeft'))step(-1);
 else if(e.code==='KeyL')toggleList()});
renderer.xr.addEventListener('sessionstart',()=>{hudPlace=true});
xrControllers.forEach(c=>c.addEventListener('squeezestart',()=>{hudPlace=true})); // apretar el agarre = traer el panel frente a ti
let axLatch=false;
function vrTick(){
 const xr=renderer.xr.isPresenting;hud.visible=xr;if(!xr)return;
 if(hudPlace){const xc=renderer.xr.getCamera(cam),p=new T.Vector3(),d=new T.Vector3();xc.getWorldPosition(p);xc.getWorldDirection(d);d.y=0;
  if(d.lengthSq()>.01){d.normalize();hud.position.set(p.x+d.x*1.2,p.y-.55,p.z+d.z*1.2);hud.lookAt(p.x,hud.position.y,p.z);hudPlace=false}}
 const ss=renderer.xr.getSession();let ax=0;
 if(ss)for(const src of ss.inputSources){const gp=src.gamepad;if(gp&&gp.axes.length>=4&&Math.abs(gp.axes[2])>Math.abs(ax))ax=gp.axes[2]}
 if(Math.abs(ax)>.7){if(!axLatch){axLatch=true;step(ax>0?1:-1)}}else if(Math.abs(ax)<.3)axLatch=false; // palanca izquierda/derecha
}
updateNav();

document.querySelectorAll('[data-f]').forEach(b=>{if(+b.dataset.f>=ACTIVE_FLOORS)b.style.display='none'});

/* ---- Visor 3D integrado: conserva «Ver en 3D» y elimina el enlace externo ---- */
const vw=document.getElementById('viewer'),vf=vw.querySelector('iframe');
function openViewer(id){vf.src='https://sketchfab.com/models/'+id+'/embed?autostart=1&ui_theme=dark';vw.classList.add('on')}
function closeViewer(){vw.classList.remove('on');vf.src='about:blank'}
document.getElementById('vx').onclick=closeViewer;
addEventListener('keydown',e=>{if(e.code==='Escape')closeViewer()});
card.addEventListener('click',e=>{const a=e.target.closest('[data-embed]');if(a){e.preventDefault();const id=a.dataset.embed;if(id)openViewer(id)}});

/* ---- Controles ---- */
const keys={};
addEventListener('keydown',e=>keys[e.code]=true);addEventListener('keyup',e=>keys[e.code]=false);
let lookId=null,lx,ly,st,moved;
cv.addEventListener('pointerdown',e=>{if(lookId===null){lookId=e.pointerId;lx=e.clientX;ly=e.clientY;st=performance.now();moved=0;cv.setPointerCapture(e.pointerId)}});
cv.addEventListener('pointermove',e=>{
 if(e.pointerId!==lookId)return;
 const dx=e.clientX-lx,dy=e.clientY-ly,k=e.pointerType==='touch'?.005:.004;
 moved+=Math.abs(dx)+Math.abs(dy);if(moved>8)tw=null;
 yaw-=dx*k;pitch=Math.max(-1.2,Math.min(1.2,pitch-dy*k));lx=e.clientX;ly=e.clientY;
});
const endLook=e=>{if(e.pointerId===lookId){lookId=null;if(e.type=='pointerup'&&moved<8&&performance.now()-st<400)tap(e.clientX,e.clientY)}};
cv.addEventListener('pointerup',endLook);cv.addEventListener('pointercancel',endLook);

const joy=document.getElementById('joy'),knob=joy.firstElementChild;let joyId=null,jx=0,jy=0;
function joyMove(e){
 const r=joy.getBoundingClientRect();let dx=e.clientX-(r.left+55),dy=e.clientY-(r.top+55);
 const l=Math.hypot(dx,dy),m=48;if(l>m){dx*=m/l;dy*=m/l}
 jx=dx/m;jy=dy/m;knob.style.transform=`translate(${dx}px,${dy}px)`;
}
joy.addEventListener('pointerdown',e=>{joyId=e.pointerId;joy.setPointerCapture(e.pointerId);joyMove(e)});
joy.addEventListener('pointermove',e=>{if(e.pointerId===joyId)joyMove(e)});
const endJoy=e=>{if(e.pointerId===joyId){joyId=null;jx=jy=0;knob.style.transform=''}};
joy.addEventListener('pointerup',endJoy);joy.addEventListener('pointercancel',endJoy);

/* ---- Música ambiental suave (generada, sin archivos) ---- */
let ac,master,musicOn=false;const mu=document.getElementById('mu');
function startMusic(){
 if(ac)return;
 try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 master=ac.createGain();master.gain.value=0;master.connect(ac.destination);
 const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;lp.connect(master);
 const dl=ac.createDelay(1);dl.delayTime.value=.5;const fb=ac.createGain();fb.gain.value=.5;
 const lp2=ac.createBiquadFilter();lp2.type='lowpass';lp2.frequency.value=1500;
 lp.connect(dl);dl.connect(lp2);lp2.connect(fb);fb.connect(dl);lp2.connect(master);
 const fq=m=>440*Math.pow(2,(m-69)/12);
 const note=(m,t,d,v,ty)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.value=fq(m);o.detune.value=(Math.random()-.5)*10;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+d*.3);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(lp);o.start(t);o.stop(t+d+.1)};
 const ch=[[48,55,59,64],[45,52,60,64],[41,48,57,64],[43,50,59,62]],pent=[72,74,76,79,81,84];
 let bar=0,next=ac.currentTime+.2;
 setInterval(()=>{while(next<ac.currentTime+4){
  ch[bar%4].forEach(m=>note(m,next,7.5,.05,'sine'));
  for(let i=0;i<4;i++)if(Math.random()<.7)note(pent[Math.random()*6|0],next+i*1.6+Math.random()*.5,4,.05,'triangle');
  next+=6.4;bar++}},1000);
 musicOn=true;master.gain.linearRampToValueAtTime(.5,ac.currentTime+4);mu.classList.add('on');
}
mu.onclick=()=>{
 if(!ac)return startMusic();
 musicOn=!musicOn;master.gain.setTargetAtTime(musicOn?.5:0,ac.currentTime,.3);mu.classList.toggle('on',musicOn);
};
document.getElementById('go').onclick=()=>{document.getElementById('start').style.display='none';startMusic()};

/* ---- Ficha, ubicación y bucle ---- */
const R_=.5;
const hit=(x,z)=>floors[cf].col.some(c=>x>c.a-R_&&x<c.b+R_&&z>c.c-R_&&z<c.d+R_);
function escHTML(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function validHttpUrl(v){try{const u=new URL(v,location.href);return (u.protocol==='https:'||u.protocol==='http:')?u.href:''}catch(e){return ''}}
function showCard(it){
 if(it===cur)return;cur=it;
 if(!it){setHud3D('');card.classList.remove('on','expanded');return}
 const a=it.info,actions=[];const sf=validHttpUrl(a.sketchfabUrl);const mid=(sf.match(/[0-9a-f]{32}/)||[])[0];
 setHud3D(mid||'');
 if(mid)actions.push('<a href="#" data-embed="'+mid+'">Ver en 3D ▶</a>');
 (a.links||[]).forEach(l=>{const url=validHttpUrl(l&&l.url);if(url)actions.push(`<a href="${escHTML(url)}" target="_blank" rel="noopener noreferrer">${escHTML(l.label||'Más información')} ↗</a>`)});
 card.classList.remove('expanded');
 card.innerHTML=`<div class="card-top"><div class="card-heading"><h2>${escHTML(a.title)}</h2><div class="sub">${escHTML(a.artist)}, ${escHTML(a.year)}</div></div><div class="card-tools">${mid?'<button type="button" id="open3DCard" class="quick3d" aria-label="Abrir modelo 3D">↗ 3D</button>':''}<button type="button" id="detailsToggle" aria-expanded="false">Ficha técnica ＋</button><button type="button" id="cardHide" aria-label="Ocultar ficha">✕</button></div></div><div class="card-details" id="cardDetails"><table>
 <tr><td>Técnica / soporte</td><td>${escHTML(a.tech)}</td></tr>
 <tr><td>Lugar de creación</td><td>${escHTML(a.place)}</td></tr>
 <tr><td>Ubicación / colección</td><td>${escHTML(a.collection)}</td></tr>
 <tr><td>Formato en museo</td><td>Reproducción digital enmarcada; visor interactivo del modelo 3D de Sketchfab.</td></tr>
 <tr><td>Dimensiones del marco virtual</td><td>${escHTML(a.size)}</td></tr>
 </table><p><strong>Descripción técnica e histórica.</strong> ${escHTML(a.desc)}</p><p style="margin-top:8px"><strong>Contexto e interpretación.</strong> ${escHTML(a.meaning)}</p>${actions.length?`<div class="links">${actions.join('')}</div>`:''}</div>`;
 const quick3D=card.querySelector('#open3DCard');if(quick3D&&mid)quick3D.addEventListener('click',()=>openViewer(mid));
 card.querySelector('#detailsToggle').addEventListener('click',()=>{
  const expanded=card.classList.toggle('expanded');
  const b=card.querySelector('#detailsToggle');b.textContent=expanded?'Ocultar ficha −':'Ficha técnica ＋';b.setAttribute('aria-expanded',String(expanded));
 });
 card.querySelector('#cardHide').addEventListener('click',()=>{card.classList.remove('on','expanded');cur=null;clickedItem=null});
 card.classList.add('on');
}
const fwd=new T.Vector3(),tmp=new T.Vector3();
function updateCard(){
 if(renderer.xr.isPresenting)return;
 if(guided){showCard(tourIdx>=0?TOUR[tourIdx].it:null);return}
 // Mantiene visible la ficha seleccionada mientras la cámara se acerca o hace el salto inicial.
 if(clickedItem&&(tw||fade.style.opacity==='1')){showCard(clickedItem);return}
 if(clickedItem&&!tw&&fade.style.opacity!=='1')clickedItem=null;
 cam.getWorldDirection(fwd);let best=null,bd=1e9;
 for(const it of floors[cf].items){
  tmp.copy(it.pos).sub(cam.position);const d=tmp.length();
  if(d>it.range||d>=bd)continue;
  if(tmp.normalize().dot(fwd)<.6)continue;
  if(it.n&&tmp.dot(it.n)>0)continue;
  best=it;bd=d;
 }
 showCard(best);
}
let last=performance.now();
function loop(now){
 const dt=Math.min((now-last)/1000,.05);last=now;
 const p=cam.position;
 if(!renderer.xr.isPresenting){
  if(!guided){if(keys.ArrowLeft)yaw+=1.8*dt;if(keys.ArrowRight)yaw-=1.8*dt}
  let f=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0)-jy,s=(keys.KeyD?1:0)-(keys.KeyA?1:0)+jx;
  if(guided){f=0;s=0}const l=Math.hypot(f,s);if(l>.15)tw=null;
  if(tw){
   tw.t+=dt/1.4;const k=tw.t>=1?1:(1-Math.cos(tw.t*P))/2,a=tw.f,b=tw.to;
   p.x=a.x+(b.x-a.x)*k;p.z=a.z+(b.z-a.z)*k;
   yaw=a.yaw+(((b.yaw-a.yaw+P)%(2*P)+2*P)%(2*P)-P)*k;pitch=a.p+(b.p-a.p)*k;
   if(tw.t>=1)tw=null;
  }else if(l>0){
   if(l>1){f/=l;s/=l}
   const sp=(keys.ShiftLeft||keys.ShiftRight?7:3.8)*dt,sy=Math.sin(yaw),cy=Math.cos(yaw);
   const dx=(-sy*f+cy*s)*sp,dz=(-cy*f-sy*s)*sp;
   if(!hit(p.x+dx,p.z))p.x+=dx;if(!hit(p.x,p.z+dz))p.z+=dz;
  }
  p.y=floors[cf].y+EYE+(l>0&&!tw?Math.sin(now/260)*.025:0);
  cam.rotation.set(pitch,yaw,0);
  const ri=(p.z>0?2:0)+(p.x>0?1:0),t=FLOORS[cf].name+' — '+FLOORS[cf].rooms[ri].name;
  if(t!==locT){locT=t;locEl.textContent=t}
  updateCard();
 }
 vrTick();for(const k in sculpts)if(sculpts[k].ph)sculpts[k].ph.rotation.y+=dt*.6;
 renderer.render(scene,cam);
}
renderer.setAnimationLoop(loop);
