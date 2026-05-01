// ============================================================
//  Learn.edu — App Router
// ============================================================

const App = {

  // ── Navigation ───────────────────────────────────────────
  go(hash) { location.hash = hash; },

  route() {
    // Remove per-route classes on every route change
    document.getElementById('app')?.classList.remove('sh-full', 'admin-full');
    const raw   = location.hash.slice(1) || 'home';
    const parts = raw.split('/');
    const view  = parts[0];
    const app   = document.getElementById('app');

    if (view === 'home' || !view) {
      app.innerHTML = Views.home();

    } else if (view === 'subject') {
      const [, subject, levelOrGrade] = parts;
      const level = subject === 'math'
        ? (parseInt(levelOrGrade) || 4)
        : (levelOrGrade || (subject === 'spanish' ? 'beginning' : subject === 'ela' ? 'beginning' : subject === 'history' ? 'ancient' : 'earth'));
      app.innerHTML = Views.subject(subject, level);

    } else if (view === 'lesson') {
      const lessonId = parts.slice(1).join('/');
      const all = [
        ...(typeof MATH_LESSONS    !== 'undefined' ? MATH_LESSONS    : []),
        ...(typeof SCIENCE_LESSONS !== 'undefined' ? SCIENCE_LESSONS : []),
        ...(typeof SPANISH_LESSONS !== 'undefined' ? SPANISH_LESSONS : []),
        ...(typeof ELA_LESSONS     !== 'undefined' ? ELA_LESSONS     : []),
        ...(typeof HISTORY_LESSONS !== 'undefined' ? HISTORY_LESSONS : []),
      ];
      const lesson = all.find(l => l.id === lessonId);
      if (!lesson) { app.innerHTML = Views.notFound(); return; }
      app.innerHTML = Views.lessonShell(lesson);
      LessonPlayer.init(lessonId);

    } else if (view === 'search') {
      const query = decodeURIComponent(parts.slice(1).join('/') || '');
      app.innerHTML = Views.search(query);
      // Keep focus in input after re-render
      setTimeout(() => {
        const inp = document.getElementById('search-input');
        if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
      }, 30);
      return; // skip scroll-to-top so typing stays smooth

    } else if (view === 'teacher') {
      const classIdx = parseInt(parts[1] || '0');
      app.innerHTML = Views.teacher(classIdx);

    } else if (view === 'assessment') {
      const classIdx = parseInt(parts[1] || '0');
      app.innerHTML = Views.assessment(classIdx);

    } else if (view === 'rewards') {
      app.innerHTML = Views.rewards();

    } else if (view === 'game') {
      const gameId = parts[1] || '';
      if (gameId === 'mathblast') {
        app.innerHTML = Views.game('mathblast');
        MathBlast.init();
      } else if (gameId === 'wordrush') {
        app.innerHTML = Views.game('wordrush');
        WordRush.init();
      } else {
        app.innerHTML = Views.rewards();
      }

    } else if (view === 'spark' && parts[1] === 'play') {
      app.innerHTML = Views.sparkPlay();
      if (window.SparkPlay) SparkPlay.init();

    } else if (view === 'dashboard') {
      const role = parts[1] || '';
      const subtab = parts[2] || 'overview';
      if      (role === 'student') app.innerHTML = Views.dashboardStudent();
      else if (role === 'teacher') { app.classList.add('admin-full'); app.innerHTML = Views.dashboardTeacher(parts[2] || 'overview'); }
      else if (role === 'admin')   { app.classList.add('admin-full'); app.innerHTML = Views.dashboardAdmin(subtab); }
      else if (role === 'parent')  { app.classList.add('admin-full'); app.innerHTML = Views.dashboardParent(); }
      else                         app.innerHTML = Views.dashboardPicker();

    } else if (view === 'signup') {
      const step = parts[1] || 'role';
      const role = parts[2] || '';
      app.innerHTML = Views.signup(step, role);

    } else if (view === 'login') {
      app.innerHTML = Views.login();

    } else if (view === 'plans') {
      app.innerHTML = Views.plans();

    } else if (view === 'access-code') {
      const role = parts[1] || 'teacher';
      app.innerHTML = Views.accessCode(role);

    } else if (view === 'study') {
      if (!parts[1]) {
        app.innerHTML = Views.studyHub();
      } else if (!parts[2]) {
        app.innerHTML = Views.studyPicker(parts[1]);
      } else {
        const toolId = parts[1];
        const subject = parts[2];
        const levelOrGrade = parts[3] || (subject === 'math' ? '4' : subject === 'science' ? 'earth' : 'beginning');
        const level = subject === 'math' ? (parseInt(levelOrGrade) || 4) : levelOrGrade;
        app.innerHTML = Views.studyTool(toolId, subject, level);
        if ((toolId === 'quiz' || toolId === 'practice' || toolId === 'testprep') && window.__PQQuestions) {
          PracticeQuiz.init(window.__PQQuestions, toolId);
        }
      }
    } else if (view === 'signup-loading') {
      app.innerHTML = Views.signupLoading();

    } else if (view === 'assign') {
      const step = parseInt(parts[1] || '1');
      const subj = parts[2] || '';
      const lvl  = parts[3] || '';
      app.innerHTML = Views.assignCreate(step, subj||undefined, lvl||undefined);

    } else if (view === 'teacher-onboard') {
      const step = parseInt(parts[1] || '1');
      app.innerHTML = Views.teacherOnboard(step);

    } else if (view === 'teacher-pricing') {
      app.innerHTML = Views.teacherPricing();

    } else if (view === 'checkout') {
      const plan = decodeURIComponent(parts[1] || 'Classroom');
      app.innerHTML = Views.checkout(plan);

    } else if (view === 'checkout-success') {
      app.innerHTML = Views.checkoutSuccess();

    } else if (view === 'join-class') {
      app.innerHTML = Views.joinClass();

    } else if (view === 'district-welcome') {
      app.innerHTML = Views.districtWelcome();

    } else if (view === 'homeschool-onboard') {
      const step = parseInt(parts[1] || '1');
      app.innerHTML = Views.homeschoolOnboard(step);

    } else if (view === 'study-plan-loading') {
      app.innerHTML = Views.studyPlanLoading();

    } else if (view === 'study-plan') {
      app.innerHTML = Views.studyPlanView();

    } else if (view === 'profile-picker') {
      app.innerHTML = Views.profilePicker();

    } else if (view === 'roadmap') {
      app.innerHTML = Views.roadmap();

    } else if (view === 'roster-import') {
      app.innerHTML = Views.rosterImport();

    } else {
      app.innerHTML = Views.notFound();
    }

    // Execute any <script> tags injected via innerHTML (they don't auto-run)
    app.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      s.textContent = old.textContent;
      old.parentNode.replaceChild(s, old);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ── User auth (localStorage) ─────────────────────────
  getUser() {
    try { return JSON.parse(localStorage.getItem('learnedu-user') || 'null'); }
    catch { return null; }
  },
  saveUser(user) {
    localStorage.setItem('learnedu-user', JSON.stringify(user));
  },
  logout() {
    if (confirm('Log out of Learn.edu?')) {
      localStorage.removeItem('learnedu-user');
      this.go('home');
    }
  },
  // No access-code gate — real users authenticate via email
  _needsCode(role) { return false; },

  // Generate a deterministic but unique-looking class code from teacher name + school
  generateClassCode(name, school) {
    const str = ((name || '') + (school || '')).toUpperCase().replace(/[^A-Z0-9]/g, '') || 'LEARN';
    let num = 0;
    for (let i = 0; i < str.length; i++) num += str.charCodeAt(i) * (i + 1);
    num = ((num % 9000) + 1000);
    return 'LRN-' + num;
  },

  completeSignup(event, role) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = v; });
    const user = { role, name: data.name || data.district || 'User', email: data.email || '', ...data, joinedAt: Date.now() };
    // Teachers get a unique class code based on their name + school
    if (role === 'teacher') {
      user.classCode = this.generateClassCode(data.name || '', data.school || '');
    }
    // Students who provide a class code join that teacher's class
    if (role === 'student' && data.joinCode) {
      user.joinedClassCode = data.joinCode.trim().toUpperCase();
    }
    this.saveUser(user);
    // Register student in the shared all-students list and tick off roster
    if (role === 'student') {
      const all = JSON.parse(localStorage.getItem('learnedu-all-students') || '[]');
      all.push({ name: user.name, email: user.email, grade: user.grade, joinedClassCode: user.joinedClassCode || null, joinedAt: Date.now() });
      localStorage.setItem('learnedu-all-students', JSON.stringify(all));
      // Tick off roster entry if name matches
      if (user.joinedClassCode) {
        const rKey = 'learnedu-roster-' + user.joinedClassCode;
        const roster = JSON.parse(localStorage.getItem(rKey) || '[]');
        const normalize = s => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
        const matched = roster.find(r => normalize(r.name) === normalize(user.name) && r.status === 'pending');
        if (matched) {
          matched.status = 'joined';
          matched.joinedAt = Date.now();
          matched.studentEmail = user.email || null;
          localStorage.setItem(rKey, JSON.stringify(roster));
        }
      }
    }
    const dest = role === 'student'
      ? 'home'
      : role === 'teacher' ? 'teacher-onboard/1'
      : role === 'parent'  ? 'dashboard/parent'
      : 'dashboard/district';
    localStorage.setItem('learnedu-signup-dest', dest);
    this.go('signup-loading');
  },

  loginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = ((form.querySelector('[name=email]') || {}).value || '').trim().toLowerCase();
    // Dev shortcut: type 4111 as email to jump straight to teacher dashboard
    if (email === '4111') {
      this.saveUser({ role:'teacher', name:'Ms. Rivera', school:'Lincoln Middle School', email:'teacher@learn.edu', classCode:'LRN-4111', joinedAt: Date.now() });
      this.go('dashboard/teacher');
      return;
    }
    const existing = this.getUser();
    // Match by email if available, or fall through if only one account exists on this device
    if (existing && (!email || !existing.email || existing.email.toLowerCase() === email)) {
      if (existing.role === 'parent') { this.go('profile-picker'); return; }
      this.go('dashboard/' + existing.role);
      return;
    }
    document.getElementById('login-error') && (document.getElementById('login-error').style.display = 'block');
  },

  checkAccessCode(event, role) {
    // Legacy fallback — no longer used in normal flow
    event.preventDefault();
    this.go('dashboard/' + role);
  },

  startTeacherTrial(plan) {
    this.go('checkout/' + encodeURIComponent(plan));
  },

  submitCheckout(event, plan) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = v; });
    const u = this.getUser() || {};
    u.plan = plan;
    u.planActive = true;
    u.trialStarted = Date.now();
    if (data.email) u.email = data.email;
    if (data.name)  u.name  = data.name;
    if (data.school) u.school = data.school;
    if (!u.role) u.role = 'teacher';
    if (!u.classCode) u.classCode = this.generateClassCode(u.name || '', u.school || '');
    this.saveUser(u);
    this.go('checkout-success');
  },

  // ── Roster Import ─────────────────────────────────────
  parseRosterText(text) {
    return text.split(/[\n,;]+/)
      .map(s => s.trim().replace(/^["']|["']$/g, ''))
      .filter(s => s.length > 2 && s.length < 60);
  },

  saveRoster(names) {
    const u = this.getUser();
    if (!u || !u.classCode) return;
    const existing = JSON.parse(localStorage.getItem('learnedu-roster-' + u.classCode) || '[]');
    const existingNames = new Set(existing.map(r => r.name.toLowerCase()));
    const newEntries = names
      .filter(n => !existingNames.has(n.toLowerCase()))
      .map(n => ({ name: n, status: 'pending', joinedAt: null, studentEmail: null }));
    const roster = [...existing, ...newEntries];
    localStorage.setItem('learnedu-roster-' + u.classCode, JSON.stringify(roster));
    return roster;
  },

  getRoster(classCode) {
    return JSON.parse(localStorage.getItem('learnedu-roster-' + classCode) || '[]');
  },

  importRosterSubmit(event) {
    event.preventDefault();
    const textarea = document.getElementById('roster-input');
    const text = (textarea && textarea.value) || '';
    const names = this.parseRosterText(text);
    if (names.length === 0) {
      alert('No names found. Paste one name per line.');
      return;
    }
    this.saveRoster(names);
    this.go('dashboard/teacher/roster');
  },

  handleRosterCSV(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const names = this.parseRosterText(text);
      const ta = document.getElementById('roster-input');
      if (ta) ta.value = names.join('\n');
      // Switch to paste tab
      document.getElementById('roster-tab-paste') && document.getElementById('roster-tab-paste').click();
    };
    reader.readAsText(file);
  },

  joinClass(event) {
    event.preventDefault();
    const code = (document.getElementById('join-class-input').value || '').trim().toUpperCase();
    if (!code.match(/^LRN-\d{4}$/)) {
      const err = document.getElementById('join-class-error');
      if (err) { err.textContent = 'Invalid code format — should look like LRN-1234'; err.style.display = 'block'; }
      return;
    }
    const u = this.getUser();
    if (u) {
      u.joinedClassCode = code;
      this.saveUser(u);
      // Update shared roster too
      const all = JSON.parse(localStorage.getItem('learnedu-all-students') || '[]');
      const idx = all.findIndex(s => s.email && u.email && s.email === u.email);
      if (idx >= 0) { all[idx].joinedClassCode = code; }
      else { all.push({ name: u.name, email: u.email || '', grade: u.grade, joinedClassCode: code, joinedAt: Date.now() }); }
      localStorage.setItem('learnedu-all-students', JSON.stringify(all));
    }
    this.go('home');
  },

  saveOnboardStep(event, step) {
    event.preventDefault();
    const form = event.target;
    const saved = JSON.parse(localStorage.getItem('learnedu-onboard') || '{}');
    new FormData(form).forEach((v, k) => { saved[k] = v; });
    localStorage.setItem('learnedu-onboard', JSON.stringify(saved));
    const totalSteps = 5;
    if (step < totalSteps) {
      this.go('homeschool-onboard/' + (step + 1));
    } else {
      // Done — generate study plan
      this.go('study-plan-loading');
    }
  },
  pickProfile(dest) {
    this.go(dest);
  },

  saveTeacherStep(event, step) {
    event.preventDefault();
    const form = event.target;
    const saved = JSON.parse(localStorage.getItem('learnedu-teacher-onboard') || '{}');
    new FormData(form).forEach((v, k) => { saved[k] = v; });
    localStorage.setItem('learnedu-teacher-onboard', JSON.stringify(saved));
    // Also update user name from step 1
    if (step === 1 && saved.name) {
      const u = this.getUser();
      if (u) { u.name = saved.name; u.school = saved.school; this.saveUser(u); }
    }
    const totalSteps = 4;
    if (step < totalSteps) {
      this.go('teacher-onboard/' + (step + 1));
    } else {
      this.go('teacher-pricing');
    }
  },
  // startTeacherTrial is defined above (navigates to checkout)

  proceedAssign(subject, level) {
    const boxes = document.querySelectorAll('[data-id]:checked');
    if (!boxes.length) { alert('Please select at least one lesson.'); return; }
    const titles = Array.from(boxes).map(b => b.dataset.title);
    sessionStorage.setItem('learnedu-assign-pending', JSON.stringify(titles));
    sessionStorage.setItem('learnedu-assign-subject', subject);
    sessionStorage.setItem('learnedu-assign-level', String(level));
    this.go('assign/3/' + subject + '/' + level);
  },
  confirmAssign(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    new FormData(form).forEach((v,k) => { data[k] = v; });
    const titles = JSON.parse(sessionStorage.getItem('learnedu-assign-pending') || '[]');
    const subject = sessionStorage.getItem('learnedu-assign-subject') || 'Math';
    const colors = {math:'#E8562A',science:'#059669',spanish:'#7c3aed',ela:'#0369a1',history:'#d97706'};
    const saved = JSON.parse(localStorage.getItem('learnedu-teacher-assignments') || '[]');
    titles.forEach(title => {
      saved.push({
        id: 'a' + Date.now() + Math.random().toString(36).slice(2,5),
        title, subject: subject.charAt(0).toUpperCase()+subject.slice(1),
        due: data.due || 'TBD', periods: [data.period || 'All Periods'],
        completed: 0, total: 8,
        color: colors[subject] || '#E8562A', link: 'subject/' + subject + '/4'
      });
    });
    localStorage.setItem('learnedu-teacher-assignments', JSON.stringify(saved));
    sessionStorage.removeItem('learnedu-assign-pending');
    alert('Lessons assigned successfully!');
    this.go('dashboard/teacher/assignments');
  },
  submitSparkRequest(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    new FormData(form).forEach((v,k) => { data[k] = v; });
    const saved = JSON.parse(localStorage.getItem('learnedu-spark-requests') || '[]');
    saved.push({ ...data, status: 'Pending', submittedAt: Date.now() });
    localStorage.setItem('learnedu-spark-requests', JSON.stringify(saved));
    alert('Request submitted! Your admin will review it.');
    this.go('dashboard/teacher/spark');
  },

  importCSV(input, periodId) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const rows = e.target.result.split(String.fromCharCode(10)).filter(r=>r.trim()).slice(1);
      const count = rows.length;
      alert('CSV import preview: ' + count + ' students found. Full import available in Learn Pro.');
    };
    reader.readAsText(file);
  },
  saveEditPlan(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = v; });
    const ob = JSON.parse(localStorage.getItem('learnedu-onboard') || '{}');
    ob.math_level_override = parseInt(data.mathGrade);
    ob.sci_level_override  = data.sciLevel;
    ob.spa_level_override  = data.spaLevel;
    localStorage.setItem('learnedu-onboard', JSON.stringify(ob));
    const u = this.getUser();
    if (u) { u.studyPlan = { mathGrade: parseInt(data.mathGrade), sciLevel: data.sciLevel, spaLevel: data.spaLevel, editedAt: Date.now() }; this.saveUser(u); }
    document.getElementById('ep').style.display = 'none';
    this.go('study-plan');
  },

  // ── Progress (localStorage) ───────────────────────────────
  getProgress() {
    try { return JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); }
    catch { return {}; }
  },

  markComplete(lessonId, score) {
    const p = this.getProgress();
    p[lessonId] = { completed: true, score, date: Date.now() };
    localStorage.setItem('learnedu-progress', JSON.stringify(p));
  },

  isComplete(lessonId) {
    return !!this.getProgress()[lessonId]?.completed;
  },
};

