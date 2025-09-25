import React from "react";

// The helper function is still useful for formatting dates in the static data
const getYear = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date.getFullYear() : null;
};

// Hardcoded static data for previewing the template
const staticData = {
  name: "Alex Doe",
  bio: "A passionate Full Stack Developer with a love for creating intuitive, dynamic user experiences. Skilled in React, Node.js, and modern web technologies.",
  avatar: "https://i.pravatar.cc/150?u=alexdoe",
  resume: "#",
  social: [
    { id: 1, platform: "GitHub", url: "#" },
    { id: 2, platform: "LinkedIn", url: "#" },
    { id: 3, platform: "Twitter", url: "#" },
  ],
  education: [
    {
      id: 1,
      degree: "B.Sc. in Computer Science",
      institution: "State University",
      yearOfCompletion: "2020-05-20",
      fieldOfStudy: "Software Engineering",
    },
  ],
  skills: ["React", "JavaScript (ES6+)", "Node.js", "Tailwind CSS", "Next.js", "MongoDB"],
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store built with the MERN stack, including payment gateway integration.",
      github: "#",
      deployed: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative tool for teams to manage projects and track progress in real-time.",
      github: "#",
      deployed: "#",
    },
  ],
  experience: [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      from: "2020-08-01",
      isCurrent: true,
      description: "Developing and maintaining web applications using React and Express.",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Jane Smith",
      role: "Project Manager",
      feedback: "Alex is a proactive and detail-oriented developer. A true asset to any team.",
    },
  ],
};


const First = () => {
  // ✅ Destructure from the hardcoded `staticData` object instead of props
  const {
    name, bio, avatar, resume, education, social,
    skills, projects, experience, testimonials
  } = staticData;

  return (
    <div className="font-sans bg-white text-gray-800 min-h-screen p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-200">
        <img
          src={avatar}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{name}</h1>
          <p className="mt-2 text-lg text-gray-600">{bio}</p>
          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Download Resume &rarr;
            </a>
          )}
        </div>
      </header>

      {/* Social Links */}
      {social.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">Connect</h2>
          <ul className="flex flex-wrap gap-4">
            {social.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-600 hover:text-indigo-600">
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.institution} ({getYear(edu.yearOfCompletion)})
                </p>
                <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <li key={i} className="bg-indigo-100 text-indigo-800 font-medium px-4 py-1 rounded-full text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-gray-600 mt-1">{p.description}</p>
                <div className="mt-4 flex gap-4">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                      GitHub
                    </a>
                  )}
                  {p.deployed && (
                    <a href={p.deployed} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-bold text-lg">{exp.title} @ {exp.company}</h3>
                <p className="text-sm text-gray-500">
                  {getYear(exp.from)} - {exp.isCurrent ? "Present" : getYear(exp.to)}
                </p>
                <p className="text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 inline-block pb-1 mb-4">Testimonials</h2>
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                <p className="italic text-gray-600">"{t.feedback}"</p>
                <p className="text-right font-semibold mt-2">— {t.name}, {t.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default First;