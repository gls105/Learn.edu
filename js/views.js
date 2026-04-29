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
    const user = App.getUser();
    const progress = App.getProgress();
    const completedCount = Object.values(progress).filter(v => v.completed).length;

    const SUBJECTS = [
      { key:'math',    icon:'📐', name:'Math',           color:'#E8562A', bg:'linear-gradient(135deg,#E8562A,#fb923c)', link:'subject/math/4',              lessons:26, desc:'Algebra, geometry, fractions, calculus prep' },
      { key:'science', icon:'⚗️', name:'Science',        color:'#059669', bg:'linear-gradient(135deg,#059669,#34d399)', link:'subject/science/earth',       lessons:23, desc:'Earth, Life, Physical & Advanced tracks' },
      { key:'spanish', icon:'🌎', name:'Spanish',        color:'#7c3aed', bg:'linear-gradient(135deg,#7c3aed,#a78bfa)', link:'subject/spanish/beginning',   lessons:25, desc:'Beginning through Advanced, verbs to subjunctive' },
      { key:'ela',     icon:'📖', name:'Language Arts',  color:'#0369a1', bg:'linear-gradient(135deg,#0369a1,#38bdf8)', link:'subject/ela/beginning',       lessons:6,  desc:'Grammar, essays, literary devices & analysis' },
      { key:'history', icon:'🏛️', name:'History',        color:'#b45309', bg:'linear-gradient(135deg,#b45309,#fbbf24)', link:'subject/history/ancient',     lessons:7,  desc:'Ancient civilizations, US & World history' },
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
      history: { icon: '🏻', name: 'History',              data: () => (typeof HISTORY_LESSONS !=='undefined'?HISTORY_LESSONS:[]), leveled: true },
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

    const allLessons = s.data();
    const progress   = App.getProgress();

    let tabs, lessons, emptyMsg, subtitle;

    if (s.leveled) {
      const levelList = subjectKey === 'spanish' ? SPANISH_LEVELS : subjectKey === 'ela' ? ELA_LEVELS : subjectKey === 'history' ? HISTORY_LEVELS : SCIENCE_LEVELS;
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
    };
    const s = META[lesson.subject];
    const back = `subject/${lesson.subject}/${lesson.grade}`;
    const subjectClass = lesson.subject; // math | science | spanish

    return `
      ${this.nav({ hash: back, label: `← ${s.name}` })}
      <div class="lesson-header ${subjectClass}">
        <div class="breadcrumb">${s.icon} ${s.name} &nbsp;·&nbsp; Grade ${lesson.grade}</div>
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
              <button class="btn btn-ghost" style="font-size:0.8rem;padding:8px 14px;background:white">
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
          { id:'name',      label:"What's your name?",                            type:'text',   placeholder:'e.g. Alex' },
          { id:'grade',     label:'What grade are you in?',                        type:'select', options:['Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9'] },
          { id:'schooltype',label:'Are you from a school/district or homeschooled?', type:'select', options:['From a school or district','Homeschooled'] },
          { id:'weak',      label:'Which subject do you find hardest?',            type:'select', options:['Math','Science','Spanish','All about the same'] },
          { id:'goal',      label:'What is your learning goal?',                  type:'select', options:['Improve my grades','Test prep (big exam coming)','Learn for fun','Get ahead'] },
        ],
        teacher: [
          { id:'name',    label:"Your name?",                      type:'text',   placeholder:'e.g. Ms. Rivera' },
          { id:'school',  label:'School name',                     type:'text',   placeholder:'e.g. Lincoln Middle School' },
          { id:'grades',  label:'What grades do you teach?',       type:'select', options:['Grades 4-5','Grades 6-7','Grades 8-9','Mixed'] },
          { id:'subjects',label:'What subjects?',                  type:'select', options:['Math','Science','Spanish','Multiple subjects'] },
        ],
        parent: [
          { id:'schooltype', label:'Is your child in a traditional school or homeschooled?', type:'select', options:['Traditional school (public/private)','Homeschooled','Homeschool co-op / hybrid','Not yet enrolled'] },
          { id:'name',    label:"Your name?",                      type:'text',   placeholder:'e.g. Maria' },
          { id:'child',   label:"Child's name?",                   type:'text',   placeholder:'e.g. Sofia' },
          { id:'grade',   label:"Child's grade or level?",         type:'select', options:['Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Homeschool - Elementary','Homeschool - Middle','Homeschool - High School'] },
          { id:'concern', label:'Which subject are you most focused on?', type:'select', options:['Math','Science','Spanish','All subjects'] },
        ],
        district: [
          { id:'name',    label:"Your name?",                      type:'text',   placeholder:'e.g. Dr. Johnson' },
          { id:'district',label:'District name',                   type:'text',   placeholder:'e.g. Miami-Dade County Schools' },
          { id:'schools', label:'Number of schools in district',   type:'select', options:['1-10','11-50','51-200','200+'] },
          { id:'grades',  label:'Grades covered',                  type:'select', options:['Elementary (K-5)','Middle (6-8)','High (9-12)','All grades'] },
        ],
      };
      const qs = Q[role] || Q.student;
      const roleInfo = roles.find(r => r.id === role) || roles[0];
      return `
        <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><button onclick="App.go('signup')" style="background:none;border:none;font-size:0.82rem;color:var(--muted);cursor:pointer;font-weight:600">← Back</button></nav>
        <div style="max-width:560px;margin:0 auto;padding:48px 24px 80px">
          <div style="text-align:center;margin-bottom:32px">
            <div style="font-size:2rem;margin-bottom:8px">${roleInfo.emoji}</div>
            <h1 style="font-size:1.9rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Tell us about yourself</h1>
            <p style="color:#6b7280;font-size:0.9rem">Signing up as <strong style="color:${roleInfo.color}">${roleInfo.label}</strong></p>
          </div>
          <div style="background:white;border-radius:24px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
            <form onsubmit="App.completeSignup(event,'${role}')" style="display:flex;flex-direction:column;gap:20px">
              ${qs.map((q, i) => `
                <div>
                  <label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:8px;color:#374151">${q.label}</label>
                  ${q.type === 'select'
                    ? `<select name="${q.id}" required style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;font-weight:600;cursor:pointer;appearance:none;background:white url('data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\' stroke-width=\'2\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'m6 9 6 6 6-6\'></path></svg>') no-repeat right 12px center/18px">${q.options.map(o => `<option>${o}</option>`).join('')}</select>`
                    : `<input name="${q.id}" type="text" placeholder="${q.placeholder||''}" required style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='${roleInfo.color}'" onblur="this.style.borderColor='#e5e7eb'">`
                  }
                </div>`).join('')}
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
    const quickRoles = [
      { id:'student',  emoji:'\uD83C\uDF92', label:'Student',  color:'#E8562A' },
      { id:'teacher',  emoji:'\uD83D\uDCCB', label:'Teacher',  color:'#059669' },
      { id:'parent',   emoji:'\uD83C\uDFE0', label:'Parent',   color:'#0369a1' },
      { id:'district', emoji:'\uD83C\uDFEB', label:'District', color:'#7c3aed' },
    ];
    return `
      <nav class="nav"><a class="nav-logo" href="#home">${this._logoSVG()}</a><a href="#signup" style="font-size:0.82rem;font-weight:600;color:var(--muted);text-decoration:none">New here? Sign up free</a></nav>
      <div style="max-width:480px;margin:0 auto;padding:56px 24px 80px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:2rem;margin-bottom:10px">👋</div>
          <h1 style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:6px">Welcome back!</h1>
          <p style="color:#6b7280;font-size:0.9rem;font-weight:500">Log into your Learn.edu account</p>
        </div>

        ${saved ? `
          <!-- Quick re-login for returning user -->
          <div style="background:#f0fdf4;border:2px solid #059669;border-radius:20px;padding:20px 22px;margin-bottom:20px;cursor:pointer" onclick="App.loginAsDemo('${saved.role}')">
            <div style="font-size:0.75rem;font-weight:800;color:#059669;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">✔ Saved Session</div>
            <div style="font-weight:900;font-size:1.05rem;margin-bottom:2px">${saved.name || 'User'}</div>
            <div style="font-size:0.82rem;color:#6b7280">${saved.role.charAt(0).toUpperCase()+saved.role.slice(1)} · Tap to continue →</div>
          </div>
          <div style="text-align:center;color:#9ca3af;font-size:0.82rem;margin-bottom:16px;font-weight:600">―― or log in as someone else ――</div>` : ''}

        <div style="background:white;border-radius:24px;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.08);margin-bottom:20px">
          <form onsubmit="App.loginSubmit(event)" style="display:flex;flex-direction:column;gap:16px">
            <div>
              <label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:7px;color:#374151">Email</label>
              <input name="email" type="email" placeholder="your@email.com" required style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='#E8562A'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            <div>
              <label style="display:block;font-size:0.88rem;font-weight:800;margin-bottom:7px;color:#374151">Password</label>
              <input name="password" type="password" placeholder="••••••••" required style="width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:0.95rem;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='#E8562A'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            <button type="submit" style="background:#111;color:white;border:none;border-radius:14px;padding:16px;font-size:1rem;font-weight:900;cursor:pointer">Log In</button>
          </form>
        </div>

        <p style="text-align:center;font-size:0.82rem;color:#9ca3af;font-weight:600;margin-bottom:16px">Or jump in as a demo user</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${quickRoles.map(r => `
            <button onclick="App.loginAsDemo('${r.id}')" style="background:white;border:2px solid #e5e7eb;border-radius:14px;padding:14px 10px;cursor:pointer;font-family:inherit;font-weight:700;font-size:0.85rem;display:flex;align-items:center;gap:8px;transition:all 0.12s" onmouseover="this.style.borderColor='${r.color}'" onmouseout="this.style.borderColor='#e5e7eb'">
              <span style="font-size:1.3rem">${r.emoji}</span> ${r.label}
            </button>`).join('')}
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
        cta: 'Get Notified',
        ctaAction: "alert('Coming soon! We will notify you when Learn Light launches.')",
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
        cta: 'Get Notified',
        ctaAction: "alert('Coming soon! We will notify you when Learn Pro launches.')",
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
        cta: 'Contact Us',
        ctaAction: "alert('Contact us at hello@learn.edu for district pricing.')",
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
          <div style="display:inline-block;background:#fef3c7;border:1.5px solid #fcd34d;border-radius:999px;padding:6px 16px;font-size:0.8rem;font-weight:800;color:#92400e;margin-top:8px">⚡ Paid plans launching soon — be the first to know</div>
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
    html = `<div style="padding:40px;text-align:center;color:#999">Quiz, Practice, and Test Prep modes are coming soon!</div>`;
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

    // Tier letter
    const tier = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 55 ? 'D' : 'F';
    const tierColor = tier==='A'?'#059669':tier==='B'?'#0369a1':tier==='C'?'#d97706':tier==='D'?'#dc2626':'#7f1d1d';
    const tierBg    = tier==='A'?'#dcfce7':tier==='B'?'#dbeafe':tier==='C'?'#fef3c7':tier==='D'?'#fee2e2':'#fca5a5';
    const tierLabel = tier==='A'?'Excellent':tier==='B'?'Good':tier==='C'?'Developing':tier==='D'?'Needs Work':'Below Level';

    // Level description vs user grade
    const vsGrade = gradeDelta >= 2 ? 'Significantly above grade level'
                  : gradeDelta === 1 ? 'Above grade level'
                  : gradeDelta === 0 ? 'On grade level'
                  : gradeDelta === -1 ? 'Approaching grade level'
                  : 'Below grade level';
    const vsColor = gradeDelta >= 1 ? '#059669' : gradeDelta === 0 ? '#0369a1' : '#dc2626';

    // Spark score code
    const sparkCode = `${gradeLevel}-${tier}-${pct}`;

    // Behavior tags
    const isRushed = secsPerQ < 5;
    const isImproved = pct >= 80 && secsPerQ >= 5;
    const tags = [];
    if (pct >= 90) tags.push({label:'Outstanding',    c:'#166534', bg:'#dcfce7'});
    if (isRushed)  tags.push({label:'Rushed — slow down', c:'#92400e', bg:'#fef3c7'});
    if (pct < 50)  tags.push({label:'Review Needed',  c:'#7c3aed', bg:'#ede9fe'});
    if (isImproved)tags.push({label:'Strong Performance', c:'#0369a1', bg:'#dbeafe'});

    // Subject breakdown
    const byS = state.bySubj || {};
    const subjects = [
      {label:'Math',    key:'math',    icon:'📐', color:'#E8562A'},
      {label:'Science', key:'science', icon:'⚗️', color:'#059669'},
      {label:'Spanish', key:'spanish', icon:'🌎', color:'#7c3aed'},
    ].map(s => {
      const d = byS[s.key] || {right:0,total:0};
      const sp = d.total ? Math.round(d.right/d.total*100) : 0;
      const st = sp>=90?'A':sp>=80?'B':sp>=70?'C':sp>=55?'D':'F';
      return {...s, right:d.right, total:d.total, sp, st};
    }).filter(s => s.total > 0);

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
              <div style="font-size:2rem;font-weight:900;color:${tierColor};background:${tierBg};border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin:0 auto;line-height:1">${tier}</div>
              <div style="font-size:0.6rem;font-weight:800;color:#6b7280;text-transform:uppercase;margin-top:4px">Tier</div>
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
              <span style="font-family:monospace;font-size:0.85rem;font-weight:800;color:#111">${gradeLevel}-${s.st}-${s.sp}%</span>
              <div style="width:60px;height:6px;background:#f3f4f6;border-radius:999px;overflow:hidden"><div style="height:100%;width:${s.sp}%;background:${s.color};border-radius:999px"></div></div>
            </div>`).join('')}
        </div>` : ''}

        <!-- Tags -->
        ${tags.length ? `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-bottom:16px">${tags.map(t=>`<span style="background:${t.bg};color:${t.c};padding:5px 14px;border-radius:999px;font-size:0.78rem;font-weight:800">${t.label}</span>`).join('')}</div>` : ''}

        <!-- What the code means -->
        <div style="background:#f9fafb;border-radius:12px;padding:12px 16px;text-align:left;margin-bottom:20px">
          <div style="font-size:0.7rem;font-weight:800;color:#9ca3af;text-transform:uppercase;margin-bottom:6px">How to read your score</div>
          <div style="font-size:0.82rem;color:#374151;font-weight:500;line-height:1.5">
            <strong style="color:#E8562A">${gradeLevel}</strong> = performing at Grade ${gradeLevel} level &nbsp;·&nbsp;
            <strong style="color:${tierColor}">${tier}</strong> = ${tierLabel} &nbsp;·&nbsp;
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
    if (isRight) state.bySubj[q.subj].right++;
    _origAnswer(picked);
  }

  return { init, answer: answerTracked, next };
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
  const progress = (() => { try { return JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); } catch { return {}; } })();
  const allLessons = [
    {id:'math-4-multiplication', title:'Multiplication', subj:'math', grade:4, code:'4-MU-1A'},
    {id:'math-4-long-division',  title:'Long Division',  subj:'math', grade:4, code:'4-LD-1A'},
    {id:'math-5-fractions',      title:'Fractions',      subj:'math', grade:5, code:'5-FR-1A'},
    {id:'math-5-decimals',       title:'Decimals',       subj:'math', grade:5, code:'5-DE-1A'},
    {id:'math-6-ratios',         title:'Ratios',         subj:'math', grade:6, code:'6-RA-1A'},
    {id:'science-4-ecosystems',  title:'Ecosystems',     subj:'science', grade:4, code:'4-EC-1A'},
    {id:'science-5-cells',       title:'Cell Biology',   subj:'science', grade:5, code:'5-CE-1A'},
    {id:'spanish-4-greetings',   title:'Greetings',      subj:'spanish', grade:4, code:'4-GR-1A'},
    {id:'spanish-4-numbers',     title:'Numbers 1–20',   subj:'spanish', grade:4, code:'4-NU-1A'},
  ];
  const done = allLessons.filter(l => progress[l.id]?.completed);
  const pending = allLessons.filter(l => !progress[l.id]?.completed);
  const avgScore = done.length ? Math.round(done.reduce((s,l) => s + (progress[l.id]?.score||0), 0) / done.length) : 0;
  const mathDone  = done.filter(l=>l.subj==='math').length;
  const sciDone   = done.filter(l=>l.subj==='science').length;
  const spaDone   = done.filter(l=>l.subj==='spanish').length;
  const xp = done.length * 50 + (avgScore >= 80 ? done.length * 20 : 0);
  const level = xp >= 400 ? 'Master 🏆' : xp >= 200 ? 'Scholar 📚' : xp >= 100 ? 'Explorer 🔭' : 'Beginner 🌱';
  const levelColor = xp >= 400 ? '#E8562A' : xp >= 200 ? '#7c3aed' : xp >= 100 ? '#0369a1' : '#059669';
  const sColor = s => ({math:'var(--math)',science:'var(--sci)',spanish:'var(--spa)'})[s]||'#888';

  const recentHtml = done.slice(-4).reverse().map(l => {
    const sc = progress[l.id]?.score||0;
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f3f4f6">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="lesson-code" style="font-size:0.68rem">${l.code}</span>
        <span style="font-weight:700;font-size:0.9rem">${l.title}</span>
      </div>
      <span style="font-weight:800;font-size:0.9rem;color:${sc>=80?'#059669':sc>=60?'#d97706':'#dc2626'}">${sc}%</span>
    </div>`;
  }).join('') || '<p style="color:#9ca3af;font-size:0.9rem;text-align:center;padding:16px 0">No lessons completed yet. Start one!</p>';

  const nextLesson = pending[0];

  return `
    ${_dashNav('student','Student','🎒')}
    <div class="zen-bg" style="min-height:100vh">
      <div class="zen-blob zen-blob-1"></div><div class="zen-blob zen-blob-2"></div><div class="zen-blob zen-blob-3"></div>
      <div style="position:relative;z-index:1;max-width:800px;margin:0 auto;padding:36px 20px 80px">

        <!-- Header -->
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px">
          <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#E8562A,#f97316);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:900;color:white;flex-shrink:0">S</div>
          <div>
            <h1 style="font-size:1.6rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:2px">My Dashboard</h1>
            <span style="font-size:0.82rem;font-weight:700;color:${levelColor};background:${levelColor}18;padding:3px 10px;border-radius:999px">${level}</span>
          </div>
          <div style="margin-left:auto;text-align:right">
            <div style="font-size:1.6rem;font-weight:900;color:#E8562A">${xp}</div>
            <div style="font-size:0.72rem;font-weight:600;color:#9ca3af">XP EARNED</div>
          </div>
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
          ${_statCard('✅', done.length, 'Lessons Done', '#059669')}
          ${_statCard('📊', (avgScore||'—')+(avgScore?'%':''), 'Avg Score', '#E8562A')}
          ${_statCard('⚡', Math.min(done.length,9), 'Day Streak', '#d97706')}
          ${_statCard('📚', allLessons.length - done.length, 'To Go', '#7c3aed')}
        </div>

        <!-- Subject progress -->
        <div style="background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);border-radius:20px;padding:24px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
          <h2 style="font-size:1rem;font-weight:900;margin-bottom:16px">Subject Progress</h2>
          ${[
            {label:'📐 Math',    done:mathDone, total:5, color:'var(--math)'},
            {label:'⚗️ Science', done:sciDone,  total:2, color:'var(--sci)'},
            {label:'🌎 Spanish', done:spaDone,  total:2, color:'var(--spa)'},
          ].map(s => `
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:0.88rem;font-weight:700">${s.label}</span>
                <span style="font-size:0.82rem;font-weight:700;color:#6b7280">${s.done}/${s.total} lessons</span>
              </div>
              <div style="display:flex;align-items:center;gap:10px">${_bar(s.done/s.total*100, s.color)}</div>
            </div>`).join('')}
        </div>

        <!-- Recent activity -->
        <div style="background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);border-radius:20px;padding:24px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
          <h2 style="font-size:1rem;font-weight:900;margin-bottom:4px">Recent Activity</h2>
          ${recentHtml}
        </div>

        <!-- Next lesson CTA -->
        ${nextLesson ? `
        <div style="background:linear-gradient(135deg,#E8562A,#f97316);border-radius:20px;padding:24px;color:white;cursor:pointer" onclick="App.go('lesson/${nextLesson.id}')">
          <div style="font-size:0.78rem;font-weight:700;opacity:0.8;margin-bottom:6px">⚡ UP NEXT</div>
          <div style="font-size:1.2rem;font-weight:900;letter-spacing:-0.3px;margin-bottom:4px">${nextLesson.title}</div>
          <div style="font-size:0.82rem;opacity:0.85">${nextLesson.code} · Grade ${nextLesson.grade} · Tap to start →</div>
        </div>` : `<div style="background:linear-gradient(135deg,#059669,#10b981);border-radius:20px;padding:24px;color:white;text-align:center">
          <div style="font-size:1.5rem;margin-bottom:8px">🎉</div>
          <div style="font-size:1.1rem;font-weight:900">All lessons complete!</div>
          <div style="font-size:0.85rem;opacity:0.85;margin-top:4px">Try Spark to test your knowledge</div>
        </div>`}

        <!-- Spark CTA -->
        <div onclick="App.go('spark/play')" style="margin-top:14px;background:white;border:2px solid #111;border-radius:20px;padding:18px 24px;cursor:pointer;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:0.88rem;font-weight:900">⚡ Take Spark Assessment</div>
            <div style="font-size:0.78rem;color:#6b7280;font-weight:500">60 questions · Math, Science & Spanish</div>
          </div>
          <i class="ph-bold ph-arrow-right" style="font-size:18px;color:#E8562A"></i>
        </div>
      </div>
    </div>`;
};

// ── Teacher Dashboard ─────────────────────────────────────────

// ── Teacher Dashboard ──────────────────────────────────────────────────

// ── Teacher Dashboard (LiteracyPlanet-inspired, Learn.edu themed) ──────────

// ── Teacher Dashboard ──────────────────────────────────────────────────────
Views.dashboardTeacher = function(tab) {
  tab = tab || 'dashboard';

  const PERIODS = [
    {
      id:'p1', name:'Period 1', grade:'Grade 6', code:'LRN-4829', color:'#E8562A',
      students:[
        {name:'Ava Martinez',   score:92, done:8,  last:'Today',      status:'on-track'},
        {name:'Noah Williams',  score:58, done:3,  last:'3 days ago', status:'struggling'},
        {name:'Sophia Chen',    score:87, done:7,  last:'Yesterday',  status:'on-track'},
        {name:'Liam Johnson',   score:74, done:5,  last:'Today',      status:'on-track'},
        {name:'Emma Davis',     score:61, done:4,  last:'5 days ago', status:'at-risk'},
        {name:'Oliver Brown',   score:95, done:9,  last:'Today',      status:'on-track'},
        {name:'Mia Wilson',     score:83, done:6,  last:'Yesterday',  status:'on-track'},
        {name:'Ethan Taylor',   score:69, done:4,  last:'2 days ago', status:'at-risk'},
      ]
    },
    {
      id:'p3', name:'Period 3', grade:'Grade 7', code:'LRN-7193', color:'#059669',
      students:[
        {name:'Isabella Moore', score:78, done:6,  last:'Today',      status:'on-track'},
        {name:'Lucas Anderson', score:91, done:8,  last:'Today',      status:'on-track'},
        {name:'Amelia Jackson', score:55, done:2,  last:'1 week ago', status:'struggling'},
        {name:'Mason White',    score:82, done:7,  last:'Yesterday',  status:'on-track'},
        {name:'Harper Harris',  score:67, done:4,  last:'3 days ago', status:'at-risk'},
        {name:'Logan Martin',   score:88, done:7,  last:'Today',      status:'on-track'},
        {name:'Ella Thompson',  score:73, done:5,  last:'2 days ago', status:'on-track'},
      ]
    },
    {
      id:'p5', name:'Period 5', grade:'Grade 8', code:'LRN-2847', color:'#7c3aed',
      students:[
        {name:'Aiden Garcia',   score:85, done:7,  last:'Today',      status:'on-track'},
        {name:'Luna Rodriguez', score:48, done:2,  last:'1 week ago', status:'struggling'},
        {name:'Jackson Lee',    score:90, done:8,  last:'Yesterday',  status:'on-track'},
        {name:'Lily Walker',    score:76, done:5,  last:'Today',      status:'on-track'},
        {name:'Sebastian Hall', score:63, done:4,  last:'4 days ago', status:'at-risk'},
        {name:'Camila Young',   score:88, done:7,  last:'Today',      status:'on-track'},
      ]
    },
  ];

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
  const user = (typeof App !== 'undefined') ? App.getUser() : {};
  const teacherName = (user && user.name) ? user.name : 'Teacher';
  const firstName   = teacherName.split(' ').pop();

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
    <div style="background:white;border-bottom:2px solid #e5e7eb">
      <div style="max-width:1280px;margin:0 auto;padding:0 28px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0 10px">
          <div>
            <div style="font-size:0.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em">Learn.edu Teacher Portal</div>
            <h1 style="font-size:1.5rem;font-weight:900;color:#111;letter-spacing:-0.5px;margin-top:1px">Welcome, ${firstName}</h1>
          </div>
          <div style="display:flex;gap:7px;align-items:center">
            <button onclick="App.go('dashboard/teacher/spark')" style="display:flex;align-items:center;gap:5px;background:#7c3aed;color:white;border:none;border-radius:9px;padding:8px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">⚡ Spark Requests</button>
            <button onclick="App.go('assign')" style="display:flex;align-items:center;gap:5px;background:#E8562A;color:white;border:none;border-radius:9px;padding:8px 14px;font-weight:800;font-size:0.8rem;cursor:pointer;font-family:inherit">+ Assign Lesson</button>
            <button onclick="App.go('subject/math/4')" style="background:#f3f4f6;color:#374151;border:none;border-radius:9px;padding:8px 12px;font-weight:700;font-size:0.8rem;cursor:pointer;font-family:inherit">👁️ Preview</button>
            <button onclick="App.logout()" style="background:none;border:1.5px solid #e5e7eb;color:#6b7280;border-radius:9px;padding:7px 12px;font-size:0.76rem;font-weight:700;cursor:pointer;font-family:inherit">Sign Out</button>
          </div>
        </div>
        <div style="display:flex;gap:0;border-top:1px solid #f3f4f6">
          ${[
            {id:'dashboard',   label:'Dashboard'},
            {id:'classes',     label:'My Classes'},
            {id:'students',    label:'My Students'},
            {id:'assignments', label:'Assignments'},
            {id:'spark',       label:'⚡ Spark'},
            {id:'struggling',  label:'🚨 Needs Attention', badge: struggling.length},
          ].map(t => `
            <button onclick="App.go('dashboard/teacher/${t.id}')" style="padding:9px 16px;border:none;border-bottom:3px solid ${t.id===tab?'#E8562A':'transparent'};background:none;font-weight:${t.id===tab?'800':'600'};font-size:0.82rem;color:${t.id===tab?'#E8562A':'#6b7280'};cursor:pointer;font-family:inherit;white-space:nowrap;display:inline-flex;align-items:center;gap:4px">
              ${t.label}${t.badge?`<span style="background:#dc2626;color:white;font-size:0.62rem;font-weight:900;padding:2px 6px;border-radius:999px">${t.badge}</span>`:''}
            </button>`).join('')}
        </div>
      </div>
    </div>`;

  const wrap = content => `<div style="max-width:1280px;margin:0 auto;padding:24px 28px">${content}</div>`;

  // ── DASHBOARD TAB ──
  const leaderboard = [...allStudents].sort((a,b)=>b.score-a.score).slice(0,5);
  const dashTab = wrap(`
    <div style="display:grid;grid-template-columns:1fr 280px;gap:20px;align-items:start">
      <div>
        <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;overflow:hidden;margin-bottom:18px">
          <div style="background:#E8562A;color:white;padding:12px 18px"><h3 style="font-size:0.9rem;font-weight:900">Weekly Activity</h3></div>
          <div style="padding:12px 18px;display:flex;gap:10px;border-bottom:1px solid #f3f4f6">
            <select style="padding:6px 10px;border:1.5px solid #e5e7eb;border-radius:7px;font-family:inherit;font-size:0.8rem;font-weight:600">
              <option>All Periods</option>${PERIODS.map(p=>`<option>${p.name}</option>`).join('')}
            </select>
            <select style="padding:6px 10px;border:1.5px solid #e5e7eb;border-radius:7px;font-family:inherit;font-size:0.8rem;font-weight:600">
              <option>This week (Apr 28)</option><option>Last week</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);padding:16px 18px;gap:10px">
            ${[{n:'27',label:'Lessons completed'},{n:'79%',label:'Average score'},{n:'18',label:'Active students'}].map(s=>`
              <div style="text-align:center;padding:14px 8px;background:#f9fafb;border-radius:10px">
                <div style="font-size:2rem;font-weight:900;color:#111;letter-spacing:-1px">${s.n}</div>
                <div style="font-size:0.74rem;color:#6b7280;margin-top:3px">${s.label}</div>
              </div>`).join('')}
          </div>
        </div>
        <h2 style="font-size:0.88rem;font-weight:900;color:#374151;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.05em">Teaching</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px">
          ${actionCard('#E8562A','📋','Quick Assign →','Pick a lesson, set a due date, assign to your periods.','assign')}
          ${actionCard('#7c3aed','⚡','Request Spark →','Submit a Spark assessment request to your admin.','dashboard/teacher/spark')}
          ${actionCard('#059669','📊','Assignment Report →','Track who has and hasn\'t completed their work.','dashboard/teacher/assignments')}
          ${actionCard('#0369a1','📚','Browse Resources →','Flashcards, quiz mode, test prep and more.','study')}
        </div>
        <h2 style="font-size:0.88rem;font-weight:900;color:#374151;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.05em">Manage</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${actionCard('#7c3aed','👥','Manage Students →','View individual student activity and scores.','dashboard/teacher/students')}
          ${actionCard('#E8562A','🏫','Manage Classes →','Add periods, share join codes, import students.','dashboard/teacher/classes')}
          ${actionCard('#059669','👁️','Student Preview →','See what your students see on their screen.','subject/math/4')}
          ${actionCard('#d97706','📝','PM1 Results →','View Progress Monitoring 1 benchmark results.','dashboard/admin/pm1')}
        </div>
      </div>
      <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;overflow:hidden;position:sticky;top:20px">
        <div style="background:#111827;color:white;padding:11px 16px"><h3 style="font-size:0.85rem;font-weight:900">🏆 Leaderboard</h3></div>
        ${leaderboard.map((s,i)=>`
          <div style="display:flex;align-items:center;gap:9px;padding:9px 14px;border-bottom:1px solid #f9fafb">
            <span style="font-size:0.88rem;font-weight:900;color:${i===0?'#d97706':i===1?'#9ca3af':i===2?'#b45309':'#6b7280'};width:16px">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</span>
            <div style="flex:1;min-width:0">
              <div style="font-weight:800;font-size:0.8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.name}</div>
              <div style="font-size:0.68rem;color:#9ca3af">${s.period}</div>
            </div>
            <span style="font-weight:900;font-size:0.85rem;color:${s.score>=80?'#059669':s.score>=65?'#d97706':'#dc2626'}">${s.score}%</span>
          </div>`).join('')}
        <div style="padding:9px 14px;text-align:center">
          <button onclick="App.go('dashboard/teacher/students')" style="background:none;border:none;font-size:0.73rem;font-weight:700;color:#E8562A;cursor:pointer">View all students →</button>
        </div>
      </div>
    </div>`);

  // ── SPARK TAB — teacher requests, admin activates ──
  const sparkRequests = JSON.parse(localStorage.getItem('learnedu-spark-requests') || '[]');
  const sparkTab = wrap(`
    <div style="max-width:700px">
      <div style="background:#f5f3ff;border:1.5px solid #ddd6fe;border-radius:14px;padding:14px 18px;margin-bottom:18px;display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:1.3rem">ℹ️</span>
        <p style="font-size:0.84rem;color:#374151;font-weight:600;line-height:1.5;margin:0">Spark assessments are <strong>activated by your Admin</strong> using the district code. You can submit a request here and your admin will open it for your class.</p>
      </div>
      <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;padding:20px;margin-bottom:18px">
        <h3 style="font-size:0.95rem;font-weight:900;margin-bottom:16px">⚡ Request a Spark Assessment</h3>
        <form onsubmit="App.submitSparkRequest(event)" style="display:flex;flex-direction:column;gap:14px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="display:block;font-size:0.8rem;font-weight:800;margin-bottom:6px">Subject</label>
              <select name="subject" style="width:100%;padding:9px 12px;border:1.5px solid #e5e7eb;border-radius:9px;font-family:inherit;font-weight:600;font-size:0.85rem">
                <option>Math</option><option>Science</option><option>Spanish</option><option>All Subjects</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:0.8rem;font-weight:800;margin-bottom:6px">Period(s)</label>
              <select name="period" style="width:100%;padding:9px 12px;border:1.5px solid #e5e7eb;border-radius:9px;font-family:inherit;font-weight:600;font-size:0.85rem">
                <option>All Periods</option>${PERIODS.map(p=>`<option>${p.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="display:block;font-size:0.8rem;font-weight:800;margin-bottom:6px">Requested Date</label>
              <input name="date" type="date" style="width:100%;padding:9px 12px;border:1.5px solid #e5e7eb;border-radius:9px;font-family:inherit;font-size:0.85rem;box-sizing:border-box">
            </div>
            <div>
              <label style="display:block;font-size:0.8rem;font-weight:800;margin-bottom:6px">Assessment Type</label>
              <select name="type" style="width:100%;padding:9px 12px;border:1.5px solid #e5e7eb;border-radius:9px;font-family:inherit;font-weight:600;font-size:0.85rem">
                <option>PM Checkpoint</option><option>Unit Review</option><option>End of Year Prep</option><option>Quick Check-In</option>
              </select>
            </div>
          </div>
          <div>
            <label style="display:block;font-size:0.8rem;font-weight:800;margin-bottom:6px">Note to Admin (optional)</label>
            <textarea name="note" placeholder="e.g. Period 3 just finished the ratios unit — good time for a math check" style="width:100%;padding:9px 12px;border:1.5px solid #e5e7eb;border-radius:9px;font-family:inherit;font-size:0.85rem;box-sizing:border-box;height:72px;resize:none"></textarea>
          </div>
          <button type="submit" style="background:#7c3aed;color:white;border:none;border-radius:10px;padding:12px;font-weight:900;font-size:0.88rem;cursor:pointer;font-family:inherit">Submit Request to Admin</button>
        </form>
      </div>
      ${sparkRequests.length ? `
        <div style="background:white;border-radius:14px;border:1.5px solid #e5e7eb;padding:18px">
          <h3 style="font-size:0.9rem;font-weight:900;margin-bottom:12px">Your Requests</h3>
          ${sparkRequests.map(r=>`
            <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f3f4f6">
              <div style="flex:1">
                <div style="font-weight:800;font-size:0.85rem">${r.subject} · ${r.period}</div>
                <div style="font-size:0.72rem;color:#9ca3af">${r.type} · Requested for ${r.date||'TBD'}</div>
              </div>
              <span style="background:${r.status==='Approved'?'#dcfce7':r.status==='Denied'?'#fee2e2':'#fef3c7'};color:${r.status==='Approved'?'#059669':r.status==='Denied'?'#dc2626':'#d97706'};padding:3px 10px;border-radius:999px;font-size:0.7rem;font-weight:800">${r.status||'Pending'}</span>
            </div>`).join('')}
        </div>` : ''}
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
      <button onclick="alert('Add Period — coming soon!')" style="background:#E8562A;color:white;border:none;border-radius:9px;padding:8px 16px;font-weight:800;font-size:0.82rem;cursor:pointer;font-family:inherit">+ New Period</button>
    </div>
    ${PERIODS.map(p=>{
      const avg=Math.round(p.students.reduce((s,st)=>s+st.score,0)/p.students.length);
      return `<div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;overflow:hidden;margin-bottom:12px">
        <div style="background:${p.color};color:white;padding:11px 16px;display:flex;align-items:center;justify-content:space-between">
          <div><span style="font-weight:900;font-size:0.9rem">${p.name}</span><span style="opacity:0.8;font-size:0.74rem;margin-left:8px">${p.grade} · ${p.students.length} students · Avg ${avg}%</span></div>
          <code style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:5px;font-size:0.78rem;font-weight:800">${p.code}</code>
        </div>
        <div class="ds-table-wrap">
          <table class="ds-table">
            <thead><tr><th>Student</th><th>Score</th><th>Lessons</th><th>Last Active</th><th>Status</th></tr></thead>
            <tbody>${p.students.map(s=>{
              const sc=s.status==='struggling'?'#fee2e2':s.status==='at-risk'?'#fef3c7':'#dcfce7';
              const tc=s.status==='struggling'?'#dc2626':s.status==='at-risk'?'#d97706':'#059669';
              const lb=s.status==='struggling'?'Struggling':s.status==='at-risk'?'At Risk':'On Track';
              return `<tr class="ds-row"><td style="font-weight:700">${s.name}</td><td style="font-weight:900;color:${s.score>=80?'#059669':s.score>=65?'#d97706':'#dc2626'}">${s.score}%</td><td style="text-align:center">${s.done}</td><td style="color:#6b7280;font-size:0.78rem">${s.last}</td><td><span style="background:${sc};color:${tc};padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800">${lb}</span></td></tr>`;
            }).join('')}</tbody>
          </table>
        </div>
        <div style="padding:8px 12px;display:flex;gap:7px;border-top:1px solid #f3f4f6">
          <button onclick="alert('Manual add — coming soon!')" style="background:#f3f4f6;border:none;border-radius:7px;padding:5px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:inherit">+ Add Student</button>
          <label style="cursor:pointer"><span style="background:#f3f4f6;border-radius:7px;padding:5px 10px;font-size:0.72rem;font-weight:700;display:inline-block">📊 CSV Import</span><input type="file" accept=".csv" style="display:none" onchange="App.importCSV(this,'${p.id}')"></label>
          <button onclick="App.go('assign')" style="background:#E8562A18;color:#E8562A;border:1.5px solid #E8562A;border-radius:7px;padding:5px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:inherit">📋 Assign Lesson</button>
        </div>
      </div>`;
    }).join('')}`);

  // ── STUDENTS TAB ──
  const studentsTab = wrap(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <h2 style="font-size:1.1rem;font-weight:900">All Students (${allStudents.length})</h2>
    </div>
    <div style="background:white;border-radius:12px;border:1.5px solid #e5e7eb;overflow:hidden">
      <div class="ds-table-wrap">
        <table class="ds-table">
          <thead><tr><th>Name</th><th>Period</th><th>Score</th><th>Lessons</th><th>Last Active</th><th>Status</th></tr></thead>
          <tbody>${allStudents.map(s=>{
            const sc=s.status==='struggling'?'#fee2e2':s.status==='at-risk'?'#fef3c7':'#dcfce7';
            const tc=s.status==='struggling'?'#dc2626':s.status==='at-risk'?'#d97706':'#059669';
            const lb=s.status==='struggling'?'Struggling':s.status==='at-risk'?'At Risk':'On Track';
            return `<tr class="ds-row"><td style="font-weight:700">${s.name}</td><td><span style="background:${s.periodColor}18;color:${s.periodColor};padding:2px 6px;border-radius:4px;font-size:0.7rem;font-weight:800">${s.period}</span></td><td style="font-weight:900;color:${s.score>=80?'#059669':s.score>=65?'#d97706':'#dc2626'}">${s.score}%</td><td style="text-align:center">${s.done}</td><td style="color:#6b7280;font-size:0.78rem">${s.last}</td><td><span style="background:${sc};color:${tc};padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800">${lb}</span></td></tr>`;
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
        <button onclick="alert('Message feature coming soon!')" style="background:${isS?'#dc2626':'#d97706'};color:white;border:none;border-radius:8px;padding:6px 12px;font-size:0.73rem;font-weight:800;cursor:pointer;font-family:inherit">Message</button>
      </div>`;
    }).join('')}`);

  const bodyMap = {dashboard:dashTab, classes:classesTab, students:studentsTab, assignments:assignmentsTab, spark:sparkTab, struggling:strugglingTab};

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
  const sColor = s => ({math:'var(--math)',science:'var(--sci)',spanish:'var(--spa)'})[s]||'#888';
  const sBg    = s => ({math:'var(--math-bg)',science:'var(--sci-bg)',spanish:'var(--spa-bg)'})[s]||'#f5f5f5';
  const lessons = [
    {title:'Multiplication', subj:'math',    plays:142, rating:94,  id:'math-4-multiplication',  status:'live'},
    {title:'Fractions',      subj:'math',    plays:118, rating:87,  id:'math-5-fractions-intro', status:'live'},
    {title:'Ecosystems',     subj:'science', plays:103, rating:91,  id:'sci-4-ecosystems',       status:'live'},
    {title:'Cell Biology',   subj:'science', plays:97,  rating:85,  id:'sci-5-cells',            status:'live'},
    {title:'Greetings',      subj:'spanish', plays:134, rating:96,  id:'spa-4-greetings',        status:'live'},
    {title:'Numbers 1-20',   subj:'spanish', plays:88,  rating:89,  id:'spa-4-numbers',          status:'live'},
    {title:'Long Division',  subj:'math',    plays:76,  rating:82,  id:'math-4-long-division',   status:'live'},
    {title:'Decimals',       subj:'math',    plays:65,  rating:88,  id:'math-5-decimals-intro',  status:'live'},
    {title:'Ratios',         subj:'math',    plays:54,  rating:79,  id:'math-6-ratios',          status:'live'},
    {title:'Geometry',       subj:'math',    plays:38,  rating:90,  id:'math-4-geometry',        status:'live'},
    {title:'Percentages',    subj:'math',    plays:29,  rating:85,  id:'math-5-percentages',     status:'live'},
    {title:'Integers',       subj:'math',    plays:21,  rating:88,  id:'math-6-integers',        status:'live'},
    {title:'Algebra Intro',  subj:'math',    plays:18,  rating:86,  id:'math-7-algebra-intro',   status:'live'},
    {title:'Linear Equations',subj:'math',   plays:14,  rating:84,  id:'math-8-linear-equations',status:'live'},
    {title:'Weather Cycle',  subj:'science', plays:45,  rating:92,  id:'sci-4-weather',          status:'live'},
    {title:'Forces & Motion',subj:'science', plays:33,  rating:87,  id:'sci-5-forces',           status:'live'},
    {title:'Matter & States',subj:'science', plays:26,  rating:89,  id:'sci-6-matter',           status:'live'},
    {title:"Earth's Layers", subj:'science', plays:19,  rating:91,  id:'sci-7-layers',           status:'live'},
    {title:'Family Vocab',   subj:'spanish', plays:41,  rating:93,  id:'spa-4-family',           status:'live'},
    {title:'Food & Dining',  subj:'spanish', plays:36,  rating:91,  id:'spa-5-food',             status:'live'},
    {title:'Colors & Adj.',  subj:'spanish', plays:31,  rating:94,  id:'spa-5-colors',           status:'live'},
    {title:'Action Verbs',   subj:'spanish', plays:24,  rating:88,  id:'spa-6-verbs',            status:'live'},
  ];
  const PM1_CLASSES = [
    { name:'Period 3', grade:'5-6', students:24, mathAvg:78, sciAvg:81, spaAvg:84, improvement:3,  needs:3 },
    { name:'Period 5', grade:'7',   students:22, mathAvg:71, sciAvg:74, spaAvg:69, improvement:-2, needs:5 },
    { name:'Period 7', grade:'8',   students:18, mathAvg:84, sciAvg:79, spaAvg:77, improvement:6,  needs:2 },
  ];
  const ASSESSMENTS = [
    { name:'Spark PM1 - Fall 2026',    status:'closed', date:'Apr 14', classes:3, students:64, avgScore:78,   code:'SPK-PM1-F26' },
    { name:'Spark PM2 - Spring 2026',  status:'open',   date:'Apr 28', classes:2, students:46, avgScore:null, code:'SPK-PM2-S26' },
    { name:'Spark End-of-Year Prep',   status:'draft',  date:'--',     classes:0, students:0,  avgScore:null, code:'SPK-EOY-S26' },
  ];
  const weeks = [42,55,61,78,84,97,112,124,138,143,156,162];
  const maxW = Math.max(...weeks);
  const sparkline = weeks.map((v,i) => `<div style="flex:1;background:#E8562A;border-radius:4px 4px 0 0;height:${Math.round(v/maxW*60)}px;opacity:${0.4+i/weeks.length*0.6}"></div>`).join('');
  const tabsList = [
    {id:'overview',    label:'Overview'},
    {id:'assessments', label:'Assessments'},
    {id:'pm1',         label:'PM1 Results'},
    {id:'lessons',     label:'Lessons'},
    {id:'system',      label:'System'},
  ];
  const tabBar = `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px">${tabsList.map(t =>
    `<button onclick="App.go('dashboard/admin/${t.id}')" style="padding:7px 16px;border-radius:999px;font-family:inherit;font-weight:700;font-size:0.82rem;cursor:pointer;border:1.5px solid ${t.id===tab?'var(--text)':'var(--border)'};background:${t.id===tab?'var(--text)':'transparent'};color:${t.id===tab?'white':'var(--muted)'}">${t.label}</button>`
  ).join('')}</div>`;
  const statusBadge = s => ({
    open:   '<span style="background:#dcfce7;color:#15803d;padding:3px 10px;border-radius:999px;font-size:0.72rem;font-weight:800">OPEN</span>',
    closed: '<span style="background:#f3f4f6;color:#6b7280;padding:3px 10px;border-radius:999px;font-size:0.72rem;font-weight:800">CLOSED</span>',
    draft:  '<span style="background:#fef3c7;color:#d97706;padding:3px 10px;border-radius:999px;font-size:0.72rem;font-weight:800">DRAFT</span>',
  })[s]||'';

  const overviewHtml = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
      ${_statCard('\ud83d\udc65', '64', 'Total Users', '#E8562A')}
      ${_statCard('\u25b6\ufe0f', '1,038', 'Lesson Plays', '#059669')}
      ${_statCard('\u26a1', '248', 'Spark Runs', '#7c3aed')}
      ${_statCard('\ud83d\udcda', String(lessons.length), 'Live Lessons', '#d97706')}
    </div>
    <div style="background:#f9fafb;border-radius:16px;padding:20px;margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:8px">
        <h3 style="font-size:0.95rem;font-weight:900">Weekly Lesson Plays (Last 12 Weeks)</h3>
        <span style="font-size:0.78rem;font-weight:700;color:#059669">+14% this week</span>
      </div>
      <div style="display:flex;align-items:flex-end;gap:4px;height:64px">${sparkline}</div>
      <div style="display:flex;justify-content:space-between;margin-top:4px">
        <span style="font-size:0.68rem;color:#9ca3af">12 wks ago</span>
        <span style="font-size:0.68rem;color:#9ca3af">This week</span>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="background:#f9fafb;border-radius:16px;padding:18px">
        <h3 style="font-size:0.9rem;font-weight:900;margin-bottom:12px">Users by Role</h3>
        ${[['Student','38','#E8562A'],['Teacher','14','#059669'],['Parent','9','#0369a1'],['District','3','#7c3aed']].map(([r,n,c])=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid #e5e7eb">
            <span style="font-size:0.88rem;font-weight:700">${r}</span>
            <span style="font-weight:900;color:${c}">${n}</span>
          </div>`).join('')}
      </div>
      <div style="background:#f9fafb;border-radius:16px;padding:18px">
        <h3 style="font-size:0.9rem;font-weight:900;margin-bottom:12px">Quick Admin Actions</h3>
        <div style="display:flex;flex-direction:column;gap:9px">
          <button onclick="App.go('dashboard/admin/assessments')" style="background:#fff3ef;border:2px solid #E8562A;border-radius:10px;padding:10px 14px;cursor:pointer;font-family:inherit;font-weight:800;font-size:0.84rem;color:#E8562A;text-align:left">Open New Assessment</button>
          <button onclick="App.go('dashboard/admin/pm1')" style="background:#f5f3ff;border:2px solid #7c3aed;border-radius:10px;padding:10px 14px;cursor:pointer;font-family:inherit;font-weight:800;font-size:0.84rem;color:#7c3aed;text-align:left">View PM1 Results</button>
          <button onclick="App.go('dashboard/admin/lessons')" style="background:#ecfdf5;border:2px solid #059669;border-radius:10px;padding:10px 14px;cursor:pointer;font-family:inherit;font-weight:800;font-size:0.84rem;color:#059669;text-align:left">Manage Lessons</button>
          <button onclick="App.go('roadmap')" style="background:#f3f4f6;border:2px solid #374151;border-radius:10px;padding:10px 14px;cursor:pointer;font-family:inherit;font-weight:800;font-size:0.84rem;color:#374151;text-align:left">🗺️ Product Roadmap</button>
        </div>
      </div>
    </div>`;

  const assessmentsHtml = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <h3 style="font-size:1rem;font-weight:900">Assessment Manager</h3>
      <button onclick="App.go('spark/play')" style="background:#E8562A;color:white;border:none;border-radius:999px;padding:9px 18px;font-size:0.82rem;font-weight:800;cursor:pointer">Open New Spark</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${ASSESSMENTS.map(a => `
        <div style="background:#f9fafb;border-radius:16px;padding:18px 20px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px">
            <div>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:5px">
                <span style="font-weight:900;font-size:0.95rem">${a.name}</span>
                ${statusBadge(a.status)}
              </div>
              <div style="font-size:0.77rem;color:#9ca3af;font-weight:600">Code: <code style="background:#e5e7eb;padding:1px 6px;border-radius:5px;font-weight:800">${a.code}</code> &middot; ${a.date} &middot; ${a.classes} classes &middot; ${a.students} students${a.avgScore ? ' &middot; Avg: ' + a.avgScore + '%' : ''}</div>
            </div>
            <div style="display:flex;gap:8px">
              ${a.status === 'open'   ? '<button onclick="alert(\'Assessment closed!\')" style="background:#fff3ef;color:#E8562A;border:2px solid #E8562A;border-radius:999px;padding:7px 14px;font-size:0.78rem;font-weight:800;cursor:pointer">Close</button>' : ''}
              ${a.status === 'draft'  ? '<button onclick="alert(\'Assessment opened for testing!\')" style="background:#E8562A;color:white;border:none;border-radius:999px;padding:7px 14px;font-size:0.78rem;font-weight:800;cursor:pointer">Open for Testing</button>' : ''}
              ${a.status === 'closed' ? '<button onclick="App.go(\'assessment\')" style="background:#f3f4f6;color:#374151;border:none;border-radius:999px;padding:7px 14px;font-size:0.78rem;font-weight:800;cursor:pointer">View Results</button>' : ''}
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div style="background:#f0f9ff;border-radius:12px;padding:16px 18px">
      <p style="font-size:0.82rem;font-weight:700;color:#0369a1;margin-bottom:3px">How it works</p>
      <p style="font-size:0.78rem;color:#6b7280;line-height:1.5">Create a Spark, share the class code with students, then click "Open for Testing." Students take the quiz and results appear automatically. Close the assessment to lock in the data for PM reports.</p>
    </div>`;

  const pm1Html = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div>
        <h3 style="font-size:1rem;font-weight:900;margin-bottom:2px">PM1 Results &mdash; Progress Monitoring 1</h3>
        <p style="font-size:0.78rem;color:#9ca3af;font-weight:600">9-week benchmark &middot; Completed Apr 14, 2026 &middot; 3 classes</p>
      </div>
      <button style="background:#f3f4f6;border:none;border-radius:999px;padding:8px 14px;font-size:0.78rem;font-weight:800;cursor:pointer">Export PDF</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
      ${_statCard('\ud83c\udfeb', '64', 'Students Tested', '#E8562A')}
      ${_statCard('\ud83d\udcca', '77%', 'School-Wide Avg', '#059669')}
      ${_statCard('\u2b06\ufe0f', '28', 'Students Improved', '#0369a1')}
      ${_statCard('\u26a0\ufe0f', '10', 'Need Intervention', '#d97706')}
    </div>
    <div class="ds-table-wrap" style="margin-bottom:20px">
      <table class="ds-table">
        <thead><tr><th>Class</th><th>Grade</th><th>Students</th><th style="color:var(--math)">Math</th><th style="color:var(--sci)">Science</th><th style="color:var(--spa)">Spanish</th><th>Trend</th><th>Needs Help</th></tr></thead>
        <tbody>
          ${PM1_CLASSES.map(c => `
            <tr class="ds-row">
              <td style="font-weight:800">${c.name}</td>
              <td style="color:#9ca3af;font-weight:600">${c.grade}</td>
              <td style="text-align:center;font-weight:700">${c.students}</td>
              <td style="text-align:center;font-weight:900;color:var(--math)">${c.mathAvg}%</td>
              <td style="text-align:center;font-weight:900;color:var(--sci)">${c.sciAvg}%</td>
              <td style="text-align:center;font-weight:900;color:var(--spa)">${c.spaAvg}%</td>
              <td style="text-align:center">${c.improvement > 0
                ? '<span style="color:#059669;font-weight:800;font-size:0.85rem">up +' + c.improvement + '%</span>'
                : '<span style="color:#dc2626;font-weight:800;font-size:0.85rem">down ' + c.improvement + '%</span>'}</td>
              <td style="text-align:center"><span style="background:${c.needs>3?'#fee2e2':'#fef3c7'};color:${c.needs>3?'#dc2626':'#d97706'};padding:3px 10px;border-radius:999px;font-size:0.75rem;font-weight:800">${c.needs} students</span></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
      ${[['Math','var(--math)','#f0f7ff',77,'+4%','Ratios','Long Division'],
         ['Science','var(--sci)','#f0fdf4',78,'+2%','Ecosystems','Cell Biology'],
         ['Spanish','var(--spa)','#fffbeb',77,'+6%','Greetings','Verb Conjugation']].map(([subj,c,bg,avg,trend,top,low])=>`
        <div style="background:${bg};border-radius:16px;padding:16px">
          <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:${c};margin-bottom:6px">${subj}</div>
          <div style="font-size:1.8rem;font-weight:900;color:${c};line-height:1">${avg}%</div>
          <div style="font-size:0.72rem;color:#059669;font-weight:700;margin-bottom:8px">${trend} vs PM0</div>
          <div style="font-size:0.74rem;color:#374151;font-weight:700">Top: <span style="color:#6b7280;font-weight:500">${top}</span></div>
          <div style="font-size:0.74rem;color:#374151;font-weight:700;margin-top:3px">Work on: <span style="color:#6b7280;font-weight:500">${low}</span></div>
        </div>`).join('')}
    </div>
    <div style="background:#f9fafb;border-radius:16px;padding:18px">
      <h3 style="font-size:0.9rem;font-weight:900;margin-bottom:10px">Intervention Candidates (10 students below 60%)</h3>
      ${['Noah Williams (P3) -- Math 58%, needs ratio support',
         'Mason Rodriguez (P3) -- Science 64%, needs cell bio review',
         'Ethan Brown (P5) -- Overall 55%, multi-subject support needed',
         'Aiden Scott (P5) -- Math 58%, fractions and decimals',
         'Dylan Hayes (P7) -- Overall 48%, at risk -- escalate to counselor'].map(s=>`
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #e5e7eb">
          <span style="color:#dc2626;font-size:0.9rem">!</span>
          <span style="font-size:0.84rem;font-weight:600;color:#374151">${s}</span>
        </div>`).join('')}
    </div>`;

  const lessonsHtml = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <h3 style="font-size:1rem;font-weight:900">Lesson Library (${lessons.length} lessons)</h3>
    </div>
    <div class="ds-table-wrap">
      <table class="ds-table">
        <thead><tr><th>#</th><th>Subj</th><th>Title</th><th>Plays</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[...lessons].sort((a,b)=>b.plays-a.plays).map((l,i)=>`
            <tr class="ds-row">
              <td style="color:#9ca3af;font-weight:700">${i+1}</td>
              <td><span style="background:${sBg(l.subj)};color:${sColor(l.subj)};padding:3px 7px;border-radius:6px;font-size:0.72rem;font-weight:800">${l.subj}</span></td>
              <td style="font-weight:700">${l.title}</td>
              <td style="font-weight:800;text-align:center">${l.plays}</td>
              <td style="font-weight:800;text-align:center;color:${l.rating>=90?'#059669':l.rating>=75?'#d97706':'#dc2626'}">${l.rating}%</td>
              <td><span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:999px;font-size:0.7rem;font-weight:800">Live</span></td>
              <td><button onclick="App.go('lesson/${l.id}')" style="background:#f3f4f6;border:none;border-radius:8px;padding:4px 10px;font-size:0.75rem;font-weight:700;cursor:pointer">Preview</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  const systemHtml = `
    <h3 style="font-size:0.95rem;font-weight:900;margin-bottom:14px">System Status</h3>
    ${[
      {label:'Cloudflare Pages CDN',              ok:true},
      {label:'Service Worker / Offline Mode',     ok:true},
      {label:'LocalStorage (student progress)',   ok:true},
      {label:'PWA Manifest & Icons',              ok:true},
      {label:'Signup / Auth (localStorage)',      ok:true},
      {label:'Supabase backend',                  ok:false, note:'Not connected yet'},
      {label:'Email notifications',               ok:false, note:'Coming soon'},
    ].map(s=>`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e5e7eb">
        <span style="font-size:0.88rem;font-weight:600">${s.label}</span>
        <span style="font-size:0.78rem;font-weight:800;color:${s.ok?'#059669':'#d97706'};background:${s.ok?'#ecfdf5':'#fef3c7'};padding:3px 10px;border-radius:999px">${s.ok?'Online':s.note||'Pending'}</span>
      </div>`).join('')}`;

  const bodyMap = {overview:overviewHtml, assessments:assessmentsHtml, pm1:pm1Html, lessons:lessonsHtml, system:systemHtml};

  return `
    ${_dashNav('admin','Admin','\u2699\ufe0f')}
    <div style="max-width:960px;margin:0 auto;padding:36px 20px 80px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px">
        <div>
          <h1 style="font-size:2rem;font-weight:900;letter-spacing:-1px;margin-bottom:4px">Admin Dashboard</h1>
          <p style="color:#6b7280;font-size:0.9rem;font-weight:500">Learn.edu platform &middot; Spring 2026 &middot; <span style="color:#E8562A;font-weight:700">Demo data</span></p>
        </div>
        <button onclick="App.go('dashboard/admin/assessments')" style="background:#E8562A;color:white;border:none;border-radius:999px;padding:10px 20px;font-size:0.85rem;font-weight:800;cursor:pointer">Open Assessment for Testing</button>
      </div>
      ${tabBar}
      <div style="background:white;border-radius:20px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
        ${bodyMap[tab] || overviewHtml}
      </div>
    </div>`;
};

