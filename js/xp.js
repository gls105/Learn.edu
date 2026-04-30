// ============================================================
//  Learn.edu — XP & Rewards Engine
//  Handles XP earning, streaks, theme unlocks, games, badges
// ============================================================

const XP = {

  // ── Reward Catalog ────────────────────────────────────────
  REWARDS: [
    { id: 'theme-classic',  xpRequired: 0,    type: 'theme',  name: 'Classic',       desc: 'The original Learn.edu look',       icon: '🟠', cssClass: '' },
    { id: 'badge-first',    xpRequired: 0,    type: 'badge',  name: 'First Steps',   desc: 'Complete your first lesson',        icon: '👟' },
    { id: 'theme-night',    xpRequired: 75,   type: 'theme',  name: 'Night Mode',    desc: 'Dark theme for late-night studying', icon: '🌙', cssClass: 'theme-night' },
    { id: 'game-mathblast', xpRequired: 100,  type: 'game',   name: 'Math Blast',    desc: 'Quick-fire math challenge',         icon: '💥', route: 'game/mathblast' },
    { id: 'badge-roll',     xpRequired: 150,  type: 'badge',  name: 'On a Roll',     desc: 'Complete 5 lessons',                icon: '🎯' },
    { id: 'theme-ocean',    xpRequired: 200,  type: 'theme',  name: 'Ocean',         desc: 'Cool blue oceanic vibes',           icon: '🌊', cssClass: 'theme-ocean' },
    { id: 'game-wordrush',  xpRequired: 300,  type: 'game',   name: 'Word Rush',     desc: 'Spell it before time runs out',     icon: '📝', route: 'game/wordrush' },
    { id: 'badge-streak7',  xpRequired: 300,  type: 'badge',  name: 'Streak Master', desc: 'Keep a 7-day learning streak',      icon: '🔥' },
    { id: 'theme-forest',   xpRequired: 400,  type: 'theme',  name: 'Forest',        desc: 'Deep green forest vibes',           icon: '🌲', cssClass: 'theme-forest' },
    { id: 'prize-mystery',  xpRequired: 500,  type: 'prize',  name: 'Mystery Box',   desc: 'Something special is waiting…',    icon: '🎁' },
    { id: 'theme-galaxy',   xpRequired: 750,  type: 'theme',  name: 'Galaxy',        desc: 'Space-age purple theme',            icon: '🔮', cssClass: 'theme-galaxy' },
    { id: 'badge-legend',   xpRequired: 1000, type: 'badge',  name: 'Legend',        desc: 'Complete 25 lessons total',         icon: '👑' },
  ],

  _key: 'learnedu-xp',

  // ── State ─────────────────────────────────────────────────
  getState() {
    try {
      return JSON.parse(localStorage.getItem(this._key) || 'null') || this._default();
    } catch { return this._default(); }
  },

  _default() {
    return {
      total:       0,
      streak:      0,
      lastDate:    null,
      unlockedIds: ['theme-classic', 'badge-first'],
      activeTheme: '',
    };
  },

  saveState(s) {
    localStorage.setItem(this._key, JSON.stringify(s));
  },

  // ── Earn XP ───────────────────────────────────────────────
  earn(amount, reason = '') {
    const s = this.getState();
    s.total += amount;

    // Streak logic
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (s.lastDate !== today) {
      s.streak = (s.lastDate === yesterday) ? s.streak + 1 : 1;
      s.lastDate = today;
    }

    // Auto-unlock badge: first lesson
    const progress = App ? App.getProgress() : {};
    const completedCount = Object.values(progress).filter(v => v.completed).length;
    if (completedCount >= 1  && !s.unlockedIds.includes('badge-first'))   s.unlockedIds.push('badge-first');
    if (completedCount >= 5  && !s.unlockedIds.includes('badge-roll'))    s.unlockedIds.push('badge-roll');
    if (completedCount >= 25 && !s.unlockedIds.includes('badge-legend'))  s.unlockedIds.push('badge-legend');
    if (s.streak >= 7        && !s.unlockedIds.includes('badge-streak7')) s.unlockedIds.push('badge-streak7');

    // XP-threshold unlocks
    const newUnlocks = this.REWARDS.filter(r =>
      !s.unlockedIds.includes(r.id) && s.total >= r.xpRequired
    );
    newUnlocks.forEach(r => s.unlockedIds.push(r.id));

    this.saveState(s);
    this._showToast(amount, reason, newUnlocks);
    this._updateHUD();
    return { state: s, newUnlocks };
  },

  isUnlocked(id) {
    return this.getState().unlockedIds.includes(id);
  },

  // ── Themes ────────────────────────────────────────────────
  setTheme(cssClass) {
    const s = this.getState();
    // Only apply if unlocked
    const reward = this.REWARDS.find(r => r.cssClass === cssClass || (!cssClass && r.id === 'theme-classic'));
    if (!reward || !s.unlockedIds.includes(reward.id)) return false;
    s.activeTheme = cssClass;
    this.saveState(s);
    this._applyTheme(cssClass);
    return true;
  },

  _applyTheme(cssClass) {
    const themeClasses = this.REWARDS
      .filter(r => r.type === 'theme' && r.cssClass)
      .map(r => r.cssClass);
    document.body.classList.remove(...themeClasses);
    if (cssClass) document.body.classList.add(cssClass);
  },

  // ── HUD ───────────────────────────────────────────────────
  _updateHUD() {
    const s = this.getState();
    document.querySelectorAll('.xp-hud').forEach(el => {
      el.innerHTML = `⚡ ${s.total.toLocaleString()} XP${s.streak > 1 ? ` · 🔥 ${s.streak}d` : ''}`;
      el.title = `${s.total} XP · ${s.streak}-day streak`;
    });
  },

  // ── Toast ─────────────────────────────────────────────────
  _showToast(amount, reason, newUnlocks) {
    document.querySelectorAll('.xp-toast').forEach(el => el.remove());

    const unlockHtml = newUnlocks.length
      ? `<div class="xp-toast-unlock">🎉 Unlocked: ${newUnlocks.map(r => `${r.icon} ${r.name}`).join(', ')}</div>`
      : '';

    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.innerHTML = `
      <div class="xp-toast-top">
        <span class="xp-toast-bolt">⚡</span>
        <span class="xp-toast-amount">+${amount} XP</span>
        ${reason ? `<span class="xp-toast-reason">${reason}</span>` : ''}
      </div>
      ${unlockHtml}
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('xp-toast-show'));
    });

    const duration = newUnlocks.length ? 3800 : 2400;
    setTimeout(() => {
      toast.classList.remove('xp-toast-show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  // ── Next Reward ───────────────────────────────────────────
  nextReward() {
    const s = this.getState();
    return this.REWARDS.find(r => !s.unlockedIds.includes(r.id)) || null;
  },

  // ── Level ─────────────────────────────────────────────────
  level(total) {
    if (total >= 1000) return { num: 10, name: 'Legend',     color: '#f59e0b' };
    if (total >= 750)  return { num: 9,  name: 'Galaxy',     color: '#7c3aed' };
    if (total >= 500)  return { num: 8,  name: 'Rocket',     color: '#6366f1' };
    if (total >= 400)  return { num: 7,  name: 'Forest',     color: '#059669' };
    if (total >= 300)  return { num: 6,  name: 'Explorer',   color: '#0369a1' };
    if (total >= 200)  return { num: 5,  name: 'Ocean',      color: '#0891b2' };
    if (total >= 150)  return { num: 4,  name: 'Scholar',    color: '#16a34a' };
    if (total >= 100)  return { num: 3,  name: 'Achiever',   color: '#ea580c' };
    if (total >= 50)   return { num: 2,  name: 'Learner',    color: '#E8562A' };
    return               { num: 1,  name: 'Starter',    color: '#6B7280' };
  },

  // ── Init ──────────────────────────────────────────────────
  init() {
    this._applyTheme(this.getState().activeTheme || '');
    setTimeout(() => this._updateHUD(), 50);
  },
};
