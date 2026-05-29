# Learn.edu

**Free, gamified learning for Grades 4–9.**
Math · Science · Spanish · ELA · History · Coding · and more.

> "Learning, quite the best way to learn."

---

## What It Is

Learn.edu is a Progressive Web App (PWA) that makes school subjects feel less like school.
Built with vanilla HTML, CSS, and JavaScript — no frameworks, no login required, no cost.

---

## Features

- Subjects: Math, Science, Spanish, ELA, History, Coding, Real World skills
- Flashcard mode for quick review
- Games and interactive lessons
- XP system to track progress
- Smart recommendations
- Works offline (service worker powered)
- Installable on phone or desktop (PWA)

---

## Structure

```
Learn.edu/
├── index.html          # App entry point
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline support)
├── css/                # Styles
├── js/                 # App logic (app, views, lessons, games, xp)
├── data/               # Subject data (math, science, spanish, ela, history, coding…)
├── anim/               # Lottie animations
├── icons/              # App icons
└── logo.svg
```

---

## Getting Started

No install needed. Just open `index.html` in a browser — or host it anywhere static.

```bash
git clone https://github.com/gls105/Learn.edu.git
cd Learn.edu
npx serve .
```

To install as an app: open in Chrome or Safari → "Add to Home Screen."

---

## Tech Stack

- Vanilla HTML / CSS / JavaScript
- [Phosphor Icons](https://phosphoricons.com/)
- [Lottie Player](https://lottiefiles.com/web-player)
- Google Fonts (Nunito + Playfair Display)
- PWA with offline service worker

---

## Contributing

Contributions welcome! Fork the repo, make your changes, and open a pull request.
No build step, no dependencies — just edit the files and go.

---

## License

MIT License — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

*Built by [gls105](https://github.com/gls105)*