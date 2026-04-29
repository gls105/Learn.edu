// ============================================================
//  Learn.edu — History Lessons
//  Uses `level` field: 'ancient' | 'us' | 'world' | 'modern'
// ============================================================

const HISTORY_LESSONS = [

  // ── ANCIENT HISTORY ──────────────────────────────────────

  {
    id: "hist-anc-egypt",
    code: "ANC-EG-1A",
    level: "ancient",
    subject: "history",
    topic: "Ancient Egypt",
    title: "Ancient Egypt",
    subtitle: "Pharaohs, pyramids & the Nile",
    duration: "10 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "One of History's Greatest Civilizations!",
      text: "Ancient Egypt flourished for over 3,000 years (3100 BCE – 30 BCE) along the Nile River. The Nile was everything — its annual floods deposited rich soil that made farming possible in the desert. Egyptian society was a hierarchy: Pharaoh (god-king) at the top, then priests and nobles, scribes and artisans, farmers, and enslaved people. The pyramids were tombs for pharaohs — the Great Pyramid of Giza (built ~2560 BCE) is one of the Seven Wonders of the Ancient World. Hieroglyphics were their writing system. The Rosetta Stone (discovered 1799) unlocked the ability to read them."
    },
    practice: [
      { type: "multiple", q: "The Nile River was essential to Egypt primarily because...",                   choices: ["It provided defense from enemies","Its floods created fertile farmland in the desert","It connected Egypt to Rome","It was a source of gold"], answer: "Its floods created fertile farmland in the desert" },
      { type: "multiple", q: "The Pharaoh in Ancient Egypt was considered...",                               choices: ["A military general only","An elected leader","A god-king","An appointed judge"], answer: "A god-king" },
      { type: "multiple", q: "What were the Egyptian pyramids primarily used for?",                          choices: ["Storing grain","As temples for worship","As tombs for pharaohs","Military forts"], answer: "As tombs for pharaohs" },
      { type: "multiple", q: "What is hieroglyphics?",                                                       choices: ["Ancient Egyptian money","The Egyptian writing system using symbols","A type of pyramid","The name for Egyptian gods"], answer: "The Egyptian writing system using symbols" },
      { type: "multiple", q: "The Rosetta Stone was significant because it...",                              choices: ["Proved Egypt existed","Was made of pure gold","Allowed historians to decode hieroglyphics","Listed all the pharaohs"], answer: "Allowed historians to decode hieroglyphics" }
    ],
    quiz: [
      { type: "multiple", q: "Which river was central to Ancient Egyptian civilization?",                   choices: ["Amazon","Yangtze","Nile","Euphrates"], answer: "Nile" },
      { type: "multiple", q: "About how long did Ancient Egyptian civilization last?",                      choices: ["100 years","500 years","3,000 years","10,000 years"], answer: "3,000 years" },
      { type: "multiple", q: "The Great Pyramid of Giza is classified as...",                               choices: ["A temple","A palace","One of the Seven Wonders of the Ancient World","A fortress"], answer: "One of the Seven Wonders of the Ancient World" }
    ]
  },

  {
    id: "hist-anc-greece",
    code: "ANC-GR-1A",
    level: "ancient",
    subject: "history",
    topic: "Ancient Greece",
    title: "Ancient Greece",
    subtitle: "Democracy, philosophy & the Olympics",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The Birthplace of Western Civilization!",
      text: "Ancient Greece (800–146 BCE) gave the world democracy, philosophy, the Olympics, theater, and the foundations of science and mathematics. Greece was made up of independent city-states (polis) — Athens was known for democracy and arts; Sparta for military strength. Athens invented direct democracy (~508 BCE) under Cleisthenes. Great thinkers: Socrates (question everything), Plato (ideal forms, The Republic), Aristotle (logic, biology, ethics). The Olympic Games began in 776 BCE as a religious festival. Alexander the Great spread Greek culture across Persia, Egypt, and India — creating the Hellenistic world."
    },
    practice: [
      { type: "multiple", q: "Which Greek city-state was known for its military culture?",                  choices: ["Athens","Corinth","Sparta","Thebes"], answer: "Sparta" },
      { type: "multiple", q: "Democracy was developed in which ancient city-state?",                        choices: ["Sparta","Rome","Athens","Persia"], answer: "Athens" },
      { type: "multiple", q: "Which Greek philosopher is known for saying 'I know that I know nothing'?",   choices: ["Plato","Aristotle","Socrates","Homer"], answer: "Socrates" },
      { type: "multiple", q: "The Olympic Games originally began as...",                                    choices: ["A military competition","A religious festival","A trade event","A way to choose leaders"], answer: "A religious festival" },
      { type: "multiple", q: "Alexander the Great was significant because he...",                           choices: ["Founded Rome","Wrote the Iliad","Spread Greek culture across Persia, Egypt, and India","Invented democracy"], answer: "Spread Greek culture across Persia, Egypt, and India" }
    ],
    quiz: [
      { type: "multiple", q: "The word 'democracy' comes from Greek meaning...",                            choices: ["Rule of kings","Rule of priests","Rule of the people","Rule of soldiers"], answer: "Rule of the people" },
      { type: "multiple", q: "Aristotle was known for his work in...",                                      choices: ["Architecture and building","Logic, biology, and ethics","Poetry and drama","Military strategy only"], answer: "Logic, biology, and ethics" },
      { type: "multiple", q: "What is a 'polis'?",                                                          choices: ["Greek army unit","Greek city-state","A Greek god","A type of ship"], answer: "Greek city-state" }
    ]
  },

  // ── US HISTORY ───────────────────────────────────────────

  {
    id: "hist-us-revolution",
    code: "US-REV-1A",
    level: "us",
    subject: "history",
    topic: "American Revolution",
    title: "The American Revolution",
    subtitle: "Causes, key events & independence",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "How America Became America!",
      text: "The American Revolution (1775–1783) was the colonial revolt against British rule that created the United States. Key causes: 'No taxation without representation' — Britain taxed colonies (Stamp Act, Townshend Acts, Tea Act) without giving them a vote in Parliament. Key events: Boston Massacre (1770), Boston Tea Party (1773), First Continental Congress (1774), Battles of Lexington & Concord (1775 — 'the shot heard round the world'), Declaration of Independence (July 4, 1776), Valley Forge winter (1777-78), Battle of Yorktown (1781 — British surrender). Key figures: George Washington, Thomas Jefferson, Benjamin Franklin, Alexander Hamilton, Paul Revere."
    },
    practice: [
      { type: "multiple", q: "What was the main colonial complaint that led to the Revolution?",             choices: ["Britain was too far away","Colonists were taxed without having representation in Parliament","Britain banned trade with France","Colonists wanted a king of their own"], answer: "Colonists were taxed without having representation in Parliament" },
      { type: "multiple", q: "The 'shot heard round the world' refers to...",                               choices: ["The Boston Massacre","The signing of the Declaration of Independence","The first battles at Lexington & Concord","The Battle of Yorktown"], answer: "The first battles at Lexington & Concord" },
      { type: "multiple", q: "The Declaration of Independence was signed in...",                            choices: ["1775","1776","1781","1783"], answer: "1776" },
      { type: "multiple", q: "Who wrote the Declaration of Independence?",                                  choices: ["George Washington","Benjamin Franklin","John Adams","Thomas Jefferson"], answer: "Thomas Jefferson" },
      { type: "multiple", q: "The Battle of Yorktown (1781) was significant because...",                    choices: ["It was the first battle of the war","The British surrendered, effectively ending the war","George Washington was captured","France switched sides"], answer: "The British surrendered, effectively ending the war" }
    ],
    quiz: [
      { type: "multiple", q: "The Boston Tea Party was a protest against...",                               choices: ["A ban on tea imports","British tea taxes","The quality of tea","Tea from France"], answer: "British tea taxes" },
      { type: "multiple", q: "George Washington's army suffered through a brutal winter at...",             choices: ["Yorktown","Bunker Hill","Valley Forge","Lexington"], answer: "Valley Forge" },
      { type: "multiple", q: "Which nation was a crucial ally to America during the Revolution?",           choices: ["Spain","Germany","France","Portugal"], answer: "France" }
    ]
  },

  {
    id: "hist-us-civil-war",
    code: "US-CW-1A",
    level: "us",
    subject: "history",
    topic: "Civil War",
    title: "The American Civil War",
    subtitle: "Causes, slavery & the Union",
    duration: "12 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The War That Defined America!",
      text: "The Civil War (1861–1865) was fought between the Union (North, 23 states) and the Confederacy (South, 11 states that seceded). The central cause: slavery — Southern states feared Abraham Lincoln would limit or abolish slavery, threatening their economy. Secession: South Carolina seceded first (Dec 1860), followed by 10 more states. Key events: Fort Sumter (1861 — first shots), Battle of Antietam (1862 — bloodiest single day), Emancipation Proclamation (Jan 1, 1863 — freed enslaved people in Confederate states), Gettysburg (1863 — turning point), Appomattox (April 1865 — Lee surrendered to Grant). Lincoln was assassinated days after the war ended."
    },
    practice: [
      { type: "multiple", q: "The primary cause of the Civil War was...",                                   choices: ["Economic differences over tariffs","The issue of slavery and states' rights","A dispute over territory","British interference"], answer: "The issue of slavery and states' rights" },
      { type: "multiple", q: "Which state was the first to secede from the Union?",                         choices: ["Virginia","Georgia","Mississippi","South Carolina"], answer: "South Carolina" },
      { type: "multiple", q: "The Emancipation Proclamation (1863) declared...",                            choices: ["The end of the Civil War","Enslaved people in Confederate states were free","All enslaved people in America were immediately free","The South had to rejoin the Union"], answer: "Enslaved people in Confederate states were free" },
      { type: "multiple", q: "The Battle of Gettysburg (1863) is considered the turning point because...",  choices: ["It was the last battle","Union victory stopped the Confederate invasion of the North","Lincoln gave a speech there","The Confederate Army surrendered there"], answer: "Union victory stopped the Confederate invasion of the North" },
      { type: "multiple", q: "Where did Confederate General Robert E. Lee surrender?",                      choices: ["Gettysburg","Richmond","Fort Sumter","Appomattox Court House"], answer: "Appomattox Court House" }
    ],
    quiz: [
      { type: "multiple", q: "Abraham Lincoln was assassinated...",                                         choices: ["Before the war ended","During the Battle of Gettysburg","Days after the war ended","While signing the Emancipation Proclamation"], answer: "Days after the war ended" },
      { type: "multiple", q: "The Confederacy was made up of how many states?",                             choices: ["7","9","11","13"], answer: "11" },
      { type: "multiple", q: "What was the bloodiest single day of the Civil War?",                         choices: ["Gettysburg","Fort Sumter","Antietam","Bull Run"], answer: "Antietam" }
    ]
  },

  // ── WORLD HISTORY ────────────────────────────────────────

  {
    id: "hist-world-ww2",
    code: "WH-WW2-1A",
    level: "world",
    subject: "history",
    topic: "World War II",
    title: "World War II",
    subtitle: "Causes, key events & the Holocaust",
    duration: "12 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The War That Changed the World!",
      text: "World War II (1939–1945) was the deadliest conflict in history — ~70–85 million people died. Causes: rise of fascism (Hitler in Germany, Mussolini in Italy), German invasion of Poland (Sept 1939), Japanese expansionism in Asia. Allies (USA, UK, USSR, France) vs. Axis (Germany, Italy, Japan). Key events: Fall of France (1940), Battle of Britain (1940), Operation Barbarossa — Germany invades USSR (1941), Pearl Harbor — Japan attacks USA (Dec 7, 1941), D-Day / Normandy invasion (June 6, 1944), Germany surrenders (May 8, 1945 — VE Day), Atomic bombs on Hiroshima & Nagasaki — Japan surrenders (Aug 1945 — VJ Day). The Holocaust: Nazi Germany systematically murdered ~6 million Jewish people and millions of others."
    },
    practice: [
      { type: "multiple", q: "What event triggered the start of World War II in Europe?",                   choices: ["The bombing of Pearl Harbor","Germany's invasion of Poland","The assassination of Archduke Franz Ferdinand","The rise of Hitler"], answer: "Germany's invasion of Poland" },
      { type: "multiple", q: "The United States entered WWII after...",                                     choices: ["Germany invaded France","Britain declared war","Japan bombed Pearl Harbor","The Holocaust was discovered"], answer: "Japan bombed Pearl Harbor" },
      { type: "multiple", q: "D-Day (June 6, 1944) refers to...",                                          choices: ["Germany's surrender","The Allied invasion of Normandy, France","The bombing of Pearl Harbor","The atomic bombing of Japan"], answer: "The Allied invasion of Normandy, France" },
      { type: "multiple", q: "The Holocaust was the systematic murder of approximately how many Jewish people?", choices: ["1 million","3 million","6 million","10 million"], answer: "6 million" },
      { type: "multiple", q: "VE Day (May 8, 1945) stands for...",                                         choices: ["Victory in East Asia","Victory in Europe","Vietnam End Day","Victory Everywhere"], answer: "Victory in Europe" }
    ],
    quiz: [
      { type: "multiple", q: "The Axis powers in WWII included...",                                         choices: ["USA, UK, and France","Germany, Italy, and Japan","USSR, Germany, and Japan","Britain, France, and Italy"], answer: "Germany, Italy, and Japan" },
      { type: "multiple", q: "What weapon ended the war with Japan in 1945?",                               choices: ["Conventional bombing","Naval blockade","Atomic bombs dropped on Hiroshima and Nagasaki","German surrender"], answer: "Atomic bombs dropped on Hiroshima and Nagasaki" },
      { type: "multiple", q: "Approximately how many people died in WWII?",                                 choices: ["5 million","20 million","70-85 million","2 million"], answer: "70-85 million" }
    ]
  },

  // ── MODERN HISTORY ───────────────────────────────────────

  {
    id: "hist-mod-civil-rights",
    code: "MOD-CR-1A",
    level: "modern",
    subject: "history",
    topic: "Civil Rights Movement",
    title: "The Civil Rights Movement",
    subtitle: "Segregation, protest & equality",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The Fight for Equality in America!",
      text: "The Civil Rights Movement (1950s–1960s) was the organized struggle by Black Americans — and their allies — to end racial segregation and discrimination in the United States. Background: After the Civil War, Jim Crow laws enforced segregation in the South. Key events: Brown v. Board of Education (1954 — Supreme Court ruled school segregation unconstitutional), Rosa Parks refuses to give up her seat (1955 → Montgomery Bus Boycott), Little Rock Nine (1957), Greensboro sit-ins (1960), Freedom Rides (1961), March on Washington (1963 — 'I Have a Dream' speech by MLK), Civil Rights Act of 1964, Voting Rights Act of 1965. Key figures: Martin Luther King Jr., Rosa Parks, John Lewis, Medgar Evers, Thurgood Marshall."
    },
    practice: [
      { type: "multiple", q: "Jim Crow laws were designed to...",                                           choices: ["Protect Black citizens' rights","Enforce racial segregation in the South","Integrate schools","Allow Black Americans to vote freely"], answer: "Enforce racial segregation in the South" },
      { type: "multiple", q: "Brown v. Board of Education (1954) ruled that...",                            choices: ["Segregated schools were legal","School segregation was unconstitutional","Black students could attend any school they chose","Busing was required"], answer: "School segregation was unconstitutional" },
      { type: "multiple", q: "Rosa Parks is famous for...",                                                  choices: ["Organizing the March on Washington","Refusing to give up her bus seat to a white passenger","Writing the Civil Rights Act","Leading the Freedom Rides"], answer: "Refusing to give up her bus seat to a white passenger" },
      { type: "multiple", q: "Martin Luther King Jr.'s 'I Have a Dream' speech was delivered at...",        choices: ["The Supreme Court","The White House","The March on Washington in 1963","Selma, Alabama"], answer: "The March on Washington in 1963" },
      { type: "multiple", q: "The Civil Rights Act of 1964 prohibited...",                                  choices: ["All immigration","Discrimination based on race, color, religion, sex, or national origin","Protests and marches","Affirmative action"], answer: "Discrimination based on race, color, religion, sex, or national origin" }
    ],
    quiz: [
      { type: "multiple", q: "What was the Montgomery Bus Boycott a response to?",                          choices: ["A bus fare increase","Rosa Parks' arrest for refusing to give up her seat","Poor bus service","A bus driver's actions"], answer: "Rosa Parks' arrest for refusing to give up her seat" },
      { type: "multiple", q: "Thurgood Marshall is famous for...",                                          choices: ["Organizing sit-ins","Arguing Brown v. Board of Education before the Supreme Court","The 'I Have a Dream' speech","Leading the Freedom Rides"], answer: "Arguing Brown v. Board of Education before the Supreme Court" },
      { type: "multiple", q: "The Voting Rights Act of 1965 was passed to...",                              choices: ["Give women the right to vote","Remove barriers preventing Black Americans from voting","Allow 18-year-olds to vote","Create term limits"], answer: "Remove barriers preventing Black Americans from voting" }
    ]
  },

  {
    id: "hist-mod-cold-war",
    code: "MOD-CW-1A",
    level: "modern",
    subject: "history",
    topic: "Cold War",
    title: "The Cold War",
    subtitle: "USA vs USSR, arms race & the Space Race",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "The War That Was Never Fought Directly!",
      text: "The Cold War (1947–1991) was a geopolitical tension between the USA (capitalist democracy) and the USSR (communist) — never direct military conflict, but intense rivalry. Key concepts: Nuclear deterrence — both sides had enough nukes to destroy the world, creating 'Mutually Assured Destruction (MAD)'. The Arms Race — each side built more powerful weapons. The Space Race — USSR launched Sputnik (1957 — first satellite), USA landed on the Moon (1969). Key events: Berlin Wall built (1961) and torn down (1989), Cuban Missile Crisis (1962 — closest to nuclear war), Vietnam War, Korean War. The USSR dissolved December 25, 1991, ending the Cold War."
    },
    practice: [
      { type: "multiple", q: "The Cold War was called 'cold' because...",                                   choices: ["It took place in cold climates","There was never direct military conflict between the USA and USSR","Both sides had cold weapons","The conflict happened at night"], answer: "There was never direct military conflict between the USA and USSR" },
      { type: "multiple", q: "The USSR launched Sputnik in 1957. What was Sputnik?",                        choices: ["A nuclear missile","The first human in space","The first artificial satellite in orbit","A Soviet submarine"], answer: "The first artificial satellite in orbit" },
      { type: "multiple", q: "The Cuban Missile Crisis (1962) was the closest the world came to...",        choices: ["A Soviet invasion of Europe","Nuclear war","USA invading Cuba","A Berlin Wall war"], answer: "Nuclear war" },
      { type: "multiple", q: "'Mutually Assured Destruction (MAD)' meant that...",                         choices: ["Both sides were insane","If either side launched nukes, both would be destroyed","Only one side had enough weapons to win","Nuclear weapons were defective"], answer: "If either side launched nukes, both would be destroyed" },
      { type: "multiple", q: "The Cold War ended when...",                                                  choices: ["The USA won a major battle","The USSR dissolved in 1991","The Berlin Wall was built","Nixon visited China"], answer: "The USSR dissolved in 1991" }
    ],
    quiz: [
      { type: "multiple", q: "The USA first landed humans on the Moon in...",                               choices: ["1957","1963","1969","1972"], answer: "1969" },
      { type: "multiple", q: "The Berlin Wall divided which city?",                                         choices: ["Moscow","Paris","London","Berlin"], answer: "Berlin" },
      { type: "multiple", q: "Which economic system did the USA support during the Cold War?",              choices: ["Communism","Socialism","Capitalism","Feudalism"], answer: "Capitalism" }
    ]
  },

];
