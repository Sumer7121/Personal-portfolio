import React, { useState } from "react";
import "./App.css";
const projects=[
  {
    "id": "06",
    "name": "BESS Battery Analytics",
    "subtitle": "Energy storage performance analysis",
    "type": "Data / Analytics",
    "desc": "Cleaned Excel capacity-test data with Python and Pandas, calculated round-trip efficiency, and built KPI summaries and anomaly flags to help review battery performance.",
    "tech": ["Python", "Pandas", "Excel", "Matplotlib", "Scikit-learn"],
    "link": "https://github.com/Sumer7121/Personal-portfolio/tree/main/projects/bess-battery-analytics",
    "status": "Case study"
  },
  {
    "id": "02",
    "name": "Advanced RAG",
    "subtitle": "LLM knowledge assistant",
    "type": "AI / Machine Learning",
    "desc": "Local document Q&A with PDF, DOCX and TXT ingestion, Sentence Transformer embeddings, FAISS retrieval, Ollama answers and retrieved source excerpts.",
    "tech": [
      "Python",
      "FastAPI",
      "Streamlit",
      "FAISS",
      "Sentence Transformers",
      "Ollama"
    ],
    "link": "https://github.com/Sumer7121/Advanced-RAG-LLM-Chatbot",
    "accent": "mint",
    "symbol": "✳",
    "status": "MVP"
  },
  {
    "id": "01",
    "name": "CrowBot",
    "subtitle": "IMVU cloud music platform",
    "type": "Cloud / Automation",
    "desc": "Multi-room music bot architecture with independent queues, radio streaming, browser automation and cloud deployment workflows.",
    "tech": [
      "Python",
      "Playwright",
      "Docker",
      "Render",
      "Node.js"
    ],
    "link": "https://github.com/Sumer7121/CrowBot-IMVU-Music-Bot",
    "accent": "violet",
    "symbol": "◉",
    "status": "In development"
  },
  {
    "id": "10",
    "name": "Glass & Sass Arts",
    "subtitle": "Handcrafted art storefront",
    "type": "Frontend / Design",
    "desc": "A storefront and admin system for fused-glass, woodturning and mixed-media pieces, backed by a MongoDB API.",
    "tech": [
      "React",
      "Vite",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Stripe"
    ],
    "link": "https://github.com/Sumer7121/GlassAndSassArts",
    "accent": "peach",
    "symbol": "✧",
    "status": "Preparing to launch"
  },
  {
    "id": "12",
    "name": "Recruiting Profile Explorer",
    "subtitle": "Profile review and recruiting workflows",
    "type": "Web / Learning",
    "desc": "A browser-based recruiting interface with companion Python tools for authenticated profile capture and structured data workflows.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Playwright"
    ],
    "link": "https://github.com/Sumer7121/Personal-portfolio/tree/main/recruiter-tool",
    "linkLabel": "View project on GitHub",
    "accent": "blue",
    "symbol": "⌕",
    "status": "Prototype"
  },
  {
    "id": "07",
    "name": "MetaSigns",
    "subtitle": "AI-assisted Unity learning",
    "type": "AI / Machine Learning",
    "desc": "Interactive K–12 learning with Unity, C#, concept-word selection, LLaMA integration and ASL video feedback.",
    "tech": [
      "Unity",
      "C#",
      "Python",
      "LLaMA",
      "FastAPI"
    ],
    "link": "https://github.com/Sumer7121/Personal-portfolio/tree/main/projects/metasigns-asl-aspire",
    "accent": "violet",
    "symbol": "✦",
    "status": "Case study",
    "linkLabel": "Read case study on GitHub"
  },
  {
    "id": "03",
    "name": "Personal Portfolio",
    "subtitle": "Developer experience",
    "type": "Frontend / Design",
    "desc": "Responsive portfolio with a curated project archive, modern interactions and continuous deployment from GitHub.",
    "tech": [
      "React",
      "JavaScript",
      "CSS",
      "Render",
      "GitHub"
    ],
    "link": "https://github.com/Sumer7121/Personal-portfolio",
    "accent": "peach",
    "symbol": "⌘",
    "status": "Live"
  },
  {
    "id": "04",
    "name": "WebAppDev",
    "subtitle": "Web application experiments",
    "type": "Web / Learning",
    "desc": "Collection of frontend exercises including a weather app, insurance calculator, forms and profile interfaces.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS",
      "Web Apps"
    ],
    "link": "https://github.com/Sumer7121/WebAppDev",
    "accent": "blue",
    "symbol": "▦",
    "status": "Repository"
  },
  {
    "id": "05",
    "name": "WebLab",
    "subtitle": "Backend development lab",
    "type": "Backend / Exploration",
    "desc": "JavaScript application lab with application routing, configuration and middleware experiments.",
    "tech": [
      "JavaScript",
      "Node.js",
      "Middleware"
    ],
    "link": "https://github.com/Sumer7121/weblab",
    "accent": "amber",
    "symbol": "◇",
    "status": "Repository"
  }
];
const experience=[
 {role:"Digital Marketing Analyst",company:"Adobe",period:"Aug 2024 – Present",detail:"Combine campaign and web acquisition data with SQL and Python. Build dashboards that compare spend, conversions, CPA, and ROAS across channels, and investigate reporting discrepancies with marketing teams."},
 {role:"Marketing Data Analyst",company:"IBM",period:"Jun 2021 – Dec 2022",detail:"Standardized KPI definitions and built recurring reports using SQL, Python, and Excel. Used segmentation and cohort analysis to identify where customers dropped off between acquisition and conversion."},
 {role:"Junior Marketing Analyst",company:"Amazon Web Services (AWS)",period:"Jun 2018 – May 2020",detail:"Used Excel and SQL to compare paid and organic acquisition. Checked UTM tags and investigated missing or duplicate records before preparing website performance reports."}
];
const categories=["All","Data","AI","Cloud","Web"];
const category=p=>categories.find(name=>p.type.startsWith(`${name} /`)) ?? "Web";
function App(){
 const [filter,setFilter]=useState("All");
 const shown=projects.filter(p=>filter==="All"||category(p)===filter);
 return <div className="site" id="home">
  <header className="header"><a className="wordmark" href="#home">Sumer Khan<span>Tampa, Florida</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a><a href="mailto:sumerkhan95@gmail.com">Contact</a></nav></header>
  <main>
   <section className="intro"><p className="eyebrow">Digital Marketing &amp; Data Analyst</p><h1>Mohammed<br/>Sumer Khan<span>.</span></h1><div className="intro-bottom"><p>I use SQL, Python, Power BI, and Tableau to measure campaign performance, understand where customers drop off, and automate recurring KPI reports.</p><a className="text-link" href="#work">View analytics work <span aria-hidden="true">↓</span></a></div></section>
   <section className="work section" id="work"><div className="section-head"><h2>Selected work</h2><div className="filters" role="group" aria-label="Filter projects">{categories.map(c=><button key={c} type="button" aria-pressed={filter===c} onClick={()=>setFilter(c)}>{c}</button>)}</div></div>
   <div className="projects">{shown.map(p=><a className="project" href={p.link} key={p.id} target="_blank" rel="noopener noreferrer" aria-label={p.name+" — "+(p.status==="Case study"?"GitHub case study":"GitHub repository")}><div className="project-top"><span>{category(p)} / {p.status==="Case study"?"Case study":"Code"}</span><span aria-hidden="true">↗</span></div><h3>{p.name}</h3><p>{p.desc}</p><div className="tech">{p.tech.slice(0,5).join(" · ")}</div><span className="source-label">{p.status==="Case study"?"Read case study on GitHub":"View project on GitHub"}</span></a>)}</div>
   <aside className="current-project"><span>Also building</span><div><h3>AI Agents & Voice Agents</h3><p>As a hobby, I design and experiment with tool-using AI agents, conversational workflows and voice agents that can understand requests, call APIs and automate useful tasks.</p></div></aside></section>
   <section className="section" id="experience"><div className="section-head"><h2>Experience</h2></div><div className="experience">{experience.map(e=><article className="experience-row" key={e.company}><div><h3>{e.company}</h3><span>{e.period}</span></div><div><h4>{e.role}</h4><p>{e.detail}</p></div></article>)}</div></section>
   <section className="section about" id="about"><h2>About</h2><div><p>I’m based in Tampa. My work connects campaign activity with customer behavior, from defining KPIs and validating source data to explaining what changed and what to investigate next.</p><dl><div><dt>Analysis</dt><dd>SQL, Python, Pandas, advanced Excel, segmentation, cohort and funnel analysis</dd></div><div><dt>Reporting</dt><dd>Power BI, Tableau, KPI dashboards, recurring reporting, data validation</dd></div><div><dt>Measurement</dt><dd>Attribution, UTM tracking, CAC, CPA, ROAS, conversion rates, A/B test analysis</dd></div><div><dt>AI Hobby</dt><dd>AI agents, voice agents, RAG, LangChain, FastAPI, Ollama</dd></div></dl></div></section>
  </main><footer><div><p>Get in touch</p><a href="mailto:sumerkhan95@gmail.com">sumerkhan95@gmail.com</a></div><a className="text-link" href="https://github.com/Sumer7121" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span>© {new Date().getFullYear()} Mohammed Sumer Khan</span></footer>
 </div>;
}
export default App;
