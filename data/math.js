// ============================================================
//  Learn.edu — Math Lessons
//  Each lesson: intro → practice (5 problems) → quiz (3 problems)
// ============================================================

const MATH_LESSONS = [

  // ── GRADE 4 ─────────────────────────────────────────────

  {
    id: "math-4-multiplication",
    code: "4-MU-1A",
    grade: 4,
    subject: "math",
    topic: "Multiplication",
    title: "Multiplication Basics",
    subtitle: "Times tables and groups",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,  // paste a YouTube embed URL like "https://www.youtube.com/embed/VIDEO_ID"
      title: "What is Multiplication?",
      text: "Multiplication is a fast way to add the same number over and over. Instead of writing 4+4+4+4+4, you can say 5 × 4 = 20! Think of it like groups: 5 groups of 4 things. The × symbol means 'groups of'. Once you know your times tables, math becomes SO much faster — and way more fun."
    },
    practice: [
      { type: "fill",     q: "6 × 7 = ?",                                                                          answer: "42",  hint: "Think: 6 groups of 7" },
      { type: "fill",     q: "8 × 9 = ?",                                                                          answer: "72",  hint: "Try skip-counting by 8s: 8, 16, 24…" },
      { type: "multiple", q: "Which equals 5 × 6?",                                                                choices: ["25","30","35","11"],     answer: "30" },
      { type: "fill",     q: "12 × 4 = ?",                                                                         answer: "48",  hint: "Break it up: (10×4) + (2×4)" },
      { type: "multiple", q: "A box has 6 rows of 8 oranges. How many oranges are there in total?",                choices: ["14","42","48","56"],     answer: "48" }
    ],
    quiz: [
      { type: "multiple", q: "7 × 8 = ?",                                                                          choices: ["54","56","58","64"],     answer: "56" },
      { type: "fill",     q: "9 × 11 = ?",                                                                         answer: "99" },
      { type: "multiple", q: "There are 4 bags with 12 apples each. How many apples total?",                       choices: ["16","48","36","52"],     answer: "48" }
    ]
  },

  {
    id: "math-4-long-division",
    code: "4-LD-1A",
    grade: 4,
    subject: "math",
    topic: "Long Division",
    title: "Long Division",
    subtitle: "Splitting big numbers evenly",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "How Does Long Division Work?",
      text: "Division means splitting something into equal groups. Long division is a step-by-step method for bigger numbers. The secret? Just repeat 4 steps: 1) Divide  2) Multiply  3) Subtract  4) Bring Down. Then repeat until there's nothing left to bring down. Once you see the pattern, it just clicks!"
    },
    practice: [
      { type: "fill",     q: "56 ÷ 7 = ?",                                                                         answer: "8",   hint: "What times 7 equals 56?" },
      { type: "fill",     q: "72 ÷ 9 = ?",                                                                         answer: "8",   hint: "Think: 9 × ? = 72" },
      { type: "multiple", q: "84 ÷ 4 = ?",                                                                         choices: ["18","21","22","24"],     answer: "21" },
      { type: "fill",     q: "96 ÷ 8 = ?",                                                                         answer: "12",  hint: "How many 8s fit inside 96?" },
      { type: "multiple", q: "You have 75 candies to share equally among 5 friends. How many does each friend get?", choices: ["12","13","15","17"],     answer: "15" }
    ],
    quiz: [
      { type: "multiple", q: "132 ÷ 6 = ?",                                                                        choices: ["20","22","24","26"],     answer: "22" },
      { type: "fill",     q: "144 ÷ 12 = ?",                                                                        answer: "12" },
      { type: "multiple", q: "A farmer has 108 eggs packed 9 per box. How many boxes does he need?",               choices: ["10","11","12","13"],     answer: "12" }
    ]
  },

  // ── GRADE 5 ─────────────────────────────────────────────

  {
    id: "math-5-fractions-intro",
    code: "5-FR-1A",
    grade: 5,
    subject: "math",
    topic: "Fractions",
    title: "Introduction to Fractions",
    subtitle: "Parts of a whole",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "What is a Fraction?",
      text: "A fraction represents a part of a whole. The bottom number (denominator) tells you how many equal parts the whole is split into. The top number (numerator) says how many of those parts you have. So 3/4 means: split into 4 equal parts, take 3 of them. Think of a pizza sliced into 4 pieces — if you eat 3 slices, you ate 3/4 of the pizza! 🍕"
    },
    practice: [
      { type: "multiple", q: "In the fraction 3/5, what is the denominator?",                                      choices: ["3","5","2","8"],         answer: "5" },
      { type: "multiple", q: "A pizza is cut into 8 equal slices. You eat 3. What fraction did you eat?",          choices: ["3/5","5/8","3/8","8/3"], answer: "3/8" },
      { type: "multiple", q: "Which fraction is bigger: 1/2 or 1/4?",                                             choices: ["1/2","1/4","Equal","Can't tell"], answer: "1/2" },
      { type: "multiple", q: "What is 1/2 of 16?",                                                                 choices: ["4","6","8","10"],        answer: "8" },
      { type: "multiple", q: "Which fraction is closest to 1 whole?",                                             choices: ["1/8","3/4","2/10","1/3"], answer: "3/4" }
    ],
    quiz: [
      { type: "multiple", q: "A class has 20 students. 5 are absent. What fraction is absent?",                   choices: ["1/5","1/4","5/15","2/5"], answer: "1/4" },
      { type: "multiple", q: "Which two fractions are equal?",                                                     choices: ["1/2 and 2/3","2/4 and 1/2","3/4 and 2/3","1/3 and 2/5"], answer: "2/4 and 1/2" },
      { type: "multiple", q: "You have 3/4 of a chocolate bar. Your friend has 2/4. Who has more?",               choices: ["You","Your friend","Same amount","Can't tell"], answer: "You" }
    ]
  },

  {
    id: "math-5-decimals-intro",
    code: "5-DE-1A",
    grade: 5,
    subject: "math",
    topic: "Decimals",
    title: "Introduction to Decimals",
    subtitle: "Fractions made easier",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Decimals — It's Just Fractions in Disguise",
      text: "A decimal is another way to write a fraction. The dot (.) is called the decimal point. Digits to the left are whole numbers; digits to the right are parts. So 3.5 means '3 and a half'. Money is a perfect example: $1.75 means 1 dollar and 75/100 of a dollar. Once you see it that way, decimals are easy!"
    },
    practice: [
      { type: "multiple", q: "What does the digit 7 represent in 4.75?",                                          choices: ["7 ones","7 tenths","7 hundredths","70"], answer: "7 tenths" },
      { type: "multiple", q: "Which is larger: 0.8 or 0.75?",                                                     choices: ["0.8","0.75","They're equal","Can't tell"], answer: "0.8" },
      { type: "fill",     q: "Write 'three and four tenths' as a decimal.",                                        answer: "3.4",  hint: "Tenths go right after the decimal point" },
      { type: "multiple", q: "0.5 is the same as which fraction?",                                                choices: ["1/4","1/5","1/2","1/3"],  answer: "1/2" },
      { type: "fill",     q: "2.3 + 1.5 = ?",                                                                     answer: "3.8",  hint: "Line up the decimal points and add!" }
    ],
    quiz: [
      { type: "multiple", q: "Which number is between 1.2 and 1.4?",                                              choices: ["1.1","1.3","1.5","1.6"],  answer: "1.3" },
      { type: "fill",     q: "4.7 − 2.3 = ?",                                                                     answer: "2.4" },
      { type: "multiple", q: "A pencil costs $0.75 and an eraser costs $0.50. Total cost?",                       choices: ["$1.00","$1.25","$1.50","$0.25"], answer: "$1.25" }
    ]
  },

  // ── GRADE 4 (continued) ─────────────────────────────────

  {
    id: "math-4-geometry",
    code: "4-GE-1A",
    grade: 4,
    subject: "math",
    topic: "Geometry",
    title: "Shapes & Geometry",
    subtitle: "Area, perimeter & 2D shapes",
    duration: "9 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Geometry Is Everywhere!",
      text: "Geometry is the math of shapes, sizes, and spaces. You use it every time you measure a room, cut a cake, or build something. Two key measurements: Perimeter = the distance around a shape (add all sides). Area = how much space is inside (length x width for rectangles). Once you know these, you can figure out how much carpet a room needs, how much fence a yard needs — real-world stuff!"
    },
    practice: [
      { type: "multiple", q: "A rectangle is 5 cm long and 3 cm wide. What is its perimeter?",                    choices: ["8 cm","15 cm","16 cm","10 cm"],    answer: "16 cm" },
      { type: "multiple", q: "A square has sides of 7 cm. What is its area?",                                    choices: ["14 sq cm","28 sq cm","49 sq cm","21 sq cm"], answer: "49 sq cm" },
      { type: "fill",     q: "A rectangle is 8 cm long and 4 cm wide. What is its area?",                        answer: "32",  hint: "Area = Length x Width" },
      { type: "multiple", q: "How many sides does a hexagon have?",                                              choices: ["5","6","7","8"],                    answer: "6" },
      { type: "multiple", q: "Which shape has exactly 4 equal sides AND 4 right angles?",                       choices: ["Rectangle","Rhombus","Square","Parallelogram"], answer: "Square" }
    ],
    quiz: [
      { type: "multiple", q: "A room is 10 ft long and 8 ft wide. How much carpet (area) do you need?",          choices: ["36 sq ft","40 sq ft","80 sq ft","18 sq ft"], answer: "80 sq ft" },
      { type: "fill",     q: "A triangle has three sides: 5 cm, 7 cm, and 6 cm. What is the perimeter?",        answer: "18",  hint: "Add all three sides" },
      { type: "multiple", q: "Which is NOT a polygon?",                                                         choices: ["Triangle","Circle","Pentagon","Hexagon"], answer: "Circle" }
    ]
  },

  // ── GRADE 5 (continued) ─────────────────────────────────

  {
    id: "math-5-percentages",
    code: "5-PC-1A",
    grade: 5,
    subject: "math",
    topic: "Percentages",
    title: "Percentages",
    subtitle: "Parts out of 100",
    duration: "8 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Percent -- Always Out of 100!",
      text: "Percent means 'per hundred' -- it's always out of 100. So 50% means 50 out of 100, which is the same as 1/2. You see percentages every day: a 25% off sale, a 90% test score, 10% tip at a restaurant. To find a percent of a number: turn the percent into a decimal (divide by 100), then multiply. Example: 20% of 80 = 0.20 x 80 = 16. Easy!"
    },
    practice: [
      { type: "multiple", q: "What is 50% of 80?",                                                               choices: ["20","30","40","50"],            answer: "40" },
      { type: "multiple", q: "A shirt costs $40. It is 25% off. How much do you save?",                          choices: ["$5","$8","$10","$15"],          answer: "$10" },
      { type: "fill",     q: "What is 10% of 150?",                                                              answer: "15",  hint: "Move the decimal one place left" },
      { type: "multiple", q: "You got 18 out of 20 correct on a test. What percentage is that?",                choices: ["80%","85%","90%","95%"],        answer: "90%" },
      { type: "multiple", q: "Which is bigger: 30% of 200 or 60% of 100?",                                      choices: ["30% of 200","60% of 100","They're equal","Can't tell"], answer: "They're equal" }
    ],
    quiz: [
      { type: "multiple", q: "A game was originally $60 and is now 15% off. What is the sale price?",            choices: ["$45","$48","$51","$54"],        answer: "$51" },
      { type: "fill",     q: "What is 75% of 200?",                                                              answer: "150",  hint: "75% = 0.75, then multiply" },
      { type: "multiple", q: "If 40% of students passed a test and there are 30 students, how many passed?",    choices: ["10","12","14","16"],            answer: "12" }
    ]
  },

  // ── GRADE 6 ─────────────────────────────────────────────

  {
    id: "math-6-ratios",
    code: "6-RA-1A",
    grade: 6,
    subject: "math",
    topic: "Ratios",
    title: "Ratios & Rates",
    subtitle: "Comparing quantities",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What is a Ratio?",
      text: "A ratio compares two quantities. If there are 3 cats and 5 dogs, the ratio of cats to dogs is 3:5 (read: '3 to 5'). You can also write it as 3/5 or '3 out of 5'. Ratios are everywhere — in recipes, maps, sports stats, and even mixing paint colors. A rate is a special ratio comparing different units, like 60 miles per hour."
    },
    practice: [
      { type: "multiple", q: "A bag has 4 red marbles and 6 blue marbles. What is the ratio of red to blue?",     choices: ["4:10","6:4","4:6","2:3"],  answer: "4:6" },
      { type: "multiple", q: "Which ratio is equivalent to 2:3?",                                                 choices: ["4:5","4:6","6:9","3:2"],   answer: "6:9" },
      { type: "fill",     q: "A car travels 150 miles in 3 hours. What is its speed in miles per hour?",          answer: "50",  hint: "Speed = Distance ÷ Time" },
      { type: "multiple", q: "In a class of 30 students, 12 are boys. What is the ratio of girls to total?",     choices: ["12:30","18:30","12:18","18:12"], answer: "18:30" },
      { type: "multiple", q: "If 5 pens cost $3.50, how much do 10 pens cost?",                                   choices: ["$5.00","$6.00","$7.00","$8.00"], answer: "$7.00" }
    ],
    quiz: [
      { type: "multiple", q: "Simplify the ratio 12:16.",                                                         choices: ["6:8","3:4","4:3","2:3"],   answer: "3:4" },
      { type: "fill",     q: "A recipe uses 2 cups of flour for every 3 cups of water. To make a bigger batch with 9 cups of water, how many cups of flour are needed?", answer: "6", hint: "Set up the proportion: 2/3 = ?/9" },
      { type: "multiple", q: "Which is the better deal: 4 apples for $2 or 6 apples for $2.70?",                 choices: ["4 for $2","6 for $2.70","Same price","Can't tell"], answer: "6 for $2.70" }
    ]
  },

  {
    id: "math-6-integers",
    code: "6-IN-1A",
    grade: 6,
    subject: "math",
    topic: "Integers",
    title: "Integers & Negative Numbers",
    subtitle: "Numbers below zero",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Below Zero -- Negative Numbers!",
      text: "Integers include all whole numbers AND their negatives: ...-3, -2, -1, 0, 1, 2, 3... Negative numbers are used all the time: temperature below freezing, debt, underground floors, golf scores. On a number line, negatives go left, positives go right. A key rule: subtracting a negative is the same as adding! So 5 - (-3) = 5 + 3 = 8. Mind-bending at first, totally logical once it clicks!"
    },
    practice: [
      { type: "multiple", q: "What is -4 + 7?",                                                                   choices: ["-11","-3","3","11"],           answer: "3" },
      { type: "multiple", q: "Which number is smaller: -8 or -2?",                                               choices: ["-2","-8","They're equal","Can't tell"], answer: "-8" },
      { type: "fill",     q: "10 - (-3) = ?",                                                                    answer: "13",  hint: "Subtracting a negative = adding" },
      { type: "multiple", q: "The temperature is -5 degrees. It rises 9 degrees. What is the new temp?",         choices: ["-14","-4","4","14"],           answer: "4" },
      { type: "multiple", q: "What is -6 x -4?",                                                                  choices: ["-24","-10","10","24"],          answer: "24" }
    ],
    quiz: [
      { type: "multiple", q: "What is -15 + 9?",                                                                  choices: ["-24","-6","6","24"],            answer: "-6" },
      { type: "fill",     q: "-3 - 5 = ?",                                                                       answer: "-8",  hint: "Both pull in the negative direction" },
      { type: "multiple", q: "Order from least to greatest: 4, -1, 0, -6, 2",                                    choices: ["-1, -6, 0, 2, 4","-6, -1, 0, 2, 4","0, -1, -6, 2, 4","4, 2, 0, -1, -6"], answer: "-6, -1, 0, 2, 4" }
    ]
  },

  // ── GRADE 7 ─────────────────────────────────────────────

  {
    id: "math-7-algebra-intro",
    code: "7-AL-1A",
    grade: 7,
    subject: "math",
    topic: "Algebra",
    title: "Algebra Introduction",
    subtitle: "Variables, expressions & equations",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Welcome to Algebra!",
      text: "Algebra is like a puzzle. Instead of all numbers, some are replaced with letters (called variables) like x or y. A variable holds an unknown value. An expression is a math phrase like 3x + 5. An equation says two things are equal: 3x + 5 = 20. Your job: find what x must be for the equation to be true! Algebra shows up in coding, engineering, science, and business -- it's the language of logic."
    },
    practice: [
      { type: "multiple", q: "What does 'variable' mean in algebra?",                                            choices: ["A fixed number","A letter holding an unknown value","A type of equation","An answer"], answer: "A letter holding an unknown value" },
      { type: "multiple", q: "Solve for x: x + 5 = 12",                                                         choices: ["5","6","7","8"],               answer: "7" },
      { type: "fill",     q: "Solve: 3x = 21",                                                                   answer: "7",   hint: "Divide both sides by 3" },
      { type: "multiple", q: "Simplify: 4x + 2x",                                                               choices: ["6","6x","8x","4x2"],           answer: "6x" },
      { type: "multiple", q: "Solve for y: y - 8 = 15",                                                         choices: ["7","13","23","17"],             answer: "23" }
    ],
    quiz: [
      { type: "multiple", q: "If 2x + 3 = 11, what is x?",                                                      choices: ["3","4","5","6"],               answer: "4" },
      { type: "fill",     q: "Solve: 5x - 10 = 20",                                                             answer: "6",   hint: "Add 10 to both sides, then divide by 5" },
      { type: "multiple", q: "A number is tripled and then 4 is subtracted to get 11. What is the number?",     choices: ["3","4","5","6"],               answer: "5" }
    ]
  },

  // ── GRADE 8 ─────────────────────────────────────────────

  {
    id: "math-8-linear-equations",
    code: "8-LE-1A",
    grade: 8,
    subject: "math",
    topic: "Linear Equations",
    title: "Linear Equations & Slope",
    subtitle: "Lines, slope & y-intercept",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Lines on a Graph",
      text: "A linear equation makes a straight line when graphed. The most useful form is y = mx + b, where m is the slope (how steep the line is) and b is the y-intercept (where the line crosses the y-axis). Slope = rise / run = how much y changes when x goes up by 1. If slope is 2, every step right goes 2 steps up. This is used in science graphs, economics, speed charts, and so much more."
    },
    practice: [
      { type: "multiple", q: "In y = 3x + 2, what is the slope?",                                               choices: ["2","3","x","y"],               answer: "3" },
      { type: "multiple", q: "In y = 3x + 2, what is the y-intercept?",                                         choices: ["-3","-2","2","3"],             answer: "2" },
      { type: "fill",     q: "If y = 2x + 1, what is y when x = 4?",                                            answer: "9",   hint: "Plug in 4 for x" },
      { type: "multiple", q: "A line rises 6 units and runs 3 units. What is the slope?",                        choices: ["0.5","1","2","3"],             answer: "2" },
      { type: "multiple", q: "Which equation represents a line with slope 0?",                                  choices: ["y = 3x","y = x + 5","y = 7","x = 4"], answer: "y = 7" }
    ],
    quiz: [
      { type: "multiple", q: "What is the slope of a line passing through (0,0) and (3,6)?",                     choices: ["0.5","1","2","3"],             answer: "2" },
      { type: "fill",     q: "For y = 5x - 3, find y when x = 2",                                               answer: "7",   hint: "5(2) - 3" },
      { type: "multiple", q: "Two lines are parallel if they have the same...",                                  choices: ["y-intercept","slope","x value","length"], answer: "slope" }
    ]
  },

  // ── GRADE 9 ─────────────────────────────────────────────

  {
    id: "math-9-quadratics",
    code: "9-QU-1A",
    grade: 9,
    subject: "math",
    topic: "Quadratics",
    title: "Quadratic Equations",
    subtitle: "Parabolas, factoring & the quadratic formula",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Quadratics -- The Curve of Nature!",
      text: "A quadratic equation has the form ax² + bx + c = 0. When graphed, it makes a U-shaped curve called a parabola. Solutions are called roots or zeros -- where the parabola crosses the x-axis. Three solving methods: 1) Factoring -- rewrite as (x + p)(x + q) = 0, then solve each factor. 2) Quadratic Formula -- x = (-b ± sqrt(b²-4ac)) / 2a (always works!). 3) Completing the Square. Quadratics model real-world things: the path of a thrown ball, the shape of a satellite dish, and profit/loss curves in business."
    },
    practice: [
      { type: "multiple", q: "What shape does a quadratic equation make when graphed?",                          choices: ["Straight line","Circle","Parabola","Hyperbola"], answer: "Parabola" },
      { type: "multiple", q: "What are the solutions to x² - 5x + 6 = 0?",                                    choices: ["x=1 and x=6","x=2 and x=3","x=-2 and x=-3","x=5 and x=1"], answer: "x=2 and x=3" },
      { type: "multiple", q: "In the quadratic formula, the 'discriminant' is b²-4ac. If it equals 0, there is/are...", choices: ["No real solutions","One real solution","Two distinct real solutions","Infinite solutions"], answer: "One real solution" },
      { type: "multiple", q: "For the equation 2x² + 3x - 5 = 0, what is 'a'?",                               choices: ["3","-5","2","5"], answer: "2" },
      { type: "multiple", q: "Which is a correct factoring of x² + 7x + 12?",                                 choices: ["(x+3)(x+4)","(x+2)(x+6)","(x+1)(x+12)","(x+7)(x+1)"], answer: "(x+3)(x+4)" }
    ],
    quiz: [
      { type: "multiple", q: "Use the quadratic formula to solve x² - 4x + 3 = 0. What are the solutions?",     choices: ["x=1 and x=3","x=-1 and x=-3","x=2 and x=2","x=4 and x=0"], answer: "x=1 and x=3" },
      { type: "fill",     q: "What is the vertex x-coordinate of y = x² - 6x + 9?",                            answer: "3",  hint: "x = -b/(2a) = -(-6)/(2×1)" },
      { type: "multiple", q: "A ball is thrown upward. Its height follows h = -5t² + 20t. When does it hit the ground (h=0, t>0)?", choices: ["t=1","t=2","t=4","t=5"], answer: "t=4" }
    ]
  },

  {
    id: "math-9-systems",
    code: "9-SY-1A",
    grade: 9,
    subject: "math",
    topic: "Systems of Equations",
    title: "Systems of Equations",
    subtitle: "Solving two equations simultaneously",
    duration: "11 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Two Equations, Two Unknowns!",
      text: "A system of equations is two or more equations with the same variables. You need to find values that satisfy BOTH equations at once. Three methods: 1) Graphing -- find the intersection point. 2) Substitution -- solve one equation for a variable, plug into the other. 3) Elimination -- add or subtract equations to cancel a variable. Systems are used everywhere: finding break-even points in business, mixing solutions in chemistry, or finding when two objects meet in physics."
    },
    practice: [
      { type: "multiple", q: "What does a 'solution' to a system of equations mean?",                          choices: ["A value that satisfies the first equation only","A value that satisfies both equations simultaneously","The slope of both lines","The y-intercept"], answer: "A value that satisfies both equations simultaneously" },
      { type: "multiple", q: "If two lines are parallel, the system has...",                                   choices: ["One solution","Infinite solutions","No solution","Two solutions"], answer: "No solution" },
      { type: "multiple", q: "Using substitution: y = 2x and x + y = 9. What is x?",                          choices: ["2","3","4","6"], answer: "3" },
      { type: "multiple", q: "Using elimination on: x+y=10 and x-y=4. What is x?",                            choices: ["3","5","7","10"], answer: "7" },
      { type: "multiple", q: "Two lines intersect at (3, -1). This means the system has...",                   choices: ["No solution","The unique solution x=3, y=-1","Infinite solutions","Two solutions"], answer: "The unique solution x=3, y=-1" }
    ],
    quiz: [
      { type: "multiple", q: "Solve: 2x + y = 7 and x - y = 2. What is x?",                                  choices: ["1","2","3","4"], answer: "3" },
      { type: "fill",     q: "If x = 3 and 2x + y = 7, what is y?",                                           answer: "1",  hint: "Substitute x=3 into 2(3)+y=7" },
      { type: "multiple", q: "A business breaks even when revenue = cost. If revenue = 5x and cost = 3x+20, at what quantity x do they break even?", choices: ["5","10","15","20"], answer: "10" }
    ]
  },


  // ── GRADE 4 (more) ─────────────────────────────────────

  {
    id: "math-4-order-ops",
    code: "4-OO-1A",
    grade: 4,
    subject: "math",
    topic: "Order of Operations",
    title: "Order of Operations",
    subtitle: "PEMDAS — which step goes first?",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Do Math in the Right Order!",
      text: "When a problem has multiple operations, the order matters! PEMDAS tells you the sequence: Parentheses first, then Exponents, then Multiplication and Division (left to right), then Addition and Subtraction (left to right). Without this rule, everyone would get different answers. Example: 2 + 3 × 4 = 14 (NOT 20), because we multiply before we add. Always follow PEMDAS!"
    },
    practice: [
      { type: "multiple", q: "What does PEMDAS stand for?",                                                      choices: ["Parentheses, Exponents, Multiply, Divide, Add, Subtract","Plus, Equals, Minus, Divide, Add, Sum","Parentheses, Equations, Multiply, Division, All, Subtract","Positive, Equal, Multiply, Double, Add, Solve"], answer: "Parentheses, Exponents, Multiply, Divide, Add, Subtract" },
      { type: "multiple", q: "What is 10 + 2 × 5?",                                                              choices: ["60","20","30","12"], answer: "20" },
      { type: "fill",     q: "(3 + 5) × 2 = ?",                                                                  answer: "16", hint: "Do parentheses first: 3+5=8, then 8×2" },
      { type: "multiple", q: "What is 24 ÷ (4 + 2)?",                                                            choices: ["10","4","6","8"], answer: "4" },
      { type: "multiple", q: "8 - 2 + 3 × 4 = ?",                                                               choices: ["36","18","18","18"], answer: "18" }
    ],
    quiz: [
      { type: "multiple", q: "What is 5 × (2 + 3) - 4?",                                                        choices: ["21","9","25","16"], answer: "21" },
      { type: "fill",     q: "12 ÷ 4 + 2 × 3 = ?",                                                              answer: "9", hint: "Divide first, then multiply, then add" },
      { type: "multiple", q: "Which step comes FIRST in PEMDAS?",                                                choices: ["Addition","Multiplication","Exponents","Parentheses"], answer: "Parentheses" }
    ]
  },

  {
    id: "math-4-measurement",
    code: "4-ME-1A",
    grade: 4,
    subject: "math",
    topic: "Measurement",
    title: "Measurement & Units",
    subtitle: "Length, weight & capacity",
    duration: "8 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Measure Everything!",
      text: "Measurement is how we describe how big, heavy, or full something is. In the US we use customary units (inches, feet, pounds, gallons). The metric system uses meters, kilograms, liters — and everything is based on 10s, making conversions easy! Key conversions: 12 inches = 1 foot, 3 feet = 1 yard, 5280 feet = 1 mile. 100 centimeters = 1 meter. Scientists worldwide use metric — it's worth learning both!"
    },
    practice: [
      { type: "multiple", q: "How many inches are in 1 foot?",                                                   choices: ["10","12","16","8"], answer: "12" },
      { type: "multiple", q: "Which unit would you use to measure the weight of a car?",                         choices: ["Ounces","Pounds","Tons","Grams"], answer: "Tons" },
      { type: "fill",     q: "How many feet are in 2 yards?",                                                    answer: "6", hint: "1 yard = 3 feet, so 2 yards = ?" },
      { type: "multiple", q: "100 centimeters equals how many meters?",                                          choices: ["10","100","1000","1"], answer: "1" },
      { type: "multiple", q: "Which is the best unit to measure the length of a pencil?",                       choices: ["Miles","Feet","Inches","Yards"], answer: "Inches" }
    ],
    quiz: [
      { type: "fill",     q: "A rope is 5 feet long. How many inches is that?",                                  answer: "60", hint: "12 inches per foot × 5" },
      { type: "multiple", q: "1 kilometer equals how many meters?",                                              choices: ["10","100","1000","10000"], answer: "1000" },
      { type: "multiple", q: "You need to measure how much water a bathtub holds. Which unit makes most sense?", choices: ["Inches","Pounds","Gallons","Feet"], answer: "Gallons" }
    ]
  },

  // ── GRADE 5 (more) ─────────────────────────────────────

  {
    id: "math-5-mixed-numbers",
    code: "5-MN-1A",
    grade: 5,
    subject: "math",
    topic: "Mixed Numbers",
    title: "Mixed Numbers & Improper Fractions",
    subtitle: "Whole numbers + fractions together",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "When Fractions and Whole Numbers Mix!",
      text: "A mixed number combines a whole number and a fraction, like 2 3/4 (two and three-quarters). An improper fraction has a numerator bigger than its denominator, like 11/4. You can convert between them: 2 3/4 = (2×4+3)/4 = 11/4. To convert the other way: divide numerator by denominator, the quotient is the whole number and the remainder becomes the new numerator. These come up constantly in cooking, carpentry, and everyday math!"
    },
    practice: [
      { type: "multiple", q: "Convert 2 1/3 to an improper fraction.",                                           choices: ["5/3","7/3","6/3","3/7"], answer: "7/3" },
      { type: "multiple", q: "Convert 9/4 to a mixed number.",                                                   choices: ["2 1/4","3 1/4","2 3/4","1 3/4"], answer: "2 1/4" },
      { type: "fill",     q: "What is 1 2/5 as an improper fraction?",                                           answer: "7/5", hint: "1×5 + 2 = 7, keep denominator 5" },
      { type: "multiple", q: "Which mixed number equals 15/4?",                                                  choices: ["3 3/4","4 1/4","3 1/4","4 3/4"], answer: "3 3/4" },
      { type: "multiple", q: "A recipe needs 1 3/4 cups of flour. You double it. How much flour?",               choices: ["2 1/2 cups","3 cups","3 1/2 cups","2 3/4 cups"], answer: "3 1/2 cups" }
    ],
    quiz: [
      { type: "multiple", q: "What is 17/5 as a mixed number?",                                                  choices: ["3 1/5","3 2/5","2 3/5","4 1/5"], answer: "3 2/5" },
      { type: "fill",     q: "Convert 4 3/8 to an improper fraction.",                                           answer: "35/8", hint: "4×8 + 3 = 35" },
      { type: "multiple", q: "Which is the largest? 2 3/4, 11/4, 8/3",                                          choices: ["2 3/4","11/4","8/3","They are equal"], answer: "2 3/4" }
    ]
  },

  {
    id: "math-5-add-fractions",
    code: "5-AF-1A",
    grade: 5,
    subject: "math",
    topic: "Adding Fractions",
    title: "Adding & Subtracting Fractions",
    subtitle: "Same and different denominators",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Combining Parts of a Whole!",
      text: "Adding fractions is easy when the denominators (bottom numbers) are the same: just add the numerators! 1/5 + 2/5 = 3/5. When denominators differ, you must first find the Least Common Denominator (LCD): the smallest number both denominators divide into evenly. Then convert each fraction to an equivalent fraction with that denominator, and add. Example: 1/2 + 1/3 — LCD is 6 → 3/6 + 2/6 = 5/6."
    },
    practice: [
      { type: "fill",     q: "1/4 + 2/4 = ?",                                                                   answer: "3/4", hint: "Same denominator — just add numerators" },
      { type: "multiple", q: "1/2 + 1/3 = ?",                                                                   choices: ["2/5","2/6","5/6","3/6"], answer: "5/6" },
      { type: "multiple", q: "What is the LCD of 1/4 and 1/6?",                                                  choices: ["8","10","12","24"], answer: "12" },
      { type: "fill",     q: "3/5 - 1/5 = ?",                                                                   answer: "2/5", hint: "Same denominator — subtract numerators" },
      { type: "multiple", q: "3/4 - 1/3 = ?",                                                                   choices: ["5/12","2/7","2/3","4/12"], answer: "5/12" }
    ],
    quiz: [
      { type: "multiple", q: "2/3 + 1/4 = ?",                                                                   choices: ["3/7","8/12","11/12","10/12"], answer: "11/12" },
      { type: "fill",     q: "5/6 - 1/4 = ?",                                                                   answer: "7/12", hint: "LCD of 6 and 4 is 12" },
      { type: "multiple", q: "You ate 1/3 of a pizza and your friend ate 2/5. What fraction was eaten total?",   choices: ["3/8","10/15","11/15","3/15"], answer: "11/15" }
    ]
  },

  // ── GRADE 6 (more) ─────────────────────────────────────

  {
    id: "math-6-probability",
    code: "6-PB-1A",
    grade: 6,
    subject: "math",
    topic: "Probability",
    title: "Introduction to Probability",
    subtitle: "Chances, outcomes & events",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What Are the Chances?",
      text: "Probability measures how likely an event is to happen. It is expressed as a number between 0 (impossible) and 1 (certain), or as a percentage. Formula: Probability = Favorable Outcomes ÷ Total Outcomes. If you flip a fair coin, the chance of heads is 1/2 = 0.5 = 50%. A standard die has 6 sides — the probability of rolling a 4 is 1/6. Probability is used everywhere: weather forecasts, card games, medical testing, and insurance!"
    },
    practice: [
      { type: "multiple", q: "A bag has 3 red and 7 blue marbles. P(red) = ?",                                   choices: ["3/10","7/10","1/3","3/7"], answer: "3/10" },
      { type: "multiple", q: "What is the probability of rolling an even number on a 6-sided die?",             choices: ["1/6","2/6","3/6","4/6"], answer: "3/6" },
      { type: "fill",     q: "A spinner has 5 equal sections (1-5). P(landing on 3) = ?",                       answer: "1/5", hint: "1 favorable out of 5 total" },
      { type: "multiple", q: "An event with probability 0 is...",                                                choices: ["Certain","Likely","Unlikely","Impossible"], answer: "Impossible" },
      { type: "multiple", q: "You flip a coin twice. How many total outcomes are there?",                        choices: ["2","4","6","8"], answer: "4" }
    ],
    quiz: [
      { type: "multiple", q: "A class has 12 boys and 18 girls. P(randomly picking a girl) = ?",                choices: ["2/5","3/5","12/18","12/30"], answer: "3/5" },
      { type: "fill",     q: "If P(rain tomorrow) = 0.7, what is P(no rain tomorrow)?",                         answer: "0.3", hint: "All probabilities must sum to 1" },
      { type: "multiple", q: "Which event has probability closest to 1?",                                        choices: ["Rolling a 7 on a 6-sided die","Flipping heads","Drawing any card from a deck","Sun rising tomorrow"], answer: "Sun rising tomorrow" }
    ]
  },

  {
    id: "math-6-statistics",
    code: "6-ST-1A",
    grade: 6,
    subject: "math",
    topic: "Statistics",
    title: "Statistics — Mean, Median & Mode",
    subtitle: "Understanding data with averages",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Make Sense of Any Dataset!",
      text: "Statistics helps us summarize large amounts of data. Three key measures of center: Mean (average) — add all values and divide by how many. Median — the middle value when data is sorted. Mode — the value that appears most often. Range = largest minus smallest. These are used everywhere: test score reports, sports stats, weather averages, and business analysis. Knowing which measure to use depends on the data!"
    },
    practice: [
      { type: "multiple", q: "Find the mean of: 4, 8, 6, 2, 10",                                                choices: ["5","6","7","8"], answer: "6" },
      { type: "multiple", q: "Find the median of: 3, 7, 1, 9, 5",                                               choices: ["3","5","7","1"], answer: "5" },
      { type: "multiple", q: "Find the mode of: 2, 4, 4, 6, 7, 4, 9",                                          choices: ["2","4","6","7"], answer: "4" },
      { type: "fill",     q: "What is the range of: 15, 22, 8, 31, 14?",                                        answer: "23", hint: "Range = largest - smallest = 31 - 8" },
      { type: "multiple", q: "A student scored: 80, 95, 70, 90, 85. What is the mean score?",                   choices: ["82","84","85","88"], answer: "84" }
    ],
    quiz: [
      { type: "multiple", q: "Which measure is BEST to describe typical income in a city where a few billionaires skew the data?", choices: ["Mean","Median","Mode","Range"], answer: "Median" },
      { type: "fill",     q: "Find the median of: 12, 5, 7, 18, 9, 3",                                          answer: "8", hint: "Sort: 3,5,7,9,12,18 — average of 7 and 9" },
      { type: "multiple", q: "If you add a very high outlier value to a dataset, which measure is MOST affected?", choices: ["Median","Mode","Mean","They are all equally affected"], answer: "Mean" }
    ]
  },

  {
    id: "math-6-expressions",
    code: "6-EX-1A",
    grade: 6,
    subject: "math",
    topic: "Expressions",
    title: "Expressions & Variables",
    subtitle: "Writing and evaluating algebraic expressions",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The Language of Algebra!",
      text: "An algebraic expression uses numbers, variables (letters like x or n), and operations — but NO equals sign. Examples: 3x + 5, 2n - 7, 4(a + b). To evaluate an expression, plug in the value of the variable. If x = 3, then 3x + 5 = 3(3) + 5 = 14. A term is a single part of an expression (3x is one term, 5 is another). Like terms have the same variable part and can be combined: 3x + 2x = 5x."
    },
    practice: [
      { type: "multiple", q: "Evaluate 4x + 3 when x = 5",                                                      choices: ["22","23","28","32"], answer: "23" },
      { type: "multiple", q: "Simplify: 6y - 2y",                                                               choices: ["4","4y","8y","3y"], answer: "4y" },
      { type: "fill",     q: "Evaluate 2a - b when a = 6 and b = 4",                                            answer: "8", hint: "2(6) - 4 = 12 - 4" },
      { type: "multiple", q: "Which is an algebraic expression (not an equation)?",                             choices: ["x + 5 = 8","3n + 7","y = 2x","4 = 4"], answer: "3n + 7" },
      { type: "multiple", q: "Simplify: 3m + 2n + 5m - n",                                                      choices: ["10mn","8m + n","8m + 3n","8m + 2n"], answer: "8m + n" }
    ],
    quiz: [
      { type: "fill",     q: "Evaluate 3(x + 2) - 4 when x = 3",                                               answer: "11", hint: "3(3+2) = 3×5 = 15, then 15-4" },
      { type: "multiple", q: "Which expression means 'five more than twice a number n'?",                        choices: ["5 + n × 2","2n + 5","5n + 2","n + 5 × 2"], answer: "2n + 5" },
      { type: "multiple", q: "If the expression 4k represents the total cost of k items at $4 each, what does it equal when k = 7?", choices: ["$11","$28","$47","$74"], answer: "$28" }
    ]
  },

  // ── GRADE 7 (more) ─────────────────────────────────────

  {
    id: "math-7-proportional",
    code: "7-PR-1A",
    grade: 7,
    subject: "math",
    topic: "Proportional Relationships",
    title: "Proportional Relationships",
    subtitle: "Unit rates, proportions & scale",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Everything Scales — Proportional Thinking!",
      text: "Two quantities are proportional if their ratio stays constant. The equation is y = kx, where k is the constant of proportionality (unit rate). If you earn $15 per hour, your pay y = 15x (x = hours). Proportional relationships graph as straight lines through the origin. Cross-multiplication solves proportions: if 3/4 = x/20, then 3 × 20 = 4 × x, so x = 15. Used in maps, recipes, speed, pricing, and science!"
    },
    practice: [
      { type: "multiple", q: "If 5 items cost $20, what is the unit price?",                                    choices: ["$3","$4","$5","$10"], answer: "$4" },
      { type: "fill",     q: "Solve the proportion: 3/5 = x/25",                                               answer: "15", hint: "Cross multiply: 3×25 = 5×x" },
      { type: "multiple", q: "A map scale is 1 inch = 50 miles. Two cities are 3.5 inches apart. How far are they?", choices: ["53.5 miles","175 miles","150 miles","200 miles"], answer: "175 miles" },
      { type: "multiple", q: "Which table shows a proportional relationship?",                                   choices: ["x:1,2,3  y:3,5,7","x:1,2,3  y:4,8,12","x:1,2,3  y:2,5,10","x:1,2,3  y:1,3,6"], answer: "x:1,2,3  y:4,8,12" },
      { type: "multiple", q: "The constant of proportionality in y = 7x is...",                                 choices: ["x","y","7","1/7"], answer: "7" }
    ],
    quiz: [
      { type: "multiple", q: "A car travels 300 miles in 5 hours. At that rate, how far in 8 hours?",           choices: ["420 miles","450 miles","480 miles","500 miles"], answer: "480 miles" },
      { type: "fill",     q: "If 8 cans cost $3.20, how much do 12 cans cost?",                                 answer: "4.80", hint: "Unit cost = $3.20÷8 = $0.40 per can" },
      { type: "multiple", q: "A proportional graph always passes through which point?",                         choices: ["(1,1)","(0,0)","(1,0)","(0,1)"], answer: "(0,0)" }
    ]
  },

  {
    id: "math-7-geometry",
    code: "7-GE-1A",
    grade: 7,
    subject: "math",
    topic: "Geometry",
    title: "Area, Surface Area & Volume",
    subtitle: "2D and 3D measurement",
    duration: "11 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Measuring 2D and 3D Shapes!",
      text: "Area measures 2D space (square units). Volume measures 3D space (cubic units). Key formulas: Rectangle area = l × w. Triangle area = ½ × base × height. Circle area = π × r². Rectangular prism volume = l × w × h. Cylinder volume = π × r² × h. Surface area = the total area of all faces. These skills are essential for architecture, engineering, packaging design, and everyday problem-solving."
    },
    practice: [
      { type: "multiple", q: "What is the area of a triangle with base 10 cm and height 6 cm?",                choices: ["30 sq cm","60 sq cm","16 sq cm","30 cm"], answer: "30 sq cm" },
      { type: "fill",     q: "What is the volume of a box that is 4 cm × 3 cm × 5 cm?",                        answer: "60", hint: "V = length × width × height" },
      { type: "multiple", q: "A circle has radius 7 cm. Its area is approximately (use π ≈ 3.14)...",           choices: ["21.98 sq cm","43.96 sq cm","153.86 sq cm","87.92 sq cm"], answer: "153.86 sq cm" },
      { type: "multiple", q: "The surface area of a rectangular prism counts...",                               choices: ["Just the top and bottom","All 6 faces","Only the 4 sides","Just the biggest face"], answer: "All 6 faces" },
      { type: "fill",     q: "What is the area of a circle with radius 5? (π ≈ 3.14)",                         answer: "78.5", hint: "π × r² = 3.14 × 25" }
    ],
    quiz: [
      { type: "multiple", q: "A cylinder has radius 3 cm and height 10 cm. Its volume is approximately...",     choices: ["94.2 cu cm","282.6 cu cm","188.4 cu cm","900 cu cm"], answer: "282.6 cu cm" },
      { type: "fill",     q: "Find the surface area of a cube with sides of 4 cm.",                             answer: "96", hint: "6 faces × (4×4) each" },
      { type: "multiple", q: "Which shape has the formula V = ⅓ × base area × height?",                        choices: ["Cylinder","Rectangular prism","Cone/Pyramid","Sphere"], answer: "Cone/Pyramid" }
    ]
  },

  {
    id: "math-7-statistics",
    code: "7-DS-1A",
    grade: 7,
    subject: "math",
    topic: "Statistics",
    title: "Data & Statistics — Advanced",
    subtitle: "Box plots, histograms & variability",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Visualize and Interpret Data!",
      text: "Beyond mean and median, we can describe data using measures of variability. Interquartile Range (IQR) = Q3 - Q1 (the spread of the middle 50% of data). A box plot (box-and-whisker plot) shows minimum, Q1, median, Q3, and maximum. Mean Absolute Deviation (MAD) measures how spread out data is from the mean. Histograms show frequency distributions. These tools let you see the 'shape' of data — is it symmetric, skewed, or clustered?"
    },
    practice: [
      { type: "multiple", q: "A box plot has: min=5, Q1=15, median=25, Q3=35, max=50. What is the IQR?",       choices: ["20","10","30","45"], answer: "20" },
      { type: "multiple", q: "Which part of a box plot shows the middle 50% of data?",                         choices: ["The whiskers","The entire box","Just the median line","The min and max"], answer: "The entire box" },
      { type: "multiple", q: "A dataset with high variability would have a...",                                 choices: ["Small range","Large IQR","Very tight box plot","All values the same"], answer: "Large IQR" },
      { type: "multiple", q: "In a histogram, the height of each bar represents...",                           choices: ["The exact values","How spread out the data is","The frequency (count) of data in that interval","The mean"], answer: "The frequency (count) of data in that interval" },
      { type: "fill",     q: "Data: 2, 4, 6, 8, 10. What is the MAD (mean absolute deviation)?",              answer: "2.4", hint: "Mean=6. Deviations: 4,2,0,2,4. Average of deviations = 12÷5" }
    ],
    quiz: [
      { type: "multiple", q: "Two classes took the same test. Class A: mean=75, IQR=5. Class B: mean=75, IQR=20. What does this tell us?", choices: ["Class B scored higher","Class A is more consistent","Class B is more consistent","They are identical"], answer: "Class A is more consistent" },
      { type: "multiple", q: "Which data is best displayed with a box plot?",                                  choices: ["How many students like each color","Temperature readings over 30 days","A single test score","Names in alphabetical order"], answer: "Temperature readings over 30 days" },
      { type: "fill",     q: "Q1 = 20, Q3 = 45. What is the IQR?",                                            answer: "25", hint: "IQR = Q3 - Q1" }
    ]
  },

  // ── GRADE 8 (more) ─────────────────────────────────────

  {
    id: "math-8-pythagorean",
    code: "8-PT-1A",
    grade: 8,
    subject: "math",
    topic: "Pythagorean Theorem",
    title: "The Pythagorean Theorem",
    subtitle: "a² + b² = c² for right triangles",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "The Most Famous Theorem in Math!",
      text: "In any right triangle, the square of the hypotenuse (the longest side, across from the right angle) equals the sum of the squares of the other two sides: a² + b² = c². This is used in architecture, navigation, video games (distance formula!), and construction. A classic example: a 3-4-5 triangle: 3² + 4² = 9 + 16 = 25 = 5². The Pythagorean theorem was known to ancient Babylonians over 3,000 years ago!"
    },
    practice: [
      { type: "multiple", q: "In a right triangle with legs 3 and 4, the hypotenuse is...",                    choices: ["5","6","7","12"], answer: "5" },
      { type: "fill",     q: "A right triangle has legs of 5 and 12. What is the hypotenuse?",                 answer: "13", hint: "5² + 12² = 25 + 144 = 169, √169 = ?" },
      { type: "multiple", q: "Which set of numbers is a Pythagorean triple?",                                  choices: ["3, 4, 6","5, 12, 13","6, 8, 11","4, 5, 9"], answer: "5, 12, 13" },
      { type: "multiple", q: "A ladder 10 ft long leans against a wall. The base is 6 ft from the wall. How high does it reach?", choices: ["4 ft","8 ft","9 ft","7 ft"], answer: "8 ft" },
      { type: "fill",     q: "In a right triangle, c = 17 and a = 8. Find b.",                                answer: "15", hint: "8² + b² = 17², 64 + b² = 289" }
    ],
    quiz: [
      { type: "multiple", q: "Two points are at (0,0) and (3,4). What is the distance between them?",         choices: ["3","4","5","7"], answer: "5" },
      { type: "multiple", q: "A square has a diagonal of 10. What is the side length? (round to nearest tenth)", choices: ["5","6.7","7.1","8"], answer: "7.1" },
      { type: "fill",     q: "A right triangle has legs of 9 and 40. What is the hypotenuse?",                answer: "41", hint: "9² + 40² = 81 + 1600 = 1681" }
    ]
  },

  {
    id: "math-8-scientific-notation",
    code: "8-SN-1A",
    grade: 8,
    subject: "math",
    topic: "Scientific Notation",
    title: "Scientific Notation",
    subtitle: "Writing very big and very small numbers",
    duration: "9 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Write Huge Numbers the Easy Way!",
      text: "Scientific notation writes numbers as a decimal between 1 and 10, multiplied by a power of 10. Example: 300,000,000 (speed of light in m/s) = 3 × 10⁸. Very small: 0.000000001 = 1 × 10⁻⁹. The exponent shows how many places the decimal moves: positive exponent → move right (big number), negative → move left (small number). Used in astronomy, chemistry, physics, and computing where numbers get astronomically large or incredibly tiny."
    },
    practice: [
      { type: "multiple", q: "Write 45,000 in scientific notation.",                                           choices: ["4.5 × 10³","4.5 × 10⁴","45 × 10³","4.5 × 10⁵"], answer: "4.5 × 10⁴" },
      { type: "multiple", q: "What is 2.3 × 10⁵ in standard form?",                                           choices: ["23,000","2,300","230,000","2,300,000"], answer: "230,000" },
      { type: "fill",     q: "Write 0.0067 in scientific notation. (Answer: 6.7 × 10 to the power of what?)", answer: "-3", hint: "Move decimal right 3 places to get 6.7" },
      { type: "multiple", q: "Which is larger: 3.2 × 10⁶ or 9.1 × 10⁵?",                                     choices: ["9.1 × 10⁵","3.2 × 10⁶","They are equal","Cannot compare"], answer: "3.2 × 10⁶" },
      { type: "multiple", q: "(2 × 10³) × (3 × 10⁴) = ?",                                                    choices: ["6 × 10⁷","6 × 10¹²","5 × 10⁷","6 × 10⁶"], answer: "6 × 10⁷" }
    ],
    quiz: [
      { type: "multiple", q: "The Earth is about 93,000,000 miles from the Sun. In scientific notation...",    choices: ["9.3 × 10⁶","9.3 × 10⁷","9.3 × 10⁸","93 × 10⁶"], answer: "9.3 × 10⁷" },
      { type: "fill",     q: "Write 4.7 × 10⁻⁴ in standard form.",                                            answer: "0.00047", hint: "Move decimal left 4 places" },
      { type: "multiple", q: "(8 × 10⁹) ÷ (4 × 10³) = ?",                                                    choices: ["2 × 10³","2 × 10⁶","4 × 10³","2 × 10⁷"], answer: "2 × 10⁶" }
    ]
  },

  {
    id: "math-8-functions",
    code: "8-FU-1A",
    grade: 8,
    subject: "math",
    topic: "Functions",
    title: "Introduction to Functions",
    subtitle: "Input, output & function notation",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Functions: Every Input Gets One Output!",
      text: "A function is a relationship where every input (x) produces exactly one output (y). Written as f(x) — read 'f of x'. Think of it like a machine: you put in a number, you get one number out. Key test: the Vertical Line Test — if a vertical line crosses a graph more than once, it is NOT a function. Linear functions: f(x) = mx + b. Quadratic: f(x) = ax². Functions are the foundation of all of higher math, physics, computer science, and economics."
    },
    practice: [
      { type: "multiple", q: "What does f(3) = 10 mean?",                                                      choices: ["f times 3 equals 10","When x=3 the function outputs 10","f equals 10/3","3 functions equal 10"], answer: "When x=3 the function outputs 10" },
      { type: "multiple", q: "Which set of pairs is a function?",                                               choices: ["{(1,2),(1,3),(2,4)}","{(2,5),(3,5),(4,5)}","{(1,2),(2,1),(1,3)}","{(0,1),(0,2),(0,3)}"], answer: "{(2,5),(3,5),(4,5)}" },
      { type: "fill",     q: "If f(x) = 3x - 2, find f(5).",                                                   answer: "13", hint: "3(5) - 2 = 15 - 2" },
      { type: "multiple", q: "The Vertical Line Test determines whether a graph is...",                         choices: ["Linear","A function","Increasing","Symmetric"], answer: "A function" },
      { type: "multiple", q: "If g(x) = x² + 1, what is g(4)?",                                               choices: ["9","17","25","5"], answer: "17" }
    ],
    quiz: [
      { type: "multiple", q: "Which type of function makes a U-shaped curve?",                                 choices: ["Linear","Exponential","Quadratic","Absolute value"], answer: "Quadratic" },
      { type: "fill",     q: "If h(x) = 2x + 6, find x when h(x) = 20.",                                      answer: "7", hint: "2x + 6 = 20 → 2x = 14 → x = ?" },
      { type: "multiple", q: "A function where f(1)=2, f(2)=4, f(3)=8 is best described as...",               choices: ["Linear","Quadratic","Exponential","Rational"], answer: "Exponential" }
    ]
  },

  // ── GRADE 9 (more) ─────────────────────────────────────

  {
    id: "math-9-trigonometry",
    code: "9-TR-1A",
    grade: 9,
    subject: "math",
    topic: "Trigonometry",
    title: "Trigonometry Basics",
    subtitle: "SOH-CAH-TOA and right triangles",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Trigonometry: Angles + Sides!",
      text: "Trigonometry studies relationships between angles and sides in triangles. The three basic trig ratios for a right triangle: Sine (sin) = Opposite ÷ Hypotenuse. Cosine (cos) = Adjacent ÷ Hypotenuse. Tangent (tan) = Opposite ÷ Adjacent. Memory trick: SOH-CAH-TOA. These ratios are used in architecture, engineering, GPS, animation, and physics. Once you know two pieces of a right triangle, trig lets you find all the rest!"
    },
    practice: [
      { type: "multiple", q: "SOH stands for...",                                                               choices: ["Side Over Hyp","Sin = Opp/Hyp","Sine Of Horizontal","Sum Of Heights"], answer: "Sin = Opp/Hyp" },
      { type: "multiple", q: "In a right triangle, the side adjacent to angle A has length 4 and the hypotenuse is 5. What is cos(A)?", choices: ["3/5","4/5","4/3","5/4"], answer: "4/5" },
      { type: "multiple", q: "tan(45°) = ?",                                                                   choices: ["0","0.5","1","√2"], answer: "1" },
      { type: "multiple", q: "To find the opposite side when you know the hypotenuse and an angle, you would use...", choices: ["Cosine","Sine","Tangent","Pythagorean theorem only"], answer: "Sine" },
      { type: "fill",     q: "A right triangle has hypotenuse 10 and angle 30°. The opposite side = 10 × sin(30°). sin(30°) = 0.5, so the side = ?", answer: "5", hint: "10 × 0.5 = 5" }
    ],
    quiz: [
      { type: "multiple", q: "An antenna is 50 ft tall. You stand 50 ft away. The angle of elevation is 45°. This makes sense because tan(45°) = ?", choices: ["0","0.5","1","2"], answer: "1" },
      { type: "multiple", q: "Which trig function uses adjacent and hypotenuse?",                              choices: ["Sine","Cosine","Tangent","Secant"], answer: "Cosine" },
      { type: "fill",     q: "In a right triangle: angle = 60°, hypotenuse = 8. Adjacent side = 8 × cos(60°). cos(60°) = 0.5, so adjacent = ?", answer: "4", hint: "8 × 0.5 = 4" }
    ]
  },

];