// ── Global helpers ─────────────────────────────────────
function filterSpark(subj) {
  document.querySelectorAll('.spark-q-row').forEach(el => {
    el.style.display = (subj === 'all' || el.dataset.subj === subj) ? '' : 'none';
  });
  document.querySelectorAll('.spark-filter-btn').forEach(el => {
    const isActive = el.dataset.filter === subj;
    el.classList.toggle('active', isActive);
  });
}

// ── Spark Dev Shortcut (⁠input box on spark page) ────────────────────
const SparkDev = {
  run(code) {
    const val = (code || '').trim();
    if (val === '1114') {
      // Hide the bar, skip to results
      const bar = document.getElementById('spark-dev-bar');
      if (bar) bar.style.display = 'none';
      if (window.SparkPlay && typeof SparkPlay.skipToResults === 'function') {
        SparkPlay.skipToResults();
      } else {
        alert('SparkPlay not loaded yet — wait for the quiz to fully load first.');
      }
    } else if (val) {
      // Wrong code — flash the input red
      const inp = document.getElementById('spark-dev-input');
      if (inp) {
        inp.style.borderColor = '#dc2626';
        inp.style.background = '#fee2e2';
        setTimeout(() => { inp.style.borderColor = ''; inp.style.background = ''; inp.value = ''; }, 800);
      }
    }
  },
};

