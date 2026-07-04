<div align="center">

# Ighawosa Omoma — Portfolio

**AI Automation Engineer · Power Platform Developer · Intelligent Process Automation Specialist**

[Live Site](#) · [LinkedIn](https://www.linkedin.com/in/ighawosa-omoma) · [Contact](#contact)

</div>

---

## About

A single-page portfolio built around a **pipeline motif** — a schematic trace line runs down the page and lights up as you scroll, mirroring the automation pipelines (Excel → Dataverse → Copilot Studio, email → RPA → SharePoint) this portfolio describes.

It's a static site with no build step and no framework. Content is fully decoupled from markup, so updating the site is a matter of editing one JSON file.

## Features

- 🔧 **Content-driven** — all text, projects, skills, and experience live in [`content.json`](./content.json); the page renders itself from that data
- 🧭 **Scroll-activated trace line** — a visual signature that reflects the "input → process → output" nature of the projects shown
- 📱 **Responsive** — down to small mobile screens
- ♿ **Accessible** — visible keyboard focus states, `prefers-reduced-motion` respected
- ⚡ **Zero dependencies** — plain HTML, CSS, and vanilla JS; no build tools, no npm install

## Tech stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Markup     | Semantic HTML5                            |
| Styling    | Vanilla CSS (custom properties, Grid/Flexbox) |
| Behavior   | Vanilla JavaScript (`fetch`, DOM APIs, `IntersectionObserver`) |
| Fonts      | Space Grotesk, IBM Plex Sans, IBM Plex Mono (Google Fonts) |
| Content    | JSON |

## Project structure

```
portfolio-site/
├── index.html      # page structure
├── style.css       # visual design
├── script.js       # loads content.json and renders the page
├── content.json    # all editable content — name, bio, projects, skills, experience, education
└── README.md
```

## Getting started

Clone the repo:

```bash
git clone https://github.com/ig-matrix/portfolio.git
cd portfolio
```

Because the page loads `content.json` via `fetch()`, opening `index.html` directly (double-click) won't work — browsers block local file reads for security. Run a local server instead:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Updating content

You shouldn't need to touch `index.html`, `style.css`, or `script.js` for routine updates. Everything editable lives in `content.json`:

| Section        | What to edit |
|-----------------|--------------|
| `meta`          | Name, title, tagline, location, email, LinkedIn, GitHub |
| `about`         | Summary paragraph and quick facts |
| `metrics`       | The four highlighted stat callouts |
| `skills`        | Skill categories and chips |
| `projects`      | Each project's input / process / output and tech tags |
| `exploring`     | Work in progress / side projects |
| `experience`    | Job history |
| `education`     | Degrees and details |

To add a new entry to any list (e.g. a new job or project), copy an existing object inside that array and edit its values.

## Deployment

This is a fully static site — deploy it anywhere that serves static files.

**GitHub Pages**
1. Push this repo to GitHub.
2. Go to **Settings → Pages**, choose the branch/folder to serve, save.
3. Live at `https://ig-matrix.github.io/portfolio/`.

**Netlify**
Drag and drop this folder at [app.netlify.com](https://app.netlify.com), or connect the repo for auto-deploys on push.

**Vercel**
Import the repo at [vercel.com/new](https://vercel.com/new); framework preset "Other" (static HTML).

Connecting any of the above to this GitHub repo means the workflow becomes: edit `content.json` → commit → push → live within a minute.

## Contact

- **Email**: your-email@example.com
- **LinkedIn**: [linkedin.com/in/ighawosa-omoma](https://www.linkedin.com/in/ighawosa-omoma)

## License

Personal portfolio — content and copy are © Ighawosa Omoma. Feel free to fork the code/structure for your own portfolio.
