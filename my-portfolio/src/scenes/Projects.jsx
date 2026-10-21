import React from "react";
import { motion } from "framer-motion";
import LineGradient from "../components/LineGradient";

const projects = [
  {name:"CrowBot · IMVU Music Bot", category:"Cloud automation", stack:"Python · Playwright · Docker · Render", summary:"Cloud-hosted IMVU music bot with room-specific playback workflows and radio streaming integration.", url:"https://github.com/Sumer7121/CrowBot-IMVU-Music-Bot"},
  {name:"Advanced RAG LLM Chatbot", category:"Generative AI", stack:"Python · LLMs · Retrieval-augmented generation", summary:"An evolving repository exploring retrieval-augmented language model workflows.", url:"https://github.com/Sumer7121/Advanced-RAG-LLM-Chatbot"},
  {name:"Personal Portfolio", category:"Frontend engineering", stack:"React · Tailwind CSS · Framer Motion", summary:"Responsive developer portfolio featuring technical projects and engineering experience.", url:"https://github.com/Sumer7121/Personal-portfolio"},
  {name:"WebAppDev", category:"Web development", stack:"Web applications", summary:"Source code and experiments in web application development.", url:"https://github.com/Sumer7121/WebAppDev"}
];
export default function Projects() {
 return <section id="projects" className="pt-28 pb-32 px-4">
  <div className="text-center max-w-2xl mx-auto"><p className="font-playfair font-semibold text-4xl"><span className="text-red">FEATURED</span> PROJECTS</p><div className="flex justify-center mt-5"><LineGradient width="w-2/3"/></div><p className="mt-7 mb-12 text-lg">Selected engineering projects with direct links to their source code.</p></div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">{projects.map((p,i)=><motion.article key={p.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}} className="rounded-2xl border border-blue/40 bg-deep-blue p-7 shadow-xl hover:border-red transition-colors">
   <p className="text-red uppercase tracking-widest text-xs font-semibold">{p.category}</p><h3 className="font-playfair text-2xl mt-3">{p.name}</h3><p className="mt-4 leading-relaxed">{p.summary}</p><p className="text-sm mt-5 text-yellow">{p.stack}</p><a className="inline-block mt-6 py-3 px-5 rounded-md bg-blue text-deep-blue font-semibold hover:bg-yellow transition-colors" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} source on GitHub`}>View on GitHub ↗</a>
  </motion.article>)}</div>
 </section>
}