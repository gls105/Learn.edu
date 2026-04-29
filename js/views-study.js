// Study Tools Views for Learn.edu

// Study Hub: shows 5 tool cards
export function studyHub() {
  const tools = [
    { id:'flashcards', emoji:'🃏', title:'Flashcards', desc:'Flip through key terms and definitions', color:'#E8562A', bg:'#fff3ef' },
    { id:'quiz',       emoji:'⚡', title:'Quiz Mode',  desc:'Timed quiz — beat the clock!', color:'#7c3aed', bg:'#f5f3ff' },
    { id:'practice',   emoji:'✏️', title:'Practice',   desc:'Unlimited questions, hints available', color:'#059669', bg:'#ecfdf5' },
    { id:'testprep',   emoji:'📝', title:'Test Prep',  desc:'Exam-style with explanations', color:'#0369a1', bg:'#e0f2fe' },
    { id:'realworld',  emoji:'🌍', title:'Real World',  desc:'See where this math/science actually shows up', color:'#d97706', bg:'#fef3c7' },
  ];

  const cards = tools.map(t => `
    <div class="tool-card" style="background:${t.bg};border:2px solid ${t.color};color:${t.color};" onclick="App.go('study/${t.id}')">
      <div style="font-size:2.8rem;margin-bottom:12px">${t.emoji}</div>
      <h3 style="font-weight:900;margin-bottom:6px">${t.title}</h3>
      <p style="font-weight:600;font-size:0.88rem;color:#374151">${t.desc}</p>
    </div>
  `).join('');

  return `
    ${Views.nav()}
    <div style="padding:20px 16px;max-width:680px;margin:0 auto">
      <h1 style="text-align:center;margin-bottom:20px;font-weight:900;letter-spacing:-1px">Study Tools</h1>
      <div class="tools-grid">${cards}</div>
      <div style="margin-top:36px;text-align:center;color:var(--muted);font-size:0.88rem;">Choose a tool above to start studying</div>
    </div>
  `;
}

// Subject and level picker for study tools
export function studyPicker(toolId) {
  const mathGrades = [4,5,6,7,8,9];
  const scienceLevels = ['earth', 'life', 'physical', 'advanced'];
  const spanishLevels = ['beginning', 'spanish1', 'spanish2', 'advanced'];

  function card(id, label, bg, color) {
    return `
      <div class="tool-card" style="background:${bg};border:2px solid ${color};color:${color};cursor:pointer" onclick="App.go('study/${toolId}/${id}')">
        <h3 style="font-weight:900;margin-bottom:6px">${label}</h3>
      </div>
    `;
  }

  let cards = '';
  if (toolId === 'realworld') {
    cards += '<h2 style="margin-bottom:12px; font-weight:900;color:#444;">Select Subject</h2>';
    cards += card('math', 'Math', '#fff3ef', '#E8562A');
    cards += card('science', 'Science', '#ecfdf5', '#059669');
    cards += card('spanish', 'Spanish', '#fef3c7', '#d97706');
  } else {
    cards += '<h2 style="margin-bottom:12px; font-weight:900; color:#444;">Select Subject and Level</h2>';
    cards += '<h3 style="font-weight:700; margin-top:16px; margin-bottom:8px;">Math Grades</h3>';
    cards += mathGrades.map(g => card(`math/${g}`, `Grade ${g}`, '#fff3ef', '#E8562A')).join('');
    cards += '<h3 style="font-weight:700; margin-top:20px; margin-bottom:8px;">Science Levels</h3>';
    cards += scienceLevels.map(l => card(`science/${l}`, l.charAt(0).toUpperCase() + l.slice(1), '#ecfdf5', '#059669')).join('');
    cards += '<h3 style="font-weight:700; margin-top:20px; margin-bottom:8px;">Spanish Levels</h3>';
    cards += spanishLevels.map(l => card(`spanish/${l}`, l.charAt(0).toUpperCase() + l.slice(1).replace('spanish','Spanish '), '#fef3c7', '#d97706')).join('');
  }
  return `${Views.nav({hash:'study',label:'← Back'})}
    <div style="padding:20px 16px;max-width:680px;margin:0 auto">
      ${cards}
    </div>`;
}

