import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const TemplatePro = ({ user }) => {
  const {
    name,
    bio,
    social = [],
    skills = [],
    projects = [],
    experience = [],
    education = [],
    phone,
    address,
    email,
    avatar,
    resume,
  } = user || {};

  const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return <Github size={18} />;
    if (p.includes("linkedin")) return <Linkedin size={18} />;
    return null;
  };

  return (
    <div className="bg-[#0b0f19] text-white font-sans">
      
      <nav className="fixed top-0 w-full bg-[#0b0f19]/80 backdrop-blur border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">Portfolio.</h1>

          <div className="hidden md:flex gap-6 text-gray-300 text-sm">
            {["home","about","skills","projects","experience","education","contact"].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-cyan-400">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center max-w-6xl mx-auto px-6 pt-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <p className="text-gray-400 mb-2">Hello, I'm</p>
            <h1 className="text-5xl font-bold mb-4">{name}</h1>

            <h2 className="text-2xl mb-4">
              <span className="text-cyan-400">Full Stack Developer</span>
            </h2>

            <p className="text-gray-400 mb-6">{bio}</p>

            <div className="flex gap-4 mb-6">
              {social.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center border border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                >
                  {getIcon(s.platform)}
                </a>
              ))}
            </div>

            {resume && (
              <a
                href={resume}
                target="_blank"
                className="px-6 py-3 bg-cyan-400 text-black rounded-full font-semibold"
              >
                Download CV
              </a>
            )}
          </div>

          <div className="flex justify-center">
            {avatar && (
              <img
                src={avatar}
                className="w-72 h-72 object-cover rounded-2xl border border-gray-700 shadow-lg"
              />
            )}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-400">{bio}</p>
      </section>

      <section id="skills" className="py-20 bg-[#111827]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Skills</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
              <p className="text-gray-400 mb-4">{proj.description}</p>

              <div className="flex gap-4 text-sm">
                {proj.github && (
                  <a href={proj.github} className="text-cyan-400">
                    GitHub
                  </a>
                )}
                {proj.deployed && (
                  <a href={proj.deployed} className="text-cyan-400">
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="py-20 bg-[#111827]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-cyan-400 pl-4">
                <h3 className="font-bold">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.company}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(exp.from)} - {exp.isCurrent ? "Present" : formatDate(exp.to)}
                </p>
                <p className="text-gray-400 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="border-l-2 border-blue-400 pl-4">
              <h3 className="font-bold">{edu.degree || edu.level}</h3>
              <p className="text-sm text-gray-400">{edu.institution}</p>
              <p className="text-xs text-gray-500">
                {edu.yearOfCompletion} • {edu.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-20 bg-[#111827] text-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <div className="flex flex-col items-center gap-3 text-gray-400">
          {email && <p className="flex items-center gap-2"><Mail size={16}/> {email}</p>}
          {phone && <p className="flex items-center gap-2"><Phone size={16}/> {phone}</p>}
          {address && <p className="flex items-center gap-2"><MapPin size={16}/> {address}</p>}
        </div>
      </section>
    </div>
  );
};

export default TemplatePro;