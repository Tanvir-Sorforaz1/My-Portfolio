/* ============================================================
   PORTFOLIO DATA
   ------------------------------------------------------------
   Edit ONLY the values inside window.PORTFOLIO_DATA below.
   Anything wrapped in {curlyBraces} is auto-replaced with the
   matching field from this file (e.g. {name} → your name).
   ============================================================ */

window.PORTFOLIO_DATA = {

  /* ─────────────────────────── SITE ─────────────────────────── */
  site: {
    title: "John Doe — Frontend Developer",
    description: "Personal portfolio of John Doe, a Frontend Developer based in Dhaka.",
    defaultTheme: "light"   // "light" or "dark"
  },

  /* ───────────────────────── PERSONAL ───────────────────────── */
  personal: {
    name: "John Doe",
    designation: "Frontend Developer",
    tagline: "I build clean, fast, and accessible web experiences.",
    greeting: "Hi, I'm {name}",
    profileImage: "images/profile.jpg",
    resumeUrl: "resume/resume.pdf",
    location: "Dhaka, Bangladesh",
    availability: {
      available: true,
      label: "Available for freelance"
    }
  },

  /* ───────────────────────── CONTACT ────────────────────────── */
  contact: {
    email: "john.doe@example.com",
    phone: "+8801700000000",
    whatsapp: "+8801700000000"
  },

  /* ───────────────────────── SOCIAL ─────────────────────────── */
  /* Recognized icon names: github, linkedin, twitter, facebook */
  social: [
    { name: "github",   label: "GitHub",   url: "https://github.com/johndoe" },
    { name: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
    { name: "twitter",  label: "Twitter",  url: "https://twitter.com/johndoe" },
    { name: "facebook", label: "Facebook", url: "https://facebook.com/johndoe" }
  ],

  /* ───────────────────────── ABOUT ──────────────────────────── */
  about: {
    tag: "01 — About",
    heading: "About Me",
    paragraphs: [
      "Hi, I'm <strong>{name}</strong> — a passionate <span class=\"accent\">{designation}</span> who loves turning ideas into pixel-perfect, performant, and accessible web experiences.",
      "My journey started with a curiosity about how websites work. What began as small HTML/CSS experiments soon grew into building full-stack side projects. I enjoy the whole process: sketching layouts, writing clean code, and shipping things that real people use.",
      "Outside of coding, you'll find me sketching, reading sci-fi, or out on a long evening run. I believe good products come from curious minds — and a lot of coffee."
    ],
    /* Each row can either use "source" to pull from elsewhere in this file,
       or "value" for a literal string. "link" makes it clickable. */
    meta: [
      { label: "Name",     source: "personal.name" },
      { label: "Role",     source: "personal.designation" },
      { label: "Location", source: "personal.location" },
      { label: "Email",    source: "contact.email", link: "mailto" },
      { label: "Freelance", value: "Available", class: "text-success" }
    ]
  },

  /* ───────────────────────── SKILLS ─────────────────────────── */
  skills: {
    tag: "02 — Skills",
    heading: "Skills & Technologies",
    categories: [
      {
        name: "Languages",
        items: ["HTML5", "CSS3 / Sass", "JavaScript (ES6+)", "TypeScript"]
      },
      {
        name: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Responsive Design"]
      },
      {
        name: "Tools",
        items: ["Git & GitHub", "Vite / Webpack", "Figma", "REST APIs"]
      },
      {
        name: "Backend Basics",
        items: ["Node.js", "Express", "MongoDB", "PostgreSQL"]
      }
    ]
  },

  /* ─────────────────────── EDUCATION ────────────────────────── */
  education: {
    tag: "03 — Education",
    heading: "Educational Qualification",
    items: [
      {
        period: "2021 — 2025",
        degree: "B.Sc. in Computer Science & Engineering",
        institution: "University of Dhaka",
        location: "Dhaka, Bangladesh",
        description: "Focused on web technologies, algorithms, and software engineering. CGPA: 3.7/4.0.",
        tags: ["Algorithms", "Web Development", "Databases"]
      },
      {
        period: "2018 — 2020",
        degree: "Higher Secondary Certificate (HSC) — Science",
        institution: "Notre Dame College",
        location: "Dhaka, Bangladesh",
        description: "Studied Physics, Chemistry, and Mathematics. GPA: 5.00/5.00.",
        tags: ["Science", "Mathematics"]
      }
    ]
  },

  /* ─────────────────────── EXPERIENCE ───────────────────────── */
  experience: {
    tag: "04 — Experience",
    heading: "Work Experience",
    /* Each company can have multiple roles under "roles". */
    items: [
      {
        type: "Full Time",
        company: "Acme Web Studio",
        period: "Jan 2024 — Present",
        location: "Remote",
        roles: [
          {
            title: "Junior Frontend Developer",
            project: "Dashly Analytics",
            duration: "Jan 2024 — Present",
            bullets: [
              "<span class=\"hl\">Built and shipped 20+ reusable UI components</span> with vanilla JS and React, cutting feature delivery time by ~30%.",
              "Collaborated with design to translate Figma into <span class=\"hl\">pixel-perfect, accessible interfaces</span> (WCAG AA) used by 40K+ monthly users.",
              "Improved Lighthouse performance score from <span class=\"hl\">68 → 96</span> by lazy-loading assets and code-splitting routes."
            ]
          }
        ]
      },
      {
        type: "Internship",
        company: "StartUp Hub",
        period: "Jun 2023 — Dec 2023",
        location: "Dhaka, Bangladesh",
        roles: [
          {
            title: "Frontend Intern",
            project: "SaaS Dashboard",
            duration: "Jun 2023 — Dec 2023",
            bullets: [
              "Converted <span class=\"hl\">15+ Figma screens</span> into production-ready HTML/CSS/JS.",
              "Wrote reusable CSS utility classes adopted across 3 internal projects.",
              "Fixed <span class=\"hl\">40+ accessibility issues</span> and shipped an audit-ready component library."
            ]
          }
        ]
      }
    ]
  },

  /* ──────────────────────── PROJECTS ────────────────────────── */
  projects: {
    tag: "05 — Projects",
    heading: "Featured Projects",
    subheading: "A few things I've built recently.",
    items: [
      {
        id: "taskflow",
        name: "TaskFlow — Kanban Board",
        image: "images/project-1.jpg",
        tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
        shortDescription: "A drag-and-drop Kanban board with offline persistence and dark mode.",
        description: "TaskFlow is a lightweight Kanban board that helps you organize tasks across 'To Do', 'In Progress', and 'Done' columns. It persists state in localStorage and supports keyboard navigation and dark mode.",
        liveLink: "https://example.com/taskflow",
        githubLink: "https://github.com/johndoe/taskflow",
        challenges: [
          "Implementing smooth drag-and-drop without a library while keeping accessibility intact.",
          "Preventing data loss when users refresh mid-drag by debouncing writes to localStorage.",
          "Building a responsive layout that collapses columns into tabs on mobile."
        ],
        improvements: [
          "Add multi-board support with a board switcher.",
          "Introduce real-time sync using WebSockets or a lightweight backend.",
          "Add labels, due dates, and reminders."
        ]
      },
      {
        id: "weatherlens",
        name: "WeatherLens",
        image: "images/project-2.jpg",
        tech: ["JavaScript", "Fetch API", "Chart.js", "CSS Grid"],
        shortDescription: "A weather dashboard with a 7-day forecast and interactive charts.",
        description: "WeatherLens fetches live weather data from OpenWeatherMap and visualizes temperature and humidity trends with Chart.js. Users can search any city, save favorites, and switch between metric and imperial units.",
        liveLink: "https://example.com/weatherlens",
        githubLink: "https://github.com/johndoe/weatherlens",
        challenges: [
          "Rate-limiting and caching API responses to stay within the free tier.",
          "Handling empty/error states gracefully when a city name is misspelled.",
          "Rendering responsive charts that work well on small screens."
        ],
        improvements: [
          "Add geolocation-based auto-detect for first-time visitors.",
          "Provide severe-weather alerts via the browser Notification API.",
          "Cache data in IndexedDB for offline use."
        ]
      },
      {
        id: "devquiz",
        name: "DevQuiz",
        image: "images/project-3.jpg",
        tech: ["HTML", "CSS", "JavaScript", "JSON"],
        shortDescription: "A quiz app for developers with instant feedback and score history.",
        description: "DevQuiz presents multiple-choice questions on HTML, CSS, JS, and general web concepts. It gives instant feedback with explanations, tracks your score history in localStorage, and supports a timed mode.",
        liveLink: "https://example.com/devquiz",
        githubLink: "https://github.com/johndoe/devquiz",
        challenges: [
          "Designing a fair scoring system that accounts for question difficulty.",
          "Managing timer state across tab switching without desyncing.",
          "Structuring question data so contributors can easily add more."
        ],
        improvements: [
          "Add user accounts and leaderboards with a server.",
          "Generate questions dynamically from a curated API.",
          "Add a 'study mode' that shows explanations first."
        ]
      }
    ]
  },

  /* ─────────────────────── CONTACT SECTION ──────────────────── */
  contactSection: {
    tag: "06 — Contact",
    heading: "Get In Touch",
    subheading: "Have a project in mind or just want to say hi? My inbox is open."
  },

  /* ─────────────────────────── FOOTER ───────────────────────── */
  footer: {
    credit: "Built with HTML, CSS & JavaScript."
  }
};