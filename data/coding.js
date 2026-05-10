// ============================================================
//  Learn.edu — Coding Lessons
//  Each lesson: intro → practice (5 problems) → quiz (3 problems)
// ============================================================

const CODING_LESSONS = [

  // ── BEGINNER ──────────────────────────────────────────────

  {
    id: "coding-html-basics",
    code: "WEB-1A",
    grade: null,
    subject: "coding",
    level: "beginner",
    topic: "HTML",
    title: "HTML Basics",
    subtitle: "Build your first webpage",
    duration: "10 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "What is HTML?",
      text: "HTML stands for HyperText Markup Language. It's the skeleton of every webpage you've ever visited! HTML uses tags — like <h1> for headings and <p> for paragraphs — to tell the browser how to display content. Every HTML page starts with <!DOCTYPE html> and wraps everything in <html> tags. Think of HTML as the bones of a webpage: without it, nothing shows up!"
    },
    practice: [
      { type: "multiple", q: "What does HTML stand for?", choices: ["HyperText Markup Language","High Tech Modern Language","HyperText Making Links","Hard Text Markup Language"], answer: "HyperText Markup Language" },
      { type: "multiple", q: "Which tag creates the biggest heading in HTML?", choices: ["<heading>","<h6>","<h1>","<big>"], answer: "<h1>" },
      { type: "multiple", q: "Which tag is used for a paragraph?", choices: ["<para>","<p>","<text>","<pg>"], answer: "<p>" },
      { type: "multiple", q: "What is the correct way to start an HTML file?", choices: ["<html>","<!DOCTYPE html>","<start>","<webpage>"], answer: "<!DOCTYPE html>" },
      { type: "multiple", q: "Which tag creates a link in HTML?", choices: ["<link>","<url>","<a>","<href>"], answer: "<a>" }
    ],
    quiz: [
      { type: "multiple", q: "Where does the visible content of a webpage go?", choices: ["<head>","<title>","<body>","<meta>"], answer: "<body>" },
      { type: "multiple", q: "Which tag makes text bold?", choices: ["<b>","<strong> only","<bold>","Both <b> and <strong>"], answer: "Both <b> and <strong>" },
      { type: "multiple", q: "What does the <title> tag do?", choices: ["Makes text big","Sets the browser tab text","Creates a heading","Links to a stylesheet"], answer: "Sets the browser tab text" }
    ]
  },

  {
    id: "coding-css-styling",
    code: "WEB-2A",
    grade: null,
    subject: "coding",
    level: "beginner",
    topic: "CSS",
    title: "CSS Styling",
    subtitle: "Colors, fonts, and boxes",
    duration: "10 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "What is CSS?",
      text: "CSS stands for Cascading Style Sheets. If HTML is the skeleton, CSS is the skin and clothes! CSS lets you change colors, fonts, sizes, and layouts. You write CSS rules like this: h1 { color: red; } — that sets all h1 headings to red. The part before the { is called the selector, and inside are properties and values. With CSS, you can make any webpage beautiful!"
    },
    practice: [
      { type: "multiple", q: "What does CSS stand for?", choices: ["Cascading Style Sheets","Computer Styling System","Creative Style Software","Cascading Syntax Sheets"], answer: "Cascading Style Sheets" },
      { type: "multiple", q: "Which CSS property changes text color?", choices: ["text-color","font-color","color","foreground"], answer: "color" },
      { type: "multiple", q: "How do you make text bold in CSS?", choices: ["font-weight: bold","text-weight: bold","bold: true","font-style: bold"], answer: "font-weight: bold" },
      { type: "multiple", q: "Which CSS property changes the background color?", choices: ["background","background-color","bg-color","fill"], answer: "background-color" },
      { type: "multiple", q: "What does the CSS property 'font-size: 24px' do?", choices: ["Makes font 24 points","Sets font width to 24","Makes font 24 pixels tall","Changes font family"], answer: "Makes font 24 pixels tall" }
    ],
    quiz: [
      { type: "multiple", q: "Which selector targets ALL paragraph tags?", choices: ["#p","p",".p","*p"], answer: "p" },
      { type: "multiple", q: "How do you add CSS directly inside an HTML file?", choices: ["<style> tags in <head>","<css> tags","Inline only","It's impossible"], answer: "<style> tags in <head>" },
      { type: "multiple", q: "Which property adds space inside an element's border?", choices: ["margin","spacing","padding","border-space"], answer: "padding" }
    ]
  },

  {
    id: "coding-js-intro",
    code: "JS-1A",
    grade: null,
    subject: "coding",
    level: "beginner",
    topic: "JavaScript",
    title: "JavaScript Intro",
    subtitle: "Variables and functions",
    duration: "10 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What is JavaScript?",
      text: "JavaScript is the programming language of the web. While HTML builds structure and CSS adds style, JavaScript makes things happen! Buttons that click, animations that move, forms that check your answers — that's all JavaScript. You store information in variables (like let age = 12;) and bundle actions into functions (function greet() { alert('Hi!'); }). JavaScript runs in every web browser — no installation needed!"
    },
    practice: [
      { type: "multiple", q: "Which keyword declares a variable in modern JavaScript?", choices: ["var","let","const","Both let and const"], answer: "Both let and const" },
      { type: "multiple", q: "What will console.log('Hello') do?", choices: ["Print Hello on the page","Open an alert","Print Hello in the browser console","Create a variable"], answer: "Print Hello in the browser console" },
      { type: "multiple", q: "What symbol is used for JavaScript comments?", choices: ["#","//","--","**"], answer: "//" },
      { type: "multiple", q: "Which of these is a correct JavaScript string?", choices: ["'Hello'","Hello","<Hello>","[Hello]"], answer: "'Hello'" },
      { type: "multiple", q: "What does a function do?", choices: ["Stores a number","Applies CSS styling","Bundles reusable code you can call by name","Defines HTML structure"], answer: "Bundles reusable code you can call by name" }
    ],
    quiz: [
      { type: "multiple", q: "What is the result of 5 + '3' in JavaScript?", choices: ["8","'53'","53","Error"], answer: "'53'" },
      { type: "multiple", q: "How do you call a function named 'greet'?", choices: ["greet","call greet()","greet()","run greet"], answer: "greet()" },
      { type: "multiple", q: "Which operator checks if two values are exactly equal?", choices: ["=","==","===","!="], answer: "===" }
    ]
  },

  {
    id: "coding-python-basics",
    code: "PY-1A",
    grade: null,
    subject: "coding",
    level: "beginner",
    topic: "Python",
    title: "Python Basics",
    subtitle: "print, variables, and if/else",
    duration: "10 min",
    difficulty: 1,
    intro: {
      video: null,
      title: "Why Learn Python?",
      text: "Python is one of the most popular programming languages in the world — used in AI, data science, web apps, and automation. The best part? It reads almost like English! You can print text with print('Hello!'), store data in variables like name = 'Martin', and make decisions with if/else. Python uses indentation (spaces) instead of curly braces, so keeping your code neat actually matters. It's the perfect first language!"
    },
    practice: [
      { type: "multiple", q: "What does print('Hello') do in Python?", choices: ["Creates a variable","Displays Hello on screen","Opens a file","Sends an email"], answer: "Displays Hello on screen" },
      { type: "multiple", q: "Which of these is a valid Python variable assignment?", choices: ["int x = 5","x = 5","let x = 5","var x = 5"], answer: "x = 5" },
      { type: "multiple", q: "What symbol starts a comment in Python?", choices: ["//","#","/*","--"], answer: "#" },
      { type: "multiple", q: "What will this print? x = 10; print(x + 5)", choices: ["x + 5","10","15","Error"], answer: "15" },
      { type: "multiple", q: "Which keyword starts a condition in Python?", choices: ["when","if","check","when"], answer: "if" }
    ],
    quiz: [
      { type: "multiple", q: "What is the output of: print(type(5))?", choices: ["'number'","<class 'int'>","integer","5"], answer: "<class 'int'>" },
      { type: "multiple", q: "In Python if/else, what marks the end of the condition?", choices: ["{}","end","a colon (:)","Nothing needed"], answer: "a colon (:)" },
      { type: "multiple", q: "Which of these correctly prints 'Yes' if x > 10?", choices: ["if x > 10 print('Yes')","if x > 10: print('Yes')","if (x > 10) { print('Yes') }","print('Yes') if x > 10"], answer: "if x > 10: print('Yes')" }
    ]
  },

  // ── INTERMEDIATE ──────────────────────────────────────────

  {
    id: "coding-loops",
    code: "PY-2A",
    grade: null,
    subject: "coding",
    level: "intermediate",
    topic: "Loops",
    title: "Loops",
    subtitle: "For loops in Python and JavaScript",
    duration: "12 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "Why Do We Need Loops?",
      text: "Imagine printing the numbers 1 to 100. Would you write print(1), print(2)... all the way to print(100)? No way! Loops let you repeat code automatically. A for loop in Python looks like: for i in range(5): print(i) — and prints 0, 1, 2, 3, 4. In JavaScript: for (let i = 0; i < 5; i++) { console.log(i); }. Loops are one of the most powerful tools in programming — master them and you can do incredible things!"
    },
    practice: [
      { type: "multiple", q: "What does range(5) produce in Python?", choices: ["1,2,3,4,5","0,1,2,3,4","0,1,2,3,4,5","5 zeros"], answer: "0,1,2,3,4" },
      { type: "multiple", q: "How many times does this loop run? for i in range(3): print(i)", choices: ["2","3","4","1"], answer: "3" },
      { type: "multiple", q: "In JavaScript, what does 'i++' mean in a for loop?", choices: ["Subtract 1 from i","Multiply i by itself","Add 1 to i","Print i"], answer: "Add 1 to i" },
      { type: "multiple", q: "What type of loop is best when you know exactly how many times to repeat?", choices: ["while loop","do-while loop","for loop","infinite loop"], answer: "for loop" },
      { type: "multiple", q: "What will this print? for x in [1,2,3]: print(x*2)", choices: ["1 2 3","2 4 6","1 4 9","2 3 4"], answer: "2 4 6" }
    ],
    quiz: [
      { type: "multiple", q: "What keyword stops a loop early in Python/JavaScript?", choices: ["stop","exit","break","end"], answer: "break" },
      { type: "multiple", q: "How do you loop through all items in a Python list called 'fruits'?", choices: ["for i in fruits:","for fruits in item:","loop fruits:","while fruits:"], answer: "for i in fruits:" },
      { type: "multiple", q: "What is the output of: for i in range(2,5): print(i)?", choices: ["2 3 4","1 2 3 4","2 3 4 5","0 1 2 3 4"], answer: "2 3 4" }
    ]
  },

  {
    id: "coding-functions",
    code: "PY-2B",
    grade: null,
    subject: "coding",
    level: "intermediate",
    topic: "Functions",
    title: "Functions",
    subtitle: "Defining and calling functions",
    duration: "12 min",
    difficulty: 2,
    intro: {
      video: null,
      title: "What Are Functions?",
      text: "Functions are reusable blocks of code. Instead of writing the same code 10 times, you define it once and call it whenever you need it. In Python: def greet(name): print('Hello, ' + name). Then greet('Martin') prints 'Hello, Martin'. Functions can take inputs (called parameters) and return outputs (using return). They're the building blocks of every real program — learn them well and you'll think like a real programmer!"
    },
    practice: [
      { type: "multiple", q: "What keyword defines a function in Python?", choices: ["function","def","func","define"], answer: "def" },
      { type: "multiple", q: "What is a 'parameter' in a function?", choices: ["The function's name","A variable passed into the function","The return value","A comment"], answer: "A variable passed into the function" },
      { type: "multiple", q: "What does 'return' do in a function?", choices: ["Ends the program","Prints a value","Sends a value back to where the function was called","Creates a new variable"], answer: "Sends a value back to where the function was called" },
      { type: "multiple", q: "How do you call a Python function named 'add' with values 3 and 4?", choices: ["add 3 4","call add(3,4)","add(3, 4)","def add(3, 4)"], answer: "add(3, 4)" },
      { type: "multiple", q: "What is the output of: def double(x): return x*2 — then print(double(5))?", choices: ["5","10","double(5)","x*2"], answer: "10" }
    ],
    quiz: [
      { type: "multiple", q: "Can a function call another function?", choices: ["No, never","Only in JavaScript","Yes, always","Only with special keywords"], answer: "Yes, always" },
      { type: "multiple", q: "What happens if a function has no 'return' statement?", choices: ["Error","Returns 0","Returns None/undefined","The program stops"], answer: "Returns None/undefined" },
      { type: "multiple", q: "In JavaScript, which is a valid function definition?", choices: ["def greet() {}","function greet() {}","func greet() {}","greet function() {}"], answer: "function greet() {}" }
    ]
  },

  // ── ADVANCED ──────────────────────────────────────────────

  {
    id: "coding-build-webpage",
    code: "WEB-3A",
    grade: null,
    subject: "coding",
    level: "advanced",
    topic: "Projects",
    title: "Build a Simple Webpage",
    subtitle: "HTML + CSS + JavaScript together",
    duration: "15 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Your First Real Project",
      text: "Now it's time to combine everything! A real webpage uses HTML for structure, CSS for style, and JavaScript for interactivity. For example: an HTML form collects a name, CSS makes it look beautiful, and JavaScript shows a greeting when you click the button. The key skill is connecting them: link your CSS with <link rel='stylesheet' href='style.css'>, and your JS with <script src='app.js'></script>. Professional developers build exactly this way — one file for each layer!"
    },
    practice: [
      { type: "multiple", q: "How do you link an external CSS file called 'style.css' in HTML?", choices: ["<style src='style.css'>","<link rel='stylesheet' href='style.css'>","<css href='style.css'>","<import style.css>"], answer: "<link rel='stylesheet' href='style.css'>" },
      { type: "multiple", q: "How do you link an external JavaScript file called 'app.js'?", choices: ["<javascript src='app.js'>","<js href='app.js'>","<script src='app.js'></script>","<import src='app.js'>"], answer: "<script src='app.js'></script>" },
      { type: "multiple", q: "What HTML element would you use to create a clickable button?", choices: ["<click>","<button>","<input type='link'>","<press>"], answer: "<button>" },
      { type: "multiple", q: "Which JavaScript method selects an HTML element by its id?", choices: ["document.getTag()","document.findElement()","document.getElementById()","document.select()"], answer: "document.getElementById()" },
      { type: "multiple", q: "What does 'onclick' do in HTML?", choices: ["Styles the element","Runs JavaScript when the element is clicked","Creates a link","Adds a class"], answer: "Runs JavaScript when the element is clicked" }
    ],
    quiz: [
      { type: "multiple", q: "Where should <script> tags go for best performance?", choices: ["In <head>","At the start of <body>","At the end of <body>","Before <!DOCTYPE>"], answer: "At the end of <body>" },
      { type: "multiple", q: "Which CSS property makes a div a flexbox container?", choices: ["layout: flex","display: flex","flex: container","box: flex"], answer: "display: flex" },
      { type: "multiple", q: "What does 'innerHTML' do in JavaScript?", choices: ["Gets/sets the HTML content inside an element","Adds CSS styles","Creates a new element","Deletes an element"], answer: "Gets/sets the HTML content inside an element" }
    ]
  },

  {
    id: "coding-debugging",
    code: "CS-3A",
    grade: null,
    subject: "coding",
    level: "advanced",
    topic: "Debugging",
    title: "Debugging",
    subtitle: "Finding and fixing errors",
    duration: "12 min",
    difficulty: 3,
    intro: {
      video: null,
      title: "Bugs Are Normal — Here's How to Fix Them",
      text: "Every programmer writes bugs. The best programmers are great at finding and fixing them! There are three main types of errors: Syntax errors (you broke the grammar rules — like missing a colon), Runtime errors (the code runs but crashes — like dividing by zero), and Logic errors (the code runs but gives wrong answers). Tools like the browser console (press F12!) and Python's traceback messages tell you exactly where things went wrong. Debugging is a superpower — it's what separates good programmers from great ones!"
    },
    practice: [
      { type: "multiple", q: "What type of error causes a program to crash while running?", choices: ["Syntax error","Logic error","Runtime error","Import error"], answer: "Runtime error" },
      { type: "multiple", q: "You wrote 'pint' instead of 'print'. What kind of error is this?", choices: ["Logic error","Runtime error","Syntax error","Type error"], answer: "Runtime error" },
      { type: "multiple", q: "Your code runs but gives the wrong answer. What type of error is that?", choices: ["Syntax error","Runtime error","Logic error","Compile error"], answer: "Logic error" },
      { type: "multiple", q: "Which browser tool helps you debug JavaScript?", choices: ["The URL bar","The Developer Console (F12)","The address bar","The bookmarks"], answer: "The Developer Console (F12)" },
      { type: "multiple", q: "In Python, what does a 'traceback' tell you?", choices: ["How fast your code ran","Where an error occurred","Your code's memory usage","The output of print statements"], answer: "Where an error occurred" }
    ],
    quiz: [
      { type: "multiple", q: "What is a 'breakpoint' used for?", choices: ["Stopping the internet","Pausing code execution at a specific line to inspect it","Deleting a function","Printing output"], answer: "Pausing code execution at a specific line to inspect it" },
      { type: "multiple", q: "Which Python function helps you see a variable's value while debugging?", choices: ["check()","debug()","print()","inspect()"], answer: "print()" },
      { type: "multiple", q: "What does 'NameError' in Python usually mean?", choices: ["Wrong file name","You used a variable that wasn't defined","Division by zero","Wrong indentation"], answer: "You used a variable that wasn't defined" }
    ]
  },

]
