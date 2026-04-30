// ============================================================
//  Learn.edu — Mini Games
//  MathBlast: rapid-fire arithmetic (unlocked at 100 XP)
//  WordRush:  spelling challenge (unlocked at 300 XP)
// ============================================================

// ── Math Blast ────────────────────────────────────────────
const MathBlast = {
  TIME_LIMIT: 60,
  QUESTIONS:  15,

  ops: ['+', '-', '×'],

  _gen() {
    const op  = this.ops[Math.floor(Math.random() * this.ops.length)];
    let a, b, answer;
    if (op === '+') { a = Math.floor(Math.random()*50)+1; b = Math.floor(Math.random()*50)+1; answer = a+b; }
    if (op === '-') { a = Math.floor(Math.random()*50)+10; b = Math.floor(Math.random()*a)+1; answer = a-b; }
    if (op === '×') { a = Math.floor(Math.random()*12)+1; b = Math.floor(Math.random()*12)+1; answer = a*b; }
    return { q: `${a} ${op} ${b}`, answer };
  },

  init() {
    this.score    = 0;
    this.wrong    = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.current  = this._gen();
    this._startTimer();
    this._render();
  },

  _startTimer() {
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.timeLeft--;
      const el = document.getElementById('mb-time');
      if (el) el.textContent = this.timeLeft;
      const bar = document.getElementById('mb-bar');
      if (bar) bar.style.width = (this.timeLeft / this.TIME_LIMIT * 100) + '%';
      if (this.timeLeft <= 0) this._end();
    }, 1000);
  },

  submit() {
    const inp = document.getElementById('mb-input');
    if (!inp) return;
    const val = parseInt(inp.value.trim());
    inp.value = '';

    if (val === this.current.answer) {
      this.score++;
      this._flash('mb-feedback', '✓', '#059669');
    } else {
      this.wrong++;
      this._flash('mb-feedback', `✗ ${this.current.answer}`, '#DC2626');
    }

    const scoreEl = document.getElementById('mb-score');
    if (scoreEl) scoreEl.textContent = this.score;

    if (this.score + this.wrong >= this.QUESTIONS) {
      this._end();
    } else {
      this.current = this._gen();
      const qEl = document.getElementById('mb-question');
      if (qEl) {
        qEl.classList.remove('mb-pop');
        void qEl.offsetWidth; // reflow
        qEl.classList.add('mb-pop');
        qEl.textContent = this.current.q + ' = ?';
      }
      inp.focus();
    }
  },

  _flash(id, text, color) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.style.color = color;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 700);
  },

  _end() {
    clearInterval(this._timer);
    const pct   = Math.round((this.score / this.QUESTIONS) * 100);
    const xpEarned = Math.round(10 + this.score * 3);
    XP.earn(xpEarned, `Math Blast (${this.score}/${this.QUESTIONS})`);

    const el = document.getElementById('mb-arena');
    if (!el) return;
    el.innerHTML = `
      <div class="game-result pop">
        <div style="font-size:3.5rem">${pct >= 80 ? '🏆' : pct >= 50 ? '🎉' : '💪'}</div>
        <h2>${pct >= 80 ? 'Math Master!' : pct >= 50 ? 'Nice work!' : 'Keep going!'}</h2>
        <div style="font-size:2.5rem;font-weight:900;color:var(--math)">${this.score}<span style="font-size:1rem;color:var(--muted)">/${this.QUESTIONS}</span></div>
        <p style="color:var(--muted);margin:0">Correct answers</p>
        <div class="xp-earned-pill" style="margin:16px auto">+${xpEarned} XP earned!</div>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
          <button class="btn btn-primary" onclick="MathBlast.init()">Play Again</button>
          <button class="btn btn-ghost"   onclick="App.go('rewards')">My Rewards</button>
        </div>
      </div>`;
  },

  _render() {
    const el = document.getElementById('mb-arena');
    if (!el) return;
    el.innerHTML = `
      <div class="game-hud">
        <div class="game-stat"><span id="mb-score">0</span><small>correct</small></div>
        <div class="game-timer-wrap">
          <div id="mb-time" class="game-timer">${this.timeLeft}</div>
          <div class="game-timer-track"><div id="mb-bar" class="game-timer-bar" style="width:100%"></div></div>
        </div>
        <div class="game-stat"><span>${this.QUESTIONS}</span><small>questions</small></div>
      </div>
      <div class="mb-question-wrap">
        <div id="mb-question" class="mb-question mb-pop">${this.current.q} = ?</div>
        <div id="mb-feedback" class="mb-feedback"></div>
      </div>
      <div class="mb-input-row">
        <input id="mb-input" type="number" class="mb-input" placeholder="Your answer"
          autofocus autocomplete="off"
          onkeydown="if(event.key==='Enter')MathBlast.submit()">
        <button class="btn btn-primary" onclick="MathBlast.submit()">→</button>
      </div>
      <p style="color:var(--muted);font-size:0.78rem;text-align:center;margin-top:8px">Type your answer and press Enter</p>
    `;
    setTimeout(() => document.getElementById('mb-input')?.focus(), 100);
  },
};

