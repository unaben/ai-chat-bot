export const personalData = {
  name: "Benedict Unachukwu",
  fullName: "Onyeka Benedict Unachukwu",
  location: "Birmingham, West Midlands, UK",
  occupation: "Senior Software Developer",
  company: "N Brown Group",
  yearsOfExperience: 5,

  professionalSummary:
    "Software developer with over five years of commercial experience building React and Next.js applications. " +
    "Helped take a regulated consumer credit platform from architecture to production MVP, owning payment, credit limit " +
    "and Direct Debit journeys, setting frontend standards and testing practice, and mentoring engineers. " +
    "Experienced in TypeScript, accessible interfaces (WCAG), automated testing (Jest, React Testing Library, Cypress) " +
    "and working closely with product, design and backend teams.",

  skills: {
    languages: [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Java (currently training)",
    ],
    frameworksAndLibraries: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "RTK Query",
      "Context API",
      "React Router",
      "Storybook",
    ],
    testing: [
      "Jest",
      "Vitest",
      "React Testing Library",
      "MSW",
      "Cypress",
      "TDD",
      "BDD",
    ],
    styling: [
      "CSS Modules",
      "Sass/Less",
      "Styled Components",
      "Emotion",
      "Material-UI",
      "Ant Design",
      "Bootstrap 5",
    ],
    apisAndData: [
      "RESTful APIs",
      "GraphQL (Apollo Client, Relay)",
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Node.js",
      "Express",
    ],
    cms: ["Strapi", "Amplience"],
    toolsAndPractices: [
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "GitHub Actions",
      "GitLab CI/CD",
      "Docker (basic)",
      "Agile/Scrum",
      "WCAG accessibility",
    ],
  },

  workHistory: [
    {
      title: "Mentor and Developer Training (Independent)",
      company: "Self-directed",
      location: "Remote",
      period: "07/2026 – Present",
      highlights: [
        "Mentoring a computer science graduate in practical JavaScript, HTML and CSS, focusing on building real projects.",
        "Coached a relative preparing for university entry on responsive design and asynchronous (AJAX) API calls, helping them pass their technical assessment.",
        "Created a tutor profile on Superprof to offer web development tuition covering HTML, CSS, JavaScript, React, Next.js, TypeScript and Node.js.",
        "Volunteer mentor with Code Your Future (10/2026 – Present), supporting trainees in JavaScript across frontend and backend.",
        "Undertaking Java training with Code Your Future (10/2026 – Present), broadening back-end skills.",
        "Built and shipped personal projects, including Next.js, TypeScript and Supabase applications and an AI chatbot using the Vercel AI SDK and Gemini.",
      ],
    },
    {
      title: "Senior Software Developer",
      company: "N Brown Group",
      location: "Manchester",
      period: "06/2023 – 06/2026",
      note: "Promoted to Senior in 06/2025",
      highlights: [
        "Helped define and deliver the frontend architecture for Miyo, a greenfield consumer credit self-service platform in a regulated financial environment, taking it from early design to a production MVP covering credit applications, payments, credit limit management, statements and transactions, and Direct Debit set-up.",
        "Set up a Next.js application and a shared React component library from scratch, with documented coding standards, project structure and testing approach.",
        "Documented the trade-offs for state management (RTK Query versus alternatives) and for rendering strategy (SSR versus CSR in Next.js), shaping the production architecture.",
        "Optimised key customer journeys by reducing unnecessary re-renders, improving data fetching, and choosing SSR or CSR for each page based on need.",
        "Owned payment, credit limit and Direct Debit journeys end to end, including mandate creation, update and cancellation. Added API-driven eligibility checks and bank-detail verification.",
        "Integrated Checkout.com payments, GraphQL APIs, AWS DynamoDB-backed services and Amplience CMS content. Implemented authentication and session management with NextAuth.",
        "Built accessibility from the start, working to WCAG standards and testing key journeys with screen readers and other assistive technologies. Found and fixed keyboard focus-management defects in a shared UI library component, resolving the issue across four applications.",
        "Introduced a 'UX Review' column on the Jira board where QA, UX and the Product Owner reviewed each feature on a GitLab pipeline-generated feature deployment URL before code review.",
        "Extended the team's mock API service by adding endpoints from API documentation for payments, Direct Debit, statements, credit limit and cards, including 200, 202, 404 and 500 responses.",
        "Defined the frontend testing strategy and wrote unit, integration and Cypress tests, maintaining over 80% code coverage across both repositories.",
        "Mentored an associate developer with no JavaScript or React background through to a promotion to Junior Developer in 2025.",
        "Guided senior Java and Python engineers in frontend development, and coached a QA tester in Cypress test automation.",
        "Led a spike into Amplience GraphQL content delivery and worked with an Amplience engineer to debug a silent failure caused by schema name collisions.",
      ],
    },
    {
      title: "Front-end Developer",
      company: "Preservica Ltd",
      location: "Abingdon, Oxfordshire",
      period: "02/2022 – 03/2023",
      highlights: [
        "Delivered sprint features for production React applications consistently within agreed timelines over a 13-month engagement.",
        "Built responsive, accessible interfaces (HTML5, CSS Grid, Flexbox, Bootstrap, Material UI) and reusable React components that joined a shared component library.",
        "Managed shared and asynchronous states with React Context, RTK Query and RxJS.",
        "Wrote Jest, React Testing Library and Vitest tests that improved release stability.",
        "Worked in an Agile/Scrum team and collaborated with UX designers to resolve usability issues.",
      ],
    },
    {
      title: "Junior Software Developer",
      company: "Sinnergy Ltd",
      location: "Birmingham, West Midlands",
      period: "05/2020 – 02/2022",
      highlights: [
        "Built responsive interfaces and reusable React components using HTML5, CSS Grid, Flexbox, Bootstrap and Material UI.",
        "Implemented client-side routing with React Router and managed shared state with the Context API.",
        "Worked with SQL databases to support application data needs.",
      ],
    },
    {
      title: "Project Coordinator",
      company: "Sinnergy Ltd",
      location: "Birmingham, West Midlands",
      period: "03/2017 – 04/2020",
      highlights: [
        "Defined scope, deadlines and budgets with project teams.",
        "Kept clients and stakeholders informed and analysed data to identify operational improvements.",
      ],
    },
    {
      title: "Export Specialist",
      company: "Self-employed",
      location: "Birmingham, West Midlands",
      period: "11/2015 – 01/2017",
      highlights: [
        "Established and ran an import/export business covering food, machinery and used vehicles across the UK, EU and West Africa.",
      ],
    },
  ],

  education: [
    {
      qualification: "Software Engineer (full stack developer)",
      institution: "Boolean UK",
      location: "London",
      completed: "06/2021",
    },
    {
      qualification: "Level 3 Diploma in IT (QCF), Distinction",
      institution: "Netcom-Birmingham",
      location: "Birmingham",
      completed: "02/2019",
    },
    {
      qualification: "BSc Industrial Chemistry (2:1)",
      institution: "University of Nigeria Nsukka",
      location: "Nigeria",
      completed: "07/2004",
    },
  ],

  currentProjects: [
    "Personal AI chatbot (Next.js, Vercel AI SDK, Gemini 2.5 Flash)",
    "Full-stack apps with Supabase and Next.js",
  ],

  contact: {
    email: "unaben@yahoo.com",
    phone: "07453973039",
    github: "https://github.com/unaben",
    linkedin:
      "https://www.linkedin.com/in/onyeka-benedict-unachukwu-8a8443212/",
    portfolio: "https://benedict-unachukwu.vercel.app",
  },
};
