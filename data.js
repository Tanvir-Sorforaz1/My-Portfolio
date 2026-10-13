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
    title: "Tanvir Sorforaz — Full-stack Developer",
    description: "Personal portfolio of Tanvir Sorforaz, a Full-stack Developer based in Dhaka.",
    defaultTheme: "light"   // "light" or "dark"
  },

  /* ───────────────────────── PERSONAL ───────────────────────── */
  personal: {
    name: "Tanvir Sorforaz",
    designation: "Full-stack Developer",
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
    email: "tsorforaz@example.com",
    phone: "+8801778751423",
    whatsapp: "+8801778751423"
  },

  /* ───────────────────────── SOCIAL ─────────────────────────── */
  /* Recognized icon names: github, linkedin, twitter, facebook */
  social: [
    { name: "github",   label: "GitHub",   url: "https://github.com/Tanvir-Sorforaz" },
    { name: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/tanvir-sorforaz" },
    { name: "twitter",  label: "Twitter",  url: "https://x.com/Tanvir_SF_" },
    { name: "facebook", label: "Facebook", url: "https://www.facebook.com/Tanvir.Sorforaz" }
  ],

  /* ───────────────────────── ABOUT ──────────────────────────── */
  about: {
    tag: "05 — About",
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
    tag: "01 — Skills",
    heading: "Skills & Technologies",
    categories: [
      {
        name: "Languages",
        items: ["C", "C++", "Python", "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"]
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
        name: "Backend & Databases",
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
        period: "2023 — Running",
        degree: "B.Sc. in Computer Science & Engineering",
        institution: "Faridpur Engineering College",
        location: "Dhaka, Bangladesh",
        description: "Focused on web technologies, algorithms, and software engineering. CGPA: 3.3/4.0.",
        tags: ["Algorithms", "Competitive Programming", "Web Development", "Databases"]
      },
      {
        period: "2020 — 2022",
        degree: "Higher Secondary Certificate (HSC) — Science",
        institution: "Rajshahi Government City College",
        location: "Rajshahi, Bangladesh",
        description: "Studied Physics, Chemistry, and Mathematics. GPA: 5.00/5.00.",
        tags: ["Science", "Mathematics"]
      }
    ]
  },

  /* ─────────────────────── EXPERIENCE ───────────────────────── */
  experience: {
    tag: "04 — Experience",
    heading: "Work Experience",
    items: [
      {
        type: "Currently",
        company: "Open to opportunities",
        period: "Present",
        location: "Dhaka, Bangladesh",
        roles: [
          {
            title: "Aspiring Full-stack Developer",
            duration: "Present",
            bullets: [
              "Actively looking for my <span class=\"hl\">first junior full-stack role</span> or internship.",
              "Building personal projects with <span class=\"hl\">HTML, CSS, JavaScript, and Node.js</span> to grow my skills.",
              "Learning in public — sharing progress and code on <span class=\"hl\">GitHub</span> and Twitter.",
              "<span class=\"hl\">Replace this card</span> with your first job when you get one."
            ]
          }
        ]
      },
      {
        type: "Learning",
        company: "Self-taught journey",
        period: "2023 — Present",
        location: "Remote",
        roles: [
          {
            title: "Full-stack Development",
            duration: "Ongoing",
            bullets: [
              "Completed <span class=\"hl\">300+ hours</span> of hands-on practice in HTML, CSS, and JavaScript.",
              "Followed <span class=\"hl\">The Odin Project</span> and <span class=\"hl\">FreeCodeCamp</span> curricula.",
              "Rebuilt 10+ real-world UI components to study layout and interaction patterns.",
              "Published all work on GitHub and deployed live demos on Vercel."
            ]
          }
        ]
      }
    ]
  },

  /* ──────────────────────── PROJECTS ────────────────────────── */
  projects: {
    tag: "02 — Projects",
    heading: "Featured Projects",
    subheading: "A few things I've built recently.",
    items: [
        {
        id: "mangomart",
        name: "MangoMart — E-commerce Store",
        image: "images/project-3.jpg",
        tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        shortDescription: "A modern e-commerce store with cart, checkout, and order tracking.",
        description: "MangoMart is a full e-commerce storefront focused on selling fresh mangoes and related products. It includes a product catalog with categories and search, a persistent cart, a streamlined checkout, and an order history page. The design emphasizes product imagery and clear pricing, and the site is optimized for both desktop and mobile shoppers.",
        liveLink: "https://mango-mart.vercel.app",
        githubLink: "https://github.com/Tanvir-Sorforaz/MangoMart",
        challenges: [
          "Keeping the <span class=\"hl\">cart in sync across tabs and page reloads</span> without relying on a heavy state library.",
          "Optimizing product images for fast loading on mobile without losing visual quality.",
          "Designing a checkout flow that reduces friction — fewer fields, clear error messages, and no surprise steps.",
          "Structuring product and order data so adding new categories later doesn't require schema changes."
        ],
        improvements: [
          "Integrate a real payment gateway (Stripe / bKash / SSLCommerz).",
          "Add product reviews and ratings with photo uploads.",
          "Build an admin panel for managing inventory and orders.",
          "Add wishlist, coupons, and order tracking with delivery status."
        ]
      },
      {
        id: "fixitnow",
        name: "FixItNow — Home Services Platform",
        image: "images/project-1.jpg",
        tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        shortDescription: "A full-stack platform to book verified home-service technicians on demand.",
        description: "FixItNow connects users with verified technicians for common household services like plumbing, electrical work, cleaning, and appliance repair. Users can browse services, view technician profiles, pick a time slot, and book in a few taps. The backend handles booking workflows, technician assignment, and status updates, while the frontend delivers a smooth, mobile-first booking experience.",
        liveLink: "https://fixitnow-frontend-yp2h.onrender.com/",
        githubLink: "https://github.com/Tanvir-Sorforaz/FixItNow",
        challenges: [
          "Designing a booking flow that prevents <span class=\"hl\">double-booking the same technician</span> across overlapping time slots.",
          "Structuring MongoDB schemas for services, technicians, and bookings without deep nesting that hurt query performance.",
          "Handling <span class=\"hl\">slow cold starts on Render's free tier</span> with loading skeletons and optimistic UI so the app still feels responsive.",
          "Keeping the booking form accessible and mobile-friendly across small screens."
        ],
        improvements: [
          "Add real-time chat between users and technicians using Socket.io.",
          "Integrate online payments (Stripe or SSLCommerz) with refund handling.",
          "Build an admin dashboard for managing technicians, services, and dispute resolution.",
          "Add push notifications for booking confirmations and reminders."
        ]
      },
      {
        id: "hourbooking",
        name: "Hour Booking Platform",
        image: "images/project-2.jpg",
        tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        shortDescription: "Book services, rooms, or consultations by the hour with live slot availability.",
        description: "Hour Booking Platform lets users reserve services or spaces on an hourly basis. Users see live availability, select a duration, and confirm a slot. The system prevents overlapping reservations, tracks booking history, and gives each user a personal dashboard to manage upcoming and past bookings. Designed with a clean calendar interface and clear pricing so users always know what they're paying for.",
        liveLink: "https://hour-booking-platform.vercel.app",
        githubLink: "https://github.com/Tanvir-Sorforaz1/Hour-Booking-Platform",
        challenges: [
          "Preventing <span class=\"hl\">race conditions</span> when two users try to book the same slot at the same time.",
          "Building a reusable calendar component that handles time zones, disabled dates, and dynamic pricing without a heavy library.",
          "Managing form state across a multi-step booking flow without losing user input on back navigation.",
          "Deploying on Vercel with separate frontend and backend origins while keeping CORS and cookies secure."
        ],
        improvements: [
          "Add recurring bookings and subscription-style reservations.",
          "Introduce a review system for services after completion.",
          "Add SMS or email reminders 30 minutes before each booking.",
          "Build an analytics dashboard for service providers."
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