// ── Dev Panel (passcode: 1114) ───────────────────────────────
const DevPanel = {
  _seq: '',
  _code: '1114',

  _createFAB() {
    const fab = document.createElement('button');
    fab.id = 'dev-fab';
    fab.setAttribute('aria-label', 'Open Dev Panel');
    fab.innerHTML = '🛠️';
    fab.onclick = () => DevPanel.show();
    document.body.appendChild(fab);
  },

  init() {
    this._createFAB();
    // Listen for keystrokes globally — detect '1114' sequence
    document.addEventListener('keydown', (e) => {
      // Only track digit keys; reset on any non-digit
      if (e.key >= '0' && e.key <= '9') {
        this._seq += e.key;
        // Keep only last 4 chars
        if (this._seq.length > 4) this._seq = this._seq.slice(-4);
        if (this._seq === this._code) {
          this._seq = '';
          // On Spark page: skip to results instead of opening dev panel
          const onSpark = location.hash.startsWith('#spark/play');
          if (onSpark && window.SparkPlay) {
            SparkPlay.skipToResults();
          } else {
            this.show();
          }
        }
      } else if (!['Shift','Meta','Control','Alt','CapsLock','Tab'].includes(e.key)) {
        this._seq = '';
      }
    });
  },

  show() {
    document.getElementById('dev-panel')?.remove();
    const panel = document.createElement('div');
    panel.id = 'dev-panel';
    panel.innerHTML = `
      <div id="dev-panel-backdrop" onclick="DevPanel.hide()"></div>
      <div id="dev-panel-tray">
        <div class="dev-panel-header">
          <div>
            <div class="dev-panel-title">🛠️ Dev Panel</div>
            <div class="dev-panel-sub">Jump to any dashboard instantly</div>
          </div>
          <button class="dev-panel-close" onclick="DevPanel.hide()">✕</button>
        </div>
        <div class="dev-panel-grid">
          <button class="dev-role-btn dev-student" onclick="DevPanel.enter('student')">
            <span class="dev-role-icon">🎒</span>
            <span class="dev-role-name">Student</span>
            <span class="dev-role-desc">Grade 6 demo</span>
          </button>
          <button class="dev-role-btn dev-parent" onclick="DevPanel.enter('parent')">
            <span class="dev-role-icon">👨‍👧</span>
            <span class="dev-role-name">Parent</span>
            <span class="dev-role-desc">Family dashboard</span>
          </button>
          <button class="dev-role-btn dev-teacher" onclick="DevPanel.enter('teacher')">
            <span class="dev-role-icon">🏫</span>
            <span class="dev-role-name">Teacher</span>
            <span class="dev-role-desc">Class view</span>
          </button>
          <button class="dev-role-btn dev-admin" onclick="DevPanel.enter('admin')">
            <span class="dev-role-icon">⚙️</span>
            <span class="dev-role-name">Admin</span>
            <span class="dev-role-desc">District admin</span>
          </button>
        </div>
        <div style="text-align:center;margin-top:12px">
          <button class="dev-logout-btn" onclick="DevPanel.logout()">🚪 Log Out &amp; Clear All</button>
        </div>
        <div class="dev-panel-hint">Type <strong>1114</strong> anywhere to open this panel</div>
      </div>
    `;
    document.body.appendChild(panel);
    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.querySelector('#dev-panel-tray').classList.add('dev-panel-open');
        panel.querySelector('#dev-panel-backdrop').classList.add('dev-panel-backdrop-show');
      });
    });
  },

  hide() {
    const panel = document.getElementById('dev-panel');
    if (!panel) return;
    const tray = panel.querySelector('#dev-panel-tray');
    const backdrop = panel.querySelector('#dev-panel-backdrop');
    tray.classList.remove('dev-panel-open');
    backdrop.classList.remove('dev-panel-backdrop-show');
    setTimeout(() => panel.remove(), 350);
  },

  enter(role) {
    const names = { student: 'Martin', parent: 'Demo Parent', teacher: 'Ms. Rivera', admin: 'Admin Demo' };
    const schools = { student: 'Lincoln Middle School', parent: '', teacher: 'Lincoln Middle School', admin: 'Lincoln District' };
    App.saveUser({
      role,
      name: names[role] || role,
      school: schools[role] || '',
      demo: true,
      devShortcut: true,
      joinedAt: Date.now(),
    });
    this.hide();
    setTimeout(() => {
      if (role === 'student') { App.go('home'); return; }
      if (role === 'parent')  { App.go('dashboard/parent'); return; }
      App.go('dashboard/' + role);
    }, 200);
  },

  logout() {
    localStorage.removeItem('learnedu-user');
    localStorage.removeItem('learnedu-progress');
    localStorage.removeItem('learnedu-onboard');
    this.hide();
    setTimeout(() => App.go('home'), 200);
  },
};

