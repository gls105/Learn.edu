// ============================================================
//  Learn.edu — English Language Arts (ELA) Lessons
//  Uses `level` field: 'beginning' | 'ela1' | 'ela2' | 'advanced'
// ============================================================

const ELA_LESSONS = [

  // ── BEGINNING ELA ────────────────────────────────────────

  {
    id: "ela-beg-parts-of-speech",
    code: "BEG-PS-1A",
    level: "beginning",
    subject: "ela",
    topic: "Parts of Speech",
    title: "Parts of Speech",
    subtitle: "Nouns, verbs, adjectives & adverbs",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "The Building Blocks of Every Sentence!",
      text: "Every word in English plays a role. The 8 parts of speech tell us what job each word does. Noun — a person, place, thing, or idea (dog, city, freedom). Verb — an action or state of being (run, is, think). Adjective — describes a noun (tall, red, happy). Adverb — describes a verb, adjective, or another adverb (quickly, very, well). Pronoun — replaces a noun (he, she, they). Conjunction — connects words/phrases (and, but, because). Preposition — shows relationship (on, in, under). Interjection — expresses emotion (Wow! Oh!)."
    },
    practice: [
      { type: "multiple", q: "In the sentence 'The happy dog ran quickly,' what part of speech is 'happy'?", choices: ["Noun","Verb","Adjective","Adverb"], answer: "Adjective" },
      { type: "multiple", q: "What part of speech is the word 'quickly'?",                                    choices: ["Adjective","Verb","Adverb","Noun"], answer: "Adverb" },
      { type: "multiple", q: "Identify the NOUN in: 'She threw the red ball.'",                              choices: ["She","threw","red","ball"], answer: "ball" },
      { type: "multiple", q: "Which word is a CONJUNCTION?",                                                  choices: ["Under","Running","But","Quickly"], answer: "But" },
      { type: "multiple", q: "'Wow, that was amazing!' — The word 'Wow' is an...",                           choices: ["Adverb","Interjection","Adjective","Preposition"], answer: "Interjection" }
    ],
    quiz: [
      { type: "multiple", q: "In 'The cat sat on the mat,' which is a PREPOSITION?",                         choices: ["cat","sat","on","mat"], answer: "on" },
      { type: "multiple", q: "Replace 'Maria' with a pronoun: 'Maria loves science.'",                       choices: ["He","She","They","It"], answer: "She" },
      { type: "multiple", q: "Which sentence has an ADVERB?",                                                choices: ["The dog is big","She sang beautifully","A happy child played","The blue sky"], answer: "She sang beautifully" }
    ]
  },

  {
    id: "ela-beg-reading-comp",
    code: "BEG-RC-1A",
    level: "beginning",
    subject: "ela",
    topic: "Reading Comprehension",
    title: "Reading Comprehension Basics",
    subtitle: "Main idea, details & inference",
    duration: "10 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Read It. Understand It. Own It.",
      text: "Reading comprehension means understanding what you read — not just the words, but the meaning behind them. Key skills: Main Idea — what is the whole passage mostly about? (Not just one detail!) Supporting Details — specific facts or examples that prove the main idea. Inference — figuring out something the author implies but doesn't directly say. Author's Purpose — why did the author write this? (Persuade, Inform, Entertain). Summarizing — retelling the key points in your own words briefly."
    },
    practice: [
      { type: "multiple", q: "The 'main idea' of a paragraph is...",                                         choices: ["The first sentence only","What the whole passage is mostly about","The most interesting detail","The author's name"], answer: "What the whole passage is mostly about" },
      { type: "multiple", q: "An inference is...",                                                           choices: ["A direct quote from the text","A conclusion drawn from clues in the text","The author's main point","A definition of a word"], answer: "A conclusion drawn from clues in the text" },
      { type: "multiple", q: "A textbook chapter about photosynthesis was probably written to...",           choices: ["Entertain","Persuade","Inform","Argue"], answer: "Inform" },
      { type: "multiple", q: "Supporting details SUPPORT the...",                                            choices: ["Title","Author","Main idea","Summary"], answer: "Main idea" },
      { type: "multiple", q: "A good summary should be...",                                                  choices: ["Longer than the original","A word-for-word copy","Brief and in your own words","Only the first and last sentences"], answer: "Brief and in your own words" }
    ],
    quiz: [
      { type: "multiple", q: "Passage: 'The shelter was full of dogs waiting for homes. Volunteers walked and fed them daily.' The main idea is...", choices: ["Volunteers love dogs","A dog shelter cares for animals awaiting adoption","Dogs need food","Volunteers are busy"], answer: "A dog shelter cares for animals awaiting adoption" },
      { type: "multiple", q: "You read: 'She packed an umbrella, raincoat, and rain boots.' You can infer...",choices: ["She is going to the beach","Rain is expected","She loves bright colors","She lost her bag"], answer: "Rain is expected" },
      { type: "multiple", q: "A persuasive text is trying to...",                                            choices: ["Tell a story","Teach facts","Change your opinion or action","List vocabulary"], answer: "Change your opinion or action" }
    ]
  },

  {
    id: "ela-beg-punctuation",
    code: "BEG-PU-1A",
    level: "beginning",
    subject: "ela",
    topic: "Punctuation",
    title: "Punctuation & Capitalization",
    subtitle: "Commas, apostrophes, periods & more",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Punctuation Changes Everything!",
      text: "Consider: 'Let's eat, Grandma!' vs 'Let's eat Grandma!' — punctuation saves lives! Key rules: Period (.) ends a statement. Question mark (?) ends a question. Exclamation mark (!) shows strong emotion. Comma (,) separates items in a list, joins independent clauses with a conjunction, or sets off introductory phrases. Apostrophe (') shows possession (Maria's book) or contraction (don't = do not). Quotation marks (\"\") surround spoken words. Capitalize: first word of a sentence, proper nouns, pronoun 'I'."
    },
    practice: [
      { type: "multiple", q: "Which sentence uses a comma correctly?",                                       choices: ["I like cats dogs and birds","I like cats, dogs, and birds","I like, cats dogs and birds","I like cats dogs, and birds"], answer: "I like cats, dogs, and birds" },
      { type: "multiple", q: "What does an apostrophe show in \"Maria's backpack\"?",                        choices: ["Plural","Contraction","Possession","Abbreviation"], answer: "Possession" },
      { type: "multiple", q: "Which word is a CONTRACTION?",                                                choices: ["Cannot","Dont","Don't","Will not"], answer: "Don't" },
      { type: "multiple", q: "Which word should be capitalized?",                                            choices: ["the dog ran","we went to miami","she is happy","it is cold"], answer: "we went to miami" },
      { type: "multiple", q: "Which sentence needs a QUESTION MARK?",                                       choices: ["The sky is blue","Wow that is cool","What time is it","Come here now"], answer: "What time is it" }
    ],
    quiz: [
      { type: "multiple", q: "Fix this: 'its a beautiful day'",                                             choices: ["It's a beautiful day","Its a beautiful day.","its a Beautiful day","It's A Beautiful Day"], answer: "It's a beautiful day" },
      { type: "multiple", q: "Which sentence uses quotation marks correctly?",                               choices: ["She said \"I love pizza\".","She said I love pizza.","\"She said I love pizza.\"","She \"said\" I love pizza."], answer: "She said \"I love pizza\"." },
      { type: "multiple", q: "You need a comma before 'but' when...",                                       choices: ["But starts the sentence","It connects two complete sentences","The sentence is long","Never use a comma with but"], answer: "It connects two complete sentences" }
    ]
  },

  // ── ELA 1 ────────────────────────────────────────────────

  {
    id: "ela-1-literary-devices",
    code: "ELA1-LD-1A",
    level: "ela1",
    subject: "ela",
    topic: "Literary Devices",
    title: "Literary Devices",
    subtitle: "Simile, metaphor, personification & more",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Writers Use These to Make Language Come Alive!",
      text: "Literary devices are tools writers use to make their writing vivid and powerful. Simile — comparing two things using 'like' or 'as' ('Her smile is like sunshine'). Metaphor — a direct comparison without 'like' or 'as' ('Life is a roller coaster'). Personification — giving human qualities to non-human things ('The wind whispered secrets'). Alliteration — repeating the same starting sound ('Peter Piper picked a peck'). Hyperbole — extreme exaggeration ('I've told you a million times!'). Onomatopoeia — words that sound like their meaning (buzz, crash, splash)."
    },
    practice: [
      { type: "multiple", q: "'Her voice was honey' is an example of...",                                    choices: ["Simile","Metaphor","Personification","Alliteration"], answer: "Metaphor" },
      { type: "multiple", q: "'The stars danced in the sky' is an example of...",                           choices: ["Simile","Hyperbole","Personification","Onomatopoeia"], answer: "Personification" },
      { type: "multiple", q: "'She runs as fast as a cheetah' is a...",                                     choices: ["Metaphor","Simile","Hyperbole","Alliteration"], answer: "Simile" },
      { type: "multiple", q: "Which is an example of ALLITERATION?",                                        choices: ["The sun set slowly","Sally sells seashells","I'm so hungry I could eat a horse","The clock ticked"], answer: "Sally sells seashells" },
      { type: "multiple", q: "HYPERBOLE is...",                                                              choices: ["A comparison using 'like' or 'as'","A deliberate exaggeration for effect","A human quality given to an object","A word that sounds like its meaning"], answer: "A deliberate exaggeration for effect" }
    ],
    quiz: [
      { type: "multiple", q: "The word 'CRASH' is an example of...",                                        choices: ["Simile","Metaphor","Onomatopoeia","Personification"], answer: "Onomatopoeia" },
      { type: "multiple", q: "'This bag weighs a ton!' is an example of...",                                 choices: ["Simile","Metaphor","Personification","Hyperbole"], answer: "Hyperbole" },
      { type: "multiple", q: "Identify the literary device: 'The angry clouds gathered overhead.'",         choices: ["Simile","Onomatopoeia","Personification","Alliteration"], answer: "Personification" }
    ]
  },

  {
    id: "ela-1-essay-structure",
    code: "ELA1-ES-1A",
    level: "ela1",
    subject: "ela",
    topic: "Essay Writing",
    title: "Essay Structure & Paragraphs",
    subtitle: "Intro, body, conclusion & topic sentences",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "How to Build a Strong Essay!",
      text: "A well-structured essay has three parts: Introduction — hook the reader, provide background, end with a clear thesis statement (your main argument). Body Paragraphs — each starts with a topic sentence (mini-thesis), followed by evidence and analysis, and ends with a transition. Conclusion — restate your thesis in new words, summarize key points, end with a strong closing thought. The 5-paragraph essay: intro + 3 body paragraphs + conclusion. A thesis statement is the most important sentence — it tells the reader exactly what you will argue or explain."
    },
    practice: [
      { type: "multiple", q: "The thesis statement belongs in the...",                                       choices: ["Body paragraph","Conclusion","Introduction","Anywhere"], answer: "Introduction" },
      { type: "multiple", q: "A topic sentence in a body paragraph does what?",                             choices: ["Summarizes the whole essay","Restates the thesis exactly","States the main point of that paragraph","Introduces a new essay"], answer: "States the main point of that paragraph" },
      { type: "multiple", q: "How many body paragraphs does a standard 5-paragraph essay have?",            choices: ["2","3","4","5"], answer: "3" },
      { type: "multiple", q: "A good CONCLUSION does NOT...",                                               choices: ["Restate the thesis","Summarize key points","Introduce brand new ideas","End with a closing thought"], answer: "Introduce brand new ideas" },
      { type: "multiple", q: "Which is a strong HOOK to start an essay about social media?",               choices: ["Social media exists.","In this essay I will talk about social media.","Did you know the average teen spends 7 hours a day on social media?","Social media is good and bad."], answer: "Did you know the average teen spends 7 hours a day on social media?" }
    ],
    quiz: [
      { type: "multiple", q: "Evidence in a body paragraph should be followed by...",                       choices: ["Another piece of evidence","Analysis explaining how it supports your point","A new thesis","The conclusion"], answer: "Analysis explaining how it supports your point" },
      { type: "multiple", q: "Which is the best THESIS statement?",                                         choices: ["Homework is bad.","This essay is about homework.","Daily homework improves academic performance by reinforcing lessons and building study habits.","Some students do homework and some don't."], answer: "Daily homework improves academic performance by reinforcing lessons and building study habits." },
      { type: "multiple", q: "Transition words like 'Furthermore,' 'However,' and 'In contrast' are used to...",choices: ["Start the essay","Connect ideas between sentences or paragraphs","End paragraphs","State the thesis"], answer: "Connect ideas between sentences or paragraphs" }
    ]
  },

  // ── ELA 2 ────────────────────────────────────────────────

  {
    id: "ela-2-text-analysis",
    code: "ELA2-TA-1A",
    level: "ela2",
    subject: "ela",
    topic: "Text Analysis",
    title: "Analyzing Texts & Arguments",
    subtitle: "Evidence, claims, counterclaims & bias",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Think Critically About Everything You Read!",
      text: "Text analysis means looking BEYOND just what a text says — evaluating HOW and WHY it says it. Key concepts: Claim — the main argument an author makes. Evidence — facts, data, or quotes that support the claim. Counterclaim — the opposing viewpoint. Bias — when a text unfairly favors one perspective. Ethos — credibility (is this author an expert?). Logos — logic and evidence. Pathos — emotional appeal. A strong argument addresses counterclaims. Always ask: Is this source credible? What evidence is used? What might be missing?"
    },
    practice: [
      { type: "multiple", q: "A CLAIM in an argument is...",                                                choices: ["A proven fact","A question the author asks","The main argument or position","A statistic"], answer: "The main argument or position" },
      { type: "multiple", q: "COUNTERCLAIM in an argument refers to...",                                    choices: ["More evidence for the main claim","The opposing viewpoint","A personal story","The conclusion"], answer: "The opposing viewpoint" },
      { type: "multiple", q: "An advertisement uses emotional music and images of suffering animals. This is an appeal to...", choices: ["Logos (logic)","Ethos (credibility)","Pathos (emotion)","Counterclaim"], answer: "Pathos (emotion)" },
      { type: "multiple", q: "BIAS in a text means...",                                                     choices: ["The author used evidence","The text is factually correct","The text unfairly favors one perspective","The author has credentials"], answer: "The text unfairly favors one perspective" },
      { type: "multiple", q: "Which is the STRONGEST evidence for an argument about exercise?",             choices: ["I feel better when I exercise","Exercise is good for you","A Harvard study of 50,000 people found 30 min of daily exercise reduces heart disease risk by 35%","Many doctors recommend exercise"], answer: "A Harvard study of 50,000 people found 30 min of daily exercise reduces heart disease risk by 35%" }
    ],
    quiz: [
      { type: "multiple", q: "A newspaper article only quotes people on one side of an issue. This is an example of...", choices: ["Strong reporting","Logos appeal","Bias","Counterclaim"], answer: "Bias" },
      { type: "multiple", q: "Why should a strong argument address counterclaims?",                         choices: ["To make the essay longer","To show understanding of the issue and strengthen credibility","Because teachers require it","Counterclaims prove the author is wrong"], answer: "To show understanding of the issue and strengthen credibility" },
      { type: "multiple", q: "A doctor writing about vaccine safety uses their medical credentials. This is an appeal to...",choices: ["Pathos","Logos","Ethos","Bias"], answer: "Ethos" }
    ]
  },

];
