// ============================================================
//  Learn.edu — Science Lessons
//  Uses `level` field: 'earth' | 'life' | 'physical' | 'advanced'
// ============================================================

const SCIENCE_LESSONS = [

  // ── EARTH SCIENCE ────────────────────────────────────────

  {
    id: "sci-4-ecosystems",
    code: "ES-EC-1A",
    level: "earth",
    subject: "science",
    topic: "Ecosystems",
    title: "What is an Ecosystem?",
    subtitle: "Living things and their environment",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Ecosystems — Everything is Connected",
      text: "An ecosystem is a community of living things (plants, animals, fungi, bacteria) working together with their non-living environment (water, air, sunlight, soil). Every creature plays a role. When one thing changes, it affects everything else — like pulling a single thread in a sweater. That's what makes ecosystems so fascinating!"
    },
    practice: [
      { type: "multiple", q: "Which is NOT a living (biotic) part of an ecosystem?",                             choices: ["Oak tree","Mushroom","Rock","Earthworm"], answer: "Rock" },
      { type: "multiple", q: "What do plants need to make food via photosynthesis?",                             choices: ["Meat","Sunlight, water & CO₂","Other plants","Darkness"], answer: "Sunlight, water & CO₂" },
      { type: "multiple", q: "A food chain ALWAYS starts with a...",                                             choices: ["Predator","Decomposer","Producer (plant)","Consumer"], answer: "Producer (plant)" },
      { type: "multiple", q: "Fungi and bacteria are important decomposers because they...",                     choices: ["Make food from sunlight","Break down dead organisms","Hunt for prey","Make oxygen"], answer: "Break down dead organisms" },
      { type: "multiple", q: "Which pair correctly shows predator → prey?",                                      choices: ["Rabbit → Fox","Fox → Rabbit","Grass → Deer","Sun → Plant"], answer: "Fox → Rabbit" }
    ],
    quiz: [
      { type: "multiple", q: "If all the rabbits disappeared from a meadow, what would most likely happen to foxes?", choices: ["More foxes","Fewer foxes","Same number","Foxes get bigger"], answer: "Fewer foxes" },
      { type: "multiple", q: "The non-living parts of an ecosystem are called...",                               choices: ["Biotic factors","Abiotic factors","Producers","Consumers"], answer: "Abiotic factors" },
      { type: "multiple", q: "Which ecosystem has the MOST biodiversity?",                                       choices: ["Arctic tundra","Tropical rainforest","Desert","Cornfield"], answer: "Tropical rainforest" }
    ]
  },

  {
    id: "sci-4-weather",
    code: "ES-WW-1A",
    level: "earth",
    subject: "science",
    topic: "Weather",
    title: "Weather & the Water Cycle",
    subtitle: "Clouds, rain, evaporation & more",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Where Does Rain Come From?",
      text: "The water cycle is Earth's greatest recycling system — and it never stops. It has 4 stages: 1) Evaporation — the sun heats water and it turns into vapor rising into the air. 2) Condensation — vapor cools and forms clouds. 3) Precipitation — water falls as rain, snow, sleet, or hail. 4) Collection — water gathers in oceans, rivers, and lakes. All weather is driven by energy from the sun!"
    },
    practice: [
      { type: "multiple", q: "When liquid water turns into water vapor, this is called...",                      choices: ["Condensation","Precipitation","Evaporation","Collection"], answer: "Evaporation" },
      { type: "multiple", q: "Clouds are made of...",                                                            choices: ["Water vapor only","Ice only","Tiny water droplets or ice crystals","Gas molecules"], answer: "Tiny water droplets or ice crystals" },
      { type: "multiple", q: "What drives the water cycle?",                                                     choices: ["Gravity only","The Moon's pull","Energy from the Sun","Wind patterns"], answer: "Energy from the Sun" },
      { type: "multiple", q: "Rain, snow, sleet, and hail are all types of...",                                  choices: ["Evaporation","Condensation","Precipitation","Transpiration"], answer: "Precipitation" },
      { type: "multiple", q: "Which layer of the atmosphere contains most of our weather?",                      choices: ["Stratosphere","Mesosphere","Troposphere","Exosphere"], answer: "Troposphere" }
    ],
    quiz: [
      { type: "multiple", q: "Dew on grass in the morning is caused by...",                                      choices: ["Evaporation","Precipitation","Condensation","Transpiration"], answer: "Condensation" },
      { type: "multiple", q: "Which type of cloud is flat, gray, and often brings rain?",                        choices: ["Cumulus","Cirrus","Stratus","Nimbus"], answer: "Stratus" },
      { type: "multiple", q: "Where does most evaporation in the water cycle occur?",                            choices: ["Rivers","Oceans","Clouds","Ice caps"], answer: "Oceans" }
    ]
  },

  {
    id: "sci-7-layers",
    code: "ES-EL-1A",
    level: "earth",
    subject: "science",
    topic: "Earth's Structure",
    title: "Earth's Layers",
    subtitle: "Crust, mantle, outer core & inner core",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What's Inside the Earth?",
      text: "Earth has 4 main layers: 1) Crust — the thin outer shell we live on (solid rock, 5-70 km thick). 2) Mantle — thick layer of hot, slow-flowing rock (84% of Earth's volume!). 3) Outer Core — liquid iron and nickel that creates Earth's magnetic field. 4) Inner Core — solid iron ball at ~5,000°C under extreme pressure. Scientists study this using seismic waves from earthquakes."
    },
    practice: [
      { type: "multiple", q: "Which layer of Earth do we live on?",                                              choices: ["Mantle","Crust","Outer core","Inner core"], answer: "Crust" },
      { type: "multiple", q: "Which layer makes up the most volume of the Earth?",                               choices: ["Crust","Outer core","Mantle","Inner core"], answer: "Mantle" },
      { type: "multiple", q: "Earth's magnetic field is generated by the...",                                    choices: ["Crust","Mantle","Outer core","Inner core"], answer: "Outer core" },
      { type: "multiple", q: "Which of Earth's layers is solid despite being the hottest?",                      choices: ["Mantle","Outer core","Inner core","Crust"], answer: "Inner core" },
      { type: "multiple", q: "Tectonic plates are giant sections of the Earth's...",                             choices: ["Mantle","Crust","Outer core","Inner core"], answer: "Crust" }
    ],
    quiz: [
      { type: "multiple", q: "How do scientists know what is inside the Earth?",                                 choices: ["Direct drilling","Seismic wave studies","Satellite imaging","Guessing"], answer: "Seismic wave studies" },
      { type: "multiple", q: "Volcanoes bring up material from which layer?",                                    choices: ["Inner core","Outer core","Upper mantle","Crust surface"], answer: "Upper mantle" },
      { type: "multiple", q: "Oceanic crust compared to continental crust is...",                                choices: ["Thicker and less dense","Thinner and more dense","Same thickness","Made of the same rock"], answer: "Thinner and more dense" }
    ]
  },

  {
    id: "sci-earth-solar",
    code: "ES-SS-1A",
    level: "earth",
    subject: "science",
    topic: "Solar System",
    title: "Our Solar System",
    subtitle: "Planets, moons & the sun",
    duration: "10 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Tour of the Solar System!",
      text: "Our solar system has 8 planets orbiting the Sun. Inner rocky planets: Mercury, Venus, Earth, Mars. Outer gas giants: Jupiter, Saturn, Uranus, Neptune. Memory trick: 'My Very Educated Mother Just Served Us Nachos'. Earth is the only planet known to have life — the perfect distance from the Sun (the 'Goldilocks Zone'), liquid water, and a protective atmosphere. The Sun contains 99.8% of all mass in the solar system!"
    },
    practice: [
      { type: "multiple", q: "How many planets are in our solar system?",                                        choices: ["7","8","9","10"], answer: "8" },
      { type: "multiple", q: "Which planet is closest to the Sun?",                                              choices: ["Venus","Earth","Mercury","Mars"], answer: "Mercury" },
      { type: "multiple", q: "Which is the largest planet in our solar system?",                                 choices: ["Saturn","Neptune","Jupiter","Uranus"], answer: "Jupiter" },
      { type: "multiple", q: "What is the 'Goldilocks Zone'?",                                                   choices: ["The asteroid belt","The zone with the right temperature for liquid water","Jupiter's ring system","The outer solar system"], answer: "The zone with the right temperature for liquid water" },
      { type: "multiple", q: "Saturn is famous for...",                                                          choices: ["Having the most moons","Being the hottest planet","Its visible ring system","Being the closest to Earth"], answer: "Its visible ring system" }
    ],
    quiz: [
      { type: "multiple", q: "Which planet is known as the 'Red Planet'?",                                       choices: ["Venus","Jupiter","Mars","Mercury"], answer: "Mars" },
      { type: "multiple", q: "Pluto is now classified as a...",                                                  choices: ["Planet","Dwarf planet","Moon","Asteroid"], answer: "Dwarf planet" },
      { type: "multiple", q: "What percentage of the solar system's mass does the Sun contain?",                 choices: ["50%","75%","90%","99.8%"], answer: "99.8%" }
    ]
  },

  {
    id: "sci-earth-rocks",
    code: "ES-RM-1A",
    level: "earth",
    subject: "science",
    topic: "Rocks & Minerals",
    title: "Rocks & Minerals",
    subtitle: "Igneous, sedimentary & metamorphic",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What Are Rocks Made Of?",
      text: "Rocks are made of one or more minerals. There are 3 types: 1) Igneous — formed from cooled magma or lava (granite, obsidian, basalt). 2) Sedimentary — formed from layers of sediment pressed together over time (sandstone, limestone, shale — fossils are found here!). 3) Metamorphic — formed when rocks are changed by heat and pressure (marble, quartzite, slate). These types cycle through the 'Rock Cycle' over millions of years."
    },
    practice: [
      { type: "multiple", q: "Which type of rock forms from cooled magma or lava?",                              choices: ["Sedimentary","Metamorphic","Igneous","Fossil"], answer: "Igneous" },
      { type: "multiple", q: "Fossils are most commonly found in which type of rock?",                           choices: ["Igneous","Metamorphic","Sedimentary","Volcanic"], answer: "Sedimentary" },
      { type: "multiple", q: "Marble is a metamorphic rock that was originally...",                              choices: ["Sandstone","Granite","Limestone","Basalt"], answer: "Limestone" },
      { type: "multiple", q: "What is the difference between a rock and a mineral?",                             choices: ["They are the same thing","A mineral is made of rocks","A rock is made of one or more minerals","Minerals are man-made"], answer: "A rock is made of one or more minerals" },
      { type: "multiple", q: "Obsidian is a glassy igneous rock that forms when lava cools...",                  choices: ["Very slowly underground","Very quickly above ground","Under the ocean","Under pressure"], answer: "Very quickly above ground" }
    ],
    quiz: [
      { type: "multiple", q: "Which process turns sedimentary rock into metamorphic rock?",                      choices: ["Cooling","Heat and pressure","Erosion","Melting and re-cooling"], answer: "Heat and pressure" },
      { type: "multiple", q: "The hardness of a mineral is measured on the...",                                  choices: ["Richter Scale","Mohs Scale","Kelvin Scale","Decibel Scale"], answer: "Mohs Scale" },
      { type: "multiple", q: "Which is the softest mineral on the Mohs scale?",                                  choices: ["Diamond","Quartz","Talc","Calcite"], answer: "Talc" }
    ]
  },

  // ── LIFE SCIENCE ─────────────────────────────────────────

  {
    id: "sci-5-cells",
    code: "LS-CE-1A",
    level: "life",
    subject: "science",
    topic: "Cells",
    title: "The Building Blocks of Life",
    subtitle: "What is a cell?",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Cells — The Smallest Unit of Life",
      text: "Every living thing is made of cells — from a tiny bacterium with just one cell to a human body with 37 trillion! The cell is the smallest unit that performs all life functions. Animal cells have a nucleus (the 'brain'), mitochondria (the 'power plants'), and a membrane (the outer wall). Plant cells also have a rigid cell wall and chloroplasts for photosynthesis."
    },
    practice: [
      { type: "multiple", q: "What is the 'control center' of the cell that contains DNA?",                      choices: ["Mitochondria","Cell membrane","Nucleus","Chloroplast"], answer: "Nucleus" },
      { type: "multiple", q: "Which organelle produces energy for the cell?",                                    choices: ["Nucleus","Mitochondria","Vacuole","Ribosome"], answer: "Mitochondria" },
      { type: "multiple", q: "Which structure is found in plant cells but NOT in animal cells?",                 choices: ["Nucleus","Cell membrane","Cell wall","Mitochondria"], answer: "Cell wall" },
      { type: "multiple", q: "A single-celled organism is called...",                                            choices: ["Multicellular","Unicellular","Prokaryote only","A virus"], answer: "Unicellular" },
      { type: "multiple", q: "What is the flexible outer boundary of ALL cells?",                                choices: ["Cell wall","Nucleus","Cell membrane","Cytoplasm"], answer: "Cell membrane" }
    ],
    quiz: [
      { type: "multiple", q: "Chloroplasts in plant cells are responsible for...",                               choices: ["Storing water","Making energy from sunlight","Digesting food","Controlling cell division"], answer: "Making energy from sunlight" },
      { type: "multiple", q: "Which is the correct order from smallest to largest?",                             choices: ["Organism→Organ→Cell","Cell→Tissue→Organ→Organism","Tissue→Cell→Organ","Organ→Cell→Tissue"], answer: "Cell→Tissue→Organ→Organism" },
      { type: "multiple", q: "Bacteria cells differ from human cells because bacteria...",                       choices: ["Have no nucleus","Have no DNA","Are larger","Have mitochondria"], answer: "Have no nucleus" }
    ]
  },

  {
    id: "sci-life-plants",
    code: "LS-PL-1A",
    level: "life",
    subject: "science",
    topic: "Plants",
    title: "Plants & Photosynthesis",
    subtitle: "How plants make food from sunlight",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Plants Are the World's Solar Panels!",
      text: "Plants are producers — they make their own food through photosynthesis. The equation: Carbon Dioxide + Water + Sunlight → Glucose + Oxygen. This happens in chloroplasts (which contain chlorophyll, the green pigment). Roots absorb water and nutrients from soil. Leaves capture sunlight. Stems transport water and food. Without plants, there would be no oxygen in our atmosphere and no food chains — all life depends on them!"
    },
    practice: [
      { type: "multiple", q: "What are the THREE ingredients plants need for photosynthesis?",                   choices: ["Soil, water, and sunlight","CO₂, water, and sunlight","Oxygen, water, and CO₂","Glucose, water, and sunlight"], answer: "CO₂, water, and sunlight" },
      { type: "multiple", q: "Photosynthesis produces glucose AND...",                                           choices: ["Carbon dioxide","Water vapor","Oxygen","Nitrogen"], answer: "Oxygen" },
      { type: "multiple", q: "In which part of the plant cell does photosynthesis happen?",                      choices: ["Mitochondria","Nucleus","Chloroplast","Vacuole"], answer: "Chloroplast" },
      { type: "multiple", q: "What is chlorophyll?",                                                             choices: ["A type of root","The green pigment that absorbs sunlight","A type of soil nutrient","The outer layer of a leaf"], answer: "The green pigment that absorbs sunlight" },
      { type: "multiple", q: "Which plant part is responsible for absorbing water from the soil?",               choices: ["Leaves","Stem","Roots","Flowers"], answer: "Roots" }
    ],
    quiz: [
      { type: "multiple", q: "Why do leaves change color in autumn?",                                           choices: ["They are dying","Chlorophyll breaks down, revealing other pigments","They absorb more sunlight","They stop producing oxygen"], answer: "Chlorophyll breaks down, revealing other pigments" },
      { type: "multiple", q: "Plants are classified as 'producers' because they...",                             choices: ["Produce oxygen only","Make their own food through photosynthesis","Produce carbon dioxide","Grow and reproduce"], answer: "Make their own food through photosynthesis" },
      { type: "multiple", q: "A plant placed in a dark room for two weeks would most likely...",                 choices: ["Grow faster","Die because it cannot photosynthesize","Produce more oxygen","Change color to white"], answer: "Die because it cannot photosynthesize" }
    ]
  },

  {
    id: "sci-life-body",
    code: "LS-HB-1A",
    level: "life",
    subject: "science",
    topic: "Human Body",
    title: "Human Body Systems",
    subtitle: "The systems that keep you alive",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Your Body is an Amazing Machine!",
      text: "The human body has 11 major organ systems all working together. Key ones: Circulatory System — heart pumps blood carrying oxygen and nutrients to all cells. Respiratory System — lungs take in oxygen and release CO₂. Digestive System — breaks down food into nutrients. Skeletal System — 206 bones support and protect the body. Nervous System — brain and nerves control everything. Each system is interdependent — if one fails, others are affected!"
    },
    practice: [
      { type: "multiple", q: "Which organ pumps blood through the body?",                                        choices: ["Liver","Lungs","Heart","Kidney"], answer: "Heart" },
      { type: "multiple", q: "The respiratory system's main function is...",                                     choices: ["Digest food","Exchange oxygen and CO₂","Pump blood","Filter waste from blood"], answer: "Exchange oxygen and CO₂" },
      { type: "multiple", q: "How many bones does an adult human body have?",                                    choices: ["186","196","206","226"], answer: "206" },
      { type: "multiple", q: "Which system breaks food into nutrients your body can use?",                       choices: ["Circulatory","Respiratory","Digestive","Skeletal"], answer: "Digestive" },
      { type: "multiple", q: "The brain and spinal cord are part of the ___ system.",                            choices: ["Circulatory","Endocrine","Nervous","Muscular"], answer: "Nervous" }
    ],
    quiz: [
      { type: "multiple", q: "What is the main job of red blood cells?",                                        choices: ["Fight infection","Carry oxygen","Digest food","Produce hormones"], answer: "Carry oxygen" },
      { type: "multiple", q: "Which organ filters waste products from the blood to make urine?",                 choices: ["Liver","Stomach","Kidney","Spleen"], answer: "Kidney" },
      { type: "multiple", q: "Why do we shiver when cold?",                                                     choices: ["Nervous system reaction to signal danger","Muscles contract rapidly to generate body heat","Blood vessels expand","Digestion speeds up"], answer: "Muscles contract rapidly to generate body heat" }
    ]
  },

  {
    id: "sci-life-genetics",
    code: "LS-GE-1A",
    level: "life",
    subject: "science",
    topic: "Genetics",
    title: "Introduction to Genetics",
    subtitle: "DNA, traits & heredity",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Why Do You Look Like Your Parents?",
      text: "Genetics is the study of how traits are passed from parents to offspring. Every cell in your body contains DNA — a molecule shaped like a twisted ladder (double helix) that contains all your genetic information. DNA is organized into chromosomes (humans have 46 = 23 pairs). Genes are sections of DNA that code for specific traits like eye color. You inherit one copy of each gene from each parent. Some genes are dominant (mask other genes), others are recessive (hidden unless both copies are present)."
    },
    practice: [
      { type: "multiple", q: "What is DNA?",                                                                     choices: ["A type of protein","A molecule that carries genetic information","A type of cell","An organelle"], answer: "A molecule that carries genetic information" },
      { type: "multiple", q: "How many chromosomes do human body cells normally have?",                          choices: ["23","46","48","92"], answer: "46" },
      { type: "multiple", q: "A dominant gene is one that...",                                                   choices: ["Is always hidden","Is expressed when at least one copy is present","Only comes from mothers","Only appears in males"], answer: "Is expressed when at least one copy is present" },
      { type: "multiple", q: "The shape of DNA is best described as a...",                                       choices: ["Single helix","Circle","Double helix (twisted ladder)","Straight ladder"], answer: "Double helix (twisted ladder)" },
      { type: "multiple", q: "Traits passed from parents to offspring are called...",                            choices: ["Environmental traits","Inherited traits","Learned behaviors","Mutations"], answer: "Inherited traits" }
    ],
    quiz: [
      { type: "multiple", q: "A child has brown eyes. Both parents have blue eyes. This is...",                  choices: ["Impossible — two blue-eyed parents always have blue-eyed children","Possible if brown is recessive","Possible if both parents carry a hidden brown gene","Only possible with mutations"], answer: "Possible if both parents carry a hidden brown gene" },
      { type: "multiple", q: "What is a gene?",                                                                  choices: ["A full chromosome","A segment of DNA coding for a specific trait","The entire genetic code","A type of protein"], answer: "A segment of DNA coding for a specific trait" },
      { type: "multiple", q: "Where is DNA found in a cell?",                                                    choices: ["Mitochondria only","Cell membrane","Nucleus (and mitochondria)","Cytoplasm"], answer: "Nucleus (and mitochondria)" }
    ]
  },

  // ── PHYSICAL SCIENCE ─────────────────────────────────────

  {
    id: "sci-5-forces",
    code: "PS-FM-1A",
    level: "physical",
    subject: "science",
    topic: "Forces",
    title: "Forces & Motion",
    subtitle: "Pushes, pulls, gravity & friction",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Forces Move (and Stop) Everything!",
      text: "A force is a push or pull. Forces make things start moving, stop moving, speed up, slow down, or change direction. Two forces you feel every day: Gravity — pulls everything toward Earth's center. Friction — resists motion between surfaces. Newton's First Law: an object in motion stays in motion unless a force acts on it. That's inertia!"
    },
    practice: [
      { type: "multiple", q: "What is a force?",                                                                 choices: ["Energy stored in objects","A push or pull that can change motion","The speed of an object","A type of energy"], answer: "A push or pull that can change motion" },
      { type: "multiple", q: "Gravity on Earth always pulls objects...",                                         choices: ["Upward","Sideways","Downward","In all directions"], answer: "Downward" },
      { type: "multiple", q: "Which surface would have the MOST friction?",                                      choices: ["Ice","Smooth glass","Rough sandpaper","Wet tile"], answer: "Rough sandpaper" },
      { type: "multiple", q: "A soccer ball rolling on grass slows down. What force is causing this?",           choices: ["Gravity","Friction","Magnetism","Tension"], answer: "Friction" },
      { type: "multiple", q: "Newton's First Law says an object at rest stays at rest unless...",                choices: ["It gets heavier","An outside force acts on it","It gets colder","Gravity increases"], answer: "An outside force acts on it" }
    ],
    quiz: [
      { type: "multiple", q: "If two equal forces push on an object from opposite sides, the object will...",    choices: ["Move left","Move right","Stay still","Spin"], answer: "Stay still" },
      { type: "multiple", q: "Which has more gravitational force on you: Earth or the Moon?",                    choices: ["Moon","Earth","Same","Depends on time"], answer: "Earth" },
      { type: "multiple", q: "A heavy and light object dropped from the same height (ignoring air). Which hits first?", choices: ["Heavier object","Lighter object","They hit at the same time","It varies"], answer: "They hit at the same time" }
    ]
  },

  {
    id: "sci-6-matter",
    code: "PS-MS-1A",
    level: "physical",
    subject: "science",
    topic: "Matter",
    title: "Matter & States of Matter",
    subtitle: "Solids, liquids, gases & plasma",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Everything Around You Is Matter!",
      text: "Matter is anything with mass that takes up space. It exists in states: Solid (particles packed tightly, fixed shape), Liquid (particles flow, take container shape), Gas (particles spread out, fill any space), Plasma (super-hot ionized gas, like lightning and stars). Changing states requires adding or removing heat energy."
    },
    practice: [
      { type: "multiple", q: "Which is NOT a state of matter?",                                                  choices: ["Solid","Liquid","Energy","Gas"], answer: "Energy" },
      { type: "multiple", q: "In a solid, particles are...",                                                     choices: ["Far apart and random","Close and vibrating in place","Moving freely","Spread throughout"], answer: "Close and vibrating in place" },
      { type: "multiple", q: "When liquid water becomes ice, this change is called...",                          choices: ["Melting","Evaporation","Freezing","Condensation"], answer: "Freezing" },
      { type: "multiple", q: "What happens to particles when matter is heated?",                                 choices: ["They slow down","They stop moving","They move faster","They get heavier"], answer: "They move faster" },
      { type: "multiple", q: "Which state of matter has definite volume but NO definite shape?",                 choices: ["Solid","Liquid","Gas","Plasma"], answer: "Liquid" }
    ],
    quiz: [
      { type: "multiple", q: "Ice cream melting is an example of...",                                            choices: ["Freezing","Melting","Evaporation","Sublimation"], answer: "Melting" },
      { type: "multiple", q: "Which state of matter is most compressible (squeezed into smaller space)?",        choices: ["Solid","Liquid","Gas","They're equal"], answer: "Gas" },
      { type: "multiple", q: "The sun is made mostly of...",                                                     choices: ["Gas","Liquid","Solid","Plasma"], answer: "Plasma" }
    ]
  },

  {
    id: "sci-phys-energy",
    code: "PS-EN-1A",
    level: "physical",
    subject: "science",
    topic: "Energy",
    title: "Energy & Work",
    subtitle: "Kinetic, potential & forms of energy",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Energy Is Everywhere!",
      text: "Energy is the ability to do work. It comes in many forms but the two most fundamental are: Kinetic Energy (KE) — energy of motion. The faster and heavier an object, the more KE it has. KE = ½mv². Potential Energy (PE) — stored energy based on position. A book on a shelf has gravitational PE. A stretched rubber band has elastic PE. The Law of Conservation of Energy: energy cannot be created or destroyed — only converted from one form to another. That roller coaster converts PE to KE and back!"
    },
    practice: [
      { type: "multiple", q: "What is kinetic energy?",                                                          choices: ["Stored energy","Energy of motion","Chemical energy","Electrical energy"], answer: "Energy of motion" },
      { type: "multiple", q: "A ball at the top of a hill has mostly...",                                        choices: ["Kinetic energy","Thermal energy","Gravitational potential energy","Chemical energy"], answer: "Gravitational potential energy" },
      { type: "multiple", q: "According to the Law of Conservation of Energy...",                                choices: ["Energy is always lost as heat","Energy can be created from nothing","Energy cannot be created or destroyed, only transformed","Energy increases over time"], answer: "Energy cannot be created or destroyed, only transformed" },
      { type: "multiple", q: "What happens to the kinetic energy of a ball as it rolls up a hill?",              choices: ["Stays the same","Increases","Converts to potential energy","Disappears"], answer: "Converts to potential energy" },
      { type: "multiple", q: "Which has MORE kinetic energy: a 2 kg ball moving at 3 m/s, or a 2 kg ball at 6 m/s?", choices: ["Same kinetic energy","Ball at 3 m/s","Ball at 6 m/s","Cannot be determined"], answer: "Ball at 6 m/s" }
    ],
    quiz: [
      { type: "multiple", q: "A stretched bow (like in archery) contains...",                                    choices: ["Kinetic energy","Chemical energy","Elastic potential energy","Thermal energy"], answer: "Elastic potential energy" },
      { type: "multiple", q: "When you rub your hands together they get warm. This is an example of converting...", choices: ["Chemical energy to heat","Kinetic energy to thermal energy","Potential energy to kinetic energy","Electrical energy to heat"], answer: "Kinetic energy to thermal energy" },
      { type: "multiple", q: "The unit of energy in the metric system is the...",                                choices: ["Watt","Newton","Joule","Kelvin"], answer: "Joule" }
    ]
  },

  {
    id: "sci-phys-waves",
    code: "PS-WA-1A",
    level: "physical",
    subject: "science",
    topic: "Waves",
    title: "Sound & Light Waves",
    subtitle: "Frequency, wavelength & the electromagnetic spectrum",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Everything is Waves!",
      text: "A wave transfers energy from one place to another without moving matter. Two main types: Mechanical waves (need a medium — sound travels through air, water, or solids). Electromagnetic waves (need NO medium — light travels through the vacuum of space). Wave properties: wavelength (distance between crests), frequency (waves per second, measured in Hz), amplitude (height of the wave = energy). Sound waves are compression waves; light waves are transverse waves."
    },
    practice: [
      { type: "multiple", q: "Which type of wave does NOT need a medium to travel?",                             choices: ["Sound waves","Water waves","Electromagnetic waves","Seismic waves"], answer: "Electromagnetic waves" },
      { type: "multiple", q: "What is the frequency of a wave?",                                                 choices: ["The height of the wave","The distance between two crests","The number of waves per second","The speed of the wave"], answer: "The number of waves per second" },
      { type: "multiple", q: "Why can we hear sound on Earth but not in space?",                                 choices: ["Space is too cold","Sound is blocked by Earth's atmosphere","Sound needs a medium (matter) to travel","Sound waves are too weak in space"], answer: "Sound needs a medium (matter) to travel" },
      { type: "multiple", q: "Higher frequency sound waves have...",                                             choices: ["Lower pitch","Higher pitch","More amplitude","Less energy"], answer: "Higher pitch" },
      { type: "multiple", q: "Which has the highest frequency in the electromagnetic spectrum?",                 choices: ["Radio waves","Visible light","Infrared","Gamma rays"], answer: "Gamma rays" }
    ],
    quiz: [
      { type: "multiple", q: "Why does the sky appear blue?",                                                    choices: ["Oceans reflect blue light upward","The atmosphere scatters shorter (blue) wavelengths more","All sunlight is blue","Ozone is blue"], answer: "The atmosphere scatters shorter (blue) wavelengths more" },
      { type: "multiple", q: "Sound travels fastest through...",                                                 choices: ["Air","Water","A vacuum","Solid materials"], answer: "Solid materials" },
      { type: "multiple", q: "What does amplitude determine in a sound wave?",                                   choices: ["Pitch","Speed","Loudness","Frequency"], answer: "Loudness" }
    ]
  },

  // ── ADVANCED SCIENCE ─────────────────────────────────────

  {
    id: "sci-adv-reactions",
    code: "AS-CR-1A",
    level: "advanced",
    subject: "science",
    topic: "Chemistry",
    title: "Chemical Reactions",
    subtitle: "Reactants, products, equations & types",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Atoms Rearrange — That's Chemistry!",
      text: "A chemical reaction occurs when substances (reactants) are transformed into new substances (products). Chemical bonds are broken and formed. Signs of a reaction: color change, gas production, temperature change, precipitate forms. The Law of Conservation of Mass states that atoms are neither created nor destroyed in a reaction — the same atoms appear in products as in reactants. Balancing equations ensures this! Types: Synthesis (A+B→AB), Decomposition (AB→A+B), Combustion (fuel+O₂→CO₂+H₂O), Single/Double Replacement."
    },
    practice: [
      { type: "multiple", q: "In a chemical reaction, what are the starting materials called?",                  choices: ["Products","Reactants","Elements","Compounds"], answer: "Reactants" },
      { type: "multiple", q: "The Law of Conservation of Mass states that...",                                   choices: ["Mass increases during reactions","Atoms are rearranged, not created or destroyed","Energy is always released","Temperature stays constant"], answer: "Atoms are rearranged, not created or destroyed" },
      { type: "multiple", q: "Which is a sign that a chemical reaction has occurred?",                          choices: ["Ice melting","Salt dissolving in water","Gas bubbles forming unexpectedly","Water boiling"], answer: "Gas bubbles forming unexpectedly" },
      { type: "multiple", q: "In combustion reactions, fuel reacts with oxygen to produce...",                   choices: ["Water only","CO₂ and H₂O","Hydrogen and oxygen","Metal and salt"], answer: "CO₂ and H₂O" },
      { type: "multiple", q: "Why must we balance chemical equations?",                                         choices: ["To make them look neat","To satisfy the Law of Conservation of Mass","To find the product","To identify the reaction type"], answer: "To satisfy the Law of Conservation of Mass" }
    ],
    quiz: [
      { type: "multiple", q: "What type of reaction is: AB → A + B?",                                           choices: ["Synthesis","Decomposition","Combustion","Single replacement"], answer: "Decomposition" },
      { type: "multiple", q: "In photosynthesis (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂), the reactants are...",        choices: ["Glucose and oxygen","CO₂ and H₂O","Oxygen and water","Glucose and CO₂"], answer: "CO₂ and H₂O" },
      { type: "multiple", q: "An exothermic reaction...",                                                        choices: ["Absorbs heat from surroundings","Releases energy/heat","Requires very high temperatures","Only happens in labs"], answer: "Releases energy/heat" }
    ]
  },

  {
    id: "sci-adv-genetics",
    code: "AS-GN-1A",
    level: "advanced",
    subject: "science",
    topic: "Advanced Genetics",
    title: "Genetics & Heredity — Advanced",
    subtitle: "Punnett squares, mutations & biotechnology",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Predicting Traits with Science!",
      text: "Gregor Mendel discovered the laws of inheritance using pea plants. A Punnett square predicts the probability of offspring traits. Genotype = actual alleles (Bb, BB, bb). Phenotype = what you see (brown eyes vs blue). Dominant alleles (B) mask recessive ones (b). Heterozygous (Bb) shows the dominant trait. Homozygous can be dominant (BB) or recessive (bb). Mutations are changes in DNA — most are harmless, some cause disease, a few drive evolution. Modern biotechnology (CRISPR) can now edit specific genes!"
    },
    practice: [
      { type: "multiple", q: "In genetics, what is a 'phenotype'?",                                              choices: ["The actual alleles an organism has","The physical trait you can observe","A type of mutation","One of Mendel's laws"], answer: "The physical trait you can observe" },
      { type: "multiple", q: "An organism with genotype 'Bb' is called...",                                      choices: ["Homozygous dominant","Homozygous recessive","Heterozygous","A mutation"], answer: "Heterozygous" },
      { type: "multiple", q: "If both parents are Bb (brown eyes, B dominant), the probability of a bb child (blue eyes) is...", choices: ["0%","25%","50%","75%"], answer: "25%" },
      { type: "multiple", q: "What is a mutation?",                                                              choices: ["Normal trait inheritance","A change in DNA sequence","A type of Punnett square","Dominant gene expression"], answer: "A change in DNA sequence" },
      { type: "multiple", q: "Mendel's Law of Segregation states that...",                                       choices: ["Traits blend together in offspring","Alleles separate during gamete formation","All offspring are identical to parents","Only dominant traits are inherited"], answer: "Alleles separate during gamete formation" }
    ],
    quiz: [
      { type: "multiple", q: "A cross between BB x bb produces offspring with genotype...",                      choices: ["All BB","All bb","All Bb","50% BB, 50% bb"], answer: "All Bb" },
      { type: "multiple", q: "CRISPR is a biotechnology tool used to...",                                        choices: ["Grow crops faster","Edit specific sequences in DNA","Sequence entire genomes","Create new organisms from scratch"], answer: "Edit specific sequences in DNA" },
      { type: "multiple", q: "What fraction of offspring from a Bb x Bb cross will show the dominant phenotype?", choices: ["1/4","2/4","3/4","4/4"], answer: "3/4" }
    ]
  },


  // ── EARTH SCIENCE (more) ───────────────────────────────

  {
    id: "sci-earth-climate",
    code: "ES-CC-1A",
    level: "earth",
    subject: "science",
    topic: "Climate",
    title: "Climate & Climate Change",
    subtitle: "Weather vs climate, greenhouse effect & global impact",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Weather vs Climate: What's the Difference?",
      text: "Weather is what's happening outside RIGHT NOW (sunny, rainy, windy). Climate is the average weather pattern over 30+ years. The greenhouse effect is natural and necessary — gases like CO₂ and water vapor trap heat in the atmosphere, keeping Earth warm enough for life. However, human activity (burning fossil fuels, deforestation) has increased CO₂ dramatically since 1850, trapping extra heat. Effects: rising sea levels, more extreme weather events, shifting ecosystems, melting polar ice."
    },
    practice: [
      { type: "multiple", q: "What is the difference between weather and climate?",                             choices: ["They are the same thing","Weather is right now; climate is long-term averages","Climate changes daily; weather is stable","Weather is global; climate is local"], answer: "Weather is right now; climate is long-term averages" },
      { type: "multiple", q: "The greenhouse effect works because certain gases...",                             choices: ["Block all sunlight","Trap heat in the atmosphere","Reflect heat into space","Absorb oxygen"], answer: "Trap heat in the atmosphere" },
      { type: "multiple", q: "Which human activity contributes MOST to increased CO₂ levels?",                 choices: ["Recycling","Burning fossil fuels","Farming","Drinking water"], answer: "Burning fossil fuels" },
      { type: "multiple", q: "Rising global temperatures are causing polar ice to melt, which leads to...",    choices: ["Lower sea levels","Higher sea levels","Colder oceans","More polar bears"], answer: "Higher sea levels" },
      { type: "multiple", q: "Which gas is the PRIMARY contributor to human-caused climate change?",           choices: ["Oxygen","Nitrogen","Carbon Dioxide (CO₂)","Hydrogen"], answer: "Carbon Dioxide (CO₂)" }
    ],
    quiz: [
      { type: "multiple", q: "A city in the Sahara Desert has had a heat wave this week. This is an example of...", choices: ["Climate","Weather","Global warming","The greenhouse effect"], answer: "Weather" },
      { type: "multiple", q: "Deforestation contributes to climate change because trees...",                    choices: ["Produce CO₂","Absorb CO₂ — fewer trees means more CO₂ in the air","Reflect sunlight","Generate heat"], answer: "Absorb CO₂ — fewer trees means more CO₂ in the air" },
      { type: "multiple", q: "Which is a long-term effect of unchecked climate change?",                       choices: ["A single hot summer","Permanent shifts in growing seasons and sea levels","Temporary weather changes","Colder winters globally"], answer: "Permanent shifts in growing seasons and sea levels" }
    ]
  },

  {
    id: "sci-earth-oceans",
    code: "ES-OC-1A",
    level: "earth",
    subject: "science",
    topic: "Oceans",
    title: "Ocean Systems",
    subtitle: "Currents, tides, zones & marine life",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The Ocean Covers 71% of Earth!",
      text: "Earth's oceans are one giant connected system. Key concepts: Ocean currents — rivers of water flowing through the ocean, driven by wind and temperature differences. They regulate climate worldwide. Tides — caused by the Moon's gravitational pull. The ocean has depth zones: Sunlight Zone (0-200m, where most life lives), Twilight Zone (200-1000m), Midnight Zone (1000-4000m, no light), Abyssal Zone (4000m+). 95% of the ocean remains unexplored!"
    },
    practice: [
      { type: "multiple", q: "What percentage of Earth is covered by ocean?",                                   choices: ["50%","61%","71%","82%"], answer: "71%" },
      { type: "multiple", q: "Ocean currents are primarily driven by...",                                       choices: ["The Moon's gravity","Wind and temperature/density differences","Earthquakes","Fish migration"], answer: "Wind and temperature/density differences" },
      { type: "multiple", q: "Tides are mainly caused by...",                                                   choices: ["The Sun's heat","Wind","The Moon's gravitational pull","Ocean currents"], answer: "The Moon's gravitational pull" },
      { type: "multiple", q: "Which ocean zone receives enough sunlight for photosynthesis?",                  choices: ["Midnight Zone","Abyssal Zone","Sunlight Zone","Twilight Zone"], answer: "Sunlight Zone" },
      { type: "multiple", q: "The Gulf Stream is a major ocean current that...",                               choices: ["Cools the Caribbean","Keeps Western Europe warmer than it would otherwise be","Causes hurricanes","Creates the Sahara Desert"], answer: "Keeps Western Europe warmer than it would otherwise be" }
    ],
    quiz: [
      { type: "multiple", q: "What percentage of the ocean is still unexplored?",                              choices: ["About 5%","About 50%","About 75%","About 95%"], answer: "About 95%" },
      { type: "multiple", q: "Coral reefs are found in which ocean zone?",                                     choices: ["Sunlight Zone","Twilight Zone","Midnight Zone","Abyssal Zone"], answer: "Sunlight Zone" },
      { type: "multiple", q: "Ocean salinity comes primarily from...",                                         choices: ["Rainfall","Rivers carrying dissolved minerals from rock","Volcanic activity only","Melting ice caps"], answer: "Rivers carrying dissolved minerals from rock" }
    ]
  },

  // ── LIFE SCIENCE (more) ────────────────────────────────

  {
    id: "sci-life-evolution",
    code: "LS-EV-1A",
    level: "life",
    subject: "science",
    topic: "Evolution",
    title: "Evolution & Natural Selection",
    subtitle: "How species change over time",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Why Are There So Many Species?",
      text: "Charles Darwin's theory of natural selection explains how life diversifies over time. Key ideas: 1) Variation — individuals in a species differ from each other. 2) Heredity — traits are passed to offspring. 3) Selection pressure — some traits help survival better than others. 4) Differential reproduction — individuals with beneficial traits survive and reproduce more. Over millions of years, populations change dramatically. Fossil evidence, DNA comparisons, and direct observation all support evolution."
    },
    practice: [
      { type: "multiple", q: "Who developed the theory of natural selection?",                                  choices: ["Isaac Newton","Charles Darwin","Albert Einstein","Gregor Mendel"], answer: "Charles Darwin" },
      { type: "multiple", q: "Natural selection favors traits that...",                                         choices: ["Are the most colorful","Help an organism survive and reproduce","Are passed from parents","Are the rarest"], answer: "Help an organism survive and reproduce" },
      { type: "multiple", q: "Fossils provide evidence for evolution because they show...",                    choices: ["That species have always been the same","How organisms have changed over time","That all species appeared at once","Only extinct animals"], answer: "How organisms have changed over time" },
      { type: "multiple", q: "Antibiotic-resistant bacteria are an example of...",                             choices: ["Genetic mutation only","Natural selection happening rapidly","Lamarckian evolution","Random chance"], answer: "Natural selection happening rapidly" },
      { type: "multiple", q: "When a species evolves into two separate species, this is called...",            choices: ["Mutation","Speciation","Adaptation","Extinction"], answer: "Speciation" }
    ],
    quiz: [
      { type: "multiple", q: "A population of moths lives on light bark. Factory pollution darkens the bark. Which moths are now more likely to survive?", choices: ["Light-colored moths","Dark-colored moths","All moths equally","Neither — they all die"], answer: "Dark-colored moths" },
      { type: "multiple", q: "The similar bone structure in human arms, whale flippers, and bat wings suggests...",choices: ["These animals are identical","They evolved from a common ancestor","Coincidence","They live in the same environment"], answer: "They evolved from a common ancestor" },
      { type: "multiple", q: "Which type of evidence for evolution shows that humans and chimpanzees share about 98% of their DNA?", choices: ["Fossil record","Biogeography","Molecular/DNA evidence","Comparative anatomy"], answer: "Molecular/DNA evidence" }
    ]
  },

  {
    id: "sci-life-immune",
    code: "LS-IS-1A",
    level: "life",
    subject: "science",
    topic: "Immune System",
    title: "The Immune System",
    subtitle: "How your body fights infection",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Your Body's Defense Force!",
      text: "The immune system has two lines of defense: Innate (non-specific) immunity — physical barriers (skin), fever, inflammation — immediate but not targeted. Adaptive (specific) immunity — white blood cells called lymphocytes that learn to recognize specific pathogens. B cells produce antibodies (proteins that tag invaders for destruction). T cells directly attack infected cells. Memory cells remain after infection so future attacks are defeated faster — this is the basis of vaccination!"
    },
    practice: [
      { type: "multiple", q: "What is the body's FIRST physical barrier against infection?",                   choices: ["White blood cells","Antibodies","Skin","Fever"], answer: "Skin" },
      { type: "multiple", q: "Antibodies are produced by...",                                                  choices: ["Red blood cells","T cells","B cells","Platelets"], answer: "B cells" },
      { type: "multiple", q: "What is the purpose of a fever during infection?",                               choices: ["Cool down the body","Create more red blood cells","Make the body inhospitable to pathogens","Produce antibodies faster"], answer: "Make the body inhospitable to pathogens" },
      { type: "multiple", q: "Vaccines work by...",                                                             choices: ["Killing all bacteria in the body","Training the immune system to recognize a pathogen without causing disease","Providing antibodies directly","Boosting white blood cell count permanently"], answer: "Training the immune system to recognize a pathogen without causing disease" },
      { type: "multiple", q: "Memory cells allow the immune system to...",                                      choices: ["Fight infections faster the second time","Produce more red blood cells","Prevent all future infections","Create more antibiotics"], answer: "Fight infections faster the second time" }
    ],
    quiz: [
      { type: "multiple", q: "An autoimmune disease occurs when...",                                            choices: ["The immune system is too weak","The immune system attacks the body's own cells","Bacteria destroy white blood cells","The body cannot produce antibodies"], answer: "The immune system attacks the body's own cells" },
      { type: "multiple", q: "Which type of white blood cell directly destroys virus-infected cells?",         choices: ["B cells","T cells","Memory cells","Platelets"], answer: "T cells" },
      { type: "multiple", q: "Herd immunity is achieved when...",                                               choices: ["Everyone takes antibiotics","A large enough portion of a population is immune, protecting vulnerable individuals","Only healthy people are vaccinated","The disease mutates into a harmless form"], answer: "A large enough portion of a population is immune, protecting vulnerable individuals" }
    ]
  },

  // ── PHYSICAL SCIENCE (more) ────────────────────────────

  {
    id: "sci-phys-electricity",
    code: "PS-EL-1A",
    level: "physical",
    subject: "science",
    topic: "Electricity",
    title: "Electricity & Circuits",
    subtitle: "Current, voltage, resistance & circuits",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The Flow of Electrons!",
      text: "Electricity is the flow of electric charge (electrons) through a conductor. Key terms: Voltage (V) — the 'push' that drives electrons (measured in volts). Current (I) — the rate of electron flow (amperes). Resistance (R) — opposition to flow (ohms). Ohm's Law: V = I × R. Series circuits — components connected in a single path (one break stops everything). Parallel circuits — multiple paths (one break doesn't stop the others). Your home runs on parallel circuits!"
    },
    practice: [
      { type: "multiple", q: "What is electric current?",                                                       choices: ["The push that drives electrons","The rate of electron flow","Opposition to electron flow","Stored electrical energy"], answer: "The rate of electron flow" },
      { type: "fill",     q: "Ohm's Law: V = I × R. If I = 2A and R = 10 ohms, V = ?",                        answer: "20", hint: "V = 2 × 10" },
      { type: "multiple", q: "In a series circuit, if one bulb burns out...",                                  choices: ["All other bulbs stay on","All other bulbs go out","The current increases","Nothing changes"], answer: "All other bulbs go out" },
      { type: "multiple", q: "In a parallel circuit, each branch...",                                          choices: ["Shares the same current","Has the same voltage but can have different currents","Adds resistance","Must be identical"], answer: "Has the same voltage but can have different currents" },
      { type: "multiple", q: "Which material is the best electrical conductor?",                                choices: ["Rubber","Wood","Copper","Plastic"], answer: "Copper" }
    ],
    quiz: [
      { type: "fill",     q: "If voltage is 120V and resistance is 60 ohms, what is the current (I = V/R)?",   answer: "2", hint: "I = 120 ÷ 60" },
      { type: "multiple", q: "Why are household circuits wired in parallel?",                                  choices: ["It uses less wire","Each device gets full voltage and one failure doesn't affect others","It is cheaper","Series is too complicated"], answer: "Each device gets full voltage and one failure doesn't affect others" },
      { type: "multiple", q: "A circuit breaker protects a home by...",                                        choices: ["Increasing voltage","Stopping current if it exceeds a safe level","Making circuits parallel","Adding resistance"], answer: "Stopping current if it exceeds a safe level" }
    ]
  },

  {
    id: "sci-phys-simple-machines",
    code: "PS-SM-1A",
    level: "physical",
    subject: "science",
    topic: "Simple Machines",
    title: "Simple Machines",
    subtitle: "Levers, pulleys, ramps & mechanical advantage",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Work Smarter, Not Harder!",
      text: "Simple machines make work easier by changing the direction or magnitude of a force. The 6 types: Lever (seesaw, scissors), Wheel and Axle (doorknob, car wheel), Pulley (flag pole, elevator), Inclined Plane/Ramp, Wedge (knife, axe), Screw (bolt, jar lid). Mechanical Advantage (MA) = output force ÷ input force. A MA greater than 1 means the machine multiplies your force. Compound machines combine two or more simple machines (a bicycle uses a wheel+axle, lever, and more)."
    },
    practice: [
      { type: "multiple", q: "A crowbar is an example of which simple machine?",                               choices: ["Pulley","Wedge","Lever","Inclined plane"], answer: "Lever" },
      { type: "multiple", q: "A ramp makes it easier to move something uphill because...",                    choices: ["It reduces the distance","It increases the force needed","It reduces the force needed by spreading work over a longer distance","It is always faster"], answer: "It reduces the force needed by spreading work over a longer distance" },
      { type: "multiple", q: "Which simple machine would you use to split a log?",                             choices: ["Lever","Screw","Wedge","Pulley"], answer: "Wedge" },
      { type: "multiple", q: "Mechanical Advantage = output force ÷ input force. An MA of 3 means...",        choices: ["The machine does 3 times less work","The machine multiplies your force by 3","The work is done 3 times faster","You need 3 machines"], answer: "The machine multiplies your force by 3" },
      { type: "multiple", q: "A pulley system with multiple wheels...",                                        choices: ["Increases the effort needed","Increases the distance you must pull","Increases the mechanical advantage","Decreases the mechanical advantage"], answer: "Increases the mechanical advantage" }
    ],
    quiz: [
      { type: "multiple", q: "A screw is really a curved version of which other simple machine?",              choices: ["Lever","Wedge","Pulley","Inclined plane"], answer: "Inclined plane" },
      { type: "multiple", q: "You apply 50N of force and lift a 200N object. What is the mechanical advantage?",choices: ["4","150","0.25","2"], answer: "4" },
      { type: "multiple", q: "Which compound machine contains both a lever and a wedge?",                      choices: ["Bicycle","Scissors","Pulley system","Ramp"], answer: "Scissors" }
    ]
  },

  // ── ADVANCED SCIENCE (more) ────────────────────────────

  {
    id: "sci-adv-nuclear",
    code: "AS-NP-1A",
    level: "advanced",
    subject: "science",
    topic: "Nuclear Physics",
    title: "Nuclear Physics Basics",
    subtitle: "Atoms, radioactivity & nuclear energy",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "The Power Inside the Atom!",
      text: "The nucleus of an atom contains protons and neutrons held together by the strong nuclear force. Nuclear reactions release far more energy than chemical reactions. Radioactive decay: unstable nuclei emit radiation — Alpha (α, helium nucleus), Beta (β, electron), or Gamma (γ, high-energy photon). Half-life is the time for half the atoms to decay. Fission splits a heavy nucleus (uranium) releasing enormous energy — used in nuclear power plants and bombs. Fusion combines light nuclei (like hydrogen) releasing even more energy — powers the sun!"
    },
    practice: [
      { type: "multiple", q: "What is nuclear fission?",                                                        choices: ["Combining two light nuclei","Splitting a heavy nucleus","Radioactive decay","Electron emission"], answer: "Splitting a heavy nucleus" },
      { type: "multiple", q: "The Sun produces energy through nuclear...",                                     choices: ["Fission","Fusion","Decay","Oxidation"], answer: "Fusion" },
      { type: "multiple", q: "If a substance has a half-life of 10 years and you start with 100g, how much remains after 20 years?", choices: ["50g","25g","10g","75g"], answer: "25g" },
      { type: "multiple", q: "Which type of radiation is the most penetrating?",                               choices: ["Alpha (α)","Beta (β)","Gamma (γ)","They are all equal"], answer: "Gamma (γ)" },
      { type: "multiple", q: "Einstein's equation E = mc² tells us that...",                                   choices: ["Energy and mass are unrelated","A tiny amount of mass contains enormous energy","Mass equals energy times the speed of light","Speed of light squared is constant"], answer: "A tiny amount of mass contains enormous energy" }
    ],
    quiz: [
      { type: "multiple", q: "Nuclear power plants use fission to produce electricity. What element is most commonly used as fuel?", choices: ["Hydrogen","Carbon","Uranium","Helium"], answer: "Uranium" },
      { type: "multiple", q: "Why is nuclear fusion considered the 'holy grail' of clean energy?",             choices: ["It produces no waste","It uses common fuels (hydrogen) and produces helium — abundant and safe","It is already widely used","It produces more CO₂ than fossil fuels"], answer: "It uses common fuels (hydrogen) and produces helium — abundant and safe" },
      { type: "fill",     q: "A radioactive sample has a half-life of 5 years. After 15 years, what fraction of the original amount remains?", answer: "1/8", hint: "3 half-lives: ½ × ½ × ½ = 1/8" }
    ]
  },

  {
    id: "sci-adv-environment",
    code: "AS-EN-1A",
    level: "advanced",
    subject: "science",
    topic: "Environmental Science",
    title: "Environmental Science",
    subtitle: "Biomes, pollution, sustainability & ecology",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Understanding Our Planet's Systems!",
      text: "Environmental science studies the interactions between humans and the natural world. A biome is a large ecological region defined by climate and vegetation (tropical rainforest, desert, tundra, grassland, taiga, temperate forest, ocean). Human impacts include: air pollution (smog, acid rain), water pollution (runoff, plastic), soil degradation, deforestation, and biodiversity loss. Sustainability means meeting present needs without compromising future generations. The UN's 17 Sustainable Development Goals (SDGs) provide a global framework."
    },
    practice: [
      { type: "multiple", q: "Which biome has the highest biodiversity?",                                       choices: ["Tundra","Taiga","Tropical rainforest","Temperate forest"], answer: "Tropical rainforest" },
      { type: "multiple", q: "Acid rain is caused by...",                                                       choices: ["CO₂ alone","SO₂ and NOx emissions reacting with water in the atmosphere","Radioactive decay","Volcanic activity only"], answer: "SO₂ and NOx emissions reacting with water in the atmosphere" },
      { type: "multiple", q: "The 'tragedy of the commons' describes...",                                       choices: ["When governments over-regulate","When shared resources are overexploited because no individual bears the full cost","When private property is protected","When resources are too expensive"], answer: "When shared resources are overexploited because no individual bears the full cost" },
      { type: "multiple", q: "Eutrophication (excess nutrients causing algae blooms) is primarily caused by...",choices: ["Industrial air pollution","Agricultural fertilizer runoff into water","Deforestation","Nuclear waste"], answer: "Agricultural fertilizer runoff into water" },
      { type: "multiple", q: "What does 'biodiversity' measure?",                                              choices: ["Total number of trees in a region","The variety of species and genetic diversity in an ecosystem","How many endangered species exist","The size of an ecosystem"], answer: "The variety of species and genetic diversity in an ecosystem" }
    ],
    quiz: [
      { type: "multiple", q: "What is the keystone species concept?",                                          choices: ["The largest species in an ecosystem","A species that has a disproportionately large impact on its ecosystem","The most endangered species","The first species to colonize an area"], answer: "A species that has a disproportionately large impact on its ecosystem" },
      { type: "multiple", q: "The ozone layer protects Earth from...",                                         choices: ["Cosmic rays","Ultraviolet (UV) radiation","Infrared radiation","X-rays"], answer: "Ultraviolet (UV) radiation" },
      { type: "multiple", q: "Which is a renewable energy source?",                                            choices: ["Coal","Natural gas","Wind","Nuclear fission (uranium)"], answer: "Wind" }
    ]
  },


];