// ── Parent Dashboard ──────────────────────────────────────────
Views.dashboardParent = function() {
  const progress = (() => { try { return JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); } catch { return {}; } })();
  const allLessons = [
    {id:'math-4-multiplication', title:'Multiplication', subj:'math', grade:4, code:'4-MU-1A'},
    {id:'math-4-long-division',  title:'Long Division',  subj:'math', grade:4, code:'4-LD-1A'},
    {id:'math-5-fractions',      title:'Fractions',      subj:'math', grade:5, code:'5-FR-1A'},
    {id:'math-5-decimals',       title:'Decimals',       subj:'math', grade:5, code:'5-DE-1A'},
    {id:'math-6-ratios',         title:'Ratios',         subj:'math', grade:6, code:'6-RA-1A'},
    {id:'science-4-ecosystems',  title:'Ecosystems',     subj:'science', grade:4, code:'4-EC-1A'},
    {id:'science-5-cells',       title:'Cell Biology',   subj:'science', grade:5, code:'5-CE-1A'},
    {id:'spanish-4-greetings',   title:'Greetings',      subj:'spanish', grade:4, code:'4-GR-1A'},
    {id:'spanish-4-numbers',     title:'Numbers 1–20',   subj:'spanish', grade:4, code:'4-NU-1A'},
  ];
  const done = allLessons.filter(l => progress[l.id]?.completed);
  const avgScore = done.length ? Math.round(done.reduce((s,l) => s + (progress[l.id]?.score||0), 0) / done.length) : 0;
  const mathDone = done.filter(l=>l.subj==='math').length;
  const sciDone  = done.filter(l=>l.subj==='science').length;
  const spaDone  = done.filter(l=>l.subj==='spanish').length;

  const alerts = [];
  if (avgScore > 0 && avgScore < 60) alerts.push({type:'warn', msg:'Average score is below 60%. Extra practice recommended.'});
  if (done.length === 0) alerts.push({type:'info', msg:'No lessons completed yet. Encourage your child to start!'});
  if (avgScore >= 85) alerts.push({type:'good', msg:'Great job! Avg score is above 85% — your child is thriving.'});

  const teacherNotes = [
    { from:'Ms. Rivera',  subj:'Math',    note:'Doing well on multiplication. Fractions need practice.', date:'Apr 25'},
    { from:'Mr. Thompson',subj:'Science', note:'Strong understanding of ecosystems. Cell unit coming up.', date:'Apr 23'},
    { from:'Sra. López',  subj:'Spanish', note:'Excellent participation. Numbers vocabulary is solid.', date:'Apr 22'},
  ];

  return `
    ${_dashNav('parent','Parent','🏠')}
    <div style="max-width:800px;margin:0 auto;padding:36px 20px 80px">

      <!-- Header -->
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px">
        <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#38bdf8);display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0">👧</div>
        <div>
          <h1 style="font-size:1.6rem;font-weight:900;letter-spacing:-0.5px;margin-bottom:2px">Your Child's Progress</h1>
          <p style="font-size:0.85rem;color:#6b7280;font-weight:500">Week of Apr 27 · Spring 2026 · <span style="color:#E8562A;font-weight:700">Mockup</span></p>
        </div>
      </div>

      <!-- Alerts -->
      ${alerts.length ? alerts.map(a => `
        <div style="background:${a.type==='warn'?'#fef3c7':a.type==='good'?'#dcfce7':'#dbeafe'};border-left:4px solid ${a.type==='warn'?'#d97706':a.type==='good'?'#059669':'#0369a1'};border-radius:12px;padding:14px 16px;margin-bottom:12px;font-size:0.88rem;font-weight:600;color:#374151">
          ${a.type==='warn'?'⚠️':a.type==='good'?'🎉':'ℹ️'} ${a.msg}
        </div>`).join('') : ''}

      <!-- Stats -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
        ${_statCard('✅', done.length, 'Completed', '#059669')}
        ${_statCard('📊', (avgScore||'—')+(avgScore?'%':''), 'Avg Score', '#E8562A')}
        ${_statCard('⏱️', done.length*12+'m', 'Time Spent', '#0369a1')}
        ${_statCard('📚', 9-done.length, 'Remaining', '#7c3aed')}
      </div>

      <!-- Subject breakdown -->
      <div style="background:white;border-radius:20px;padding:24px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
        <h2 style="font-size:1rem;font-weight:900;margin-bottom:16px">Subject Progress</h2>
        ${[
          {label:'📐 Math',    done:mathDone, total:5, color:'var(--math)'},
          {label:'⚗️ Science', done:sciDone,  total:2, color:'var(--sci)'},
          {label:'🌎 Spanish', done:spaDone,  total:2, color:'var(--spa)'},
        ].map(s=>`
          <div style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:0.9rem;font-weight:700">${s.label}</span>
              <span style="font-size:0.82rem;font-weight:700;color:#6b7280">${s.done} of ${s.total} lessons</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px">${_bar(s.done/s.total*100, s.color)}</div>
          </div>`).join('')}
      </div>

      <!-- Teacher notes -->
      <div style="background:white;border-radius:20px;padding:24px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
        <h2 style="font-size:1rem;font-weight:900;margin-bottom:14px">📝 Teacher Notes</h2>
        ${teacherNotes.map(n=>`
          <div style="padding:14px 0;border-bottom:1px solid #f3f4f6">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
              <span style="font-size:0.85rem;font-weight:800">${n.from} <span style="color:#9ca3af;font-weight:600">· ${n.subj}</span></span>
              <span style="font-size:0.75rem;color:#9ca3af">${n.date}</span>
            </div>
            <p style="font-size:0.86rem;color:#374151;line-height:1.5;margin:0">${n.note}</p>
          </div>`).join('')}
      </div>

      <!-- Weekly tip -->
      <div style="background:#fff3ef;border-radius:20px;padding:20px 24px;border:2px solid #E8562A18">
        <div style="font-size:0.78rem;font-weight:800;color:#E8562A;margin-bottom:6px">💡 PARENT TIP THIS WEEK</div>
        <p style="font-size:0.9rem;color:#374151;font-weight:500;line-height:1.5;margin:0">Try doing one lesson together — watch your child explain the concept back to you. Teaching something is the best way to learn it.</p>
      </div>
    </div>`;
};
