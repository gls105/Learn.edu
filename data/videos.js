// ============================================================
//  Learn.edu — YouTube Video Library
//  Curated videos from Math Antics, Amoeba Sisters, Khan Academy
// ============================================================

const LESSON_VIDEOS = {

  // ── MATH — Math Antics ──────────────────────────────────
  'math-4-multiplication': {
    url: 'https://www.youtube.com/embed/mvOkMYCygps',
    title: 'Basic Multiplication',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-4-long-division': {
    url: 'https://www.youtube.com/embed/LGqBQrUYua4',
    title: 'Long Division',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-4-geometry': {
    url: 'https://www.youtube.com/embed/ABsQkAOnkuQ',
    title: 'Basic Geometry',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-4-order-ops': {
    url: 'https://www.youtube.com/embed/dAgfnK528RA',
    title: 'Order of Operations',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-5-fractions-intro': {
    url: 'https://www.youtube.com/embed/n0FZhQ_GkKw',
    title: 'What Are Fractions?',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-5-decimals-intro': {
    url: 'https://www.youtube.com/embed/RlfChbd1sJo',
    title: 'Decimal Arithmetic',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-5-percentages': {
    url: 'https://www.youtube.com/embed/JeVSmq1Nrpw',
    title: 'What Are Percentages?',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-5-add-fractions': {
    url: 'https://www.youtube.com/embed/52ZlXsFJULI',
    title: 'Adding & Subtracting Fractions',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-5-mixed-numbers': {
    url: 'https://www.youtube.com/embed/5pfl_5NRKDE',
    title: 'Mixed Numbers',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-6-ratios': {
    url: 'https://www.youtube.com/embed/RQ2nYUBVvqI',
    title: 'Ratios and Proportions',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-6-statistics': {
    url: 'https://www.youtube.com/embed/sk-x9sEBMI0',
    title: 'Mean, Median and Mode',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-6-probability': {
    url: 'https://www.youtube.com/embed/KzfWUEJjG18',
    title: 'Basic Probability',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-7-algebra-intro': {
    url: 'https://www.youtube.com/embed/NybHckSEQBI',
    title: 'Algebra Basics',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-7-proportional': {
    url: 'https://www.youtube.com/embed/RQ2nYUBVvqI',
    title: 'Ratios & Proportions',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-8-linear-equations': {
    url: 'https://www.youtube.com/embed/kSoqkQoULaM',
    title: 'Linear Equations',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-8-pythagorean': {
    url: 'https://www.youtube.com/embed/AA6RfgP-AHU',
    title: 'The Pythagorean Theorem',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-8-scientific-notation': {
    url: 'https://www.youtube.com/embed/0MOFR7FXCds',
    title: 'Scientific Notation',
    channel: 'Math Antics',
    channelColor: '#E8562A'
  },
  'math-8-functions': {
    url: 'https://www.youtube.com/embed/kvGsIo1TmsM',
    title: 'Functions',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'math-9-quadratics': {
    url: 'https://www.youtube.com/embed/d9pO2z2qvXU',
    title: 'Introduction to Quadratic Equations',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'math-9-trigonometry': {
    url: 'https://www.youtube.com/embed/Jsiy4TxgIME',
    title: 'Basic Trigonometry',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },

  // ── SCIENCE — Amoeba Sisters + Khan Academy ──────────────
  'sci-4-ecosystems': {
    url: 'https://www.youtube.com/embed/kZBM0bNMUYs',
    title: 'Ecosystems',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-4-weather': {
    url: 'https://www.youtube.com/embed/sBTZ-94QU_0',
    title: 'The Water Cycle',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-5-cells': {
    url: 'https://www.youtube.com/embed/8IlzKri08kk',
    title: 'Cell Parts & Functions',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-5-forces': {
    url: 'https://www.youtube.com/embed/CQYELiTtUs8',
    title: 'Forces and Motion',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-6-matter': {
    url: 'https://www.youtube.com/embed/s-KvoVzukHo',
    title: 'States of Matter',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-7-layers': {
    url: 'https://www.youtube.com/embed/Q0AmzpBBaJg',
    title: "Earth's Interior Layers",
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-earth-solar': {
    url: 'https://www.youtube.com/embed/libKVRa01L8',
    title: 'The Solar System',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-earth-rocks': {
    url: 'https://www.youtube.com/embed/R4IQvrQFu1U',
    title: 'Rocks & Minerals',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-earth-climate': {
    url: 'https://www.youtube.com/embed/Dv5y_o3VVMY',
    title: 'Climate Change',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-life-plants': {
    url: 'https://www.youtube.com/embed/uixA8ZXx0KU',
    title: 'Photosynthesis',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-life-body': {
    url: 'https://www.youtube.com/embed/Ae4MadKPJhg',
    title: 'Human Body Systems',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-life-evolution': {
    url: 'https://www.youtube.com/embed/P3GagfbA2vo',
    title: 'Natural Selection',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-life-immune': {
    url: 'https://www.youtube.com/embed/zQGOcOUBi6s',
    title: 'Immune System',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-life-genetics': {
    url: 'https://www.youtube.com/embed/CBezq1fFUEA',
    title: 'DNA & Genetics',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-phys-energy': {
    url: 'https://www.youtube.com/embed/rGaM4vS-OKc',
    title: 'Kinetic and Potential Energy',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-phys-waves': {
    url: 'https://www.youtube.com/embed/kYa0WqBpZpo',
    title: 'Sound and Light Waves',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-phys-electricity': {
    url: 'https://www.youtube.com/embed/mc979OhitAg',
    title: 'Electric Circuits',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'sci-adv-reactions': {
    url: 'https://www.youtube.com/embed/g-HP4KBEBBA',
    title: 'Chemical Reactions',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },
  'sci-adv-genetics': {
    url: 'https://www.youtube.com/embed/Mehz7tCxjSE',
    title: 'Punnett Squares',
    channel: 'Amoeba Sisters',
    channelColor: '#059669'
  },

  // ── SPANISH — Khan Academy ───────────────────────────────
  'spa-4-greetings': {
    url: 'https://www.youtube.com/embed/GCNegSXYKno',
    title: 'Spanish Greetings',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'spa-4-numbers': {
    url: 'https://www.youtube.com/embed/YmHNnl3jZH4',
    title: 'Spanish Numbers 1-20',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'spa-6-verbs': {
    url: 'https://www.youtube.com/embed/7QhYbWRlE_E',
    title: 'Spanish Verb Conjugation',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'spa-s1-ser-estar': {
    url: 'https://www.youtube.com/embed/CkHv7lPz2xs',
    title: 'Ser vs. Estar',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
  'spa-s2-preterite': {
    url: 'https://www.youtube.com/embed/FH2BEVQnBMk',
    title: 'Preterite Tense',
    channel: 'Khan Academy',
    channelColor: '#1d7e3f'
  },
};

// Helper: get video for a lesson id
function getLessonVideo(lessonId) {
  return LESSON_VIDEOS[lessonId] || null;
}
