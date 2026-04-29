const REAL_WORLD = [
  {
    id: 'rw-math-algebra',
    subject: 'math',
    topic: 'Algebra',
    cards: [
      {
        career: 'Software Engineer',
        emoji: '💻',
        scenario: 'Writing a game where enemy speed increases each level...',
        connection: 'This is exactly algebra — variables (x) represent unknown values that change.',
        formula: 'speed = baseSpeed + (level × 2)'
      },
      {
        career: 'Data Analyst',
        emoji: '📊',
        scenario: 'Creating formulas to calculate financial predictions and trends.',
        connection: 'Using algebraic expressions helps predict outcomes based on changing variables.',
        formula: 'profit = revenue - expenses'
      },
      {
        career: 'Civil Engineer',
        emoji: '🏗️',
        scenario: 'Designing structures and calculating loads using equations.',
        connection: 'Algebra helps solve for unknown forces and materials needed.',
        formula: 'load = force × distance'
      },
      {
        career: 'Teacher',
        emoji: '📚',
        scenario: 'Explaining how algebra helps solve real-world problems.',
        connection: 'Demonstrating how variables represent unknowns in everyday life.',
        formula: ''
      }
    ]
  },
  {
    id: 'rw-math-geometry',
    subject: 'math',
    topic: 'Geometry',
    cards: [
      {
        career: 'Architect',
        emoji: '🏛️',
        scenario: 'Designing buildings with precise measurements and shapes.',
        connection: 'Uses geometry for shapes, angles, and spatial understanding.',
        formula: 'Area = length × width'
      },
      {
        career: 'Graphic Designer',
        emoji: '🎨',
        scenario: 'Creating logos and layouts with geometric principles.',
        connection: 'Shapes and spatial design rely on geometry concepts.',
        formula: ''
      },
      {
        career: 'Carpenter',
        emoji: '🪚',
        scenario: 'Measuring areas and angles to cut wood precisely.',
        connection: 'Applies geometry to build accurate structures.',
        formula: 'Perimeter = sum of all sides'
      },
      {
        career: 'Surveyor',
        emoji: '📐',
        scenario: 'Mapping land using geometric tools and measurements.',
        connection: 'Uses geometry to calculate distances and areas.',
        formula: 'Distance formula: \u221A(x_2 - x_1)^2 + (y_2 - y_1)^2'
      }
    ]
  },
  {
    id: 'rw-math-fractions',
    subject: 'math',
    topic: 'Fractions',
    cards: [
      {
        career: 'Chef',
        emoji: '👩\uD83C\uDF73',
        scenario: 'Doubling or halving recipes using fractions.',
        connection: 'Fractions help adjust ingredient amounts correctly.',
        formula: 'New recipe = original ingredient × (fraction)'
      },
      {
        career: 'Pharmacist',
        emoji: '💊',
        scenario: 'Measuring doses using fractions for prescriptions.',
        connection: 'Precise fractional measurements ensure safe medication.',
        formula: ''
      },
      {
        career: 'Carpenter',
        emoji: '🪚',
        scenario: 'Cutting wood into fractional parts for furniture.',
        connection: 'Uses fractions to divide materials accurately.',
        formula: ''
      },
      {
        career: 'Teacher',
        emoji: '📚',
        scenario: 'Showing students how fractions are used daily.',
        connection: 'Connecting math concepts to real-life applications.',
        formula: ''
      }
    ]
  },
  {
    id: 'rw-science-ecosystem',
    subject: 'science',
    topic: 'Ecosystem',
    cards: [
      {
        career: 'Environmental Scientist',
        emoji: '🌿',
        scenario: 'Studying relationships between living things and their environment.',
        connection: 'Ecosystems show how everything is connected.',
        formula: ''
      },
      {
        career: 'Wildlife Biologist',
        emoji: '🦌',
        scenario: 'Tracking animal populations to keep ecosystems balanced.',
        connection: 'Using food chains and habitats in management.',
        formula: ''
      },
      {
        career: 'Park Ranger',
        emoji: '🎒',
        scenario: 'Protecting natural habitats and educating visitors.',
        connection: 'Understanding the balance of biotic and abiotic factors.',
        formula: ''
      },
      {
        career: 'Teacher',
        emoji: '📚',
        scenario: 'Explaining how ecosystems work and why they matter.',
        connection: 'Helping students relate science to the world around them.',
        formula: ''
      }
    ]
  },
  {
    id: 'rw-science-forces',
    subject: 'science',
    topic: 'Forces',
    cards: [
      {
        career: 'Mechanical Engineer',
        emoji: '🔧',
        scenario: 'Designing machines that apply forces to move parts.',
        connection: 'Uses physics of forces like friction and gravity.',
        formula: 'Force = mass × acceleration'
      },
      {
        career: 'Athletic Trainer',
        emoji: '🏃',
        scenario: 'Helping athletes improve strength and movement.',
        connection: 'Understanding forces acting on the body.',
        formula: ''
      },
      {
        career: 'Construction Worker',
        emoji: '🚧',
        scenario: 'Using force calculations to move materials safely.',
        connection: 'Applies physics concepts of force and resistance.',
        formula: ''
      },
      {
        career: 'Teacher',
        emoji: '📚',
        scenario: 'Demonstrating how forces affect everyday objects.',
        connection: 'Making physics understandable and relevant.',
        formula: ''
      }
    ]
  },
  {
    id: 'rw-science-chemical-reactions',
    subject: 'science',
    topic: 'Chemical Reactions',
    cards: [
      {
        career: 'Chemist',
        emoji: '⚗️',
        scenario: 'Mixing chemicals to create new substances.',
        connection: 'Understanding reactants and products.',
        formula: ''
      },
      {
        career: 'Pharmacologist',
        emoji: '💊',
        scenario: 'Creating medicines using chemical reactions.',
        connection: 'Applies chemical knowledge to develop drugs.',
        formula: ''
      },
      {
        career: 'Environmental Engineer',
        emoji: '🌎',
        scenario: 'Using reactions to treat pollution and waste.',
        connection: 'Designing processes based on chemical principles.',
        formula: ''
      },
      {
        career: 'Teacher',
        emoji: '📚',
        scenario: 'Teaching students the basics of chemistry.',
        connection: 'Helping learners see the science behind materials.',
        formula: ''
      }
    ]
  },
  {
    id: 'rw-spanish-verbs',
    subject: 'spanish',
    topic: 'Spanish Verbs',
    cards: [
      {
        career: 'Translator',
        emoji: '🌐',
        scenario: 'Converting messages between languages, needing verb tenses.',
        connection: 'Understanding conjugations is essential.',
        formula: ''
      },
      {
        career: 'Teacher',
        emoji: '📚',
        scenario: 'Explaining how verbs change based on subject and tense.',
        connection: 'Helping students master speaking and writing.',
        formula: ''
      },
      {
        career: 'Tour Guide',
        emoji: '🗺️',
        scenario: 'Using verbs to communicate with travelers.',
        connection: 'Effective communication depends on proper verb use.',
        formula: ''
      },
      {
        career: 'Writer',
        emoji: '✍️',
        scenario: 'Writing stories and articles in Spanish.',
        connection: 'Correct verb usage improves clarity.',
        formula: ''
      }
    ]
  }
];

if (typeof module !== 'undefined') { module.exports = { REAL_WORLD }; }
