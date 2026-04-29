// ============================================================
//  Learn.edu — LessonPlayer
//  Handles the 3-step lesson flow: Intro → Practice → Quiz
// ============================================================

const LessonPlayer = {
  lesson: null,
  step: 0,          // 0 = intro, 1 = practice, 2 = quiz, 3 = done
  pIdx: 0,          // practice index
  pScore: 0,        // practice correct count
  qIdx: 0,          // quiz index
  qScore: 0,        // quiz correct count

  // ── Entry point ──────────────────────────────────────────
  init(lessonId) {
    const all = [
      ...(typeof MATH_LESSONS    !== 'undefined' ? MATH_LESSONS    : []),
      ...(typeof SCIENCE_LESSONS !== 'undefined' ? SCIENCE_LESSONS : []),
      ...(typeof SPANISH_LESSONS !== 'undefined' ? SPANISH_LESSONS : []),
    ];
    this.lesson = all.find(l => l.id === lessonId);
    if (!this.lesson) return;

    // Reset state
    this.step = 0; this.pIdx = 0; this.pScore = 0;
    this.qIdx = 0; this.qScore = 0;

    this._render();
  },

  // ── Core render dispatcher ────────────────────────────────
  _render() {
    this._updateSteps();
    this._setProgress();
    const map = { 0: '_intro', 1: '_practice', 2: '_quiz', 3: '_complete' };
    this[map[this.step]]?.();
  },

  // ── Steps indicator ───────────────────────────────────────
  _updateSteps() {
    const el = document.getElementById('lesson-steps');
    if (!el) return;
    const stepIcons = [Icons.bookOpen(14), Icons.pencil(14), Icons.trophy(14)];
    const labels = ['Intro', 'Practice', 'Quiz'];
    el.innerHTML = labels.map((lbl, i) => {
      const state = i < this.step ? 'done' : i === this.step ? 'active' : 'idle';
      const icon  = i < this.step ? '✓' : stepIcons[i];
      const line  = i < 2 ? `<div class="step-line ${i < this.step ? 'done' : ''}"></div>` : '';
      return `
        <div class="step ${i === this.step ? 'active' : ''}">
          <div class="step-dot ${state}">${icon}</div>
          <span class="step-lbl">${lbl}</span>
        </div>${line}`;
    }).join('');
  },

  // ── Progress bar ──────────────────────────────────────────
  _setProgress(override) {
    const bar = document.getElementById('lesson-progress');
    if (!bar) return;
    if (override !== undefined) { bar.style.width = override + '%'; return; }
    const total = (this.lesson.practice?.length || 0) + (this.lesson.quiz?.length || 0);
    const done  = this.pIdx + (this.step >= 2 ? this.qIdx : 0);
    const pct   = this.step === 0 ? 5
                : this.step === 3 ? 100
                : Math.round(10 + (done / Math.max(total, 1)) * 82);
    bar.style.width = pct + '%';
  },

  // ── STEP 0: Intro ─────────────────────────────────────────
  _intro() {
    const { intro } = this.lesson;
    // Check video data file first, then fall back to lesson's own video field
    const videoData = (typeof getLessonVideo !== 'undefined' ? getLessonVideo(this.lesson.id) : null)
                   || (intro.video ? { url: intro.video, channel: 'Video', channelColor: '#888' } : null);
    const video = videoData
      ? `<div class="video-wrap">
           <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:${videoData.channelColor};margin-bottom:8px;padding:0 4px">▶ ${videoData.channel}</div>
           <iframe src="${videoData.url}?rel=0&modestbranding=1" allowfullscreen loading="lazy" style="width:100%;aspect-ratio:16/9;border:none;border-radius:14px"></iframe>
         </div>`
      : `<div class="video-wrap">
           <div class="video-placeholder">
             <div class="play">${Icons.playCircle(52)}</div>
             <strong>${intro.title}</strong>
             <small>Video coming soon — read below for now!</small>
           </div>
         </div>`;

    const mathAnim = this.lesson.subject === 'math'
      ? '<lottie-player src="anim/calculator.json" background="transparent" speed="1" style="width:100px;height:100px;margin:0 auto 4px;display:block" loop autoplay></lottie-player>'
      : '';
    this._setContent(`
      ${mathAnim}
      ${video}
      <div class="intro-box fadeUp">
        <h3>${Icons.bookOpen(16)} ${intro.title}</h3>
        <p>${intro.text}</p>
      </div>
      <div class="action-bar">
        <button class="btn btn-primary" onclick="LessonPlayer._go(1)">
          Got it! Let's practice →
        </button>
      </div>`);
  },

  // ── STEP 1: Practice ──────────────────────────────────────
  _practice() {
    const probs = this.lesson.practice || [];
    if (this.pIdx >= probs.length) { this._practiceResults(); return; }
    this._renderProblem(probs[this.pIdx], 'p');
  },

  // ── STEP 2: Quiz ──────────────────────────────────────────
  _quiz() {
    const probs = this.lesson.quiz || [];
    if (this.qIdx >= probs.length) { this._go(3); return; }
    this._renderProblem(probs[this.qIdx], 'q');
  },

  // ── Render a single problem ───────────────────────────────
  _renderProblem(p, mode) {
    const probs = mode === 'p' ? this.lesson.practice : this.lesson.quiz;
    const idx   = mode === 'p' ? this.pIdx : this.qIdx;
    const label = mode === 'p' ? `${Icons.pencil(14)} Practice` : `${Icons.trophy(14)} Quiz`;

    let inputHtml;
    if (p.type === 'multiple') {
      inputHtml = `<div class="choices">
        ${p.choices.map(c =>
          `<button class="c-btn" onclick="LessonPlayer._checkChoice('${this._esc(c)}','${this._esc(p.answer)}','${mode}',this)">${c}</button>`
        ).join('')}
      </div>`;
    } else {
      inputHtml = `
        <div class="fill-row">
          <input class="fill-input" id="fill-in" type="text" placeholder="Your answer…"
            onkeydown="if(event.key==='Enter')LessonPlayer._checkFill('${this._esc(p.answer)}','${mode}')">
          <button class="check-btn" id="check-btn" onclick="LessonPlayer._checkFill('${this._esc(p.answer)}','${mode}')">Check ✓</button>
        </div>
        ${p.hint ? `<p class="hint">${Icons.lightBulb(14)} Hint: ${p.hint}</p>` : ''}`;    
    }

    this._setContent(`
      <div class="problem-counter">${label} — Question ${idx + 1} of ${probs.length}</div>
      <div class="problem-card pop">
        <div class="problem-q">${p.q}</div>
        ${inputHtml}
        <div class="feedback" id="fb"></div>
      </div>
      <div id="next-slot"></div>`);

    if (p.type === 'fill') setTimeout(() => document.getElementById('fill-in')?.focus(), 80);
  },

  // ── Check multiple-choice ─────────────────────────────────
  _checkChoice(chosen, correct, mode, btn) {
    const isRight = chosen === correct;
    document.querySelectorAll('.c-btn').forEach(b => {
      b.disabled = true;
      if (b.textContent.trim() === correct) b.classList.add('correct');
    });
    if (!isRight) btn.classList.add('wrong');
    this._showFeedback(isRight, correct, mode);
  },

  // ── Check fill-in ─────────────────────────────────────────
  _checkFill(correct, mode) {
    const inp = document.getElementById('fill-in');
    if (!inp || !inp.value.trim()) return;
    const isRight = inp.value.trim().toLowerCase() === correct.toString().toLowerCase();
    inp.disabled = true;
    inp.classList.add(isRight ? 'correct' : 'wrong');
    const cb = document.getElementById('check-btn');
    if (cb) cb.disabled = true;
    this._showFeedback(isRight, correct, mode);
  },

  // ── Feedback + next button ────────────────────────────────
  _showFeedback(isRight, correct, mode) {
    if (isRight && mode === 'p') this.pScore++;
    if (isRight && mode === 'q') this.qScore++;
    this._setProgress();

    const fb = document.getElementById('fb');
    if (fb) {
      fb.className = `feedback ${isRight ? 'correct' : 'wrong'}`;
      fb.innerHTML = isRight
        ? `${Icons.checkCircle(16)} ${this._praise()}!`
        : `${Icons.xCircle(16)} Not quite — the answer is <strong>${correct}</strong>. You'll get it next time!`;
    }

    const probs = mode === 'p' ? this.lesson.practice : this.lesson.quiz;
    const idx   = mode === 'p' ? this.pIdx : this.qIdx;
    const isLast = idx === probs.length - 1;
    const nextLabel = isLast
      ? (mode === 'p' ? 'See results →' : 'Finish quiz →')
      : 'Next question →';

    const slot = document.getElementById('next-slot');
    if (slot) slot.innerHTML = `
      <div class="action-bar" style="margin-top:14px">
        <button class="btn btn-primary" onclick="LessonPlayer._nextProblem('${mode}')">${nextLabel}</button>
      </div>`;
  },

  _nextProblem(mode) {
    if (mode === 'p') { this.pIdx++; this._practice(); }
    else              { this.qIdx++; this._quiz(); }
  },

  // ── Practice results screen ───────────────────────────────
  _practiceResults() {
    const total = this.lesson.practice.length;
    const pct   = Math.round((this.pScore / total) * 100);
    const { emoji, msg } = this._scoreEmoji(pct);

    const quizBtn = (this.lesson.quiz?.length)
      ? `<button class="btn btn-success" onclick="LessonPlayer._go(2)">${Icons.trophy(16)} Take the Quiz</button>` : '';

    this._setContent(`
      <div class="score-card pop">
        <div class="score-emoji">${emoji}</div>
        <h2>${msg}</h2>
        <div class="score-num">${pct}%</div>
        <p class="score-sub">${this.pScore} / ${total} correct on practice</p>
      </div>
      <div class="action-bar" style="margin-top:22px">
        ${quizBtn}
        <button class="btn btn-ghost" onclick="LessonPlayer._go(3)">I'm done ✓</button>
      </div>`);
    this._setProgress();
  },

  // ── STEP 3: Complete ──────────────────────────────────────
  _complete() {
    const quizDone = this.lesson.quiz?.length > 0 && this.qIdx > 0;
    const pct = quizDone
      ? Math.round((this.qScore  / this.lesson.quiz.length)     * 100)
      : Math.round((this.pScore  / (this.lesson.practice.length || 1)) * 100);
    const { emoji, msg } = this._scoreEmoji(pct);

    App.markComplete(this.lesson.id, pct);
    this._setProgress(100);

    const back = `subject/${this.lesson.subject}/${this.lesson.grade}`;
    this._setContent(`
      <div class="score-card pop">
        <div class="score-emoji">${Icons.academicCap(56)}</div>
        <h2>${msg}</h2>
        <p>You finished <strong>${this.lesson.title}</strong></p>
        <div class="score-num">${pct}%</div>
        <p class="score-sub">Final score</p>
      </div>
      <div class="action-bar" style="margin-top:22px; justify-content:center">
        <button class="btn btn-primary" onclick="App.go('${back}')">More Lessons →</button>
        <button class="btn btn-ghost"   onclick="App.go('home')">Home 🏠</button>
      </div>`);
  },

  // ── Helpers ───────────────────────────────────────────────
  _go(step) { this.step = step; this._render(); },

  _setContent(html) {
    const el = document.getElementById('lesson-content');
    if (el) el.innerHTML = html;
  },

  _scoreEmoji(pct) {
    if (pct >= 90) return { emoji: '🏆', msg: 'Absolutely crushed it!' };
    if (pct >= 75) return { emoji: '🎉', msg: 'Great work!' };
    if (pct >= 55) return { emoji: '👍', msg: 'Solid effort!' };
    return              { emoji: '💪', msg: 'Keep going — you got this!' };
  },

  _praise() {
    const list = ['Correct','Nice work','Nailed it','That\'s right','Well done','Boom','Perfect'];
    return list[Math.floor(Math.random() * list.length)];
  },

  _esc(str) {
    return String(str).replace(/'/g, "\\'");
  },
};
