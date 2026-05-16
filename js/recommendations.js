// ============================================================
//  Learn.edu — AI-Powered Lesson Recommendations
//  Local-first recommendation engine: adapts from progress,
//  scores, grade level, difficulty, and subject balance.
// ============================================================

const RecommendationEngine = {
  SUBJECT_META: {
    math:    { label: 'Math',          icon: '📐', color: '#E8562A', route: 'subject/math/4' },
    science: { label: 'Science',       icon: '⚗️', color: '#059669', route: 'subject/science/earth' },
    spanish: { label: 'Spanish',       icon: '🌎', color: '#7c3aed', route: 'subject/spanish/beginning' },
    ela:     { label: 'Language Arts', icon: '📖', color: '#0369a1', route: 'subject/ela/beginning' },
    history: { label: 'History',       icon: '🏛️', color: '#b45309', route: 'subject/history/ancient' },
    coding:  { label: 'Coding',        icon: '💻', color: '#0f172a', route: 'subject/coding/beginner' },
  },

  getLessons() {
    const list = [];
    try { if (typeof MATH_LESSONS    !== 'undefined') list.push(...MATH_LESSONS); } catch(e) {}
    try { if (typeof SCIENCE_LESSONS !== 'undefined') list.push(...SCIENCE_LESSONS); } catch(e) {}
    try { if (typeof SPANISH_LESSONS !== 'undefined') list.push(...SPANISH_LESSONS); } catch(e) {}
    try { if (typeof ELA_LESSONS     !== 'undefined') list.push(...ELA_LESSONS); } catch(e) {}
    try { if (typeof HISTORY_LESSONS !== 'undefined') list.push(...HISTORY_LESSONS); } catch(e) {}
    try { if (typeof CODING_LESSONS  !== 'undefined') list.push(...CODING_LESSONS); } catch(e) {}
    return list;
  },

  getProgress() {
    try { return App.getProgress(); }
    catch(e) {
      try { return JSON.parse(localStorage.getItem('learnedu-progress') || '{}'); }
      catch(_) { return {}; }
    }
  },

  getUserGrade() {
    try {
      const user = App.getUser() || {};
      const raw = String(user.grade || '');
      return parseInt(raw.replace(/\D/g, ''), 10) || 6;
    } catch(e) { return 6; }
  },

  analyze() {
    const lessons = this.getLessons();
    const progress = this.getProgress();
    const userGrade = this.getUserGrade();
    const subjects = {};
    const completed = [];

    lessons.forEach(l => {
      const key = l.subject || 'other';
      if (!subjects[key]) subjects[key] = { key, total: 0, done: 0, scores: [], latest: 0 };
      subjects[key].total++;
      const p = progress[l.id];
      if (p && p.completed) {
        subjects[key].done++;
        subjects[key].scores.push(p.score || 0);
        subjects[key].latest = Math.max(subjects[key].latest, p.date || 0);
        completed.push(l);
      }
    });

    Object.keys(subjects).forEach(k => {
      const s = subjects[k];
      s.avg = s.scores.length ? Math.round(s.scores.reduce((a,b) => a + b, 0) / s.scores.length) : null;
      s.pct = s.total ? Math.round(s.done / s.total * 100) : 0;
    });

    const allScores = Object.values(subjects).flatMap(s => s.scores);
    const avgScore = allScores.length ? Math.round(allScores.reduce((a,b) => a + b, 0) / allScores.length) : null;
    const weakSubjects = Object.values(subjects).filter(s => s.done > 0 && s.avg !== null && s.avg < 75).map(s => s.key);
    const strongSubjects = Object.values(subjects).filter(s => s.done > 0 && s.avg !== null && s.avg >= 88).map(s => s.key);
    const untouchedSubjects = Object.values(subjects).filter(s => s.done === 0 && s.total > 0).map(s => s.key);

    const targetDifficulty = avgScore === null ? 1 : avgScore >= 88 ? 3 : avgScore >= 75 ? 2 : 1;

    return {
      lessons,
      progress,
      subjects,
      completed,
      completedCount: completed.length,
      avgScore,
      userGrade,
      weakSubjects,
      strongSubjects,
      untouchedSubjects,
      targetDifficulty,
    };
  },

  _levelDistance(lesson, analysis) {
    if (lesson.subject === 'math' && lesson.grade) return Math.abs(lesson.grade - analysis.userGrade);
    return 0;
  },

  _scoreLesson(lesson, analysis) {
    const progress = analysis.progress;
    if (progress[lesson.id] && progress[lesson.id].completed) return null;

    const subject = lesson.subject || 'other';
    const subj = analysis.subjects[subject] || { done: 0, avg: null, pct: 0 };
    let score = 50;
    const reasons = [];

    if (analysis.completedCount === 0) {
      score += (lesson.difficulty || 1) === 1 ? 24 : 0;
      if (subject === 'math') score += 10;
      reasons.push('Great first lesson');
    }

    if (analysis.weakSubjects.includes(subject)) {
      score += 28;
      reasons.push('Focus area from recent scores');
    }

    if (analysis.untouchedSubjects.includes(subject)) {
      score += 14;
      reasons.push('Balances your learning');
    }

    if (subj.done > 0 && subj.avg !== null && subj.avg >= 88) {
      score += 10;
      reasons.push('Ready for a challenge');
    }

    const difficulty = lesson.difficulty || 1;
    const diffGap = Math.abs(difficulty - analysis.targetDifficulty);
    score += Math.max(0, 18 - diffGap * 9);
    if (diffGap === 0) reasons.push('Right difficulty');

    if (lesson.subject === 'math' && lesson.grade) {
      const distance = this._levelDistance(lesson, analysis);
      score += Math.max(0, 18 - distance * 6);
      if (distance === 0) reasons.push('Matches your grade');
      if (lesson.grade < analysis.userGrade && (analysis.avgScore || 0) < 75) reasons.push('Foundation review');
    }

    // Nudge earlier lessons in a sequence before later ones.
    const subjectLessons = analysis.lessons.filter(l => l.subject === subject);
    const idx = subjectLessons.findIndex(l => l.id === lesson.id);
    if (idx >= 0) score += Math.max(0, 12 - idx * 0.6);

    // Avoid repeating the exact same subject forever when there are options.
    const recentlyDone = analysis.completed.slice().sort((a,b) => {
      const da = analysis.progress[a.id]?.date || 0;
      const db = analysis.progress[b.id]?.date || 0;
      return db - da;
    }).slice(0, 2);
    if (recentlyDone.length && recentlyDone.every(l => l.subject === subject) && !analysis.weakSubjects.includes(subject)) {
      score -= 8;
      reasons.push('Mixes up your subjects');
    }

    const confidence = Math.max(60, Math.min(98, Math.round(score)));
    return {
      lesson,
      score,
      confidence,
      reasons: reasons.slice(0, 3),
      label: this._labelFor(lesson, analysis, reasons),
    };
  },

  _labelFor(lesson, analysis, reasons) {
    if (reasons.indexOf('Focus area from recent scores') !== -1) return 'AI Focus Pick';
    if (reasons.indexOf('Ready for a challenge') !== -1) return 'Challenge Pick';
    if (analysis.completedCount === 0) return 'Starter Pick';
    if (reasons.indexOf('Balances your learning') !== -1) return 'Balance Pick';
    return 'Next Best Lesson';
  },

  getRecommendations(limit = 5) {
    const analysis = this.analyze();
    const picks = analysis.lessons
      .map(l => this._scoreLesson(l, analysis))
      .filter(Boolean)
      .sort((a,b) => b.score - a.score)
      .slice(0, limit);

    return { analysis, picks };
  },
};
