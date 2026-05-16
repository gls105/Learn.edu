// ============================================================
//  Learn.edu — Views
//  Renders HTML for each screen (home, subject, lesson shell)
// ============================================================

const Views = {

  // ── Shared nav bar ───────────────────────────────────────
  _logoSVG() {
    return `
      <img src="logo.svg" alt="Learn.edu" style="height:36px;width:36px;object-fit:contain;display:block;">
      <span class="logo-wordmark">Learn.edu</span>
    `;
  },

  nav(back = null) {
    const user = App.getUser();
    const left = back
      ? `<button class=\"nav-back\" onclick=\"App.go('${back.hash}')\">${Icons.arrowLeft(15)} ${back.label}</button>`
      : `<a class=\"nav-logo\" href=\"#home\">${this._logoSVG()}</a>`;
    const right = back ? '' : user ? `
      <div style=\"display:flex;align-items:center;gap:8px\">
        <button class=\"nav-icon-btn\" onclick=\"App.go('search/')\" title=\"Search\">
          <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" width=\"18\" height=\"18\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z\"/></svg>
        </button>
        <a href=\"#study\" style=\"font-size:0.82rem;font-weight:700;color:var(--muted);text-decoration:none;margin-left:10px;margin-right:10px\">Study</a>
        <button class=\"nav-back\" onclick=\"App.go('dashboard/${user.role}')\" style=\"border-color:var(--border)\">
          <i class=\"ph-bold ph-squares-four\" style=\"font-size:14px\"></i> Dashboard
        </button>
        <button class=\"xp-hud\" onclick=\"App.go('rewards')\" title=\"Your XP &amp; Rewards\">⚡ 0 XP</button>
        <div style=\"display:flex;align-items:center;gap:6px;background:var(--surface);border:1.5px solid var(--border);border-radius:999px;padding:5px 12px 5px 6px;cursor:pointer\" onclick=\"App.go('dashboard/${user.role}')\">
          <div style=\"width:26px;height:26px;border-radius:50%;background:${user.role==='student'?'#E8562A':user.role==='teacher'?'#059669':user.role==='admin'?'#7c3aed':'#0369a1'};display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;color:white\">${(user.name||user.role)[0].toUpperCase()}</div>
          <span style=\"font-size:0.78rem;font-weight:700;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap\">${user.name||user.role}</span>
        </div>
        <button onclick=\"App.logout()\" style=\"background:none;border:none;font-size:0.75rem;color:var(--muted);cursor:pointer;font-weight:600;padding:4px 8px\">Log out</button>
      </div>` : `
      <div style=\"display:flex;align-items:center;gap:8px\">
        <button class=\"nav-icon-btn\" onclick=\"App.go('search/')\" title=\"Search\">
          <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" width=\"18\" height=\"18\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z\"/></svg>
        </button>
        <a href=\"#study\" style=\"font-size:0.82rem;font-weight:700;color:var(--muted);text-decoration:none;margin-left:10px;margin-right:10px\">Study</a>
        <button class=\"xp-hud\" onclick=\"App.go('rewards')\" title=\"Your XP &amp; Rewards\">⚡ 0 XP</button>
        <a href=\"#plans\" style=\"font-size:0.82rem;font-weight:700;color:var(--muted);text-decoration:none\">Plans</a>
        <button class=\"btn btn-outline\" onclick=\"App.go('login')\" style=\"font-size:0.82rem;padding:7px 16px\">Log In</button>
        <button class=\"btn btn-primary\" onclick=\"App.go('signup')\" style=\"font-size:0.82rem;padding:7px 16px\">Sign Up</button>
      </div>`;
    return `
      <nav class=\"nav\">
        ${left}
        ${right}
      </nav>`;
  },

  // ── Home ─────────────────────────────────────────────────
  home() {
    const _homeUser = App.getUser();
    if (_homeUser && _homeUser.role === 'student') return Views.studentHome();
    const user = App.getUser();
    const progress = App.getProgress();
    const completedCount = Object.values(progress).filter(v => v.completed).length;

    const SUBJECTS = [
      { key:'math',    icon:'📐', name:'Math',           color:'#E8562A', bg:'linear-gradient(135deg,#E8562A,#fb923c)', link:'subject/math/4',              lessons:26, desc:'Algebra, geometry, fractions, calculus prep' },
      { key:'science', icon:'⚗️', name:'Science',        color:'#059669', bg:'linear-gradient(135deg,#059669,#34d399)', link:'subject/science/earth',       lessons:23, desc:'Earth, Life, Physical & Advanced tracks' },
      { key:'spanish', icon:'🌎', name:'Spanish',        color:'#7c3aed', bg:'linear-gradient(135deg,#7c3aed,#a78bfa)', link:'subject/spanish/beginning',   lessons:25, desc:'Beginning through Advanced, verbs to subjunctive' },
      { key:'ela',     icon:'📖', name:'Language Arts',  color:'#0369a1', bg:'linear-gradient(135deg,#0369a1,#38bdf8)', link:'subject/ela/beginning',       lessons:6,  desc:'Grammar, essays, literary devices & analysis' },
      { key:'history', icon:'🏛️', name:'History',        color:'#b45309', bg:'linear-gradient(135deg,#b45309,#fbbf24)', link:'subject/history/ancient',     lessons:7,  desc:'Ancient civilizations, US & World history' },
      { key:'coding', icon:'💻', name:'Coding', color:'#0f172a', bg:'linear-gradient(135deg,#0f172a,#334155)', link:'subject/coding/beginner', lessons:8, desc:'HTML, CSS, Python & JavaScript fundamentals' },
    ];

    // Nav
    const nav = `
      <nav style="display:flex;align-items:center;justify-content:space-between;padding:18px 40px;border-bottom:1px solid #f0f0f0;background:white;position:sticky;top:0;z-index:10">
        <div style="display:flex;align-items:center;gap:10px">
          <img src="logo.svg" alt="Learn.edu" style="height:36px;width:36px;object-fit:contain;display:block">
          <span style="font-weight:900;font-size:1rem;letter-spacing:-0.3px">Learn.edu</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <a href="#study"   style="font-size:0.85rem;font-weight:600;color:#374151;text-decoration:none;padding:7px 14px;border-radius:8px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''">Study Tools</a>
          <a href="#spark/play" style="font-size:0.85rem;font-weight:700;color:#7c3aed;text-decoration:none;padding:7px 14px;border-radius:8px;background:#f5f3ff" onmouseover="this.style.background='#ede9fe'" onmouseout="this.style.background='#f5f3ff'">⚡ Spark</a>
          <a href="#plans"   style="font-size:0.85rem;font-weight:600;color:#374151;text-decoration:none;padding:7px 14px;border-radius:8px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''">Pricing</a>
          <a href="#roadmap" style="font-size:0.85rem;font-weight:600;color:#374151;text-decoration:none;padding:7px 14px;border-radius:8px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''">Roadmap</a>
          <div style="width:1px;height:20px;background:#e5e7eb;margin:0 4px"></div>
          ${user
            ? `<div onclick="App.go('dashboard/${user.role}')" style="display:flex;align-items:center;gap:7px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:999px;padding:5px 14px 5px 8px;cursor:pointer"><div style="width:24px;height:24px;border-radius:50%;background:#E8562A;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;color:white">${(user.name||'U')[0].toUpperCase()}</div><span style="font-size:0.82rem;font-weight:700">${user.name||'Account'}</span></div>`
            : `<button onclick="App.go('login')" style="font-size:0.85rem;font-weight:700;color:#374151;background:none;border:none;cursor:pointer;padding:7px 14px">Sign In</button>
               <button onclick="App.go('signup')" style="background:#E8562A;color:white;border:none;border-radius:10px;padding:8px 18px;font-size:0.85rem;font-weight:800;cursor:pointer;font-family:inherit">Get Started</button>`
          }
        </div>
      </nav>`;

    // Hero
    const hero = `
      <div style="text-align:center;padding:80px 24px 60px;max-width:720px;margin:0 auto">
        <div style="display:inline-block;background:#fff3ef;border:1.5px solid #fddacf;border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:800;color:#E8562A;margin-bottom:20px;letter-spacing:0.02em">
          Free forever · No account needed · 80+ lessons
        </div>
        <h1 class="home-headline" style="font-size:3.8rem;margin-bottom:16px;color:#111">
          The easiest way<br>to learn, anything.
        </h1>
        <p style="font-size:1.1rem;color:#6b7280;font-weight:500;margin-bottom:32px;line-height:1.6;max-width:480px;margin-left:auto;margin-right:auto">
          Short, focused lessons in Math, Science, Spanish, Language Arts, and History. Built for grades 4–12.
        </p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button onclick="App.go('subject/math/4')" style="background:#111;color:white;border:none;border-radius:12px;padding:14px 28px;font-size:0.95rem;font-weight:800;cursor:pointer;font-family:inherit">Start learning free →</button>
          <button onclick="App.go('study')" style="background:white;color:#374151;border:2px solid #e5e7eb;border-radius:12px;padding:14px 24px;font-size:0.95rem;font-weight:700;cursor:pointer;font-family:inherit">Explore Study Tools</button>
        </div>
        ${completedCount > 0 ? `<p style="margin-top:16px;font-size:0.82rem;color:#9ca3af">You've completed <strong style="color:#E8562A">${completedCount}</strong> lesson${completedCount!==1?'s':''} so far. Keep going!</p>` : ''}
      </div>`;

    // Subject topic cards (replacing images in PamPam style)
    const subjectCards = `
      <div style="padding:0 40px 64px">
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:64px">
          ${SUBJECTS.map(s=>`
            <div onclick="App.go('${s.link}')" style="border-radius:20px;background:${s.bg};padding:28px 20px 22px;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;color:white;min-height:180px;display:flex;flex-direction:column;justify-content:space-between" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 16px 40px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
              <div>
                <div style="font-size:2.2rem;margin-bottom:12px">${s.icon}</div>
                <div style="font-size:1.05rem;font-weight:900;margin-bottom:6px">${s.name}</div>
                <div style="font-size:0.75rem;opacity:0.85;font-weight:500;line-height:1.4">${s.desc}</div>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px">
                <span style="font-size:0.72rem;font-weight:800;opacity:0.8">${s.lessons} lessons</span>
                <span style="font-size:1rem;opacity:0.9">→</span>
              </div>
            </div>`).join('')}
        </div>

        <!-- Feature statement -->
        <div style="max-width:680px;margin:0 auto 64px;text-align:left">
          <h2 class="home-headline" style="font-size:2.4rem;margin-bottom:20px;color:#111">
            Learn.edu treats each student<br>as an individual.
          </h2>
          <p style="font-size:1rem;color:#6b7280;line-height:1.7;font-weight:500;margin-bottom:16px">
            Where most platforms push the same content to everyone, Learn.edu adapts. Homeschooled? Get a personalized study plan. In a school district? Your teacher assigns lessons and tracks your progress. Just curious? Start learning in under 10 seconds.
          </p>
          <p style="font-size:1rem;color:#6b7280;line-height:1.7;font-weight:500">
            Every subject. Every level. Free.
          </p>
        </div>

        <!-- Study tools strip -->
        <div style="background:#f9fafb;border-radius:24px;padding:36px 32px;margin-bottom:64px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <h3 style="font-size:1.2rem;font-weight:900;color:#111">5 ways to study</h3>
            <button onclick="App.go('study')" style="background:none;border:none;font-size:0.85rem;font-weight:700;color:#E8562A;cursor:pointer">Explore all →</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">
            ${[
              {e:'⚡',t:'Spark',      d:'Quick assessment',   h:'spark/play'},
              {e:'🃏',t:'Flashcards', d:'Flip & memorize',    h:'study/flashcards'},
              {e:'⚡',t:'Quiz Mode',  d:'Beat the clock',     h:'study/quiz'},
              {e:'✏️',t:'Practice',   d:'Hints available',    h:'study/practice'},
              {e:'📝',t:'Test Prep',  d:'Exam simulation',    h:'study/testprep'},
              {e:'🌍',t:'Real World', d:'Career connections', h:'study/realworld'},
            ].map(t=>`
              <div onclick="App.go('${t.h}')" style="background:white;border:1.5px solid #e5e7eb;border-radius:16px;padding:18px 14px;text-align:center;cursor:pointer;transition:all 0.15s" onmouseover="this.style.borderColor='#E8562A';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#e5e7eb';this.style.transform=''">
                <div style="font-size:1.6rem;margin-bottom:8px">${t.e}</div>
                <div style="font-weight:800;font-size:0.85rem;color:#111;margin-bottom:2px">${t.t}</div>
                <div style="font-size:0.72rem;color:#9ca3af">${t.d}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Roles strip -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:64px">
          ${[
            {e:'🎒',t:'For Students',  d:'Self-paced lessons, study tools, Spark assessments. No account required.',    cta:'Start learning',btn:'#111',          h:'subject/math/4'},
            {e:'📋',t:'For Teachers',  d:'Assign lessons, track class progress, manage periods, spot struggling students.',cta:'Set up classroom',btn:'#059669',   h:'signup/questions/teacher'},
            {e:'🏠',t:'For Parents',   d:'Monitor your child, homeschool study plans, weekly progress reports.',          cta:'Get started',    btn:'#0369a1',      h:'signup/questions/parent'},
          ].map(r=>`
            <div style="background:white;border:1.5px solid #e5e7eb;border-radius:20px;padding:28px 24px">
              <div style="font-size:2rem;margin-bottom:12px">${r.e}</div>
              <h3 style="font-weight:900;font-size:1rem;margin-bottom:8px">${r.t}</h3>
              <p style="font-size:0.85rem;color:#6b7280;line-height:1.5;margin-bottom:16px">${r.d}</p>
              <button onclick="App.go('${r.h}')" style="background:${r.btn};color:white;border:none;border-radius:10px;padding:9px 18px;font-size:0.82rem;font-weight:800;cursor:pointer;font-family:inherit">${r.cta} →</button>
            </div>`).join('')}
        </div>

        <!-- Footer -->
        <div style="border-top:1px solid #f0f0f0;padding-top:28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <img src="logo.svg" alt="Learn.edu" style="height:24px;width:24px;object-fit:contain">
            <span style="font-weight:900;font-size:0.88rem">Learn.edu</span>
            <span style="font-size:0.78rem;color:#9ca3af">· Free forever</span>
          </div>
          <div style="display:flex;gap:16px">
            <a href="#plans"   style="font-size:0.78rem;color:#9ca3af;text-decoration:none" onmouseover="this.style.color='#374151'" onmouseout="this.style.color='#9ca3af'">Pricing</a>
            <a href="#roadmap" style="font-size:0.78rem;color:#9ca3af;text-decoration:none" onmouseover="this.style.color='#374151'" onmouseout="this.style.color='#9ca3af'">Roadmap</a>
            <a href="#study"   style="font-size:0.78rem;color:#9ca3af;text-decoration:none" onmouseover="this.style.color='#374151'" onmouseout="this.style.color='#9ca3af'">Study Tools</a>
          </div>
        </div>
      </div>`;

    return `
      <style>#app{max-width:100%!important;margin:0!important;padding:0!important} #app .nav{display:none!important}</style>
      <div style="background:white;min-height:100vh">
        ${nav}
        ${hero}
        ${subjectCards}
      </div>`;
  },


  subject(subjectKey, activeLevel) {
    const META = {
      math:    { icon: '📐', name: 'Math',                  data: () => MATH_LESSONS,    leveled: false },
      science: { icon: '⚗️', name: 'Science',              data: () => SCIENCE_LESSONS, leveled: true  },
      spanish: { icon: '🌎', name: 'Spanish',              data: () => SPANISH_LESSONS, leveled: true  },
      ela:     { icon: '📚', name: 'Language Arts',        data: () => (typeof ELA_LESSONS     !=='undefined'?ELA_LESSONS    :[]), leveled: true },
      history: { icon: '🏛️', name: 'History',              data: () => (typeof HISTORY_LESSONS !=='undefined'?HISTORY_LESSONS:[]), leveled: true },
      coding:  { icon: '💻', name: 'Coding',               data: () => (typeof CODING_LESSONS  !=='undefined'?CODING_LESSONS :[]), leveled: true },
    };
    const s = META[subjectKey];
    if (!s) return this.notFound();

    const SPANISH_LEVELS = [
      { key:'beginning', label:'Beginning Spanish' },
      { key:'spanish1',  label:'Spanish 1' },
      { key:'spanish2',  label:'Spanish 2' },
      { key:'advanced',  label:'Advanced Spanish' },
    ];
    const SCIENCE_LEVELS = [
      { key:'earth',    label:'Earth Science' },
      { key:'life',     label:'Life Science' },
      { key:'physical', label:'Physical Science' },
      { key:'advanced', label:'Advanced Science' },
    ];
    const ELA_LEVELS = [
      { key:'beginning', label:'Beginning ELA' },
      { key:'ela1',      label:'ELA 1' },
      { key:'ela2',      label:'ELA 2' },
      { key:'advanced',  label:'Advanced ELA' },
    ];
    const HISTORY_LEVELS = [
      { key:'ancient', label:'Ancient History' },
      { key:'us',      label:'U.S. History' },
      { key:'world',   label:'World History' },
      { key:'modern',  label:'Modern History' },
    ];
    const CODING_LEVELS = [
      { key:'beginner',     label:'Beginner' },
      { key:'intermediate', label:'Intermediate' },
      { key:'advanced',     label:'Advanced' },
    ];

    const allLessons = s.data();
    const progress   = App.getProgress();

    let tabs, lessons, emptyMsg, subtitle;

    if (s.leveled) {
      const levelList = subjectKey === 'spanish' ? SPANISH_LEVELS : subjectKey === 'ela' ? ELA_LEVELS : subjectKey === 'history' ? HISTORY_LEVELS : subjectKey === 'coding' ? CODING_LEVELS : SCIENCE_LEVELS;
      tabs = levelList.map(lv => {
        const count = allLessons.filter(l => l.level === lv.key).length;
        const isActive = lv.key === activeLevel;
        return `<button class="grade-tab ${isActive ? 'active' : ''}" onclick="App.go('subject/${subjectKey}/${lv.key}')">${lv.label}${count ? '' : ' 🔒'}</button>`;
      }).join('');
      const activeLevelObj = levelList.find(lv => lv.key === activeLevel) || levelList[0];
      subtitle = activeLevelObj.label;
      lessons = allLessons.filter(l => l.level === activeLevel);
      emptyMsg = `Lessons for ${activeLevelObj.label} are coming soon!`;
    } else {
      // Math: grade-based
      const grade = typeof activeLevel === 'number' ? activeLevel : (parseInt(activeLevel) || 4);
      tabs = [4,5,6,7,8,9].map(g => {
        const count = allLessons.filter(l => l.grade === g).length;
        const locked = count === 0;
        return `<button class="grade-tab ${g === grade ? 'active' : ''}" onclick="App.go('subject/${subjectKey}/${g}')" ${locked ? 'disabled title="Coming soon"' : ''}>Grade ${g}${locked ? ' 🔒' : ''}</button>`;
      }).join('');
      subtitle = `Grade ${grade}`;
      lessons = allLessons.filter(l => l.grade === grade);
      emptyMsg = `Lessons for Grade ${grade} are coming soon!`;
    }

    const cardsHtml = lessons.length === 0
      ? `<div class="empty"><div class="e-icon">🚧</div><p>${emptyMsg}</p></div>`
      : lessons.map(l => {
          const done  = progress[l.id]?.completed;
          const score = progress[l.id]?.score;
          const dots  = [0,1,2].map(i =>
            `<div class="dot ${i < l.difficulty ? 'on' : ''}"></div>`
          ).join('');
          return `
            <div class="lesson-card" onclick="App.go('lesson/${l.id}')">
              <div class="l-icon">${done ? Icons.checkBadge(22) : this._subjectIcon(subjectKey)}</div>
              <div class="l-info">
                <div style="display:flex;align-items:center;gap:7px;margin-bottom:2px">
                  <h3 style="margin:0">${l.title}</h3>
                  ${l.code?`<span class="lesson-code">${l.code}</span>`:''}
                </div>
                <p>${l.subtitle}</p>
              </div>
              <div class="l-meta">
                <span class="duration">${Icons.clock(13)} ${l.duration}</span>
                <div class="difficulty">${dots}</div>
                ${done ? `<span class="xp-badge">${Icons.star(12)} ${score}%</span>` : ''}
              </div>
            </div>`;
        }).join('');

    return `
      ${this.nav({ hash: 'home', label: '← Subjects' })}
      <div class="subject-header">
        ${subjectKey === 'math' ? '<lottie-player src="anim/calculator.json" background="transparent" speed="0.8" style="width:80px;height:80px;margin:0 auto -8px" loop autoplay></lottie-player>' : '<h1 style="font-size:2.4rem">' + s.icon + '</h1>'}
        <h1 style="margin-top:4px">${s.name}</h1>
        <p>${subtitle} · ${lessons.length} lessons available</p>
      </div>
      <div class="grade-tabs">${tabs}</div>
      <div class="lessons-grid">${cardsHtml}</div>
      <div class="plans-promo-banner">
        <span>📚 Goal: 35 lessons per course — more dropping every week</span>
        <button onclick="App.go('plans')">See Learn Pro →</button>
      </div>
    `;
  },

  // ── Lesson shell (player fills this in) ──────────────────
  lessonShell(lesson) {
    const META = {
      math:    { icon: '📐', name: 'Math'    },
      science: { icon: '⚗️', name: 'Science' },
      spanish: { icon: '🌎', name: 'Spanish' },
      ela:     { icon: '📚', name: 'Language Arts' },
      history: { icon: '🏛️', name: 'History' },
      coding:  { icon: '💻', name: 'Coding'  },
    };
    const s = META[lesson.subject] || { icon: '📖', name: lesson.subject };
    const back = lesson.grade
      ? `subject/${lesson.subject}/${lesson.grade}`
      : `subject/${lesson.subject}/${lesson.level || 'beginner'}`;
    const subjectClass = lesson.subject; // math | science | spanish | coding

    return `
      ${this.nav({ hash: back, label: `← ${s.name}` })}
      <div class="lesson-header ${subjectClass}">
        <div class="breadcrumb">${s.icon} ${s.name} &nbsp;·&nbsp; ${lesson.grade ? 'Grade ' + lesson.grade : (lesson.level || '')}</div>
        <h1>${lesson.title}</h1>
        <p class="sub">${lesson.subtitle}</p>
      </div>
      <div id="lesson-steps" class="steps"></div>
      <div class="progress-bar"><div id="lesson-progress" class="progress-fill" style="width:3%"></div></div>
      <div id="lesson-content"></div>
    `;
  },

  // ── 404 ──────────────────────────────────────────────────
  // ── Search ──────────────────────────────────────────────
  search(query = '') {
    const all = [
      ...(typeof MATH_LESSONS    !== 'undefined' ? MATH_LESSONS    : []),
      ...(typeof SCIENCE_LESSONS !== 'undefined' ? SCIENCE_LESSONS : []),
      ...(typeof SPANISH_LESSONS !== 'undefined' ? SPANISH_LESSONS : []),
      ...(typeof ELA_LESSONS     !== 'undefined' ? ELA_LESSONS     : []),
      ...(typeof HISTORY_LESSONS !== 'undefined' ? HISTORY_LESSONS : []),
      ...(typeof CODING_LESSONS  !== 'undefined' ? CODING_LESSONS  : []),
    ];
    const q = query.toLowerCase().trim();
    const results = q.length < 2 ? [] : all.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.topic.toLowerCase().includes(q) ||
      (l.subtitle||'').toLowerCase().includes(q) ||
      l.subject.toLowerCase().includes(q) ||
      (l.code||'').toLowerCase().includes(q) ||
      String(l.grade).includes(q)
    );
    const progress = App.getProgress();
    const cards = results.length === 0
      ? (q.length >= 2
        ? `<div class="empty"><div class="e-icon">🔍</div><p>No results for "${query}"</p></div>`
        : `<div class="empty"><div class="e-icon">🔍</div><p>Search by name, topic, grade, or code like <strong>4-MU</strong></p></div>`)
      : results.map(l => {
          const done = progress[l.id]?.completed;
          const score = progress[l.id]?.score;
          const dots = [0,1,2].map(i=>`<div class="dot ${i<l.difficulty?'on':''}"></div>`).join('');
          const subj = {math:'📐',science:'⚗️',spanish:'🌎'}[l.subject]||'';
          return `
            <div class="lesson-card" onclick="App.go('lesson/${l.id}')">
              <div class="l-icon">${done?Icons.checkBadge(22):this._subjectIcon(l.subject)}</div>
              <div class="l-info">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
                  <h3 style="margin:0">${l.title}</h3>
                  ${l.code?`<span class="lesson-code">${l.code}</span>`:''}
                </div>
                <p>${subj} ${l.subject.charAt(0).toUpperCase()+l.subject.slice(1)} · Grade ${l.grade} · ${l.subtitle}</p>
              </div>
              <div class="l-meta">
                <span class="duration">${Icons.clock(13)} ${l.duration}</span>
                <div class="difficulty">${dots}</div>
                ${done?`<span class="xp-badge">${Icons.star(12)} ${score}%</span>`:''}
              </div>
            </div>`;
        }).join('');
    return `
      ${this.nav({hash:'home',label:'← Home'})}
      <div class="subject-header" style="padding-top:32px">
        <h1>Search Lessons</h1>
        <p style="margin-top:6px">Search by name, topic, grade, or lesson code (e.g. <code class="inline-code">4-MU-1A</code>)</p>
      </div>
      <div class="search-bar-wrap">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="18" height="18" style="flex-shrink:0;color:var(--muted)"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
          <input id="search-input" class="search-input" type="text" value="${query}"
            placeholder="Try &quot;multiplication&quot;, &quot;grade 5&quot;, or &quot;4-LD&quot;…"
            oninput="App.go('search/'+encodeURIComponent(this.value))" autofocus>
          ${q?`<button onclick="App.go('search/')" class="search-clear">×</button>`:''}
        </div>
      </div>
      <div class="lessons-grid" style="margin-top:20px">${cards}</div>`;
  },

  // -- Teacher Dashboard
  teacher(classIdx = 0) {
    const CLASSES = [
      {
        name: "Ms. Rivera - Period 3", code: "LRN-4829", grade: "Mixed 5-6", assignedMin: 60,
        students: [
          {name:"Emma Johnson",    init:"EJ",color:"#818CF8",grade:6,done:8, avg:88,last:"Today",      status:"top",   math:92,sci:84,spa:88,code:"5-FR-1A",mins:54},
          {name:"Liam Martinez",   init:"LM",color:"#34D399",grade:6,done:5, avg:71,last:"Yesterday",  status:"active",math:68,sci:74,spa:71,code:"4-MU-1A",mins:38},
          {name:"Sophia Chen",     init:"SC",color:"#FB923C",grade:6,done:11,avg:94,last:"Today",      status:"top",   math:96,sci:92,spa:94,code:"6-RA-1A",mins:72},
          {name:"Noah Williams",   init:"NW",color:"#60A5FA",grade:5,done:3, avg:62,last:"3 days ago", status:"help",  math:58,sci:66,spa:62,code:"4-LD-1A",mins:18},
          {name:"Ava Thompson",    init:"AT",color:"#F472B6",grade:6,done:9, avg:85,last:"Today",      status:"active",math:88,sci:82,spa:85,code:"5-DE-1A",mins:61},
          {name:"Charlotte Lee",   init:"CL",color:"#38BDF8",grade:6,done:10,avg:91,last:"Today",      status:"top",   math:94,sci:88,spa:91,code:"5-CE-1A",mins:68},
          {name:"Isabella Garcia", init:"IG",color:"#4ADE80",grade:5,done:6, avg:83,last:"Today",      status:"active",math:80,sci:86,spa:83,code:"4-GR-1A",mins:44},
          {name:"Mason Rodriguez", init:"MR",color:"#FACC15",grade:5,done:4, avg:67,last:"4 days ago", status:"help",  math:64,sci:70,spa:67,code:"4-MU-1A",mins:22},
        ]
      },
      {
        name: "Ms. Rivera - Period 5", code: "LRN-7193", grade: "Grade 7", assignedMin: 45,
        students: [
          {name:"Oliver Davis",    init:"OD",color:"#A78BFA",grade:7,done:7, avg:79,last:"Yesterday",  status:"active",math:76,sci:82,spa:79,code:"4-EC-1A",mins:40},
          {name:"Ethan Brown",     init:"EB",color:"#F87171",grade:7,done:2, avg:55,last:"1 week ago", status:"risk",  math:52,sci:58,spa:55,code:"4-LD-1A",mins:8},
          {name:"Mia Patel",       init:"MP",color:"#FCD34D",grade:7,done:9, avg:87,last:"Today",      status:"active",math:90,sci:84,spa:87,code:"6-RA-1A",mins:52},
          {name:"James Wilson",    init:"JW",color:"#86EFAC",grade:7,done:6, avg:74,last:"Yesterday",  status:"active",math:70,sci:78,spa:74,code:"4-EC-1A",mins:35},
          {name:"Luna Torres",     init:"LT",color:"#C084FC",grade:7,done:11,avg:93,last:"Today",      status:"top",   math:95,sci:91,spa:93,code:"6-RA-1A",mins:66},
          {name:"Aiden Scott",     init:"AS",color:"#67E8F9",grade:7,done:3, avg:61,last:"3 days ago", status:"help",  math:58,sci:64,spa:61,code:"4-MU-1A",mins:19},
        ]
      },
      {
        name: "Ms. Rivera - Period 7", code: "LRN-2847", grade: "Grade 8", assignedMin: 90,
        students: [
          {name:"Zoe Anderson",    init:"ZA",color:"#FB923C",grade:8,done:5, avg:76,last:"Today",      status:"active",math:74,sci:78,spa:76,code:"4-EC-1A",mins:55},
          {name:"Ryan Mitchell",   init:"RM",color:"#818CF8",grade:8,done:8, avg:82,last:"Today",      status:"active",math:84,sci:80,spa:82,code:"5-CE-1A",mins:78},
          {name:"Chloe Baker",     init:"CB",color:"#34D399",grade:8,done:12,avg:96,last:"Today",      status:"top",   math:98,sci:94,spa:96,code:"6-RA-1A",mins:91},
          {name:"Dylan Hayes",     init:"DH",color:"#F472B6",grade:8,done:1, avg:48,last:"2 weeks ago",status:"risk",  math:45,sci:51,spa:48,code:"4-MU-1A",mins:4},
          {name:"Nora Fleming",    init:"NF",color:"#60A5FA",grade:8,done:7, avg:80,last:"Yesterday",  status:"active",math:82,sci:78,spa:80,code:"5-FR-1A",mins:62},
        ]
      },
    ];

    const cls      = CLASSES[classIdx] || CLASSES[0];
    const students = cls.students;

    const proficiency = avg =>
      avg >= 90 ? {label:"Advanced",   color:"var(--sci)",   bg:"var(--sci-bg)"}  :
      avg >= 75 ? {label:"Proficient",  color:"#7C3AED",      bg:"#F5F3FF"}        :
      avg >= 60 ? {label:"Developing",  color:"var(--spa)",   bg:"var(--spa-bg)"}  :
                  {label:"Beginner",    color:"var(--error)", bg:"var(--error-bg)"};

    const totalDone   = students.reduce((s,st)=>s+st.done,0);
    const avgScore    = Math.round(students.reduce((s,st)=>s+st.avg,0)/students.length);
    const needHelp    = students.filter(s=>s.status==="help"||s.status==="risk").length;
    const activeToday = students.filter(s=>s.last==="Today").length;
    const avgMins     = Math.round(students.reduce((s,st)=>s+st.mins,0)/students.length);

    const badge = s => ({
      top:   `<span class="ds-badge top">&#9733; Top</span>`,
      active:`<span class="ds-badge active">&#10003; Active</span>`,
      help:  `<span class="ds-badge help">&#9888; Help</span>`,
      risk:  `<span class="ds-badge risk">&#9679; Risk</span>`,
    })[s]||"";

    const bar = (v,c) => `<div style="display:flex;align-items:center;gap:5px;margin-bottom:2px">
      <span style="font-size:0.7rem;font-weight:700;color:var(--muted);width:28px;text-align:right">${v}%</span>
      <div style="flex:1;height:4px;background:var(--border);border-radius:99px;overflow:hidden"><div style="width:${v}%;height:100%;background:${c};border-radius:99px"></div></div></div>`;

    const minBar = (mins, goal) => {
      const pct   = Math.min(Math.round((mins/goal)*100), 100);
      const color = pct >= 100 ? "var(--sci)" : pct >= 60 ? "var(--spa)" : "var(--error)";
      return `<div>
        <div style="display:flex;justify-content:space-between;margin-bottom:3px">
          <span style="font-size:0.75rem;font-weight:700">${mins}<span style="color:var(--muted);font-weight:500"> / ${goal} min</span></span>
          <span style="font-size:0.7rem;font-weight:700;color:${color}">${pct}%</span>
        </div>
        <div style="height:5px;background:var(--border);border-radius:99px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:${color};border-radius:99px"></div>
        </div>
      </div>`;
    };

    const classTabs = CLASSES.map((c,i) => `
      <button onclick="App.go('teacher/${i}')"
        style="padding:7px 16px;border-radius:999px;font-family:inherit;font-weight:700;font-size:0.82rem;cursor:pointer;
               border:1.5px solid ${i===classIdx?"var(--text)":"var(--border)"};
               background:${i===classIdx?"var(--text)":"transparent"};
               color:${i===classIdx?"white":"var(--muted)"}">
        ${c.name.split("-")[1].trim()}
      </button>`).join("");

    const rows = students.map(s => {
      const prof = proficiency(s.avg);
      return `<tr class="ds-row">
        <td><div style="display:flex;align-items:center;gap:10px">
          <div class="ds-avatar" style="background:${s.color}">${s.init}</div>
          <div>
            <div style="font-weight:700;font-size:0.88rem">${s.name}</div>
            <div style="font-size:0.72rem;color:var(--muted)">Gr.${s.grade} &middot; <span class="lesson-code" style="font-size:0.69rem">${s.code}</span></div>
          </div>
        </div></td>
        <td style="text-align:center;font-weight:800">${s.avg}%</td>
        <td><span style="background:${prof.bg};color:${prof.color};border-radius:999px;padding:3px 10px;font-size:0.72rem;font-weight:700;white-space:nowrap">${prof.label}</span></td>
        <td style="min-width:120px">${bar(s.math,"var(--math)")}${bar(s.sci,"var(--sci)")}${bar(s.spa,"var(--spa)")}</td>
        <td style="min-width:160px">${minBar(s.mins, cls.assignedMin)}</td>
        <td style="text-align:center;font-weight:700">${s.done}</td>
        <td style="color:var(--muted);font-size:0.8rem;white-space:nowrap">${s.last}</td>
        <td>${badge(s.status)}</td>
      </tr>`}).join("");

    return `
      ${this.nav({hash:"home",label:"Back to Home"})}
      <div style="padding-top:28px">
        <p class="hero-label" style="margin-bottom:8px">Mockup - Fake Data Only</p>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px">
          <div>
            <h1 style="font-size:1.9rem;font-weight:900;letter-spacing:-1px">${cls.name}</h1>
            <p style="color:var(--muted);font-weight:500;margin-top:3px;font-size:0.9rem">${cls.grade} &middot; ${students.length} students &middot; ${cls.assignedMin} min/week assigned</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-outline" style="font-size:0.8rem;padding:8px 14px">Export CSV</button>
            <button class="btn btn-outline" onclick="App.go('assessment/${classIdx}')" style="font-size:0.8rem;padding:8px 14px;border-color:#E8562A;color:#E8562A">
              <i class="ph-bold ph-lightning" style="font-size:13px"></i> Spark
            </button>
            <button class="btn btn-primary" style="font-size:0.8rem;padding:8px 14px">Assign Lesson</button>
          </div>
        </div>

        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px">${classTabs}</div>

        <div style="display:flex;align-items:center;gap:16px;background:var(--surface);border:1.5px solid var(--border);border-radius:16px;padding:16px 20px;margin-bottom:20px">
          <div>
            <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);margin-bottom:4px">Class Code</div>
            <div style="font-family:'SF Mono',monospace;font-size:1.6rem;font-weight:900;letter-spacing:3px">${cls.code}</div>
          </div>
          <div style="width:1px;height:44px;background:var(--border)"></div>
          <p style="font-size:0.82rem;color:var(--muted);font-weight:500;flex:1">Students enter this code to connect to your class roster</p>
          <button class="btn btn-outline" style="font-size:0.78rem;padding:7px 14px" onclick="navigator.clipboard.writeText('${cls.code}').then(()=>this.textContent='Copied! ✓')">Copy</button>
        </div>

        <div class="ds-stats">
          <div class="ds-stat-card"><div class="ds-stat-num">${students.length}</div><div class="ds-stat-lbl">Students</div></div>
          <div class="ds-stat-card"><div class="ds-stat-num" style="color:var(--math)">${avgScore}%</div><div class="ds-stat-lbl">Class Avg</div></div>
          <div class="ds-stat-card"><div class="ds-stat-num" style="color:var(--sci)">${avgMins}</div><div class="ds-stat-lbl">Avg Min/Wk</div></div>
          <div class="ds-stat-card"><div class="ds-stat-num">${activeToday}</div><div class="ds-stat-lbl">Active Today</div></div>
          <div class="ds-stat-card"><div class="ds-stat-num" style="color:var(--error)">${needHelp}</div><div class="ds-stat-lbl">Need Help</div></div>
        </div>

        <div class="ds-table-wrap">
          <table class="ds-table">
            <thead><tr>
              <th>Student</th><th>Avg</th><th>Proficiency</th>
              <th>Math / Sci / Span</th><th>Minutes This Week</th>
              <th>Lessons</th><th>Last Active</th><th>Status</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p style="margin-top:12px;font-size:0.73rem;color:var(--muted);text-align:center">Fake data for demo only - no real student info stored.</p>
      </div>`;
  },

  // ── Spark Assessment ────────────────────────────────────
  assessment(classIdx = 0) {
    const CLASS_NAMES = ["Period 3","Period 5","Period 7"];
    const cls = CLASS_NAMES[classIdx] || CLASS_NAMES[0];

    const Q = {
      math: [
        {id:1,  code:'4-MU',q:'What is 7 × 8?',                                              ans:'56',          topic:'Multiplication', pct:82},
        {id:2,  code:'4-MU',q:'8 × 9 = ?',                                                   ans:'72',          topic:'Multiplication', pct:79},
        {id:3,  code:'4-MU',q:'6 × 7 = ?',                                                   ans:'42',          topic:'Multiplication', pct:85},
        {id:4,  code:'4-MU',q:'9 × 11 = ?',                                                  ans:'99',          topic:'Multiplication', pct:76},
        {id:5,  code:'4-MU',q:'12 × 4 = ?',                                                  ans:'48',          topic:'Multiplication', pct:88},
        {id:6,  code:'4-LD',q:'144 ÷ 12 = ?',                                               ans:'12',          topic:'Long Division',  pct:71},
        {id:7,  code:'4-LD',q:'84 ÷ 4 = ?',                                                  ans:'21',          topic:'Long Division',  pct:68},
        {id:8,  code:'4-LD',q:'96 ÷ 8 = ?',                                                  ans:'12',          topic:'Long Division',  pct:74},
        {id:9,  code:'5-FR',q:'Which fraction is larger: 3/4 or 2/3?',                       ans:'3/4',         topic:'Fractions',      pct:65},
        {id:10, code:'5-FR',q:'Which fraction equals 2/4?',                                  ans:'1/2',         topic:'Fractions',      pct:69},
        {id:11, code:'5-FR',q:'What is 1/2 of 16?',                                          ans:'8',           topic:'Fractions',      pct:80},
        {id:12, code:'5-FR',q:'Which is bigger: 5/8 or 1/2?',                                ans:'5/8',         topic:'Fractions',      pct:62},
        {id:13, code:'5-DE',q:'4.5 + 2.8 = ?',                                              ans:'7.3',         topic:'Decimals',       pct:78},
        {id:14, code:'5-DE',q:'0.75 is the same as which fraction?',                        ans:'3/4',         topic:'Decimals',       pct:72},
        {id:15, code:'5-DE',q:'4.7 − 2.3 = ?',                                              ans:'2.4',         topic:'Decimals',       pct:81},
        {id:16, code:'5-DE',q:'2.3 + 1.5 = ?',                                              ans:'3.8',         topic:'Decimals',       pct:84},
        {id:17, code:'6-RA',q:'Simplify the ratio 12:16',                                   ans:'3:4',         topic:'Ratios',         pct:48},
        {id:18, code:'6-RA',q:'A car travels 150 miles in 3 hrs. Speed in mph?',            ans:'50 mph',      topic:'Ratios',         pct:44},
        {id:19, code:'6-RA',q:'Simplify 18:24',                                             ans:'3:4',         topic:'Ratios',         pct:52},
        {id:20, code:'6-RA',q:'2 cups flour per 3 cups water. Flour for 9 cups water?',     ans:'6 cups',      topic:'Ratios',         pct:55},
      ],
      science: [
        {id:1,  code:'5-CE',q:'What is the "control center" of the cell?',                   ans:'Nucleus',     topic:'Cells',          pct:88},
        {id:2,  code:'5-CE',q:'Which organelle produces energy for the cell?',               ans:'Mitochondria',topic:'Cells',          pct:58},
        {id:3,  code:'5-CE',q:'Which structure is found in plant cells but NOT animal cells?',ans:'Cell wall',  topic:'Cells',          pct:71},
        {id:4,  code:'5-CE',q:'What is the flexible outer boundary of ALL cells?',           ans:'Cell membrane',topic:'Cells',         pct:64},
        {id:5,  code:'4-EC',q:'A food chain always starts with a ___',                      ans:'Producer',    topic:'Ecosystems',     pct:74},
        {id:6,  code:'4-EC',q:'Which is NOT a living (biotic) part of an ecosystem?',       ans:'Rock',        topic:'Ecosystems',     pct:82},
        {id:7,  code:'4-EC',q:'Fungi and bacteria break down dead organisms. They are called...', ans:'Decomposers', topic:'Ecosystems', pct:61},
        {id:8,  code:'4-EC',q:'Which pair correctly shows predator → prey?',                ans:'Fox → Rabbit',topic:'Ecosystems',     pct:77},
        {id:9,  code:'4-EC',q:'If all rabbits disappeared, what happens to foxes?',         ans:'Fewer foxes', topic:'Ecosystems',     pct:69},
        {id:10, code:'5-CE',q:'Chloroplasts make energy from ___',                          ans:'Sunlight',    topic:'Cells',          pct:73},
        {id:11, code:'5-CE',q:'Correct order smallest to largest?',                         ans:'Cell→Tissue→Organ→Organism', topic:'Cells', pct:55},
        {id:12, code:'4-EC',q:'Plants make their own food using sunlight. They are called...', ans:'Producers', topic:'Ecosystems',    pct:79},
        {id:13, code:'5-CE',q:'Bacteria cells differ from human cells because they have no...', ans:'Nucleus',  topic:'Cells',          pct:62},
        {id:14, code:'4-EC',q:'Non-living parts of an ecosystem are called ___ factors',    ans:'Abiotic',     topic:'Ecosystems',     pct:58},
        {id:15, code:'4-EC',q:'Which ecosystem has the most biodiversity?',                 ans:'Tropical rainforest', topic:'Ecosystems', pct:84},
      ],
      spanish: [
        {id:1,  code:'4-GR',q:'How do you say "Hello" in Spanish?',                         ans:'Hola',        topic:'Greetings',      pct:98},
        {id:2,  code:'4-GR',q:'What does "Buenos días" mean?',                              ans:'Good morning', topic:'Greetings',    pct:92},
        {id:3,  code:'4-GR',q:'"¿Cómo estás?" means...',                                   ans:'How are you?',topic:'Greetings',     pct:88},
        {id:4,  code:'4-GR',q:'How do you say "Goodbye"?',                                  ans:'Adiós',       topic:'Greetings',      pct:95},
        {id:5,  code:'4-GR',q:'It is 9pm. Which greeting fits?',                            ans:'Buenas noches',topic:'Greetings',    pct:79},
        {id:6,  code:'4-GR',q:'"¿Cómo te llamas?" asks your...',                            ans:'Name',        topic:'Greetings',      pct:85},
        {id:7,  code:'4-GR',q:'How do you say "Good afternoon"?',                           ans:'Buenas tardes',topic:'Greetings',    pct:82},
        {id:8,  code:'4-GR',q:'"Mucho gusto" means...',                                     ans:'Nice to meet you',topic:'Greetings', pct:74},
        {id:9,  code:'4-GR',q:'How do you say "Thank you"?',                                ans:'Gracias',     topic:'Greetings',      pct:96},
        {id:10, code:'4-GR',q:'"De nada" means...',                                         ans:"You're welcome",topic:'Greetings', pct:71},
        {id:11, code:'4-GR',q:'How do you say "Please"?',                                   ans:'Por favor',   topic:'Greetings',      pct:88},
        {id:12, code:'4-NU',q:'What is "cinco" in English?',                                ans:'5',           topic:'Numbers',        pct:90},
        {id:13, code:'4-NU',q:'How do you say "10" in Spanish?',                            ans:'Diez',        topic:'Numbers',        pct:87},
        {id:14, code:'4-NU',q:'What number is "quince"?',                                   ans:'15',          topic:'Numbers',        pct:85},
        {id:15, code:'4-NU',q:'How do you say "20" in Spanish?',                            ans:'Veinte',      topic:'Numbers',        pct:83},
        {id:16, code:'4-NU',q:'What is "trece" in English?',                                ans:'13',          topic:'Numbers',        pct:79},
        {id:17, code:'4-NU',q:'How do you say "7" in Spanish?',                             ans:'Siete',       topic:'Numbers',        pct:84},
        {id:18, code:'4-NU',q:'Your age is 12 in Spanish. You say...',                      ans:'Doce',        topic:'Numbers',        pct:76},
        {id:19, code:'4-NU',q:'Which comes after "diecisiete"?',                            ans:'Dieciocho',   topic:'Numbers',        pct:68},
        {id:20, code:'4-GR',q:'"Rojo" means...',                                            ans:'Red',         topic:'Vocab',          pct:82},
        {id:21, code:'4-GR',q:'"Grande" means...',                                          ans:'Big / Large', topic:'Vocab',          pct:78},
        {id:22, code:'4-GR',q:'"La escuela" means...',                                      ans:'The school',  topic:'Vocab',          pct:72},
        {id:23, code:'4-GR',q:'How do you say "I like" in Spanish?',                        ans:'Me gusta',    topic:'Vocab',          pct:65},
        {id:24, code:'4-GR',q:'"¿Cuántos años tienes?" means...',                           ans:'How old are you?',topic:'Vocab',     pct:62},
        {id:25, code:'4-GR',q:'How do you say "My name is" in Spanish?',                    ans:'Me llamo',    topic:'Vocab',          pct:70},
      ]
    };

    const students = [
      {name:'Emma Johnson',    init:'EJ',color:'#818CF8',scores:{math:17,sci:13,spa:23},time:'14:22',prev:{math:78,sci:80,spa:75},level:'above'},
      {name:'Liam Martinez',   init:'LM',color:'#34D399',scores:{math:13,sci:9, spa:18},time:'11:08',prev:{math:71,sci:74,spa:72},level:'declining'},
      {name:'Sophia Chen',     init:'SC',color:'#FB923C',scores:{math:19,sci:14,spa:25},time:'22:15',prev:{math:93,sci:92,spa:91},level:'above'},
      {name:'Noah Williams',   init:'NW',color:'#60A5FA',scores:{math:10,sci:7, spa:14},time:'5:30', prev:{math:62,sci:66,spa:60},level:'declining'},
      {name:'Ava Thompson',    init:'AT',color:'#F472B6',scores:{math:15,sci:12,spa:21},time:'17:44',prev:{math:80,sci:82,spa:79},level:'on-level'},
      {name:'Charlotte Lee',   init:'CL',color:'#38BDF8',scores:{math:18,sci:14,spa:24},time:'20:55',prev:{math:87,sci:88,spa:86},level:'above'},
      {name:'Isabella Garcia', init:'IG',color:'#4ADE80',scores:{math:14,sci:11,spa:20},time:'16:07',prev:{math:73,sci:74,spa:72},level:'on-level'},
      {name:'Mason Rodriguez', init:'MR',color:'#FACC15',scores:{math:11,sci:8, spa:15},time:'4:45', prev:{math:67,sci:70,spa:65},level:'declining'},
    ];

    const allQ = [
      ...Q.math.map(q=>({...q,subj:'math'})),
      ...Q.science.map(q=>({...q,subj:'science'})),
      ...Q.spanish.map(q=>({...q,subj:'spanish'})),
    ];

    const totals = {math:20,sci:15,spa:25};
    const avgMath = Math.round(students.reduce((s,st)=>s+(st.scores.math/20*100),0)/students.length);
    const avgSci  = Math.round(students.reduce((s,st)=>s+(st.scores.sci/15*100),0)/students.length);
    const avgSpa  = Math.round(students.reduce((s,st)=>s+(st.scores.spa/25*100),0)/students.length);
    const hardest = [...allQ].sort((a,b)=>a.pct-b.pct)[0];

    const diffDot = pct => pct>=80 ? `<span class="spark-diff easy">●</span>`
                         : pct>=60 ? `<span class="spark-diff med">●</span>`
                         :           `<span class="spark-diff hard">●</span>`;

    const sColor = s => ({math:'var(--math)',science:'var(--sci)',spanish:'var(--spa)'})[s]||'var(--muted)';
    const sBg    = s => ({math:'var(--math-bg)',science:'var(--sci-bg)',spanish:'var(--spa-bg)'})[s]||'var(--surface)';

    const qRows = allQ.map(q => `
      <div class="spark-q-row" data-subj="${q.subj}">
        <div class="spark-q-num" style="background:${sBg(q.subj)};color:${sColor(q.subj)}">${q.id}</div>
        <div class="spark-q-body">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
            <span class="lesson-code" style="font-size:0.67rem">${q.code}</span>
            <span style="font-size:0.72rem;font-weight:600;color:var(--muted)">${q.topic}</span>
            ${diffDot(q.pct)}
          </div>
          <div class="spark-q-text">${q.q}</div>
          <div style="font-size:0.73rem;color:var(--sci);font-weight:700;margin-top:3px">
            <i class="ph-bold ph-check-circle" style="font-size:11px"></i> ${q.ans}
          </div>
        </div>
        <div class="spark-q-pct">
          <div style="font-size:0.95rem;font-weight:900">${q.pct}%</div>
          <div style="font-size:0.65rem;color:var(--muted);font-weight:600">correct</div>
          <div style="height:3px;background:var(--border);border-radius:99px;margin-top:5px;overflow:hidden">
            <div style="width:${q.pct}%;height:100%;border-radius:99px;background:${q.pct>=80?'var(--sci)':q.pct>=60?'var(--spa)':'var(--error)'}"></div>
          </div>
        </div>
      </div>`).join('');

    const levelBadge = l => ({
      'above':    `<span class="spark-level above"><i class="ph-bold ph-star" style="font-size:9px"></i> Above Grade</span>`,
      'on-level': `<span class="spark-level on-level"><i class="ph-bold ph-check" style="font-size:9px"></i> On Level</span>`,
      'declining':`<span class="spark-level declining"><i class="ph-bold ph-trend-down" style="font-size:9px"></i> Declining</span>`,
    })[l]||'';

    const tagBadge = tag => ({
      'improved':     `<span class="spark-tag improved"><i class="ph-bold ph-trend-up" style="font-size:9px"></i> Improved</span>`,
      'went-down':    `<span class="spark-tag went-down"><i class="ph-bold ph-trend-down" style="font-size:9px"></i> Went Down</span>`,
      'on-fire':      `<span class="spark-tag on-fire"><i class="ph-bold ph-lightning" style="font-size:9px"></i> On Fire</span>`,
      'rushed':       `<span class="spark-tag rushed"><i class="ph-bold ph-rabbit" style="font-size:9px"></i> Rushed</span>`,
      'needs-review': `<span class="spark-tag needs-review"><i class="ph-bold ph-warning" style="font-size:9px"></i> Review</span>`,
      'consistent':   `<span class="spark-tag consistent"><i class="ph-bold ph-equals" style="font-size:9px"></i> Consistent</span>`,
    })[tag]||'';

    const autoTags = s => {
      const tags = [];
      const mathPct = s.scores.math/20*100;
      const sciPct  = s.scores.sci/15*100;
      const spaPct  = s.scores.spa/25*100;
      const avg     = (mathPct+sciPct+spaPct)/3;
      const prevAvg = (s.prev.math+s.prev.sci+s.prev.spa)/3;
      const diff    = avg - prevAvg;
      const timeMin = parseFloat(s.time.split(':')[0]);
      if (timeMin < 6) tags.push('rushed');
      if (diff > 4)  tags.push('improved');
      if (diff < -4) tags.push('went-down');
      if (avg >= 90) tags.push('on-fire');
      if (avg < 55)  tags.push('needs-review');
      if (Math.abs(diff) <= 4 && timeMin >= 6) tags.push('consistent');
      return tags;
    };

    const sRows = students.map(s => {
      const mathPct = Math.round(s.scores.math/20*100);
      const sciPct  = Math.round(s.scores.sci/15*100);
      const spaPct  = Math.round(s.scores.spa/25*100);
      const overall = Math.round((mathPct+sciPct+spaPct)/3);
      const tags    = autoTags(s);
      return `<tr class="ds-row">
        <td><div style="display:flex;align-items:center;gap:9px">
          <div class="ds-avatar" style="background:${s.color}">${s.init}</div>
          <span style="font-weight:700;font-size:0.86rem">${s.name}</span>
        </div></td>
        <td style="text-align:center">${levelBadge(s.level)}</td>
        <td style="text-align:center">
          <span style="font-weight:900;color:var(--math)">${mathPct}%</span>
          <div style="font-size:0.68rem;color:var(--muted)">${s.scores.math}/20</div>
        </td>
        <td style="text-align:center">
          <span style="font-weight:900;color:var(--sci)">${sciPct}%</span>
          <div style="font-size:0.68rem;color:var(--muted)">${s.scores.sci}/15</div>
        </td>
        <td style="text-align:center">
          <span style="font-weight:900;color:var(--spa)">${spaPct}%</span>
          <div style="font-size:0.68rem;color:var(--muted)">${s.scores.spa}/25</div>
        </td>
        <td style="text-align:center;font-weight:800">${overall}%</td>
        <td style="color:var(--muted);font-size:0.78rem">${s.time}</td>
        <td><div style="display:flex;gap:4px;flex-wrap:wrap">${tags.map(tagBadge).join('')}</div></td>
      </tr>`;
    }).join('');

    return `
      ${this.nav({hash:'teacher',label:'← Teacher'})}
      <div class="zen-bg">

        <!-- Zen decorative blobs -->
        <div class="zen-blob zen-blob-1"></div>
        <div class="zen-blob zen-blob-2"></div>
        <div class="zen-blob zen-blob-3"></div>

        <div style="position:relative;z-index:1">

          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="background:white;border-radius:16px;width:52px;height:52px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(232,86,42,0.2)">
                <i class="ph-bold ph-lightning" style="font-size:26px;color:#E8562A"></i>
              </div>
              <div>
                <h1 style="font-size:2rem;font-weight:900;letter-spacing:-1px;line-height:1">Spark ⚡</h1>
                <p style="color:var(--muted);font-size:0.82rem;font-weight:500">${cls} · Apr 27, 2026 · 60 questions total</p>
              </div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost" onclick="SparkExport.run()" style="font-size:0.8rem;padding:8px 14px;background:white">
                <i class="ph-bold ph-download-simple" style="font-size:13px"></i> Export
              </button>
              <button class="btn btn-primary" style="font-size:0.8rem;padding:8px 14px">
                <i class="ph-bold ph-plus" style="font-size:13px"></i> New Spark
              </button>
            </div>
          </div>

          <!-- Stats -->
          <div class="ds-stats" style="margin-bottom:24px">
            <div class="ds-stat-card zen-card">
              <i class="ph-bold ph-users" style="font-size:18px;color:var(--muted);margin-bottom:4px"></i>
              <div class="ds-stat-num">${students.length}</div><div class="ds-stat-lbl">Students</div>
            </div>
            <div class="ds-stat-card zen-card">
              <i class="ph-bold ph-math-operations" style="font-size:18px;color:var(--math);margin-bottom:4px"></i>
              <div class="ds-stat-num" style="color:var(--math)">${avgMath}%</div><div class="ds-stat-lbl">Math Avg</div>
            </div>
            <div class="ds-stat-card zen-card">
              <i class="ph-bold ph-flask" style="font-size:18px;color:var(--sci);margin-bottom:4px"></i>
              <div class="ds-stat-num" style="color:var(--sci)">${avgSci}%</div><div class="ds-stat-lbl">Science Avg</div>
            </div>
            <div class="ds-stat-card zen-card">
              <i class="ph-bold ph-globe" style="font-size:18px;color:var(--spa);margin-bottom:4px"></i>
              <div class="ds-stat-num" style="color:var(--spa)">${avgSpa}%</div><div class="ds-stat-lbl">Spanish Avg</div>
            </div>
            <div class="ds-stat-card zen-card">
              <i class="ph-bold ph-brain" style="font-size:18px;color:#7C3AED;margin-bottom:4px"></i>
              <div class="ds-stat-num" style="font-size:0.85rem;letter-spacing:0">${hardest.topic}</div><div class="ds-stat-lbl">Hardest Topic</div>
            </div>
          </div>

          <!-- Two column layout -->
          <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:20px;align-items:start">

            <!-- Question list -->
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                <h2 style="font-size:0.95rem;font-weight:800">
                  <i class="ph-bold ph-list-checks" style="font-size:15px;vertical-align:middle;margin-right:5px"></i>
                  Questions
                </h2>
                <div style="display:flex;gap:5px">
                  <button class="spark-filter-btn active" data-filter="all"    onclick="filterSpark('all')"    style="">All 60</button>
                  <button class="spark-filter-btn"        data-filter="math"   onclick="filterSpark('math')"   style="">📐 20</button>
                  <button class="spark-filter-btn"        data-filter="science"onclick="filterSpark('science')"style="">⚗️ 15</button>
                  <button class="spark-filter-btn"        data-filter="spanish"onclick="filterSpark('spanish')"style="">🌎 25</button>
                </div>
              </div>
              <div style="font-size:0.72rem;color:var(--muted);margin-bottom:10px">
                <span class="spark-diff easy">●</span> Easy ≥80%
                <span class="spark-diff med" style="margin-left:6px">●</span> Medium 60-79%
                <span class="spark-diff hard" style="margin-left:6px">●</span> Hard &lt;60%
              </div>
              <div class="spark-q-list">${qRows}</div>
            </div>

            <!-- Student results -->
            <div>
              <h2 style="font-size:0.95rem;font-weight:800;margin-bottom:12px">
                <i class="ph-bold ph-student" style="font-size:15px;vertical-align:middle;margin-right:5px"></i>
                Student Results
              </h2>
              <div class="ds-table-wrap zen-card" style="border:none">
                <table class="ds-table">
                  <thead><tr>
                    <th>Student</th><th>Level</th>
                    <th style="color:var(--math)">Math</th>
                    <th style="color:var(--sci)">Sci</th>
                    <th style="color:var(--spa)">Span</th>
                    <th>Avg</th><th>Time</th><th>Tags</th>
                  </tr></thead>
                  <tbody>${sRows}</tbody>
                </table>
              </div>

              <!-- Legend -->
              <div class="zen-card" style="margin-top:14px;padding:14px 16px;border-radius:14px">
                <p style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);margin-bottom:8px">Performance Levels</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
                  <span class="spark-level above"><i class="ph-bold ph-star" style="font-size:9px"></i> Above Grade Level</span>
                  <span class="spark-level on-level"><i class="ph-bold ph-check" style="font-size:9px"></i> On Grade Level</span>
                  <span class="spark-level declining"><i class="ph-bold ph-trend-down" style="font-size:9px"></i> Declining</span>
                </div>
                <p style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);margin-bottom:8px">Tags</p>
                <div style="display:flex;flex-wrap:wrap;gap:5px">
                  <span class="spark-tag improved"><i class="ph-bold ph-trend-up" style="font-size:9px"></i> Improved</span>
                  <span class="spark-tag went-down"><i class="ph-bold ph-trend-down" style="font-size:9px"></i> Went Down</span>
                  <span class="spark-tag on-fire"><i class="ph-bold ph-lightning" style="font-size:9px"></i> On Fire</span>
                  <span class="spark-tag rushed"><i class="ph-bold ph-rabbit" style="font-size:9px"></i> Rushed</span>
                  <span class="spark-tag needs-review"><i class="ph-bold ph-warning" style="font-size:9px"></i> Needs Review</span>
                  <span class="spark-tag consistent"><i class="ph-bold ph-equals" style="font-size:9px"></i> Consistent</span>
                </div>
              </div>
            </div>

          </div>

          <p style="margin-top:16px;font-size:0.72rem;color:var(--muted);text-align:center;opacity:0.7">⚠️ Fake data for demo purposes only.</p>
        </div>
      </div>`;
  },

  // ── Sign Up ────────────────────────────────────────────────────────────
  signup(step = 'role', role = '', data = {}) {
    const roles = [
      { id:'student',  emoji:'\uD83C\uDF92', label:'Personal Student', desc:'Grades 4–9 · Self-paced learning tailored to your level', color:'#E8562A', bg:'#fff3ef' },
      { id:'teacher',  emoji:'\uD83D\uDCCB', label:'Teacher',           desc:'Manage classes, assign lessons & view student results', color:'#059669', bg:'#ecfdf5' },
      { id:'parent',   emoji:'\uD83C\uDFE0', label:'Parent',            desc:'Track your child\'s progress and get weekly reports', color:'#0369a1', bg:'#e0f2fe' },
      { id:'district', emoji:'\uD83C\uDFEB', label:'District',          desc:'School district administrators & curriculum managers', color:'#7c3aed', bg:'#f5f3ff' },
    ];

    if (step === 'role') {
      return `
        <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><a href="#login" style="font-size:0.82rem;font-weight:600;color:var(--muted);text-decoration:none">Already have an account? Log in</a></nav>
        <div style="max-width:700px;margin:0 auto;padding:56px 24px 80px">
          <div style="text-align:center;margin-bottom:40px">
            <div style="font-size:2.4rem;margin-bottom:12px">📚</div>
            <h1 style="font-size:2.2rem;font-weight:900;letter-spacing:-1.5px;margin-bottom:8px">Join Learn.edu</h1>
            <p style="color:#6b7280;font-size:1rem;font-weight:500">Tell us who you are — we’ll personalize your experience</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            ${roles.map(r => `
              <div onclick="App.go('signup/questions/${r.id}')" style="background:${r.bg};border:2px solid transparent;border-radius:24px;padding:26px 22px;cursor:pointer;transition:all 0.15s" onmouseover="this.style.borderColor='${r.color}';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='transparent';this.style.transform='none'">
                <div style="font-size:2.4rem;margin-bottom:10px">${r.emoji}</div>
                <h2 style="font-size:1.1rem;font-weight:900;letter-spacing:-0.3px;color:${r.color};margin-bottom:5px">${r.label}</h2>
                <p style="font-size:0.82rem;color:#6b7280;font-weight:500;line-height:1.4">${r.desc}</p>
              </div>`).join('')}
          </div>
        </div>`;
    }

    if (step === 'questions') {
      const Q = {
        student: [
          { id:'name',     label:"What's your name?",                           type:'text',   placeholder:'e.g. Alex' },
          { id:'email',    label:'Your email address',                           type:'email',  placeholder:'e.g. alex@school.com' },
          { id:'grade',    label:'What grade are you in?',                       type:'select', options:['Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9'] },
          { id:'weak',     label:'Which subject do you find hardest?',           type:'select', options:['Math','Science','Spanish','All about the same'] },
          { id:'goal',     label:'What is your learning goal?',                 type:'select', options:['Improve my grades','Test prep (big exam coming)','Learn for fun','Get ahead'] },
          { id:'joinCode', label:'Class code (optional — ask your teacher)',     type:'text',   placeholder:'e.g. LRN-4829', required: false },
        ],
        teacher: [
          { id:'name',    label:"Your name?",                      type:'text',   placeholder:'e.g. Ms. Rivera' },
          { id:'email',   label:'Your email address',              type:'email',  placeholder:'e.g. teacher@school.com' },
          { id:'school',  label:'School name',                     type:'text',   placeholder:'e.g. Lincoln Middle School' },
          { id:'grades',  label:'What grades do you teach?',       type:'select', options:['Grades 4-5','Grades 6-7','Grades 8-9','Mixed'] },
          { id:'subjects',label:'What subjects?',                  type:'select', options:['Math','Science','Spanish','Multiple subjects'] },
        ],
        parent: [
          { id:'name',       label:"Your name?",                      type:'text',   placeholder:'e.g. Maria' },
          { id:'email',      label:'Your email address',              type:'email',  placeholder:'e.g. parent@email.com' },
          { id:'child',      label:"Child's name?",                   type:'text',   placeholder:'e.g. Sofia' },
          { id:'grade',      label:"Child's grade or level?",         type:'select', options:['Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Homeschool - Elementary','Homeschool - Middle','Homeschool - High School'] },
          { id:'schooltype', label:'Traditional school or homeschooled?', type:'select', options:['Traditional school (public/private)','Homeschooled','Homeschool co-op / hybrid','Not yet enrolled'] },
          { id:'concern',    label:'Which subject are you most focused on?', type:'select', options:['Math','Science','Spanish','All subjects'] },
        ],
        district: [
          { id:'name',     label:"Your name?",                      type:'text',   placeholder:'e.g. Dr. Johnson' },
          { id:'email',    label:'Your email address',              type:'email',  placeholder:'e.g. admin@district.edu' },
          { id:'district', label:'District name',                   type:'text',   placeholder:'e.g. Miami-Dade County Schools' },
          { id:'schools',  label:'Number of schools in district',   type:'select', options:['1-10','11-50','51-200','200+'] },
          { id:'grades',   label:'Grades covered',                  type:'select', options:['Elementary (K-5)','Middle (6-8)','High (9-12)','All grades'] },
        ],
      };
      const qs = Q[role] || Q.student;
      const roleInfo = roles.find(r => r.id === role) || roles[0];
      const selBg = `url('data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\' stroke-width=\'2\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'m6 9 6 6 6-6\'></path></svg>')`;
      return `
        <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><button onclick="App.go('signup')" style="background:none;border:none;font-size:0.82rem;color:var(--muted);cursor:pointer;font-weight:600">← Back</button></nav>
        <div style="max-width:560px;margin:0 auto;padding:48px 24px 80px">
          <div style="text-align:center;margin-bottom:32px">
            <div style="font-size:2rem;margin-bottom:8px">${roleInfo.emoji}</div>
            <h1 style="font-size:1.9rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Create your account</h1>
            <p style="color:#6b7280;font-size:0.9rem">Signing up as <strong style="color:${roleInfo.color}">${roleInfo.label}</strong></p>
          </div>
          <div style="background:white;border-radius:24px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
            <form onsubmit="App.completeSignup(event,'${role}')" style="display:flex;flex-direction:column;gap:20px">
              ${qs.map(q => {
                const isOpt = q.required === false;
                const req   = isOpt ? '' : 'required';
                const optTxt = isOpt ? ' <span style=\"font-size:0.75rem;font-weight:500;color:#9ca3af\">(optional)</span>' : '';
                if (q.type === 'select') {
                  return '<div><label style=\"display:block;font-size:0.88rem;font-weight:800;margin-bottom:8px;color:#374151\">' + q.label + '</label><select name=\"' + q.id + '\" required style=\"width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;font-weight:600;cursor:pointer;appearance:none;background:white ' + selBg + ' no-repeat right 12px center/18px\">' + q.options.map(o => '<option>' + o + '</option>').join('') + '</select></div>';
                }
                const rc = roleInfo.color;
                return '<div><label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:8px;color:#374151">' + q.label + optTxt + '</label><input name="' + q.id + '" type="' + (q.type||'text') + '" placeholder="' + (q.placeholder||'') + '" ' + req + ' style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor=\'' + rc + '\'" onblur="this.style.borderColor=\'#e5e7eb\'"></div>';
              }).join('')}
              <button type="submit" style="background:${roleInfo.color};color:white;border:none;border-radius:14px;padding:16px;font-size:1rem;font-weight:900;cursor:pointer;margin-top:4px">Create My Account →</button>
            </form>
          </div>
          <p style="text-align:center;margin-top:16px;font-size:0.78rem;color:#9ca3af">Learn.edu is free forever. No credit card needed.</p>
        </div>`;
    }
    return this.notFound();
  },

  // ── Log In ────────────────────────────────────────────────────────────
  login() {
    const saved = App.getUser();
    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><a href="#signup" style="font-size:0.82rem;font-weight:600;color:var(--muted);text-decoration:none">New here? Sign up free</a></nav>
      <div style="max-width:480px;margin:0 auto;padding:56px 24px 80px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:2rem;margin-bottom:10px">👋</div>
          <h1 style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Welcome back!</h1>
          <p style="color:#6b7280;font-size:0.9rem;font-weight:500">Log into your Learn.edu account</p>
        </div>

        ${saved ? `
          <div style="background:#f0fdf4;border:2px solid #059669;border-radius:20px;padding:18px 22px;margin-bottom:20px;cursor:pointer" onclick="App.loginSubmit({preventDefault:()=>{},target:{querySelector:()=>({value:saved.email||''})}})">
            <div style="font-size:0.72rem;font-weight:800;color:#059669;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em">✔ Saved Account</div>
            <div style="font-weight:900;font-size:1.05rem;margin-bottom:2px">${saved.name || 'User'}</div>
            <div style="font-size:0.82rem;color:#6b7280">${saved.email || ''} · ${saved.role ? saved.role.charAt(0).toUpperCase()+saved.role.slice(1) : ''} · Tap to continue →</div>
          </div>
          <div style="text-align:center;color:#9ca3af;font-size:0.82rem;margin-bottom:16px;font-weight:600">―― or enter a different email ――</div>` : ''}

        <div style="background:white;border-radius:24px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08);margin-bottom:20px">
          <form onsubmit="App.loginSubmit(event)" style="display:flex;flex-direction:column;gap:16px">
            <div>
              <label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:7px;color:#374151">Email address</label>
              <input name="email" type="email" placeholder="your@email.com" required style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='#E8562A'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            <div id="login-error" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:10px;padding:10px 14px;color:#dc2626;font-size:0.85rem;font-weight:700">⚠️ No account found for that email — <a href="#signup" style="color:#E8562A;font-weight:900">sign up first →</a></div>
            <button type="submit" style="background:#111;color:white;border:none;border-radius:14px;padding:16px;font-size:1rem;font-weight:900;cursor:pointer">Continue →</button>
          </form>
        </div>

        <div style="text-align:center;margin-top:16px">
          <p style="font-size:0.78rem;color:#9ca3af">Just want to explore? <a href="#home" style="color:#E8562A;font-weight:700">Browse as guest →</a></p>
        </div>
      </div>`;
  },
  // ── Access Code Gate ─────────────────────────────────────────────────────
  accessCode(role) {
    const meta = {
      admin:   { emoji: '⚙️', label: 'Admin',   color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', hint: 'District code required' },
      teacher: { emoji: '📋', label: 'Teacher', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', hint: 'Class or district code required' },
    };
    const m = meta[role] || meta.teacher;
    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><button onclick="App.logout()" style="background:none;border:none;font-size:0.82rem;color:var(--muted);cursor:pointer;font-weight:600">← Back</button></nav>
      <div style="max-width:420px;margin:0 auto;padding:72px 24px 80px;text-align:center">
        <div style="font-size:3rem;margin-bottom:14px">${m.emoji}</div>
        <h1 style="font-size:1.9rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">${m.label} Access</h1>
        <p style="color:#6b7280;font-size:0.9rem;font-weight:500;margin-bottom:32px">${m.hint}</p>
        <div style="background:white;border-radius:24px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <form onsubmit="App.checkAccessCode(event,'${role}')" style="display:flex;flex-direction:column;gap:16px">
            <div>
              <label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:8px;color:#374151;text-align:left">Enter your code</label>
              <input
                id="access-code-input"
                type="text"
                placeholder="e.g. D-A1-00"
                autocomplete="off"
                autocapitalize="characters"
                style="width:100%;padding:14px 16px;border:2px solid ${m.border};border-radius:14px;font-size:1.2rem;font-family:inherit;font-weight:900;letter-spacing:0.15em;text-align:center;text-transform:uppercase;box-sizing:border-box;color:${m.color}"
                onfocus="this.style.borderColor='${m.color}'"
                onblur="this.style.borderColor='${m.border}'"
              >
              <div id="access-code-error" style="display:none;color:#dc2626;font-size:0.82rem;font-weight:700;margin-top:8px;text-align:left">⚠️ Incorrect code. Try again.</div>
            </div>
            <button type="submit" style="background:${m.color};color:white;border:none;border-radius:14px;padding:15px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">Enter Dashboard →</button>
          </form>
        </div>
        <p style="margin-top:16px;font-size:0.76rem;color:#9ca3af">Contact your district administrator if you don\'t have a code.</p>
      </div>`;
  },

  // ── Plans Page ───────────────────────────────────
  plans() {
    const tiers = [
      {
        name: 'Learn Free',
        price: '$0',
        period: 'forever',
        color: '#374151',
        bg: '#f9fafb',
        border: '#e5e7eb',
        badge: null,
        cta: 'Get Started Free',
        ctaAction: "App.go('signup')",
        features: [
          '35 lessons per course — free forever',
          'Spark quick assessments',
          'Full progress tracking',
          'Works offline (PWA)',
          'Math, Science & Spanish',
          'Parent progress view',
          'No account needed to browse',
        ],
        locked: [],
      },
      {
        name: 'Learn Light',
        price: '$4.99',
        period: '/month',
        color: '#0369a1',
        bg: '#f0f9ff',
        border: '#bae6fd',
        badge: null,
        cta: 'Start Free Trial',
        ctaAction: "App.go('teacher-onboard/1')",
        features: [
          '~85% of all lessons (early access to new content)',
          'Progress streaks & XP system',
          'Enhanced parent dashboard',
          'Ad-free + no distractions mode',
          'Email weekly progress reports',
          'Priority lesson recommendations',
        ],
        locked: ['Teacher tools','PM1/PM2 assessments','District admin'],
      },
      {
        name: 'Learn Pro',
        price: '$12.99',
        period: '/month',
        color: '#E8562A',
        bg: '#fff3ef',
        border: '#fddacf',
        badge: 'Most Popular',
        cta: 'Start Free Trial',
        ctaAction: "App.go('teacher-onboard/1')",
        features: [
          '35 lessons per course',
          'Teacher class management',
          'PM1 & PM2 assessments',
          'Printable progress reports',
          'All subjects + new releases first',
          'Priority email support',
          'Student intervention alerts',
        ],
        locked: ['District admin tools','Custom curriculum','API access'],
      },
      {
        name: 'Learn MAX',
        price: '$29.99',
        period: '/month',
        color: '#7c3aed',
        bg: '#f5f3ff',
        border: '#ddd6fe',
        badge: 'Districts & Schools',
        cta: 'Get District Access',
        ctaAction: "App.go('signup/questions/district')",
        features: [
          'Unlimited lessons',
          'District admin dashboard',
          'Custom curriculum builder',
          'API access',
          'Dedicated account manager',
          'Onboarding & training',
          'SLA & compliance docs',
        ],
        locked: [],
      },
    ];

    const check = (c) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
    const lock = () => `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;

    const cards = tiers.map(t => `
      <div style="background:${t.bg};border:2px solid ${t.border};border-radius:24px;padding:28px 24px;display:flex;flex-direction:column;position:relative">
        ${t.badge ? `<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:${t.color};color:white;font-size:0.72rem;font-weight:900;padding:4px 14px;border-radius:999px;white-space:nowrap">${t.badge}</div>` : ''}
        <div style="margin-bottom:16px">
          <h2 style="font-size:1.2rem;font-weight:900;color:${t.color};margin-bottom:4px">${t.name}</h2>
          <div style="display:flex;align-items:baseline;gap:3px">
            <span style="font-size:2.2rem;font-weight:900;letter-spacing:-1px">${t.price}</span>
            <span style="font-size:0.85rem;color:#6b7280;font-weight:600">${t.period}</span>
          </div>
        </div>
        <div style="flex:1;margin-bottom:20px">
          ${t.features.map(f => `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:0.85rem;font-weight:600;color:#374151">${check(t.color)} ${f}</div>`).join('')}
          ${(t.locked||[]).map(f => `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:0.82rem;font-weight:600;color:#9ca3af">${lock()} ${f}</div>`).join('')}
        </div>
        <button onclick="${t.ctaAction}" style="background:${t.name==='Learn Free'?'#111':t.color};color:white;border:none;border-radius:14px;padding:13px;font-size:0.9rem;font-weight:900;cursor:pointer;font-family:inherit">${t.cta}</button>
      </div>`).join('');

    // Comparison table
    const compareRows = [
      ['Lessons per course', '35 free', '85% + early access', 'All + new first', 'Unlimited + custom'],
      ['Spark assessments',  'Basic', 'Full', 'Full + PM', 'Custom'],
      ['Progress tracking',  'Basic', 'Full', 'Full', 'Full'],
      ['Parent dashboard',   '✖', '✔', '✔', '✔'],
      ['Teacher tools',      '✖', '✖', '✔', '✔'],
      ['PM1 / PM2 reports',  '✖', '✖', '✔', '✔'],
      ['District admin',     '✖', '✖', '✖', '✔'],
      ['Offline (PWA)',       '✔', '✔', '✔', '✔'],
      ['Support',            'Community', 'Email', 'Priority', 'Dedicated'],
    ];
    const colColors = ['#374151','#0369a1','#E8562A','#7c3aed'];
    const compareTable = `
      <div class="ds-table-wrap" style="margin-top:40px">
        <h2 style="font-size:1.2rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:16px;text-align:center">Full Comparison</h2>
        <table class="ds-table" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
          <thead><tr>
            <th style="padding:14px 16px;text-align:left;font-size:0.8rem">Feature</th>
            ${['Free','Light','Pro','MAX'].map((n,i) => `<th style="text-align:center;padding:14px 12px;font-weight:900;color:${colColors[i]}">${n}</th>`).join('')}
          </tr></thead>
          <tbody>
            ${compareRows.map((row, ri) => `
              <tr class="ds-row">
                <td style="font-weight:700;font-size:0.85rem;padding:11px 16px">${row[0]}</td>
                ${row.slice(1).map((v,i) => `<td style="text-align:center;font-size:0.85rem;font-weight:${v==='✔'||v==='✖'?'900':'600'};color:${v==='✔'?'#059669':v==='✖'?'#d1d5db':colColors[i]}">${v}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;

    return `
      ${this.nav({ hash: 'home', label: '← Home' })}
      <div style="max-width:900px;margin:0 auto;padding:48px 20px 80px">
        <div style="text-align:center;margin-bottom:40px">
          <div style="font-size:2.2rem;margin-bottom:10px">🎓</div>
          <h1 style="font-size:2.4rem;font-weight:900;letter-spacing:-1.5px;margin-bottom:8px">Simple, honest pricing</h1>
          <p style="color:#6b7280;font-size:1rem;font-weight:500">Start free forever. Upgrade when your students are ready for more.</p>
          <div style="display:inline-block;background:#dcfce7;border:1.5px solid #86efac;border-radius:999px;padding:6px 16px;font-size:0.8rem;font-weight:800;color:#166534;margin-top:8px">🎉 14-day free trial on all paid plans · No credit card required</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:8px">
          ${cards}
        </div>
        ${compareTable}
        <div style="text-align:center;margin-top:40px">
          <p style="color:#9ca3af;font-size:0.82rem;font-weight:600">All plans include our full Math, Science & Spanish catalog as it grows. No ads, no data selling, no tricks.</p>
        </div>
      </div>`;
  },

  // ── Study Hub ───────────────────────────────────────────────────────────
  studyHub() {
    const tools = [
      { id:'flashcards', emoji:'🃏', title:'Flashcards',  desc:'Flip through key terms & definitions', color:'#E8562A', bg:'#fff3ef' },
      { id:'quiz',       emoji:'⚡',     title:'Quiz Mode',   desc:'Timed quiz — beat the clock!',           color:'#7c3aed', bg:'#f5f3ff' },
      { id:'practice',   emoji:'✏️',     title:'Practice',    desc:'Unlimited questions, hints available',  color:'#059669', bg:'#ecfdf5' },
      { id:'testprep',   emoji:'📝',     title:'Test Prep',   desc:'Exam-style with answer explanations',   color:'#0369a1', bg:'#e0f2fe' },
      { id:'realworld',  emoji:'🌍',     title:'Real World',  desc:'See exactly where this shows up in life', color:'#d97706', bg:'#fef3c7' },
    ];
    const cards = tools.map(t => `
      <div class="tool-card" onclick="App.go('study/${t.id}')" style="background:${t.bg};border-color:${t.color}22">
        <div style="font-size:2.4rem;margin-bottom:10px">${t.emoji}</div>
        <h3 style="font-size:1rem;font-weight:900;color:${t.color};margin-bottom:5px">${t.title}</h3>
        <p style="font-size:0.8rem;color:#6b7280;font-weight:500;line-height:1.4">${t.desc}</p>
      </div>`).join('');
    return `
      ${this.nav({ hash:'home', label:'← Home' })}
      <div style="max-width:740px;margin:0 auto;padding:40px 20px 80px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:2rem;margin-bottom:8px">📚</div>
          <h1 style="font-size:2.2rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Study Tools</h1>
          <p style="color:#6b7280;font-size:0.95rem;font-weight:500">Five ways to master every lesson. Pick your mode, pick your subject.</p>
        </div>
        <div class="tools-grid">${cards}</div>
        <div style="margin-top:32px;background:#f9fafb;border-radius:16px;padding:20px;text-align:center">
          <p style="font-size:0.85rem;color:#6b7280;font-weight:600">💡 Tip: Use <strong>Flashcards</strong> to learn terms first, then <strong>Practice</strong> to drill, then <strong>Quiz Mode</strong> to test yourself under pressure.</p>
        </div>
      </div>`;
  },

  // ── Study Picker (choose subject/level) ────────────────────────────────
  studyPicker(toolId) {
    const toolNames = { flashcards:'🃏 Flashcards', quiz:'⚡ Quiz Mode', practice:'✏️ Practice', testprep:'📝 Test Prep', realworld:'🌍 Real World' };
    const tname = toolNames[toolId] || toolId;
    const mathGrades = [4,5,6,7,8,9];
    const scienceLevels = [{key:'earth',label:'Earth Science'},{key:'life',label:'Life Science'},{key:'physical',label:'Physical Science'},{key:'advanced',label:'Advanced Science'}];
    const spanishLevels = [{key:'beginning',label:'Beginning Spanish'},{key:'spanish1',label:'Spanish 1'},{key:'spanish2',label:'Spanish 2'},{key:'advanced',label:'Advanced Spanish'}];
    const sc = (label, link, color='#E8562A') => `<div onclick="App.go('${link}')" style="background:white;border:2px solid #e5e7eb;border-radius:16px;padding:16px 18px;cursor:pointer;font-weight:700;font-size:0.9rem;transition:border-color 0.15s" onmouseover="this.style.borderColor='${color}'" onmouseout="this.style.borderColor='#e5e7eb'">${label}</div>`;
    return `
      ${this.nav({ hash:'study', label:'← Study Tools' })}
      <div style="max-width:600px;margin:0 auto;padding:40px 20px 80px">
        <h1 style="font-size:1.8rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px">${tname}</h1>
        <p style="color:#6b7280;margin-bottom:28px;font-weight:500">Choose a subject to start</p>
        <h3 style="font-size:0.85rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#9ca3af;margin-bottom:12px">📐 Math</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px">
          ${mathGrades.map(g => sc('Grade '+g, 'study/'+toolId+'/math/'+g, 'var(--math)')).join('')}
        </div>
        <h3 style="font-size:0.85rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#9ca3af;margin-bottom:12px">⚗️ Science</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px">
          ${scienceLevels.map(l => sc(l.label, 'study/'+toolId+'/science/'+l.key, 'var(--sci)')).join('')}
        </div>
        <h3 style="font-size:0.85rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#9ca3af;margin-bottom:12px">🌎 Spanish</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${spanishLevels.map(l => sc(l.label, 'study/'+toolId+'/spanish/'+l.key, 'var(--spa)')).join('')}
        </div>
      </div>`;
  },

  // ── Study Tool (renders correct mode) ────────────────────────────────
  studyTool(toolId, subject, level) {
    const back = { hash: 'study/'+toolId, label: '← Back' };
    const subjectLabel = subject === 'math' ? 'Math Grade '+level : {earth:'Earth Science',life:'Life Science',physical:'Physical Science',advanced:'Advanced Science',beginning:'Beginning Spanish',spanish1:'Spanish 1',spanish2:'Spanish 2'}[level] || level;
    const sColor = subject === 'math' ? 'var(--math)' : subject === 'science' ? 'var(--sci)' : 'var(--spa)';

    // Get questions from lesson data
    const getQs = () => {
      const all = subject === 'math'
        ? (typeof MATH_LESSONS !== 'undefined' ? MATH_LESSONS : [])
        : subject === 'science'
        ? (typeof SCIENCE_LESSONS !== 'undefined' ? SCIENCE_LESSONS : [])
        : (typeof SPANISH_LESSONS !== 'undefined' ? SPANISH_LESSONS : []);
      const lessons = subject === 'math'
        ? all.filter(l => l.grade === level)
        : all.filter(l => l.level === level);
      const qs = [];
      lessons.forEach(l => {
        (l.practice || []).forEach(q => qs.push({...q, lessonTitle: l.title}));
        (l.quiz || []).forEach(q => qs.push({...q, lessonTitle: l.title}));
      });
      // Shuffle
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
      return qs;
    };

    // ── FLASHCARDS ──
    if (toolId === 'flashcards') {
      const setId = subject+'-'+(subject==='math'?level:level);
      const set = (typeof FLASHCARD_SETS !== 'undefined' ? FLASHCARD_SETS : []).find(s => s.id === setId);
      if (!set || !set.cards.length) return `${this.nav(back)}<div class="empty"><div class="e-icon">📏</div><p>No flashcards yet for ${subjectLabel}. Coming soon!</p></div>`;
      return `
        ${this.nav(back)}
        <div style="max-width:560px;margin:0 auto;padding:32px 20px 80px">
          <div style="text-align:center;margin-bottom:8px">
            <span style="font-size:0.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:${sColor}">${subjectLabel} · Flashcards</span>
          </div>
          <div id="fc-progress" style="text-align:center;font-size:0.85rem;font-weight:700;color:#9ca3af;margin-bottom:16px">1 / ${set.cards.length}</div>
          <div class="flashcard-scene" onclick="StudyTools.flipCard()">
            <div class="flashcard" id="flashcard">
              <div class="flashcard-front">
                <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:12px">TERM</div>
                <div id="fc-term" style="font-size:1.4rem;font-weight:900;letter-spacing:-0.5px">${set.cards[0].term}</div>
                <div style="font-size:0.75rem;color:#9ca3af;margin-top:16px">Tap to reveal</div>
              </div>
              <div class="flashcard-back">
                <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;opacity:0.7;margin-bottom:12px">DEFINITION</div>
                <div id="fc-def" style="font-size:1rem;font-weight:700;line-height:1.5">${set.cards[0].def}</div>
              </div>
            </div>
          </div>
          <div style="display:flex;justify-content:center;gap:12px;margin-top:24px">
            <button onclick="StudyTools.prevCard()" style="background:#f3f4f6;border:none;border-radius:12px;padding:12px 24px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit">← Prev</button>
            <button onclick="StudyTools.nextCard()" style="background:${sColor};color:white;border:none;border-radius:12px;padding:12px 28px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit">Next →</button>
          </div>
          <div style="text-align:center;margin-top:16px">
            <button onclick="StudyTools.shuffleCards()" style="background:none;border:1.5px solid #e5e7eb;border-radius:999px;padding:7px 16px;font-size:0.78rem;font-weight:700;cursor:pointer;font-family:inherit">🔀 Shuffle</button>
          </div>
          <script>
            window._FC_SET = ${JSON.stringify(set)};
            window._FC_IDX = 0;
            window.StudyTools = window.StudyTools || {};
            StudyTools.flipCard = function() {
              document.getElementById('flashcard').classList.toggle('flipped');
            };
            StudyTools.showCard = function(idx) {
              window._FC_IDX = ((idx % window._FC_SET.cards.length) + window._FC_SET.cards.length) % window._FC_SET.cards.length;
              const c = window._FC_SET.cards[window._FC_IDX];
              document.getElementById('fc-term').textContent = c.term;
              document.getElementById('fc-def').textContent = c.def;
              document.getElementById('fc-progress').textContent = (window._FC_IDX+1) + ' / ' + window._FC_SET.cards.length;
              document.getElementById('flashcard').classList.remove('flipped');
            };
            StudyTools.nextCard = function() { StudyTools.showCard(window._FC_IDX + 1); };
            StudyTools.prevCard = function() { StudyTools.showCard(window._FC_IDX - 1); };
            StudyTools.shuffleCards = function() {
              for (let i = window._FC_SET.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [window._FC_SET.cards[i], window._FC_SET.cards[j]] = [window._FC_SET.cards[j], window._FC_SET.cards[i]];
              }
              StudyTools.showCard(0);
            };
          <\/script>
        </div>`;
    }

    // ── REAL WORLD ──
    if (toolId === 'realworld') {
      const all = typeof REAL_WORLD !== 'undefined' ? REAL_WORLD : [];
      const entries = all.filter(e => e.subject === subject);
      if (!entries.length) return `${this.nav(back)}<div class="empty"><div class="e-icon">🌍</div><p>Real World content for ${subjectLabel} coming soon!</p></div>`;
      const allCards = entries.flatMap(e => e.cards.map(c => ({...c, topic:e.topic})));
      return `
        ${this.nav(back)}
        <div style="max-width:680px;margin:0 auto;padding:32px 20px 80px">
          <div style="margin-bottom:24px">
            <span style="font-size:0.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:${sColor}">${subjectLabel} · Real World</span>
            <h1 style="font-size:1.8rem;font-weight:900;letter-spacing:-0.5px;margin-top:4px">Where does this show up in real life?</h1>
          </div>
          <div style="display:flex;flex-direction:column;gap:16px">
            ${allCards.map(c => `
              <div style="background:white;border-radius:20px;padding:22px 24px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                  <span style="font-size:2rem">${c.emoji}</span>
                  <div>
                    <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#9ca3af">${c.topic}</div>
                    <div style="font-size:1.05rem;font-weight:900">${c.career}</div>
                  </div>
                </div>
                <p style="font-size:0.9rem;color:#374151;line-height:1.6;margin-bottom:12px">${c.scenario}</p>
                <div style="background:#f9fafb;border-left:3px solid ${sColor};border-radius:0 12px 12px 0;padding:10px 14px">
                  <span style="font-size:0.8rem;font-weight:700;color:${sColor}">The connection: </span>
                  <span style="font-size:0.82rem;color:#374151;font-weight:500">${c.connection}</span>
                </div>
                ${c.formula ? `<div style="margin-top:10px;background:#1e1e2e;border-radius:10px;padding:10px 14px;font-family:monospace;font-size:0.85rem;color:#a8ff78">${c.formula}</div>` : ''}
              </div>`).join('')}
          </div>
        </div>`;
    }

    // ── QUIZ / PRACTICE / TEST PREP ── (shared question engine)
    const qs = getQs();
    if (!qs.length) return `${this.nav(back)}<div class="empty"><div class="e-icon">📘</div><p>No questions yet for ${subjectLabel}. Check back soon!</p></div>`;
    const pick = qs.slice(0, toolId === 'testprep' ? 8 : 10);

    const modeLabel = { quiz:'⚡ Quiz Mode', practice:'✏️ Practice Mode', testprep:'📝 Test Prep' }[toolId] || toolId;
    const modeColor = { quiz:'#7c3aed', practice:'#059669', testprep:'#0369a1' }[toolId] || '#E8562A';

    const qsJSON = JSON.stringify(pick.map(q => ({
      q: q.q,
      type: q.type || 'multiple',
      answer: q.answer,
      choices: q.choices || null,
      hint: q.hint || null,
      lesson: q.lessonTitle || ''
    })));

    return `
      ${this.nav(back)}
      <div style="max-width:600px;margin:0 auto;padding:32px 20px 80px">
        <div style="margin-bottom:20px">
          <span style="font-size:0.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:${modeColor}">${subjectLabel} · ${modeLabel}</span>
        </div>
        <div id="sq-root"></div>
      </div>
      <script>
        (function() {
          var SQ_QS = ${qsJSON};
          var SQ_IDX = 0;
          var SQ_SCORE = 0;
          var SQ_ANSWERED = false;
          var SQ_TOOL = '${toolId}';
          var SQ_COLOR = '${modeColor}';
          var SQ_TIMER = null;
          var SQ_SECS = 30;

          function SQ_render() {
            if (SQ_IDX >= SQ_QS.length) { SQ_showResults(); return; }
            var q = SQ_QS[SQ_IDX];
            var isMultiple = q.type === 'multiple' && q.choices && q.choices.length;
            var choicesHtml = '';
            if (isMultiple) {
              choicesHtml = q.choices.map(function(c, i) {
                return '<button onclick="SQ_answer(this,\'' + c.replace(/'/g,"\\'" ) + '\')" style="width:100%;text-align:left;background:white;border:2px solid #e5e7eb;border-radius:14px;padding:13px 16px;margin-bottom:10px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;transition:border-color 0.15s" onmouseover="if(!this.disabled)this.style.borderColor=\'' + SQ_COLOR + \'" onmouseout="if(!this.disabled)this.style.borderColor=\'#e5e7eb\'">' + c + '</button>';
              }).join('');
            } else {
              choicesHtml = '<div style="display:flex;gap:8px;margin-bottom:10px"><input id="sq-fill" type="text" placeholder="Your answer..." style="flex:1;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.9rem;font-family:inherit" onkeydown="if(event.key===\'Enter\')SQ_submitFill()"><button onclick="SQ_submitFill()" style="background:' + SQ_COLOR + ';color:white;border:none;border-radius:12px;padding:12px 18px;font-weight:800;cursor:pointer;font-family:inherit">Check</button></div>';
            }
            var timerHtml = (SQ_TOOL === 'quiz') ? '<div class="timer-bar-wrap"><div class="timer-bar-fill" id="sq-timer-bar" style="width:100%"></div></div>' : '';
            var hintHtml = (SQ_TOOL === 'practice' && q.hint) ? '<button onclick="document.getElementById(\'sq-hint\').style.display=\'block\'" style="background:none;border:1.5px solid #e5e7eb;border-radius:999px;padding:6px 14px;font-size:0.78rem;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:12px">💡 Show Hint</button><div id="sq-hint" style="display:none;background:#fef3c7;border-radius:10px;padding:10px 14px;font-size:0.82rem;font-weight:600;margin-bottom:12px;color:#92400e">' + q.hint + '</div>' : '';
            var progressHtml = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px"><span style="font-size:0.82rem;font-weight:700;color:#9ca3af">Question ' + (SQ_IDX+1) + ' of ' + SQ_QS.length + '</span>' + (SQ_TOOL==='quiz'?'<span id="sq-secs" style="font-size:0.82rem;font-weight:800;color:' + SQ_COLOR + '">' + SQ_SECS + 's</span>':'') + '</div>';
            document.getElementById('sq-root').innerHTML = progressHtml + timerHtml + '<div style="background:white;border-radius:20px;padding:22px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin-bottom:16px"><p style="font-size:0.78rem;font-weight:700;color:#9ca3af;margin-bottom:6px">' + (q.lesson||'') + '</p><p style="font-size:1.05rem;font-weight:800;line-height:1.5;margin-bottom:18px">' + q.q + '</p>' + hintHtml + choicesHtml + '<div id="sq-feedback" style="display:none"></div></div>';
            SQ_ANSWERED = false;
            if (SQ_TOOL === 'quiz') SQ_startTimer();
          }

          function SQ_startTimer() {
            SQ_SECS = 30;
            clearInterval(SQ_TIMER);
            var bar = document.getElementById('sq-timer-bar');
            var secs = document.getElementById('sq-secs');
            SQ_TIMER = setInterval(function() {
              SQ_SECS--;
              if (bar) bar.style.width = (SQ_SECS/30*100) + '%';
              if (secs) secs.textContent = SQ_SECS + 's';
              if (SQ_SECS <= 0) { clearInterval(SQ_TIMER); if (!SQ_ANSWERED) SQ_answer(null, '__TIMEOUT__'); }
            }, 1000);
          }

          function SQ_answer(btn, chosen) {
            if (SQ_ANSWERED) return;
            SQ_ANSWERED = true;
            clearInterval(SQ_TIMER);
            var q = SQ_QS[SQ_IDX];
            var correct = (chosen !== '__TIMEOUT__') && (chosen.trim().toLowerCase() === q.answer.trim().toLowerCase());
            if (correct) SQ_SCORE++;
            // Color the buttons
            document.querySelectorAll('#sq-root button').forEach(function(b) {
              b.disabled = true;
              if (b.textContent.trim() === q.answer.trim()) b.style.background='#dcfce7', b.style.borderColor='#059669', b.style.color='#15803d';
              else if (b === btn) b.style.background='#fee2e2', b.style.borderColor='#dc2626', b.style.color='#dc2626';
            });
            var fb = document.getElementById('sq-feedback');
            if (fb) {
              fb.style.display = 'block';
              var msg = chosen === '__TIMEOUT__' ? '⏰ Time\'s up! The answer was: <strong>' + q.answer + '</strong>' : correct ? '✅ Correct!' : '❌ Incorrect. Answer: <strong>' + q.answer + '</strong>';
              if (SQ_TOOL === 'testprep' && q.hint) msg += '<br><span style="font-size:0.82rem;color:#374151;font-weight:500;">📚 ' + q.hint + '</span>';
              fb.innerHTML = '<div style="padding:12px 14px;border-radius:12px;font-size:0.88rem;font-weight:700;background:' + (correct?'#dcfce7':'#fee2e2') + ';color:' + (correct?'#15803d':'#dc2626') + '">' + msg + '</div>';
              fb.innerHTML += '<button onclick="SQ_next()" style="margin-top:12px;background:' + SQ_COLOR + ';color:white;border:none;border-radius:12px;padding:11px 24px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit">' + (SQ_IDX+1<SQ_QS.length?'Next Question →':'See Results →') + '</button>';
            }
          }

          function SQ_submitFill() {
            var inp = document.getElementById('sq-fill');
            if (inp) SQ_answer(null, inp.value);
          }

          function SQ_next() {
            SQ_IDX++;
            SQ_render();
          }

          function SQ_showResults() {
            clearInterval(SQ_TIMER);
            var pct = Math.round(SQ_SCORE / SQ_QS.length * 100);
            var grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
            var emoji = pct >= 90 ? '🌟' : pct >= 70 ? '👍' : '💪';
            var msg = pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Good work!' : 'Keep practicing!';
            var isMathQuiz = SQ_QS.length > 0 && document.querySelector('lottie-player[src*=calculator]') !== null;
            var calcAnim = (SQ_TOOL !== 'realworld') ? '<lottie-player src="anim/calculator.json" background="transparent" speed="1.5" style="width:80px;height:80px;margin:0 auto 4px"></lottie-player>' : '<div style="font-size:3rem;margin-bottom:10px">' + emoji + '</div>';
            document.getElementById('sq-root').innerHTML = '<div style="text-align:center;padding:32px 0">' + calcAnim + '<div style="font-size:2.5rem;margin:4px 0 8px">' + emoji + '</div><h2 style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:4px">' + grade + ' · ' + pct + '%</h2><p style="color:#6b7280;font-weight:600;margin-bottom:24px">' + SQ_SCORE + ' of ' + SQ_QS.length + ' correct · ' + msg + '</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><button onclick="App.go(\'study\')" style="background:#f3f4f6;border:none;border-radius:12px;padding:12px 20px;font-weight:800;cursor:pointer;font-family:inherit">← Study Tools</button><button onclick="location.reload()" style="background:' + SQ_COLOR + ';color:white;border:none;border-radius:12px;padding:12px 20px;font-weight:800;cursor:pointer;font-family:inherit">🔄 Try Again</button></div></div>';
          }

          window.SQ_answer = SQ_answer;
          window.SQ_next = SQ_next;
          window.SQ_submitFill = SQ_submitFill;
          SQ_render();
        })();
      <\/script>`;
  },



  // ── Study Plan Loading Animation ────────────────────────────────────────
  studyPlanLoading() {
    return `
      ${this.nav()}
      <div id="spl-root" style="max-width:520px;margin:0 auto;padding:48px 24px;text-align:center">
        <lottie-player src="anim/loading.json" background="transparent" speed="1.2" style="width:200px;height:200px;margin:0 auto 8px" loop autoplay></lottie-player>
        <h1 style="font-size:1.8rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px">Building your plan...</h1>
        <p style="color:#6b7280;font-weight:500;margin-bottom:36px">Personalizing based on your answers</p>
        <div id="spl-bar-wrap" style="height:8px;background:#f3f4f6;border-radius:999px;margin-bottom:36px;overflow:hidden">
          <div id="spl-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#E8562A,#f97316);border-radius:999px;transition:width 0.5s ease"></div>
        </div>
        <div id="spl-steps" style="text-align:left;display:flex;flex-direction:column;gap:12px"></div>
      </div>
      <style>
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .spl-step { display:flex;align-items:center;gap:12px;padding:12px 16px;background:white;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,0.06);animation:fadeSlideIn 0.4s ease forwards;opacity:0 }
        .spl-step-done { color:#059669;font-weight:800;font-size:0.88rem }
        .spl-step-dot { width:24px;height:24px;border-radius:50%;background:#ecfdf5;display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0 }
      </style>
      <script>
        (function() {
          var steps = [
            { label: 'Reading your answers...', icon: '📋' },
            { label: 'Analyzing learning style...', icon: '🧠' },
            { label: 'Selecting math level...', icon: '📐' },
            { label: 'Choosing science track...', icon: '⚗️' },
            { label: 'Setting Spanish level...', icon: '🌎' },
            { label: 'Building weekly schedule...', icon: '📅' },
            { label: 'Personalizing recommendations...', icon: '✨' },
            { label: 'Plan ready!', icon: '🎯' },
          ];
          var container = document.getElementById('spl-steps');
          var bar = document.getElementById('spl-bar');
          var idx = 0;
          function showNext() {
            if (idx >= steps.length) {
              setTimeout(function() { App.go('study-plan'); }, 600);
              return;
            }
            var s = steps[idx];
            var div = document.createElement('div');
            div.className = 'spl-step';
            div.innerHTML = '<div class="spl-step-dot">' + s.icon + '</div><span class="spl-step-done">' + s.label + '</span>';
            container.appendChild(div);
            bar.style.width = Math.round((idx + 1) / steps.length * 100) + '%';
            idx++;
            setTimeout(showNext, idx < steps.length ? 380 : 800);
          }
          setTimeout(showNext, 300);
        })();
      <\/script>`;
  },

  // ── Roadmap ─────────────────────────────────────────────────────────────
  roadmap() {
    const phases = [
      {
        id: 'now', label: 'Now Live', emoji: '✅', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
        items: [
          'Free lesson library (26 Math · 23 Science · 25 Spanish)',
          'Study Tools: Flashcards, Quiz Mode, Practice, Test Prep, Real World',
          'YouTube video integration (Math Antics · Amoeba Sisters · Khan Academy)',
          'Role-based auth: Student, Teacher, Parent, District',
          'Teacher access code gate (D-A1-00)',
          'Homeschool onboarding + personalized study plan generator',
          'Netflix-style parent profile picker',
          'Admin panel: PM1 Results, Assessment Manager, Lesson Library',
          'District welcome with stats dashboard',
          'Spark ⚡ quick assessments',
          'PWA — works offline',
          'Plans: Free / Learn Light / Learn Pro / Learn MAX',
        ]
      },
      {
        id: 'q2', label: 'Q2 2026 — Coming Soon', emoji: '🚧', color: '#d97706', bg: '#fef3c7', border: '#fcd34d',
        items: [
          'AI-powered lesson recommendations (adaptive difficulty)',
          'Teacher assignment dashboard — push lessons to classes',
          'Student XP system, badges & leaderboard',
          'Parent mobile app (iOS + Android)',
          'Progress reports (PDF export)',
          'Streak tracking + daily reminders',
          'Live class sessions (teacher-hosted video lessons)',
          'More subjects: History, ELA, Coding Basics',
        ]
      },
      {
        id: 'q3', label: 'Q3 2026 — Planned', emoji: '📋', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
        items: [
          'Google Classroom & Canvas LMS integration',
          'Clever single sign-on for schools',
          'State standard alignment (CCSS, NGSS, TEKS)',
          'Peer study groups & collaborative flashcards',
          'AI homework helper (photo-to-solution)',
          'Teacher custom lesson builder',
          'School district admin bulk provisioning',
          'Multilingual platform UI (Spanish, Portuguese)',
        ]
      },
      {
        id: 'q4', label: 'Q4 2026 — Vision', emoji: '🔮', color: '#0369a1', bg: '#e0f2fe', border: '#bae6fd',
        items: [
          'IEP & 504 accommodation tools (accessibility)',
          'Proctored assessment mode (PM1 / PM2 / EOY)',
          'Student transcript & report card generation',
          'School marketplace (premium content packs)',
          'Parent-teacher messaging hub',
          'Advanced analytics: growth percentile, predictive at-risk alerts',
          'Native iOS & Android apps',
          'Grade K–12 full vertical curriculum',
        ]
      },
      {
        id: '2027', label: '2027 — Big Picture', emoji: '🚀', color: '#E8562A', bg: '#fff3ef', border: '#fddacf',
        items: [
          'API for third-party EdTech integrations',
          'Content creator program (teacher-built lessons)',
          'AI tutor chat (GPT-powered per-lesson assistant)',
          'School district SIS integration (PowerSchool, Infinite Campus)',
          'Certification program for homeschool students',
          'International curriculum tracks',
          'Venture-backed institutional licensing',
        ]
      },
    ];

    return `
      ${this.nav({ hash: 'home', label: '← Home' })}
      <div style="max-width:780px;margin:0 auto;padding:48px 24px 80px">
        <div style="text-align:center;margin-bottom:40px">
          <div style="font-size:2.2rem;margin-bottom:10px">🗺️</div>
          <h1 style="font-size:2.4rem;font-weight:900;letter-spacing:-1.5px;margin-bottom:8px">Product Roadmap</h1>
          <p style="color:#6b7280;font-size:1rem;font-weight:500">Where Learn.edu is going — and how we get there</p>
          <div style="display:inline-block;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:999px;padding:5px 16px;font-size:0.8rem;font-weight:800;color:#92400e;margin-top:8px">
            🌱 Early-stage · Building in public
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:20px">
          ${phases.map(p => `
            <div style="background:${p.bg};border:2px solid ${p.border};border-radius:24px;padding:24px 28px">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <span style="font-size:1.6rem">${p.emoji}</span>
                <h2 style="font-size:1.1rem;font-weight:900;color:${p.color}">${p.label}</h2>
                ${p.id === 'now' ? '<span style="background:'+p.color+';color:white;font-size:0.68rem;font-weight:800;padding:3px 10px;border-radius:999px">LIVE</span>' : ''}
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                ${p.items.map(item => `
                  <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.84rem;font-weight:600;color:#374151">
                    <span style="color:${p.color};flex-shrink:0;margin-top:1px">${p.id === 'now' ? '✓' : '◦'}</span>
                    ${item}
                  </div>`).join('')}
              </div>
            </div>`).join('')}
        </div>
        <div style="text-align:center;margin-top:36px;padding:24px;background:white;border-radius:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
          <p style="font-size:0.9rem;font-weight:700;color:#374151;margin-bottom:4px">Want to shape what gets built next?</p>
          <p style="font-size:0.82rem;color:#6b7280;font-weight:500">Built for students, parents, and educators. Every feature on this list comes from real feedback.</p>
        </div>
      </div>`;
  },


  // ── Teacher Onboarding ──────────────────────────────────────────────────
  teacherOnboard(step) {
    step = step || 1;
    const STEPS = [
      {
        title: 'About You',
        desc: 'Tell us about yourself',
        questions: [
          { id:'name',     label:"Your name?",                          type:'text',   placeholder:'e.g. Ms. Rivera' },
          { id:'school',   label:'School name',                         type:'text',   placeholder:'e.g. Lincoln Middle School' },
          { id:'state',    label:'State / Country',                     type:'text',   placeholder:'e.g. Florida, USA' },
          { id:'years_exp',label:'Years of teaching experience',        type:'select', options:['First year','1-3 years','4-7 years','8-15 years','15+ years'] },
        ]
      },
      {
        title: 'Your Classroom',
        desc: 'Help us understand your setup',
        questions: [
          { id:'grades_taught', label:'What grades do you teach?',      type:'select', options:['Grades 4-5','Grades 6-7','Grades 8-9','Mixed / Multiple','Other'] },
          { id:'subjects',      label:'What subjects do you teach?',    type:'select', options:['Math','Science','Spanish / Language','Multiple subjects','All subjects (homeschool co-op)'] },
          { id:'periods',       label:'How many periods/classes?',      type:'select', options:['1','2','3','4','5','6+'] },
          { id:'students_per',  label:'Avg students per class?',        type:'select', options:['Under 15','15-20','21-25','26-30','31-35','35+'] },
        ]
      },
      {
        title: 'Curriculum',
        desc: 'What you teach and how',
        questions: [
          { id:'curriculum',    label:'Do you follow a specific curriculum?', type:'select', options:['State standards (CCSS, NGSS)','District curriculum','School-adopted textbook','Self-designed / eclectic','Homeschool curriculum'] },
          { id:'supplement',    label:'How do you plan to use Learn.edu?',    type:'select', options:['Primary instruction resource','Supplemental / homework','Test prep & review','After-school enrichment','Summer learning'] },
          { id:'freq',          label:'How often would students use it?',     type:'select', options:['Daily','3-4 times a week','1-2 times a week','Monthly','As needed'] },
        ]
      },
      {
        title: 'Your Setup',
        desc: 'Technology and access',
        questions: [
          { id:'device',    label:'Primary student device?',            type:'select', options:['Chromebook','iPad / Tablet','Laptop / Desktop','Mixed devices','Students use own phones'] },
          { id:'internet',  label:'Internet access at school?',         type:'select', options:['Reliable high-speed','Mostly reliable','Spotty / slow','No internet (need offline)'] },
          { id:'lms',       label:'Do you use an LMS?',                 type:'select', options:['Google Classroom','Canvas','Schoology','Blackboard','None','Other'] },
          { id:'goal',      label:'Your #1 goal with Learn.edu?',       type:'select', options:['Raise test scores','Differentiate instruction','Engage struggling students','Supplement for advanced students','Fill sub plans / flexible days'] },
        ]
      },
    ];

    const totalSteps = STEPS.length;
    const s = STEPS[step - 1];
    if (!s) { App.go('teacher-pricing'); return ''; }
    const progressPct = Math.round((step - 1) / totalSteps * 100);
    const isLast = step === totalSteps;

    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><span style="font-size:0.82rem;font-weight:600;color:var(--muted)">Teacher Setup · Step ${step} of ${totalSteps}</span></nav>
      <div style="max-width:580px;margin:0 auto;padding:36px 24px 80px">
        <div style="height:6px;background:#f3f4f6;border-radius:999px;margin-bottom:28px;overflow:hidden">
          <div style="height:100%;width:${progressPct}%;background:#059669;border-radius:999px;transition:width 0.4s"></div>
        </div>
        <div style="text-align:center;margin-bottom:28px">
          <div style="width:52px;height:52px;background:#ecfdf5;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 10px">📋</div>
          <h1 style="font-size:1.7rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:4px">${s.title}</h1>
          <p style="color:#6b7280;font-size:0.88rem;font-weight:500">${s.desc} · Step ${step} of ${totalSteps}</p>
        </div>
        <div style="background:white;border-radius:24px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <form onsubmit="App.saveTeacherStep(event,${step})" style="display:flex;flex-direction:column;gap:18px">
            ${s.questions.map(q=>`
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:800;margin-bottom:7px;color:#374151">${q.label}</label>
                ${q.type==='select'
                  ? `<select name="${q.id}" style="width:100%;padding:11px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;font-weight:600;appearance:none;background:white">${q.options.map(o=>`<option>${o}</option>`).join('')}</select>`
                  : `<input name="${q.id}" type="text" placeholder="${q.placeholder||''}" style="width:100%;padding:11px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='#059669'" onblur="this.style.borderColor='#e5e7eb'">`
                }
              </div>`).join('')}
            <button type="submit" style="background:#059669;color:white;border:none;border-radius:14px;padding:14px;font-size:0.95rem;font-weight:900;cursor:pointer;font-family:inherit">${isLast ? 'See Pricing →' : 'Next Step →'}</button>
          </form>
        </div>
        ${step > 1 ? `<div style="text-align:center;margin-top:12px"><button onclick="App.go('teacher-onboard/${step-1}')" style="background:none;border:none;color:var(--muted);font-size:0.82rem;font-weight:600;cursor:pointer">← Back</button></div>` : ''}
      </div>`;
  },

  // ── Teacher Pricing ─────────────────────────────────────────────────────
  teacherPricing() {
    const ob = JSON.parse(localStorage.getItem('learnedu-teacher-onboard') || '{}');
    const studentsPerClass = ob.students_per || '21-25';
    const periods = parseInt(ob.periods || '3');
    // Estimate total students
    const estMap = {'Under 15':10,'15-20':17,'21-25':23,'26-30':28,'31-35':33,'35+':38};
    const perClass = estMap[studentsPerClass] || 23;
    const totalEst = perClass * periods;

    const tiers = [
      { label:'Starter',    max:30,  price:'$9.99',  per:'/mo', color:'#059669', bg:'#ecfdf5', border:'#a7f3d0', features:['Up to 30 students','3 periods/classes','All free lessons','Spark assessments','Student progress tracking'] },
      { label:'Classroom',  max:60,  price:'$19.99', per:'/mo', color:'#0369a1', bg:'#e0f2fe', border:'#7dd3fc', features:['Up to 60 students','6 periods/classes','All lessons + early access','Assignment tools','Parent notifications','Progress reports'] },
      { label:'Grade Level',max:120, price:'$34.99', per:'/mo', color:'#7c3aed', bg:'#f5f3ff', border:'#c4b5fd', badge:'Most Popular', features:['Up to 120 students','Unlimited periods','Everything in Classroom','PM1 & PM2 assessments','CSV student import','Priority support'] },
      { label:'School',     max:999, price:'$54.99', per:'/mo', color:'#E8562A', bg:'#fff3ef', border:'#fddacf', features:['200+ students','Admin dashboard','Custom subdomain','API access','Onboarding call','SLA guarantee'] },
    ];

    const recommended = tiers.find(t => totalEst <= t.max) || tiers[tiers.length - 1];

    const check = (c) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;

    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><button onclick="App.go('teacher-onboard/4')" style="background:none;border:none;font-size:0.82rem;color:var(--muted);cursor:pointer;font-weight:600">← Back</button></nav>
      <div style="max-width:900px;margin:0 auto;padding:40px 24px 80px">
        <div style="text-align:center;margin-bottom:12px">
          <h1 style="font-size:2.2rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Choose your plan</h1>
          <p style="color:#6b7280;font-size:0.95rem;font-weight:500">Based on your setup (~${totalEst} students), we recommend <strong style="color:${recommended.color}">${recommended.label}</strong></p>
          <div style="display:inline-block;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:999px;padding:5px 16px;font-size:0.8rem;font-weight:800;color:#92400e;margin-top:8px">🎉 14-day free trial on all plans · No credit card required</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px">
          ${tiers.map(t => {
            const isRec = t.label === recommended.label;
            return `<div style="background:${t.bg};border:2.5px solid ${isRec?t.color:t.border};border-radius:22px;padding:22px 18px;position:relative${isRec?';box-shadow:0 8px 32px '+t.color+'33':''};display:flex;flex-direction:column">
              ${t.badge ? `<div style="position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:${t.color};color:white;font-size:0.68rem;font-weight:900;padding:3px 12px;border-radius:999px;white-space:nowrap">${t.badge}</div>` : ''}
              ${isRec ? '<div style="position:absolute;top:-11px;right:16px;background:#f59e0b;color:white;font-size:0.68rem;font-weight:900;padding:3px 10px;border-radius:999px">Recommended</div>' : ''}
              <h3 style="font-size:1rem;font-weight:900;color:${t.color};margin-bottom:8px">${t.label}</h3>
              <div style="display:flex;align-items:baseline;gap:2px;margin-bottom:4px">
                <span style="font-size:1.9rem;font-weight:900;letter-spacing:-1px">${t.price}</span>
                <span style="font-size:0.8rem;color:#6b7280">${t.per}</span>
              </div>
              <div style="font-size:0.72rem;color:#9ca3af;font-weight:600;margin-bottom:14px">Up to ${t.max === 999 ? '200+' : t.max} students</div>
              <div style="flex:1;margin-bottom:16px">
                ${t.features.map(f=>`<div style="display:flex;align-items:center;gap:7px;font-size:0.8rem;font-weight:600;color:#374151;padding:4px 0">${check(t.color)} ${f}</div>`).join('')}
              </div>
              <button onclick="App.startTeacherTrial('${t.label}')" style="background:${t.color};color:white;border:none;border-radius:12px;padding:11px;font-size:0.85rem;font-weight:900;cursor:pointer;font-family:inherit;width:100%">Start Free Trial</button>
            </div>`;
          }).join('')}
        </div>
        <div style="background:white;border-radius:18px;padding:20px 24px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05)">
          <p style="color:#9ca3af;font-size:0.82rem;font-weight:600">Need a quote for your whole school or district? <a href="#" onclick="alert('Contact: hello@learn.edu')" style="color:#059669;font-weight:800">Contact us →</a></p>
        </div>
      </div>`;
  },


  // ── Checkout ─────────────────────────────────────────────────────────────
  checkout(plan) {
    const PLANS = {
      'Starter':     { price:'$9.99/mo',  color:'#059669', bg:'#ecfdf5', students:'Up to 30 students',   features:['All lessons','Spark assessments','Progress tracking','3 class periods'] },
      'Classroom':   { price:'$19.99/mo', color:'#0369a1', bg:'#e0f2fe', students:'Up to 60 students',   features:['All lessons + early access','Assignment tools','Parent notifications','Progress reports','6 class periods'] },
      'Grade Level': { price:'$34.99/mo', color:'#7c3aed', bg:'#f5f3ff', students:'Up to 120 students',  features:['PM1 & PM2 assessments','CSV student import','Priority support','Everything in Classroom','Unlimited periods'] },
      'School':      { price:'$54.99/mo', color:'#E8562A', bg:'#fff3ef', students:'200+ students',       features:['Admin dashboard','API access','Dedicated onboarding call','SLA guarantee','Everything in Grade Level'] },
    };
    const p = PLANS[plan] || PLANS['Classroom'];
    const check = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${p.color}" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><button onclick="App.go('teacher-pricing')" style="background:none;border:none;font-size:0.82rem;color:var(--muted);cursor:pointer;font-weight:600">← Back to Plans</button></nav>
      <div style="max-width:800px;margin:0 auto;padding:40px 24px 80px">
        <div style="text-align:center;margin-bottom:32px">
          <h1 style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Start your free trial</h1>
          <p style="color:#6b7280;font-size:0.95rem;font-weight:500">14 days free · No credit card required · Cancel anytime</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
          <!-- Plan summary -->
          <div style="background:${p.bg};border:2px solid ${p.color}33;border-radius:24px;padding:28px">
            <div style="font-size:0.72rem;font-weight:800;color:${p.color};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">Selected Plan</div>
            <h2 style="font-size:1.6rem;font-weight:900;color:${p.color};margin-bottom:4px">Learn ${plan}</h2>
            <div style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:4px">${p.price}</div>
            <div style="font-size:0.8rem;color:#6b7280;font-weight:600;margin-bottom:20px">${p.students}</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${p.features.map(f => `<div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;font-weight:600;color:#374151">${check} ${f}</div>`).join('')}
            </div>
            <div style="margin-top:20px;padding:14px;background:white;border-radius:12px;font-size:0.78rem;color:#6b7280;font-weight:600;line-height:1.5">
              🔒 Your 14-day trial is completely free. We'll remind you before it ends — no surprise charges.
            </div>
          </div>
          <!-- Form -->
          <div style="background:white;border-radius:24px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
            <h3 style="font-size:1rem;font-weight:900;margin-bottom:20px;color:#111">Tell us about your classroom</h3>
            <form onsubmit="App.submitCheckout(event,'${plan}')" style="display:flex;flex-direction:column;gap:16px">
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:800;margin-bottom:7px;color:#374151">Your Name</label>
                <input name="name" type="text" placeholder="e.g. Ms. Rivera" required style="width:100%;padding:11px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='${p.color}'" onblur="this.style.borderColor='#e5e7eb'">
              </div>
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:800;margin-bottom:7px;color:#374151">Email Address</label>
                <input name="email" type="email" placeholder="teacher@school.com" required style="width:100%;padding:11px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='${p.color}'" onblur="this.style.borderColor='#e5e7eb'">
              </div>
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:800;margin-bottom:7px;color:#374151">School Name</label>
                <input name="school" type="text" placeholder="e.g. Lincoln Middle School" required style="width:100%;padding:11px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='${p.color}'" onblur="this.style.borderColor='#e5e7eb'">
              </div>
              <div style="background:#f9fafb;border-radius:14px;padding:16px;margin-top:4px">
                <div style="font-size:0.8rem;font-weight:800;color:#374151;margin-bottom:4px">🎓 Start Free Trial — No Card Required</div>
                <div style="font-size:0.75rem;color:#6b7280;font-weight:500">We'll ask for payment after your 14-day trial ends.</div>
              </div>
              <button type="submit" style="background:${p.color};color:white;border:none;border-radius:14px;padding:15px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">Activate My Free Trial →</button>
            </form>
          </div>
        </div>
      </div>`;
  },

  checkoutSuccess() {
    const user = (typeof App !== 'undefined') ? App.getUser() : {};
    const code = (user && user.classCode) ? user.classCode : 'LRN-????';
    const plan = (user && user.plan) ? user.plan : 'Classroom';
    const trialEnd = user && user.trialStarted
      ? new Date(user.trialStarted + 14*24*60*60*1000).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'})
      : '14 days from now';
    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a></nav>
      <div style="max-width:600px;margin:0 auto;padding:56px 24px 80px;text-align:center">
        <div style="font-size:4rem;margin-bottom:16px">✅</div>
        <h1 style="font-size:2.2rem;font-weight:900;letter-spacing:-1px;margin-bottom:8px">You're in! Welcome to Learn ${plan}.</h1>
        <p style="color:#6b7280;font-size:1rem;font-weight:500;margin-bottom:32px">Your 14-day free trial is active. No charge until <strong>${trialEnd}</strong>.</p>

        <!-- Class code -->
        <div style="background:#f0fdf4;border:2.5px solid #059669;border-radius:24px;padding:28px;margin-bottom:24px">
          <div style="font-size:0.75rem;font-weight:800;color:#059669;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">📎 Your Class Code</div>
          <div style="font-size:3rem;font-weight:900;letter-spacing:0.15em;color:#059669;margin-bottom:12px">${code}</div>
          <p style="font-size:0.88rem;color:#374151;font-weight:600;margin-bottom:16px">Share this code with your students so they can join your class. Students enter it when they sign up.</p>
          <button onclick="navigator.clipboard && navigator.clipboard.writeText('${code}').then(() => this.textContent='✔ Copied!')" style="background:#059669;color:white;border:none;border-radius:10px;padding:10px 22px;font-size:0.88rem;font-weight:800;cursor:pointer;font-family:inherit">Copy Code 📋</button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
          <button onclick="App.go('dashboard/teacher')" style="background:#111;color:white;border:none;border-radius:14px;padding:15px;font-size:0.95rem;font-weight:900;cursor:pointer;font-family:inherit">Go to Teacher Dashboard →</button>
          <button onclick="App.go('teacher-onboard/1')" style="background:white;color:#374151;border:2px solid #e5e7eb;border-radius:14px;padding:15px;font-size:0.95rem;font-weight:700;cursor:pointer;font-family:inherit">Complete Setup</button>
        </div>
        <p style="font-size:0.78rem;color:#9ca3af">Questions? Reach us at <strong>hello@learn-edu.pages.dev</strong></p>
      </div>`;
  },

  joinClass() {
    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><button onclick="App.go('home')" style="background:none;border:none;font-size:0.82rem;color:var(--muted);cursor:pointer;font-weight:600">← Home</button></nav>
      <div style="max-width:440px;margin:0 auto;padding:72px 24px 80px;text-align:center">
        <div style="font-size:3rem;margin-bottom:14px">🔑</div>
        <h1 style="font-size:1.9rem;font-weight:900;letter-spacing:-1px;margin-bottom:8px">Join a Class</h1>
        <p style="color:#6b7280;font-size:0.9rem;font-weight:500;margin-bottom:32px">Enter the class code your teacher shared with you</p>
        <div style="background:white;border-radius:24px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <form onsubmit="App.joinClass(event)" style="display:flex;flex-direction:column;gap:14px">
            <input id="join-class-input" type="text" placeholder="LRN-1234" autocapitalize="characters" maxlength="8" style="width:100%;padding:16px;border:2.5px solid #e5e7eb;border-radius:14px;font-size:1.5rem;font-weight:900;letter-spacing:0.15em;text-align:center;text-transform:uppercase;box-sizing:border-box;color:#059669;font-family:inherit" onfocus="this.style.borderColor='#059669'" onblur="this.style.borderColor='#e5e7eb'">
            <div id="join-class-error" style="display:none;color:#dc2626;font-size:0.82rem;font-weight:700;background:#fef2f2;padding:8px 12px;border-radius:8px"></div>
            <button type="submit" style="background:#059669;color:white;border:none;border-radius:14px;padding:14px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">Join Class →</button>
          </form>
        </div>
        <p style="margin-top:16px;font-size:0.78rem;color:#9ca3af">Ask your teacher for the LRN-XXXX code.</p>
      </div>`;
  },

  // ── Signup Loading Screen ────────────────────────────────────────────────
  signupLoading() {
    return `
      <div style="min-height:100vh;background:white;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px">
        <img src="anim/egg.gif" alt="Loading..." style="width:200px;height:200px;object-fit:contain;margin-bottom:8px">
        <h2 id="signup-loading-msg" style="font-size:1.5rem;font-weight:900;letter-spacing:-0.5px;color:#111;margin-bottom:6px">Hatching your account...</h2>
        <p id="signup-loading-sub" style="font-size:0.9rem;color:#9ca3af;font-weight:500">Setting everything up just for you</p>
      </div>
      <script>
        (function() {
          var msgs = [
            { h: 'Hatching your account...', s: 'Setting everything up just for you' },
            { h: 'Personalizing your experience...', s: 'Almost there!' },
            { h: 'Ready to learn!', s: 'Taking you in...' },
          ];
          var i = 0;
          var h = document.getElementById('signup-loading-msg');
          var p = document.getElementById('signup-loading-sub');
          function next() {
            i++;
            if (i < msgs.length) {
              if (h) h.textContent = msgs[i].h;
              if (p) p.textContent = msgs[i].s;
              setTimeout(next, i === msgs.length - 1 ? 900 : 1100);
            } else {
              var dest = localStorage.getItem('learnedu-signup-dest') || 'home';
              localStorage.removeItem('learnedu-signup-dest');
              App.go(dest);
            }
          }
          setTimeout(next, 1100);
        })();
      <\/script>`;
  },

  // ── District Welcome ────────────────────────────────────────────────────
  districtWelcome() {
    const user = App.getUser();
    const name = user ? user.name : 'Student';
    const grade = user ? (user.grade || 'Grade 6') : 'Grade 6';
    const district = 'Riverside Unified School District';
    const stats = [
      { n:'3,847', label:'District students on Learn.edu' },
      { n:'12',    label:'Lessons assigned by your teachers' },
      { n:'84%',   label:'District avg score this semester' },
      { n:'Top 5', label:'Your district in state rankings' },
    ];
    return `
      ${this.nav()}
      <div style="max-width:740px;margin:0 auto;padding:48px 24px 80px">
        <div style="text-align:center;margin-bottom:36px">
          <div style="font-size:2.8rem;margin-bottom:12px">🏫</div>
          <h1 style="font-size:2.2rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Welcome, ${name}!</h1>
          <p style="color:#6b7280;font-weight:600;font-size:0.95rem">${district}</p>
          <div style="display:inline-block;background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:999px;padding:5px 16px;font-size:0.8rem;font-weight:800;color:#059669;margin-top:8px">✓ District verified</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:28px">
          ${stats.map(s=>`
            <div style="background:white;border-radius:20px;padding:22px;box-shadow:0 2px 12px rgba(0,0,0,0.06);text-align:center">
              <div style="font-size:1.9rem;font-weight:900;letter-spacing:-1px;color:#E8562A">${s.n}</div>
              <div style="font-size:0.8rem;font-weight:600;color:#6b7280;margin-top:4px">${s.label}</div>
            </div>`).join('')}
        </div>
        <div style="background:white;border-radius:20px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin-bottom:20px">
          <h3 style="font-size:1rem;font-weight:900;margin-bottom:14px">📋 Assigned Lessons</h3>
          ${[
            {title:'Ratios & Rates', subj:'Math', due:'Due May 2', color:'var(--math)'},
            {title:'Ecosystems',     subj:'Science', due:'Due May 5', color:'var(--sci)'},
            {title:'Verb Conjugation',subj:'Spanish', due:'Due May 7', color:'var(--spa)'},
          ].map(l=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f3f4f6">
              <span style="font-size:0.72rem;font-weight:800;background:${l.color}22;color:${l.color};padding:3px 8px;border-radius:6px">${l.subj}</span>
              <span style="flex:1;font-weight:700;font-size:0.9rem">${l.title}</span>
              <span style="font-size:0.75rem;font-weight:700;color:#9ca3af">${l.due}</span>
              <button onclick="App.go('subject/${l.subj.toLowerCase()}')" style="background:#E8562A;color:white;border:none;border-radius:8px;padding:5px 12px;font-size:0.75rem;font-weight:800;cursor:pointer;font-family:inherit">Start</button>
            </div>`).join('')}
        </div>
        <div style="text-align:center;margin-bottom:12px">
          <button onclick="var el=document.getElementById('ep');el.style.display=el.style.display==='none'?'block':'none'" style="background:white;border:2px solid #e5e7eb;border-radius:12px;padding:10px 20px;font-size:0.88rem;font-weight:800;cursor:pointer;font-family:inherit">✏️ Edit Study Plan</button>
        </div>
        <div id="ep" style="display:none;background:white;border-radius:20px;padding:22px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin-bottom:16px">
          <h3 style="font-size:0.95rem;font-weight:900;margin-bottom:14px">Customize Your Plan</h3>
          <form onsubmit="App.saveEditPlan(event)" style="display:flex;flex-direction:column;gap:12px">
            <div><label style="display:block;font-size:0.82rem;font-weight:800;margin-bottom:5px">Math Level</label>
              <select name="mathGrade" style="width:100%;padding:10px;border:2px solid #e5e7eb;border-radius:10px;font-family:inherit;font-weight:600">
                ${[4,5,6,7,8,9].map(g=>'<option value="'+g+'" '+(g===mathGrade?'selected':'')+'>Grade '+g+'</option>').join('')}
              </select></div>
            <div><label style="display:block;font-size:0.82rem;font-weight:800;margin-bottom:5px">Science Track</label>
              <select name="sciLevel" style="width:100%;padding:10px;border:2px solid #e5e7eb;border-radius:10px;font-family:inherit;font-weight:600">
                ${[['earth','Earth Science'],['life','Life Science'],['physical','Physical Science'],['advanced','Advanced Science']].map(([v,l])=>'<option value="'+v+'" '+(v===sciLevel?'selected':'')+'>'+l+'</option>').join('')}
              </select></div>
            <div><label style="display:block;font-size:0.82rem;font-weight:800;margin-bottom:5px">Spanish Level</label>
              <select name="spaLevel" style="width:100%;padding:10px;border:2px solid #e5e7eb;border-radius:10px;font-family:inherit;font-weight:600">
                ${[['beginning','Beginning Spanish'],['spanish1','Spanish 1'],['spanish2','Spanish 2'],['advanced','Advanced Spanish']].map(([v,l])=>'<option value="'+v+'" '+(v===spaLevel?'selected':'')+'>'+l+'</option>').join('')}
              </select></div>
            <button type="submit" style="background:#E8562A;color:white;border:none;border-radius:12px;padding:12px;font-weight:900;cursor:pointer;font-family:inherit">Save Changes</button>
          </form>
        </div>
        <div style="text-align:center">
          <button onclick="App.go('home')" style="background:#E8562A;color:white;border:none;border-radius:14px;padding:15px 32px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">Start Learning →</button>
        </div>
      </div>`;
  },

  // ── Homeschool Parent Onboarding (15 questions) ─────────────────────────
  homeschoolOnboard(step) {
    step = step || 1;
    const STEPS = [
      {
        title: "About Your Child",
        questions: [
          { id:'child_name',  label:"What is your child's first name?",            type:'text',   placeholder:'e.g. Sofia' },
          { id:'child_age',   label:"How old is your child?",                      type:'select', options:['7','8','9','10','11','12','13','14','15','16'] },
          { id:'child_grade', label:"What grade level are they working at?",       type:'select', options:['Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Above Grade 9'] },
        ]
      },
      {
        title: "Your Schedule",
        questions: [
          { id:'days_per_week', label:"How many days per week do you homeschool?",   type:'select', options:['2-3 days','4 days','5 days','6-7 days','It varies'] },
          { id:'hours_per_day', label:"How many hours per day do you study?",        type:'select', options:['1-2 hours','2-3 hours','3-4 hours','4-5 hours','5+ hours'] },
          { id:'structure',     label:"How do you prefer to structure learning?",    type:'select', options:['Highly structured (set schedule)','Flexible (child-led)','Mix of both','Project-based learning'] },
        ]
      },
      {
        title: "Academic Profile",
        questions: [
          { id:'strongest',   label:"Which subject is your child's strongest?",    type:'select', options:['Math','Science','Language Arts','Spanish/Language','History','Art/Music'] },
          { id:'weakest',     label:"Which subject needs the most work?",          type:'select', options:['Math','Science','Spanish','Reading/Writing','Critical Thinking'] },
          { id:'math_level',  label:"Where is your child in math?",               type:'select', options:['Still building basics (add/subtract/multiply)','Fractions & decimals','Pre-algebra','Algebra','Geometry/Advanced Algebra','Pre-calculus'] },
        ]
      },
      {
        title: "Learning Style & Goals",
        questions: [
          { id:'learn_style', label:"How does your child learn best?",             type:'select', options:['Visual (diagrams, videos)','Hands-on / tactile','Reading & writing','Auditory / verbal','Mix of all styles'] },
          { id:'language',    label:"Have they started learning a second language?", type:'select', options:['No, just starting','Some Spanish basics','Spanish 1 level','Intermediate Spanish','Another language'] },
          { id:'science_int', label:"What science topics interest them most?",     type:'select', options:['Earth & space','Biology & living things','Physics & forces','Chemistry','All equally','Not sure yet'] },
        ]
      },
      {
        title: "Challenges & Goals",
        questions: [
          { id:'learn_diff',  label:"Any learning differences we should know about? (optional)", type:'select', options:['None / not sure','Dyslexia','ADHD','Dyscalculia','Autism spectrum','Multiple / other'] },
          { id:'goal',        label:"What is your biggest academic goal this year?",  type:'select', options:['Get to grade level in all subjects','Master one specific subject','Build study habits','Prepare for traditional school','Explore broadly','Academic enrichment & acceleration'] },
          { id:'challenge',   label:"What is your biggest challenge as a homeschool parent?", type:'select', options:['Keeping my child engaged','Finding the right curriculum','Covering all subjects well','Tracking progress','Balancing with work/life','Getting my child to stay on task'] },
        ]
      },
    ];

    const totalSteps = STEPS.length;
    const s = STEPS[step - 1];
    if (!s) return this.notFound();

    const progressPct = Math.round((step - 1) / totalSteps * 100);
    const isLast = step === totalSteps;

    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><span style="font-size:0.82rem;font-weight:600;color:var(--muted)">Homeschool Setup · Step ${step} of ${totalSteps}</span></nav>
      <div style="max-width:560px;margin:0 auto;padding:40px 24px 80px">
        <div style="height:6px;background:#f3f4f6;border-radius:999px;margin-bottom:28px;overflow:hidden">
          <div style="height:100%;width:${progressPct}%;background:#E8562A;border-radius:999px;transition:width 0.4s"></div>
        </div>
        <div style="text-align:center;margin-bottom:28px">
          <div style="font-size:1.6rem;margin-bottom:6px">📋</div>
          <h1 style="font-size:1.7rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:4px">${s.title}</h1>
          <p style="color:#6b7280;font-size:0.88rem;font-weight:500">Step ${step} of ${totalSteps} — takes about 2 minutes total</p>
        </div>
        <div style="background:white;border-radius:24px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <form onsubmit="App.saveOnboardStep(event,${step})" style="display:flex;flex-direction:column;gap:20px">
            ${s.questions.map(q=>`
              <div>
                <label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:8px;color:#374151">${q.label}</label>
                ${q.type==='select'
                  ? `<select name="${q.id}" style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;font-weight:600;appearance:none;background:white">${q.options.map(o=>`<option>${o}</option>`).join('')}</select>`
                  : `<input name="${q.id}" type="text" placeholder="${q.placeholder||''}" style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box">`
                }
              </div>`).join('')}
            <button type="submit" style="background:#E8562A;color:white;border:none;border-radius:14px;padding:15px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">${isLast ? 'Generate My Study Plan →' : 'Next →'}</button>
          </form>
        </div>
        ${step > 1 ? `<div style="text-align:center;margin-top:12px"><button onclick="App.go('homeschool-onboard/${step-1}')" style="background:none;border:none;color:var(--muted);font-size:0.82rem;font-weight:600;cursor:pointer">← Back</button></div>` : ''}
      </div>`;
  },

  // ── Study Plan (generated after homeschool onboarding) ──────────────────
  studyPlanView() {
    const user = App.getUser();
    const ob = JSON.parse(localStorage.getItem('learnedu-onboard') || '{}');
    const name  = ob.child_name  || 'Your child';
    const grade = ob.child_grade || 'Grade 6';
    const weak  = ob.weakest     || 'Math';
    const style = ob.learn_style || 'Visual';
    const days  = ob.days_per_week || '5 days';
    const mathL = ob.math_level  || 'Pre-algebra';
    const lang  = ob.language    || 'Some Spanish basics';
    const sciI  = ob.science_int || 'Earth & space';

    // Map math level to grade (use override from edit plan if available)
    const savedPlan = user && user.studyPlan;
    const mathGrade = savedPlan && savedPlan.mathGrade ? savedPlan.mathGrade : ({
      'Still building basics (add/subtract/multiply)': 4,
      'Fractions & decimals': 5,
      'Pre-algebra': 6,
      'Algebra': 7,
      'Geometry/Advanced Algebra': 8,
      'Pre-calculus': 9,
    }[mathL] || 6);

    const sciLevel = savedPlan && savedPlan.sciLevel ? savedPlan.sciLevel : ({
      'Earth & space': 'earth',
      'Biology & living things': 'life',
      'Physics & forces': 'physical',
      'Chemistry': 'advanced',
      'All equally': 'earth',
      'Not sure yet': 'life',
    }[sciI] || 'earth');

    const spaLevel = savedPlan && savedPlan.spaLevel ? savedPlan.spaLevel : ({
      'No, just starting': 'beginning',
      'Some Spanish basics': 'beginning',
      'Spanish 1 level': 'spanish1',
      'Intermediate Spanish': 'spanish2',
    }[lang] || 'beginning');

    const schedule = [
      { day:'Mon', subjects:['Math','Science'] },
      { day:'Tue', subjects:['Spanish','Practice Mode'] },
      { day:'Wed', subjects:['Math','Real World'] },
      { day:'Thu', subjects:['Science','Flashcards'] },
      { day:'Fri', subjects:['Math','Spanish','Quiz Mode'] },
    ].slice(0, parseInt(days) || 5);

    const plan = [
      { subject:'📐 Math',    level:`Grade ${mathGrade}`,  lessonsPerWeek:3, color:'var(--math)', link:`subject/math/${mathGrade}` },
      { subject:'⚗️ Science', level:sciLevel.charAt(0).toUpperCase()+sciLevel.slice(1)+' Science', lessonsPerWeek:2, color:'var(--sci)', link:`subject/science/${sciLevel}` },
      { subject:'🌎 Spanish', level:['beginning','spanish1','spanish2','advanced'].indexOf(spaLevel) === 0 ? 'Beginning Spanish' : spaLevel === 'spanish1' ? 'Spanish 1' : 'Spanish 2', lessonsPerWeek:2, color:'var(--spa)', link:`subject/spanish/${spaLevel}` },
    ];

    // Save plan to user profile
    const planData = { mathGrade, sciLevel, spaLevel, generatedAt: Date.now() };
    const u = App.getUser();
    if (u) { u.studyPlan = planData; u.childName = name; App.saveUser(u); }

    return `
      ${this.nav()}
      <div style="max-width:680px;margin:0 auto;padding:40px 24px 80px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:2.8rem;margin-bottom:10px">🎯</div>
          <h1 style="font-size:2.1rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">${name}'s Study Plan</h1>
          <p style="color:#6b7280;font-weight:500;font-size:0.9rem">Personalized for ${grade} · ${style} learner · ${days}/week</p>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px">
          ${plan.map(p=>`
            <div style="background:white;border-radius:20px;padding:20px 24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);display:flex;align-items:center;gap:16px">
              <div style="font-size:1.8rem">${p.subject.split(' ')[0]}</div>
              <div style="flex:1">
                <div style="font-weight:900;font-size:1rem">${p.subject.slice(3)}</div>
                <div style="font-size:0.8rem;color:#6b7280;font-weight:600">${p.level} · ${p.lessonsPerWeek} lessons/week</div>
              </div>
              <button onclick="App.go('${p.link}')" style="background:#E8562A;color:white;border:none;border-radius:12px;padding:9px 18px;font-weight:800;font-size:0.82rem;cursor:pointer;font-family:inherit">Start →</button>
            </div>`).join('')}
        </div>

        <div style="background:white;border-radius:20px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);margin-bottom:20px">
          <h3 style="font-size:1rem;font-weight:900;margin-bottom:14px">📅 Suggested Weekly Schedule</h3>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
            ${['Mon','Tue','Wed','Thu','Fri'].map((d,i)=>`
              <div style="background:#f9fafb;border-radius:12px;padding:10px 6px;text-align:center">
                <div style="font-size:0.72rem;font-weight:900;color:#9ca3af;margin-bottom:6px">${d}</div>
                <div style="font-size:0.68rem;font-weight:700;color:#374151;line-height:1.4">${['Math + Science','Spanish + Study Tools','Math + Real World','Science + Flashcards','Math + Spanish'][i]}</div>
              </div>`).join('')}
          </div>
        </div>

        <div style="background:#fff3ef;border-radius:20px;padding:20px 24px;border:2px solid #E8562A22;margin-bottom:28px">
          <div style="font-size:0.78rem;font-weight:800;color:#E8562A;margin-bottom:6px">💡 PERSONALIZED TIP</div>
          <p style="font-size:0.88rem;color:#374151;font-weight:500;line-height:1.5">${name} learns best ${style.toLowerCase()}. We recommend starting each session with a <strong>Flashcard</strong> review, then a lesson, then a <strong>Practice</strong> drill to lock it in.</p>
        </div>

        <div style="text-align:center">
          <button onclick="App.go('home')" style="background:#E8562A;color:white;border:none;border-radius:14px;padding:15px 40px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">Start Learning →</button>
        </div>
      </div>`;
  },

  // ── Netflix-style Profile Picker ────────────────────────────────────────
  profilePicker() {
    const user = App.getUser();
    const childName = (user && user.child) ? user.child : (user && user.childName) ? user.childName : 'Child';
    const parentName = (user && user.name) ? user.name : 'Parent';

    const profiles = [
      { id:'parent', label:parentName,  emoji:'👤', color:'#0369a1', bg:'#0369a1', dest:'dashboard/parent' },
      { id:'child',  label:childName,   emoji:'🎒', color:'#E8562A', bg:'#E8562A', dest:'dashboard/student' },
    ];

    return `
      <div style="min-height:100vh;background:#141414;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px">
        <img src="logo.svg" alt="Learn.edu" style="height:36px;margin-bottom:60px;opacity:0.9;filter:brightness(10)">
        <h1 style="color:white;font-size:1.8rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:48px">Who's learning today?</h1>
        <div style="display:flex;gap:32px;flex-wrap:wrap;justify-content:center">
          ${profiles.map(p=>`
            <div onclick="App.pickProfile('${p.dest}')" style="display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer;group">
              <div style="width:120px;height:120px;border-radius:12px;background:${p.bg};display:flex;align-items:center;justify-content:center;font-size:3.5rem;border:3px solid transparent;transition:border-color 0.2s;box-shadow:0 4px 20px rgba(0,0,0,0.4)"
                   onmouseover="this.style.borderColor='white';this.style.transform='scale(1.05)'"
                   onmouseout="this.style.borderColor='transparent';this.style.transform='scale(1)'"
                   style="transition:all 0.15s">${p.emoji}</div>
              <span style="color:#ccc;font-size:0.95rem;font-weight:700;letter-spacing:0.05em">${p.label}</span>
            </div>`).join('')}
          <div onclick="App.go('signup')" style="display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer">
            <div style="width:120px;height:120px;border-radius:12px;background:#2a2a2a;border:3px dashed #555;display:flex;align-items:center;justify-content:center;font-size:2.5rem;transition:all 0.15s"
                 onmouseover="this.style.borderColor='white'" onmouseout="this.style.borderColor='#555'">＋</div>
            <span style="color:#888;font-size:0.9rem;font-weight:700">Add Profile</span>
          </div>
        </div>
        <button onclick="App.logout()" style="margin-top:60px;background:none;border:1px solid #555;color:#888;border-radius:8px;padding:8px 20px;font-size:0.82rem;cursor:pointer;font-family:inherit">Sign Out</button>
      </div>`;
  },

  notFound() {
    return `
      ${this.nav({ hash: 'home', label: '← Home' })}
      <div class="empty" style="padding:80px 0">
        <div class="e-icon">🤔</div>
        <p>Page not found. <a href="#home" style="color:var(--math)">Go home →</a></p>
      </div>`;
  },

  // -- Education doodles: scattered, non-overlapping
  _doodles() {
    const c = (ic, bg, col, right, top, anim) =>
      `<div class="doodle ${anim}" style="top:${top}px;right:${right}px;position:absolute">
         <div class="doodle-card" style="background:${bg}">
           <i class="ph-bold ph-${ic}" style="font-size:34px;color:${col}"></i>
         </div>
       </div>`;

    return `
      ${c('flask',           '#DCFCE7','#16A34A',  18,  15, 'd2')}
      ${c('pencil-simple',   '#FEF3C7','#D97706', 108,  22, 'd1')}
      ${c('graduation-cap',  '#F3F4F6','#374151', 215,   8, 'd3')}

      ${c('atom',            '#EFF6FF','#3B82F6',  25, 112, 'd5')}
      ${c('star-four',       '#FEF9C3','#EAB308', 120, 125, 'd8')}
      ${c('calculator',      '#F5F3FF','#7C3AED', 215, 112, 'd4')}

      ${c('lightbulb',       '#FEF3C7','#F59E0B',   5, 210, 'd6')}
      ${c('plus',            '#FFF0EB','#E8562A', 100, 218, 'd7')}
      ${c('exam',            '#DCFCE7','#16A34A', 195, 204, 'd2')}

      ${c('math-operations', '#FFFBEB','#D97706',  18, 302, 'd3')}
      ${c('ruler',           '#FEF3C7','#D97706', 112, 310, 'd5')}
      ${c('backpack',        '#FCE7F3','#DB2777', 210, 298, 'd1')}
    `;
  },

  // ── Helpers
  _subjectIcon(key) {
    const map = { math: Icons.math(22), science: Icons.science(22), spanish: Icons.spanish(22) };
    return map[key] || Icons.bookOpen(22);
  },

  // ── Spark Play (student quiz) ────────────────────────────────
  sparkPlay() {
    return `
      ${this.nav({hash:'home',label:'← Home'})}
      <div class="zen-bg" style="min-height:100vh">
        <div class="zen-blob zen-blob-1"></div>
        <div class="zen-blob zen-blob-2"></div>
        <div class="zen-blob zen-blob-3"></div>
        <div id="spark-play-root" style="position:relative;z-index:1;max-width:680px;margin:0 auto;padding:32px 20px 60px"></div>
      </div>
      <!-- Dev shortcut bar -->
      <div id="spark-dev-bar" style="position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;justify-content:center;padding:10px 16px;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-top:1px solid #e5e7eb;gap:8px;align-items:center">
        <span style="font-size:0.72rem;font-weight:700;color:#9ca3af">Dev shortcut:</span>
        <input id="spark-dev-input" type="text" maxlength="10" placeholder="type code…"
          style="border:1.5px solid #e5e7eb;border-radius:8px;padding:5px 12px;font-size:0.82rem;font-weight:700;width:120px;outline:none;font-family:inherit"
          onkeydown="if(event.key==='Enter')SparkDev.run(this.value)"
          oninput="if(this.value==='1114')SparkDev.run(this.value)">
        <button onclick="SparkDev.run(document.getElementById('spark-dev-input').value)"
          style="background:#E8562A;color:white;border:none;border-radius:8px;padding:5px 14px;font-size:0.78rem;font-weight:800;cursor:pointer;font-family:inherit">Go →</button>
        <button onclick="document.getElementById('spark-dev-bar').style.display='none'"
          style="background:none;border:1px solid #e5e7eb;border-radius:8px;padding:5px 10px;font-size:0.72rem;color:#9ca3af;cursor:pointer">✕</button>
      </div>`;
  },
};

// ── SparkPlay engine ─────────────────────────────────────────
window.SparkPlay = (() => {
  const ALL = [
    // ── MATH (20) ──────────────────────────────────────────────
    {q:'What is 7 × 8?',                                       a:'56',                         w:['54','48','63'],                                         code:'4-MU',subj:'math',topic:'Multiplication'},
    {q:'8 × 9 = ?',                                            a:'72',                         w:['64','81','63'],                                         code:'4-MU',subj:'math',topic:'Multiplication'},
    {q:'6 × 7 = ?',                                            a:'42',                         w:['36','49','48'],                                         code:'4-MU',subj:'math',topic:'Multiplication'},
    {q:'9 × 11 = ?',                                           a:'99',                         w:['88','108','119'],                                        code:'4-MU',subj:'math',topic:'Multiplication'},
    {q:'12 × 4 = ?',                                           a:'48',                         w:['42','52','36'],                                         code:'4-MU',subj:'math',topic:'Multiplication'},
    {q:'144 ÷ 12 = ?',                                         a:'12',                         w:['11','13','14'],                                         code:'4-LD',subj:'math',topic:'Long Division'},
    {q:'84 ÷ 4 = ?',                                           a:'21',                         w:['18','24','22'],                                         code:'4-LD',subj:'math',topic:'Long Division'},
    {q:'96 ÷ 8 = ?',                                           a:'12',                         w:['11','13','16'],                                         code:'4-LD',subj:'math',topic:'Long Division'},
    {q:'Which fraction is larger: 3/4 or 2/3?',                a:'3/4',                        w:['2/3','They are equal','1/2'],                            code:'5-FR',subj:'math',topic:'Fractions'},
    {q:'Which fraction equals 2/4?',                           a:'1/2',                        w:['1/3','2/3','3/4'],                                      code:'5-FR',subj:'math',topic:'Fractions'},
    {q:'What is 1/2 of 16?',                                   a:'8',                          w:['6','4','10'],                                           code:'5-FR',subj:'math',topic:'Fractions'},
    {q:'Which is bigger: 5/8 or 1/2?',                         a:'5/8',                        w:['1/2','They are equal','2/4'],                            code:'5-FR',subj:'math',topic:'Fractions'},
    {q:'4.5 + 2.8 = ?',                                        a:'7.3',                        w:['6.3','7.8','6.8'],                                      code:'5-DE',subj:'math',topic:'Decimals'},
    {q:'0.75 is the same as which fraction?',                  a:'3/4',                        w:['1/2','1/4','2/3'],                                      code:'5-DE',subj:'math',topic:'Decimals'},
    {q:'4.7 − 2.3 = ?',                                        a:'2.4',                        w:['2.1','3.4','1.4'],                                      code:'5-DE',subj:'math',topic:'Decimals'},
    {q:'2.3 + 1.5 = ?',                                        a:'3.8',                        w:['3.5','4.8','2.8'],                                      code:'5-DE',subj:'math',topic:'Decimals'},
    {q:'Simplify the ratio 12:16',                             a:'3:4',                        w:['6:8','4:5','2:3'],                                      code:'6-RA',subj:'math',topic:'Ratios'},
    {q:'A car travels 150 miles in 3 hours. What is its speed in mph?', a:'50 mph',            w:['45 mph','55 mph','60 mph'],                              code:'6-RA',subj:'math',topic:'Ratios'},
    {q:'Simplify the ratio 18:24',                             a:'3:4',                        w:['6:8','2:3','4:5'],                                      code:'6-RA',subj:'math',topic:'Ratios'},
    {q:'2 cups of flour per 3 cups water. How much flour for 9 cups of water?', a:'6 cups',   w:['4 cups','3 cups','9 cups'],                              code:'6-RA',subj:'math',topic:'Ratios'},
    // ── SCIENCE (15) ───────────────────────────────────────────
    {q:'What is the "control center" of the cell?',            a:'Nucleus',                    w:['Mitochondria','Cell wall','Cytoplasm'],                  code:'5-CE',subj:'science',topic:'Cells'},
    {q:'Which organelle produces energy for the cell?',        a:'Mitochondria',               w:['Nucleus','Ribosome','Vacuole'],                          code:'5-CE',subj:'science',topic:'Cells'},
    {q:'Which structure is found in plant cells but NOT animal cells?', a:'Cell wall',         w:['Cell membrane','Nucleus','Cytoplasm'],                   code:'5-CE',subj:'science',topic:'Cells'},
    {q:'What is the flexible outer boundary of ALL cells?',    a:'Cell membrane',              w:['Cell wall','Nucleus','Cytoplasm'],                       code:'5-CE',subj:'science',topic:'Cells'},
    {q:'A food chain always starts with a ___',                a:'Producer',                   w:['Consumer','Decomposer','Predator'],                      code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'Which is NOT a living (biotic) part of an ecosystem?', a:'Rock',                       w:['Tree','Rabbit','Mushroom'],                              code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'Fungi and bacteria break down dead organisms. They are called...', a:'Decomposers',    w:['Producers','Consumers','Predators'],                     code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'Which pair correctly shows predator → prey?',          a:'Fox → Rabbit',               w:['Rabbit → Fox','Grass → Deer','Bird → Worm'],             code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'If all rabbits disappeared, what would happen to foxes?', a:'Fewer foxes',             w:['More foxes','Same number of foxes','All foxes would die'], code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'Chloroplasts make energy from ___',                    a:'Sunlight',                   w:['Water','Soil','Carbon dioxide'],                         code:'5-CE',subj:'science',topic:'Cells'},
    {q:'Correct order smallest → largest?',                    a:'Cell → Tissue → Organ → Organism', w:['Tissue → Cell → Organ → Organism','Organ → Tissue → Cell → Organism','Cell → Organ → Tissue → Organism'], code:'5-CE',subj:'science',topic:'Cells'},
    {q:'Plants make their own food using sunlight. They are called...', a:'Producers',         w:['Consumers','Decomposers','Predators'],                   code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'Bacteria differ from human cells because they have no...', a:'Nucleus',               w:['Cell wall','Cytoplasm','DNA'],                           code:'5-CE',subj:'science',topic:'Cells'},
    {q:'Non-living parts of an ecosystem are called ___ factors', a:'Abiotic',                w:['Biotic','Decomposer','Organic'],                         code:'4-EC',subj:'science',topic:'Ecosystems'},
    {q:'Which ecosystem has the most biodiversity?',           a:'Tropical rainforest',        w:['Arctic tundra','Desert','Grassland'],                    code:'4-EC',subj:'science',topic:'Ecosystems'},
    // ── SPANISH (25) ───────────────────────────────────────────
    {q:'How do you say "Hello" in Spanish?',                   a:'Hola',                       w:['Adiós','Gracias','Buenas'],                              code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'What does "Buenos días" mean?',                        a:'Good morning',               w:['Good night','Good afternoon','Hello'],                   code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'"¿Cómo estás?" means...',                             a:'How are you?',               w:['What is your name?','Good morning','Nice to meet you'],  code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'How do you say "Goodbye" in Spanish?',                 a:'Adiós',                      w:['Hola','Gracias','Buenas noches'],                        code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'It is 9 PM. Which Spanish greeting fits?',             a:'Buenas noches',              w:['Buenos días','Buenas tardes','Hola'],                    code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'"¿Cómo te llamas?" asks for your...',                  a:'Name',                       w:['Age','School','Grade'],                                  code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'How do you say "Good afternoon" in Spanish?',          a:'Buenas tardes',              w:['Buenos días','Buenas noches','Hola'],                    code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'"Mucho gusto" means...',                               a:'Nice to meet you',           w:['Thank you','Goodbye','How are you?'],                    code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'How do you say "Thank you" in Spanish?',               a:'Gracias',                    w:['Hola','Adiós','Por favor'],                              code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'"De nada" means...',                                   a:"You're welcome",             w:['Thank you','Please','Goodbye'],                         code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'How do you say "Please" in Spanish?',                  a:'Por favor',                  w:['Gracias','Adiós','De nada'],                             code:'4-GR',subj:'spanish',topic:'Greetings'},
    {q:'What is "cinco" in English?',                          a:'5',                          w:['3','7','6'],                                             code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'How do you say "10" in Spanish?',                      a:'Diez',                       w:['Cinco','Ocho','Doce'],                                   code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'What number is "quince"?',                             a:'15',                         w:['12','18','14'],                                         code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'How do you say "20" in Spanish?',                      a:'Veinte',                     w:['Diez','Quince','Dieciocho'],                             code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'What is "trece" in English?',                          a:'13',                         w:['11','15','16'],                                         code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'How do you say "7" in Spanish?',                       a:'Siete',                      w:['Seis','Ocho','Cinco'],                                   code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'Your age is 12. How do you say that in Spanish?',      a:'Doce',                       w:['Diez','Once','Trece'],                                   code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'Which number comes after "diecisiete"?',               a:'Dieciocho',                  w:['Diecinueve','Dieciséis','Veinte'],                       code:'4-NU',subj:'spanish',topic:'Numbers'},
    {q:'"Rojo" means...',                                      a:'Red',                        w:['Blue','Green','Yellow'],                                 code:'4-GR',subj:'spanish',topic:'Vocab'},
    {q:'"Grande" means...',                                    a:'Big / Large',                w:['Small','Tall','Round'],                                  code:'4-GR',subj:'spanish',topic:'Vocab'},
    {q:'"La escuela" means...',                                a:'The school',                 w:['The house','The car','The park'],                        code:'4-GR',subj:'spanish',topic:'Vocab'},
    {q:'How do you say "I like" in Spanish?',                  a:'Me gusta',                   w:['Me llamo','Tengo','Soy'],                                code:'4-GR',subj:'spanish',topic:'Vocab'},
    {q:'"¿Cuántos años tienes?" means...',                     a:'How old are you?',           w:['What is your name?','How are you?','Where do you live?'],code:'4-GR',subj:'spanish',topic:'Vocab'},
    {q:'How do you say "My name is" in Spanish?',              a:'Me llamo',                   w:['Me gusta','Tengo','Hay'],                                code:'4-GR',subj:'spanish',topic:'Vocab'},
  ];

  let state = {};

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function init() {
    state = {
      questions: shuffle(ALL),
      idx: 0,
      correct: 0,
      startMs: Date.now(),
      answered: false,
    };
    render();
  }

  function render() {
    const el = document.getElementById('spark-play-root');
    if (!el) return;
    const { idx, questions } = state;
    const total = questions.length;
    const pct = Math.round((idx / total) * 100);
    const q = questions[idx];
    const sColor = { math: 'var(--math)', science: 'var(--sci)', spanish: 'var(--spa)' }[q.subj] || '#888';
    const sBg    = { math: 'var(--math-bg)', science: 'var(--sci-bg)', spanish: 'var(--spa-bg)' }[q.subj] || '#f5f5f5';
    const choices = shuffle([q.a, ...q.w]);

    el.innerHTML = `
      <!-- Progress bar -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button onclick="App.go('home')" style="background:white;border:2px solid #e5e7eb;border-radius:999px;padding:7px 16px;font-size:0.8rem;font-weight:700;cursor:pointer;color:#374151">✕ Quit</button>
        <div style="flex:1;background:rgba(255,255,255,0.6);border-radius:999px;height:10px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#E8562A,#f97316);border-radius:999px;transition:width 0.4s ease"></div>
        </div>
        <span style="font-size:0.82rem;font-weight:800;color:#374151;white-space:nowrap">${idx + 1} / ${total}</span>
      </div>

      <!-- Card -->
      <div style="background:rgba(255,255,255,0.82);backdrop-filter:blur(16px);border-radius:24px;padding:36px 32px 32px;box-shadow:0 4px 32px rgba(0,0,0,0.07)">

        <!-- Subject + topic -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px">
          <span class="lesson-code" style="background:${sBg};color:${sColor};font-size:0.75rem">${q.code}</span>
          <span style="font-size:0.78rem;font-weight:600;color:#9ca3af">${q.topic}</span>
        </div>

        <!-- Question -->
        <p style="font-size:1.45rem;font-weight:800;line-height:1.35;letter-spacing:-0.4px;color:#111827;margin-bottom:28px">${q.q}</p>

        <!-- Choices -->
        <div id="choices-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          ${choices.map((c, i) => `
            <button
              class="spark-choice-btn"
              data-choice="${c.replace(/"/g,'&quot;')}"
              onclick="SparkPlay.answer('${c.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')"
              style="background:white;border:2px solid #e5e7eb;border-radius:16px;padding:16px 14px;font-size:0.95rem;font-weight:700;cursor:pointer;text-align:left;line-height:1.3;color:#1f2937;transition:all 0.15s">
              <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:#f3f4f6;font-size:0.72rem;font-weight:800;text-align:center;line-height:24px;margin-right:8px;flex-shrink:0">${String.fromCharCode(65+i)}</span>${c}
            </button>`).join('')}
        </div>


      </div>
    `;
    state.answered = false;
    state.currentChoices = choices;
    state.currentAnswer = q.a;
  }

  function answer(picked) {
    if (state.answered) return;
    state.answered = true;
    // Silent assessment mode — just dim selected + advance, no reveal
    document.querySelectorAll('.spark-choice-btn').forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = btn.dataset.choice === picked ? '1' : '0.35';
      if (btn.dataset.choice === picked) {
        btn.style.background = '#f3f4f6';
        btn.style.borderColor = '#9ca3af';
      }
    });
    setTimeout(() => next(), 350);
  }

  function next() {
    const el = document.getElementById('spark-play-root');
    if (!el) return;
    state.idx++;
    if (state.idx >= state.questions.length) {
      showResults();
    } else {
      render();
    }
  }


// Study Tools Views

Views.studyHub = function() {
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
    ${this.nav()}
    <div style="padding:20px 16px;max-width:680px;margin:0 auto">
      <h1 style="text-align:center;margin-bottom:20px;font-weight:900;letter-spacing:-1px">Study Tools</h1>
      <div class="tools-grid">${cards}</div>
      <div style="margin-top:36px;text-align:center;color:var(--muted);font-size:0.88rem;">Choose a tool above to start studying</div>
    </div>
  `;
};

Views.studyPicker = function(toolId) {
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
  return `${this.nav({hash:'study',label:'← Back'})}
    <div style="padding:20px 16px;max-width:680px;margin:0 auto">
      ${cards}
    </div>`;
};

Views.studyTool = function(toolId, subject, levelOrGrade) {
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
    var flashcardIndex = 0;
    html += this.nav({hash:'study',label:'← Back'});
    flashcardSetGlobal = set;
    flashcardIndexGlobal = 0;
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
    // Gather questions from the current subject's lessons
    const allLessonsForSubj = (subject === 'math'    ? (typeof MATH_LESSONS    !== 'undefined' ? MATH_LESSONS    : []) :
                               subject === 'science' ? (typeof SCIENCE_LESSONS !== 'undefined' ? SCIENCE_LESSONS : []) :
                               subject === 'spanish' ? (typeof SPANISH_LESSONS !== 'undefined' ? SPANISH_LESSONS : []) :
                               subject === 'ela'     ? (typeof ELA_LESSONS     !== 'undefined' ? ELA_LESSONS     : []) :
                                                       (typeof HISTORY_LESSONS !== 'undefined' ? HISTORY_LESSONS : []));
    const quizQs = allLessonsForSubj.flatMap(l => (l.quiz || []).map(q => ({...q, lessonTitle:l.title || l.id})));
    const practiceQs = allLessonsForSubj.flatMap(l => (l.practice || []).map(q => ({...q, lessonTitle:l.title || l.id})));
    const pool = (toolId === 'quiz' ? quizQs : practiceQs.concat(quizQs)).filter(q => q && q.q);
    const shuffled = pool.slice().sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
    if (!shuffled.length) {
      html = `<div style="padding:40px;text-align:center"><div style="font-size:2rem;margin-bottom:12px">📚</div><p style="color:#6b7280">No questions available yet for this subject. Complete some lessons first!</p></div>`;
    } else {
      const modeLabel = toolId === 'quiz' ? 'Quiz' : toolId === 'practice' ? 'Practice' : 'Test Prep';
      const modeColor = toolId === 'quiz' ? '#E8562A' : toolId === 'practice' ? '#059669' : '#7c3aed';
      const subjLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
      html += this.nav({hash:'study/' + subject, label:'← Back'});
      html += `
        <div id="pq-root" style="max-width:560px;margin:0 auto;padding:24px 20px 60px">
          <div style="text-align:center;margin-bottom:24px">
            <div style="font-size:0.72rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em">${subjLabel} ${modeLabel}</div>
            <h2 style="font-size:1.4rem;font-weight:900;margin-top:4px">${shuffled.length} Questions</h2>
          </div>
          <div id="pq-card" style="background:white;border-radius:20px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.08);margin-bottom:16px"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div id="pq-status" style="font-size:0.82rem;color:#9ca3af;font-weight:700">Question 1 of ${shuffled.length}</div>
            <div id="pq-score-bar" style="font-size:0.82rem;font-weight:800;color:${modeColor}">0 correct</div>
          </div>
          <div id="pq-btn-row" style="display:flex;gap:10px;justify-content:center"></div>
        </div>
      `;
      // Store questions for PracticeQuiz engine (inline scripts don't run in innerHTML)
      window.__PQQuestions = shuffled;
    }
  } else if (toolId === 'realworld') {
    const rwCards = REAL_WORLD.filter(rw => rw.subject === subject);
    if (!rwCards.length) {
      html = `<div style="padding:40px;text-align:center;color:#999">No Real World cards found for this subject.</div>`;
      return html;
    }
    html += this.nav({hash:'study',label:'← Back'});
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
};

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


  function showResults() {
    const el = document.getElementById('spark-play-root');
    if (!el) return;
    const { correct, questions, startMs } = state;
    const total      = questions.length;
    const pct        = Math.round((correct / total) * 100);
    const elapsedMs  = Date.now() - startMs;
    const mins       = Math.floor(elapsedMs / 60000);
    const secs       = Math.floor((elapsedMs % 60000) / 1000);
    const timeStr    = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    const secsPerQ   = elapsedMs / 1000 / total;

    // ── GL-TL-Score system ────────────────────────────────
    // Get user's current grade level (default 6)
    let userGrade = 6;
    try { const u = JSON.parse(localStorage.getItem('learnedu-user') || '{}'); userGrade = parseInt((u.grade||'').replace(/\D/g,'')) || 6; } catch(e){}

    // Grade level performed at (based on score vs. expected)
    const gradeDelta = pct >= 90 ? 2 : pct >= 80 ? 1 : pct >= 70 ? 0 : pct >= 55 ? -1 : pct >= 40 ? -2 : -3;
    const gradeLevel = Math.max(4, Math.min(9, userGrade + gradeDelta));

    // Spark Level (replaces old A/B/C/D/F tier system)
    const _lvlData = pct>=90 ? {id:'champion',   icon:'🏆', label:'Champion',    color:'#7c3aed', bg:'#f5f3ff'}
                   : pct>=80 ? {id:'trailblazer',icon:'🚀', label:'Trailblazer', color:'#E8562A', bg:'#fff3ef'}
                   : pct>=65 ? {id:'achiever',   icon:'🎯', label:'Achiever',    color:'#059669', bg:'#ecfdf5'}
                   : pct>=50 ? {id:'explorer',   icon:'🔭', label:'Explorer',    color:'#0369a1', bg:'#e0f2fe'}
                   :           {id:'seedling',   icon:'🌱', label:'Seedling',    color:'#d97706', bg:'#fffbeb'};
    const tier      = _lvlData.label;
    const tierIcon  = _lvlData.icon;
    const tierColor = _lvlData.color;
    const tierBg    = _lvlData.bg;
    const tierLabel = _lvlData.label;

    // ── Personalised next-steps recommendations ────────────────
    const byS2 = state.bySubj || {};
    const weakSubjects  = [];
    const strongSubjects = [];
    ['math','science','spanish'].forEach(k => {
      const d  = byS2[k] || { right:0, total:0 };
      const sp = d.total ? Math.round(d.right / d.total * 100) : null;
      if (sp === null) return;
      if (sp < 60) weakSubjects.push(k);
      else if (sp >= 80) strongSubjects.push(k);
    });
    const lessonRecs = {
      math:    { label:'Math',    icon:'📐', route:'subject/math/4',            tip:'Start with Grade 4 Math — fractions & decimals are the foundation.' },
      science: { label:'Science', icon:'⚗️', route:'subject/science/earth',     tip:'Try Earth Science — ecosystems and cells explained step by step.' },
      spanish: { label:'Spanish', icon:'🌎', route:'subject/spanish/beginning', tip:'Review Spanish Greetings — a quick refresh goes a long way.' },
    };
    const _weak = weakSubjects.slice();
    let nextStepsHtml = '';
    if (pct >= 80 && _weak.length === 0) {
      nextStepsHtml = '<div style="background:#dcfce7;border-radius:14px;padding:16px 18px;text-align:left;margin-bottom:16px;border:1.5px solid #bbf7d0">' +
        '<div style="font-size:0.72rem;font-weight:800;color:#166534;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">🚀 What to do next</div>' +
        '<p style="margin:0 0 10px;font-size:0.88rem;font-weight:600;color:#14532d;line-height:1.5">You\'re crushing it! Try harder content — Grade 7+ Math or Advanced Science.</p>' +
        '<button onclick="App.go(\'subject/math/7\')" style="background:#059669;color:white;border:none;border-radius:10px;padding:8px 16px;font-size:0.8rem;font-weight:800;cursor:pointer;font-family:inherit">Explore Advanced Lessons →</button>' +
        '</div>';
    } else if (_weak.length === 0) {
      nextStepsHtml = '<div style="background:#dbeafe;border-radius:14px;padding:16px 18px;text-align:left;margin-bottom:16px;border:1.5px solid #bfdbfe">' +
        '<div style="font-size:0.72rem;font-weight:800;color:#1e40af;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">📚 What to do next</div>' +
        '<p style="margin:0 0 10px;font-size:0.88rem;font-weight:600;color:#1e3a8a;line-height:1.5">Solid results! Pick a subject and go deeper to earn XP and unlock rewards.</p>' +
        '<button onclick="App.go(\'home\')" style="background:#2563eb;color:white;border:none;border-radius:10px;padding:8px 16px;font-size:0.8rem;font-weight:800;cursor:pointer;font-family:inherit">Browse Lessons →</button>' +
        '</div>';
    } else {
      const _recs = _weak.map(k => lessonRecs[k]).filter(Boolean);
      let _recHtml = '';
      _recs.forEach(function(r) {
        _recHtml += '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #fed7aa">' +
          '<span style="font-size:1.3rem">' + r.icon + '</span>' +
          '<div style="flex:1"><div style="font-size:0.85rem;font-weight:800;color:#431407">' + r.label + '</div>' +
          '<div style="font-size:0.78rem;color:#9a3412;line-height:1.4">' + r.tip + '</div></div>' +
          '<button onclick="App.go(\'' + r.route + '\')" style="background:#E8562A;color:white;border:none;border-radius:8px;padding:6px 14px;font-size:0.75rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap">Start →</button>' +
          '</div>';
      });
      nextStepsHtml = '<div style="background:#fff7ed;border-radius:14px;padding:16px 18px;text-align:left;margin-bottom:16px;border:1.5px solid #fed7aa">' +
        '<div style="font-size:0.72rem;font-weight:800;color:#c2410c;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">🎯 What to do next</div>' +
        '<p style="margin:0 0 10px;font-size:0.88rem;font-weight:600;color:#7c2d12;line-height:1.5">Everyone starts somewhere — here\'s where to focus:</p>' +
        _recHtml +
        '</div>';
    }


    // ── Variables used in el.innerHTML template ─────────────
    const vsGrade = gradeDelta >= 2 ? 'Significantly above grade level'
                  : gradeDelta === 1 ? 'Above grade level'
                  : gradeDelta === 0 ? 'On grade level'
                  : gradeDelta === -1 ? 'Approaching grade level'
                  : 'Below grade level';
    const vsColor = gradeDelta >= 1 ? '#059669' : gradeDelta === 0 ? '#0369a1' : '#dc2626';
    const sparkCode = 'GR' + gradeLevel + ' · ' + tierIcon + ' ' + tier + ' · ' + pct + '%';
    const isRushed  = secsPerQ < 5;
    const tags = [];
    if (pct >= 90) tags.push({label:'Outstanding',        c:'#166534', bg:'#dcfce7'});
    if (isRushed)  tags.push({label:'Rushed — slow down', c:'#92400e', bg:'#fef3c7'});
    if (pct < 50)  tags.push({label:'Review Needed',      c:'#7c3aed', bg:'#ede9fe'});
    if (pct >= 80 && !isRushed) tags.push({label:'Strong Performance', c:'#0369a1', bg:'#dbeafe'});
    const byS = state.bySubj || {};
    const subjects = [
      {label:'Math',    key:'math',    icon:'📐', color:'#E8562A'},
      {label:'Science', key:'science', icon:'⚗️', color:'#059669'},
      {label:'Spanish', key:'spanish', icon:'🌎', color:'#7c3aed'},
    ].map(function(s) {
      const d = byS[s.key] || {right:0,total:0};
      const sp = d.total ? Math.round(d.right/d.total*100) : 0;
      const st = sp>=90?'A':sp>=80?'B':sp>=70?'C':sp>=55?'D':'F';
      return Object.assign({}, s, {right:d.right, total:d.total, sp:sp, st:st});
    }).filter(function(s){ return s.total > 0; });

    el.innerHTML = `
      <div style="padding:24px 0 40px;text-align:center">

        <!-- Main Spark Score -->
        <div style="margin-bottom:24px">
          <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin-bottom:10px">Your Spark Score</div>
          <div style="display:inline-flex;align-items:center;gap:0;background:#111;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15)">
            <div style="padding:16px 22px;text-align:center;border-right:1px solid #333">
              <div style="font-size:2rem;font-weight:900;color:#E8562A;letter-spacing:-1px;line-height:1">${gradeLevel}</div>
              <div style="font-size:0.6rem;font-weight:800;color:#6b7280;text-transform:uppercase;margin-top:2px">Grade</div>
            </div>
            <div style="padding:16px 22px;text-align:center;border-right:1px solid #333">
              <div style="font-size:1.6rem;line-height:1;margin:0 auto">${tierIcon}</div>
              <div style="font-size:0.72rem;font-weight:900;color:${tierColor};margin-top:4px;white-space:nowrap">${tier}</div>
              <div style="font-size:0.6rem;font-weight:800;color:#6b7280;text-transform:uppercase;margin-top:2px">Level</div>
            </div>
            <div style="padding:16px 22px;text-align:center">
              <div style="font-size:2rem;font-weight:900;color:white;letter-spacing:-1px;line-height:1">${pct}<span style="font-size:1rem">%</span></div>
              <div style="font-size:0.6rem;font-weight:800;color:#6b7280;text-transform:uppercase;margin-top:2px">Score</div>
            </div>
          </div>
          <div style="margin-top:10px;font-family:monospace;font-size:1.1rem;font-weight:900;color:#374151;letter-spacing:2px">${sparkCode}</div>
        </div>

        <!-- Grade comparison -->
        <div style="display:inline-flex;align-items:center;gap:8px;background:${vsColor}15;border:1.5px solid ${vsColor}40;color:${vsColor};padding:8px 18px;border-radius:999px;font-size:0.85rem;font-weight:800;margin-bottom:20px">
          ${vsGrade} &middot; ${tierLabel}
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
          ${[
            {label:'Correct',  val:`${correct}/${total}`},
            {label:'Time',     val:timeStr},
            {label:'Avg Speed',val:secsPerQ.toFixed(1)+'s/q'},
          ].map(s=>`<div style="background:white;border-radius:12px;padding:12px 8px;box-shadow:0 1px 6px rgba(0,0,0,0.06)">
            <div style="font-size:1.2rem;font-weight:900;color:#111">${s.val}</div>
            <div style="font-size:0.7rem;color:#9ca3af;font-weight:700;margin-top:2px">${s.label}</div>
          </div>`).join('')}
        </div>

        <!-- Subject breakdown -->
        ${subjects.length ? `
        <div style="background:white;border-radius:16px;padding:18px;text-align:left;margin-bottom:16px;box-shadow:0 1px 6px rgba(0,0,0,0.06)">
          <div style="font-size:0.72rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px">By Subject</div>
          ${subjects.map(s=>`
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f3f4f6">
              <span style="font-size:1rem">${s.icon}</span>
              <span style="flex:1;font-weight:700;font-size:0.88rem">${s.label}</span>
              <span style="font-size:0.82rem;font-weight:800;color:#111">${s.sp}%</span>
              <div style="width:60px;height:6px;background:#f3f4f6;border-radius:999px;overflow:hidden"><div style="height:100%;width:${s.sp}%;background:${s.color};border-radius:999px"></div></div>
            </div>`).join('')}
        </div>` : ''}

        <!-- Tags -->
        ${tags.length ? `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-bottom:16px">${tags.map(t=>`<span style="background:${t.bg};color:${t.c};padding:5px 14px;border-radius:999px;font-size:0.78rem;font-weight:800">${t.label}</span>`).join('')}</div>` : ''}

        <!-- What to do next -->
        ${nextStepsHtml}

        <!-- What the code means -->
        <div style="background:#f9fafb;border-radius:12px;padding:12px 16px;text-align:left;margin-bottom:20px">
          <div style="font-size:0.7rem;font-weight:800;color:#9ca3af;text-transform:uppercase;margin-bottom:6px">How to read your score</div>
          <div style="font-size:0.82rem;color:#374151;font-weight:500;line-height:1.5">
            <strong style="color:#E8562A">${gradeLevel}</strong> = performing at Grade ${gradeLevel} level &nbsp;·&nbsp;
            ${tierIcon} <strong style="color:${tierColor}">${tier}</strong> = ${tierLabel} &nbsp;·&nbsp;
            <strong>${pct}%</strong> = ${correct} of ${total} correct
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button onclick="App.go('home')" style="background:#f3f4f6;color:#374151;border:none;border-radius:12px;padding:12px 22px;font-weight:800;font-size:0.88rem;cursor:pointer;font-family:inherit">← Home</button>
          <button onclick="SparkPlay.init()" style="background:#E8562A;color:white;border:none;border-radius:12px;padding:12px 22px;font-weight:800;font-size:0.88rem;cursor:pointer;font-family:inherit">🔄 Retake Spark</button>
          <button onclick="App.go('study')" style="background:#7c3aed;color:white;border:none;border-radius:12px;padding:12px 22px;font-weight:800;font-size:0.88rem;cursor:pointer;font-family:inherit">📚 Study Tools</button>
        </div>
      </div>
    `;
  }

  function answerTracked(picked) {
    if (state.answered) return;
    if (!state.bySubj) state.bySubj = {math:{right:0,total:0},science:{right:0,total:0},spanish:{right:0,total:0}};
    const q = state.questions[state.idx];
    const isRight = picked === q.a;
    state.bySubj[q.subj].total++;
    if (isRight) { state.bySubj[q.subj].right++; state.correct = (state.correct||0) + 1; }
    answer(picked);
  }

  function skipToResults() {
    try {
    // Simulate a random realistic test result
    state.answered = true;
    state.bySubj = { math:{right:0,total:0}, science:{right:0,total:0}, spanish:{right:0,total:0} };
    state.correct = 0;
    // Each subject gets a different random accuracy between 35–95%
    const subjectAccuracy = {
      math:    0.35 + Math.random() * 0.60,
      science: 0.35 + Math.random() * 0.60,
      spanish: 0.35 + Math.random() * 0.60,
    };
    state.questions.forEach(q => {
      const subj = q.subj;
      if (!state.bySubj[subj]) state.bySubj[subj] = { right:0, total:0 };
      state.bySubj[subj].total++;
      if (Math.random() < subjectAccuracy[subj]) {
        state.correct++;
        state.bySubj[subj].right++;
      }
    });
    // Simulate 1–4 minutes elapsed
    state.startMs = Date.now() - (60000 + Math.floor(Math.random() * 180000));
    showResults();
    } catch(e) { console.error('skipToResults error:', e); }
  }

  return { init, answer: answerTracked, next, skipToResults };
})();


// ── Dashboard helpers shared across all views ────────────────
function _dashNav(role, label, emoji) {
  return `<nav style="padding:20px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1.5px solid #f3f4f6;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100">
    <a href="#dashboard" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#374151;font-weight:800;font-size:0.88rem">
      <i class="ph-bold ph-arrow-left" style="font-size:15px"></i> Dashboards
    </a>
    <span style="font-size:0.8rem;font-weight:700;background:#f3f4f6;padding:5px 14px;border-radius:999px;color:#374151">${emoji} ${label}</span>
    <a href="#home" style="font-size:0.8rem;font-weight:700;color:#9ca3af;text-decoration:none">🏠 Home</a>
  </nav>`;
}

function _statCard(icon, value, label, color) {
  return `<div style="background:white;border-radius:20px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06);text-align:center">
    <div style="font-size:1.6rem;margin-bottom:6px">${icon}</div>
    <div style="font-size:1.5rem;font-weight:900;color:${color};letter-spacing:-0.5px;line-height:1">${value}</div>
    <div style="font-size:0.75rem;font-weight:600;color:#9ca3af;margin-top:4px">${label}</div>
  </div>`;
}

function _bar(pct, color) {
  return `<div style="background:#f3f4f6;border-radius:999px;height:9px;overflow:hidden;flex:1">
    <div style="width:${Math.min(pct,100)}%;height:100%;background:${color};border-radius:999px"></div>
  </div>`;
}

// ── Dashboard Picker ──────────────────────────────────────────
Views.dashboardPicker = function() {
  const roles = [
    { id:'student', emoji:'🎒', label:'Student',  desc:'Your lessons, scores & progress',      color:'#E8562A', bg:'#fff3ef' },
    { id:'teacher', emoji:'📋', label:'Teacher',  desc:'Classes, Spark results & roster',       color:'#059669', bg:'#ecfdf5' },
    { id:'admin',   emoji:'⚙️', label:'Admin',    desc:'Platform stats, content & system',     color:'#7c3aed', bg:'#f5f3ff' },
    { id:'parent',  emoji:'🏠', label:'Parent',   desc:"Your child's weekly summary & alerts", color:'#0369a1', bg:'#e0f2fe' },
  ];
  return `
    <nav style="padding:20px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1.5px solid #f3f4f6;background:rgba(255,255,255,0.96);position:sticky;top:0;z-index:100">
      <a href="#home" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#374151;font-weight:800;font-size:0.88rem"><i class="ph-bold ph-arrow-left" style="font-size:15px"></i> Home</a>
      <span style="font-size:0.88rem;font-weight:800;color:#111">Dashboards</span>
      <span style="width:60px"></span>
    </nav>
    <div style="max-width:760px;margin:0 auto;padding:48px 24px 80px">
      <div style="text-align:center;margin-bottom:40px">
        <h1 style="font-size:2.4rem;font-weight:900;letter-spacing:-1.5px;margin-bottom:8px">Who are you? 👋</h1>
        <p style="color:#6b7280;font-size:1rem;font-weight:500">Pick your role to see your personalized dashboard</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        ${roles.map(r => `
          <div onclick="App.go('dashboard/${r.id}')" style="background:${r.bg};border:2px solid transparent;border-radius:24px;padding:28px 24px;cursor:pointer;transition:all 0.15s" onmouseover="this.style.borderColor='${r.color}';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='transparent';this.style.transform='none'">
            <div style="font-size:2.4rem;margin-bottom:12px">${r.emoji}</div>
            <h2 style="font-size:1.25rem;font-weight:900;letter-spacing:-0.5px;color:${r.color};margin-bottom:6px">${r.label}</h2>
            <p style="font-size:0.85rem;color:#6b7280;font-weight:500;line-height:1.4">${r.desc}</p>
          </div>`).join('')}
      </div>
    </div>`;
};

// ── Student Dashboard ─────────────────────────────────────────
Views.dashboardStudent = function() {
  // ── helpers ───────────────────────────────────────────────────────────────
  function sdSetTheme(id) {
    localStorage.setItem('learnedu-student-theme', id);
    var w = document.getElementById('sd-wrapper');
    if (w) { w.className = w.className.replace(/sd-\w+/g, ''); w.classList.add('sd-' + id); }
    document.querySelectorAll('.sd-theme-dot').forEach(function(d) {
      d.classList.toggle('active', d.dataset.theme === id);
    });
  }
  window._sdSetTheme = sdSetTheme;

  // ── read progress ─────────────────────────────────────────────────────────
  var progress = {};
  try { progress = JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); } catch(e) {}

  var xpState = {total:0, streak:0, lastDate:null, unlockedIds:['theme-classic'], activeTheme:''};
  try { xpState = XP.getState(); } catch(e) {}

  var user = {};
  try { user = App.getUser() || {}; } catch(e) {}
  var userName    = (user && user.name) ? user.name : 'Student';
  var userInitial = userName.charAt(0).toUpperCase();

  var lvl = {num:1, name:'Beginner', color:'#059669'};
  try { lvl = XP.level(xpState.total); } catch(e) {}

  var nextReward = null;
  try { nextReward = XP.nextReward(); } catch(e) {}

  // ── lesson arrays ─────────────────────────────────────────────────────────
  var mathLessons = [];
  var sciLessons  = [];
  var spaLessons  = [];
  var elaLessons  = [];
  var histLessons = [];
  var codingLessons = [];
  try { mathLessons    = (typeof MATH_LESSONS    !== 'undefined') ? MATH_LESSONS    : []; } catch(e) {}
  try { sciLessons     = (typeof SCIENCE_LESSONS !== 'undefined') ? SCIENCE_LESSONS : []; } catch(e) {}
  try { spaLessons     = (typeof SPANISH_LESSONS !== 'undefined') ? SPANISH_LESSONS : []; } catch(e) {}
  try { elaLessons     = (typeof ELA_LESSONS     !== 'undefined') ? ELA_LESSONS     : []; } catch(e) {}
  try { histLessons    = (typeof HISTORY_LESSONS !== 'undefined') ? HISTORY_LESSONS : []; } catch(e) {}
  try { codingLessons  = (typeof CODING_LESSONS  !== 'undefined') ? CODING_LESSONS  : []; } catch(e) {}

  var allLessons = mathLessons.concat(sciLessons).concat(spaLessons).concat(elaLessons).concat(histLessons).concat(codingLessons);

  // ── completion counts ─────────────────────────────────────────────────────
  function countDone(arr) {
    var n = 0;
    for (var i = 0; i < arr.length; i++) {
      if (progress[arr[i].id] && progress[arr[i].id].completed) n++;
    }
    return n;
  }
  var mathDone    = countDone(mathLessons);
  var sciDone     = countDone(sciLessons);
  var spaDone     = countDone(spaLessons);
  var elaDone     = countDone(elaLessons);
  var histDone    = countDone(histLessons);
  var codingDone  = countDone(codingLessons);
  var totalDone = mathDone + sciDone + spaDone + elaDone + histDone + codingDone;

  var completedLessons = allLessons.filter(function(l) {
    return progress[l.id] && progress[l.id].completed;
  });
  var scores = completedLessons.map(function(l) { return progress[l.id].score || 0; });
  var avgScore = scores.length
    ? Math.round(scores.reduce(function(a,b){return a+b;}, 0) / scores.length)
    : 0;

  // best subject
  var subjectStats = [
    {name:'Math',    done:mathDone,  total:mathLessons.length},
    {name:'Science', done:sciDone,   total:sciLessons.length},
    {name:'Spanish', done:spaDone,   total:spaLessons.length},
    {name:'ELA',     done:elaDone,   total:elaLessons.length},
    {name:'History', done:histDone,  total:histLessons.length},
  ];
  var bestSubj = 'None';
  var bestPct  = -1;
  for (var i = 0; i < subjectStats.length; i++) {
    var sp = subjectStats[i].total > 0 ? subjectStats[i].done / subjectStats[i].total : 0;
    if (sp > bestPct) { bestPct = sp; bestSubj = subjectStats[i].name; }
  }

  // today goal
  var todayStr = new Date().toDateString();
  var completedToday = completedLessons.some(function(l) {
    var d = progress[l.id] && progress[l.id].date;
    return d && new Date(d).toDateString() === todayStr;
  });

  // XP bar
  var xpBarPct   = 0;
  var xpBarLabel = '';
  if (nextReward) {
    var allRewards = [];
    try { allRewards = XP.REWARDS; } catch(e) {}
    var nIdx   = allRewards.indexOf(nextReward);
    var prevXp = nIdx > 0 ? (allRewards[nIdx-1].xpRequired || 0) : 0;
    var range  = nextReward.xpRequired - prevXp;
    var earned = xpState.total - prevXp;
    xpBarPct   = range > 0 ? Math.min(100, Math.round(earned / range * 100)) : 100;
    xpBarLabel = xpState.total + ' / ' + nextReward.xpRequired + ' XP \u2192 ' + nextReward.name + ' ' + nextReward.icon;
  } else {
    xpBarPct   = 100;
    xpBarLabel = xpState.total + ' XP \u2014 All rewards unlocked! \uD83C\uDF89';
  }

  // AI-powered recommendations (adaptive difficulty + weak areas)
  var recommendationMeta = [];
  var recommended = [];
  try {
    var recResult = RecommendationEngine.getRecommendations(3);
    recommendationMeta = recResult.picks || [];
    recommended = recommendationMeta.map(function(r) { return r.lesson; });
  } catch(e) {
    for (var i = 0; i < allLessons.length && recommended.length < 3; i++) {
      if (!progress[allLessons[i].id] || !progress[allLessons[i].id].completed) {
        recommended.push(allLessons[i]);
        recommendationMeta.push({ lesson: allLessons[i], label: 'Next Best Lesson', confidence: 72, reasons: ['Keep building momentum'] });
      }
    }
  }

  // recent (last 5 by date)
  var recentLessons = completedLessons.slice().sort(function(a,b) {
    var da = (progress[a.id] && progress[a.id].date) ? new Date(progress[a.id].date).getTime() : 0;
    var db = (progress[b.id] && progress[b.id].date) ? new Date(progress[b.id].date).getTime() : 0;
    return db - da;
  }).slice(0, 5);

  function timeAgo(dateStr) {
    if (!dateStr) return 'recently';
    var diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return '1 day ago';
    return diff + ' days ago';
  }

  // unlocked badges/rewards
  var unlockedBadges = [];
  try {
    unlockedBadges = XP.REWARDS.filter(function(r) {
      return xpState.unlockedIds.indexOf(r.id) !== -1;
    });
  } catch(e) {}

  // theme
  var currentTheme = 'classic';
  try { currentTheme = localStorage.getItem('learnedu-student-theme') || 'classic'; } catch(e) {}

  var themes = [
    {id:'classic',  color:'#E8562A', label:'Classic'},
    {id:'night',    color:'#1a1a2e', label:'Night'},
    {id:'ocean',    color:'#0891b2', label:'Ocean'},
    {id:'forest',   color:'#16a34a', label:'Forest'},
    {id:'galaxy',   color:'#7c3aed', label:'Galaxy'},
    {id:'cherry',   color:'#e11d48', label:'Cherry'},
    {id:'electric', color:'#ca8a04', label:'Electric'},
  ];

  var subjColors = {math:'#E8562A', science:'#0891b2', spanish:'#16a34a', ela:'#7c3aed', history:'#d97706', coding:'#0f172a'};

  var subjectCards = [
    {name:'Math',    icon:'\uD83D\uDCD0', done:mathDone,  total:mathLessons.length,  color:'#E8562A', route:'subject/math'},
    {name:'Science', icon:'\u2697\uFE0F', done:sciDone,   total:sciLessons.length,   color:'#0891b2', route:'subject/science'},
    {name:'Spanish', icon:'\uD83C\uDF0E', done:spaDone,   total:spaLessons.length,   color:'#16a34a', route:'subject/spanish'},
    {name:'ELA',     icon:'\uD83D\uDCD6', done:elaDone,   total:elaLessons.length,   color:'#7c3aed', route:'subject/ela'},
    {name:'History', icon:'\uD83C\uDFDB\uFE0F', done:histDone,  total:histLessons.length,  color:'#d97706', route:'subject/history'},
    {name:'Coding',  icon:'\uD83D\uDCBB',       done:codingDone, total:codingLessons.length, color:'#0f172a', route:'subject/coding'},
  ];

  // ── BUILD SECTIONS ────────────────────────────────────────────────────────

  // theme swatches
  var themeSwatches = '';
  for (var i = 0; i < themes.length; i++) {
    var t = themes[i];
    themeSwatches += '<div class="sd-theme-dot' + (t.id === currentTheme ? ' active' : '')
      + '" data-theme="' + t.id
      + '" title="' + t.label
      + '" style="background:' + t.color
      + '" onclick="_sdSetTheme(\'' + t.id + '\')"></div>';
  }

  // today's goal badge
  var heroGoal = completedToday
    ? '<span style="font-size:0.78rem;font-weight:700;color:#059669;background:#dcfce7;padding:3px 10px;border-radius:999px">\u2705 Done today!</span>'
    : '<span style="font-size:0.78rem;font-weight:700;color:#d97706;background:#fef9c3;padding:3px 10px;border-radius:999px">\uD83C\uDFAF 1 lesson today</span>';

  // subject progress cards
  var subjectCardsHtml = '';
  for (var i = 0; i < subjectCards.length; i++) {
    var sc = subjectCards[i];
    var pct = sc.total > 0 ? Math.round(sc.done / sc.total * 100) : 0;
    subjectCardsHtml +=
      '<div onclick="App.go(\'' + sc.route + '\')"'
      + ' style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:16px;padding:18px;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;position:relative;overflow:hidden"'
      + ' onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 8px 20px rgba(0,0,0,0.12)\'"'
      + ' onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
      + '<div style="position:absolute;top:0;left:0;right:0;height:4px;background:' + sc.color + '"></div>'
      + '<div style="font-size:1.6rem;margin-bottom:8px">' + sc.icon + '</div>'
      + '<div style="font-size:0.92rem;font-weight:900;color:var(--sd-text);margin-bottom:2px">' + sc.name + '</div>'
      + '<div style="font-size:0.73rem;color:var(--sd-muted);margin-bottom:10px">' + sc.done + ' / ' + sc.total + ' lessons</div>'
      + '<div style="background:var(--sd-border);border-radius:999px;height:7px;overflow:hidden;margin-bottom:6px">'
      +   '<div style="height:100%;width:' + pct + '%;background:' + sc.color + ';border-radius:999px;transition:width 0.6s"></div>'
      + '</div>'
      + '<div style="font-size:0.78rem;font-weight:700;color:' + sc.color + '">' + pct + '% complete</div>'
      + '</div>';
  }

  // keep going cards
  var keepGoingHtml = '';
  if (recommended.length === 0) {
    keepGoingHtml = '<div style="text-align:center;padding:24px;color:var(--sd-muted)">\uD83C\uDF89 All lessons complete!</div>';
  } else {
    for (var i = 0; i < recommended.length; i++) {
      var l = recommended[i];
      var rec = recommendationMeta[i] || { label:'Next Best Lesson', confidence:72, reasons:['Keep building momentum'] };
      var lc = subjColors[l.subject] || '#888';
      var reasonText = (rec.reasons && rec.reasons.length) ? rec.reasons.join(' · ') : 'Personalized for your next step';
      keepGoingHtml +=
        '<div onclick="App.go(\'lesson/' + l.id + '\')"'
        + ' style="display:flex;align-items:center;gap:14px;background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:16px;cursor:pointer;transition:transform 0.15s"'
        + ' onmouseover="this.style.transform=\'translateY(-2px)\'"'
        + ' onmouseout="this.style.transform=\'\'">'
        + '<div style="width:42px;height:42px;border-radius:10px;background:' + lc + ';display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:800;color:white;text-align:center;flex-shrink:0;line-height:1.2">' + (l.code || '') + '</div>'
        + '<div style="flex:1;min-width:0">'
        +   '<div style="display:flex;align-items:center;gap:7px;margin-bottom:2px;min-width:0"><span style="font-size:0.88rem;font-weight:800;color:var(--sd-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (l.title || l.topic || '') + '</span><span style="font-size:0.62rem;font-weight:900;color:' + lc + ';background:' + lc + '18;border:1px solid ' + lc + '44;border-radius:999px;padding:2px 7px;white-space:nowrap">' + rec.label + '</span></div>'
        +   '<div style="font-size:0.73rem;color:var(--sd-muted);text-transform:capitalize;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (l.subject || '') + (l.grade ? ' \u00B7 Grade ' + l.grade : (l.level ? ' \u00B7 ' + l.level : '')) + ' · ' + reasonText + '</div>'
        + '</div>'
        + '<span style="font-size:0.72rem;font-weight:900;color:' + lc + ';background:' + lc + '14;border-radius:999px;padding:4px 8px;white-space:nowrap">' + rec.confidence + '% match</span>'
        + '<span style="font-size:0.84rem;font-weight:800;color:var(--sd-accent);white-space:nowrap">Start \u2192</span>'
        + '</div>';
    }
  }

  // recent activity
  var recentHtml = '';
  if (recentLessons.length === 0) {
    recentHtml = '<div style="text-align:center;padding:24px;color:var(--sd-muted);font-size:0.88rem">No lessons completed yet. Start one!</div>';
  } else {
    for (var i = 0; i < recentLessons.length; i++) {
      var l = recentLessons[i];
      var sc = progress[l.id] ? (progress[l.id].score || 0) : 0;
      var scoreColor = sc >= 80 ? '#059669' : sc >= 60 ? '#d97706' : '#dc2626';
      var lc2 = subjColors[l.subject] || '#888';
      recentHtml +=
        '<div style="display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid var(--sd-border)">'
        + '<span style="background:' + lc2 + ';color:white;font-size:0.6rem;font-weight:800;padding:3px 6px;border-radius:5px;flex-shrink:0;white-space:nowrap">' + (l.code || '') + '</span>'
        + '<span style="flex:1;font-size:0.86rem;font-weight:700;color:var(--sd-text);min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (l.title || l.topic || '') + '</span>'
        + '<span style="font-size:0.84rem;font-weight:800;color:' + scoreColor + ';flex-shrink:0">' + sc + '%</span>'
        + '<span style="font-size:0.72rem;color:var(--sd-muted);flex-shrink:0;min-width:62px;text-align:right">' + timeAgo(progress[l.id] && progress[l.id].date) + '</span>'
        + '</div>';
    }
  }

  // badges
  var badgesHtml = '';
  if (unlockedBadges.length === 0) {
    badgesHtml = '<div style="color:var(--sd-muted);font-size:0.84rem;padding:8px 0">Complete lessons to earn badges!</div>';
  } else {
    for (var i = 0; i < unlockedBadges.length; i++) {
      var b = unlockedBadges[i];
      badgesHtml +=
        '<div style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;background:var(--sd-bg);border:1.5px solid var(--sd-border);border-radius:14px;padding:12px 14px;min-width:68px;flex-shrink:0">'
        + '<span style="font-size:1.6rem">' + b.icon + '</span>'
        + '<span style="font-size:0.66rem;font-weight:700;color:var(--sd-muted);text-align:center;line-height:1.2">' + b.name + '</span>'
        + '</div>';
    }
  }

  // quick stats row
  var statsHtml =
    '<div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:14px 16px;text-align:center">'
    + '<div style="font-size:1.5rem;font-weight:900;color:var(--sd-accent)">' + totalDone + '</div>'
    + '<div style="font-size:0.68rem;font-weight:700;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:2px">Lessons Done</div>'
    + '</div>'
    + '<div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:14px 16px;text-align:center">'
    + '<div style="font-size:1.5rem;font-weight:900;color:var(--sd-accent)">' + (avgScore ? avgScore + '%' : '\u2014') + '</div>'
    + '<div style="font-size:0.68rem;font-weight:700;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:2px">Avg Score</div>'
    + '</div>'
    + '<div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:14px 16px;text-align:center">'
    + '<div style="font-size:1.1rem;font-weight:900;color:var(--sd-accent)">' + bestSubj + '</div>'
    + '<div style="font-size:0.68rem;font-weight:700;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:2px">Best Subject</div>'
    + '</div>'
    + '<div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:14px 16px;text-align:center">'
    + '<div style="font-size:1.5rem;font-weight:900;color:var(--sd-accent)">\uD83D\uDD25 ' + xpState.streak + '</div>'
    + '<div style="font-size:0.68rem;font-weight:700;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:2px">Day Streak</div>'
    + '</div>';

  // ── FINAL HTML ────────────────────────────────────────────────────────────
  return `
    ${_dashNav('student','Dashboard','\uD83C\uDF92')}
    <div id="sd-wrapper" class="sd-${currentTheme}">

      <!-- Header bar with theme picker -->
      <div style="background:var(--sd-card);border-bottom:2px solid var(--sd-border);padding:14px 24px">
        <div style="max-width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div>
            <div style="font-size:0.65rem;font-weight:700;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.08em">Student Dashboard</div>
            <h1 style="font-size:1.25rem;font-weight:900;color:var(--sd-text);margin:2px 0 0">Learn.edu</h1>
          </div>
          <div style="display:flex;align-items:center;gap:7px;background:var(--sd-bg);border:1.5px solid var(--sd-border);padding:6px 10px;border-radius:999px">
            ${themeSwatches}
          </div>
        </div>
      </div>

      <div style="max-width:100%;padding:24px 32px 80px">

        <!-- Hero Strip -->
        <div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:20px;padding:20px 24px;margin-bottom:22px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
            <div style="width:54px;height:54px;border-radius:50%;background:${lvl.color};display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:900;color:white;flex-shrink:0">${userInitial}</div>
            <div>
              <div style="font-size:1rem;font-weight:900;color:var(--sd-text)">${userName}</div>
              <span style="font-size:0.74rem;font-weight:700;color:${lvl.color};background:${lvl.color}22;padding:2px 10px;border-radius:999px">Lvl ${lvl.num} \u00B7 ${lvl.name}</span>
            </div>
          </div>
          <div style="flex:1;min-width:180px">
            <div style="font-size:0.72rem;font-weight:600;color:var(--sd-muted);margin-bottom:7px">${xpBarLabel}</div>
            <div style="background:var(--sd-border);border-radius:999px;height:10px;overflow:hidden">
              <div style="height:100%;width:${xpBarPct}%;background:var(--sd-accent);border-radius:999px;transition:width 0.8s ease"></div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">
            <div style="font-size:1.1rem;font-weight:900;color:var(--sd-text)">\uD83D\uDD25 ${xpState.streak} days</div>
            ${heroGoal}
          </div>
        </div>

        <!-- Quick Stats Row -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px">
          ${statsHtml}
        </div>

        <!-- Subject Progress Cards (IXL-style) -->
        <div style="margin-bottom:22px">
          <h2 style="font-size:0.8rem;font-weight:900;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">\uD83D\uDCDA Subject Progress</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:12px">
            ${subjectCardsHtml}
          </div>
        </div>

        <!-- Keep Going -->
        <div style="margin-bottom:22px">
          <h2 style="font-size:0.8rem;font-weight:900;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">\u26A1 Keep Going</h2>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${keepGoingHtml}
          </div>
        </div>

        <!-- Recent Activity + Badges (two-column) -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:22px">
          <div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:20px;padding:20px 22px">
            <h2 style="font-size:0.8rem;font-weight:900;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px">\uD83D\uDD52 Recent Activity</h2>
            ${recentHtml}
          </div>
          <div style="background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:20px;padding:20px 22px">
            <h2 style="font-size:0.8rem;font-weight:900;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px">\uD83C\uDFC5 Badges &amp; Rewards</h2>
            <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px">
              ${badgesHtml}
            </div>
          </div>
        </div>

        <!-- Quick Links: Leaderboard, Streak, Report -->
        <div style="margin-bottom:22px">
          <h2 style="font-size:0.8rem;font-weight:900;color:var(--sd-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">⚡ Quick Actions</h2>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <button onclick="App.go('recommendations')" style="display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#fff3ef,#fff7ed);border:1.5px solid #fed7aa;border-radius:14px;padding:12px 20px;cursor:pointer;font-family:inherit;font-size:0.88rem;font-weight:900;color:#E8562A;transition:all 0.15s" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='#fed7aa'">✨ AI Picks</button>
            <button onclick="App.go('leaderboard')" style="display:flex;align-items:center;gap:8px;background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:12px 20px;cursor:pointer;font-family:inherit;font-size:0.88rem;font-weight:800;color:var(--sd-text);transition:all 0.15s" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='var(--sd-border)'">🏆 Leaderboard</button>
            <button onclick="App.go('streak-calendar')" style="display:flex;align-items:center;gap:8px;background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:12px 20px;cursor:pointer;font-family:inherit;font-size:0.88rem;font-weight:800;color:var(--sd-text);transition:all 0.15s" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='var(--sd-border)'">🔥 Streak</button>
            <button onclick="App.go('progress-report')" style="display:flex;align-items:center;gap:8px;background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:12px 20px;cursor:pointer;font-family:inherit;font-size:0.88rem;font-weight:800;color:var(--sd-text);transition:all 0.15s" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='var(--sd-border)'">📊 Report</button>
            <button onclick="App.go('rewards')" style="display:flex;align-items:center;gap:8px;background:var(--sd-card);border:1.5px solid var(--sd-border);border-radius:14px;padding:12px 20px;cursor:pointer;font-family:inherit;font-size:0.88rem;font-weight:800;color:var(--sd-text);transition:all 0.15s" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='var(--sd-border)'">🎁 Rewards</button>
          </div>
        </div>

      </div>
    </div>`;
};


// ── AI Recommendations ───────────────────────────────────────────────────
Views.recommendations = function() {
  var result = { analysis:null, picks:[] };
  try { result = RecommendationEngine.getRecommendations(8); } catch(e) {}
  var analysis = result.analysis || { subjects:{}, completedCount:0, avgScore:null, targetDifficulty:1, weakSubjects:[], untouchedSubjects:[] };
  var picks = result.picks || [];
  var meta = RecommendationEngine.SUBJECT_META || {};

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function(c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function subjName(key) {
    return (meta[key] && meta[key].label) || key || 'Subject';
  }

  var summary = analysis.completedCount === 0
    ? 'Start with a friendly foundation lesson. As you complete lessons, recommendations will adapt to your scores.'
    : 'Ranked from your scores, completed lessons, subject balance, grade level, and difficulty fit.';

  var subjectHtml = Object.keys(analysis.subjects || {}).map(function(key) {
    var s = analysis.subjects[key];
    var m = meta[key] || { icon:'📘', label:key, color:'#6b7280' };
    var status = s.done === 0 ? 'Not started' : (s.avg < 75 ? 'Needs focus' : (s.avg >= 88 ? 'Strong' : 'On track'));
    var statusColor = s.done === 0 ? '#6b7280' : (s.avg < 75 ? '#dc2626' : (s.avg >= 88 ? '#059669' : '#0369a1'));
    return '<div style="background:white;border:1.5px solid #f3f4f6;border-radius:16px;padding:16px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">'
      +   '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:1.25rem">' + m.icon + '</span><strong style="font-size:0.9rem;color:#111">' + esc(m.label) + '</strong></div>'
      +   '<span style="font-size:0.68rem;font-weight:900;color:' + statusColor + ';background:' + statusColor + '14;border-radius:999px;padding:3px 8px;white-space:nowrap">' + status + '</span>'
      + '</div>'
      + '<div style="height:8px;background:#f3f4f6;border-radius:999px;overflow:hidden;margin-bottom:8px"><div style="height:100%;width:' + s.pct + '%;background:' + m.color + ';border-radius:999px"></div></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#6b7280;font-weight:700"><span>' + s.done + '/' + s.total + ' lessons</span><span>' + (s.avg === null ? 'No score yet' : s.avg + '% avg') + '</span></div>'
      + '</div>';
  }).join('');

  var cards = picks.length ? picks.map(function(rec, idx) {
    var l = rec.lesson;
    var m = meta[l.subject] || { icon:'📘', label:l.subject || 'Lesson', color:'#6b7280' };
    var reasons = (rec.reasons && rec.reasons.length ? rec.reasons : ['Personalized next step']).map(function(r) {
      return '<span style="font-size:0.72rem;font-weight:800;color:#374151;background:#f3f4f6;border-radius:999px;padding:5px 10px">' + esc(r) + '</span>';
    }).join('');
    return '<div onclick="App.go(\'lesson/' + esc(l.id) + '\')" style="background:white;border:1.5px solid #f3f4f6;border-radius:20px;padding:18px;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s" onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 12px 28px rgba(0,0,0,0.08)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
      + '<div style="display:flex;align-items:flex-start;gap:14px">'
      +   '<div style="width:48px;height:48px;border-radius:14px;background:' + m.color + ';display:flex;align-items:center;justify-content:center;color:white;font-size:1.25rem;font-weight:900;flex-shrink:0">' + (idx + 1) + '</div>'
      +   '<div style="flex:1;min-width:0">'
      +     '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px"><span style="font-size:0.7rem;font-weight:900;color:' + m.color + ';background:' + m.color + '16;border-radius:999px;padding:3px 9px">✨ ' + esc(rec.label) + '</span><span style="font-size:0.7rem;font-weight:800;color:#6b7280">' + rec.confidence + '% match</span></div>'
      +     '<h3 style="font-size:1.05rem;font-weight:900;color:#111;margin:0 0 4px;line-height:1.2">' + esc(l.title || l.topic || 'Lesson') + '</h3>'
      +     '<p style="font-size:0.8rem;color:#6b7280;font-weight:600;margin:0 0 10px;text-transform:capitalize">' + m.icon + ' ' + esc(m.label) + (l.grade ? ' · Grade ' + l.grade : (l.level ? ' · ' + esc(l.level) : '')) + (l.duration ? ' · ' + esc(l.duration) : '') + '</p>'
      +     '<div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px">' + reasons + '</div>'
      +     '<div style="display:flex;align-items:center;gap:8px;color:' + m.color + ';font-size:0.82rem;font-weight:900">Start lesson →</div>'
      +   '</div>'
      + '</div>'
      + '</div>';
  }).join('') : '<div style="background:white;border:1.5px solid #f3f4f6;border-radius:20px;padding:28px;text-align:center;color:#6b7280">🎉 No recommendations left — you completed everything!</div>';

  var focusText = analysis.weakSubjects && analysis.weakSubjects.length
    ? 'Focus now: ' + analysis.weakSubjects.map(subjName).join(', ')
    : (analysis.untouchedSubjects && analysis.untouchedSubjects.length ? 'Try something new: ' + analysis.untouchedSubjects.slice(0,2).map(subjName).join(', ') : 'Keep your streak alive with the next best lesson.');

  return '<div style="min-height:100vh;background:#f9fafb;font-family:inherit">'
    + '<nav style="padding:16px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1.5px solid #f3f4f6;background:white;position:sticky;top:0;z-index:10">'
    +   '<button onclick="App.go(\'dashboard/student\')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;font-weight:800;color:#374151;font-family:inherit;display:flex;align-items:center;gap:6px">← Dashboard</button>'
    +   '<span style="font-size:1rem;font-weight:900">✨ AI Lesson Recommendations</span>'
    +   '<button onclick="App.go(\'spark/play\')" style="background:#7c3aed;color:white;border:none;border-radius:10px;padding:8px 14px;font-size:0.78rem;font-weight:900;cursor:pointer;font-family:inherit">Retake Spark</button>'
    + '</nav>'
    + '<div style="max-width:980px;margin:0 auto;padding:30px 20px 80px">'
    +   '<div style="background:linear-gradient(135deg,#111827,#374151);border-radius:24px;padding:28px;color:white;margin-bottom:22px;overflow:hidden;position:relative">'
    +     '<div style="position:absolute;right:-40px;top:-40px;width:180px;height:180px;border-radius:50%;background:rgba(232,86,42,0.35)"></div>'
    +     '<div style="position:relative;z-index:1;max-width:680px">'
    +       '<div style="font-size:0.75rem;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;color:#fed7aa;margin-bottom:8px">Adaptive recommendations</div>'
    +       '<h1 style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin:0 0 8px">Your next best lessons</h1>'
    +       '<p style="font-size:0.95rem;line-height:1.55;color:#e5e7eb;margin:0 0 16px">' + esc(summary) + '</p>'
    +       '<div style="display:flex;gap:10px;flex-wrap:wrap">'
    +         '<span style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:999px;padding:7px 12px;font-size:0.78rem;font-weight:800">' + analysis.completedCount + ' lessons completed</span>'
    +         '<span style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:999px;padding:7px 12px;font-size:0.78rem;font-weight:800">' + (analysis.avgScore === null ? 'No average yet' : analysis.avgScore + '% average') + '</span>'
    +         '<span style="background:rgba(232,86,42,0.25);border:1px solid rgba(251,146,60,0.45);border-radius:999px;padding:7px 12px;font-size:0.78rem;font-weight:900;color:#fed7aa">' + esc(focusText) + '</span>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    +   '<div style="display:grid;grid-template-columns:1.35fr 0.9fr;gap:20px;align-items:start">'
    +     '<div><h2 style="font-size:0.78rem;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px">Ranked AI picks</h2><div style="display:flex;flex-direction:column;gap:12px">' + cards + '</div></div>'
    +     '<div style="position:sticky;top:82px"><h2 style="font-size:0.78rem;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px">Subject signals</h2><div style="display:flex;flex-direction:column;gap:10px">' + subjectHtml + '</div></div>'
    +   '</div>'
    + '</div>'
    + '</div>';
};


// ── Leaderboard ───────────────────────────────────────────────────────────
Views.leaderboard = function() {
  var xpState = {total:0, streak:0, level:1};
  try { xpState = XP.getState(); } catch(e) {}
  var user = null;
  try { user = App.getUser(); } catch(e) {}
  var userName = (user && user.name) ? user.name : 'You';
  var lvl = {num:1, name:'Starter', color:'#6B7280'};
  try { lvl = XP.level(xpState.total); } catch(e) {}

  // Generate or load simulated peers
  var peers = [];
  try { peers = JSON.parse(localStorage.getItem('learnedu-leaderboard-peers') || 'null'); } catch(e) {}
  if (!peers || peers.length !== 9) {
    var firstNames = ['Alex','Jordan','Taylor','Morgan','Casey','Riley','Avery','Peyton','Quinn','Skylar'];
    var lastNames  = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Martinez','Davis','Wilson','Moore'];
    peers = [];
    for (var i = 0; i < 9; i++) {
      var fn = firstNames[i % firstNames.length];
      var ln = lastNames[(i * 3) % lastNames.length];
      var xp = Math.floor(Math.random() * 851) + 50;
      var streak = Math.floor(Math.random() * 15);
      peers.push({name: fn + ' ' + ln, xp: xp, streak: streak});
    }
    try { localStorage.setItem('learnedu-leaderboard-peers', JSON.stringify(peers)); } catch(e) {}
  }

  // Build combined leaderboard
  var all = peers.map(function(p) { return {name:p.name, xp:p.xp, streak:p.streak, isMe:false}; });
  all.push({name: userName, xp: xpState.total, streak: xpState.streak, isMe:true});
  all.sort(function(a,b) { return b.xp - a.xp; });

  var myRank = 0;
  for (var i = 0; i < all.length; i++) {
    if (all[i].isMe) { myRank = i + 1; break; }
  }

  function levelBadge(xp) {
    if (xp >= 1000) return {num:10, name:'Legend',   color:'#f59e0b'};
    if (xp >= 750)  return {num:9,  name:'Galaxy',   color:'#7c3aed'};
    if (xp >= 500)  return {num:8,  name:'Rocket',   color:'#6366f1'};
    if (xp >= 400)  return {num:7,  name:'Forest',   color:'#059669'};
    if (xp >= 300)  return {num:6,  name:'Explorer', color:'#0369a1'};
    if (xp >= 200)  return {num:5,  name:'Ocean',    color:'#0891b2'};
    if (xp >= 150)  return {num:4,  name:'Scholar',  color:'#16a34a'};
    if (xp >= 100)  return {num:3,  name:'Achiever', color:'#ea580c'};
    if (xp >= 50)   return {num:2,  name:'Learner',  color:'#E8562A'};
    return {num:1, name:'Starter', color:'#6B7280'};
  }

  var rankEmoji = ['🥇','🥈','🥉'];

  var rows = '';
  for (var i = 0; i < all.length; i++) {
    var s = all[i];
    var lv = levelBadge(s.xp);
    var rank = i + 1;
    var bg = s.isMe ? 'background:#fff3ef;border:2px solid #E8562A;' : 'background:white;border:1.5px solid #f3f4f6;';
    var nameStyle = s.isMe ? 'font-weight:900;color:#E8562A;' : 'font-weight:700;color:#374151;';
    var rankStr = rank <= 3 ? rankEmoji[rank-1] : '#' + rank;
    rows +=
      '<div style="display:flex;align-items:center;gap:14px;' + bg + 'border-radius:14px;padding:13px 18px;margin-bottom:8px">' +
        '<div style="font-size:1.2rem;font-weight:900;min-width:36px;text-align:center">' + rankStr + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="' + nameStyle + 'font-size:0.92rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + s.name + (s.isMe ? ' (You)' : '') + '</div>' +
          '<div style="font-size:0.72rem;color:#9ca3af;margin-top:2px">🔥 ' + s.streak + ' day streak</div>' +
        '</div>' +
        '<div style="background:' + lv.color + '22;border:1.5px solid ' + lv.color + '66;border-radius:999px;padding:3px 10px;font-size:0.72rem;font-weight:800;color:' + lv.color + ';white-space:nowrap;flex-shrink:0">Lvl ' + lv.num + ' · ' + lv.name + '</div>' +
        '<div style="font-size:0.95rem;font-weight:900;color:#374151;min-width:60px;text-align:right">⚡ ' + s.xp.toLocaleString() + '</div>' +
      '</div>';
  }

  return '<div style="min-height:100vh;background:#f9fafb;font-family:inherit">' +
    '<nav style="padding:16px 24px;display:flex;align-items:center;gap:14px;border-bottom:1.5px solid #f3f4f6;background:white;position:sticky;top:0;z-index:10">' +
      '<button onclick="App.go(\'dashboard/student\')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;color:#374151;font-family:inherit;display:flex;align-items:center;gap:6px">← Dashboard</button>' +
      '<span style="font-size:1rem;font-weight:900">🏆 Leaderboard</span>' +
    '</nav>' +
    '<div style="max-width:600px;margin:0 auto;padding:28px 20px 80px">' +
      '<div style="background:linear-gradient(135deg,#E8562A,#fb923c);border-radius:20px;padding:24px 28px;margin-bottom:24px;color:white;text-align:center">' +
        '<div style="font-size:2.5rem;font-weight:900;line-height:1">#' + myRank + '</div>' +
        '<div style="font-size:0.85rem;font-weight:700;opacity:0.9;margin-top:4px">Your Rank</div>' +
        '<div style="font-size:0.8rem;opacity:0.8;margin-top:6px">⚡ ' + xpState.total + ' XP · 🔥 ' + xpState.streak + ' day streak</div>' +
      '</div>' +
      '<div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">Top 10 Students</div>' +
      rows +
    '</div>' +
  '</div>';
};

// ── Streak Calendar ────────────────────────────────────────────────────────
Views.streakCalendar = function() {
  var xpState = {total:0, streak:0};
  try { xpState = XP.getState(); } catch(e) {}

  var studyDates = [];
  try { studyDates = JSON.parse(localStorage.getItem('learnedu-study-dates') || '[]'); } catch(e) {}

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var todayStr = now.toISOString().slice(0,10);

  var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Compute longest streak
  var sorted = studyDates.slice().sort();
  var longest = 0, cur = 0, prevDate = null;
  for (var i = 0; i < sorted.length; i++) {
    var d = sorted[i];
    if (prevDate) {
      var diff = (new Date(d) - new Date(prevDate)) / 86400000;
      if (diff === 1) { cur++; } else { cur = 1; }
    } else { cur = 1; }
    if (cur > longest) longest = cur;
    prevDate = d;
  }

  // Build calendar grid
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  var dayHeaders = dayNames.map(function(d) {
    return '<div style="text-align:center;font-size:0.72rem;font-weight:800;color:#9ca3af;padding-bottom:8px">' + d + '</div>';
  }).join('');

  var cells = '';
  for (var i = 0; i < firstDay; i++) {
    cells += '<div></div>';
  }
  for (var day = 1; day <= daysInMonth; day++) {
    var dateStr = year + '-' + String(month+1).padStart(2,'0') + '-' + String(day).padStart(2,'0');
    var isToday = dateStr === todayStr;
    var studied = studyDates.indexOf(dateStr) !== -1;
    var isPast = dateStr < todayStr;
    var isFuture = dateStr > todayStr;

    var bg, border, color;
    if (studied) {
      bg = '#E8562A'; border = '#E8562A'; color = 'white';
    } else if (isToday) {
      bg = 'white'; border = '#E8562A'; color = '#E8562A';
    } else if (isFuture) {
      bg = '#f9fafb'; border = '#e5e7eb'; color = '#d1d5db';
    } else {
      bg = '#f3f4f6'; border = '#e5e7eb'; color = '#9ca3af';
    }

    cells +=
      '<div style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;background:' + bg + ';border:1.5px solid ' + border + ';font-size:0.8rem;font-weight:' + (isToday || studied ? '900' : '600') + ';color:' + color + '">' +
        day +
      '</div>';
  }

  return '<div style="min-height:100vh;background:#f9fafb;font-family:inherit">' +
    '<nav style="padding:16px 24px;display:flex;align-items:center;gap:14px;border-bottom:1.5px solid #f3f4f6;background:white;position:sticky;top:0;z-index:10">' +
      '<button onclick="App.go(\'dashboard/student\')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;color:#374151;font-family:inherit">← Dashboard</button>' +
      '<span style="font-size:1rem;font-weight:900">🔥 Streak Calendar</span>' +
    '</nav>' +
    '<div style="max-width:560px;margin:0 auto;padding:28px 20px 80px">' +

      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">' +
        '<div style="background:linear-gradient(135deg,#E8562A,#fb923c);border-radius:16px;padding:18px;color:white;text-align:center">' +
          '<div style="font-size:2rem;font-weight:900">🔥 ' + (xpState.streak || 0) + '</div>' +
          '<div style="font-size:0.72rem;font-weight:700;opacity:0.9;margin-top:4px">Current Streak</div>' +
        '</div>' +
        '<div style="background:white;border:1.5px solid #e5e7eb;border-radius:16px;padding:18px;text-align:center">' +
          '<div style="font-size:2rem;font-weight:900;color:#374151">📈 ' + longest + '</div>' +
          '<div style="font-size:0.72rem;font-weight:700;color:#9ca3af;margin-top:4px">Longest Streak</div>' +
        '</div>' +
        '<div style="background:white;border:1.5px solid #e5e7eb;border-radius:16px;padding:18px;text-align:center">' +
          '<div style="font-size:2rem;font-weight:900;color:#374151">📅 ' + studyDates.length + '</div>' +
          '<div style="font-size:0.72rem;font-weight:700;color:#9ca3af;margin-top:4px">Total Days Studied</div>' +
        '</div>' +
      '</div>' +

      '<div style="background:white;border:1.5px solid #e5e7eb;border-radius:20px;padding:24px">' +
        '<div style="font-size:1rem;font-weight:900;color:#374151;margin-bottom:18px;text-align:center">' + monthNames[month] + ' ' + year + '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">' +
          dayHeaders + cells +
        '</div>' +
        '<div style="display:flex;gap:14px;justify-content:center;margin-top:18px;flex-wrap:wrap">' +
          '<div style="display:flex;align-items:center;gap:6px"><div style="width:14px;height:14px;background:#E8562A;border-radius:4px"></div><span style="font-size:0.75rem;color:#6b7280;font-weight:600">Studied</span></div>' +
          '<div style="display:flex;align-items:center;gap:6px"><div style="width:14px;height:14px;background:white;border:2px solid #E8562A;border-radius:4px"></div><span style="font-size:0.75rem;color:#6b7280;font-weight:600">Today</span></div>' +
          '<div style="display:flex;align-items:center;gap:6px"><div style="width:14px;height:14px;background:#f3f4f6;border:1.5px solid #e5e7eb;border-radius:4px"></div><span style="font-size:0.75rem;color:#6b7280;font-weight:600">No Study</span></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
};

// ── Progress Report ────────────────────────────────────────────────────────
Views.progressReport = function() {
  var user = null;
  try { user = App.getUser(); } catch(e) {}
  var studentName = (user && user.name) ? user.name : 'Student';
  var xpState = {total:0, streak:0, unlockedIds:[]};
  try { xpState = XP.getState(); } catch(e) {}
  var lvl = {num:1, name:'Starter', color:'#6B7280'};
  try { lvl = XP.level(xpState.total); } catch(e) {}
  var progress = {};
  try { progress = App.getProgress(); } catch(e) {}

  var lessonArrays = {
    Math:          {lessons:[], color:'#E8562A'},
    Science:       {lessons:[], color:'#059669'},
    Spanish:       {lessons:[], color:'#7c3aed'},
    'Language Arts':{lessons:[], color:'#0369a1'},
    History:       {lessons:[], color:'#b45309'},
    Coding:        {lessons:[], color:'#0f172a'},
  };
  try { lessonArrays.Math.lessons          = (typeof MATH_LESSONS    !== 'undefined' ? MATH_LESSONS    : []); } catch(e) {}
  try { lessonArrays.Science.lessons       = (typeof SCIENCE_LESSONS !== 'undefined' ? SCIENCE_LESSONS : []); } catch(e) {}
  try { lessonArrays.Spanish.lessons       = (typeof SPANISH_LESSONS !== 'undefined' ? SPANISH_LESSONS : []); } catch(e) {}
  try { lessonArrays['Language Arts'].lessons = (typeof ELA_LESSONS  !== 'undefined' ? ELA_LESSONS     : []); } catch(e) {}
  try { lessonArrays.History.lessons       = (typeof HISTORY_LESSONS !== 'undefined' ? HISTORY_LESSONS : []); } catch(e) {}
  try { lessonArrays.Coding.lessons        = (typeof CODING_LESSONS  !== 'undefined' ? CODING_LESSONS  : []); } catch(e) {}

  var totalDone = 0, totalLessons = 0;
  var subjectRows = '';
  var subjects = Object.keys(lessonArrays);
  for (var i = 0; i < subjects.length; i++) {
    var subj = subjects[i];
    var data = lessonArrays[subj];
    if (!data.lessons.length) continue;
    var done = 0, scoreSum = 0, scoreCt = 0;
    for (var j = 0; j < data.lessons.length; j++) {
      var l = data.lessons[j];
      var p = progress[l.id];
      if (p && p.completed) {
        done++;
        if (p.score) { scoreSum += p.score; scoreCt++; }
      }
    }
    totalDone += done;
    totalLessons += data.lessons.length;
    var pct = data.lessons.length > 0 ? Math.round(done / data.lessons.length * 100) : 0;
    var avg = scoreCt > 0 ? Math.round(scoreSum / scoreCt) : null;
    subjectRows +=
      '<tr style="border-bottom:1px solid #f3f4f6">' +
        '<td style="padding:12px 16px;font-weight:700;font-size:0.88rem">' + subj + '</td>' +
        '<td style="padding:12px 16px;text-align:center;font-size:0.88rem">' + done + ' / ' + data.lessons.length + '</td>' +
        '<td style="padding:12px 16px">' +
          '<div style="background:#f3f4f6;border-radius:999px;height:8px;overflow:hidden;min-width:80px">' +
            '<div style="width:' + pct + '%;height:100%;background:' + data.color + ';border-radius:999px"></div>' +
          '</div>' +
          '<div style="font-size:0.7rem;color:#9ca3af;margin-top:3px">' + pct + '%</div>' +
        '</td>' +
        '<td style="padding:12px 16px;text-align:center;font-size:0.88rem;font-weight:800;color:' + (avg ? (avg>=80?'#059669':avg>=60?'#d97706':'#dc2626') : '#9ca3af') + '">' + (avg ? avg + '%' : '—') + '</td>' +
      '</tr>';
  }

  var unlockedBadges = [];
  try {
    unlockedBadges = XP.REWARDS.filter(function(r) {
      return r.type === 'badge' && xpState.unlockedIds.indexOf(r.id) !== -1;
    });
  } catch(e) {}

  var badgesHtml = unlockedBadges.length
    ? unlockedBadges.map(function(b) { return '<span style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:6px 12px;font-size:0.82rem;font-weight:700">' + b.icon + ' ' + b.name + '</span>'; }).join(' ')
    : '<span style="color:#9ca3af;font-size:0.85rem">No badges yet — complete lessons to earn them!</span>';

  var today = new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});

  return '<div style="min-height:100vh;background:#f9fafb;font-family:inherit">' +
    '<style>@media print { .no-print { display:none !important; } }</style>' +
    '<nav class="no-print" style="padding:16px 24px;display:flex;align-items:center;gap:14px;border-bottom:1.5px solid #f3f4f6;background:white;position:sticky;top:0;z-index:10">' +
      '<button onclick="App.go(\'dashboard/student\')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;font-weight:700;color:#374151;font-family:inherit">← Dashboard</button>' +
      '<span style="font-size:1rem;font-weight:900">📊 Progress Report</span>' +
      '<div style="flex:1"></div>' +
      '<button onclick="window.print()" style="background:#E8562A;color:white;border:none;border-radius:10px;padding:9px 18px;font-size:0.84rem;font-weight:800;cursor:pointer;font-family:inherit">🖨️ Print Report</button>' +
    '</nav>' +
    '<div style="max-width:720px;margin:0 auto;padding:32px 24px 80px">' +

      '<div style="background:white;border:1.5px solid #e5e7eb;border-radius:20px;padding:28px;margin-bottom:20px">' +
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px">' +
          '<div>' +
            '<div style="font-size:0.7rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Learn.edu — Student Progress Report</div>' +
            '<h1 style="font-size:1.6rem;font-weight:900;color:#111;margin:0 0 4px">' + studentName + '</h1>' +
            '<div style="font-size:0.85rem;color:#6b7280">Generated: ' + today + '</div>' +
          '</div>' +
          '<div style="background:#fff3ef;border:1.5px solid #fddacf;border-radius:14px;padding:12px 18px;text-align:center">' +
            '<div style="font-size:0.68rem;font-weight:800;color:#E8562A;text-transform:uppercase;letter-spacing:0.06em">Level</div>' +
            '<div style="font-size:1.4rem;font-weight:900;color:' + lvl.color + '">' + lvl.num + '</div>' +
            '<div style="font-size:0.72rem;font-weight:700;color:' + lvl.color + '">' + lvl.name + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div style="background:white;border:1.5px solid #e5e7eb;border-radius:20px;padding:24px;margin-bottom:20px">' +
        '<h2 style="font-size:0.8rem;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px">📚 Subject Progress</h2>' +
        '<table style="width:100%;border-collapse:collapse">' +
          '<thead>' +
            '<tr style="border-bottom:2px solid #f3f4f6">' +
              '<th style="padding:10px 16px;text-align:left;font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase">Subject</th>' +
              '<th style="padding:10px 16px;text-align:center;font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase">Completed</th>' +
              '<th style="padding:10px 16px;text-align:left;font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase">Progress</th>' +
              '<th style="padding:10px 16px;text-align:center;font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase">Avg Score</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' + subjectRows + '</tbody>' +
        '</table>' +
      '</div>' +

      '<div style="background:white;border:1.5px solid #e5e7eb;border-radius:20px;padding:24px;margin-bottom:20px">' +
        '<h2 style="font-size:0.8rem;font-weight:900;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px">⚡ XP & Achievements</h2>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:18px">' +
          '<div style="text-align:center;background:#f9fafb;border-radius:14px;padding:16px">' +
            '<div style="font-size:1.5rem;font-weight:900;color:#E8562A">' + xpState.total + '</div>' +
            '<div style="font-size:0.72rem;font-weight:700;color:#9ca3af;margin-top:4px">Total XP</div>' +
          '</div>' +
          '<div style="text-align:center;background:#f9fafb;border-radius:14px;padding:16px">' +
            '<div style="font-size:1.5rem;font-weight:900;color:#E8562A">🔥 ' + (xpState.streak || 0) + '</div>' +
            '<div style="font-size:0.72rem;font-weight:700;color:#9ca3af;margin-top:4px">Day Streak</div>' +
          '</div>' +
          '<div style="text-align:center;background:#f9fafb;border-radius:14px;padding:16px">' +
            '<div style="font-size:1.5rem;font-weight:900;color:#E8562A">' + totalDone + '</div>' +
            '<div style="font-size:0.72rem;font-weight:700;color:#9ca3af;margin-top:4px">Lessons Done</div>' +
          '</div>' +
        '</div>' +
        '<div style="font-size:0.8rem;font-weight:800;color:#374151;margin-bottom:10px">Badges Earned:</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' + badgesHtml + '</div>' +
      '</div>' +

    '</div>' +
  '</div>';
};

// ── Student Home (Airbnb-style) ────────────────────────────────────────────
Views.studentHome = function() {

  // ── helpers ──────────────────────────────────────────────────────────────
  // 10-gradient cycling palette (one per lesson index)
  var CARD_GRADIENTS = [
    'linear-gradient(135deg,#E8562A,#fb923c)',
    'linear-gradient(135deg,#059669,#34d399)',
    'linear-gradient(135deg,#7c3aed,#a78bfa)',
    'linear-gradient(135deg,#0369a1,#38bdf8)',
    'linear-gradient(135deg,#D97706,#fbbf24)',
    'linear-gradient(135deg,#dc2626,#f87171)',
    'linear-gradient(135deg,#0891b2,#67e8f9)',
    'linear-gradient(135deg,#be185d,#f9a8d4)',
    'linear-gradient(135deg,#4f46e5,#818cf8)',
    'linear-gradient(135deg,#16a34a,#86efac)',
  ];
  var _cardIdx = 0;
  function nextGradient() { return CARD_GRADIENTS[_cardIdx++ % CARD_GRADIENTS.length]; }

  function lessonIcon(lesson) {
    var t = (lesson.title || '').toLowerCase();
    var ph = '';
    if (t.includes('multipli'))               ph = 'ph-x';
    else if (t.includes('division')||t.includes('divid')) ph = 'ph-divide';
    else if (t.includes('fraction'))          ph = 'ph-chart-pie-slice';
    else if (t.includes('decimal'))           ph = 'ph-number-nine';
    else if (t.includes('ratio')||t.includes('scale'))   ph = 'ph-scales';
    else if (t.includes('algebra'))           ph = 'ph-function';
    else if (t.includes('geometry')||t.includes('shape')) ph = 'ph-hexagon';
    else if (t.includes('percent'))           ph = 'ph-percent';
    else if (t.includes('cell'))              ph = 'ph-microscope';
    else if (t.includes('ecosystem'))         ph = 'ph-tree';
    else if (t.includes('earth'))             ph = 'ph-globe-hemisphere-west';
    else if (t.includes('atom')||t.includes('physical'))  ph = 'ph-atom';
    else if (t.includes('life')||t.includes('living'))    ph = 'ph-leaf';
    else if (t.includes('greeting')||t.includes('hello')) ph = 'ph-hand-waving';
    else if (t.includes('number'))            ph = 'ph-number-square-three';
    else if (t.includes('color')||t.includes('colour'))  ph = 'ph-palette';
    else if (t.includes('grammar'))           ph = 'ph-pencil-simple';
    else if (t.includes('reading'))           ph = 'ph-book-open';
    else if (t.includes('writing'))           ph = 'ph-pencil-line';
    else if (t.includes('ancient')||t.includes('histor')) ph = 'ph-columns';
    else if (t.includes('war')||t.includes('revolution')) ph = 'ph-flag';
    else {
      var defaults = {math:'ph-calculator',science:'ph-flask',spanish:'ph-chat-circle',ela:'ph-book',history:'ph-scroll'};
      ph = defaults[lesson.subject] || 'ph-book';
    }
    return '<i class="ph-bold ' + ph + '" style="font-size:3rem;color:rgba(255,255,255,0.95);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15))"></i>';
  }

  function subjectGradient(subject) {
    var map = {
      math:    'linear-gradient(135deg, #E8562A, #fb923c)',
      science: 'linear-gradient(135deg, #059669, #34d399)',
      spanish: 'linear-gradient(135deg, #D97706, #fbbf24)',
      ela:     'linear-gradient(135deg, #7c3aed, #a78bfa)',
      history: 'linear-gradient(135deg, #0369a1, #38bdf8)'
    };
    return map[subject] || 'linear-gradient(135deg, #6B7280, #9CA3AF)';
  }

  function subjectColor(subject) {
    var map = {
      math:    '#E8562A',
      science: '#059669',
      spanish: '#D97706',
      ela:     '#7c3aed',
      history: '#0369a1'
    };
    return map[subject] || '#6B7280';
  }

  function subjectLabel(subject) {
    var map = {
      math:    'MATH',
      science: 'SCIENCE',
      spanish: 'SPANISH',
      ela:     'LANGUAGE ARTS',
      history: 'HISTORY'
    };
    return map[subject] || (subject || '').toUpperCase();
  }

  function difficultyDots(d) {
    var dots = '';
    for (var i = 1; i <= 3; i++) {
      dots += '<span style="width:7px;height:7px;border-radius:50%;background:' +
        (i <= d ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.3)') + ';display:inline-block"></span>';
    }
    return dots;
  }

  function makeCard(lesson, progress, assignedIds) {
    var isDone    = !!(progress[lesson.id] && progress[lesson.id].completed);
    var isAssigned = assignedIds && assignedIds.indexOf(lesson.id) !== -1;
    var emoji     = lessonIcon(lesson);
    var gradient  = nextGradient();
    var color     = subjectColor(lesson.subject);
    var label     = subjectLabel(lesson.subject);
    var diff      = lesson.difficulty || 1;
    var meta      = '';
    if (lesson.grade)  meta = 'Grade ' + lesson.grade;
    else if (lesson.level) meta = lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1);

    var doneBadge = isDone
      ? '<div style="position:absolute;top:10px;left:10px;background:rgba(255,255,255,0.92);border-radius:999px;padding:3px 10px;font-size:0.7rem;font-weight:800;color:#059669">✓ Done</div>'
      : '';
    var assignedBadge = isAssigned && !isDone
      ? '<div style="position:absolute;top:10px;left:10px;background:rgba(79,70,229,0.92);border-radius:999px;padding:3px 10px;font-size:0.7rem;font-weight:800;color:white">📌 Assigned</div>'
      : '';

    return '<div class="lc" onclick="App.go(\'lesson/' + lesson.id + '\')" style="' +
      'width:240px;flex-shrink:0;cursor:pointer;border-radius:16px;overflow:hidden;' +
      'background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08)">' +
      '<div style="height:160px;background:' + gradient + ';display:flex;align-items:center;justify-content:center;position:relative">' +
        emoji +
        (isDone ? doneBadge : (isAssigned ? assignedBadge : '')) +
        '<div style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.4);border-radius:999px;padding:3px 10px;display:flex;gap:3px;align-items:center">' +
          difficultyDots(diff) +
        '</div>' +
      '</div>' +
      '<div style="padding:12px 14px 14px">' +
        '<div style="font-size:0.7rem;font-weight:700;color:' + color + ';margin-bottom:4px">' + label + '</div>' +
        '<div style="font-size:0.92rem;font-weight:800;line-height:1.3;margin-bottom:6px">' + (lesson.title || '') + '</div>' +
        '<div style="font-size:0.75rem;color:#6B7280">' + meta + (meta ? ' · ' : '') + '5 questions</div>' +
      '</div>' +
    '</div>';
  }

  function row(title, link, cards) {
    var seeAll = link
      ? '<a href="#' + link + '" style="font-size:0.85rem;font-weight:700;color:#E8562A;text-decoration:none">See all →</a>'
      : '';
    return '<div style="margin-bottom:36px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:0 32px;margin-bottom:14px">' +
        '<h2 style="font-size:1.25rem;font-weight:900;margin:0">' + title + '</h2>' +
        seeAll +
      '</div>' +
      '<div class="sh-row" style="display:flex;gap:16px;overflow-x:auto;padding:4px 32px 12px;scrollbar-width:none;-webkit-overflow-scrolling:touch">' +
        cards +
      '</div>' +
    '</div>';
  }

  // ── data ──────────────────────────────────────────────────────────────────
  var progress = {};
  try { progress = JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); } catch(e) {}

  var xpState = { total: 0, streak: 0, lastDate: null };
  try { xpState = XP.getState(); } catch(e) {}

  var user = {};
  try { user = App.getUser() || {}; } catch(e) {}

  var mathLessons = [], sciLessons = [], spaLessons = [], elaLessons = [], histLessons = [], codingLessons2 = [];
  try { mathLessons    = (typeof MATH_LESSONS    !== 'undefined') ? MATH_LESSONS    : []; } catch(e) {}
  try { sciLessons     = (typeof SCIENCE_LESSONS !== 'undefined') ? SCIENCE_LESSONS : []; } catch(e) {}
  try { spaLessons     = (typeof SPANISH_LESSONS !== 'undefined') ? SPANISH_LESSONS : []; } catch(e) {}
  try { elaLessons     = (typeof ELA_LESSONS     !== 'undefined') ? ELA_LESSONS     : []; } catch(e) {}
  try { histLessons    = (typeof HISTORY_LESSONS !== 'undefined') ? HISTORY_LESSONS : []; } catch(e) {}
  try { codingLessons2 = (typeof CODING_LESSONS  !== 'undefined') ? CODING_LESSONS  : []; } catch(e) {}

  var allLessons = [].concat(mathLessons, sciLessons, spaLessons, elaLessons, histLessons, codingLessons2);

  var ASSIGNED = [
    { id: 'math-4-multiplication', assignedBy: 'Ms. Rivera',   assignedDate: 'Apr 28' },
    { id: 'math-5-fractions',      assignedBy: 'Ms. Rivera',   assignedDate: 'Apr 29' },
    { id: 'science-4-ecosystems',  assignedBy: 'Mr. Thompson', assignedDate: 'Apr 27' }
  ];
  var assignedIds = ASSIGNED.map(function(a) { return a.id; });

  var completedCount = Object.values(progress).filter(function(v) { return v.completed; }).length;
  var userName  = user.name || 'Student';
  var firstName = userName.split(' ')[0];
  var hour      = new Date().getHours();
  var greeting  = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');
  var xpTotal   = xpState.total   || 0;
  var streak    = xpState.streak  || 0;

  // ── register search helper ─────────────────────────────────────────────────
  window.SHL = {
    search: function(q) {
      q = q.toLowerCase();
      document.querySelectorAll('.lc').forEach(function(card) {
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }
  };

  // ── build sections ─────────────────────────────────────────────────────────

  // Assigned cards
  var assignedCards = '';
  ASSIGNED.forEach(function(a) {
    var lesson = allLessons.find(function(l) { return l.id === a.id; });
    if (lesson) assignedCards += makeCard(lesson, progress, assignedIds);
    else {
      // fallback stub
      assignedCards += '<div class="lc" style="width:240px;flex-shrink:0;border-radius:16px;overflow:hidden;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.08)">' +
        '<div style="height:160px;background:linear-gradient(135deg,#4f46e5,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:3rem">📌</div>' +
        '<div style="padding:12px 14px 14px"><div style="font-size:0.7rem;font-weight:700;color:#4f46e5;margin-bottom:4px">ASSIGNED</div>' +
        '<div style="font-size:0.85rem;font-weight:700">' + a.id + '</div>' +
        '<div style="font-size:0.75rem;color:#6B7280">by ' + a.assignedBy + ' · ' + a.assignedDate + '</div></div></div>';
    }
  });

  // Continue: recently touched lessons (last 6 with progress)
  var continueIds = Object.keys(progress)
    .filter(function(id) { return progress[id] && !progress[id].completed; })
    .slice(0, 6);
  var continueCards = '';
  continueIds.forEach(function(id) {
    var lesson = allLessons.find(function(l) { return l.id === id; });
    if (lesson) continueCards += makeCard(lesson, progress, null);
  });
  if (!continueCards) {
    // show first 3 math lessons as suggestions
    mathLessons.slice(0, 3).forEach(function(l) { continueCards += makeCard(l, progress, null); });
  }

  // Subject rows
  function subjectRow(title, icon, link, lessons, limit) {
    var cards = '';
    lessons.slice(0, limit || 10).forEach(function(l) { cards += makeCard(l, progress, null); });
    return cards ? row(icon + ' ' + title + '  →', link, cards) : '';
  }

  // ── Greeting bar ──────────────────────────────────────────────────────────
  var greetingBar =
    '<div style="padding:28px 32px 20px;border-bottom:1px solid #f0f0f0;background:white;position:sticky;top:0;z-index:10">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">' +
        '<div>' +
          '<h1 style="font-size:1.5rem;font-weight:900;margin:0 0 4px">' + greeting + ', ' + firstName + ' 👋</h1>' +
          '<p style="font-size:0.85rem;color:#6B7280;margin:0">' + xpTotal + ' XP · 🔥 ' + streak + ' day streak · ' + completedCount + ' lessons done</p>' +
        '</div>' +
        '<div style="display:flex;gap:10px;align-items:center">' +
          '<input placeholder="Search lessons…" oninput="SHL.search(this.value)" ' +
            'style="border:1.5px solid #e5e7eb;border-radius:999px;padding:9px 18px;font-size:0.84rem;font-family:inherit;outline:none;width:220px">' +
          '<button onclick="App.go(\'dashboard/student\')" ' +
            'style="background:#f3f4f6;border:none;border-radius:999px;padding:9px 18px;font-size:0.82rem;font-weight:700;cursor:pointer;font-family:inherit">' +
            'Dashboard →' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  // ── Join class banner (shown to students without a class code) ──────────────
  var joinClassBanner = '';
  if (!user.joinedClassCode) {
    joinClassBanner =
      '<div style="margin:16px 32px 0;background:#f0fdf4;border:1.5px solid #059669;border-radius:16px;padding:14px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
        '<div style="flex:1">' +
          '<div style="font-size:0.8rem;font-weight:900;color:#059669;margin-bottom:2px">🔑 Join your teacher\'s class</div>' +
          '<div style="font-size:0.78rem;color:#374151;font-weight:500">Got a class code from your teacher? Enter it to sync with your class.</div>' +
        '</div>' +
        '<button onclick="App.go(\'join-class\')" style="background:#059669;color:white;border:none;border-radius:10px;padding:9px 18px;font-size:0.82rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap">Enter Class Code →</button>' +
      '</div>';
  }

  // ── Spark banner ──────────────────────────────────────────────────────────
  var sparkBanner =
    '<div style="margin:0 32px 36px;border-radius:24px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#E8562A);padding:32px 40px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;color:white">' +
      '<div>' +
        '<div style="font-size:0.8rem;font-weight:800;opacity:0.8;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">⚡ SPARK ASSESSMENT</div>' +
        '<h2 style="font-size:1.5rem;font-weight:900;margin:0 0 8px">See where you stand</h2>' +
        '<p style="opacity:0.85;margin:0;font-size:0.9rem">60-question diagnostic across Math, Science &amp; Spanish. Takes 5–10 minutes.</p>' +
      '</div>' +
      '<button onclick="App.go(\'spark/play\')" style="background:white;color:#4f46e5;border:none;border-radius:14px;padding:14px 28px;font-size:0.95rem;font-weight:900;cursor:pointer;font-family:inherit;white-space:nowrap;transition:transform 0.15s">' +
        'Take Spark ⚡' +
      '</button>' +
    '</div>';

  // ── Nav ───────────────────────────────────────────────────────────────────
  var nav =
    '<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;border-bottom:1px solid #f0f0f0;background:white">' +
      '<div style="display:flex;align-items:center;gap:10px">' +
        '<img src="logo.svg" alt="Learn.edu" style="height:34px;width:34px;object-fit:contain">' +
        '<span style="font-weight:900;font-size:1rem;letter-spacing:-0.3px">Learn.edu</span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px">' +
        '<a href="#study" style="font-size:0.85rem;font-weight:600;color:#374151;text-decoration:none;padding:7px 14px;border-radius:8px">Study Tools</a>' +
        '<a href="#spark/play" style="font-size:0.85rem;font-weight:700;color:#7c3aed;text-decoration:none;padding:7px 14px;border-radius:8px;background:#f5f3ff">⚡ Spark</a>' +
        '<div onclick="App.go(\'dashboard/student\')" style="display:flex;align-items:center;gap:7px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:999px;padding:5px 14px 5px 8px;cursor:pointer">' +
          '<div style="width:24px;height:24px;border-radius:50%;background:#E8562A;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;color:white">' + firstName[0].toUpperCase() + '</div>' +
          '<span style="font-size:0.82rem;font-weight:700">' + firstName + '</span>' +
        '</div>' +
      '</div>' +
    '</nav>';

  // ── My Path sidebar data ──────────────────────────────────────────────────
  var allForPath = mathLessons.concat(sciLessons).concat(spaLessons).concat(elaLessons).concat(histLessons).concat(codingLessons2);
  var pathLessons = allForPath.filter(function(l) { return !progress[l.id] || !progress[l.id].completed; }).slice(0, 8);
  var pathItems = '';
  pathLessons.forEach(function(l, i) {
    var subj = l.subject || 'math';
    var pcolor = ({math:'#E8562A',science:'#059669',spanish:'#D97706',ela:'#7c3aed',history:'#0369a1'})[subj] || '#6B7280';
    var pmeta = l.grade ? 'Grade ' + l.grade : (l.level ? l.level.charAt(0).toUpperCase() + l.level.slice(1) : '');
    var psubj = ({math:'Math',science:'Science',spanish:'Spanish',ela:'ELA',history:'History'})[subj] || subj;
    var pathRoute = 'lesson/' + l.id;
    pathItems += '<div class="path-item" onclick="App.go(\'' + pathRoute + '\')" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;cursor:pointer">' +
      '<div style="width:26px;height:26px;border-radius:8px;background:' + pcolor + '18;border:1.5px solid ' + pcolor + '44;display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
        '<span style="font-size:0.65rem;font-weight:900;color:' + pcolor + '">' + (i+1) + '</span>' +
      '</div>' +
      '<div style="flex:1;min-width:0">' +
        '<div style="font-size:0.82rem;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (l.title || l.id) + '</div>' +
        '<div style="font-size:0.68rem;color:#9ca3af">' + psubj + (pmeta ? ' · ' + pmeta : '') + '</div>' +
      '</div>' +
      '<i class="ph-bold ph-caret-right" style="font-size:11px;color:#d1d5db;flex-shrink:0"></i>' +
    '</div>';
  });
  var todayDone = Object.keys(progress).filter(function(id) {
    var d = progress[id] && progress[id].date;
    return d && new Date(d).toDateString() === new Date().toDateString() && progress[id].completed;
  }).length;
  var sidebar =
    '<div style="width:300px;flex-shrink:0;padding:0 32px 0 0;display:flex;flex-direction:column;gap:14px">' +
      '<div style="background:white;border-radius:20px;padding:18px 16px;box-shadow:0 2px 12px rgba(0,0,0,0.07)">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">' +
          '<i class="ph-bold ph-path" style="font-size:1rem;color:#E8562A"></i>' +
          '<span style="font-size:0.95rem;font-weight:900">My Path</span>' +
          '<span style="margin-left:auto;font-size:0.68rem;color:#9ca3af;font-weight:600">' + pathLessons.length + ' lessons up next</span>' +
        '</div>' +
        (pathItems || '<p style="font-size:0.85rem;color:#9ca3af;text-align:center;padding:12px 0">All caught up! 🎉</p>') +
      '</div>' +
      '<div style="background:' + (todayDone>=1?'#dcfce7':'#fff7ed') + ';border-radius:20px;padding:16px 18px;border:1.5px solid ' + (todayDone>=1?'#bbf7d0':'#fed7aa') + '">' +
        '<div style="font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:' + (todayDone>=1?'#166534':'#c2410c') + ';margin-bottom:6px">📅 Today\'s Goal</div>' +
        '<div style="font-size:0.95rem;font-weight:900;color:' + (todayDone>=1?'#14532d':'#7c2d12') + ';margin-bottom:3px">' + (todayDone>=1?'✅ Goal complete!':'Complete 1 lesson') + '</div>' +
        '<div style="font-size:0.75rem;color:' + (todayDone>=1?'#166534':'#9a3412') + '">' + (todayDone>=1?'Great work today! Keep going.':'You\'ve done ' + todayDone + '/1 today') + '</div>' +
      '</div>' +
      '<div style="background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:20px;padding:16px 18px;color:white">' +
        '<div style="font-size:0.68rem;font-weight:800;opacity:0.7;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">⚡ Spark Assessment</div>' +
        '<div style="font-size:0.9rem;font-weight:900;margin-bottom:4px">Next window: September</div>' +
        '<div style="font-size:0.75rem;opacity:0.8;line-height:1.4">PM1 opens in September, PM2 in February. District-scheduled.</div>' +
      '</div>' +
    '</div>';

// ── assemble page ─────────────────────────────────────────────────────────
  var content = nav + greetingBar + joinClassBanner;
  content += '<div style="padding-top:28px">';
  // Two-column: main content + sidebar
  content += '<div style="display:flex;align-items:flex-start">';
  content +=   '<div style="flex:1;min-width:0;overflow:hidden">';
  content +=     row('<i class="ph-bold ph-push-pin" style="font-size:1.1rem;color:#4f46e5;vertical-align:-2px"></i> From your teacher', null, assignedCards);
  content +=     row('<i class="ph-bold ph-arrow-right" style="font-size:1.1rem;color:#E8562A;vertical-align:-2px"></i> Pick up where you left off', null, continueCards);
  content +=   '</div>';
  content +=   sidebar;
  content += '</div>';
  // Full-width subject rows
  content += subjectRow('Math',          '<i class="ph-bold ph-calculator" style="font-size:1.1rem;vertical-align:-2px"></i>', 'subject/math/4',             mathLessons,  12);
  content += subjectRow('Science',       '<i class="ph-bold ph-flask" style="font-size:1.1rem;vertical-align:-2px"></i>',       'subject/science/earth',      sciLessons,   12);
  content += subjectRow('Spanish',       '<i class="ph-bold ph-chat-circle" style="font-size:1.1rem;vertical-align:-2px"></i>', 'subject/spanish/beginning',  spaLessons,   12);
  content += subjectRow('Language Arts', '<i class="ph-bold ph-book-open" style="font-size:1.1rem;vertical-align:-2px"></i>',   'subject/ela/beginning',      elaLessons,   12);
  content += subjectRow('History',       '<i class="ph-bold ph-scroll" style="font-size:1.1rem;vertical-align:-2px"></i>',      'subject/history/ancient',    histLessons,  12);
  content += subjectRow('Coding',        '<i class="ph-bold ph-code" style="font-size:1.1rem;vertical-align:-2px"></i>',           'subject/coding/beginner',    codingLessons2, 8);
  content += '</div>';

  // Force full-screen: add sh-full to #app, cleaned up on next route
  try {
    var _a = document.getElementById('app');
    if (_a) { _a.classList.add('sh-full'); }
  } catch(e) {}

  var doodles = '<div style="position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden">' +
    '<i class="ph-bold ph-math-operations doodle d1" style="position:absolute;top:8%;left:2%;font-size:110px;color:#E8562A22"></i>' +
    '<i class="ph-bold ph-flask doodle d2" style="position:absolute;top:15%;right:2%;font-size:96px;color:#05966922"></i>' +
    '<i class="ph-bold ph-book-open doodle d3" style="position:absolute;top:40%;left:1%;font-size:92px;color:#7c3aed22"></i>' +
    '<i class="ph-bold ph-globe-hemisphere-west doodle d4" style="position:absolute;top:60%;right:1%;font-size:104px;color:#D9770622"></i>' +
    '<i class="ph-bold ph-calculator doodle d5" style="position:absolute;top:76%;left:2%;font-size:94px;color:#0369a122"></i>' +
    '<i class="ph-bold ph-atom doodle d6" style="position:absolute;top:4%;right:24%;font-size:112px;color:#05966920"></i>' +
    '<i class="ph-bold ph-chart-pie-slice doodle d7" style="position:absolute;top:86%;right:4%;font-size:88px;color:#E8562A20"></i>' +
    '<i class="ph-bold ph-pencil-simple doodle d8" style="position:absolute;top:32%;right:1%;font-size:84px;color:#4f46e522"></i>' +
    '<i class="ph-bold ph-scroll doodle d1" style="position:absolute;top:52%;left:44%;font-size:80px;color:#be185d1e"></i>' +
    '<i class="ph-bold ph-hand-waving doodle d3" style="position:absolute;top:68%;left:18%;font-size:90px;color:#D9770620"></i>' +
    '<i class="ph-bold ph-hexagon doodle d2" style="position:absolute;top:25%;left:42%;font-size:76px;color:#4f46e51a"></i>' +
    '<i class="ph-bold ph-tree doodle d4" style="position:absolute;top:90%;left:35%;font-size:86px;color:#05966918"></i>' +
  '</div>';
  return '<div style="position:relative;font-family:inherit;min-height:100vh;background:#fafafa;width:100%">' + doodles + '<div style="position:relative;z-index:1">' + content + '</div></div>';
};


// ── Teacher Dashboard ─────────────────────────────────────────

// ── Teacher Dashboard ──────────────────────────────────────────────────

// ── Teacher Dashboard (LiteracyPlanet-inspired, Learn.edu themed) ──────────

// ── Teacher Dashboard ──────────────────────────────────────────────────────
Views.dashboardTeacher = function(tab) {
  tab = (tab === 'overview') ? 'dashboard' : (tab || 'dashboard');

  // Load real students who joined via this teacher's class code
  const user = (typeof App !== 'undefined') ? App.getUser() : {};
  const classCode = user && user.classCode;
  const allRegistered = JSON.parse(localStorage.getItem('learnedu-all-students') || '[]');
  const realStudents = classCode
    ? allRegistered.filter(s => s.joinedClassCode === classCode)
    : [];
  const hasRealStudents = realStudents.length > 0;

  // Build PERIODS from real students. If none exist yet, show a labeled demo preview
  // so the teacher portal still feels like a real command center before launch.
  const DEMO_STUDENTS = [
    { name:'Ava Johnson', grade:'6', done:14, score:94, last:'12 min ago', status:'on-track', trend:'+6%', focus:'Ratios' },
    { name:'Mateo Rivera', grade:'6', done:12, score:88, last:'26 min ago', status:'on-track', trend:'+3%', focus:'Ecosystems' },
    { name:'Sophia Chen', grade:'6', done:10, score:81, last:'Today', status:'on-track', trend:'+1%', focus:'Essay claims' },
    { name:'Leo Martin', grade:'6', done:7, score:67, last:'Yesterday', status:'at-risk', trend:'-4%', focus:'Fraction division' },
    { name:'Noah Patel', grade:'6', done:5, score:58, last:'4 days ago', status:'struggling', trend:'-9%', focus:'Unit rates' },
    { name:'Isabella Garcia', grade:'6', done:9, score:73, last:'Today', status:'at-risk', trend:'+2%', focus:'Verb conjugation' },
  ];
  const PERIODS = hasRealStudents
    ? [{ id:'real', name:'Your Class', grade:'Students who joined ' + (classCode||'your class'), code: classCode||'', color:'#059669',
         students: realStudents.map(s => ({ name: s.name, email: s.email||'', grade: s.grade||'', joinedAt:s.joinedAt||Date.now(), done:0, score:null, last:'Just joined', status:'on-track', trend:'new', focus:'Placement pending' })) }]
    : [{ id:'demo', name:'Demo Period 1', grade:'Grade 6 preview data', code: classCode||'LRN-1234', color:'#E8562A', students: DEMO_STUDENTS }];

  const BASE_ASSIGNMENTS = [
    {id:'a1', title:'Ratios & Rates',     subject:'Math',    due:'May 2',  periods:['Period 1','Period 3'], completed:11, total:15, color:'#E8562A', link:'subject/math/6'},
    {id:'a2', title:'Ecosystems',         subject:'Science', due:'May 5',  periods:['Period 3','Period 5'], completed:8,  total:13, color:'#059669', link:'subject/science/earth'},
    {id:'a3', title:'Verb Conjugation',   subject:'Spanish', due:'May 7',  periods:['Period 1'],            completed:6,  total:8,  color:'#7c3aed', link:'subject/spanish/spanish1'},
    {id:'a4', title:'Pythagorean Theorem',subject:'Math',    due:'May 9',  periods:['Period 5'],            completed:3,  total:6,  color:'#E8562A', link:'subject/math/8'},
  ];
  // Merge with localStorage assignments
  const savedAssignments = JSON.parse(localStorage.getItem('learnedu-teacher-assignments') || '[]');
  const ASSIGNMENTS = [...BASE_ASSIGNMENTS, ...savedAssignments];

  const allStudents = PERIODS.flatMap(p => p.students.map(s => ({...s, period:p.name, periodColor:p.color})));
  const struggling  = allStudents.filter(s => s.status !== 'on-track');
  const leaderboard = allStudents
    .filter(s => typeof s.score === 'number')
    .slice()
    .sort((a,b) => (b.score || 0) - (a.score || 0))
    .slice(0,5);
  const avgCompletion = allStudents.length ? Math.round(allStudents.reduce((sum,s)=>sum+(s.done||0),0) / allStudents.length) : 0;
  const checkInQueue = struggling.length ? struggling.slice().sort((a,b)=>(a.score||0)-(b.score||0)).slice(0,3) : allStudents.slice(0,3);
  const classPulse = [
    { label:'Do Now', value: hasRealStudents ? 'Waiting for first activity' : '18/24 in progress', color:'#0369a1' },
    { label:'Exit Ticket', value: hasRealStudents ? 'Not assigned' : '72% avg', color:'#059669' },
    { label:'Missing Work', value: hasRealStudents ? '0 items' : '5 items', color:'#dc2626' },
  ];
  const teacherName = (user && user.name) ? user.name : 'Teacher';
  const firstName   = teacherName.split(' ')[0] || teacherName;

  const actionCard = (color, icon, title, desc, dest) =>
    `<div onclick="App.go('${dest}')" style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;overflow:hidden;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 20px rgba(0,0,0,0.10)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="background:${color};color:white;padding:12px 16px;display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:900;font-size:0.88rem">${title}</span>
        <span>→</span>
      </div>
      <div style="padding:12px 14px;display:flex;align-items:flex-start;gap:9px">
        <span style="font-size:1.3rem;flex-shrink:0">${icon}</span>
        <p style="font-size:0.76rem;color:#6b7280;line-height:1.4;margin:0">${desc}</p>
      </div>
    </div>`;

  // Top bar
  const topBar = `
    <div style="background:white;border-bottom:2px solid #e5e7eb;position:sticky;top:0;z-index:100">
      <div style="max-width:1280px;margin:0 auto;padding:0 28px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0 10px">
          <div>
            <div style="font-size:0.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em">Learn.edu Teacher Portal${user && user.school ? ' · ' + user.school : ''}</div>
            <h1 style="font-size:1.5rem;font-weight:900;color:#111;letter-spacing:-0.5px;margin-top:1px">Good morning, ${firstName} 👋</h1>
          </div>
          <div style="display:flex;gap:7px;align-items:center">
            <button onclick="App.go('assign')" style="display:flex;align-items:center;gap:5px;background:#E8562A;color:white;border:none;border-radius:9px;padding:8px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">+ Assign Lesson</button>
            <button onclick="App.go('roster-import')" style="display:flex;align-items:center;gap:5px;background:#059669;color:white;border:none;border-radius:9px;padding:8px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">📋 Import Roster</button>
            <button onclick="App.go('subject/math/4')" style="background:#f3f4f6;color:#374151;border:none;border-radius:9px;padding:8px 12px;font-weight:700;font-size:0.8rem;cursor:pointer;font-family:inherit">👁️ Preview</button>
            <button onclick="App.logout()" style="background:none;border:1.5px solid #e5e7eb;color:#6b7280;border-radius:9px;padding:7px 12px;font-size:0.76rem;font-weight:700;cursor:pointer;font-family:inherit">Sign Out</button>
          </div>
        </div>
        <div style="display:flex;gap:0;border-top:1px solid #f3f4f6">
          ${[
            {id:'dashboard',   label:'📊 Overview'},
            {id:'gradebook',   label:'📒 Gradebook'},
            {id:'roster',      label:'📋 My Roster'},
            {id:'assignments', label:'📝 Assignments'},
            {id:'students',    label:'📈 Progress'},
            {id:'struggling',  label:'⚠️ Needs Help', badge: struggling.length},
          ].map(t => `
            <button onclick="App.go('dashboard/teacher/${t.id}')" style="padding:9px 16px;border:none;border-bottom:3px solid ${t.id===tab?'#E8562A':'transparent'};background:none;font-weight:${t.id===tab?'800':'600'};font-size:0.82rem;color:${t.id===tab?'#E8562A':'#6b7280'};cursor:pointer;font-family:inherit;white-space:nowrap;display:inline-flex;align-items:center;gap:4px">
              ${t.label}${t.badge?`<span style="background:#dc2626;color:white;font-size:0.62rem;font-weight:900;padding:2px 6px;border-radius:999px">${t.badge}</span>`:''}
            </button>`).join('')}
        </div>
      </div>
      ${classCode ? `
      <!-- Class code action banner -->
      <div style="background:linear-gradient(90deg,#fff3ef,#f0fdf4);border-top:1.5px solid #e5e7eb;padding:9px 28px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #059669;border-radius:10px;padding:5px 14px">
          <span style="font-size:0.72rem;font-weight:700;color:#6b7280">Class Code</span>
          <span style="font-size:1rem;font-weight:900;letter-spacing:0.12em;color:#059669">${classCode}</span>
          <button onclick="navigator.clipboard&&navigator.clipboard.writeText('${classCode}').then(()=>this.textContent='✔ Copied!').catch(()=>{})" style="background:#059669;color:white;border:none;border-radius:5px;padding:2px 8px;font-size:0.68rem;font-weight:800;cursor:pointer;font-family:inherit">Copy</button>
        </div>
        <span style="font-size:0.75rem;color:#6b7280;font-weight:600">Share with students — they enter it when signing up at learn-edu.pages.dev</span>
        <div style="margin-left:auto;display:flex;gap:7px">
          <button onclick="App.go('roster-import')" style="background:#059669;color:white;border:none;border-radius:7px;padding:6px 13px;font-size:0.75rem;font-weight:800;cursor:pointer;font-family:inherit">📋 Import Roster</button>
          <button onclick="App.go('assign')" style="background:#E8562A;color:white;border:none;border-radius:7px;padding:6px 13px;font-size:0.75rem;font-weight:800;cursor:pointer;font-family:inherit">📝 Assign Lesson</button>
        </div>
      </div>` : `
      <div style="background:#fef9c3;border-top:1.5px solid #fde68a;padding:8px 28px;font-size:0.8rem;font-weight:700;color:#92400e">
        ⚠️ No class code yet — <a href="#checkout/Classroom" style="color:#E8562A;font-weight:900">start your free trial</a> to get a class code and invite students.
      </div>`}
    </div>
  </div>`;

  const wrap = content => `<div style="max-width:1280px;margin:0 auto;padding:24px 28px">${content}</div>`;

  // ── OVERVIEW TAB ──
  const rosterSnap = classCode ? App.getRoster(classCode) : [];
  const rosterJoinedCount = rosterSnap.filter(r=>r.status==='joined').length;
  const rosterTotalCount = rosterSnap.length;
  const rosterPctSnap = rosterTotalCount ? Math.round(rosterJoinedCount/rosterTotalCount*100) : 0;
  const totalStudentsCount = allStudents.length;
  const avgScore = totalStudentsCount ? Math.round(allStudents.reduce((s,x)=>s+(x.score||0),0)/totalStudentsCount) : 0;
  const needsHelpCount = allStudents.filter(s=>s.status!=='on-track').length;

  const dashTab = wrap(`
    <!-- Big stat cards (grade-book style) -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
      ${[
        {n: rosterTotalCount || totalStudentsCount || '—', label:'Total Students', sub: hasRealStudents ? 'in your class' : 'in demo roster', color:'#E8562A', icon:'🎒'},
        {n: ASSIGNMENTS.length, label:'Assignments Active', sub: 'across all periods', color:'#059669', icon:'📝'},
        {n: avgScore ? avgScore+'%' : '—', label:'Avg Assessment Score', sub: hasRealStudents ? 'real students' : 'demo data', color:'#0369a1', icon:'📊'},
        {n: needsHelpCount, label:'Students Needing Help', sub: 'below 65% or inactive', color:needsHelpCount>0?'#dc2626':'#6b7280', icon:'⚠️'},
      ].map(s=>`
        <div style="background:white;border-radius:16px;border:1.5px solid #e5e7eb;padding:18px 20px">
          <div style="font-size:1.3rem;margin-bottom:6px">${s.icon}</div>
          <div style="font-size:2rem;font-weight:900;color:${s.color};letter-spacing:-1px;line-height:1">${s.n}</div>
          <div style="font-size:0.78rem;font-weight:800;color:#374151;margin-top:4px">${s.label}</div>
          <div style="font-size:0.7rem;color:#9ca3af;margin-top:2px">${s.sub}</div>
        </div>`).join('')}
    </div>

    <!-- Roster progress strip -->
    ${rosterTotalCount ? `
    <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:14px">
      <span style="font-size:0.85rem;font-weight:800;color:#374151;white-space:nowrap">Class sign-up progress:</span>
      <div style="flex:1;background:#f3f4f6;border-radius:999px;height:8px;overflow:hidden"><div style="height:100%;width:${rosterPctSnap}%;background:#059669;border-radius:999px"></div></div>
      <span style="font-size:0.85rem;font-weight:900;color:#059669;white-space:nowrap">${rosterJoinedCount}/${rosterTotalCount} joined</span>
      <button onclick="App.go('dashboard/teacher/roster')" style="background:#f0fdf4;color:#059669;border:1.5px solid #059669;border-radius:7px;padding:5px 10px;font-size:0.72rem;font-weight:800;cursor:pointer;font-family:inherit">View Checklist →</button>
    </div>` : `
    <div style="background:#f0fdf4;border:1.5px solid #dcfce7;border-radius:14px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:12px">
      <span style="font-size:0.85rem;font-weight:700;color:#374151">📋 Import your class roster to track who has and hasn't signed up yet.</span>
      <button onclick="App.go('roster-import')" style="margin-left:auto;background:#059669;color:white;border:none;border-radius:8px;padding:6px 14px;font-size:0.78rem;font-weight:800;cursor:pointer;font-family:inherit">Import Roster →</button>
    </div>`}

    <!-- New feature: classroom command center plan -->
    <div style="display:grid;grid-template-columns:1.2fr .8fr;gap:14px;margin-bottom:20px">
      <div style="background:linear-gradient(135deg,#111827,#1f2937);border-radius:18px;padding:18px 20px;color:white;box-shadow:0 18px 45px rgba(17,24,39,.18)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div>
            <div style="font-size:0.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:#fbbf24;margin-bottom:4px">Today’s Teaching Plan</div>
            <div style="font-size:1.05rem;font-weight:900">Small-group plan generated from class progress</div>
          </div>
          <button onclick="App.go('dashboard/teacher/struggling')" style="background:#fbbf24;color:#111827;border:none;border-radius:9px;padding:7px 12px;font-size:.74rem;font-weight:900;cursor:pointer;font-family:inherit">Review group →</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          ${[
            {tag:'1 · Warm-up', title:'5-question spiral', desc:'Start with ratios, vocab, and one writing prompt.'},
            {tag:'2 · Small Group', title:(checkInQueue.length ? checkInQueue.map(s=>s.name.split(' ')[0]).join(', ') : 'No urgent group'), desc:'Reteach the lowest-confidence skill for 10 minutes.'},
            {tag:'3 · Exit Ticket', title:'One proof point', desc:'Collect one score before assigning homework.'},
          ].map(x=>`
            <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:12px">
              <div style="font-size:.64rem;font-weight:900;color:#fbbf24;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${x.tag}</div>
              <div style="font-size:.86rem;font-weight:900;margin-bottom:4px">${x.title}</div>
              <div style="font-size:.72rem;line-height:1.4;color:#d1d5db">${x.desc}</div>
            </div>`).join('')}
        </div>
      </div>
      <div style="background:white;border:1.5px solid #e5e7eb;border-radius:18px;padding:18px 20px">
        <div style="font-size:0.76rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;color:#9ca3af;margin-bottom:10px">Live Class Pulse</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${classPulse.map(p=>`
            <div style="display:flex;align-items:center;justify-content:space-between;background:#f9fafb;border-radius:12px;padding:11px 12px">
              <span style="font-size:.8rem;font-weight:800;color:#374151">${p.label}</span>
              <span style="font-size:.8rem;font-weight:900;color:${p.color}">${p.value}</span>
            </div>`).join('')}
          <div style="display:flex;align-items:center;justify-content:space-between;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:11px 12px">
            <span style="font-size:.8rem;font-weight:800;color:#166534">Avg lessons completed</span>
            <span style="font-size:.8rem;font-weight:900;color:#059669">${avgCompletion}</span>
          </div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 280px;gap:20px;align-items:start">
      <div>
        <!-- Quick Actions -->
        <div style="font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.07em;color:#9ca3af;margin-bottom:10px">Quick Actions</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px">
          ${[
            {icon:'📝',label:'Assign Lesson',dest:'assign',color:'#E8562A'},
            {icon:'📋',label:'Import Roster',dest:'roster-import',color:'#059669'},
            {icon:'📊',label:'View Progress',dest:'dashboard/teacher/students',color:'#0369a1'},
            {icon:'📋',label:'Share Code',dest:'dashboard/teacher/roster',color:'#7c3aed'},
          ].map(a=>`
            <button onclick="App.go('${a.dest}')" style="background:white;border:1.5px solid ${a.color}33;border-radius:12px;padding:14px 10px;text-align:center;cursor:pointer;font-family:inherit;transition:transform 0.12s" onmouseover="this.style.borderColor='${a.color}';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='${a.color}33';this.style.transform=''">
              <div style="font-size:1.4rem;margin-bottom:5px">${a.icon}</div>
              <div style="font-size:0.72rem;font-weight:800;color:#374151">${a.label}</div>
            </button>`).join('')}
        </div>

        <!-- Recent activity -->
        <div style="font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.07em;color:#9ca3af;margin-bottom:10px">Recent Activity</div>
        <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;overflow:hidden;margin-bottom:18px">
          ${allStudents.slice(0,5).map((s,i)=>`
            <div style="display:flex;align-items:center;gap:11px;padding:11px 16px;border-bottom:1px solid #f9fafb">
              <div style="width:32px;height:32px;border-radius:50%;background:${s.periodColor||'#E8562A'}22;border:1.5px solid ${s.periodColor||'#E8562A'}44;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:900;color:${s.periodColor||'#E8562A'};flex-shrink:0">${(s.name||'?')[0]}</div>
              <div style="flex:1;min-width:0">
                <div style="font-weight:800;font-size:0.83rem">${s.name}</div>
                <div style="font-size:0.7rem;color:#9ca3af">${s.period} · Last active: ${s.last||'—'}</div>
              </div>
              <span style="font-size:0.82rem;font-weight:900;color:${(s.score||0)>=80?'#059669':(s.score||0)>=65?'#d97706':'#dc2626'}">${s.score||0}%</span>
            </div>`).join('')}
          <div style="padding:10px 16px;text-align:center"><button onclick="App.go('dashboard/teacher/students')" style="background:none;border:none;font-size:0.75rem;font-weight:700;color:#E8562A;cursor:pointer">See all students →</button></div>
        </div>

        <!-- Assignments -->
        <div style="font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.07em;color:#9ca3af;margin-bottom:10px">Active Assignments</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${actionCard('#E8562A','📋','Assign Lesson','Pick a lesson, set a due date, assign to your class.','assign')}
          ${actionCard('#059669','📊','Assignment Report','Track who has and hasn\'t completed their work.','dashboard/teacher/assignments')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;position:sticky;top:20px">
        <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;overflow:hidden">
          <div style="background:#111827;color:white;padding:11px 16px"><h3 style="font-size:0.85rem;font-weight:900">🏆 Leaderboard</h3></div>
          ${leaderboard.length ? leaderboard.map((s,i)=>`
            <div style="display:flex;align-items:center;gap:9px;padding:9px 14px;border-bottom:1px solid #f9fafb">
              <span style="font-size:0.88rem;font-weight:900;color:${i===0?'#d97706':i===1?'#9ca3af':i===2?'#b45309':'#6b7280'};width:18px">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</span>
              <div style="flex:1;min-width:0">
                <div style="font-weight:800;font-size:0.8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.name}</div>
                <div style="font-size:0.68rem;color:#9ca3af">${s.period}</div>
              </div>
              <span style="font-weight:900;font-size:0.85rem;color:${s.score>=80?'#059669':s.score>=65?'#d97706':'#dc2626'}">${s.score}%</span>
            </div>`).join('') : `<div style="padding:18px 14px;font-size:0.78rem;color:#9ca3af;text-align:center">Scores appear after students complete lessons.</div>`}
          <div style="padding:9px 14px;text-align:center">
            <button onclick="App.go('dashboard/teacher/students')" style="background:none;border:none;font-size:0.73rem;font-weight:700;color:#E8562A;cursor:pointer">View all students →</button>
          </div>
        </div>
        <div style="background:#fff7ed;border:1.5px solid #fed7aa;border-radius:14px;padding:14px 16px">
          <div style="font-size:0.73rem;font-weight:900;color:#c2410c;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Today’s Teacher Move</div>
          <div style="font-size:0.9rem;font-weight:900;color:#7c2d12;margin-bottom:5px">Pull a 10-minute small group</div>
          <div style="font-size:0.75rem;line-height:1.45;color:#9a3412">Focus on ${checkInQueue[0]?.focus || 'students who need support'} and assign one quick practice item before the exit ticket.</div>
        </div>
      </div>
    </div>`);

  // ── ASSIGNMENTS TAB ──
  const assignmentsTab = wrap(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <h2 style="font-size:1.1rem;font-weight:900">Assignments (${ASSIGNMENTS.length})</h2>
      <button onclick="App.go('assign')" style="background:#E8562A;color:white;border:none;border-radius:9px;padding:8px 16px;font-weight:800;font-size:0.82rem;cursor:pointer;font-family:inherit">+ Assign Lesson</button>
    </div>
    ${ASSIGNMENTS.map(a=>{
      const pct=Math.round((a.completed||0)/(a.total||1)*100);
      const periodStr = Array.isArray(a.periods) ? a.periods.join(', ') : a.periods;
      return `<div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;overflow:hidden;margin-bottom:10px">
        <div style="background:${a.color};color:white;padding:10px 14px;display:flex;align-items:center;justify-content:space-between">
          <span style="font-weight:900;font-size:0.87rem">${a.title}</span>
          <span style="font-size:0.74rem;opacity:0.85">${a.subject} · Due ${a.due} · ${periodStr}</span>
        </div>
        <div style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <div style="flex:1;height:7px;background:#f3f4f6;border-radius:999px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${a.color};border-radius:999px"></div></div>
            <span style="font-weight:900;font-size:0.84rem;flex-shrink:0">${a.completed||0}/${a.total||0} done</span>
          </div>
          <div style="display:flex;gap:8px">
            <button onclick="App.go('${a.link||'home'}')" style="background:#f3f4f6;border:none;border-radius:7px;padding:5px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:inherit">Preview lesson →</button>
          </div>
        </div>
      </div>`;
    }).join('')}`);

  // ── CLASSES TAB ──
  const classesTab = wrap(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <h2 style="font-size:1.1rem;font-weight:900">My Classes</h2>
      ${classCode
        ? '<div style="background:#f0fdf4;border:1.5px solid #059669;border-radius:9px;padding:7px 14px;font-size:0.8rem;font-weight:800;color:#059669">📎 Your class code: ' + classCode + '</div>'
        : '<button onclick="App.go(\'checkout/Classroom\')" style="background:#E8562A;color:white;border:none;border-radius:9px;padding:8px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">Get Class Code →</button>'}
    </div>
    ${!hasRealStudents ? `
      <div style="background:#fef9c3;border:1.5px solid #fde68a;border-radius:14px;padding:16px 20px;margin-bottom:16px;display:flex;align-items:flex-start;gap:12px">
        <span style="font-size:1.5rem;flex-shrink:0">📋</span>
        <div>
          <div style="font-size:0.85rem;font-weight:900;color:#92400e;margin-bottom:4px">No students yet — this is a preview</div>
          <div style="font-size:0.78rem;color:#78350f;line-height:1.5">When students sign up and enter your class code <strong>${classCode || '(get one above)'}</strong>, they'll show up here automatically. The example below is just a preview.</div>
        </div>
      </div>` : ''}
    ${PERIODS.map(p => {
      const validStudents = p.students.filter(s => s.name);
      if (!validStudents.length) return '';
      const scoresOnly = validStudents.filter(s => s.score > 0);
      const avg = scoresOnly.length ? Math.round(scoresOnly.reduce((sum,st) => sum+st.score,0)/scoresOnly.length) + '%' : '—';
      const isReal = !!p.students[0]?.joinedAt;
      const nameStyle = isReal ? 'font-weight:700' : 'font-weight:700;color:#9ca3af';
      return '<div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;overflow:hidden;margin-bottom:12px">' +
        '<div style="background:' + p.color + ';color:white;padding:11px 16px;display:flex;align-items:center;justify-content:space-between">' +
        '<div><span style="font-weight:900;font-size:0.9rem">' + p.name + '</span>' +
        '<span style="opacity:0.8;font-size:0.74rem;margin-left:8px">' + p.grade + ' · ' + validStudents.length + ' student' + (validStudents.length!==1?'s':'') + (avg!=='—'?' · Avg '+avg:'') + '</span></div>' +
        (p.code ? '<code style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:5px;font-size:0.78rem;font-weight:800">' + p.code + '</code>' : '') +
        '</div>' +
        '<div class="ds-table-wrap"><table class="ds-table">' +
        '<thead><tr><th>Student</th>' + (isReal ? '<th>Email</th><th>Grade</th><th>Joined</th>' : '<th>Score</th><th>Lessons</th><th>Last Active</th>') + '<th>Status</th></tr></thead>' +
        '<tbody>' + validStudents.map(s => {
          const joined = s.joinedAt ? new Date(s.joinedAt).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : (s.last || '—');
          if (isReal) {
            return '<tr class="ds-row"><td style="font-weight:700">' + s.name + '</td><td style="font-size:0.78rem;color:#6b7280">' + (s.email||'—') + '</td><td>' + (s.grade||'—') + '</td><td style="font-size:0.78rem;color:#6b7280">' + joined + '</td><td><span style="background:#dcfce7;color:#059669;padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800">Joined</span></td></tr>';
          }
          const sc=s.status==='struggling'?'#fee2e2':s.status==='at-risk'?'#fef3c7':'#dcfce7';
          const tc=s.status==='struggling'?'#dc2626':s.status==='at-risk'?'#d97706':'#059669';
          const lb=s.status==='struggling'?'Struggling':s.status==='at-risk'?'At Risk':'On Track';
          return '<tr class="ds-row"><td style="font-weight:700;color:#9ca3af">' + s.name + '</td><td style="font-weight:900;color:#9ca3af">' + s.score + '%</td><td style="text-align:center;color:#9ca3af">' + s.done + '</td><td style="color:#9ca3af;font-size:0.78rem">' + joined + '</td><td><span style="background:'+sc+';color:'+tc+';padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;opacity:0.5">' + lb + '</span></td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<div style="padding:8px 12px;display:flex;gap:7px;align-items:center;border-top:1px solid #f3f4f6">' +
        '<button onclick="App.go(\'assign\')" style="background:#E8562A18;color:#E8562A;border:1.5px solid #E8562A;border-radius:7px;padding:5px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:inherit">📋 Assign</button>' +
        (classCode && !isReal ? '<span style="font-size:0.72rem;color:#6b7280;font-weight:600">Students join with code: <strong>' + classCode + '</strong></span>' : '') +
        '</div></div>';
    }).join('')}`);
  // ── STUDENTS TAB ──
  const studentsTab = wrap(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <h2 style="font-size:1.1rem;font-weight:900">All Students (${allStudents.length}${!hasRealStudents ? ' — preview only' : ''})</h2>
      ${classCode ? '<button onclick="App.go(\'join-class\')" style="background:#059669;color:white;border:none;border-radius:9px;padding:7px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">+ Invite Students</button>' : ''}
    </div>
    ${!hasRealStudents ? '<div style="background:#e0f2fe;border:1.5px solid #7dd3fc;border-radius:12px;padding:14px 18px;margin-bottom:14px;font-size:0.82rem;color:#0369a1;font-weight:600">👋 No real students have joined yet. Share your class code <strong>' + (classCode||'(get one from teacher pricing)') + '</strong> with students to see them appear here.</div>' : ''}
    <div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;overflow:hidden">
      <div class="ds-table-wrap">
        <table class="ds-table">
          <thead><tr><th>Name</th><th>Class</th>${hasRealStudents ? '<th>Email</th><th>Grade</th><th>Joined</th>' : '<th>Score</th><th>Lessons</th><th>Last Active</th><th>Status</th>'}</tr></thead>
          <tbody>${allStudents.map(s => {
            const joined = s.joinedAt ? new Date(s.joinedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : (s.last||'—');
            if (hasRealStudents) {
              return '<tr class="ds-row"><td style="font-weight:700">' + s.name + '</td><td><span style="background:#05996918;color:#059669;padding:2px 6px;border-radius:4px;font-size:0.7rem;font-weight:800">' + (s.period||'Your Class') + '</span></td><td style="font-size:0.78rem;color:#6b7280">' + (s.email||'—') + '</td><td>' + (s.grade||'—') + '</td><td style="font-size:0.78rem;color:#6b7280">' + joined + '</td></tr>';
            }
            const sc=s.status==='struggling'?'#fee2e2':s.status==='at-risk'?'#fef3c7':'#dcfce7';
            const tc=s.status==='struggling'?'#dc2626':s.status==='at-risk'?'#d97706':'#059669';
            const lb=s.status==='struggling'?'Struggling':s.status==='at-risk'?'At Risk':'On Track';
            return '<tr class="ds-row" style="opacity:0.5"><td style="font-weight:700">' + s.name + '</td><td><span style="background:' + s.periodColor + '18;color:' + s.periodColor + ';padding:2px 6px;border-radius:4px;font-size:0.7rem;font-weight:800">' + s.period + '</span></td><td style="font-weight:900">' + s.score + '%</td><td style="text-align:center">' + s.done + '</td><td style="color:#6b7280;font-size:0.78rem">' + (s.last||'—') + '</td><td><span style="background:'+sc+';color:'+tc+';padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800">' + lb + '</span></td></tr>';
          }).join('')}</tbody>
        </table>
      </div>
    </div>`);

  // ── STRUGGLING TAB ──
  const strugglingTab = wrap(`
    <h2 style="font-size:1.1rem;font-weight:900;margin-bottom:10px">🚨 Needs Attention (${struggling.length})</h2>
    <div style="background:#fee2e2;border:1.5px solid #fca5a5;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:0.82rem;color:#7f1d1d;font-weight:600">
      Students below 65% or inactive for 5+ days. Prioritize those below 55%.
    </div>
    ${struggling.sort((a,b)=>a.score-b.score).map(s=>{
      const isS=s.status==='struggling';
      return `<div style="background:white;border-radius:12px;border:1.5px solid ${isS?'#fca5a5':'#fcd34d'};padding:14px 16px;margin-bottom:9px;display:flex;align-items:center;gap:12px">
        <span style="font-size:1.3rem">${isS?'🔴':'🟡'}</span>
        <div style="flex:1">
          <div style="font-weight:900;font-size:0.9rem">${s.name}</div>
          <div style="font-size:0.74rem;color:#6b7280">${s.period} · Last active: ${s.last}</div>
        </div>
        <div style="text-align:center;min-width:46px">
          <div style="font-size:1.2rem;font-weight:900;color:${isS?'#dc2626':'#d97706'}">${s.score}%</div>
          <div style="font-size:0.62rem;color:#9ca3af">Score</div>
        </div>
        <button onclick="Modal.show('Send Message', '<p style=&quot;font-size:0.82rem;color:#6b7280;margin:0 0 14px&quot;>Send a note to this student and their parent.</p>' + Modal.select('Recipient',['Student only','Parent only','Student & Parent']) + '<div style=&quot;margin-bottom:14px&quot;><label style=&quot;display:block;font-size:0.78rem;font-weight:800;color:#374151;margin-bottom:5px&quot;>Message</label><textarea placeholder=&quot;Type your message...&quot; style=&quot;width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:0.88rem;font-family:inherit;outline:none;box-sizing:border-box;height:90px;resize:none&quot;></textarea></div>', [{label:'Send Message ✉️', fn:\"Modal.toast('Message sent!');Modal.close()\", color:'${isS?'#dc2626':'#d97706'}'}])" style="background:${isS?'#dc2626':'#d97706'};color:white;border:none;border-radius:8px;padding:6px 12px;font-size:0.73rem;font-weight:800;cursor:pointer;font-family:inherit">Message</button>
      </div>`;
    }).join('')}`);

  // ── ROSTER TAB ──
  const rosterData = classCode ? App.getRoster(classCode) : [];
  const rosterJoined  = rosterData.filter(r => r.status === 'joined');
  const rosterPending = rosterData.filter(r => r.status === 'pending');
  const rosterTotal   = rosterData.length;
  const rosterPct     = rosterTotal ? Math.round(rosterJoined.length / rosterTotal * 100) : 0;

  const rosterTab = wrap(`
    <div style="max-width:780px">
      <!-- Class code share box -->
      <div style="background:white;border-radius:16px;border:1.5px solid #e5e7eb;padding:20px 24px;margin-bottom:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px">
          <div>
            <div style="font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;color:#9ca3af;margin-bottom:4px">Your Class Code</div>
            <div style="font-size:2rem;font-weight:900;letter-spacing:0.15em;color:#059669">${classCode || '—'}</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button onclick="navigator.clipboard&&navigator.clipboard.writeText('${classCode||''}').then(()=>this.textContent='✔ Copied!').catch(()=>{})" style="background:#059669;color:white;border:none;border-radius:9px;padding:8px 16px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">📋 Copy Code</button>
            <button onclick="App.go('roster-import')" style="background:#E8562A;color:white;border:none;border-radius:9px;padding:8px 16px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">Import Roster →</button>
          </div>
        </div>
        <div style="font-size:0.8rem;color:#6b7280;font-weight:500;background:#f9fafb;border-radius:8px;padding:8px 12px">
          📣 Tell students: <em>"Go to <strong>learn-edu.pages.dev</strong>, click Sign Up, choose Student, and enter code <strong>${classCode||'—'}</strong>"</em>
        </div>
      </div>

      ${rosterTotal === 0 ? `
        <!-- Empty state -->
        <div style="background:#f9fafb;border:2px dashed #e5e7eb;border-radius:16px;padding:40px 24px;text-align:center">
          <div style="font-size:3rem;margin-bottom:12px">📋</div>
          <h2 style="font-size:1.1rem;font-weight:900;color:#374151;margin-bottom:6px">No roster yet</h2>
          <p style="color:#6b7280;font-size:0.88rem;font-weight:500;margin-bottom:20px">Import your class list to track who has and hasn't signed up yet.</p>
          <button onclick="App.go('roster-import')" style="background:#059669;color:white;border:none;border-radius:12px;padding:12px 24px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit">Import Roster →</button>
        </div>` : `

        <!-- Progress bar -->
        <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;padding:16px 20px;margin-bottom:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <span style="font-size:0.88rem;font-weight:800;color:#374151">${rosterJoined.length} of ${rosterTotal} students have joined (${rosterPct}%)</span>
            <button onclick="App.go('roster-import')" style="background:#f3f4f6;border:none;border-radius:7px;padding:5px 12px;font-size:0.75rem;font-weight:700;cursor:pointer;font-family:inherit;color:#374151">+ Add more names</button>
          </div>
          <div style="background:#f3f4f6;border-radius:999px;height:10px;overflow:hidden">
            <div style="height:100%;width:${rosterPct}%;background:#059669;border-radius:999px;transition:width 0.4s"></div>
          </div>
        </div>

        <!-- Joined section -->
        ${rosterJoined.length ? `
        <div style="margin-bottom:16px">
          <div style="font-size:0.8rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#059669;margin-bottom:8px">✅ Joined (${rosterJoined.length})</div>
          ${rosterJoined.map(r => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:white;border-radius:10px;border:1.5px solid #dcfce7;margin-bottom:6px">
              <span style="font-size:1.2rem">✅</span>
              <span style="font-weight:700;font-size:0.88rem;flex:1">${r.name}</span>
              <span style="font-size:0.74rem;color:#6b7280">${r.joinedAt ? new Date(r.joinedAt).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : ''}</span>
              <span style="background:#dcfce7;color:#059669;font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:999px">Signed up</span>
            </div>`).join('')}
        </div>` : ''}

        <!-- Pending section -->
        ${rosterPending.length ? `
        <div>
          <div style="font-size:0.8rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#9ca3af;margin-bottom:8px">⬜ Not yet signed up (${rosterPending.length})</div>
          ${rosterPending.map(r => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:white;border-radius:10px;border:1.5px solid #e5e7eb;margin-bottom:6px">
              <span style="font-size:1.2rem">⬜</span>
              <span style="font-weight:700;font-size:0.88rem;flex:1;color:#6b7280">${r.name}</span>
              <span style="font-size:0.74rem;color:#9ca3af">Not yet signed up</span>
            </div>`).join('')}
        </div>` : ''}
      `}
    </div>
  `);

  // ── GRADEBOOK TAB ──
  const GRADE_PERIODS = [
    { id:'p1', label:'Period 1', subject:'8th Math', teacher:'Ms. Martinez' },
    { id:'p2', label:'Period 2', subject:'7th Math', teacher:'Ms. Martinez' },
    { id:'p3', label:'Period 3', subject:'6th Math', teacher:'Ms. Martinez' },
    { id:'p4', label:'Period 4', subject:'8th Science', teacher:'Ms. Martinez' },
    { id:'p5', label:'Period 5', subject:'Spanish 1', teacher:'Ms. Martinez' },
    { id:'p6', label:'Period 6', subject:'ELA 6', teacher:'Ms. Martinez' },
  ];
  const GB_STUDENTS = [
    { name:'Ava Johnson',      grades:[92,88,95,null,90],  avg:91, status:'on-track' },
    { name:'Mateo Rivera',     grades:[85,79,88,82,null],  avg:84, status:'on-track' },
    { name:'Sophia Chen',      grades:[78,81,74,88,76],    avg:79, status:'on-track' },
    { name:'Leo Martin',       grades:[64,null,71,68,60],  avg:66, status:'at-risk' },
    { name:'Noah Patel',       grades:[52,58,null,55,61],  avg:57, status:'struggling' },
    { name:'Isabella Garcia',  grades:[90,93,87,null,94],  avg:91, status:'on-track' },
  ];
  const GB_ASSIGNMENTS = ['HW 1','HW 2','Quiz 1','HW 3','Quiz 2'];
  const gbPeriodId = 'p1'; // default period shown
  const gbPeriod = GRADE_PERIODS.find(p=>p.id===gbPeriodId);
  const gbAvg = Math.round(GB_STUDENTS.reduce((s,x)=>s+x.avg,0)/GB_STUDENTS.length);
  const gbAtRisk = GB_STUDENTS.filter(s=>s.status!=='on-track').length;

  const gbRows = GB_STUDENTS.map(s => {
    const statusColor = s.status==='on-track' ? '#059669' : s.status==='at-risk' ? '#d97706' : '#dc2626';
    const statusBg    = s.status==='on-track' ? '#f0fdf4' : s.status==='at-risk' ? '#fffbeb' : '#fef2f2';
    const cells = s.grades.map(g => g === null
      ? `<td style="text-align:center;color:#d1d5db;font-weight:600">—</td>`
      : `<td style="text-align:center;font-weight:800;color:${g>=80?'#059669':g>=70?'#d97706':'#dc2626'}">${g}</td>`
    ).join('');
    return `<tr class="gb-row" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'" style="border-bottom:1px solid #f3f4f6;cursor:default">
      <td style="padding:11px 16px;font-weight:800;font-size:0.85rem">${s.name}</td>
      ${cells}
      <td style="text-align:center;font-weight:900;font-size:0.9rem;color:${statusColor}">${s.avg}%</td>
      <td><span style="background:${statusBg};color:${statusColor};font-size:0.7rem;font-weight:800;padding:3px 10px;border-radius:999px">${s.status}</span></td>
    </tr>`;
  }).join('');

  const gradebookTab = wrap(`
    <!-- Period tabs -->
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px">
      ${GRADE_PERIODS.map(p=>`<button onclick="App.go('dashboard/teacher/gradebook')" style="padding:7px 16px;border-radius:999px;border:1.5px solid ${p.id===gbPeriodId?'#E8562A':'#e5e7eb'};background:${p.id===gbPeriodId?'#E8562A':'white'};color:${p.id===gbPeriodId?'white':'#374151'};font-weight:800;font-size:0.78rem;cursor:pointer;font-family:inherit">${p.label}</button>`).join('')}
    </div>

    <!-- Gradebook header -->
    <div style="background:white;border-radius:16px;border:1.5px solid #e5e7eb;padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:1rem;font-weight:900;color:#111">${gbPeriod.label} — ${gbPeriod.subject} | ${gbPeriod.teacher}</div>
        <div style="font-size:0.78rem;color:#6b7280;margin-top:3px">${GB_STUDENTS.length} students · Avg: <strong style="color:#059669">${gbAvg}%</strong> · At-risk: <strong style="color:#dc2626">${gbAtRisk}</strong> · Last saved: just now</div>
      </div>

      <!-- Sync dropdown -->
      <div style="position:relative" id="gb-sync-wrap">
        <button onclick="GradebookSync.toggleMenu()" style="display:flex;align-items:center;gap:6px;background:#111;color:white;border:none;border-radius:9px;padding:9px 16px;font-weight:800;font-size:0.82rem;cursor:pointer;font-family:inherit">
          🔄 Sync <span style="font-size:0.7rem;margin-left:2px">▾</span>
        </button>
        <div id="gb-sync-menu" style="display:none;position:absolute;right:0;top:calc(100% + 6px);background:white;border:1.5px solid #e5e7eb;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,0.13);min-width:210px;z-index:999;overflow:hidden">
          <div style="padding:6px 0">
            <button onclick="GradebookSync.exportCSV()" style="width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:0.84rem;font-weight:700;color:#374151;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">📄 Export CSV</button>
            <button onclick="GradebookSync.exportExcel()" style="width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:0.84rem;font-weight:700;color:#374151;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">📊 Export Excel</button>
            <div style="height:1px;background:#f3f4f6;margin:4px 0"></div>
            <button onclick="GradebookSync.emailAdmin()" style="width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:0.84rem;font-weight:700;color:#374151;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">📧 Email Admin</button>
            <button onclick="GradebookSync.syncLearnEdu()" style="width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:0.84rem;font-weight:700;color:#374151;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">🔄 Sync Learn.edu</button>
            <div style="height:1px;background:#f3f4f6;margin:4px 0"></div>
            <button onclick="GradebookSync.printGradebook()" style="width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:0.84rem;font-weight:700;color:#374151;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">🖨️ Print</button>
            <button onclick="GradebookSync.presentation()" style="width:100%;text-align:left;padding:10px 16px;border:none;background:none;font-size:0.84rem;font-weight:700;color:#374151;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">📽️ Presentation Maker</button>
          </div>
        </div>
      </div>
    </div>

        <!-- Gradebook table -->
    <div style="background:white;border-radius:16px;border:1.5px solid #e5e7eb;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:#f9fafb;border-bottom:2px solid #e5e7eb">
            <th style="text-align:left;padding:12px 16px;font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280">Student</th>
            ${GB_ASSIGNMENTS.map(a=>`<th style="text-align:center;padding:12px 10px;font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280">${a}</th>`).join('')}
            <th style="text-align:center;padding:12px 10px;font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280">Avg</th>
            <th style="text-align:center;padding:12px 10px;font-size:0.78rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280">Status</th>
          </tr>
        </thead>
        <tbody>${gbRows}</tbody>
      </table>
    </div>
    <p style="margin-top:10px;font-size:0.72rem;color:#9ca3af;text-align:center">Demo data only — real grades connect when students complete assignments.</p>
  `);

  const bodyMap = {dashboard:dashTab, gradebook:gradebookTab, roster:rosterTab, classes:classesTab, students:studentsTab, assignments:assignmentsTab, struggling:strugglingTab};

  return `
    <style>
      #app { max-width:100%!important; margin:0!important; padding:0!important; }
      #app .nav { display:none!important; }
    </style>
    <div style="min-height:100vh;background:#f4f5f7;display:flex;flex-direction:column">
      ${topBar}
      <div style="flex:1;overflow-y:auto">
        ${bodyMap[tab] || dashTab}
      </div>
    </div>`;
};


Views.assignCreate = function(step, subject, levelOrGrade) {
  step = step || 1;
  const subjectKey = subject || '';
  const level = subject === 'math' ? (parseInt(levelOrGrade) || 4) : (levelOrGrade || 'beginning');
  const SMETA = {
    math:    { icon:'\u{1F4D0}', label:'Math',          levels:[4,5,6,7,8,9].map(g=>({key:g,label:'Grade '+g})) },
    science: { icon:'\u2697\uFE0F', label:'Science',   levels:[{key:'earth',label:'Earth Science'},{key:'life',label:'Life Science'},{key:'physical',label:'Physical Science'},{key:'advanced',label:'Advanced Science'}] },
    spanish: { icon:'\u{1F30E}', label:'Spanish',       levels:[{key:'beginning',label:'Beginning Spanish'},{key:'spanish1',label:'Spanish 1'},{key:'spanish2',label:'Spanish 2'},{key:'advanced',label:'Advanced Spanish'}] },
    ela:     { icon:'\u{1F4D6}', label:'Language Arts', levels:[{key:'beginning',label:'Beginning ELA'},{key:'ela1',label:'ELA 1'},{key:'ela2',label:'ELA 2'},{key:'advanced',label:'Advanced ELA'}] },
    history: { icon:'\u{1F3DB}\uFE0F', label:'History',levels:[{key:'ancient',label:'Ancient History'},{key:'us',label:'U.S. History'},{key:'world',label:'World History'},{key:'modern',label:'Modern History'}] },
  };
  const navBack = `<nav class="nav" style="z-index:10;background:white;border-bottom:1.5px solid #e5e7eb"><div style="max-width:1280px;margin:0 auto;padding:0 28px;height:52px;display:flex;align-items:center;gap:12px"><button onclick="App.go('dashboard/teacher/assignments')" style="background:none;border:none;font-size:0.85rem;font-weight:700;color:#374151;cursor:pointer">Back to Assignments</button><span style="font-size:0.9rem;font-weight:900">Assign a Lesson</span><div style="flex:1"></div></div></nav>`;

  if (step === 1) {
    return navBack + `<div style="max-width:800px;margin:32px auto;padding:0 28px 80px"><h2 style="font-size:1.2rem;font-weight:900;margin-bottom:18px">Pick a subject</h2><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">${Object.entries(SMETA).map(([key,m])=>`<div onclick="App.go('assign/2/'+${'`'}${key}${'`'}+'/'+${'`'}${key==='math'?4:m.levels[0].key}${'`'})" style="background:white;border:2px solid #e5e7eb;border-radius:14px;padding:20px 10px;text-align:center;cursor:pointer" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='#e5e7eb'"><div style="font-size:1.8rem;margin-bottom:8px">${m.icon}</div><div style="font-size:0.8rem;font-weight:800">${m.label}</div></div>`).join('')}</div></div>`;
  }

  if (step === 2 && subjectKey && SMETA[subjectKey]) {
    const meta = SMETA[subjectKey];
    const allL = [...(typeof MATH_LESSONS!=='undefined'?MATH_LESSONS:[]),...(typeof SCIENCE_LESSONS!=='undefined'?SCIENCE_LESSONS:[]),...(typeof SPANISH_LESSONS!=='undefined'?SPANISH_LESSONS:[]),...(typeof ELA_LESSONS!=='undefined'?ELA_LESSONS:[]),...(typeof HISTORY_LESSONS!=='undefined'?HISTORY_LESSONS:[])];
    const lessons = subjectKey==='math' ? allL.filter(l=>l.subject==='math'&&l.grade===level) : allL.filter(l=>l.subject===subjectKey&&l.level===level);
    const levelTabs = meta.levels.map(lv=>`<button onclick="App.go('assign/2/${subjectKey}/'+String('${String(lv.key)}'))" style="padding:7px 14px;border:none;border-bottom:3px solid ${String(level)===String(lv.key)?'#E8562A':'transparent'};background:none;font-weight:${String(level)===String(lv.key)?'800':'600'};font-size:0.78rem;color:${String(level)===String(lv.key)?'#E8562A':'#6b7280'};cursor:pointer;font-family:inherit">${lv.label}</button>`).join('');
    const rows = lessons.length===0?`<div style="padding:28px;text-align:center;color:#9ca3af">No lessons for this level yet.</div>`:lessons.map(l=>`<label style="display:flex;align-items:center;gap:12px;padding:11px 16px;cursor:pointer;border-bottom:1px solid #f9fafb" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background=''"><input type="checkbox" data-id="${l.id}" data-title="${l.title.replace(/"/g,'')}" style="width:15px;height:15px;accent-color:#E8562A;flex-shrink:0"><div style="flex:1"><div style="font-weight:800;font-size:0.86rem">${l.title}</div><div style="font-size:0.72rem;color:#9ca3af">${l.subtitle} &middot; ${l.duration}</div></div></label>`).join('');
    return navBack + `<div style="max-width:800px;margin:24px auto;padding:0 28px 80px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:14px"><span style="font-size:1.3rem">${meta.icon}</span><h2 style="font-size:1.1rem;font-weight:900">Select Lessons</h2></div><div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;overflow:hidden;margin-bottom:14px"><div style="border-bottom:1px solid #f3f4f6;display:flex;flex-wrap:wrap;padding:0 4px">${levelTabs}</div>${rows}</div><div style="display:flex;justify-content:space-between"><button onclick="App.go('assign/1')" style="background:#f3f4f6;border:none;border-radius:9px;padding:9px 16px;font-weight:700;cursor:pointer;font-family:inherit">Back</button><button onclick="App.proceedAssign('${subjectKey}','${level}')" style="background:#E8562A;color:white;border:none;border-radius:9px;padding:9px 18px;font-weight:800;cursor:pointer;font-family:inherit">Next: Set Details</button></div></div>`;
  }

  if (step === 3) {
    const pending = JSON.parse(sessionStorage.getItem('learnedu-assign-pending') || '[]');
    return navBack + `<div style="max-width:600px;margin:24px auto;padding:0 28px 80px"><h2 style="font-size:1.1rem;font-weight:900;margin-bottom:4px">Assignment Details</h2><p style="font-size:0.8rem;color:#9ca3af;margin-bottom:16px">Assigning ${pending.length} lesson${pending.length!==1?'s':''}</p><div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;padding:18px"><form onsubmit="App.confirmAssign(event)" style="display:flex;flex-direction:column;gap:14px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div><label style="display:block;font-size:0.78rem;font-weight:800;margin-bottom:5px">Assign to Period</label><select name="period" style="width:100%;padding:8px 11px;border:1.5px solid #e5e7eb;border-radius:8px;font-family:inherit;font-weight:600;font-size:0.82rem"><option>All Periods</option><option>Period 1</option><option>Period 3</option><option>Period 5</option></select></div><div><label style="display:block;font-size:0.78rem;font-weight:800;margin-bottom:5px">Due Date</label><input name="due" type="date" style="width:100%;padding:8px 11px;border:1.5px solid #e5e7eb;border-radius:8px;font-family:inherit;font-size:0.82rem;box-sizing:border-box"></div></div><div><label style="display:block;font-size:0.78rem;font-weight:800;margin-bottom:5px">Instructions (optional)</label><textarea name="note" placeholder="Add instructions for students..." style="width:100%;padding:8px 11px;border:1.5px solid #e5e7eb;border-radius:8px;font-family:inherit;font-size:0.82rem;box-sizing:border-box;height:60px;resize:none"></textarea></div><div style="background:#f9fafb;border-radius:8px;padding:10px 12px"><div style="font-size:0.74rem;font-weight:800;color:#374151;margin-bottom:4px">Lessons to assign (${pending.length}):</div>${pending.map(l=>`<div style="font-size:0.77rem;color:#6b7280;padding:1px 0">&#x2022; ${l}</div>`).join('')}</div><div style="display:flex;justify-content:space-between"><button type="button" onclick="App.go('assign/1')" style="background:#f3f4f6;border:none;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;font-family:inherit">Back</button><button type="submit" style="background:#059669;color:white;border:none;border-radius:8px;padding:9px 20px;font-weight:900;cursor:pointer;font-family:inherit">Confirm & Assign</button></div></form></div></div>`;
  }
  return Views.notFound();
};

Views.dashboardAdmin = function(tab) {
  tab = tab || 'overview';

  // ── Data from data/admin.js ───────────────────────────────
  const SCHOOLS  = (typeof ADMIN_SCHOOLS  !== 'undefined') ? ADMIN_SCHOOLS  : [];
  const TEACHERS = (typeof ADMIN_TEACHERS !== 'undefined') ? ADMIN_TEACHERS : [];
  const ROSTER   = (typeof ADMIN_ROSTER   !== 'undefined') ? ADMIN_ROSTER   : [];
  const LEVELS   = (typeof SPARK_LEVELS   !== 'undefined') ? SPARK_LEVELS   : [];
  const getLvl   = (typeof sparkLevel     !== 'undefined') ? sparkLevel : (s => ({ icon:'⭐', label:'Achiever', color:'#059669', bg:'#ecfdf5' }));

  // ── Top Bar ───────────────────────────────────────────────
  const TABS = [
    {id:'overview',    label:'📊 Overview'},
    {id:'schools',     label:'🏫 Schools'},
    {id:'teachers',    label:'👩‍🏫 Teachers'},
    {id:'roster',      label:'📋 Roster'},
    {id:'spark',       label:'⚡ Spark Scores'},
    {id:'assessments', label:'📈 PM1/PM2'},
    {id:'invite',      label:'✉️ Invite'},
  ];

  const topBar = `
    <div style="background:white;border-bottom:2px solid #e5e7eb;position:sticky;top:0;z-index:100">
      <div style="max-width:1280px;margin:0 auto;padding:0 28px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0 10px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:0.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em">Learn.edu · District Admin</div>
            <h1 style="font-size:1.5rem;font-weight:900;color:#111;letter-spacing:-0.5px;margin-top:1px">Admin Panel</h1>
          </div>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
            <span style="background:#7c3aed18;color:#7c3aed;padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:800">⚙️ Admin Access</span>
            <button onclick="App.go('home')" style="background:#f3f4f6;color:#374151;border:none;border-radius:9px;padding:8px 14px;font-weight:700;font-size:0.8rem;cursor:pointer;font-family:inherit">🏠 Home</button>
            <button onclick="App.logout()" style="background:none;border:1.5px solid #e5e7eb;color:#6b7280;border-radius:9px;padding:7px 12px;font-size:0.76rem;font-weight:700;cursor:pointer;font-family:inherit">Sign Out</button>
          </div>
        </div>
        <div style="display:flex;gap:0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch">
          ${TABS.map(t => `<button onclick="App.go('dashboard/admin/${t.id}')" style="padding:10px 18px;font-size:0.82rem;font-weight:800;cursor:pointer;font-family:inherit;border:none;background:none;white-space:nowrap;border-bottom:3px solid ${t.id===tab?'#7c3aed':'transparent'};color:${t.id===tab?'#7c3aed':'#6B7280'};transition:color 0.15s;flex-shrink:0">${t.label}</button>`).join('')}
        </div>
      </div>
    </div>`;

  const wrap = html => `<div style="max-width:1280px;margin:0 auto;padding:28px 28px 80px">${html}</div>`;

  const statCard = (val, label, color, icon) => `
    <div style="background:white;border-radius:18px;padding:22px 24px;box-shadow:0 1px 8px rgba(0,0,0,0.07);display:flex;align-items:center;gap:14px">
      <div style="width:48px;height:48px;border-radius:14px;background:${color}22;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0">${icon}</div>
      <div>
        <div style="font-size:1.8rem;font-weight:900;color:${color};line-height:1">${val}</div>
        <div style="font-size:0.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-top:4px">${label}</div>
      </div>
    </div>`;

  const actionCard = (color, icon, label, desc, route) => `
    <div onclick="App.go('${route}')" style="background:white;border-radius:16px;border:2px solid ${color}33;overflow:hidden;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="background:${color};color:white;padding:12px 16px;display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:900;font-size:0.9rem">${icon} ${label}</span>
        <span>→</span>
      </div>
      <div style="padding:12px 16px">
        <p style="font-size:0.78rem;color:#6b7280;line-height:1.4;margin:0">${desc}</p>
      </div>
    </div>`;

  const levelBadge = lvl => `<span style="background:${lvl.bg};color:${lvl.color};font-size:0.72rem;font-weight:800;padding:3px 10px;border-radius:999px;white-space:nowrap">${lvl.icon} ${lvl.label}</span>`;

  // ── Spark Level Legend ────────────────────────────────────
  const levelLegend = `
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;background:white;border-radius:14px;padding:14px 18px;box-shadow:0 1px 6px rgba(0,0,0,0.06)">
      <span style="font-size:0.72rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;align-self:center;margin-right:4px">Spark Levels:</span>
      ${LEVELS.map(l => `<span style="background:${l.bg};color:${l.color};font-size:0.72rem;font-weight:800;padding:4px 12px;border-radius:999px">${l.icon} ${l.label} (${l.min}–${l.max}%)</span>`).join('')}
    </div>`;

  // ── OVERVIEW TAB ─────────────────────────────────────────
  const totalStudents = SCHOOLS.reduce((s,x)=>s+x.students,0).toLocaleString();
  const totalTeachers = SCHOOLS.reduce((s,x)=>s+x.teachers,0);
  const avgSpark = Math.round(SCHOOLS.reduce((s,x)=>s+x.avgSpark,0)/SCHOOLS.length);

  const overviewTab = wrap(`
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:32px">
      ${statCard(SCHOOLS.length, 'Schools', '#E8562A', '🏫')}
      ${statCard(totalTeachers, 'Teachers', '#0369a1', '👩‍🏫')}
      ${statCard(totalStudents, 'Students', '#059669', '🎒')}
      ${statCard(avgSpark+'%', 'Avg Spark', '#7c3aed', '⚡')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-bottom:32px">
      ${actionCard('#E8562A','🏫','View Schools',    'Browse all district schools and stats.',           'dashboard/admin/schools')}
      ${actionCard('#0369a1','👩‍🏫','Manage Teachers','Add teachers, assign classes, view data.',         'dashboard/admin/teachers')}
      ${actionCard('#059669','📋','Student Roster',  'Every student across all 5 schools.',              'dashboard/admin/roster')}
      ${actionCard('#7c3aed','⚡','Spark Scores',    'Search all Spark scores by student or school.',    'dashboard/admin/spark')}
      ${actionCard('#d97706','📊','PM1/PM2 Results', 'View scheduled assessment windows.',               'dashboard/admin/assessments')}
      ${actionCard('#e11d48','✉️','Invite Staff',    'Send access invites to principals & admins.',      'dashboard/admin/invite')}
    </div>
    <div style="background:white;border-radius:18px;padding:24px;box-shadow:0 1px 8px rgba(0,0,0,0.07)">
      <div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px">School Performance</div>
      ${SCHOOLS.map(s => {
        const lvl = getLvl(s.avgSpark);
        return `<div style="padding:14px 0;border-bottom:1px solid #f3f4f6">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
            <div style="flex:1">
              <div style="font-size:0.92rem;font-weight:800">${s.name}</div>
              <div style="font-size:0.72rem;color:#9ca3af">${s.city} · Grades ${s.grades} · ${s.teachers} teachers · ${s.students.toLocaleString()} students</div>
            </div>
            ${levelBadge(lvl)}
            <div style="text-align:right;min-width:48px">
              <div style="font-size:1.1rem;font-weight:900;color:${lvl.color}">${s.avgSpark}%</div>
            </div>
          </div>
          <div style="background:#f3f4f6;border-radius:999px;height:6px;overflow:hidden">
            <div style="background:${lvl.color};height:100%;width:${s.avgSpark}%;border-radius:999px"></div>
          </div>
        </div>`;
      }).join('')}
    </div>`);

  // ── SCHOOLS TAB ──────────────────────────────────────────
  const schoolsTab = wrap(`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <div><h2 style="font-size:1.15rem;font-weight:900;margin:0">All Schools</h2><p style="font-size:0.82rem;color:#6b7280;margin:4px 0 0">${SCHOOLS.length} schools · ${totalStudents} total students</p></div>
      <button onclick="alert('Add School form coming soon!')" style="background:#7c3aed;color:white;border:none;border-radius:10px;padding:9px 18px;font-size:0.82rem;font-weight:800;cursor:pointer;font-family:inherit">+ Add School</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px">
      ${SCHOOLS.map(s => {
        const lvl = getLvl(s.avgSpark);
        return `<div style="background:white;border-radius:16px;padding:20px;box-shadow:0 1px 8px rgba(0,0,0,0.07)">
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px">
            <div style="width:48px;height:48px;border-radius:14px;background:#E8562A18;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0">🏫</div>
            <div style="flex:1">
              <div style="font-size:0.95rem;font-weight:900">${s.name}</div>
              <div style="font-size:0.74rem;color:#6b7280;margin-top:2px">${s.city} · Grades ${s.grades}</div>
              <div style="margin-top:6px">${levelBadge(lvl)}</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:1.3rem;font-weight:900;color:${lvl.color}">${s.avgSpark}%</div>
              <div style="font-size:0.62rem;color:#9ca3af;font-weight:700">AVG SPARK</div>
            </div>
          </div>
          <div style="background:#f3f4f6;border-radius:999px;height:5px;overflow:hidden;margin-bottom:12px">
            <div style="background:${lvl.color};height:100%;width:${s.avgSpark}%;border-radius:999px"></div>
          </div>
          <div style="display:flex;gap:8px">
            <span style="font-size:0.72rem;background:#f3f4f6;border-radius:6px;padding:3px 10px;font-weight:700">👩‍🏫 ${s.teachers} teachers</span>
            <span style="font-size:0.72rem;background:#f3f4f6;border-radius:6px;padding:3px 10px;font-weight:700">🎒 ${s.students.toLocaleString()} students</span>
          </div>
        </div>`;
      }).join('')}
    </div>`);

  // ── TEACHERS TAB ────────────────────────────────────────
  const teachersTab = wrap(`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
      <div><h2 style="font-size:1.15rem;font-weight:900;margin:0">Teachers</h2><p style="font-size:0.82rem;color:#6b7280;margin:4px 0 0">${TEACHERS.length} teachers across ${SCHOOLS.length} schools</p></div>
      <button onclick="alert('Invite Teacher coming soon!')" style="background:#0369a1;color:white;border:none;border-radius:10px;padding:9px 18px;font-size:0.82rem;font-weight:800;cursor:pointer;font-family:inherit">+ Invite Teacher</button>
    </div>
    <div style="background:white;border-radius:18px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.07)">
      ${TEACHERS.map((t,i) => `
        <div style="display:grid;grid-template-columns:1fr 1.4fr 80px 80px 90px;gap:12px;padding:14px 20px;border-bottom:1px solid #f3f4f6;align-items:center;${i%2===1?'background:#fafafa':''}">
          <div style="display:flex;align-items:center;gap:9px">
            <div style="width:34px;height:34px;border-radius:50%;background:#0369a122;display:flex;align-items:center;justify-content:center;font-size:0.82rem;font-weight:900;color:#0369a1;flex-shrink:0">${t.name.split(' ').pop()[0]}</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">${t.name}</div>
              <div style="font-size:0.7rem;color:#9ca3af">${t.subject}</div>
            </div>
          </div>
          <div style="font-size:0.8rem;color:#6b7280">${t.school}</div>
          <div style="font-size:0.82rem;font-weight:700;text-align:center">${t.classes} classes</div>
          <div style="font-size:0.82rem;font-weight:700;text-align:center">${t.students} students</div>
          <div style="text-align:center"><span style="font-size:0.72rem;font-weight:800;padding:3px 10px;border-radius:999px;background:${t.status==='active'?'#d1fae5':'#fee2e2'};color:${t.status==='active'?'#059669':'#dc2626'}">${t.status}</span></div>
        </div>`).join('')}
    </div>`);

  // ── ROSTER TAB ───────────────────────────────────────────
  const rosterTab = wrap(`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div><h2 style="font-size:1.15rem;font-weight:900;margin:0">Student Roster</h2><p style="font-size:0.82rem;color:#6b7280;margin:4px 0 0">${ROSTER.length} students shown · ${totalStudents} district-wide</p></div>
      <button onclick="alert('Import CSV coming soon!')" style="background:#059669;color:white;border:none;border-radius:10px;padding:9px 18px;font-size:0.82rem;font-weight:800;cursor:pointer;font-family:inherit">+ Import Students</button>
    </div>
    ${levelLegend}
    ${SCHOOLS.map(school => {
      const students = ROSTER.filter(s => s.school === school.name);
      if (!students.length) return '';
      return `<div style="margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <span style="font-size:1rem">🏫</span>
          <h3 style="font-size:0.92rem;font-weight:900;margin:0">${school.name}</h3>
          <span style="font-size:0.72rem;color:#9ca3af;font-weight:700">${students.length} students</span>
        </div>
        <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.06)">
          ${students.map((s,i) => {
            const lvl = getLvl(s.avg);
            return `<div style="display:grid;grid-template-columns:1.5fr 1fr 60px 1fr 80px 80px 80px;gap:10px;padding:12px 16px;border-bottom:1px solid #f3f4f6;align-items:center;${i%2===1?'background:#fafafa':''}">
              <div style="font-size:0.86rem;font-weight:800">${s.name}</div>
              <div style="font-size:0.76rem;color:#6b7280">${s.teacher}</div>
              <div style="font-size:0.78rem;font-weight:700;text-align:center">Gr.${s.grade}</div>
              <div>${levelBadge(lvl)}</div>
              <div style="text-align:center"><div style="font-size:0.8rem;font-weight:900;color:#E8562A">${s.math}%</div><div style="font-size:0.6rem;color:#9ca3af">Math</div></div>
              <div style="text-align:center"><div style="font-size:0.8rem;font-weight:900;color:#0891b2">${s.sci}%</div><div style="font-size:0.6rem;color:#9ca3af">Sci</div></div>
              <div style="text-align:center"><div style="font-size:0.8rem;font-weight:900;color:#16a34a">${s.spa}%</div><div style="font-size:0.6rem;color:#9ca3af">Spa</div></div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}`);

  // ── SPARK TAB ────────────────────────────────────────────
  const sparkTab = wrap(`
    <div style="margin-bottom:16px">
      <h2 style="font-size:1.15rem;font-weight:900;margin:0 0 4px">Spark Scores</h2>
      <p style="font-size:0.82rem;color:#6b7280;margin:0">${ROSTER.length} students across all schools</p>
    </div>
    ${levelLegend}
    <div style="background:white;border-radius:14px;padding:12px 16px;box-shadow:0 1px 6px rgba(0,0,0,0.06);margin-bottom:20px;display:flex;align-items:center;gap:10px">
      <span style="font-size:1.1rem">🔍</span>
      <input id="admin-spark-search" placeholder="Search by name, school, or code…" oninput="document.querySelectorAll('.spark-row').forEach(r=>r.style.display=this.value&&!r.dataset.search.toLowerCase().includes(this.value.toLowerCase())?'none':'')" style="border:none;outline:none;flex:1;font-size:0.88rem;font-family:inherit;background:transparent">
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${ROSTER.map(s => {
        const lvl = getLvl(s.avg);
        return `<div class="spark-row" data-search="${s.name} ${s.school} ${s.code}" style="background:white;border-radius:14px;padding:14px 18px;box-shadow:0 1px 6px rgba(0,0,0,0.05);display:grid;grid-template-columns:1.4fr 1.2fr 1fr 80px 80px 80px 100px;gap:10px;align-items:center">
          <div>
            <div style="font-size:0.88rem;font-weight:800">${s.name}</div>
            <div style="font-size:0.68rem;color:#9ca3af;font-family:monospace;margin-top:1px">${s.code}</div>
          </div>
          <div style="font-size:0.78rem;color:#6b7280">${s.school}</div>
          <div style="font-size:0.76rem;color:#6b7280">${s.teacher} · Gr.${s.grade}</div>
          <div style="text-align:center"><div style="font-size:0.82rem;font-weight:900;color:#E8562A">${s.math}%</div><div style="font-size:0.6rem;color:#9ca3af">Math</div></div>
          <div style="text-align:center"><div style="font-size:0.82rem;font-weight:900;color:#0891b2">${s.sci}%</div><div style="font-size:0.6rem;color:#9ca3af">Sci</div></div>
          <div style="text-align:center"><div style="font-size:0.82rem;font-weight:900;color:#16a34a">${s.spa}%</div><div style="font-size:0.6rem;color:#9ca3af">Spa</div></div>
          <div style="text-align:right">${levelBadge(lvl)}</div>
        </div>`;
      }).join('')}
    </div>`);

  // ── ASSESSMENTS TAB ──────────────────────────────────────
  const ASSESSMENTS = [
    { name:'Spark PM1 — Fall Window',   period:'September 2026', status:'scheduled', window:'Sep 1–30',     schools:5, notes:'Baseline assessment for the school year.' },
    { name:'Spark PM2 — Winter Window', period:'February 2027',  status:'scheduled', window:'Feb 1–28',     schools:5, notes:'Mid-year growth check.' },
    { name:'Spark PM1 — Fall 2025',     period:'September 2025', status:'closed',    window:'Sep 1–30',     schools:5, avgSpark:76, notes:'PM1 complete. Results locked.' },
    { name:'Spark PM2 — Spring 2026',   period:'April 2026',     status:'open',      window:'Apr 1–May 15', schools:5, notes:'Current active window. Submissions accepted.' },
  ];
  const statusColors = {open:'#059669',closed:'#6b7280',scheduled:'#0369a1'};
  const statusBg     = {open:'#d1fae5',closed:'#f3f4f6',scheduled:'#dbeafe'};

  const assessmentsTab = wrap(`
    <div style="margin-bottom:20px">
      <h2 style="font-size:1.15rem;font-weight:900;margin:0 0 4px">PM1 / PM2 Assessment Windows</h2>
      <p style="font-size:0.82rem;color:#6b7280;margin:0">Scheduled and past assessment periods</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${ASSESSMENTS.map(a => `
        <div style="background:white;border-radius:16px;padding:20px 24px;box-shadow:0 1px 8px rgba(0,0,0,0.07);display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:5px">
              <div style="font-size:0.95rem;font-weight:900">${a.name}</div>
              <span style="font-size:0.7rem;font-weight:800;padding:2px 10px;border-radius:999px;background:${statusBg[a.status]};color:${statusColors[a.status]}">${a.status}</span>
            </div>
            <div style="font-size:0.78rem;color:#6b7280">${a.period} · Window: ${a.window} · ${a.schools} schools</div>
            <div style="font-size:0.76rem;color:#9ca3af;margin-top:4px">${a.notes}</div>
          </div>
          ${a.avgSpark ? `<div style="text-align:center"><div style="font-size:1.4rem;font-weight:900;color:#7c3aed">${a.avgSpark}%</div><div style="font-size:0.65rem;color:#9ca3af;font-weight:700">AVG SPARK</div></div>` : ''}
        </div>`).join('')}
    </div>`);

  // ── INVITE TAB ───────────────────────────────────────────
  const inviteTab = wrap(`
    <div style="margin-bottom:20px">
      <h2 style="font-size:1.15rem;font-weight:900;margin:0 0 4px">Invite Staff</h2>
      <p style="font-size:0.82rem;color:#6b7280;margin:0">Send access invites to principals & admins</p>
    </div>
    <div style="background:white;border-radius:18px;padding:28px;box-shadow:0 1px 8px rgba(0,0,0,0.07);max-width:520px">
      <div style="margin-bottom:16px">
        <label style="display:block;font-size:0.78rem;font-weight:800;color:#374151;margin-bottom:6px">Email Address</label>
        <input placeholder="staff@school.edu" style="width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 14px;font-size:0.88rem;font-family:inherit;outline:none;box-sizing:border-box">
      </div>
      <div style="margin-bottom:20px">
        <label style="display:block;font-size:0.78rem;font-weight:800;color:#374151;margin-bottom:6px">Role</label>
        <select style="width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 14px;font-size:0.88rem;font-family:inherit;outline:none;background:white;box-sizing:border-box">
          <option>Principal</option><option>Admin</option><option>Teacher</option>
        </select>
      </div>
      <button onclick="alert('Invite sent! (demo)')" style="background:#7c3aed;color:white;border:none;border-radius:10px;padding:11px 24px;font-size:0.88rem;font-weight:800;cursor:pointer;font-family:inherit;width:100%">Send Invite ✉️</button>
    </div>`);

  // ── Assemble ─────────────────────────────────────────────
  const bodyMap = { overview:overviewTab, schools:schoolsTab, teachers:teachersTab, roster:rosterTab, spark:sparkTab, assessments:assessmentsTab, invite:inviteTab };
  return topBar + (bodyMap[tab] || overviewTab);
};



// ── Parent Dashboard ──────────────────────────────────────────
Views.dashboardParent = function() {
  const progress = (() => { try { return JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); } catch { return {}; } })();

  const ALL_LESSONS = [
    {id:'math-4-multiplication',  title:'Multiplication',     subj:'math',    grade:4, icon:'📐'},
    {id:'math-4-long-division',   title:'Long Division',      subj:'math',    grade:4, icon:'📐'},
    {id:'math-5-fractions',       title:'Fractions',          subj:'math',    grade:5, icon:'📐'},
    {id:'math-5-decimals',        title:'Decimals',           subj:'math',    grade:5, icon:'📐'},
    {id:'math-6-ratios',          title:'Ratios',             subj:'math',    grade:6, icon:'📐'},
    {id:'math-6-percentages',     title:'Percentages',        subj:'math',    grade:6, icon:'📐'},
    {id:'science-4-ecosystems',   title:'Ecosystems',         subj:'science', grade:4, icon:'⚗️'},
    {id:'science-5-cells',        title:'Cell Biology',       subj:'science', grade:5, icon:'⚗️'},
    {id:'science-6-earth',        title:'Earth Science',      subj:'science', grade:6, icon:'⚗️'},
    {id:'spanish-4-greetings',    title:'Greetings',          subj:'spanish', grade:4, icon:'🌎'},
    {id:'spanish-4-numbers',      title:'Numbers 1–20',       subj:'spanish', grade:4, icon:'🌎'},
    {id:'spanish-5-beginning',    title:'Beginner Spanish',   subj:'spanish', grade:5, icon:'🌎'},
  ];

  const done    = ALL_LESSONS.filter(l => progress[l.id]?.completed);
  const avgScore = done.length
    ? Math.round(done.reduce((s,l) => s + (progress[l.id]?.score||0), 0) / done.length)
    : 0;

  const mathDone = done.filter(l=>l.subj==='math').length;
  const sciDone  = done.filter(l=>l.subj==='science').length;
  const spaDone  = done.filter(l=>l.subj==='spanish').length;
  const totalMath = ALL_LESSONS.filter(l=>l.subj==='math').length;
  const totalSci  = ALL_LESSONS.filter(l=>l.subj==='science').length;
  const totalSpa  = ALL_LESSONS.filter(l=>l.subj==='spanish').length;

  const streak = (() => { try { return JSON.parse(localStorage.getItem('learnedu-xp') || '{}').streak || 0; } catch { return 0; } })();

  const lvlLabel = avgScore >= 90 ? '🏆 Champion'
                 : avgScore >= 80 ? '🚀 Trailblazer'
                 : avgScore >= 65 ? '🎯 Achiever'
                 : avgScore >= 50 ? '🔭 Explorer'
                 : avgScore > 0   ? '🌱 Seedling'
                 : '—';

  const lvlColor = avgScore >= 90 ? '#7c3aed' : avgScore >= 80 ? '#E8562A' : avgScore >= 65 ? '#059669' : avgScore >= 50 ? '#0369a1' : '#d97706';

  const recentLessons = done.slice().sort((a,b) => {
    const da = progress[a.id]?.date ? new Date(progress[a.id].date).getTime() : 0;
    const db = progress[b.id]?.date ? new Date(progress[b.id].date).getTime() : 0;
    return db - da;
  }).slice(0,5);

  const upcoming = ALL_LESSONS.filter(l => !progress[l.id]?.completed).slice(0,4);

  const teacherNotes = [
    { from:'Ms. Rivera',   subj:'Math',    color:'#E8562A', note:'Doing great on multiplication. Fractions need more practice — try the Grade 5 fractions lesson.', date:'Apr 28'},
    { from:'Mr. Thompson', subj:'Science', color:'#059669', note:'Strong understanding of ecosystems. Cell Biology unit starting next week.', date:'Apr 26'},
    { from:'Sra. López',   subj:'Spanish', color:'#7c3aed', note:'Excellent participation. Numbers vocabulary is solid — ready for Beginner Spanish.', date:'Apr 24'},
  ];

  const TABS = [
    {id:'overview',  label:'📊 Overview'},
    {id:'progress',  label:'📈 Progress'},
    {id:'activity',  label:'📅 Activity'},
    {id:'messages',  label:'✉️ Messages'},
  ];
  const tab = 'overview'; // Parent dashboard defaults to overview (single-page for now)

  const topBar = `
    <div style="background:white;border-bottom:2px solid #e5e7eb;position:sticky;top:0;z-index:100">
      <div style="max-width:1280px;margin:0 auto;padding:0 28px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0 10px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:0.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em">Learn.edu Parent Portal</div>
            <h1 style="font-size:1.5rem;font-weight:900;color:#111;letter-spacing:-0.5px;margin-top:1px">Your Child's Learning</h1>
          </div>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
            <span style="background:#0369a118;color:#0369a1;padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:800">🏠 Parent View</span>
            <button onclick="App.go('home')" style="background:#f3f4f6;color:#374151;border:none;border-radius:9px;padding:8px 14px;font-weight:700;font-size:0.8rem;cursor:pointer;font-family:inherit">👁️ Preview App</button>
            <button onclick="App.logout()" style="background:none;border:1.5px solid #e5e7eb;color:#6b7280;border-radius:9px;padding:7px 12px;font-size:0.76rem;font-weight:700;cursor:pointer;font-family:inherit">Sign Out</button>
          </div>
        </div>
      </div>
    </div>`;

  const wrap = html => `<div style="max-width:1280px;margin:0 auto;padding:28px 28px 80px">${html}</div>`;

  const statCard = (icon, val, label, color) => `
    <div style="background:white;border-radius:18px;padding:22px 24px;box-shadow:0 1px 8px rgba(0,0,0,0.07);display:flex;align-items:center;gap:14px">
      <div style="width:48px;height:48px;border-radius:14px;background:${color}22;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0">${icon}</div>
      <div>
        <div style="font-size:1.8rem;font-weight:900;color:${color};line-height:1">${val}</div>
        <div style="font-size:0.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-top:4px">${label}</div>
      </div>
    </div>`;

  const progressBar = (done, total, color) => {
    const pct = total > 0 ? Math.round(done/total*100) : 0;
    return `<div style="background:#f3f4f6;border-radius:999px;height:8px;overflow:hidden;flex:1">
      <div style="background:${color};height:100%;width:${pct}%;border-radius:999px;transition:width 0.5s ease"></div>
    </div>`;
  };

  const body = wrap(`
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:32px">
      ${statCard('✅', done.length, 'Lessons Done', '#059669')}
      ${statCard('📊', avgScore ? avgScore+'%' : '—', 'Avg Score', '#E8562A')}
      ${statCard('🔥', streak || '0', 'Day Streak', '#d97706')}
      ${statCard('⚡', lvlLabel, 'Spark Level', lvlColor)}
    </div>

    <div style="display:grid;grid-template-columns:1fr 380px;gap:20px;align-items:start">
      <!-- Left column -->
      <div>
        <!-- Subject Progress -->
        <div style="background:white;border-radius:18px;padding:24px;box-shadow:0 1px 8px rgba(0,0,0,0.07);margin-bottom:20px">
          <div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:18px">Subject Progress</div>
          ${[
            {label:'📐 Math',    done:mathDone, total:totalMath, color:'#E8562A'},
            {label:'⚗️ Science', done:sciDone,  total:totalSci,  color:'#059669'},
            {label:'🌎 Spanish', done:spaDone,  total:totalSpa,  color:'#7c3aed'},
          ].map(s => `
            <div style="margin-bottom:18px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-size:0.92rem;font-weight:800">${s.label}</span>
                <span style="font-size:0.82rem;color:#6b7280;font-weight:700">${s.done} / ${s.total} lessons</span>
              </div>
              <div style="display:flex;align-items:center;gap:10px">
                ${progressBar(s.done, s.total, s.color)}
                <span style="font-size:0.82rem;font-weight:900;color:${s.color};min-width:36px">${s.total>0?Math.round(s.done/s.total*100):0}%</span>
              </div>
            </div>`).join('')}
        </div>

        <!-- Recent Activity -->
        <div style="background:white;border-radius:18px;padding:24px;box-shadow:0 1px 8px rgba(0,0,0,0.07);margin-bottom:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em">Recent Lessons</div>
            <button onclick="App.go('home')" style="font-size:0.75rem;font-weight:700;color:#E8562A;background:none;border:none;cursor:pointer">View All →</button>
          </div>
          ${recentLessons.length ? recentLessons.map(l => {
            const p = progress[l.id];
            const sc = p?.score || 0;
            const scColor = sc>=80?'#059669':sc>=65?'#d97706':'#dc2626';
            const timeAgo = p?.date ? (() => {
              const d = Math.floor((Date.now()-new Date(p.date).getTime())/86400000);
              return d===0?'Today':d===1?'Yesterday':d+' days ago';
            })() : 'Recently';
            return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f3f4f6">
              <div style="width:36px;height:36px;border-radius:10px;background:${l.subj==='math'?'#E8562A':l.subj==='science'?'#059669':'#7c3aed'}18;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${l.icon}</div>
              <div style="flex:1">
                <div style="font-size:0.88rem;font-weight:800">${l.title}</div>
                <div style="font-size:0.72rem;color:#9ca3af">Grade ${l.grade} · ${timeAgo}</div>
              </div>
              <div style="font-size:0.9rem;font-weight:900;color:${scColor}">${sc}%</div>
              <span style="background:#dcfce7;color:#059669;font-size:0.68rem;font-weight:800;padding:2px 8px;border-radius:999px">✓ Done</span>
            </div>`;
          }).join('') : `<div style="text-align:center;padding:28px;color:#9ca3af;font-size:0.88rem">No lessons completed yet.<br><button onclick="App.go('home')" style="margin-top:12px;background:#E8562A;color:white;border:none;border-radius:9px;padding:9px 18px;font-weight:800;cursor:pointer;font-family:inherit">Start Learning →</button></div>`}
        </div>

        <!-- Upcoming Lessons -->
        ${upcoming.length ? `
        <div style="background:white;border-radius:18px;padding:24px;box-shadow:0 1px 8px rgba(0,0,0,0.07)">
          <div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px">Up Next</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${upcoming.map(l => `
              <div onclick="App.go('lesson/${l.id}')" style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:12px;padding:14px;cursor:pointer;transition:border-color 0.15s" onmouseover="this.style.borderColor='#E8562A'" onmouseout="this.style.borderColor='#e5e7eb'">
                <div style="font-size:1.3rem;margin-bottom:6px">${l.icon}</div>
                <div style="font-size:0.86rem;font-weight:800">${l.title}</div>
                <div style="font-size:0.72rem;color:#9ca3af;margin-top:2px">Grade ${l.grade}</div>
              </div>`).join('')}
          </div>
        </div>` : ''}
      </div>

      <!-- Right column -->
      <div>
        <!-- Weekly Report Card -->
        <div style="background:linear-gradient(135deg,#0369a1,#0891b2);border-radius:18px;padding:24px;margin-bottom:16px;color:white">
          <div style="font-size:0.7rem;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;opacity:0.8;margin-bottom:6px">Weekly Report</div>
          <div style="font-size:2.2rem;font-weight:900;letter-spacing:-1px;margin-bottom:2px">${done.length} <span style="font-size:1rem;opacity:0.8">lessons done</span></div>
          <div style="font-size:0.88rem;opacity:0.85;margin-bottom:16px">Week of Apr 28, 2026</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:12px;text-align:center">
              <div style="font-size:1.5rem;font-weight:900">${avgScore || '—'}${avgScore?'%':''}</div>
              <div style="font-size:0.68rem;opacity:0.8;font-weight:700;margin-top:2px">Avg Score</div>
            </div>
            <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:12px;text-align:center">
              <div style="font-size:1.5rem;font-weight:900">${streak || 0}🔥</div>
              <div style="font-size:0.68rem;opacity:0.8;font-weight:700;margin-top:2px">Day Streak</div>
            </div>
          </div>
        </div>

        <!-- Teacher Notes -->
        <div style="background:white;border-radius:18px;padding:24px;box-shadow:0 1px 8px rgba(0,0,0,0.07);margin-bottom:16px">
          <div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px">Teacher Notes</div>
          ${teacherNotes.map(n => `
            <div style="padding:12px 0;border-bottom:1px solid #f3f4f6">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
                <div style="width:28px;height:28px;border-radius:50%;background:${n.color}22;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:900;color:${n.color}">${n.from[0]}</div>
                <div>
                  <span style="font-size:0.82rem;font-weight:800">${n.from}</span>
                  <span style="font-size:0.72rem;color:#9ca3af;margin-left:6px">${n.subj} · ${n.date}</span>
                </div>
              </div>
              <p style="font-size:0.82rem;color:#374151;line-height:1.5;margin:0;padding-left:36px">${n.note}</p>
            </div>`).join('')}
          <button onclick="Modal.show('Message Teacher', Modal.select('Teacher',['Ms. Rivera (Math)','Mr. Thompson (Science)','Sra. López (Spanish)']) + '<div style=&quot;margin-bottom:14px&quot;><label style=&quot;display:block;font-size:0.78rem;font-weight:800;color:#374151;margin-bottom:5px&quot;>Message</label><textarea placeholder=&quot;Type your message...&quot; style=&quot;width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:0.88rem;font-family:inherit;outline:none;box-sizing:border-box;height:90px;resize:none&quot;></textarea></div>', [{label:'Send ✉️', fn:\"Modal.toast('Message sent to teacher!');Modal.close()\", color:'#0369a1'}])" style="margin-top:14px;background:#f3f4f6;border:none;border-radius:9px;padding:8px 16px;font-size:0.78rem;font-weight:700;cursor:pointer;font-family:inherit;width:100%">✉️ Message a Teacher</button>
        </div>

        <!-- Quick Actions -->
        <div style="background:white;border-radius:18px;padding:20px;box-shadow:0 1px 8px rgba(0,0,0,0.07)">
          <div style="font-size:0.75rem;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:14px">Quick Actions</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button onclick="App.go('spark')" style="background:#7c3aed18;color:#7c3aed;border:1.5px solid #7c3aed33;border-radius:12px;padding:12px 16px;font-weight:800;font-size:0.84rem;cursor:pointer;font-family:inherit;text-align:left">⚡ Take a Spark Assessment</button>
            <button onclick="App.go('home')" style="background:#E8562A18;color:#E8562A;border:1.5px solid #E8562A33;border-radius:12px;padding:12px 16px;font-weight:800;font-size:0.84rem;cursor:pointer;font-family:inherit;text-align:left">📚 Browse All Lessons</button>
            <button onclick="App.go('study')" style="background:#05996918;color:#059669;border:1.5px solid #05996933;border-radius:12px;padding:12px 16px;font-weight:800;font-size:0.84rem;cursor:pointer;font-family:inherit;text-align:left">🧠 Study Tools</button>
          </div>
        </div>
      </div>
    </div>`);

  return topBar + body;
};



Views.rewards = function() {
  const s     = XP.getState();
  const lvl   = XP.level(s.total);
  const next  = XP.nextReward();
  const nextXp = next ? next.xpRequired - s.total : 0;
  const progress = App.getProgress();
  const completedCount = Object.values(progress).filter(v => v.completed).length;

  const typeLabel = { theme:'🎨 Theme', game:'🎮 Game', badge:'🏅 Badge', prize:'🎁 Prize' };

  const cards = XP.REWARDS.map(r => {
    const unlocked = s.unlockedIds.includes(r.id);
    const isTheme  = r.type === 'theme';
    const isActive = isTheme && s.activeTheme === (r.cssClass || '');
    const xpLeft   = r.xpRequired - s.total;

    let action = '';
    if (unlocked) {
      if (isTheme) {
        action = isActive
          ? `<button class="btn btn-ghost" style="font-size:0.78rem;padding:5px 14px;opacity:0.5" disabled>Active ✓</button>`
          : `<button class="btn btn-primary" style="font-size:0.78rem;padding:5px 14px" onclick="XP.setTheme('${r.cssClass||''}');App.route()">Apply</button>`;
      } else if (r.type === 'game') {
        action = `<button class="btn btn-primary" style="font-size:0.78rem;padding:5px 14px" onclick="App.go('${r.route}')">Play →</button>`;
      } else if (r.type === 'prize' && r.id === 'prize-mystery') {
        action = `<button class="btn btn-primary" style="font-size:0.78rem;padding:5px 14px" onclick="Views._mysteryPrize()">Open 🎁</button>`;
      }
    } else {
      action = `<div style="font-size:0.72rem;color:var(--muted);font-weight:700">${xpLeft > 0 ? `+${xpLeft} XP to unlock` : 'Almost there!'}</div>`;
    }

    return `
      <div class="reward-card ${unlocked ? 'reward-unlocked' : 'reward-locked'}">
        <div class="reward-icon">${r.icon}</div>
        <div class="reward-label">${typeLabel[r.type] || r.type}</div>
        <div class="reward-name">${r.name}</div>
        <div class="reward-desc">${r.desc}</div>
        ${!unlocked ? `<div class="reward-xp-req">⚡ ${r.xpRequired} XP</div>` : ''}
        <div style="margin-top:auto;padding-top:12px">${action}</div>
      </div>`;
  }).join('');

  // Progress bar to next reward
  const barPct = next
    ? Math.round(Math.max(0, Math.min(100, ((s.total - (next.xpRequired - (next.xpRequired - (XP.REWARDS[XP.REWARDS.indexOf(next)-1]?.xpRequired || 0)))) / (next.xpRequired - (XP.REWARDS[XX = XP.REWARDS.indexOf(next), XX > 0 ? XX - 1 : 0]?.xpRequired || 0))) * 100)))
    : 100;
  const prevThreshold = next ? (XP.REWARDS[XP.REWARDS.indexOf(next) - 1]?.xpRequired || 0) : 0;
  const barFill = next
    ? Math.round(((s.total - prevThreshold) / (next.xpRequired - prevThreshold)) * 100)
    : 100;

  return `
    <div style="max-width:900px;margin:0 auto;padding:0 20px 60px">
      ${Views.nav()}

      <!-- Hero -->
      <div style="background:linear-gradient(135deg,${lvl.color},${lvl.color}cc);border-radius:24px;padding:32px;margin:24px 0;color:white;display:flex;align-items:center;gap:24px;flex-wrap:wrap">
        <div style="font-size:3rem;flex-shrink:0">⚡</div>
        <div style="flex:1;min-width:180px">
          <div style="font-size:0.78rem;font-weight:800;opacity:0.8;letter-spacing:.08em;text-transform:uppercase">Level ${lvl.num} · ${lvl.name}</div>
          <div style="font-size:2.8rem;font-weight:900;line-height:1">${s.total.toLocaleString()} <span style="font-size:1.2rem;opacity:0.85">XP</span></div>
          <div style="font-size:0.85rem;opacity:0.85;margin-top:4px">🔥 ${s.streak}-day streak · 📚 ${completedCount} lessons done</div>
          ${next ? `
          <div style="margin-top:14px">
            <div style="font-size:0.75rem;opacity:0.85;margin-bottom:6px">Next unlock: ${next.icon} ${next.name} (+${nextXp} XP)</div>
            <div style="background:rgba(255,255,255,0.25);border-radius:999px;height:8px;overflow:hidden">
              <div style="background:white;height:8px;border-radius:999px;width:${barFill}%;transition:width 0.5s"></div>
            </div>
          </div>` : '<div style="font-size:0.85rem;opacity:0.85;margin-top:8px">🎉 All rewards unlocked!</div>'}
        </div>
      </div>

      <!-- Filter tabs (optional) -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
        ${['All','🎨 Themes','🎮 Games','🏅 Badges','🎁 Prizes'].map((t,i) =>
          `<button onclick="Views._filterRewards(this,'${t}')" class="filter-tab ${i===0?'active':''}" data-filter="${t}">${t}</button>`
        ).join('')}
      </div>

      <!-- Reward grid -->
      <div id="rewards-grid" class="rewards-grid">${cards}</div>
    </div>`;
};

Views._filterRewards = function(btn, filter) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.reward-card').forEach(card => {
    if (filter === 'All') { card.style.display = ''; return; }
    const label = card.querySelector('.reward-label')?.textContent || '';
    card.style.display = label.includes(filter.replace(/[🎨🎮🏅🎁] /, '').trim()) ? '' : 'none';
  });
};

Views._mysteryPrize = function() {
  const prizes = ['🦄 You are a unicorn coder!', '🚀 Future tech founder right here!', '🧠 Big brain energy!', '💎 Diamond-tier learner!', '🎸 Rocking it!'];
  const msg = prizes[Math.floor(Math.random() * prizes.length)];
  const el = document.getElementById('app');
  if (!el) return;
  el.insertAdjacentHTML('beforeend', `
    <div id="mystery-overlay" onclick="this.remove()" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center">
      <div class="score-card pop" style="max-width:380px;text-align:center;padding:40px">
        <div style="font-size:4rem">🎁</div>
        <h2 style="font-size:1.4rem">Your Mystery Prize</h2>
        <p style="font-size:1.1rem;font-weight:700;color:#E8562A">${msg}</p>
        <p style="color:var(--muted);font-size:0.85rem">Keep earning XP for more surprises…</p>
        <button class="btn btn-primary" onclick="document.getElementById('mystery-overlay').remove()">Awesome! 🎉</button>
      </div>
    </div>`);
};

// ============================================================
//  Game Shell View
// ============================================================
Views.game = function(gameId) {
  const games = {
    mathblast: { name: 'Math Blast', icon: '💥', desc: '15 questions · 60 seconds', color: '#E8562A', locked: !XP.isUnlocked('game-mathblast') },
    wordrush:  { name: 'Word Rush',  icon: '📝', desc: '15 words  · 60 seconds',   color: '#7c3aed', locked: !XP.isUnlocked('game-wordrush') },
  };
  const g = games[gameId] || games.mathblast;

  if (g.locked) {
    return `
      <div style="max-width:600px;margin:0 auto;padding:0 20px">
        ${Views.nav({ hash: 'rewards', label: '← Rewards' })}
        <div style="text-align:center;padding:80px 20px">
          <div style="font-size:4rem">🔒</div>
          <h2>This game is locked</h2>
          <p style="color:var(--muted)">Keep earning XP to unlock it!</p>
          <button class="btn btn-primary" onclick="App.go('rewards')">View Rewards</button>
        </div>
      </div>`;
  }

  return `
    <div style="max-width:600px;margin:0 auto;padding:0 20px 60px">
      ${Views.nav({ hash: 'rewards', label: '← Rewards' })}
      <div style="text-align:center;padding:24px 0 16px">
        <div style="font-size:2.5rem">${g.icon}</div>
        <h1 style="font-size:1.8rem;font-weight:900;margin:8px 0 4px">${g.name}</h1>
        <p style="color:var(--muted);font-size:0.88rem">${g.desc}</p>
      </div>
      <div id="mb-arena" style="background:var(--card);border-radius:24px;padding:28px;box-shadow:var(--shadow)">
        <!-- game renders here -->
      </div>
    </div>`;
};


// ── Admin Panel helpers ──────────────────────────────────────
window.AdminPanel = {
  filterTeachers(query) {
    const q = (query || '').toLowerCase();
    document.querySelectorAll('.admin-teacher-row').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  },
  showAddTeacher() {
    Modal.show('Add Teacher', Modal.field('Full Name','text','e.g. Ms. Rivera') + Modal.field('Email','email','teacher@school.edu') + Modal.select('School',['Lincoln Middle School','Roosevelt Elementary','Jefferson High School','Westside Academy','Sunrise STEM Charter']) + Modal.select('Subject',['Math','Science','Spanish','ELA','History']) + Modal.field('Number of Classes','number','e.g. 3'), [{label:'Add Teacher', fn:"Modal.toast('Teacher invited!');Modal.close()", color:'#0369a1'}]);
  },
  filterSpark(query) {
    const q = (query || '').toLowerCase();
    document.querySelectorAll('.admin-spark-row').forEach(row => {
      row.style.display = (row.dataset.student.includes(q) || row.textContent.toLowerCase().includes(q)) ? '' : 'none';
    });
  },
  filterSparkSchool(school) {
    document.querySelectorAll('.admin-spark-row').forEach(row => {
      row.style.display = (!school || row.dataset.school === school) ? '' : 'none';
    });
  },
};

// ── Roster Import View ─────────────────────────────────────────────────────
Views.rosterImport = function() {
  return `
    <nav style="background:white;border-bottom:1.5px solid #e5e7eb;padding:0 24px;height:54px;display:flex;align-items:center;gap:14px;position:sticky;top:0;z-index:100">
      <button onclick="App.go('dashboard/teacher/roster')" style="background:none;border:none;font-size:0.85rem;font-weight:700;color:#374151;cursor:pointer;display:flex;align-items:center;gap:5px">← Back to Roster</button>
      <span style="font-size:1rem;font-weight:900;color:#111">Import Your Class Roster</span>
    </nav>
    <div style="max-width:640px;margin:0 auto;padding:32px 24px 80px">

      <!-- Header -->
      <div style="text-align:center;margin-bottom:28px">
        <div style="font-size:2.5rem;margin-bottom:10px">📋</div>
        <h1 style="font-size:1.8rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Import Your Class Roster</h1>
        <p style="color:#6b7280;font-size:0.9rem;font-weight:500">Add your students by name. When they sign up with your class code, they'll be automatically checked off.</p>
      </div>

      <!-- Tab switcher -->
      <div style="display:flex;background:#f3f4f6;border-radius:12px;padding:3px;margin-bottom:20px">
        <button id="roster-tab-paste" onclick="document.getElementById('roster-panel-paste').style.display='block';document.getElementById('roster-panel-csv').style.display='none';this.style.background='white';this.style.fontWeight='800';this.style.color='#111';document.getElementById('roster-tab-csv').style.background='transparent';document.getElementById('roster-tab-csv').style.fontWeight='600';document.getElementById('roster-tab-csv').style.color='#6b7280'" style="flex:1;padding:9px;border:none;border-radius:10px;background:white;font-weight:800;font-size:0.85rem;cursor:pointer;font-family:inherit;color:#111;box-shadow:0 1px 4px rgba(0,0,0,0.08)">📝 Paste Names</button>
        <button id="roster-tab-csv" onclick="document.getElementById('roster-panel-csv').style.display='block';document.getElementById('roster-panel-paste').style.display='none';this.style.background='white';this.style.fontWeight='800';this.style.color='#111';document.getElementById('roster-tab-paste').style.background='transparent';document.getElementById('roster-tab-paste').style.fontWeight='600';document.getElementById('roster-tab-paste').style.color='#6b7280'" style="flex:1;padding:9px;border:none;border-radius:10px;background:transparent;font-weight:600;font-size:0.85rem;cursor:pointer;font-family:inherit;color:#6b7280">📂 Upload CSV</button>
      </div>

      <!-- Paste panel -->
      <div id="roster-panel-paste">
        <div style="background:white;border-radius:20px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,0.07);margin-bottom:16px">
          <label style="display:block;font-size:0.85rem;font-weight:800;color:#374151;margin-bottom:8px">One name per line:</label>
          <textarea id="roster-input" placeholder="e.g.
Alex Johnson
Maria Garcia
Noah Williams
Sofia Ramirez
Ethan Brown" oninput="App._previewRoster(this.value)" style="width:100%;height:200px;padding:14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.9rem;font-family:inherit;box-sizing:border-box;resize:vertical;outline:none;line-height:1.6" onfocus="this.style.borderColor='#059669'" onblur="this.style.borderColor='#e5e7eb'"></textarea>
          <div id="roster-preview" style="margin-top:12px;min-height:24px"></div>
        </div>
        <form onsubmit="App.importRosterSubmit(event)">
          <button type="submit" style="width:100%;background:#059669;color:white;border:none;border-radius:14px;padding:16px;font-size:1rem;font-weight:900;cursor:pointer;font-family:inherit">Save Roster & Go to Checklist →</button>
        </form>
      </div>

      <!-- CSV panel -->
      <div id="roster-panel-csv" style="display:none">
        <div style="background:white;border-radius:20px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.07);text-align:center">
          <div style="font-size:2rem;margin-bottom:10px">📂</div>
          <p style="color:#374151;font-weight:600;font-size:0.9rem;margin-bottom:6px">Upload a spreadsheet or CSV file</p>
          <p style="color:#6b7280;font-size:0.8rem;margin-bottom:18px">The first column will be read as student names. Works with Google Sheets exports, Excel, or any CSV.</p>
          <label style="background:#059669;color:white;border-radius:12px;padding:12px 24px;font-weight:800;font-size:0.9rem;cursor:pointer;display:inline-block">
            Choose File
            <input type="file" accept=".csv,.xlsx,.txt" onchange="App.handleRosterCSV(this)" style="display:none">
          </label>
          <p style="margin-top:14px;font-size:0.75rem;color:#9ca3af">After upload, names will appear in the Paste tab for review before saving.</p>
        </div>
      </div>

    </div>

`;
};
