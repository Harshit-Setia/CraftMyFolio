import { ArrowUpRight, Mail, Phone, MapPin, FileText } from "lucide-react";
import { External, BulletList } from "./multipage/shared.jsx";
import { formatRange, initials, sortedExperience } from "./multipage/helpers.js";

const gradientText = "bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent";
const eyebrow = "text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80";
const pillLink =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/10";

const Section = ({ id, label, title, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-16 sm:py-24">
    <p className={eyebrow}>{label}</p>
    <h2 id={`${id}-title`} className="mt-2 mb-10 text-3xl sm:text-5xl font-bold tracking-tight text-white">
      {title}
    </h2>
    {children}
  </section>
);

const GradientCard = ({ children, className = "" }) => (
  <div className={`rounded-3xl bg-gradient-to-br from-cyan-400/50 via-violet-500/25 to-pink-500/50 p-px ${className}`}>
    <div className="h-full rounded-[23px] bg-[#0a0b18] p-6 sm:p-8">{children}</div>
  </div>
);

const TemplateHero = ({ user }) => {
  const {
    name,
    email,
    phone,
    address,
    bio,
    avatar,
    resume,
    skills = [],
    projects = [],
    education = [],
    testimonials = [],
    social = [],
  } = user || {};

  const displayName = name || "Your Name";
  const jobs = sortedExperience(user);
  const current = jobs.find((job) => job.isCurrent);
  const hasContact = Boolean(email || phone || address || resume || social.length);

  const links = [
    skills.length > 0 && ["skills", "Skills"],
    projects.length > 0 && ["work", "Work"],
    jobs.length > 0 && ["experience", "Experience"],
    education.length > 0 && ["education", "Education"],
    testimonials.length > 0 && ["words", "Kind words"],
    hasContact && ["contact", "Contact"],
  ].filter(Boolean);

  const stats = [
    [projects.length, "Projects"],
    [skills.length, "Skills"],
    [jobs.length, "Roles"],
  ].filter(([count]) => count > 0);

  return (
    <div className="@container min-h-screen overflow-x-clip bg-[#05060f] text-slate-300 font-['Space_Grotesk',system-ui,sans-serif] selection:bg-violet-500/40 selection:text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060f]/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="max-w-[40%] shrink-0 truncate text-sm font-bold tracking-wide text-white">
            {displayName}
          </a>
          {links.length > 0 && (
            <nav aria-label="Sections" className="min-w-0">
              <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
                {links.map(([id, label]) => (
                  <li key={id} className="shrink-0">
                    <a
                      href={`#${id}`}
                      className="block rounded-full px-3 py-1.5 text-xs sm:text-sm text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="top" className="relative isolate flex min-h-[calc(100vh-3.5rem)] items-center">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/40 blur-3xl mix-blend-screen motion-safe:animate-blob" />
            <div className="absolute top-1/4 -right-24 h-[30rem] w-[30rem] rounded-full bg-violet-600/40 blur-3xl mix-blend-screen motion-safe:animate-blob animation-delay-2000" />
            <div className="absolute -bottom-32 left-1/4 h-[26rem] w-[26rem] rounded-full bg-pink-500/30 blur-3xl mix-blend-screen motion-safe:animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-8">
              {current && (
                <p className="mb-6 inline-flex max-w-full items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-slate-200 backdrop-blur">
                  <span className="truncate">
                    {current.title} · {current.company}
                  </span>
                </p>
              )}
              <h1 className={`${gradientText} break-words pb-3 font-bold leading-[0.95] tracking-tighter text-[clamp(3rem,11cqw,8.5rem)]`}>
                {displayName}
              </h1>
              {bio && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{bio}</p>}

              <div className="mt-9 flex flex-wrap gap-3">
                {projects.length > 0 && (
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-[#05060f] shadow-lg shadow-violet-500/20 transition-transform hover:scale-105"
                  >
                    View work <ArrowUpRight size={16} />
                  </a>
                )}
                {hasContact && (
                  <a
                    href="#contact"
                    className={
                      projects.length > 0
                        ? "inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        : "inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-[#05060f]"
                    }
                  >
                    Contact
                  </a>
                )}
                {resume && (
                  <External
                    href={resume}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <FileText size={16} /> Resume
                  </External>
                )}
              </div>

              {stats.length > 0 && (
                <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                  {stats.map(([count, label]) => (
                    <div key={label}>
                      <dd className="text-3xl font-bold text-white">{count}</dd>
                      <dt className="text-xs uppercase tracking-widest text-slate-500">{label}</dt>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="order-1 lg:order-2 lg:col-span-4 lg:justify-self-end">
              <div className="rounded-full bg-gradient-to-br from-cyan-300 via-violet-500 to-pink-500 p-1 shadow-2xl shadow-violet-600/30 motion-safe:rotate-3 w-36 h-36 sm:w-48 sm:h-48 lg:w-64 lg:h-64">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="h-full w-full rounded-full border-4 border-[#05060f] object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center rounded-full border-4 border-[#05060f] bg-[#0a0b18] text-4xl font-bold sm:text-6xl">
                    <span className={gradientText}>{initials(displayName)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {skills.length > 0 && (
            <Section id="skills" label="Toolbox" title="Skills">
              <ul className="flex flex-wrap items-center gap-3">
                {skills.map((skill, i) => (
                  <li
                    key={i}
                    className={`rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-200 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-white ${
                      ["text-lg", "text-sm", "text-base"][i % 3]
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {projects.length > 0 && (
            <Section id="work" label="Selected work" title="Projects">
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, i) => (
                  <GradientCard key={i} className={i === 0 && projects.length % 2 === 1 ? "md:col-span-2" : ""}>
                    {project.media?.[0] && (
                      <img
                        src={project.media[0]}
                        alt={project.title}
                        loading="lazy"
                        className="mb-6 aspect-video w-full rounded-xl object-cover"
                      />
                    )}
                    <p className="font-['JetBrains_Mono',ui-monospace,monospace] text-xs text-cyan-300/70">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 mb-4 text-2xl font-bold text-white">{project.title}</h3>
                    <BulletList
                      text={project.description}
                      className="space-y-2 text-slate-300"
                      itemClassName="relative pl-5 before:absolute before:left-0 before:text-cyan-300 before:content-['›']"
                    />
                    {(project.github || project.deployed) && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.github && (
                          <External href={project.github} className={pillLink}>
                            Code <ArrowUpRight size={14} />
                          </External>
                        )}
                        {project.deployed && (
                          <External href={project.deployed} className={pillLink}>
                            Live <ArrowUpRight size={14} />
                          </External>
                        )}
                      </div>
                    )}
                  </GradientCard>
                ))}
              </div>
            </Section>
          )}

          {jobs.length > 0 && (
            <Section id="experience" label="Career" title="Experience">
              <ol className="relative ml-2 space-y-12 border-l border-white/15">
                {jobs.map((job, i) => (
                  <li key={i} className="relative pl-8">
                    <span
                      aria-hidden
                      className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-cyan-300 to-pink-400 shadow-[0_0_14px_3px_rgba(167,139,250,0.55)]"
                    />
                    <p className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cyan-200">
                      {formatRange(job)}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{job.title}</h3>
                    <p className="mb-4 text-slate-400">
                      {[job.company, job.location].filter(Boolean).join(" · ")}
                    </p>
                    <BulletList
                      text={job.description}
                      className="max-w-3xl space-y-2 text-slate-300"
                      itemClassName="relative pl-5 before:absolute before:left-0 before:text-violet-300 before:content-['›']"
                    />
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {education.length > 0 && (
            <Section id="education" label="Learning" title="Education">
              <div className="grid gap-6 sm:grid-cols-2">
                {education.map((edu, i) => (
                  <GradientCard key={i}>
                    <p className={eyebrow}>{edu.level}</p>
                    <h3 className="mt-2 text-xl font-bold text-white">{edu.degree || edu.level}</h3>
                    <p className="text-slate-300">{edu.institution}</p>
                    {edu.fieldOfStudy && <p className="text-sm text-slate-500">{edu.fieldOfStudy}</p>}
                    <p className="mt-4 text-sm text-slate-400">
                      {[edu.yearOfCompletion, edu.status, edu.score && `Score ${edu.score}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </GradientCard>
                ))}
              </div>
            </Section>
          )}

          {testimonials.length > 0 && (
            <Section id="words" label="Testimonials" title="Kind words">
              <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((item, i) => (
                  <figure key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
                    <span aria-hidden className={`${gradientText} block text-6xl font-bold leading-none`}>
                      “
                    </span>
                    <blockquote className="mt-2 text-lg leading-relaxed text-slate-200">{item.feedback}</blockquote>
                    <figcaption className="mt-5 text-sm text-slate-400">
                      <span className="font-semibold text-white">{item.name}</span>
                      {item.role && ` · ${item.role}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Section>
          )}

          {hasContact && (
            <Section id="contact" label="Get in touch" title="Let's talk">
              {email && (
                <External
                  href={`mailto:${email}`}
                  className={`${gradientText} inline-block break-all pb-2 text-[clamp(1.5rem,5cqw,3.5rem)] font-bold leading-tight hover:opacity-80`}
                >
                  {email}
                </External>
              )}
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-slate-300">
                {phone && (
                  <li>
                    <External href={`tel:${phone}`} className="inline-flex items-center gap-2 hover:text-white">
                      <Phone size={16} className="text-cyan-300" /> {phone}
                    </External>
                  </li>
                )}
                {address && (
                  <li className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-cyan-300" /> {address}
                  </li>
                )}
                {resume && (
                  <li>
                    <External href={resume} className="inline-flex items-center gap-2 hover:text-white">
                      <Mail size={16} className="text-cyan-300" /> Résumé
                    </External>
                  </li>
                )}
              </ul>
              {social.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-3">
                  {social.map((item, i) => (
                    <li key={i}>
                      <External href={item.url} className={pillLink}>
                        {item.platform} <ArrowUpRight size={14} />
                      </External>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {displayName}
      </footer>
    </div>
  );
};

export default TemplateHero;
