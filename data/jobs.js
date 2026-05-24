// HireWave - Mock job postings dataset
// In a real app this would come from an API. Each job has enough detail
// to render a realistic full Job Description (JD) page.

const JOBS = [
  {
    id: "hw-1001",
    title: "Senior Frontend Engineer",
    company: "Lumen Labs",
    companyTag: "Series B  Product",
    logoColor: "#6366f1",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 4, max: 7 },
    salary: { min: 28, max: 45, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 2,
    applicants: 142,
    featured: true,
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "GraphQL"],
    summary:
      "Lead the design system rebuild and ship pixel-perfect, accessible UI for our analytics platform used by 50k+ users.",
    about:
      "Lumen Labs builds developer-first analytics tooling for modern data teams. We are a Series B company backed by top-tier VCs, with engineers across Bengaluru, Berlin, and SF.",
    responsibilities: [
      "Own large frontend initiatives end-to-end, from RFC to rollout.",
      "Architect reusable components and contribute to our internal design system.",
      "Partner with design and product to ship delightful, accessible experiences.",
      "Mentor mid-level engineers via code review and pairing sessions.",
      "Drive frontend performance budgets and Core Web Vitals improvements."
    ],
    requirements: [
      "4+ years building production React applications at scale.",
      "Strong TypeScript fundamentals and component design intuition.",
      "Experience with Next.js, server components, and modern build tooling.",
      "Solid grasp of accessibility (WCAG) and performance optimization.",
      "Comfort working with REST and GraphQL APIs."
    ],
    niceToHave: [
      "Open-source contributions or a portfolio of public work.",
      "Experience with data visualization libraries (D3, visx).",
      "Exposure to design tooling (Figma, Storybook)."
    ],
    benefits: [
      "ESOPs with a transparent vesting plan",
      "Top-tier health insurance for you and dependents",
      "Annual learning stipend (1.5L)",
      "Home office setup budget",
      "Flexible hybrid policy"
    ]
  },
  {
    id: "hw-1002",
    title: "Backend Engineer  Payments",
    company: "Northwind Pay",
    companyTag: "Fintech  Series C",
    logoColor: "#0ea5e9",
    location: "Remote (India)",
    workMode: "Remote",
    type: "Full-time",
    experience: { min: 3, max: 6 },
    salary: { min: 25, max: 40, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 5,
    applicants: 318,
    featured: true,
    skills: ["Go", "PostgreSQL", "Kafka", "AWS", "gRPC"],
    summary:
      "Design and build the next generation of our payments orchestration platform processing $4B+ in annual TPV.",
    about:
      "Northwind Pay powers checkout, payouts, and reconciliation for hundreds of D2C brands and marketplaces across APAC.",
    responsibilities: [
      "Design highly available services that move money safely and idempotently.",
      "Own service-level SLOs and contribute to on-call rotations.",
      "Collaborate with product on new payment rails and partner integrations.",
      "Drive code quality through reviews, RFCs, and architectural decisions."
    ],
    requirements: [
      "3+ years building backend systems in Go, Java, or similar.",
      "Deep understanding of relational databases and transactional integrity.",
      "Experience with event-driven architectures (Kafka / SQS / NATS).",
      "Comfort operating production services on AWS or GCP."
    ],
    niceToHave: [
      "Prior fintech / payments experience.",
      "Knowledge of double-entry ledgers or reconciliation systems."
    ],
    benefits: [
      "Fully remote with quarterly offsites",
      "Stock options",
      "Health + mental wellness coverage",
      "Workstation budget",
      "Unlimited learning budget"
    ]
  },
  {
    id: "hw-1003",
    title: "Product Designer (Senior)",
    company: "Cobalt Studio",
    companyTag: "Design-led SaaS",
    logoColor: "#8b5cf6",
    location: "Mumbai, India",
    workMode: "Onsite",
    type: "Full-time",
    experience: { min: 4, max: 8 },
    salary: { min: 22, max: 38, currency: "LPA" },
    department: "Design",
    postedDaysAgo: 1,
    applicants: 87,
    featured: false,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    summary:
      "Shape the end-to-end product experience for our flagship CRM used by 300+ enterprise teams.",
    about:
      "Cobalt Studio is a design-first SaaS company building modern collaboration tools for go-to-market teams.",
    responsibilities: [
      "Lead design for one of our core product surfaces.",
      "Run discovery, research, and rapid prototyping cycles.",
      "Partner closely with PM and engineering throughout delivery.",
      "Evolve our design system and contribute reusable patterns."
    ],
    requirements: [
      "4+ years designing complex B2B SaaS products.",
      "Strong portfolio showing systems thinking and craft.",
      "Comfort facilitating workshops and presenting to leadership.",
      "Fluency in Figma and modern prototyping tools."
    ],
    niceToHave: [
      "Experience designing for data-heavy interfaces.",
      "Some HTML/CSS literacy."
    ],
    benefits: [
      "Beautiful office in Bandra Kurla Complex",
      "ESOPs",
      "Conference + learning budget",
      "Health insurance for family"
    ]
  },
  {
    id: "hw-1004",
    title: "Data Scientist  ML Platform",
    company: "Veritas AI",
    companyTag: "AI  Early Stage",
    logoColor: "#10b981",
    location: "Hyderabad, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 2, max: 5 },
    salary: { min: 20, max: 35, currency: "LPA" },
    department: "Data & ML",
    postedDaysAgo: 3,
    applicants: 211,
    featured: false,
    skills: ["Python", "PyTorch", "MLOps", "SQL", "Airflow"],
    summary:
      "Build and productionize ML models powering risk scoring and personalization for our fintech customers.",
    about:
      "Veritas AI builds ML infrastructure for regulated industries  banks, insurers, and healthcare providers.",
    responsibilities: [
      "Build, train, and evaluate ML models from prototype to production.",
      "Own feature pipelines and contribute to our feature store.",
      "Partner with engineering on model serving and observability.",
      "Communicate findings and trade-offs clearly to non-technical stakeholders."
    ],
    requirements: [
      "2+ years applied ML experience with measurable production impact.",
      "Strong Python and SQL skills.",
      "Familiarity with PyTorch or TensorFlow.",
      "Experience with one of: Airflow, Kubeflow, MLflow."
    ],
    niceToHave: [
      "Publications or open-source contributions.",
      "Experience working with regulated data (PCI, HIPAA)."
    ],
    benefits: [
      "GPU credits for personal experimentation",
      "Hybrid work policy",
      "Health insurance",
      "Annual offsite"
    ]
  },
  {
    id: "hw-1005",
    title: "DevOps / SRE Engineer",
    company: "Stratus Cloud",
    companyTag: "Infra  Profitable",
    logoColor: "#f59e0b",
    location: "Pune, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 3, max: 7 },
    salary: { min: 24, max: 42, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 7,
    applicants: 156,
    featured: false,
    skills: ["Kubernetes", "Terraform", "AWS", "Prometheus", "Linux"],
    summary:
      "Keep our multi-region Kubernetes platform humming and help product teams ship safely 30+ times a day.",
    about:
      "Stratus Cloud runs developer infrastructure for high-growth tech companies. We are profitable, bootstrapped, and proudly engineering-led.",
    responsibilities: [
      "Operate and evolve our Kubernetes-based platform across multiple regions.",
      "Own observability, incident response, and post-mortems.",
      "Build internal tooling that empowers product engineers.",
      "Drive cost and reliability improvements across the stack."
    ],
    requirements: [
      "3+ years operating production Kubernetes at scale.",
      "Strong Linux fundamentals and infra-as-code experience.",
      "Familiarity with Prometheus, Grafana, and modern observability stacks.",
      "Calm under pressure during incidents."
    ],
    niceToHave: [
      "Experience with service meshes (Istio, Linkerd).",
      "Contributions to open-source infra projects."
    ],
    benefits: [
      "On-call compensation",
      "Health insurance",
      "Conference + certification budget",
      "Hybrid policy with home setup budget"
    ]
  },
  {
    id: "hw-1006",
    title: "Product Manager  Growth",
    company: "Quill",
    companyTag: "Consumer  Series A",
    logoColor: "#ef4444",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 3, max: 6 },
    salary: { min: 30, max: 48, currency: "LPA" },
    department: "Product",
    postedDaysAgo: 4,
    applicants: 264,
    featured: true,
    skills: ["Growth", "A/B Testing", "SQL", "Analytics", "Funnels"],
    summary:
      "Own the activation and retention loops for our consumer reading app with 3M+ MAUs.",
    about:
      "Quill is a beloved consumer reading app helping millions build a daily reading habit. We are a Series A company with a small, senior team.",
    responsibilities: [
      "Own the activation and retention KPIs end-to-end.",
      "Run high-velocity experiments across onboarding, notifications, and pricing.",
      "Define product strategy in collaboration with design and engineering.",
      "Develop deep customer empathy through interviews and data."
    ],
    requirements: [
      "3+ years as a PM, ideally on growth or consumer products.",
      "Strong SQL and analytics chops; comfortable with experimentation.",
      "Excellent written communication and prioritization.",
      "Bias to action and product taste."
    ],
    niceToHave: [
      "Experience with subscription / freemium business models.",
      "Background in engineering or design."
    ],
    benefits: [
      "ESOPs",
      "Generous parental leave",
      "Books budget (yes, really)",
      "Health insurance"
    ]
  },
  {
    id: "hw-1007",
    title: "Mobile Engineer (iOS)",
    company: "Halo Health",
    companyTag: "HealthTech",
    logoColor: "#14b8a6",
    location: "Remote (India)",
    workMode: "Remote",
    type: "Full-time",
    experience: { min: 2, max: 5 },
    salary: { min: 18, max: 32, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 6,
    applicants: 98,
    featured: false,
    skills: ["Swift", "SwiftUI", "Combine", "iOS", "REST"],
    summary:
      "Build delightful iOS experiences for patients and clinicians on our digital health platform.",
    about:
      "Halo Health is reimagining primary care with a mobile-first model. We serve thousands of patients across India.",
    responsibilities: [
      "Ship features end-to-end on our iOS app.",
      "Collaborate with backend on API design.",
      "Maintain high quality through tests and code review.",
      "Champion mobile UX patterns and accessibility."
    ],
    requirements: [
      "2+ years building production iOS apps.",
      "Strong Swift and SwiftUI fundamentals.",
      "Comfort with networking, persistence, and concurrency.",
      "Care for craft, accessibility, and user experience."
    ],
    niceToHave: [
      "Experience with HealthKit.",
      "Cross-platform exposure (Android / Flutter)."
    ],
    benefits: [
      "Fully remote",
      "Health insurance for family",
      "Annual offsite",
      "Device + workstation budget"
    ]
  },
  {
    id: "hw-1008",
    title: "Engineering Manager  Platform",
    company: "Lumen Labs",
    companyTag: "Series B  Product",
    logoColor: "#6366f1",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 7, max: 12 },
    salary: { min: 55, max: 85, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 10,
    applicants: 73,
    featured: false,
    skills: ["Leadership", "Distributed Systems", "Hiring", "Mentorship"],
    summary:
      "Lead the platform team (8 engineers) that powers ingestion, storage, and query for our analytics product.",
    about:
      "Lumen Labs builds developer-first analytics tooling for modern data teams.",
    responsibilities: [
      "Lead, coach, and grow a team of 6-10 engineers.",
      "Own platform reliability, roadmap, and architectural direction.",
      "Partner with product on long-range planning.",
      "Hire and onboard senior engineers."
    ],
    requirements: [
      "3+ years managing engineering teams that ship infra or platform.",
      "Strong distributed systems background.",
      "Track record of hiring and growing senior ICs.",
      "Excellent written and verbal communication."
    ],
    niceToHave: [
      "Experience scaling early-stage teams from 5  20.",
      "Open-source community involvement."
    ],
    benefits: [
      "ESOPs",
      "Top-tier health insurance",
      "Learning + leadership coaching budget",
      "Hybrid policy"
    ]
  },
  {
    id: "hw-1009",
    title: "QA Automation Engineer",
    company: "Northwind Pay",
    companyTag: "Fintech  Series C",
    logoColor: "#0ea5e9",
    location: "Bengaluru, India",
    workMode: "Onsite",
    type: "Full-time",
    experience: { min: 2, max: 5 },
    salary: { min: 12, max: 22, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 8,
    applicants: 189,
    featured: false,
    skills: ["Playwright", "TypeScript", "API Testing", "CI/CD"],
    summary:
      "Own end-to-end test automation and quality engineering for our payments platform.",
    about:
      "Northwind Pay powers checkout, payouts, and reconciliation across APAC.",
    responsibilities: [
      "Design and maintain end-to-end automation suites.",
      "Build API and contract tests for our microservices.",
      "Integrate test runs into CI/CD with clear signals.",
      "Champion quality practices across engineering."
    ],
    requirements: [
      "2+ years in test automation with a modern framework.",
      "Strong programming skills (TypeScript / Python / Java).",
      "Experience with API testing tools and CI pipelines.",
      "Eye for flaky tests and root-causing bugs."
    ],
    niceToHave: [
      "Performance testing experience (k6, JMeter).",
      "Mobile test automation."
    ],
    benefits: [
      "Health insurance",
      "Annual learning budget",
      "Stock options",
      "Lunch + commute reimbursement"
    ]
  },
  {
    id: "hw-1010",
    title: "Marketing Manager  B2B SaaS",
    company: "Cobalt Studio",
    companyTag: "Design-led SaaS",
    logoColor: "#8b5cf6",
    location: "Remote (India)",
    workMode: "Remote",
    type: "Full-time",
    experience: { min: 4, max: 7 },
    salary: { min: 18, max: 30, currency: "LPA" },
    department: "Marketing",
    postedDaysAgo: 12,
    applicants: 134,
    featured: false,
    skills: ["B2B Marketing", "Content", "SEO", "Lifecycle", "ABM"],
    summary:
      "Own demand generation across content, SEO, and lifecycle for our flagship CRM.",
    about:
      "Cobalt Studio is a design-first SaaS company building modern collaboration tools.",
    responsibilities: [
      "Build the demand-gen engine: content, SEO, and lifecycle.",
      "Partner with product marketing on launches.",
      "Manage agencies and a small team of contractors.",
      "Own pipeline contribution as a primary KPI."
    ],
    requirements: [
      "4+ years in B2B SaaS marketing roles.",
      "Strong writing chops and content sensibility.",
      "Hands-on with HubSpot or similar marketing automation.",
      "Comfort with analytics and attribution."
    ],
    niceToHave: [
      "Experience marketing to engineers or designers.",
      "Familiarity with ABM motions."
    ],
    benefits: [
      "Fully remote",
      "ESOPs",
      "Annual offsite in Goa",
      "Health insurance"
    ]
  },
  {
    id: "hw-1011",
    title: "Full-Stack Engineer (Node + React)",
    company: "Quill",
    companyTag: "Consumer  Series A",
    logoColor: "#ef4444",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 2, max: 5 },
    salary: { min: 18, max: 32, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 1,
    applicants: 412,
    featured: true,
    skills: ["Node.js", "React", "PostgreSQL", "AWS", "Redis"],
    summary:
      "Build features end-to-end across our consumer reading app and creator tooling.",
    about:
      "Quill is a beloved consumer reading app helping millions build a daily reading habit.",
    responsibilities: [
      "Ship features across the full stack from spec to deploy.",
      "Collaborate closely with product and design.",
      "Care about performance, observability, and quality.",
      "Participate in on-call rotations (light)."
    ],
    requirements: [
      "2+ years across Node.js and React in production.",
      "Comfort with relational databases and caching.",
      "Strong product sense and user empathy.",
      "Ability to scope and ship independently."
    ],
    niceToHave: [
      "Experience with React Native.",
      "Open-source side projects."
    ],
    benefits: [
      "ESOPs",
      "Books budget",
      "Health insurance",
      "Hybrid policy"
    ]
  },
  {
    id: "hw-1012",
    title: "Customer Success Manager (Enterprise)",
    company: "Stratus Cloud",
    companyTag: "Infra  Profitable",
    logoColor: "#f59e0b",
    location: "Mumbai, India",
    workMode: "Onsite",
    type: "Full-time",
    experience: { min: 3, max: 6 },
    salary: { min: 16, max: 28, currency: "LPA" },
    department: "Customer Success",
    postedDaysAgo: 9,
    applicants: 76,
    featured: false,
    skills: ["Customer Success", "Enterprise", "Onboarding", "Renewals"],
    summary:
      "Be the strategic partner for our top 30 enterprise accounts and own retention + expansion.",
    about:
      "Stratus Cloud runs developer infrastructure for high-growth tech companies.",
    responsibilities: [
      "Own the post-sales relationship for enterprise accounts.",
      "Drive adoption, renewals, and expansion.",
      "Partner with engineering on escalations.",
      "Run executive business reviews quarterly."
    ],
    requirements: [
      "3+ years in CSM roles, ideally with technical products.",
      "Excellent communication and executive presence.",
      "Comfort discussing infra concepts with technical buyers.",
      "Track record on NRR and retention metrics."
    ],
    niceToHave: [
      "Background in infra, devtools, or developer-facing SaaS.",
      "Experience running QBRs with CTOs."
    ],
    benefits: [
      "Health insurance",
      "Quarterly bonus",
      "Conference budget",
      "Onsite at our Mumbai HQ"
    ]
  },
  {
    id: "hw-1013",
    title: "Security Engineer",
    company: "Veritas AI",
    companyTag: "AI  Early Stage",
    logoColor: "#10b981",
    location: "Remote (India)",
    workMode: "Remote",
    type: "Full-time",
    experience: { min: 4, max: 8 },
    salary: { min: 28, max: 48, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 14,
    applicants: 54,
    featured: false,
    skills: ["AppSec", "Cloud Security", "SAST", "Threat Modeling"],
    summary:
      "Build the security foundation of our ML platform serving regulated industries.",
    about:
      "Veritas AI builds ML infrastructure for regulated industries.",
    responsibilities: [
      "Lead application and cloud security initiatives.",
      "Build SAST/DAST/SCA into our SDLC.",
      "Run threat modeling for new features.",
      "Drive SOC 2 and ISO 27001 readiness."
    ],
    requirements: [
      "4+ years in security engineering.",
      "Strong AppSec fundamentals (OWASP, SDLC, secrets).",
      "Hands-on AWS or GCP security experience.",
      "Excellent communication; ability to teach."
    ],
    niceToHave: [
      "CISSP / OSCP / similar certifications.",
      "Public talks or write-ups."
    ],
    benefits: [
      "Fully remote",
      "Stock options",
      "Health insurance",
      "Cert + conference budget"
    ]
  },
  {
    id: "hw-1014",
    title: "HR Business Partner",
    company: "Halo Health",
    companyTag: "HealthTech",
    logoColor: "#14b8a6",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 5, max: 9 },
    salary: { min: 18, max: 30, currency: "LPA" },
    department: "People",
    postedDaysAgo: 11,
    applicants: 92,
    featured: false,
    skills: ["HRBP", "Performance", "Coaching", "Org Design"],
    summary:
      "Be the trusted HR partner to our engineering and product orgs as we scale from 80 to 200.",
    about:
      "Halo Health is reimagining primary care with a mobile-first model.",
    responsibilities: [
      "Own the full HRBP cycle for assigned business units.",
      "Coach managers on performance and growth conversations.",
      "Partner on org design, comp planning, and engagement.",
      "Build people programs that scale with us."
    ],
    requirements: [
      "5+ years in HRBP roles, ideally in tech.",
      "Comfort coaching senior managers and directors.",
      "Strong data orientation and judgment.",
      "Experience scaling people programs."
    ],
    niceToHave: [
      "Background in healthcare or regulated industries.",
      "Experience with global remote teams."
    ],
    benefits: [
      "Health insurance for family",
      "Hybrid policy",
      "Learning budget",
      "ESOPs"
    ]
  },
  {
    id: "hw-1015",
    title: "Frontend Intern",
    company: "Quill",
    companyTag: "Consumer  Series A",
    logoColor: "#ef4444",
    location: "Bengaluru, India",
    workMode: "Onsite",
    type: "Internship",
    experience: { min: 0, max: 1 },
    salary: { min: 60, max: 80, currency: "K/month" },
    department: "Engineering",
    postedDaysAgo: 0,
    applicants: 41,
    featured: false,
    skills: ["React", "JavaScript", "CSS", "Git"],
    summary:
      "6-month frontend internship working on real features that ship to millions of users.",
    about:
      "Quill is a beloved consumer reading app helping millions build a daily reading habit.",
    responsibilities: [
      "Pair with senior engineers on real product work.",
      "Ship small features end-to-end with mentorship.",
      "Participate in code reviews and design discussions.",
      "Learn modern frontend stack in depth."
    ],
    requirements: [
      "Pre-final or final year student in CS or related field.",
      "Solid JavaScript and basic React knowledge.",
      "A portfolio of side projects or contributions.",
      "Curiosity, ownership, and willingness to learn."
    ],
    niceToHave: [
      "Open-source contributions.",
      "Some experience with TypeScript."
    ],
    benefits: [
      "Stipend of 60-80K/month",
      "Mentorship from senior engineers",
      "Pre-placement offer for top performers",
      "Free meals at office"
    ]
  },
  {
    id: "hw-1016",
    title: "Android Engineer",
    company: "Halo Health",
    companyTag: "HealthTech",
    logoColor: "#14b8a6",
    location: "Hyderabad, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: { min: 3, max: 6 },
    salary: { min: 20, max: 34, currency: "LPA" },
    department: "Engineering",
    postedDaysAgo: 5,
    applicants: 118,
    featured: false,
    skills: ["Kotlin", "Jetpack Compose", "Android", "Coroutines"],
    summary:
      "Own and evolve our Android app used by patients across 40+ Indian cities.",
    about:
      "Halo Health is reimagining primary care with a mobile-first model.",
    responsibilities: [
      "Own significant feature areas on our Android app.",
      "Modernize the codebase toward Jetpack Compose.",
      "Improve performance, crash-free rate, and accessibility.",
      "Mentor junior engineers."
    ],
    requirements: [
      "3+ years building production Android apps in Kotlin.",
      "Hands-on Jetpack Compose experience.",
      "Strong understanding of coroutines, flows, and architecture.",
      "Care for craft and quality."
    ],
    niceToHave: [
      "Experience with KMM.",
      "Familiarity with Android performance tooling."
    ],
    benefits: [
      "Hybrid policy",
      "Health insurance for family",
      "Device budget",
      "Annual offsite"
    ]
  }
];

// Expose globally so app.js can read it without modules.
window.JOBS = JOBS;
