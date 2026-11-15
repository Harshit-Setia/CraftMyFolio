import React from "react";
import {
  Briefcase,
  GraduationCap,
  User,
  Github,
  Linkedin,
  Link as LinkIcon,
  Phone,
  MapPin,
  FileText,
  Code,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const TemplateTimeline = ({ user }) => {
  const {
    name,
    bio,
    social = [],
    education = [],
    experience = [],
    skills = [],
    projects = [],
    testimonials = [],
    avatar,
    phone,
    address,
    resume,
  } = user || {};

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      
      <header className="py-20 text-center px-4 bg-gradient-to-b from-gray-900 to-[#111827]">
        <div className="w-20 h-1 bg-purple-500 mx-auto mb-8 rounded-full"></div>

        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-purple-500"
          />
        )}

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          {name}
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
          {bio}
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-6">
          {phone && (
            <span className="flex items-center gap-2">
              <Phone size={14} /> {phone}
            </span>
          )}
          {address && (
            <span className="flex items-center gap-2">
              <MapPin size={14} /> {address}
            </span>
          )}
          {resume && (
            <a
              href={resume}
              target="_blank"
              className="flex items-center gap-2 hover:text-purple-400"
            >
              <FileText size={14} /> Resume
            </a>
          )}
        </div>

        <div className="flex justify-center gap-6">
          {social.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              className="text-gray-400 hover:text-purple-400 transition transform hover:scale-110"
            >
              {s.platform.toLowerCase().includes("github") ? (
                <Github />
              ) : s.platform.toLowerCase().includes("linkedin") ? (
                <Linkedin />
              ) : (
                <LinkIcon />
              )}
            </a>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4">

        {skills.length > 0 && (
          <section className="mb-20 text-center">
            <h2 className="text-2xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700 hover:border-purple-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-20">
            <h2 className="text-center text-2xl font-bold mb-12">Projects</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition"
                >
                  <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {proj.description}
                  </p>

                  <div className="flex gap-4 text-sm">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        className="text-purple-400 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {proj.deployed && (
                      <a
                        href={proj.deployed}
                        target="_blank"
                        className="text-purple-400 hover:underline"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800"></div>

          {experience.length > 0 && (
            <section className="mb-20">
              <h2 className="text-center text-2xl font-bold mb-12">
                Experience
              </h2>

              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 -ml-[9px] w-5 h-5 rounded-full border-4 border-[#111827] bg-purple-500 z-10"></div>

                    <div className="flex-1 hidden md:block"></div>

                    <div className="flex-1 ml-12 md:ml-0">
                      <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                          <Briefcase size={16} />
                          {exp.company}
                        </div>

                        <h3 className="text-xl font-bold">{exp.title}</h3>

                        <span className="text-xs text-gray-500 block mb-3">
                          {formatDate(exp.from)} -{" "}
                          {exp.isCurrent
                            ? "Present"
                            : formatDate(exp.to)}
                        </span>

                        <p className="text-gray-400 text-sm">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-20">
              <h2 className="text-center text-2xl font-bold mb-12">
                Education
              </h2>

              <div className="space-y-12">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      i % 2 !== 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 -ml-[9px] w-5 h-5 rounded-full border-4 border-[#111827] bg-blue-500 z-10"></div>

                    <div className="flex-1 hidden md:block"></div>

                    <div className="flex-1 ml-12 md:ml-0">
                      <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                          <GraduationCap size={16} />
                          {edu.institution}
                        </div>

                        <h3 className="text-lg font-bold">
                          {edu.degree || edu.level}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {edu.fieldOfStudy}
                        </p>

                        <div className="flex justify-between text-xs text-gray-500 mt-3 border-t border-gray-700 pt-3">
                          <span>{edu.yearOfCompletion}</span>
                          <span>{edu.score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {testimonials.length > 0 && (
          <section className="mb-20">
            <h2 className="text-center text-2xl font-bold mb-12">
              Testimonials
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700"
                >
                  <p className="text-gray-300 italic mb-4">
                    "{t.feedback}"
                  </p>
                  <div className="text-sm text-gray-400">
                    — {t.name}, {t.role}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TemplateTimeline;