// ── Practice Quiz Engine ─────────────────────────────────
const PracticeQuiz = {
  _qs: [], _idx: 0, _correct: 0, _answered: false, _color: '#E8562A',

  init(questions, mode) {
    this._qs = questions;
    this._idx = 0;
    this._correct = 0;
    this._answered = false;
    this._color = mode === 'practice' ? '#059669' : mode === 'testprep' ? '#7c3aed' : '#E8562A';
    this.render();
  },

  render() {
    if (this._idx >= this._qs.length) { this.showResults(); return; }
    const q = this._qs[this._idx];
    const card = document.getElementById('pq-card');
    const status = document.getElementById('pq-status');
    const btnRow = document.getElementById('pq-btn-row');
    const scoreBar = document.getElementById('pq-score-bar');
    if (!card) return;
    this._answered = false;
    status.textContent = 'Question ' + (this._idx + 1) + ' of ' + this._qs.length;
    scoreBar.textContent = this._correct + ' correct';
    const tag = q.lessonTitle ? `<div style="font-size:0.7rem;color:#9ca3af;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.04em">${q.lessonTitle}</div>` : '';
    if (q.type === 'multiple' && q.choices) {
      card.innerHTML = tag + `<p style="font-size:1rem;font-weight:800;line-height:1.5;margin:0 0 20px">${q.q}</p>` +
        `<div style="display:flex;flex-direction:column;gap:10px">` +
        q.choices.map(c =>
          `<button onclick="PracticeQuiz.checkAnswer(this,'${c.replace(/'/g,"\\'").replace(/"/g,'&quot;')}','${String(q.answer).replace(/'/g,"\\'").replace(/"/g,'&quot;')}')" style="background:#f9fafb;border:2px solid #e5e7eb;border-radius:12px;padding:13px 16px;font-size:0.92rem;font-weight:700;cursor:pointer;font-family:inherit;text-align:left;transition:all 0.15s">${c}</button>`
        ).join('') + `</div>`;
      btnRow.innerHTML = '';
    } else {
      card.innerHTML = tag + `<p style="font-size:1rem;font-weight:800;line-height:1.5;margin:0 0 16px">${q.q}</p>` +
        `<input id="pq-fill" placeholder="Type your answer..." style="width:100%;border:2px solid #e5e7eb;border-radius:12px;padding:13px 14px;font-size:1rem;font-family:inherit;outline:none;box-sizing:border-box" onkeydown="if(event.key==='Enter')PracticeQuiz.submitFill()">`;
      btnRow.innerHTML = `<button onclick="PracticeQuiz.submitFill()" style="background:${this._color};color:white;border:none;border-radius:12px;padding:12px 28px;font-weight:800;font-size:0.92rem;cursor:pointer;font-family:inherit">Check ✓</button>`;
      setTimeout(() => document.getElementById('pq-fill')?.focus(), 50);
    }
  },

  checkAnswer(btn, chosen, correct) {
    if (this._answered) return;
    this._answered = true;
    const right = chosen.trim().toLowerCase() === correct.trim().toLowerCase();
    if (right) {
      this._correct++;
      btn.style.background = '#dcfce7'; btn.style.borderColor = '#059669'; btn.style.color = '#166534';
    } else {
      btn.style.background = '#fee2e2'; btn.style.borderColor = '#dc2626'; btn.style.color = '#991b1b';
      document.querySelectorAll('#pq-card button').forEach(b => {
        if (b.textContent.trim().toLowerCase() === correct.trim().toLowerCase()) {
          b.style.background = '#dcfce7'; b.style.borderColor = '#059669'; b.style.color = '#166534';
        }
      });
    }
    document.getElementById('pq-score-bar').textContent = this._correct + ' correct';
    document.getElementById('pq-btn-row').innerHTML =
      `<button onclick="PracticeQuiz.next()" style="background:${this._color};color:white;border:none;border-radius:12px;padding:12px 28px;font-weight:800;font-size:0.92rem;cursor:pointer;font-family:inherit">${this._idx + 1 < this._qs.length ? 'Next →' : 'See Results 🎉'}</button>`;
  },

  submitFill() {
    if (this._answered) return;
    this._answered = true;
    const inp = document.getElementById('pq-fill');
    const val = (inp ? inp.value : '').trim();
    const q = this._qs[this._idx];
    const right = val.toLowerCase() === String(q.answer).toLowerCase();
    if (right) {
      this._correct++;
      inp.style.borderColor = '#059669'; inp.style.background = '#f0fdf4';
    } else {
      inp.style.borderColor = '#dc2626'; inp.style.background = '#fef2f2';
      const hint = document.createElement('div');
      hint.style.cssText = 'color:#dc2626;font-size:0.82rem;font-weight:700;margin-top:8px';
      hint.textContent = '✓ Correct answer: ' + q.answer;
      inp.parentNode.appendChild(hint);
    }
    document.getElementById('pq-score-bar').textContent = this._correct + ' correct';
    document.getElementById('pq-btn-row').innerHTML =
      `<button onclick="PracticeQuiz.next()" style="background:${this._color};color:white;border:none;border-radius:12px;padding:12px 28px;font-weight:800;font-size:0.92rem;cursor:pointer;font-family:inherit">${this._idx + 1 < this._qs.length ? 'Next →' : 'See Results 🎉'}</button>`;
  },

  next() { this._idx++; this.render(); },

  showResults() {
    const pct = Math.round(this._correct / this._qs.length * 100);
    const icon  = pct>=90?'🏆':pct>=80?'🚀':pct>=65?'🎯':pct>=50?'🔭':'🌱';
    const label = pct>=90?'Champion':pct>=80?'Trailblazer':pct>=65?'Achiever':pct>=50?'Explorer':'Seedling';
    const color = pct>=90?'#7c3aed':pct>=80?'#E8562A':pct>=65?'#059669':pct>=50?'#0369a1':'#d97706';
    const root  = document.getElementById('pq-root');
    if (!root) return;
    root.innerHTML = `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:4rem;margin-bottom:12px">${icon}</div>
        <div style="font-size:3rem;font-weight:900;color:${color};letter-spacing:-2px">${pct}%</div>
        <div style="font-size:1.2rem;font-weight:800;color:${color};margin:6px 0">${label}</div>
        <div style="font-size:0.92rem;color:#6b7280;margin-bottom:28px">${this._correct} of ${this._qs.length} correct</div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button onclick="App.go('home')" style="background:#f3f4f6;color:#374151;border:none;border-radius:12px;padding:13px 22px;font-weight:800;cursor:pointer;font-family:inherit">← Home</button>
          <button onclick="history.go(0)" style="background:${this._color};color:white;border:none;border-radius:12px;padding:13px 22px;font-weight:800;cursor:pointer;font-family:inherit">🔄 Try Again</button>
          <button onclick="App.go('study')" style="background:#7c3aed;color:white;border:none;border-radius:12px;padding:13px 22px;font-weight:800;cursor:pointer;font-family:inherit">📚 Study Tools</button>
        </div>
      </div>`;
  },
};
window.PracticeQuiz = PracticeQuiz;