// ── Word Rush ─────────────────────────────────────────────
const WordRush = {
  TIME_LIMIT: 60,
  WORDS: [
    { clue: 'Opposite of addition',            word: 'subtraction' },
    { clue: 'The planet we live on',            word: 'earth' },
    { clue: 'Basic unit of life',               word: 'cell' },
    { clue: 'Part of a whole number',           word: 'fraction' },
    { clue: 'Hello in Spanish',                 word: 'hola' },
    { clue: 'Water cycle process (clouds form)',word: 'condensation' },
    { clue: 'Animals that only eat plants',     word: 'herbivore' },
    { clue: 'Triangle with all equal sides',    word: 'equilateral' },
    { clue: 'Spanish word for "thank you"',     word: 'gracias' },
    { clue: 'Multiplying a number by itself',   word: 'square' },
    { clue: 'Animals that eat other animals',   word: 'carnivore' },
    { clue: 'Speed in a direction',             word: 'velocity' },
    { clue: 'Spanish for "good morning"',       word: 'buenos dias' },
    { clue: 'Organelle that makes energy',      word: 'mitochondria' },
    { clue: 'The study of living things',       word: 'biology' },
  ],

  init() {
    this.score    = 0;
    this.wrong    = 0;
    this.timeLeft = this.TIME_LIMIT;
    this._shuffled = [...this.WORDS].sort(() => Math.random() - 0.5);
    this._idx     = 0;
    this._startTimer();
    this._render();
  },

  _startTimer() {
    clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.timeLeft--;
      const el = document.getElementById('wr-time');
      if (el) el.textContent = this.timeLeft;
      const bar = document.getElementById('wr-bar');
      if (bar) bar.style.width = (this.timeLeft / this.TIME_LIMIT * 100) + '%';
      if (this.timeLeft <= 0) this._end();
    }, 1000);
  },

  submit() {
    const inp = document.getElementById('wr-input');
    if (!inp) return;
    const val = inp.value.trim().toLowerCase();
    inp.value = '';
    const correct = this._shuffled[this._idx]?.word.toLowerCase();

    if (val === correct) {
      this.score++;
      this._flash('wr-feedback', '✓ Correct!', '#059669');
    } else {
      this.wrong++;
      this._flash('wr-feedback', `✗ "${correct}"`, '#DC2626');
    }

    const scoreEl = document.getElementById('wr-score');
    if (scoreEl) scoreEl.textContent = this.score;

    this._idx++;
    if (this._idx >= this._shuffled.length) {
      this._end();
    } else {
      const clueEl = document.getElementById('wr-clue');
      if (clueEl) {
        clueEl.classList.remove('mb-pop');
        void clueEl.offsetWidth;
        clueEl.classList.add('mb-pop');
        clueEl.textContent = this._shuffled[this._idx].clue;
      }
      inp.focus();
    }
  },

  skip() {
    const inp = document.getElementById('wr-input');
    if (inp) inp.value = '';
    this.wrong++;
    this._idx++;
    if (this._idx >= this._shuffled.length) { this._end(); return; }
    const clueEl = document.getElementById('wr-clue');
    if (clueEl) clueEl.textContent = this._shuffled[this._idx].clue;
    document.getElementById('wr-input')?.focus();
  },

  _flash(id, text, color) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.style.color = color;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 900);
  },

  _end() {
    clearInterval(this._timer);
    const xpEarned = Math.round(10 + this.score * 4);
    XP.earn(xpEarned, `Word Rush (${this.score} words)`);

    const el = document.getElementById('mb-arena');
    if (!el) return;
    el.innerHTML = `
      <div class="game-result pop">
        <div style="font-size:3.5rem">${this.score >= 10 ? '🏆' : this.score >= 5 ? '🎉' : '💪'}</div>
        <h2>${this.score >= 10 ? 'Vocabulary Legend!' : this.score >= 5 ? 'Nice vocab!' : 'Keep studying!'}</h2>
        <div style="font-size:2.5rem;font-weight:900;color:#7c3aed">${this.score}<span style="font-size:1rem;color:var(--muted)">/${this._shuffled.length} words</span></div>
        <p style="color:var(--muted);margin:0">Spelled correctly</p>
        <div class="xp-earned-pill" style="margin:16px auto">+${xpEarned} XP earned!</div>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
          <button class="btn btn-primary" onclick="WordRush.init()">Play Again</button>
          <button class="btn btn-ghost"   onclick="App.go('rewards')">My Rewards</button>
        </div>
      </div>`;
  },

  _render() {
    const el = document.getElementById('mb-arena');
    if (!el) return;
    el.innerHTML = `
      <div class="game-hud">
        <div class="game-stat"><span id="wr-score">0</span><small>correct</small></div>
        <div class="game-timer-wrap">
          <div id="wr-time" class="game-timer">${this.timeLeft}</div>
          <div class="game-timer-track"><div id="wr-bar" class="game-timer-bar" style="width:100%"></div></div>
        </div>
        <div class="game-stat"><span>${this._shuffled.length}</span><small>words</small></div>
      </div>
      <div class="mb-question-wrap">
        <p style="color:var(--muted);font-size:0.82rem;font-weight:600;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Spell this word:</p>
        <div id="wr-clue" class="mb-question mb-pop">${this._shuffled[0].clue}</div>
        <div id="wr-feedback" class="mb-feedback"></div>
      </div>
      <div class="mb-input-row">
        <input id="wr-input" type="text" class="mb-input" placeholder="Spell it out…"
          autofocus autocomplete="off"
          onkeydown="if(event.key==='Enter')WordRush.submit()">
        <button class="btn btn-primary" onclick="WordRush.submit()">→</button>
      </div>
      <div style="text-align:center;margin-top:8px">
        <button class="btn btn-ghost" style="font-size:0.78rem;padding:4px 14px" onclick="WordRush.skip()">Skip →</button>
      </div>
    `;
    setTimeout(() => document.getElementById('wr-input')?.focus(), 100);
  },
};
