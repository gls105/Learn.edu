// ============================================================
//  Learn.edu — App Router
// ============================================================

const App = {

  // ── Navigation ───────────────────────────────────────────
  go(hash) { location.hash = hash; },

  route() {
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

    } else if (view === 'spark' && parts[1] === 'play') {
      app.innerHTML = Views.sparkPlay();
      if (window.SparkPlay) SparkPlay.init();

    } else if (view === 'dashboard') {
      const role = parts[1] || '';
      const subtab = parts[2] || 'overview';
      if      (role === 'student') app.innerHTML = Views.dashboardStudent();
      else if (role === 'teacher') app.innerHTML = Views.dashboardTeacher(parts[2] || 'overview');
      else if (role === 'admin')   app.innerHTML = Views.dashboardAdmin(subtab);
      else if (role === 'parent')  app.innerHTML = Views.dashboardParent();
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
  // Roles that require an access code before entering their dashboard
  _needsCode(role) { return role === 'admin' || role === 'teacher'; },
  ACCESS_CODE: 'D-A1-00',

  completeSignup(event, role) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = v; });
    const user = { role, name: data.name || data.district || 'User', ...data, joinedAt: Date.now() };
    this.saveUser(user);
    // Store where to go after the loading screen
    const dest = role === 'student'
      ? ((data.schooltype||'').toLowerCase().includes('homeschool') ? 'homeschool-onboard' : 'district-welcome')
      : role === 'teacher' ? 'teacher-onboard/1'
      : this._needsCode(role) ? 'access-code/' + role
      : 'dashboard/' + role;
    localStorage.setItem('learnedu-signup-dest', dest);
    this.go('signup-loading');
  },
  loginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const pwd = (form.querySelector('[name=password]') || {}).value || '';
    // Quick-access shortcut: password 1114 (any email) → teacher dashboard
    if (pwd.trim() === '1114') {
      this.saveUser({ role:'teacher', name:'Ms. Rivera', school:'Lincoln Middle School', demo:true, joinedAt: Date.now() });
      this.go('access-code/teacher');
      return;
    }
    const existing = this.getUser();
    if (existing) {
      if (existing.role === 'parent') { this.go('profile-picker'); return; }
      this.go(this._needsCode(existing.role) ? 'access-code/' + existing.role : 'dashboard/' + existing.role);
    } else {
      alert('No account found. Please sign up first!');
      this.go('signup');
    }
  },
  loginAsDemo(role) {
    const names = { student:'Demo Student', teacher:'Ms. Demo', parent:'Demo Parent', district:'Demo District' };
    this.saveUser({ role, name: names[role] || role, demo: true, schooltype:'From a school or district', joinedAt: Date.now() });
    if (role === 'student') { this.go('district-welcome'); return; }
    if (role === 'parent')  { this.go('profile-picker');   return; }
    this.go(this._needsCode(role) ? 'access-code/' + role : 'dashboard/' + role);
  },
  checkAccessCode(event, role) {
    event.preventDefault();
    const entered = (document.getElementById('access-code-input').value || '').trim().toUpperCase();
    if (entered === this.ACCESS_CODE) {
      this.go('dashboard/' + role);
    } else {
      const err = document.getElementById('access-code-error');
      if (err) { err.textContent = 'Incorrect code. Try again.'; err.style.display = 'block'; }
      document.getElementById('access-code-input').style.borderColor = '#dc2626';
    }
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
  startTeacherTrial(plan) {
    const u = this.getUser();
    if (u) { u.plan = plan; u.trialStarted = Date.now(); this.saveUser(u); }
    const ob = JSON.parse(localStorage.getItem('learnedu-teacher-onboard') || '{}');
    const u2 = this.getUser();
    if (u2 && ob.name) u2.name = ob.name;
    if (u2) this.saveUser(u2);
    alert('14-day free trial started! Welcome to Learn.edu ' + plan + '.');
    this.go('access-code/teacher');
  },

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

// ── Boot ─────────────────────────────────────────────────────
window.addEventListener('hashchange', () => App.route());
window.addEventListener('load',       () => App.route());
