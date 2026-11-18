import React, { useState } from "react";
import "./App.css";

const projects = [
  {
    id: "01",
    name: "Cloud Portfolio CI/CD",
    subtitle: "GitHub to Render deployment workflow",
    type: "Cloud / Deployment",
    desc: "This React portfolio is built from a GitHub repository and deployed on Render through an automated build and release workflow.",
    tech: ["GitHub", "Render", "CI/CD", "React", "JavaScript"],
    link: "https://github.com/Sumer7121/Personal-portfolio",
    status: "Live"
  },
  {
    id: "02",
    name: "CrowBot",
    subtitle: "IMVU multi-room automation bot",
    type: "Cloud / Automation",
    desc: "Python automation for room-specific music, games, browser workflows, and bot operations, with troubleshooting and maintainable command flows.",
    tech: ["Python", "Playwright", "Browser Automation", "APIs", "Git"],
    link: "https://github.com/Sumer7121/CrowBot-IMVU-Music-Bot",
    status: "In development"
  },
  {
    id: "03",
    name: "BESS Battery Analytics",
    subtitle: "Energy storage performance analysis",
    type: "Data / Analytics",
    desc: "A Python analysis workflow for battery capacity and efficiency data, with data cleanup, KPI calculation, model evaluation, and reviewable outputs.",
    tech: ["Python", "Pandas", "Scikit-learn", "Data Validation", "Analytics"],
    link: "https://github.com/Sumer7121/Personal-portfolio/tree/main/projects/bess-battery-analytics",
    status: "Case study"
  },
  {
    id: "04",
    name: "Advanced RAG LLM Chatbot",
    subtitle: "Document search and question answering",
    type: "AI / Machine Learning",
    desc: "A document question-answering application using ingestion, embeddings, FAISS retrieval, local LLM responses, and source excerpts.",
    tech: ["Python", "FastAPI", "FAISS", "Ollama", "RAG"],
    link: "https://github.com/Sumer7121/Advanced-RAG-LLM-Chatbot",
    status: "MVP"
  },
  {
    id: "05",
    name: "Cookbook App",
    subtitle: "AI-assisted recipe discovery",
    type: "AI / Machine Learning",
    desc: "A recipe application exploring search, recipe organization, and AI-assisted cooking experiences across web and mobile.",
    tech: ["React Native", "Expo", "JavaScript", "AI Integration", "APIs"],
    link: "https://github.com/Sumer7121/cookbook-app",
    status: "In development"
  }
];

const experience = [
  {
    role: "Cloud Infrastructure Engineer",
    company: "Adobe",
    period: "Aug 2024 – Present",
    detail: "Provision and troubleshoot AWS and Azure infrastructure with Terraform and Ansible. Support CI/CD workflows, Kubernetes deployments, Python automation, cloud access and networking, monitoring, and AI-assisted engineering workflows."
  },
  {
    role: "DevOps / Infrastructure Engineer",
    company: "IBM",
    period: "Jun 2020 – Dec 2022",
    detail: "Built reusable infrastructure automation and Jenkins delivery workflows; administered Linux and Windows environments, scripted operational tasks, and investigated deployment and production incidents using logs and monitoring."
  },
  {
    role: "Junior Cloud Engineer",
    company: "Amazon Web Services (AWS)",
    period: "Jun 2018 – May 2020",
    detail: "Supported AWS environments using EC2, VPC, S3, and IAM; assisted with Terraform provisioning, container deployments, Linux operations, CloudWatch monitoring, and documented troubleshooting and recovery procedures."
  }
];

const categories = ["All", "Cloud", "AI", "Data"];
const category = project => categories.find(name => project.type.startsWith(`${name} /`)) ?? "Cloud";