// ── Modal Helper ────────────────────────────────────────────
const Modal = {
  show(titleText, bodyHtml, actions = []) {
    document.getElementById('__modal')?.remove();
    const m = document.createElement('div');
    m.id = '__modal';
    const btns = actions.map(a =>
      `<button onclick="${a.fn}" style="background:${a.color||'#E8562A'};color:white;border:none;border-radius:10px;padding:10px 22px;font-weight:800;font-size:0.88rem;cursor:pointer;font-family:inherit">${a.label}</button>`
    ).join('');
    m.innerHTML = `
      <div onclick="Modal.close()" style="position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9990"></div>
      <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;border-radius:20px;padding:28px;max-width:480px;width:92vw;z-index:9991;box-shadow:0 20px 60px rgba(0,0,0,0.25);max-height:85vh;overflow-y:auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
          <div style="font-size:1.05rem;font-weight:900">${titleText}</div>
          <button onclick="Modal.close()" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:#9ca3af;padding:4px 8px">✕</button>
        </div>
        ${bodyHtml}
        ${btns ? `<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;flex-wrap:wrap">
          <button onclick="Modal.close()" style="background:#f3f4f6;color:#374151;border:none;border-radius:10px;padding:10px 18px;font-weight:700;font-size:0.88rem;cursor:pointer;font-family:inherit">Cancel</button>
          ${btns}
        </div>` : ''}
      </div>`;
    document.body.appendChild(m);
  },
  close() { document.getElementById('__modal')?.remove(); },
  field(label, type = 'text', placeholder = '', extra = '') {
    return `<div style="margin-bottom:14px"><label style="display:block;font-size:0.78rem;font-weight:800;color:#374151;margin-bottom:5px">${label}</label><input type="${type}" placeholder="${placeholder}" ${extra} style="width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:0.88rem;font-family:inherit;outline:none;box-sizing:border-box"></div>`;
  },
  select(label, options) {
    return `<div style="margin-bottom:14px"><label style="display:block;font-size:0.78rem;font-weight:800;color:#374151;margin-bottom:5px">${label}</label><select style="width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:0.88rem;font-family:inherit;outline:none;background:white;box-sizing:border-box">${options.map(o=>`<option>${o}</option>`).join('')}</select></div>`;
  },
  toast(msg, color = '#059669') {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:${color};color:white;padding:11px 22px;border-radius:12px;font-weight:800;font-size:0.88rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.2);transition:opacity 0.4s`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 2200);
  },
};
window.Modal = Modal;

// ── Boot ─────────────────────────────────────────────────────
window.addEventListener('hashchange', () => App.route());
window.addEventListener('load', () => {
  if (typeof XP !== 'undefined') XP.init();
  DevPanel.init();
  App.route();
});
