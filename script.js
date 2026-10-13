/* ============================================================
   PORTFOLIO — RENDERS EVERYTHING FROM window.PORTFOLIO_DATA
   ============================================================ */

(function () {
  'use strict';

  const P = window.PORTFOLIO_DATA || {};
  const $  = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

  /* ---------------- utils ---------------- */
  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));

  const getByPath = (obj, path) =>
    !path ? undefined : path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);

  const interpolate = (str = '') =>
    String(str).replace(/\{(\w+)\}/g, (_, key) => {
      const v = getByPath(P, key) ?? getByPath(P, 'personal.' + key);
      return v != null ? String(v) : '';
    });

  const sanitizePhone = (v = '') => v.replace(/[^\d+]/g, '');
  const sanitizeWa = (v = '') => v.replace(/[^\d]/g, '');

  const placeholderImage = (label = 'Project') =>
    'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5b5cf0"/><stop offset="1" stop-color="#a78bfa"/>
        </linearGradient></defs>
        <rect width="800" height="500" fill="#f4f4f0"/>
        <rect x="40" y="40" width="720" height="420" rx="20" fill="url(#g)" opacity="0.12"/>
        <text x="400" y="270" text-anchor="middle" font-family="Montserrat,Arial"
              font-size="36" font-weight="700" fill="#17213d">${label}</text>
      </svg>`
    );

  const avatarPlaceholder = () =>
    'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5b5cf0"/><stop offset="1" stop-color="#a78bfa"/>
        </linearGradient></defs>
        <rect width="400" height="400" fill="#f4f4f0"/>
        <circle cx="200" cy="160" r="70" fill="url(#g)" opacity="0.9"/>
        <path d="M60 400c0-80 63-140 140-140s140 60 140 140" fill="url(#g)" opacity="0.9"/>
      </svg>`
    );

  /* ============================================================
     THEME
     ============================================================ */
  function initTheme() {
    const saved = localStorage.getItem('theme');
    const theme = saved || P?.site?.defaultTheme || 'light';
    document.documentElement.dataset.theme = theme;
  }

  function bindThemeToggle() {
    const btn = $('#themeToggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      localStorage.setItem('theme', next);

      // Update the meta theme-color to match (nice touch for mobile browsers)
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#171c28' : '#fafaf8');
    });
  }

  /* ============================================================
     META
     ============================================================ */
  function applyMeta() {
    const s = P.site || {};
    if (s.title) document.title = s.title;

    const setMeta = (attr, key, val) => {
      if (!val) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMeta('name', 'description', s.description);
    setMeta('property', 'og:title', s.title);
    setMeta('property', 'og:description', s.description);
    setMeta('property', 'og:image', s.ogImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }

  /* ============================================================
     [data-config="..."]  →  text + links
     ============================================================ */
  function fillConfigNodes() {
    const map = {
      siteTitle: 'site.title',
      name: 'personal.name',
      designation: 'personal.designation',
      tagline: 'personal.tagline',
      greeting: 'personal.greeting',
      email: 'contact.email',
      phone: 'contact.phone',
      whatsapp: 'contact.whatsapp',
      location: 'personal.location',
    };

    $$('[data-config]').forEach((node) => {
      const key = node.dataset.config;
      const path = map[key] || key;
      const raw = getByPath(P, path);
      if (raw == null) return;

      const value = interpolate(String(raw));
      node.textContent = value;

      if (node.tagName === 'A') {
        if (key === 'email') node.href = `mailto:${value}`;
        else if (key === 'phone') node.href = `tel:${sanitizePhone(value)}`;
        else if (key === 'whatsapp') node.href = `https://wa.me/${sanitizeWa(value)}`;
        else node.href = value;
      }
    });

    if (P.site?.title) document.title = P.site.title;
  }

  /* ============================================================
     HERO EXTRAS
     ============================================================ */
  function fillHero() {
    const p = P.personal || {};

    const resumeBtn = $('#resumeBtn');
    if (resumeBtn && p.resumeUrl) {
      resumeBtn.href = p.resumeUrl;
      resumeBtn.setAttribute('download', '');
    }

    const profile = $('#profileImage');
    if (profile) {
      profile.src = p.profileImage || '';
      profile.alt = p.name ? `${p.name} — profile photo` : 'Profile photo';
      profile.onerror = () => {
        profile.onerror = null;
        profile.src = avatarPlaceholder();
      };
    }

    const greet = document.querySelector('.hero-greeting');
    if (greet && p.availability) {
      greet.title = p.availability.label || '';
      const dot = greet.querySelector('.dot');
      if (dot && !p.availability.available) {
        dot.style.background = 'var(--text-soft)';
        dot.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.06)';
      }
    }
  }

  /* ============================================================
     SOCIAL
     ============================================================ */
  function renderSocial() {
    const wrap = $('#socialLinks');
    if (!wrap) return;

    const icons = {
      github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>`,
      linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
      twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.4 8.4L23 22h-6.7l-5.2-6.8L5.2 22H2l7.9-9L1.5 2h6.9l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 3.9H5.5l12.2 16.1z"/></svg>`,
      facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>`,
    };

    (P.social || []).forEach(({ name, label, url }) => {
      if (!url) return;
      const a = document.createElement('a');
      a.className = `social-link ${name}`;
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', label || name);
      a.title = label || name;
      a.innerHTML = icons[name] || `<span>${esc((label || name).slice(0, 2))}</span>`;
      wrap.appendChild(a);
    });
  }

  /* ============================================================
     ABOUT
     ============================================================ */
  function renderAbout() {
    const about = P.about || {};

    const textWrap = document.querySelector('#about .about-text');
    if (textWrap && Array.isArray(about.paragraphs)) {
      textWrap.innerHTML = about.paragraphs
        .map((p) => `<p>${interpolate(p)}</p>`)
        .join('');
    }

    const metaList = document.querySelector('#about .meta-list');
    if (metaList && Array.isArray(about.meta)) {
      metaList.innerHTML = about.meta.map((row) => {
        let value = row.value;
        if (value == null && row.source) value = getByPath(P, row.source);

        let display = esc(value ?? '');
        if (row.link === 'mailto' && value)
          display = `<a href="mailto:${esc(String(value))}">${esc(String(value))}</a>`;
        else if (row.link === 'tel' && value)
          display = `<a href="tel:${sanitizePhone(String(value))}">${esc(String(value))}</a>`;

        const cls = row.class ? ` class="${row.class}"` : '';
        return `<li><span>${esc(row.label || '')}</span><strong${cls}>${display}</strong></li>`;
      }).join('');
    }
  }

  /* ============================================================
     SKILLS
     ============================================================ */
  function renderSkills() {
    const wrap = $('#skillsWrap');
    const cats = P.skills?.categories || [];
    if (!wrap) return;

    if (!cats.length) {
      wrap.innerHTML = '<p class="loading">No skills listed.</p>';
      return;
    }

    wrap.innerHTML = cats.map((c) => `
      <div class="skill-group">
        <h3>${esc(c.name)}</h3>
        <div class="skill-chips">
          ${(c.items || []).map((s) => `<span class="skill-chip">${esc(s)}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  /* ============================================================
     EDUCATION
     ============================================================ */
  function renderEducation() {
    const wrap = $('#educationTimeline');
    const items = P.education?.items || [];
    if (!wrap) return;

    if (!items.length) {
      wrap.innerHTML = '<p class="loading">No education added yet.</p>';
      return;
    }

    wrap.innerHTML = items.map((e) => `
      <div class="timeline-item">
        <span class="timeline-date">${esc(e.period || '')}</span>
        <h3>${esc(e.degree || '')}</h3>
        <h4>${esc(e.institution || '')}${e.location ? ' · ' + esc(e.location) : ''}</h4>
        ${e.description ? `<p>${esc(e.description)}</p>` : ''}
        ${e.tags?.length
          ? `<div class="timeline-tags">${e.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`
          : ''}
      </div>
    `).join('');
  }

  /* ============================================================
     EXPERIENCE
     ============================================================ */
  function renderExperience() {
    const wrap = $('#experienceList');
    const items = P.experience?.items || [];
    if (!wrap) return;

    if (!items.length) {
      wrap.innerHTML = '<p class="loading">No experience added yet.</p>';
      return;
    }

    wrap.innerHTML = items.map((e) => {
      const roles = Array.isArray(e.roles) ? e.roles : [];
      const roleHtml = roles.map((r) => `
        <div class="exp-role">
          <div class="exp-role-head">
            <div>
              <h4 class="exp-role-title">${esc(r.title || '')}</h4>
              ${r.project ? `
                <span class="exp-role-project">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  Project: ${esc(r.project)}
                </span>` : ''}
            </div>
            <p class="exp-role-duration">${esc(r.duration || e.period || '')}</p>
          </div>
          ${r.bullets?.length
            ? `<ul class="exp-bullets">${r.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
            : ''}
        </div>
      `).join('');

      return `
      <article class="exp-card">
        <aside class="exp-side">
          <div>
            <p class="exp-role-type">${esc(e.type || 'Role')}</p>
            <h3 class="exp-company">${esc(e.company || '')}</h3>
          </div>
          <div class="exp-meta">
            <p>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${esc(e.period || '')}
            </p>
            ${e.location ? `
              <p>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${esc(e.location)}
              </p>` : ''}
          </div>
        </aside>
        <div class="exp-body">${roleHtml}</div>
      </article>`;
    }).join('');
  }

  /* ============================================================
     PROJECTS
     ============================================================ */
  function renderProjects() {
    const grid = $('#projectsGrid');
    const items = P.projects?.items || [];
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML = '<p class="loading">No projects yet.</p>';
      return;
    }

    grid.innerHTML = items.map((p) => `
      <article class="project-card">
        <div class="project-image">
          <img src="${esc(p.image || '')}" alt="${esc(p.name || '')}" loading="lazy"
               onerror="this.onerror=null;this.src='${placeholderImage(p.name || 'Project')}'" />
        </div>
        <div class="project-body">
          <p class="project-kind">Project</p>
          <h3>${esc(p.name || '')}</h3>
          <p>${esc(p.shortDescription || '')}</p>
          <div class="project-tech">
            ${(p.tech || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
          </div>
          <div class="project-footer">
            <a class="link-btn" href="#project=${encodeURIComponent(p.id)}">
              View More
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <div class="project-links">
              ${p.liveLink ? `
                <a href="${esc(p.liveLink)}" target="_blank" rel="noopener" title="Live Demo" aria-label="Live Demo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>` : ''}
              ${p.githubLink ? `
                <a href="${esc(p.githubLink)}" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
                </a>` : ''}
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  /* ============================================================
     SECTION HEADERS (tag / title / sub)
     ============================================================ */
  function renderSectionHeaders() {
    const map = {
      about: P.about,
      skills: P.skills,
      education: P.education,
      experience: P.experience,
      projects: P.projects,
      contact: P.contactSection,
    };

    Object.entries(map).forEach(([id, cfg]) => {
      if (!cfg) return;
      const section = document.getElementById(id);
      if (!section) return;

      const tagEl = section.querySelector('.section-tag');
      if (tagEl && cfg.tag) tagEl.textContent = cfg.tag;

      const titleEl = section.querySelector('.section-title');
      if (titleEl && cfg.heading) titleEl.textContent = cfg.heading;

      const subEl = section.querySelector('.section-sub');
      if (subEl && cfg.subheading) subEl.textContent = cfg.subheading;
    });

    const creditEl = document.querySelector('.footer-sub');
    if (creditEl && P.footer?.credit) creditEl.textContent = P.footer.credit;
  }

  /* ============================================================
     CONTACT — cards + form
     ============================================================ */
  function initContact() {
    const email = P.contact?.email || '';
    const phone = P.contact?.phone || '';
    const wa = P.contact?.whatsapp || '';

    const emailCard = $('#emailCard');
    if (emailCard && email) emailCard.href = `mailto:${email}`;

    const phoneCard = $('#phoneCard');
    if (phoneCard && phone) phoneCard.href = `tel:${sanitizePhone(phone)}`;

    const waCard = $('#whatsappCard');
    if (waCard && wa) waCard.href = `https://wa.me/${sanitizeWa(wa)}`;

    const form = $('#contactForm');
    if (!form) return;

    const status = $('#formStatus');
    const validators = {
      name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email.'),
      message: (v) => (v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'),
    };

    const setError = (field, msg) => {
      const errEl = form.querySelector(`[data-error="${field}"]`);
      if (errEl) errEl.textContent = msg;
    };

    form.addEventListener('input', (e) => {
      const { name, value } = e.target;
      if (validators[name]) setError(name, validators[name](value));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      let hasError = false;

      Object.entries(validators).forEach(([field, validate]) => {
        const msg = validate(data[field] || '');
        setError(field, msg);
        if (msg) hasError = true;
      });

      if (hasError) {
        status.textContent = 'Please fix the errors above.';
        status.classList.add('error');
        return;
      }

      if (!email) {
        status.textContent = 'No email configured in data.js.';
        status.classList.add('error');
        return;
      }

      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

      status.classList.remove('error');
      status.textContent = 'Opening your email client…';
      form.reset();
      setTimeout(() => (status.textContent = ''), 4000);
    });
  }

  /* ============================================================
     NAVBAR BEHAVIOUR
     ============================================================ */
  function initNavbar() {
    const navbar = $('#navbar');
    const menuToggle = $('#menuToggle');
    const navLinks = $('#navLinks');
    const links = $$('.nav-link');
    const toTop = $('#toTop');

    const onScroll = () => {
      const y = window.scrollY;
      navbar?.classList.toggle('scrolled', y > 20);
      toTop?.classList.toggle('visible', y > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    menuToggle?.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    links.forEach((l) =>
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
      })
    );

    // Active link on scroll
    const sections = $$('#mainView section[id]');
    if (sections.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              links.forEach((l) =>
                l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
              );
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      sections.forEach((s) => io.observe(s));
    }

    toTop?.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ============================================================
     HASH ROUTING — #project=<id>  ↔  normal view
     ============================================================ */
  function renderProjectDetail(id) {
    const container = $('#projectDetail');
    const items = P.projects?.items || [];
    const p = items.find((x) => x.id === id);

    if (!p) {
      container.innerHTML = `
        <div class="not-found">
          <h2>Project not found</h2>
          <p>The project "<code>${esc(id)}</code>" doesn't exist.</p>
          <a class="btn btn-primary" href="#projects">Back to Projects</a>
        </div>`;
      return;
    }

    const tech = (p.tech || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    const challenges = (p.challenges || []).map((c) => `<li>${esc(c)}</li>`).join('');
    const improvements = (p.improvements || []).map((c) => `<li>${esc(c)}</li>`).join('');

    container.innerHTML = `
      <header class="pd-header">
        <h1>${esc(p.name || '')}</h1>
        <p class="section-sub">${esc(p.shortDescription || '')}</p>
      </header>

      <div class="pd-image">
        <img src="${esc(p.image || '')}" alt="${esc(p.name || '')}"
             onerror="this.onerror=null;this.src='${placeholderImage(p.name || 'Project')}'" />
      </div>

      <div class="pd-actions">
        ${p.liveLink ? `<a class="btn btn-primary" href="${esc(p.liveLink)}" target="_blank" rel="noopener">Live Demo</a>` : ''}
        ${p.githubLink ? `<a class="btn btn-ghost" href="${esc(p.githubLink)}" target="_blank" rel="noopener">GitHub Repo</a>` : ''}
      </div>

      <div class="pd-grid">
        <div>
          <section class="pd-block">
            <h2>Description</h2>
            <p>${esc(p.description || p.shortDescription || '')}</p>
          </section>

          ${challenges ? `
            <section class="pd-block">
              <h2>Challenges Faced</h2>
              <ul class="pd-list">${challenges}</ul>
            </section>` : ''}

          ${improvements ? `
            <section class="pd-block">
              <h2>Future Improvements</h2>
              <ul class="pd-list">${improvements}</ul>
            </section>` : ''}
        </div>

        <aside class="pd-side">
          <h3>Tech Stack</h3>
          <div class="project-tech">${tech || '<span class="tag">N/A</span>'}</div>
        </aside>
      </div>
    `;
  }

  function handleRoute() {
    const hash = window.location.hash || '';
    const mainView = $('#mainView');
    const detailView = $('#detailView');

    const match = hash.match(/^#project=(.+)$/);

    if (match) {
      const id = decodeURIComponent(match[1]);
      renderProjectDetail(id);
      mainView.hidden = true;
      detailView.hidden = false;
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      const wasDetail = !detailView.hidden;
      mainView.hidden = false;
      detailView.hidden = true;

      if (wasDetail && hash && hash.startsWith('#')) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          requestAnimationFrame(() =>
            target.scrollIntoView({ behavior: 'auto', block: 'start' })
          );
          return;
        }
      }

      if (wasDetail) {
        const projects = document.getElementById('projects');
        if (projects) {
          requestAnimationFrame(() =>
            projects.scrollIntoView({ behavior: 'auto', block: 'start' })
          );
        }
      }
    }
  }

  /* ============================================================
     MISC
     ============================================================ */
  function setYear() {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    if (!window.PORTFOLIO_DATA) {
      document.body.insertAdjacentHTML(
        'afterbegin',
        '<div style="padding:14px;background:#fee;color:#900;text-align:center;font-family:sans-serif">' +
        '<strong>data.js not found.</strong> Make sure <code>data.js</code> is in the same folder and loaded before <code>script.js</code>.</div>'
      );
      return;
    }

    initTheme();
    bindThemeToggle();   /* ← THE FIX: this line was missing */
    applyMeta();
    fillConfigNodes();
    fillHero();
    renderSocial();
    renderAbout();
    renderSkills();
    renderEducation();
    renderExperience();
    renderProjects();
    renderSectionHeaders();
    initContact();
    initNavbar();
    setYear();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();