// Main view for each study tool
export function studyTool(toolId, subject, levelOrGrade) {
  let html = '';

  function getFlashcards() {
    return FLASHCARD_SETS.find(set => set.id === `${subject}-${levelOrGrade}` || set.id === `${subject}-${levelOrGrade.toString().toLowerCase()}`);
  }
  function getLessons() {
    if (subject === 'math') return MATH_LESSONS.filter(l => l.grade === Number(levelOrGrade));
    if (subject === 'science') return SCIENCE_LESSONS.filter(l => l.level === levelOrGrade);
    if (subject === 'spanish') return SPANISH_LESSONS.filter(l => l.level === levelOrGrade);
    return [];
  }
  if (toolId === 'flashcards') {
    const set = getFlashcards();
    if (!set || !set.cards.length) {
      html = `<div style="padding:40px;text-align:center;color:#999">No flashcards found for this subject and level.</div>`;
      return html;
    }

    // flashcards UI
    var flashcardIndex = 0;

    html += Views.nav({hash:'study',label:'← Back'});

    html += `<div style="max-width:480px;margin:24px auto;text-align:center;">
      <div><span id="flashcard-progress">1</span> / ${set.cards.length}</div>
      <div class="flashcard-scene" onclick="flipCard()">
        <div class="flashcard" id="flashcard">
          <div class="flashcard-front" id="flashcard-front">${set.cards[flashcardIndex].term}</div>
          <div class="flashcard-back" id="flashcard-back">${set.cards[flashcardIndex].def}</div>
        </div>
      </div>
      <div style="margin-top:16px;">
        <button onclick="prevCard()" style="margin-right:12px">Prev</button>
        <button onclick="nextCard()">Next</button>
      </div>
    </div>`;
  } else if (toolId === 'quiz' || toolId === 'practice' || toolId === 'testprep') {
    html = `<div style="padding:40px;text-align:center;color:#999">Quiz, Practice, and Test Prep modes are coming soon!</div>`;
  } else if (toolId === 'realworld') {
    const rwCards = REAL_WORLD.filter(rw => rw.subject === subject);
    if (!rwCards.length) {
      html = `<div style="padding:40px;text-align:center;color:#999">No Real World cards found for this subject.</div>`;
      return html;
    }

    html += Views.nav({hash:'study',label:'← Back'});
    html += `<div style="padding:20px;max-width:680px;margin:0 auto;">
      <h1>${subject.charAt(0).toUpperCase() + subject.slice(1)} Real World Connections</h1>
      <div style="overflow-x:auto;display:flex;gap:20px;padding-bottom:24px;">
    `;

    rwCards.forEach(topic => {
      topic.cards.forEach(card => {
        html += `<div style="min-width:300px;background:#fff8e1;border:2px solid #d4b453;border-radius:20px;padding:20px;color:#5a4639;flex-shrink:0;">
          <div style="font-size:2rem;margin-bottom:12px;">${card.emoji}</div>
          <div style="font-weight:900;font-size:1.2rem;margin-bottom:6px;">${card.career}</div>
          <div style="font-size:0.9rem;margin-bottom:10px;">${card.scenario}</div>
          <div style="font-weight:600;">Connection: ${card.connection}</div>
          <div style="font-family:'SF Mono', monospace; font-size:0.85rem; margin-top:6px; color:#864e01;">${card.formula}</div>
        </div>`;
      });
    });

    html += `</div></div>`;
  }
  return html;
}

// Flashcard control functions
var flashcardSetGlobal = null;
var flashcardIndexGlobal = 0;

window.flipCard = function() {
  const card = document.getElementById('flashcard');
  card.classList.toggle('flipped');
};

window.nextCard = function() {
  if (!flashcardSetGlobal) return;
  flashcardIndexGlobal = (flashcardIndexGlobal + 1) % flashcardSetGlobal.cards.length;
  updateFlashcard();
};

window.prevCard = function() {
  if (!flashcardSetGlobal) return;
  flashcardIndexGlobal = (flashcardIndexGlobal - 1 + flashcardSetGlobal.cards.length) % flashcardSetGlobal.cards.length;
  updateFlashcard();
};

function updateFlashcard() {
  const front = document.getElementById('flashcard-front');
  const back = document.getElementById('flashcard-back');
  const prog = document.getElementById('flashcard-progress');
  const card = document.getElementById('flashcard');
  if (!front || !back || !prog || !card) return;
  card.classList.remove('flipped');
  front.textContent = flashcardSetGlobal.cards[flashcardIndexGlobal].term;
  back.textContent = flashcardSetGlobal.cards[flashcardIndexGlobal].def;
  prog.textContent = (flashcardIndexGlobal + 1) + ' / ' + flashcardSetGlobal.cards.length;
}

// Export all functions as part of Views
export default {
  studyHub,
  studyPicker,
  studyTool
};
