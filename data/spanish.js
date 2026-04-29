// ============================================================
//  Learn.edu — Spanish Lessons
//  Uses `level` field: 'beginning' | 'spanish1' | 'spanish2' | 'advanced'
// ============================================================

const SPANISH_LESSONS = [

  // ── BEGINNING SPANISH ────────────────────────────────────

  {
    id: "spa-4-greetings",
    code: "BEG-GR-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Greetings",
    title: "Saludos — Greetings",
    subtitle: "Hello, goodbye & how are you",
    duration: "7 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Your First Spanish Words!",
      text: "Spanish is spoken by 500+ million people — one of the most useful languages on Earth. Let's start with greetings. Big tip: in Spanish, words are almost always pronounced exactly how they're spelled. No tricky silent letters! That makes Spanish one of the easiest languages to start. ¡Vamos!"
    },
    practice: [
      { type: "multiple", q: "How do you say 'Hello' in Spanish?",                                                choices: ["Adiós","Gracias","Hola","Por favor"], answer: "Hola" },
      { type: "multiple", q: "What does 'Buenos días' mean?",                                                     choices: ["Good night","Good evening","Good morning","Good afternoon"], answer: "Good morning" },
      { type: "multiple", q: "'¿Cómo estás?' means...",                                                           choices: ["What's your name?","How are you?","Where are you from?","How old are you?"], answer: "How are you?" },
      { type: "multiple", q: "How do you say 'Goodbye' in Spanish?",                                             choices: ["Hola","Sí","Adiós","Buenas noches"], answer: "Adiós" },
      { type: "multiple", q: "It's 9pm. Which greeting is most appropriate?",                                    choices: ["Buenos días","Buenas tardes","Buenas noches","Hola amigo"], answer: "Buenas noches" }
    ],
    quiz: [
      { type: "multiple", q: "Someone says '¿Cómo te llamas?' They are asking your...",                           choices: ["Age","Name","Favorite color","Hometown"], answer: "Name" },
      { type: "multiple", q: "Which means 'Good afternoon'?",                                                    choices: ["Buenos días","Buenas noches","Buenas tardes","Hasta luego"], answer: "Buenas tardes" },
      { type: "multiple", q: "To say 'Nice to meet you' in Spanish you say...",                                   choices: ["De nada","Mucho gusto","Lo siento","Perdón"], answer: "Mucho gusto" }
    ]
  },

  {
    id: "spa-4-numbers",
    code: "BEG-NU-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Numbers",
    title: "Los Números — Numbers 1–20",
    subtitle: "Counting in Spanish",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Counting in Spanish",
      text: "Numbers in Spanish are super useful — for telling time, counting objects, and more. 1–10 you have to memorize, but 11–15 have a special pattern (once, doce, trece…) and 16–19 are combinations (dieciséis). Once you hit 20 (veinte) a pattern kicks in and everything gets easier!"
    },
    practice: [
      { type: "multiple", q: "What is 'cinco' in English?",                                                       choices: ["4","5","6","7"],            answer: "5" },
      { type: "multiple", q: "How do you say '10' in Spanish?",                                                   choices: ["Nueve","Ocho","Diez","Once"], answer: "Diez" },
      { type: "multiple", q: "What number is 'quince'?",                                                          choices: ["13","14","15","16"],        answer: "15" },
      { type: "multiple", q: "How do you say '20' in Spanish?",                                                   choices: ["Diez","Veinte","Doce","Dieciocho"], answer: "Veinte" },
      { type: "multiple", q: "What is 'trece' in English?",                                                       choices: ["11","12","13","14"],        answer: "13" }
    ],
    quiz: [
      { type: "multiple", q: "You want to say your age is 12 in Spanish. You say...",                             choices: ["Trece","Once","Doce","Catorce"], answer: "Doce" },
      { type: "multiple", q: "Which number comes after 'diecisiete' (17)?",                                       choices: ["Dieciséis","Diecinueve","Dieciocho","Veinte"], answer: "Dieciocho" },
      { type: "multiple", q: "How do you say '7' in Spanish?",                                                    choices: ["Seis","Siete","Ocho","Cinco"], answer: "Siete" }
    ]
  },

  {
    id: "spa-4-family",
    code: "BEG-FA-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Family",
    title: "La Familia — Family",
    subtitle: "Family members & relationships",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Mi Familia — My Family!",
      text: "Family is central to Spanish-speaking cultures! Key vocab: madre (mother), padre (father), hermano (brother), hermana (sister), abuelo (grandfather), abuela (grandmother), tio (uncle), tia (aunt), primo/prima (cousin). Notice the gender pattern: masculine words often end in 'o', feminine in 'a'. You will see this everywhere!"
    },
    practice: [
      { type: "multiple", q: "How do you say 'mother' in Spanish?",                                              choices: ["Padre","Madre","Hermana","Abuela"], answer: "Madre" },
      { type: "multiple", q: "What does 'hermano' mean?",                                                         choices: ["Sister","Brother","Father","Uncle"], answer: "Brother" },
      { type: "multiple", q: "How do you say 'grandmother'?",                                                    choices: ["Abuelo","Tia","Abuela","Prima"], answer: "Abuela" },
      { type: "multiple", q: "What is the Spanish word for 'cousin' (female)?",                                  choices: ["Primo","Tia","Prima","Hermana"], answer: "Prima" },
      { type: "multiple", q: "'Mi familia es grande' means...",                                                   choices: ["My family is small","My family is great","My family is big","My family is happy"], answer: "My family is big" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I have two brothers'?",                                            choices: ["Tengo dos hermanas","Tengo dos hermanos","Tengo tres hermanos","Soy dos hermanos"], answer: "Tengo dos hermanos" },
      { type: "multiple", q: "What does 'tio' mean?",                                                            choices: ["Cousin","Brother","Uncle","Father"], answer: "Uncle" },
      { type: "multiple", q: "In Spanish, words ending in 'o' are typically...",                                 choices: ["Feminine","Masculine","Neutral","Plural"], answer: "Masculine" }
    ]
  },

  {
    id: "spa-5-colors",
    code: "BEG-CA-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Colors",
    title: "Colores — Colors & Adjectives",
    subtitle: "Describing things in Spanish",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Paint Your World in Spanish!",
      text: "Colors: rojo (red), azul (blue), verde (green), amarillo (yellow), negro (black), blanco (white), anaranjado (orange), morado (purple), rosado (pink), gris (gray). Important rule: adjectives come AFTER the noun. So 'the red car' is 'el carro rojo'. Adjectives also match gender: la casa roja (feminine) vs el gato rojo (masculine)."
    },
    practice: [
      { type: "multiple", q: "How do you say 'blue' in Spanish?",                                                choices: ["Rojo","Verde","Azul","Amarillo"], answer: "Azul" },
      { type: "multiple", q: "What does 'verde' mean?",                                                          choices: ["Red","Blue","Green","Yellow"], answer: "Green" },
      { type: "multiple", q: "In Spanish, where does the adjective go?",                                         choices: ["Before the noun","After the noun","Start of sentence","It doesn't matter"], answer: "After the noun" },
      { type: "multiple", q: "How would you say 'the black cat'?",                                               choices: ["el negro gato","el gato negro","negro el gato","gato el negro"], answer: "el gato negro" },
      { type: "multiple", q: "What color is 'amarillo'?",                                                        choices: ["Purple","Orange","Yellow","Pink"], answer: "Yellow" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'the red house'?",                                                  choices: ["la roja casa","la casa roja","el casa rojo","roja la casa"], answer: "la casa roja" },
      { type: "multiple", q: "'Grande' and 'pequeño' are opposites. They mean...",                               choices: ["Hot and cold","Big and small","Fast and slow","Old and new"], answer: "Big and small" },
      { type: "multiple", q: "What color is 'morado'?",                                                          choices: ["Pink","Orange","Gray","Purple"], answer: "Purple" }
    ]
  },

  {
    id: "spa-beg-animals",
    code: "BEG-AN-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Animals",
    title: "Los Animales — Animals",
    subtitle: "Pets, farm & wild animals",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Animal Vocabulary in Spanish!",
      text: "Animals are a fantastic way to build vocabulary. Common animals: perro (dog), gato (cat), pájaro (bird), pez (fish), caballo (horse), vaca (cow), cerdo (pig), pollo (chicken), conejo (rabbit), oso (bear), tigre (tiger), elefante (elephant), mono (monkey), lobo (wolf). Notice: most animal names are masculine or feminine — you will need to learn whether to use 'el' or 'la' in front of each one."
    },
    practice: [
      { type: "multiple", q: "What is 'perro' in English?",                                                      choices: ["Cat","Dog","Bird","Fish"], answer: "Dog" },
      { type: "multiple", q: "How do you say 'horse' in Spanish?",                                               choices: ["Vaca","Cerdo","Caballo","Conejo"], answer: "Caballo" },
      { type: "multiple", q: "What does 'pájaro' mean?",                                                         choices: ["Fish","Rabbit","Bird","Bear"], answer: "Bird" },
      { type: "multiple", q: "'El gato come el ratón' means...",                                                  choices: ["The dog eats the mouse","The cat eats the mouse","The bird eats the mouse","The cat chases the dog"], answer: "The cat eats the mouse" },
      { type: "multiple", q: "Which is the Spanish word for 'cow'?",                                             choices: ["Cerdo","Vaca","Oveja","Pato"], answer: "Vaca" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I have a rabbit'?",                                                choices: ["Tengo un conejo","Tengo un perro","Hay un gato","Soy un conejo"], answer: "Tengo un conejo" },
      { type: "multiple", q: "What is 'el oso' in English?",                                                     choices: ["The tiger","The monkey","The bear","The wolf"], answer: "The bear" },
      { type: "multiple", q: "Which animal is 'el pez'?",                                                        choices: ["Bird","Fish","Rabbit","Cat"], answer: "Fish" }
    ]
  },

  {
    id: "spa-beg-days",
    code: "BEG-DM-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Days & Months",
    title: "Días y Meses — Days & Months",
    subtitle: "Calendar vocabulary in Spanish",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "The Calendar in Spanish!",
      text: "Days of the week: lunes (Monday), martes (Tuesday), miércoles (Wednesday), jueves (Thursday), viernes (Friday), sábado (Saturday), domingo (Sunday). Notice: Spanish days are NOT capitalized! Months: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre. To say 'today is Monday' — 'hoy es lunes'. Easy once you practice!"
    },
    practice: [
      { type: "multiple", q: "What day is 'miércoles'?",                                                         choices: ["Monday","Tuesday","Wednesday","Thursday"], answer: "Wednesday" },
      { type: "multiple", q: "How do you say 'Friday' in Spanish?",                                              choices: ["Jueves","Viernes","Sábado","Lunes"], answer: "Viernes" },
      { type: "multiple", q: "What month is 'julio'?",                                                           choices: ["June","July","August","January"], answer: "July" },
      { type: "multiple", q: "'Hoy es domingo' means...",                                                        choices: ["Today is Saturday","Yesterday was Sunday","Today is Sunday","Tomorrow is Sunday"], answer: "Today is Sunday" },
      { type: "multiple", q: "Which day comes after 'jueves' (Thursday)?",                                      choices: ["Miércoles","Martes","Viernes","Lunes"], answer: "Viernes" }
    ],
    quiz: [
      { type: "multiple", q: "Which months are the summer months in Spanish? (junio, julio, ___)",               choices: ["mayo","agosto","septiembre","enero"], answer: "agosto" },
      { type: "multiple", q: "How do you say 'My birthday is in March'?",                                        choices: ["Mi cumpleaños es en marzo","Mi cumpleaños es en mayo","Tengo cumpleaños en lunes","Hoy es marzo"], answer: "Mi cumpleaños es en marzo" },
      { type: "multiple", q: "In Spanish, are days of the week capitalized?",                                    choices: ["Yes, always","Only on calendars","No, they are not","Only the first day"], answer: "No, they are not" }
    ]
  },

  // ── SPANISH 1 ────────────────────────────────────────────

  {
    id: "spa-5-food",
    code: "S1-FD-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Food",
    title: "La Comida — Food & Dining",
    subtitle: "Ordering food, restaurants & meals",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Let's Talk About Food!",
      text: "Food vocabulary is incredibly useful! Key words: desayuno (breakfast), almuerzo (lunch), cena (dinner). Foods: manzana (apple), pan (bread), leche (milk), pollo (chicken), arroz (rice), agua (water), jugo (juice). To order: 'Quisiera...' means 'I would like...' and 'Me gusta...' means 'I like...'. Muy delicioso!"
    },
    practice: [
      { type: "multiple", q: "How do you say 'breakfast' in Spanish?",                                           choices: ["Cena","Almuerzo","Desayuno","Merienda"], answer: "Desayuno" },
      { type: "multiple", q: "What does 'leche' mean?",                                                          choices: ["Juice","Water","Milk","Soda"], answer: "Milk" },
      { type: "multiple", q: "How do you say 'I would like chicken and rice'?",                                  choices: ["Quiero pollo y arroz","Me gusta pan y leche","Tengo hambre de carne","Quisiera agua"], answer: "Quiero pollo y arroz" },
      { type: "multiple", q: "'Tengo hambre' means...",                                                          choices: ["I am thirsty","I am hungry","I like food","I want water"], answer: "I am hungry" },
      { type: "multiple", q: "What is 'manzana'?",                                                               choices: ["Orange","Apple","Banana","Grape"], answer: "Apple" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'dinner' in Spanish?",                                              choices: ["Desayuno","Almuerzo","Merienda","Cena"], answer: "Cena" },
      { type: "multiple", q: "'Me gusta el jugo de naranja' means...",                                           choices: ["I want orange milk","I like orange juice","I need orange water","I have oranges"], answer: "I like orange juice" },
      { type: "multiple", q: "In a restaurant, you would say '___' to order water.",                             choices: ["Quisiera agua, por favor","Tengo sed de leche","Me llamo agua","Gracias por agua"], answer: "Quisiera agua, por favor" }
    ]
  },

  {
    id: "spa-6-verbs",
    code: "S1-VA-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Verbs",
    title: "Verbos — Action Verbs",
    subtitle: "Present tense conjugation",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Verbs Are the Heart of Spanish!",
      text: "In Spanish, verbs change form depending on WHO is doing the action. This is called conjugation. For '-ar' verbs (like hablar = to speak): yo hablo, tú hablas, él/ella habla, nosotros hablamos. The pattern is the same for other '-ar' verbs: caminar (walk), escuchar (listen), trabajar (work). After practice it becomes automatic — like riding a bike!"
    },
    practice: [
      { type: "multiple", q: "What is the 'yo' (I) form of 'hablar' (to speak)?",                               choices: ["Hablas","Hablo","Habla","Hablamos"], answer: "Hablo" },
      { type: "multiple", q: "'Nosotros comemos' means...",                                                       choices: ["We eat","They eat","I eat","You eat"], answer: "We eat" },
      { type: "multiple", q: "Which is the correct 'tú' form of 'correr' (to run)?",                             choices: ["Corro","Corremos","Corres","Corren"], answer: "Corres" },
      { type: "multiple", q: "How do you say 'She writes' in Spanish?",                                          choices: ["El escribe","Ella escribe","Tu escribes","Yo escribo"], answer: "Ella escribe" },
      { type: "multiple", q: "The infinitive of a Spanish verb ends in...",                                      choices: ["-ando or -iendo","-ar, -er, or -ir","-o or -a","-mos or -n"], answer: "-ar, -er, or -ir" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I listen to music'?",                                              choices: ["Yo escucho musica","Tu escuchas musica","Yo escucha musica","El escucho musica"], answer: "Yo escucho musica" },
      { type: "multiple", q: "'Ellos trabajan' means...",                                                        choices: ["He works","We work","They work","You work"], answer: "They work" },
      { type: "multiple", q: "To say 'We live in Miami': Nosotros ___ en Miami.",                                choices: ["vive","vives","vivimos","viven"], answer: "vivimos" }
    ]
  },

  {
    id: "spa-s1-time",
    code: "S1-TI-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Telling Time",
    title: "La Hora — Telling Time",
    subtitle: "Clocks, schedules & time expressions",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What Time Is It in Spanish?",
      text: "To ask the time: '¿Qué hora es?' (What time is it?). To answer: 'Es la una' (It is 1:00) or 'Son las dos' (It is 2:00). Use 'es' only for 1 o'clock; 'son' for everything else. Adding minutes: 'Son las tres y quince' = 3:15. Half past: 'y media' (e.g., Son las cuatro y media = 4:30). Quarter to: 'menos cuarto' (e.g., Son las cinco menos cuarto = 4:45)."
    },
    practice: [
      { type: "multiple", q: "How do you ask 'What time is it?' in Spanish?",                                    choices: ["¿Cómo estás?","¿Qué hora es?","¿Cuántos años tienes?","¿Dónde estás?"], answer: "¿Qué hora es?" },
      { type: "multiple", q: "'Son las dos y media' means...",                                                   choices: ["2:00","2:15","2:30","2:45"], answer: "2:30" },
      { type: "multiple", q: "Why do we say 'Es la una' but 'Son las cinco'?",                                   choices: ["Random rule","1 o'clock uses 'es' (singular); others use 'son' (plural)","Depends on AM/PM","One is formal, the other casual"], answer: "1 o'clock uses 'es' (singular); others use 'son' (plural)" },
      { type: "multiple", q: "How do you say 4:45?",                                                             choices: ["Son las cuatro y cuarenta y cinco","Son las cinco menos cuarto","Son las cuatro y media","Es la cuatro menos cuarto"], answer: "Son las cinco menos cuarto" },
      { type: "multiple", q: "'Son las ocho de la mañana' means...",                                             choices: ["8 PM","8 AM","8:30 AM","Midnight"], answer: "8 AM" }
    ],
    quiz: [
      { type: "multiple", q: "Your class starts at 9:15. How do you say this?",                                  choices: ["Son las nueve y cuarto","Son las nueve y media","Es la nueve quince","Son las ocho y cuarto"], answer: "Son las nueve y cuarto" },
      { type: "multiple", q: "What does 'de la tarde' mean after a time?",                                       choices: ["In the morning","In the afternoon/evening","At midnight","Exactly on the hour"], answer: "In the afternoon/evening" },
      { type: "multiple", q: "How do you say 'It is 3:00'?",                                                     choices: ["Es la tres","Son las tres","Son los tres","Es las tres"], answer: "Son las tres" }
    ]
  },

  {
    id: "spa-s1-describing",
    code: "S1-DE-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Describing People",
    title: "Describiendo Personas — Describing People",
    subtitle: "Physical features & personality",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "How to Describe People in Spanish!",
      text: "To describe someone, we use the verb 'ser' (to be, permanent traits). Common physical words: alto/alta (tall), bajo/baja (short), delgado/delgada (thin), gordo/gorda (heavy), joven (young), viejo/vieja (old), guapo/guapa (handsome/pretty), rubio/rubia (blonde), moreno/morena (brunette/dark). Personality: inteligente (intelligent), simpático (friendly), trabajador (hardworking), divertido (fun), serio (serious). Adjectives must agree in gender!"
    },
    practice: [
      { type: "multiple", q: "How do you say 'She is tall' in Spanish?",                                         choices: ["Ella es bajo","Ella es alta","Ella es alto","Ella está alta"], answer: "Ella es alta" },
      { type: "multiple", q: "What does 'simpático' mean?",                                                      choices: ["Shy","Rude","Friendly/Nice","Lazy"], answer: "Friendly/Nice" },
      { type: "multiple", q: "Which verb is used for permanent descriptions like height?",                       choices: ["Estar","Tener","Ser","Hacer"], answer: "Ser" },
      { type: "multiple", q: "How do you say 'He is a hardworking student'?",                                    choices: ["Él es un estudiante perezoso","Él es un estudiante trabajador","Él está trabajando","Él tiene trabajo"], answer: "Él es un estudiante trabajador" },
      { type: "multiple", q: "If 'rubio' means blonde (male), how do you say 'blonde' for a female?",           choices: ["Rubia","Rubio","Rubios","Rubias"], answer: "Rubia" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'My sister is young and funny'?",                                   choices: ["Mi hermana es joven y divertida","Mi hermana está joven y divertida","Mi hermano es joven y divertido","Mi hermana tiene joven y divertida"], answer: "Mi hermana es joven y divertida" },
      { type: "multiple", q: "What does 'perezoso' mean?",                                                       choices: ["Hardworking","Intelligent","Lazy","Serious"], answer: "Lazy" },
      { type: "multiple", q: "Which is correct for a girl named Sofia who is smart?",                            choices: ["Sofia es inteligente","Sofia está inteligento","Sofia es inteligento","Sofia ser inteligente"], answer: "Sofia es inteligente" }
    ]
  },

  {
    id: "spa-s1-school",
    code: "S1-SC-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "School",
    title: "En la Escuela — At School",
    subtitle: "Subjects, supplies & classroom",
    duration: "8 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "School Vocabulary in Spanish!",
      text: "School subjects: matemáticas (math), ciencias (science), español (Spanish), inglés (English), historia (history), arte (art), educación física (P.E.), música (music). Supplies: lápiz (pencil), bolígrafo (pen), cuaderno (notebook), libro (book), mochila (backpack), regla (ruler). To say 'I have math class' — 'Tengo clase de matemáticas'. Your teacher is 'el maestro' (male) or 'la maestra' (female)."
    },
    practice: [
      { type: "multiple", q: "How do you say 'math' in Spanish?",                                                choices: ["Historia","Ciencias","Matemáticas","Arte"], answer: "Matemáticas" },
      { type: "multiple", q: "What is a 'mochila'?",                                                             choices: ["Pencil","Notebook","Backpack","Ruler"], answer: "Backpack" },
      { type: "multiple", q: "How do you say 'I like science class'?",                                           choices: ["Me gusta la clase de ciencias","Tengo ciencias hoy","Hay matemáticas","No me gusta historia"], answer: "Me gusta la clase de ciencias" },
      { type: "multiple", q: "What is 'el bolígrafo'?",                                                          choices: ["Pencil","Eraser","Pen","Ruler"], answer: "Pen" },
      { type: "multiple", q: "A female teacher in Spanish is called...",                                         choices: ["El maestro","La maestra","El profesor","La estudiante"], answer: "La maestra" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I have P.E. class on Fridays'?",                                   choices: ["Tengo clase de educación física los viernes","Me gusta arte los viernes","Hay música los lunes","Tengo español el viernes"], answer: "Tengo clase de educación física los viernes" },
      { type: "multiple", q: "What does 'cuaderno' mean?",                                                       choices: ["Book","Backpack","Notebook","Ruler"], answer: "Notebook" },
      { type: "multiple", q: "'¿Qué materias te gustan?' is asking...",                                          choices: ["What school do you go to?","What subjects do you like?","When does class start?","Who is your teacher?"], answer: "What subjects do you like?" }
    ]
  },

  // ── SPANISH 2 ────────────────────────────────────────────

  {
    id: "spa-s2-preterite",
    code: "S2-PR-1A",
    level: "spanish2",
    subject: "spanish",
    topic: "Past Tense",
    title: "El Pretérito — Past Tense",
    subtitle: "Talking about completed actions",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Talk About the Past in Spanish!",
      text: "The preterite tense is used for actions that are completed in the past. For '-ar' verbs (like hablar): yo hablé, tú hablaste, él habló, nosotros hablamos, ellos hablaron. For '-er/-ir' verbs (like comer): yo comí, tú comiste, él comió, nosotros comimos, ellos comieron. Common irregular verbs: ir/ser → fui, fuiste, fue; tener → tuve, tuviste, tuvo; hacer → hice, hiciste, hizo. Context clues like 'ayer' (yesterday) signal past tense!"
    },
    practice: [
      { type: "multiple", q: "What is the 'yo' form of 'hablar' in the preterite?",                              choices: ["Hablé","Hablo","Hablaba","Hablaré"], answer: "Hablé" },
      { type: "multiple", q: "'Ella comió pizza ayer' means...",                                                  choices: ["She eats pizza today","She is eating pizza","She ate pizza yesterday","She will eat pizza"], answer: "She ate pizza yesterday" },
      { type: "multiple", q: "Which time expression signals the preterite tense?",                               choices: ["Mañana (tomorrow)","Siempre (always)","Ayer (yesterday)","Ahora (now)"], answer: "Ayer (yesterday)" },
      { type: "multiple", q: "What is the 'él' form of 'ir' in the preterite?",                                  choices: ["Va","Iba","Fue","Irá"], answer: "Fue" },
      { type: "multiple", q: "'Nosotros fuimos al parque' means...",                                             choices: ["We go to the park","We went to the park","We are going to the park","We used to go to the park"], answer: "We went to the park" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I did my homework last night'?",                                   choices: ["Yo hago la tarea anoche","Yo hice la tarea anoche","Yo hacía la tarea anoche","Yo haré la tarea anoche"], answer: "Yo hice la tarea anoche" },
      { type: "multiple", q: "What is the preterite of 'tú tuviste'?",                                          choices: ["You have","You had","You will have","You used to have"], answer: "You had" },
      { type: "multiple", q: "Complete: 'Ellos _____ (comer) en el restaurante anoche.'",                        choices: ["comen","comían","comieron","comerán"], answer: "comieron" }
    ]
  },

  {
    id: "spa-s2-future",
    code: "S2-FU-1A",
    level: "spanish2",
    subject: "spanish",
    topic: "Future Tense",
    title: "El Futuro — Future Tense",
    subtitle: "Plans, predictions & what will happen",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Talk About the Future in Spanish!",
      text: "The simple future tense is easy — you add endings directly to the infinitive! Endings: -é, -ás, -á, -emos, -án. So 'hablar' → hablaré (I will speak), hablarás (you will speak), hablará (he/she will speak). Irregular stems: tener→tendr-, poder→podr-, hacer→har-, venir→vendr-, decir→dir-. There is also the informal future: 'ir + a + infinitive' (voy a estudiar = I am going to study). Both are common!"
    },
    practice: [
      { type: "multiple", q: "What is the 'yo' future of 'hablar'?",                                             choices: ["Hablaba","Hablo","Hablaré","Hablé"], answer: "Hablaré" },
      { type: "multiple", q: "'Mañana voy a estudiar' means...",                                                  choices: ["Yesterday I studied","I am studying now","Tomorrow I am going to study","I used to study"], answer: "Tomorrow I am going to study" },
      { type: "multiple", q: "What is the irregular future stem of 'tener'?",                                    choices: ["Ten-","Tien-","Tendr-","Tuv-"], answer: "Tendr-" },
      { type: "multiple", q: "How do you say 'They will eat' in Spanish?",                                       choices: ["Ellos comen","Ellos comieron","Ellos comerán","Ellos comían"], answer: "Ellos comerán" },
      { type: "multiple", q: "'¿Qué harás este fin de semana?' is asking...",                                     choices: ["What did you do last weekend?","What are you doing now?","What will you do this weekend?","What do you usually do?"], answer: "What will you do this weekend?" }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I will go to Spain next year'?",                                   choices: ["Voy a España el año pasado","Iré a España el año que viene","Fui a España este año","Iba a España mañana"], answer: "Iré a España el año que viene" },
      { type: "multiple", q: "What is the 'ellos' form of 'hacer' in the future?",                               choices: ["Hacerán","Harán","Hacen","Hicieron"], answer: "Harán" },
      { type: "multiple", q: "Which sentence uses the informal future 'ir + a + infinitive'?",                   choices: ["Estudiaré mañana","Voy a estudiar mañana","Estudiaba mucho","Estudié ayer"], answer: "Voy a estudiar mañana" }
    ]
  },

  // ── ADVANCED SPANISH ─────────────────────────────────────

  {
    id: "spa-adv-subjunctive",
    code: "ADV-SJ-1A",
    level: "advanced",
    subject: "spanish",
    topic: "Subjunctive",
    title: "El Subjuntivo — Subjunctive Mood",
    subtitle: "Wishes, doubts & hypotheticals",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "The Subjunctive — Spanish's Most Powerful Tool!",
      text: "The subjunctive is a mood (not a tense) used to express wishes, emotions, doubts, or hypothetical situations. Trigger phrases: 'quiero que...' (I want [someone] to...), 'espero que...' (I hope that...), 'es importante que...' (it is important that...). For -ar verbs, use -e endings in subjunctive; for -er/-ir verbs, use -a endings. Example: 'Quiero que él hable más despacio' = 'I want him to speak more slowly.' The key: subjunctive comes in a dependent clause after 'que' when there are two different subjects."
    },
    practice: [
      { type: "multiple", q: "When is the subjunctive used?",                                                    choices: ["For completed past actions","For wishes, doubts, emotions, and hypotheticals","For habitual actions","For future certainties"], answer: "For wishes, doubts, emotions, and hypotheticals" },
      { type: "multiple", q: "Which sentence uses the subjunctive correctly?",                                   choices: ["Quiero que él habla más","Espero que venga pronto","Creo que viene hoy","Sé que está aquí"], answer: "Espero que venga pronto" },
      { type: "multiple", q: "What is the subjunctive form of 'hablar' for 'él'?",                               choices: ["Habla","Hablará","Hable","Habló"], answer: "Hable" },
      { type: "multiple", q: "'Es necesario que estudies' means...",                                             choices: ["You are studying now","It is necessary that you study","You studied yesterday","You will study tomorrow"], answer: "It is necessary that you study" },
      { type: "multiple", q: "Which phrase triggers the subjunctive?",                                           choices: ["Sé que...","Veo que...","Espero que...","Creo que..."], answer: "Espero que..." }
    ],
    quiz: [
      { type: "multiple", q: "How do you say 'I hope she comes to the party'?",                                  choices: ["Espero que ella viene a la fiesta","Espero que ella venga a la fiesta","Quiero que ella viene","Espero que ella vino"], answer: "Espero que ella venga a la fiesta" },
      { type: "multiple", q: "What is the subjunctive of 'comer' for 'nosotros'?",                               choices: ["Comemos","Comamos","Comeremos","Comimos"], answer: "Comamos" },
      { type: "multiple", q: "Why does 'Creo que ella HABLA bien' use indicative (not subjunctive)?",            choices: ["It's a statement of fact/belief, not doubt or wish","Creer always takes subjunctive","It's a past action","Ella is the same subject"], answer: "It's a statement of fact/belief, not doubt or wish" }
    ]
  },


  // ── BEGINNING (more) ──────────────────────────────────

  {
    id: "spa-beg-body",
    code: "BEG-BP-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Body Parts",
    title: "El Cuerpo — Body Parts",
    subtitle: "Head, shoulders, knees and more",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Name Every Part of the Body in Spanish!",
      text: "Knowing body parts is essential for health conversations, sports, and everyday talk. Key vocabulary: cabeza (head), cara (face), ojo (eye), nariz (nose), boca (mouth), oreja (ear), cuello (neck), brazo (arm), mano (hand), dedo (finger), pierna (leg), pie (foot), espalda (back), estómago (stomach), corazón (heart). Practice: touch each body part as you say it — physical memory works!"
    },
    practice: [
      { type: "multiple", q: "What is 'la cabeza'?",                                                           choices: ["The hand","The foot","The head","The eye"], answer: "The head" },
      { type: "multiple", q: "How do you say 'foot' in Spanish?",                                              choices: ["Mano","Dedo","Brazo","Pie"], answer: "Pie" },
      { type: "multiple", q: "What does 'Me duele el estómago' mean?",                                         choices: ["I have a headache","My stomach hurts","My back is strong","I am hungry"], answer: "My stomach hurts" },
      { type: "multiple", q: "How do you say 'ear'?",                                                           choices: ["Ojo","Nariz","Oreja","Boca"], answer: "Oreja" },
      { type: "multiple", q: "'Levanta la mano' (a classroom instruction) means...",                            choices: ["Sit down","Raise your hand","Open your book","Stand up"], answer: "Raise your hand" }
    ],
    quiz: [
      { type: "multiple", q: "A doctor says 'Abra la boca, por favor.' What are you being asked to do?",       choices: ["Raise your hand","Close your eyes","Open your mouth","Turn around"], answer: "Open your mouth" },
      { type: "multiple", q: "How do you say 'I have a headache'?",                                            choices: ["Tengo dolor de cabeza","Me duele el pie","Tengo fiebre","Me duele la mano"], answer: "Tengo dolor de cabeza" },
      { type: "multiple", q: "Which body part is 'el corazón'?",                                               choices: ["Brain","Lung","Heart","Stomach"], answer: "Heart" }
    ]
  },

  {
    id: "spa-beg-emotions",
    code: "BEG-EM-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Emotions",
    title: "Las Emociones — Emotions & Feelings",
    subtitle: "Express how you feel in Spanish",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "How Are You Feeling Today?",
      text: "Expressing emotions is key to real conversation. Use 'estar' for feelings (they change). Common emotions: feliz/contento (happy), triste (sad), enojado (angry), asustado (scared), sorprendido (surprised), cansado (tired), aburrido (bored), emocionado (excited), nervioso (nervous), enfermo (sick). To say 'I feel...' → 'Estoy...' (Estoy feliz = I am happy). Remember: adjectives change gender! Estoy contento (male) / Estoy contenta (female)."
    },
    practice: [
      { type: "multiple", q: "How do you say 'I am happy'?",                                                   choices: ["Soy feliz","Estoy feliz","Estoy triste","Soy contento"], answer: "Estoy feliz" },
      { type: "multiple", q: "What does 'estoy cansado' mean?",                                                choices: ["I am excited","I am bored","I am tired","I am sick"], answer: "I am tired" },
      { type: "multiple", q: "Why do we use 'estar' instead of 'ser' for emotions?",                           choices: ["Random rule","Emotions are temporary states, not permanent characteristics","'Ser' is only for nationalities","'Estar' sounds better"], answer: "Emotions are temporary states, not permanent characteristics" },
      { type: "multiple", q: "'¿Cómo te sientes hoy?' means...",                                               choices: ["Where are you going?","What do you want?","How are you feeling today?","What time is it?"], answer: "How are you feeling today?" },
      { type: "multiple", q: "A girl says 'Estoy emocionada.' She is...",                                      choices: ["Tired","Angry","Bored","Excited"], answer: "Excited" }
    ],
    quiz: [
      { type: "multiple", q: "How does a male student say 'I am nervous before the test'?",                    choices: ["Estoy nerviosa antes del examen","Estoy nervioso antes del examen","Soy nervioso para el examen","Estoy emocionado antes del examen"], answer: "Estoy nervioso antes del examen" },
      { type: "multiple", q: "What does 'asustado' mean?",                                                     choices: ["Surprised","Happy","Scared","Angry"], answer: "Scared" },
      { type: "multiple", q: "Choose the correct sentence: A girl says she is sad.",                           choices: ["Estoy tristo","Estoy trista","Estoy triste","Soy triste"], answer: "Estoy triste" }
    ]
  },

  {
    id: "spa-beg-transport",
    code: "BEG-TR-1A",
    level: "beginning",
    subject: "spanish",
    topic: "Transportation",
    title: "El Transporte — Getting Around",
    subtitle: "Buses, trains, cars & directions",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "How Do You Get Around?",
      text: "Transportation vocabulary is essential for traveling! Vehicles: coche/carro (car), autobús (bus), tren (train), avión (airplane), barco (ship/boat), bicicleta (bicycle), moto (motorcycle), taxi (taxi). Directions: a la derecha (to the right), a la izquierda (to the left), recto/derecho (straight ahead), doblar (to turn). To ask: '¿Cómo llego a...?' (How do I get to...?). To say where you go: 'Voy en autobús' (I go by bus), 'Voy a pie' (I go on foot)."
    },
    practice: [
      { type: "multiple", q: "How do you say 'airplane' in Spanish?",                                          choices: ["Barco","Tren","Avión","Autobús"], answer: "Avión" },
      { type: "multiple", q: "'A la izquierda' means...",                                                      choices: ["Straight ahead","To the right","Turn around","To the left"], answer: "To the left" },
      { type: "multiple", q: "How do you say 'I go by train'?",                                                choices: ["Voy en avión","Voy en tren","Voy a pie","Voy en carro"], answer: "Voy en tren" },
      { type: "multiple", q: "'¿Dónde está la estación de autobús?' means...",                                  choices: ["When does the bus leave?","How much does the bus cost?","Where is the bus station?","Which bus goes downtown?"], answer: "Where is the bus station?" },
      { type: "multiple", q: "'Voy a pie' means you are going...",                                             choices: ["By car","By bike","On foot","By train"], answer: "On foot" }
    ],
    quiz: [
      { type: "multiple", q: "Giving directions: 'Doble a la derecha en el semáforo' means...",                choices: ["Turn left at the traffic light","Go straight at the traffic light","Turn right at the traffic light","Stop at the traffic light"], answer: "Turn right at the traffic light" },
      { type: "multiple", q: "How do you ask 'How do I get to the airport?'",                                  choices: ["¿Cuánto cuesta el aeropuerto?","¿Cómo llego al aeropuerto?","¿Dónde compro un avión?","¿A qué hora sale el tren?"], answer: "¿Cómo llego al aeropuerto?" },
      { type: "multiple", q: "'Siga recto dos cuadras' means...",                                              choices: ["Turn right in two blocks","Turn left in two blocks","Go straight for two blocks","Stop in two blocks"], answer: "Go straight for two blocks" }
    ]
  },

  // ── SPANISH 1 (more) ──────────────────────────────────

  {
    id: "spa-s1-ser-estar",
    code: "S1-SE-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Ser vs Estar",
    title: "Ser vs. Estar — To Be or To Be?",
    subtitle: "The two most important verbs in Spanish",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Two Ways to Say 'To Be'!",
      text: "Spanish has TWO verbs for 'to be': SER and ESTAR. SER is used for permanent or inherent characteristics: identity, origin, profession, time, descriptions (Soy estudiante. Ella es de México. Son las tres). ESTAR is used for temporary states, locations, conditions, and feelings (Estoy cansado. El libro está en la mesa. Estamos contentos). A helpful way to think about it: SER = WHAT something IS. ESTAR = WHERE something is or HOW something feels right now."
    },
    practice: [
      { type: "multiple", q: "Which verb do you use to say where you are FROM?",                               choices: ["Estar","Ser","Tener","Ir"], answer: "Ser" },
      { type: "multiple", q: "'El banco está en la calle principal' uses estar because...",                    choices: ["Banks are permanent","It is describing a location","Banks are feelings","It is a profession"], answer: "It is describing a location" },
      { type: "multiple", q: "Complete: 'Yo ___ médico.' (I am a doctor — profession)",                        choices: ["estoy","soy","tengo","voy"], answer: "soy" },
      { type: "multiple", q: "Complete: 'María ___ enferma hoy.' (Maria is sick today)",                       choices: ["es","tiene","está","va"], answer: "está" },
      { type: "multiple", q: "Which sentence is WRONG?",                                                       choices: ["Soy de España","Estoy feliz","Soy cansado hoy","La clase es a las 8"], answer: "Soy cansado hoy" }
    ],
    quiz: [
      { type: "multiple", q: "Fill in: 'La fiesta ___ muy divertida.' (The party was very fun — inherent quality)", choices: ["está","es","estaba","tiene"], answer: "es" },
      { type: "multiple", q: "Fill in: 'El café ___ caliente.' (The coffee is hot — temporary state)",          choices: ["es","somos","está","tengo"], answer: "está" },
      { type: "multiple", q: "A sentence can use DIFFERENT meanings depending on ser/estar. '¡Está bueno!' means the food tastes good. '¡Es bueno!' means...", choices: ["The food is hot","He/she is a good person","The food is bad","The place is good"], answer: "He/she is a good person" }
    ]
  },

  {
    id: "spa-s1-weather",
    code: "S1-WE-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Weather",
    title: "El Tiempo — Talking About Weather",
    subtitle: "Seasons, weather expressions & temperatures",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "What's the Weather Like?",
      text: "In Spanish, weather uses the verb 'hacer' (to make/do) in expressions: Hace sol (It is sunny), Hace calor (It is hot), Hace frío (It is cold), Hace viento (It is windy). Other expressions: Llueve / Está lloviendo (It is raining), Nieva / Está nevando (It is snowing), Está nublado (It is cloudy). Seasons: primavera (spring), verano (summer), otoño (fall), invierno (winter). '¿Qué tiempo hace?' = What is the weather like?"
    },
    practice: [
      { type: "multiple", q: "How do you say 'It is sunny' in Spanish?",                                       choices: ["Hace frío","Está nublado","Hace sol","Llueve"], answer: "Hace sol" },
      { type: "multiple", q: "What does 'Hace mucho viento' mean?",                                            choices: ["It is very sunny","It is very windy","It is very hot","It is very cloudy"], answer: "It is very windy" },
      { type: "multiple", q: "'¿Qué tiempo hace hoy?' is asking...",                                            choices: ["What time is it today?","What is the weather like today?","What is today's date?","What season is it?"], answer: "What is the weather like today?" },
      { type: "multiple", q: "How do you say 'It is snowing'?",                                                choices: ["Hace calor","Llueve","Está nublado","Nieva / Está nevando"], answer: "Nieva / Está nevando" },
      { type: "multiple", q: "What season is 'verano'?",                                                       choices: ["Spring","Summer","Fall","Winter"], answer: "Summer" }
    ],
    quiz: [
      { type: "multiple", q: "You are packing for a trip. The forecast says 'Hace mucho frío y nieva.' You should pack...",choices: ["Shorts and a t-shirt","A heavy coat and boots","A raincoat","Sunscreen and sunglasses"], answer: "A heavy coat and boots" },
      { type: "multiple", q: "How do you say 'In summer it is hot and sunny'?",                                choices: ["En verano hace calor y sol","En invierno hace frío y nieva","En primavera llueve mucho","En otoño hace viento"], answer: "En verano hace calor y sol" },
      { type: "multiple", q: "What does 'está nublado' mean?",                                                 choices: ["It is stormy","It is cloudy","It is foggy","It is rainy"], answer: "It is cloudy" }
    ]
  },

  {
    id: "spa-s1-hobbies",
    code: "S1-HO-1A",
    level: "spanish1",
    subject: "spanish",
    topic: "Hobbies",
    title: "Los Pasatiempos — Hobbies & Free Time",
    subtitle: "Talking about what you like to do",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What Do You Do for Fun?",
      text: "Talking about hobbies is a great conversation starter! Key structure: 'Me gusta + infinitive' (I like to...) or 'Me encanta' (I love to...). Popular hobbies: jugar al fútbol (play soccer), nadar (swim), leer (read), dibujar (draw), escuchar música (listen to music), ver películas (watch movies), cocinar (cook), bailar (dance), tocar la guitarra (play guitar), jugar videojuegos (play video games). To ask: '¿Qué te gusta hacer en tu tiempo libre?' (What do you like to do in your free time?)"
    },
    practice: [
      { type: "multiple", q: "How do you say 'I like to play soccer'?",                                       choices: ["Me gusta el fútbol","Me gusta jugar al fútbol","Me encanta el fútbol mucho","Juego fútbol siempre"], answer: "Me gusta jugar al fútbol" },
      { type: "multiple", q: "What does 'Me encanta leer' mean?",                                              choices: ["I hate reading","I like to write","I love to read","I am reading"], answer: "I love to read" },
      { type: "multiple", q: "'¿Qué te gusta hacer en tu tiempo libre?' is asking...",                         choices: ["What time do you have?","What do you do for work?","What do you like to do in your free time?","When are you free?"], answer: "What do you like to do in your free time?" },
      { type: "multiple", q: "How do you say 'She plays guitar'?",                                             choices: ["Ella escucha guitarra","Ella toca la guitarra","Ella juega guitarra","Ella canta guitarra"], answer: "Ella toca la guitarra" },
      { type: "multiple", q: "'No me gusta cocinar' means...",                                                  choices: ["I love cooking","I don't like cooking","I cook every day","I am learning to cook"], answer: "I don't like cooking" }
    ],
    quiz: [
      { type: "multiple", q: "How would you say 'My favorite hobby is swimming'?",                             choices: ["Mi pasatiempo favorito es nadar","Me gusta mucho el fútbol","Yo nado todos los días","Mi actividad es bailar"], answer: "Mi pasatiempo favorito es nadar" },
      { type: "multiple", q: "What is the difference between 'me gusta' and 'me encanta'?",                   choices: ["They are identical","Me encanta is stronger (love vs like)","Me gusta is only for activities","Me encanta is only for objects"], answer: "Me encanta is stronger (love vs like)" },
      { type: "multiple", q: "Translate: 'We like to watch movies on weekends.'",                              choices: ["Nos gusta ver películas los fines de semana","Me gusta ver películas los fines de semana","Les encanta las películas","Vemos películas siempre"], answer: "Nos gusta ver películas los fines de semana" }
    ]
  },

  // ── SPANISH 2 (more) ──────────────────────────────────

  {
    id: "spa-s2-imperfect",
    code: "S2-IM-1A",
    level: "spanish2",
    subject: "spanish",
    topic: "Imperfect",
    title: "El Imperfecto — Imperfect Tense",
    subtitle: "Habitual past actions & descriptions",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Talking About the Past — A Different Way!",
      text: "Spanish has TWO past tenses: Preterite (completed actions) and Imperfect (habitual or ongoing past). Imperfect uses: habitual past actions (when you used to do something), background descriptions, ongoing actions interrupted by another. '-AR' endings: -aba, -abas, -aba, -ábamos, -aban. '-ER/-IR' endings: -ía, -ías, -ía, -íamos, -ían. Time signals: siempre (always), todos los días (every day), de niño (as a child), cuando era joven (when I was young), generalmente (usually)."
    },
    practice: [
      { type: "multiple", q: "Which situation calls for the IMPERFECT (not preterite)?",                      choices: ["I ran to school yesterday","She finished the book","We used to play in the park every day","They arrived late"], answer: "We used to play in the park every day" },
      { type: "multiple", q: "What is the 'yo' imperfect of 'hablar'?",                                       choices: ["Hablé","Hablaba","Hablo","Hablaré"], answer: "Hablaba" },
      { type: "multiple", q: "'Cuando era niño, vivía en Miami' means...",                                    choices: ["When I was a child, I lived in Miami (habitual past)","I live in Miami now","I will live in Miami when I am young","I moved to Miami as a child (one-time event)"], answer: "When I was a child, I lived in Miami (habitual past)" },
      { type: "multiple", q: "What is the 'ella' imperfect of 'comer'?",                                     choices: ["Comió","Come","Comía","Comerá"], answer: "Comía" },
      { type: "multiple", q: "Which time expression signals the imperfect?",                                  choices: ["Ayer (yesterday)","Una vez (one time)","Siempre (always)","De repente (suddenly)"], answer: "Siempre (always)" }
    ],
    quiz: [
      { type: "multiple", q: "Choose the correct tense: 'When I was little, I ___ (play) with Legos every day.'", choices: ["jugué","juego","jugaba","jugaré"], answer: "jugaba" },
      { type: "multiple", q: "'Yo leí mientras ella dormía.' Which verb is in the imperfect?",                choices: ["Leí","Both are imperfect","Dormía","Neither"], answer: "Dormía" },
      { type: "multiple", q: "What is the imperfect of 'ser' for 'nosotros'?",                                choices: ["Fuimos","Éramos","Somos","Seríamos"], answer: "Éramos" }
    ]
  },

  {
    id: "spa-s2-commands",
    code: "S2-CM-1A",
    level: "spanish2",
    subject: "spanish",
    topic: "Commands",
    title: "Mandatos — Commands",
    subtitle: "Telling people what to do",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Give Orders in Spanish!",
      text: "Commands (imperative mood) tell someone to do something. For INFORMAL (tú) commands: Affirmative: use the él/ella present tense form (habla, come, escribe). Negative: use the subjunctive (no hables, no comas, no escribas). FORMAL (usted) commands: always use the subjunctive form (hable, coma, escriba / no hable). Irregular tú affirmative commands: di (say), haz (do/make), pon (put), sal (leave), ten (have), ven (come), ve (go), sé (be)."
    },
    practice: [
      { type: "multiple", q: "How do you say 'Eat! (informal, tú)'?",                                          choices: ["Come","Coma","Comer","Comes"], answer: "Come" },
      { type: "multiple", q: "How do you say 'Don't run! (informal, tú)'?",                                   choices: ["No corre","No corres","No corras","No correr"], answer: "No corras" },
      { type: "multiple", q: "What is the irregular tú command for 'hacer' (to do)?",                         choices: ["Hace","Haces","Haz","Hacé"], answer: "Haz" },
      { type: "multiple", q: "A teacher tells the class: 'Abran sus libros.' This is a ___ command.",          choices: ["Tú (informal)","Usted (formal singular)","Ustedes (formal plural)","Nosotros (we)"], answer: "Ustedes (formal plural)" },
      { type: "multiple", q: "How do you say 'Come here! (informal, tú)'?",                                   choices: ["Vienes aquí","Viene aquí","Ven aquí","Venir aquí"], answer: "Ven aquí" }
    ],
    quiz: [
      { type: "multiple", q: "Your mom says 'Sé bueno.' She is telling you to...",                             choices: ["Be quiet","Sit down","Be good","Be careful"], answer: "Be good" },
      { type: "multiple", q: "How do you say 'Don't tell me! (informal)'?",                                   choices: ["No me dices","No me di","No me digas","No me decir"], answer: "No me digas" },
      { type: "multiple", q: "A sign in a restaurant says 'No fume.' This means...",                          choices: ["No eating","No photos","No smoking","No entry"], answer: "No smoking" }
    ]
  },

  {
    id: "spa-s2-reflexive",
    code: "S2-RF-1A",
    level: "spanish2",
    subject: "spanish",
    topic: "Reflexive Verbs",
    title: "Verbos Reflexivos — Reflexive Verbs",
    subtitle: "Daily routines and actions on yourself",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "When You Do Something to Yourself!",
      text: "Reflexive verbs describe actions done to oneself. They are conjugated with reflexive pronouns: me, te, se, nos, se. Common reflexives: levantarse (wake up), ducharse (shower), peinarse (comb hair), vestirse (get dressed), acostarse (go to bed), cepillarse los dientes (brush teeth), llamarse (be named). Example: 'Me llamo María' = My name is María (literally: I call myself María). Morning routines are almost entirely expressed with reflexive verbs!"
    },
    practice: [
      { type: "multiple", q: "What does 'Me lavo las manos' mean?",                                            choices: ["He washes his hands","I wash my hands","You wash your hands","We wash our hands"], answer: "I wash my hands" },
      { type: "multiple", q: "What is the reflexive pronoun for 'nosotros'?",                                  choices: ["me","te","se","nos"], answer: "nos" },
      { type: "multiple", q: "'¿Cómo te llamas?' is a reflexive question meaning...",                          choices: ["Where are you from?","How old are you?","What is your name?","How are you feeling?"], answer: "What is your name?" },
      { type: "multiple", q: "How do you say 'She gets dressed every morning'?",                               choices: ["Ella viste cada mañana","Ella se viste cada mañana","Ella vistió cada mañana","Ella se vesta cada mañana"], answer: "Ella se viste cada mañana" },
      { type: "multiple", q: "Conjugate 'levantarse' for 'yo': Yo ___",                                        choices: ["levanto","me levanto","levantarse","se levanto"], answer: "me levanto" }
    ],
    quiz: [
      { type: "multiple", q: "Describe a morning routine: 'I wake up, shower, and get dressed.' In Spanish...", choices: ["Yo levanto, ducho, y visto","Yo me levanto, me ducho, y me visto","Me levantar, duchart, vestirme","Levantarse, ducharse, vestirse"], answer: "Yo me levanto, me ducho, y me visto" },
      { type: "multiple", q: "What does 'Nos divertimos mucho en la fiesta' mean?",                            choices: ["We enjoyed ourselves a lot at the party","We saw each other at the party","We danced a lot at the party","We organized the party"], answer: "We enjoyed ourselves a lot at the party" },
      { type: "multiple", q: "Which sentence correctly uses a reflexive verb?",                                choices: ["María peina su hermana","María se peina antes de salir","María me peina","María peinarse siempre"], answer: "María se peina antes de salir" }
    ]
  },

  // ── ADVANCED (more) ────────────────────────────────────

  {
    id: "spa-adv-present-perfect",
    code: "ADV-PP-1A",
    level: "advanced",
    subject: "spanish",
    topic: "Present Perfect",
    title: "El Presente Perfecto",
    subtitle: "What you have done recently",
    duration: "10 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Connect the Past to Now!",
      text: "The present perfect (presente perfecto) describes actions recently completed or that affect the present. Formed with: haber (present) + past participle. Haber: he, has, ha, hemos, han. Past participle: -AR verbs → -ado (hablado), -ER/-IR verbs → -ido (comido, vivido). Irregular participles: hecho (done/made), dicho (said), visto (seen), escrito (written), abierto (opened), vuelto (returned), puesto (put). Example: 'He comido' = I have eaten. 'Ella ha visto la película' = She has seen the movie."
    },
    practice: [
      { type: "multiple", q: "How do you say 'I have eaten' in Spanish?",                                      choices: ["Comí","He comido","Como","Comeré"], answer: "He comido" },
      { type: "multiple", q: "What is the past participle of 'hacer' (irregular)?",                            choices: ["Hacido","Hachado","Hecho","Hacido"], answer: "Hecho" },
      { type: "multiple", q: "Form the present perfect: 'They have seen the movie.'",                          choices: ["Ellos ven la película","Ellos han visto la película","Ellos vieron la película","Ellos habrán visto la película"], answer: "Ellos han visto la película" },
      { type: "multiple", q: "Which sentence uses the present perfect CORRECTLY?",                             choices: ["Yo he habló con ella","Tú has comido ya","Ella ha comer mucho","Nosotros hemos bailar toda la noche"], answer: "Tú has comido ya" },
      { type: "multiple", q: "The present perfect is used when...",                                            choices: ["The action happened at a specific past time","The action has recently happened or still affects the present","The action will happen in the future","The action is hypothetical"], answer: "The action has recently happened or still affects the present" }
    ],
    quiz: [
      { type: "multiple", q: "Translate: 'We have never been to Spain.'",                                      choices: ["Nunca fuimos a España","Nunca hemos ido a España","No vamos a España","Nunca iremos a España"], answer: "Nunca hemos ido a España" },
      { type: "multiple", q: "What is the past participle of 'escribir'?",                                     choices: ["Escribado","Escrito","Escribido","Escribtado"], answer: "Escrito" },
      { type: "multiple", q: "Fill in: 'Ella ___ (open) la ventana.' (She has opened the window.)",            choices: ["ha abierto","ha abrado","ha abrido","abrió"], answer: "ha abierto" }
    ]
  },

  {
    id: "spa-adv-passive",
    code: "ADV-PV-1A",
    level: "advanced",
    subject: "spanish",
    topic: "Passive Voice",
    title: "La Voz Pasiva — Passive Voice",
    subtitle: "When the subject receives the action",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Flip the Sentence Around!",
      text: "Active voice: 'The chef cooked the meal.' Passive voice: 'The meal was cooked by the chef.' In Spanish, the 'true' passive uses ser + past participle + por: 'La comida fue cocinada por el chef.' The participle agrees with the subject in gender/number! More commonly, Spanish uses 'se' passive (impersonal) to avoid naming the agent: 'Se vende pan aquí' (Bread is sold here). 'Se habla español' (Spanish is spoken here). This form is everywhere in signs, menus, and announcements!"
    },
    practice: [
      { type: "multiple", q: "How do you say 'The book was written by García Márquez' (true passive)?",       choices: ["El libro escribe García Márquez","El libro fue escrito por García Márquez","García Márquez escribió el libro","El libro se escribió García Márquez"], answer: "El libro fue escrito por García Márquez" },
      { type: "multiple", q: "In the true passive, the past participle must agree with...",                    choices: ["The verb ser","The agent (por + noun)","The subject in gender and number","Nothing — it stays the same"], answer: "The subject in gender and number" },
      { type: "multiple", q: "'Se vende casa' (sign on a house) means...",                                     choices: ["House for rent","House wanted","House for sale","House was sold"], answer: "House for sale" },
      { type: "multiple", q: "'Se habla inglés' most likely appears...",                                       choices: ["In a grammar textbook only","On a sign indicating English is spoken here","As an insult","In a formal passive sentence"], answer: "On a sign indicating English is spoken here" },
      { type: "multiple", q: "The 'se' passive is more common than the true passive in everyday Spanish because...", choices: ["It is grammatically required","It avoids naming who performed the action — cleaner and simpler","It is older and more traditional","The true passive does not exist in Spanish"], answer: "It avoids naming who performed the action — cleaner and simpler" }
    ],
    quiz: [
      { type: "multiple", q: "Make passive: 'Los estudiantes escribieron las composiciones.' → 'Las composiciones ___'",choices: ["fueron escritas por los estudiantes","fue escrito por los estudiantes","escribieron los estudiantes","se escribieron los estudiantes"], answer: "fueron escritas por los estudiantes" },
      { type: "multiple", q: "How do you say 'Spanish is spoken in 20 countries' using the 'se' passive?",    choices: ["El español habla en 20 países","Se habla español en 20 países","Se hablan español en 20 países","El español es hablado"], answer: "Se habla español en 20 países" },
      { type: "multiple", q: "Why does the participle change in 'Las cartas fueron escritas' but stays the same in 'Se escribieron las cartas'?", choices: ["They are the same structure","In true passive, the participle agrees with the subject; in 'se' passive it agrees with the noun too","No rule — it is random","The true passive is always feminine"], answer: "In true passive, the participle agrees with the subject; in 'se' passive it agrees with the noun too" }
    ]
  },


];