function App() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter(project => filter === "All" || category(project) === filter);

  return <div className="site" id="home">
    <header className="header">
      <a className="wordmark" href="#home">Sumer Khan<span>Tampa, Florida</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a>
        <a href="mailto:sumerkhan95@gmail.com">Contact</a>
      </nav>
    </header>
    <main>
      <section className="intro">
        <p className="eyebrow">Cloud DevOps · Data Engineering · AI</p>
        <h1>Mohammed<br/>Sumer Khan<span>.</span></h1>
        <div className="intro-bottom">
          <p>I build and support cloud infrastructure and delivery pipelines across AWS and Azure. My work brings together infrastructure as code, CI/CD, Kubernetes, production troubleshooting, data engineering, and practical AI automation.</p>
          <a className="text-link" href="#work">Explore projects <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section className="work section" id="work">
        <div className="section-head">
          <h2>Selected work</h2>
          <div className="filters" role="group" aria-label="Filter projects">
            {categories.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className="projects">
          {shown.map(project => <a className="project" href={project.link} key={project.id} target="_blank" rel="noopener noreferrer" aria-label={project.name + " — GitHub project"}>
            <div className="project-top"><span>{category(project)} / {project.status}</span><span aria-hidden="true">↗</span></div>
            <h3>{project.name}</h3><p>{project.desc}</p>
            <div className="tech">{project.tech.slice(0, 5).join(" · ")}</div>
            <span className="source-label">View project on GitHub</span>
          </a>)}
        </div>
        <aside className="current-project">
          <span>Current focus</span>
          <div><h3>Reliable cloud platforms and AI automation</h3>
            <p>Applying automation and AI tools to infrastructure and data workflows, with attention to access control, observability, failure handling, and clear operational steps.</p>
          </div>
        </aside>
      </section>
      <section className="section" id="experience">
        <div className="section-head"><h2>Experience</h2></div>
        <div className="experience">
          {experience.map(item => <article className="experience-row" key={item.company}>
            <div><h3>{item.company}</h3><span>{item.period}</span></div>
            <div><h4>{item.role}</h4><p>{item.detail}</p></div>
          </article>)}
        </div>
      </section>
      <section className="section about" id="about">
        <h2>Cloud, DevOps, Data &amp; AI</h2>
        <div>
          <p>I focus on repeatable infrastructure, secure cloud operations, reliable delivery, and production troubleshooting. I also work with data pipelines and AI-enabled applications, connecting practical implementation details with observability and clear recovery steps.</p>
          <dl>
            <div><dt>AWS &amp; Azure</dt><dd>AWS EC2, S3, VPC, IAM, Lambda, Glue, EMR, Redshift, Athena, Step Functions, EventBridge, SQS, RDS, EKS, CloudWatch; Azure VMs, VNETs, Storage, Azure Monitor</dd></div>
            <div><dt>DevOps &amp; Platform</dt><dd>Terraform, CloudFormation, Ansible, Docker, Kubernetes, EKS, Helm, GitOps, Jenkins, GitHub Actions, GitLab CI, Azure DevOps, Linux, Bash, Python</dd></div>
            <div><dt>Data Engineering</dt><dd>ETL/ELT, AWS Glue, Lambda, S3 data lakes, EMR, Spark, PySpark, Redshift, Athena, Airflow, Kafka, Databricks, Snowflake, dbt, SQL, data validation</dd></div>
            <div><dt>Observability &amp; Reliability</dt><dd>CloudWatch, Prometheus, Grafana, OpenTelemetry, ELK, Datadog, alerting, log analysis, incident response, root-cause analysis, runbooks</dd></div>
            <div><dt>AI &amp; APIs</dt><dd>Amazon Bedrock, Azure OpenAI, Python, FastAPI, LangChain, LangGraph, RAG, AI agents, REST APIs, model and data workflow automation</dd></div>
          </dl>
        </div>
      </section>
    </main>
    <footer>
      <div><p>Get in touch</p><a href="mailto:sumerkhan95@gmail.com">sumerkhan95@gmail.com</a></div>
      <div className="footer-links">
        <a className="text-link" href="https://www.linkedin.com/in/sumer-md/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a className="text-link" href="https://github.com/Sumer7121" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>
      <span>© {new Date().getFullYear()} Mohammed Sumer Khan</span>
    </footer>
  </div>;
}

export default App;
