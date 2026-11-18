import React, { useState } from "react";
import "./App.css";
const projects=[
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
 {role:"Cloud Infrastructure Engineer",company:"Adobe",period:"Aug 2024 – Present",detail:"Work across AWS and Azure infrastructure, automating provisioning with Terraform, Ansible and Python. Support IAM and networking configurations, Kubernetes workloads, monitoring dashboards, and incident troubleshooting for cloud environments."},
 {role:"DevOps / Infrastructure Engineer",company:"IBM",period:"Jun 2020 – Dec 2022",detail:"Developed reusable infrastructure-as-code configurations and Jenkins CI/CD pipelines, administered Linux and Windows environments, automated operational tasks with Python and Shell scripts, and investigated production incidents through logs and monitoring."},
 {role:"Junior Cloud Engineer",company:"Amazon Web Services (AWS)",period:"Jun 2018 – May 2020",detail:"Supported AWS infrastructure configuration using EC2, VPC, S3 and IAM; assisted with Terraform provisioning, Docker and Kubernetes deployments, system monitoring, patching, and operational runbook documentation."}
];
const categories=["All","Cloud","AI","Data","Web"];
const category=p=>categories.find(name=>p.type.startsWith(`${name} /`)) ?? "Web";
function App(){
 const [filter,setFilter]=useState("All");
 const shown=projects.filter(p=>filter==="All"||category(p)===filter);
 return <div className="site" id="home">
  <header className="header"><a className="wordmark" href="#home">Sumer Khan<span>Tampa, Florida</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a><a href="mailto:sumerkhan95@gmail.com">Contact</a></nav></header>
  <main>
   <section className="intro"><p className="eyebrow">Cloud Infrastructure &amp; DevOps Engineer</p><h1>Mohammed<br/>Sumer Khan<span>.</span></h1><div className="intro-bottom"><p>I build and operate cloud infrastructure on AWS and Azure, automate deployments with Terraform and CI/CD pipelines, and improve reliability through Kubernetes operations, observability, scripting and security-focused troubleshooting.</p><a className="text-link" href="#work">Explore cloud &amp; automation projects <span aria-hidden="true">↓</span></a></div></section>
   <section className="work section" id="work"><div className="section-head"><h2>Selected work</h2><div className="filters" role="group" aria-label="Filter projects">{categories.map(c=><button key={c} type="button" aria-pressed={filter===c} onClick={()=>setFilter(c)}>{c}</button>)}</div></div>
   <div className="projects">{shown.map(p=><a className="project" href={p.link} key={p.id} target="_blank" rel="noopener noreferrer" aria-label={p.name+" — "+(p.status==="Case study"?"GitHub case study":"GitHub repository")}><div className="project-top"><span>{category(p)} / {p.status==="Case study"?"Case study":"Code"}</span><span aria-hidden="true">↗</span></div><h3>{p.name}</h3><p>{p.desc}</p><div className="tech">{p.tech.slice(0,5).join(" · ")}</div><span className="source-label">{p.status==="Case study"?"Read case study on GitHub":"View project on GitHub"}</span></a>)}</div>
   <aside className="current-project"><span>Also building</span><div><h3>Infrastructure Automation &amp; AI Agents</h3><p>I experiment with AI agents and Python automation for operational tasks, API integrations, incident investigation and cloud infrastructure workflows.</p></div></aside></section>
   <section className="section" id="experience"><div className="section-head"><h2>Experience</h2></div><div className="experience">{experience.map(e=><article className="experience-row" key={e.company}><div><h3>{e.company}</h3><span>{e.period}</span></div><div><h4>{e.role}</h4><p>{e.detail}</p></div></article>)}</div></section>
   <section className="section about" id="about"><h2>About</h2><div><p>I’m a Cloud Infrastructure and DevOps engineer working across AWS, Azure, infrastructure as code, CI/CD and production operations. My focus is repeatable provisioning, secure access, reliable deployments, practical observability, and resolving infrastructure incidents with clear documentation and automation.</p><dl><div><dt>Cloud</dt><dd>AWS EC2, S3, VPC, IAM, EKS, Lambda, CloudWatch; Azure VMs, VNETs, Storage, Azure Monitor</dd></div><div><dt>DevOps</dt><dd>Terraform, Ansible, CloudFormation, Jenkins, GitHub Actions, GitLab CI, Docker, Kubernetes, Helm</dd></div><div><dt>Operations</dt><dd>Linux, Python, Bash, PowerShell, networking, IAM, Prometheus, Grafana, Datadog, ELK, incident RCA</dd></div><div><dt>AI &amp; Data</dt><dd>Python, SQL, RAG, AI agents, FastAPI, Pandas and cloud-integrated automation</dd></div></dl></div></section>
  </main><footer><div><p>Get in touch</p><a href="mailto:sumerkhan95@gmail.com">sumerkhan95@gmail.com</a></div><div className="footer-links"><a className="text-link" href="https://www.linkedin.com/in/sumer-k" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a> <a className="text-link" href="https://github.com/Sumer7121" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div><span>© {new Date().getFullYear()} Mohammed Sumer Khan</span></footer>
 </div>;
}
export default App;
