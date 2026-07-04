async function loadContent() {
  const res = await fetch('content.json');
  if (!res.ok) throw new Error('Could not load content.json');
  return res.json();
}

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.html !== undefined) node.innerHTML = opts.html;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  children.forEach(c => c && node.appendChild(c));
  return node;
}

function render(data) {
  document.title = `${data.meta.name} — ${data.meta.title}`;

  // Hero
  document.getElementById('hero-name').textContent = data.meta.name;
  document.getElementById('hero-role').textContent = `${data.meta.title} · ${data.meta.subtitle}`;
  document.getElementById('hero-tagline').textContent = data.meta.tagline;
  document.getElementById('hero-location').textContent = `LOCATION: ${data.meta.location.toUpperCase()}`;
  document.getElementById('footer-name').textContent = `${data.meta.name} · built with a pipeline in mind`;
  document.getElementById('contact-intro').textContent =
    document.getElementById('contact-intro').textContent || '';

  // About
  document.getElementById('about-summary').textContent = data.about.summary;
  const factsWrap = document.getElementById('about-facts');
  data.about.facts.forEach(f => {
    factsWrap.appendChild(el('div', {}, [
      el('dt', { text: f.label.toUpperCase() }),
      el('dd', { text: f.value })
    ]));
  });

  // Metrics
  const metricsGrid = document.getElementById('metrics-grid');
  data.metrics.forEach(m => {
    metricsGrid.appendChild(el('div', { className: 'metric-card' }, [
      el('span', { className: 'metric-value', text: m.value }),
      el('span', { className: 'metric-label', text: m.label })
    ]));
  });

  // Skills
  const skillsGrid = document.getElementById('skills-grid');
  data.skills.forEach(group => {
    const chips = el('div', { className: 'skill-chips' },
      group.items.map(item => el('span', { className: 'skill-chip', text: item }))
    );
    skillsGrid.appendChild(el('div', { className: 'skill-group' }, [
      el('h3', { text: group.category }),
      chips
    ]));
  });

  // Projects
  const projectsList = document.getElementById('projects-list');
  data.projects.forEach(p => {
    const flow = el('dl', { className: 'flow' }, [
      el('div', { className: 'flow-step' }, [el('dt', { text: 'INPUT' }), el('dd', { text: p.input })]),
      el('span', { className: 'flow-arrow', text: '→' }),
      el('div', { className: 'flow-step' }, [el('dt', { text: 'PROCESS' }), el('dd', { text: p.process })]),
      el('span', { className: 'flow-arrow', text: '→' }),
      el('div', { className: 'flow-step' }, [el('dt', { text: 'OUTPUT' }), el('dd', { text: p.output })]),
    ]);
    const techRow = el('div', { className: 'project-tech' },
      p.tech.map(t => el('span', { className: 'tech-chip', text: t }))
    );
    projectsList.appendChild(el('article', { className: 'project-card' }, [
      el('div', { className: 'project-head' }, [
        el('h3', { text: p.name }),
        el('span', { className: 'project-tag', text: p.tag })
      ]),
      flow,
      techRow
    ]));
  });

  // Exploring
  const exploringList = document.getElementById('exploring-list');
  data.exploring.forEach(x => {
    exploringList.appendChild(el('div', { className: 'exploring-card' }, [
      el('h3', { text: x.name }),
      el('p', { text: x.desc })
    ]));
  });

  // Experience
  const experienceList = document.getElementById('experience-list');
  data.experience.forEach(job => {
    experienceList.appendChild(el('div', { className: 'experience-item' }, [
      el('div', { className: 'exp-item-head' }, [
        el('span', { className: 'exp-role', text: job.role }),
        el('span', { className: 'exp-period', text: job.period.toUpperCase() })
      ]),
      el('div', { className: 'exp-company', text: `${job.company} — ${job.location}` }),
      el('ul', { className: 'exp-bullets' }, job.bullets.map(b => el('li', { text: b })))
    ]));
  });

  // Education
  const educationList = document.getElementById('education-list');
  data.education.forEach(edu => {
    educationList.appendChild(el('div', { className: 'edu-item' }, [
      el('h3', { text: edu.school }),
      el('div', { className: 'edu-degree', text: edu.degree }),
      el('div', { className: 'edu-period', text: `${edu.period.toUpperCase()} · ${edu.location.toUpperCase()}` }),
      el('ul', { className: 'edu-details', }, edu.details.map(d => el('li', { text: d })))
    ]));
  });

  // Contact
  const contactLinks = document.getElementById('contact-links');
  if (data.meta.email) {
    contactLinks.appendChild(el('a', { className: 'contact-link', attrs: { href: `mailto:${data.meta.email}` }, text: '✉ Email' }));
  }
  if (data.meta.linkedin) {
    contactLinks.appendChild(el('a', { className: 'contact-link', attrs: { href: data.meta.linkedin, target: '_blank', rel: 'noopener' }, text: '↗ LinkedIn' }));
  }
  if (data.meta.github) {
    contactLinks.appendChild(el('a', { className: 'contact-link', attrs: { href: data.meta.github, target: '_blank', rel: 'noopener' }, text: '↗ GitHub' }));
  }
}

function activateScrollTrace() {
  const sections = document.querySelectorAll('[data-section]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-active');
    });
  }, { threshold: 0.25 });
  sections.forEach(s => observer.observe(s));
}

loadContent()
  .then(data => {
    render(data);
    activateScrollTrace();
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML =
      '<p style="padding:40px;font-family:monospace;color:#e8a33d;">Could not load content.json. If you opened this file directly from your computer, run a local server instead (see README.md) — browsers block loading local JSON files with file://.</p>';
  });
