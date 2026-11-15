import { ArrowUpRight, Mail, MapPin, Phone, FileText } from "lucide-react";
import { External, BulletList } from "./multipage/shared.jsx";
import { formatRange, initials, sortedExperience } from "./multipage/helpers.js";

const serif = "font-['Playfair_Display',Georgia,serif]";
const accent = "text-[#0e5a5a]";
const label = "text-[11px] font-semibold uppercase tracking-[0.22em]";

const Section = ({ id, title, children }) => (
  <section aria-labelledby={id} className="mb-14 last:mb-0">
    <div className="flex items-center gap-4 mb-7">
      <h2 id={id} className={`${label} ${accent} shrink-0`}>
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-[#e3ddd0]" />
    </div>
    {children}
  </section>
);

const Bullets = ({ text }) => (
  <BulletList
    text={text}
    className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#4a4741]"
    itemClassName="pl-5 relative before:content-['–'] before:absolute before:left-0 before:text-[#0e5a5a]"
  />
);

const TemplateClassic = ({ user }) => {
  const {
    name,
    email,
    bio,
    avatar,
    resume,
    address,
    phone,
    social = [],
    skills = [],
    projects = [],
    education = [],
    testimonials = [],
  } = user || {};
  const jobs = sortedExperience(user);
  const current = jobs.find((job) => job.isCurrent);
  const hasContact = email || phone || address;

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#1c1b19] font-sans selection:bg-[#0e5a5a] selection:text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
        <aside aria-label="Profile" className="lg:sticky lg:top-12 lg:self-start mb-14 lg:mb-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-40 h-52 lg:w-full lg:h-auto lg:aspect-[4/5] object-cover rounded-sm ring-1 ring-[#e3ddd0] ring-offset-4 ring-offset-[#faf8f4]"
            />
          ) : (
            <div
              aria-hidden
              className={`${serif} italic grid place-items-center w-40 h-52 lg:w-full lg:h-auto lg:aspect-[4/5] rounded-sm bg-[#efe9dd] ${accent} text-6xl ring-1 ring-[#e3ddd0] ring-offset-4 ring-offset-[#faf8f4]`}
            >
              {initials(name)}
            </div>
          )}

          <h1 className={`${serif} text-4xl font-bold leading-[1.05] tracking-tight mt-8`}>{name}</h1>
          {current && (
            <p className="mt-3 text-[15px] text-[#4a4741]">
              {current.title}
              <span className="text-[#a39d8e]"> · </span>
              {current.company}
            </p>
          )}

          {hasContact && (
            <ul className="mt-7 space-y-2.5 text-sm text-[#4a4741] border-t border-[#e3ddd0] pt-6">
              {email && (
                <li className="flex items-center gap-3 min-w-0">
                  <Mail size={15} className={`${accent} shrink-0`} aria-hidden />
                  <a href={`mailto:${email}`} className="truncate hover:text-[#0e5a5a]">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-3">
                  <Phone size={15} className={`${accent} shrink-0`} aria-hidden />
                  <a href={`tel:${phone}`} className="hover:text-[#0e5a5a]">
                    {phone}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-center gap-3">
                  <MapPin size={15} className={`${accent} shrink-0`} aria-hidden />
                  <span>{address}</span>
                </li>
              )}
            </ul>
          )}

          {social.length > 0 && (
            <ul aria-label="Links" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {social.map((item, i) => (
                <li key={i}>
                  <External
                    href={item.url}
                    className="inline-flex items-center gap-1 border-b border-[#cfc8b8] pb-0.5 hover:border-[#0e5a5a] hover:text-[#0e5a5a] transition-colors"
                  >
                    {item.platform}
                    <ArrowUpRight size={13} aria-hidden />
                  </External>
                </li>
              ))}
            </ul>
          )}

          {resume && (
            <External
              href={resume}
              className="mt-7 inline-flex items-center gap-2 bg-[#0e5a5a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0a4343] transition-colors"
            >
              <FileText size={15} aria-hidden />
              Download résumé
            </External>
          )}

          {skills.length > 0 && (
            <div className="mt-9 border-t border-[#e3ddd0] pt-6">
              <h2 className={`${label} ${accent} mb-4`}>Skills</h2>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <li key={i} className="border border-[#d9d2c3] bg-white/60 px-2.5 py-1 text-[13px] text-[#34322e]">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <main className="min-w-0">
          {bio && (
            <Section id="classic-about" title="Summary">
              <p className={`${serif} text-2xl sm:text-[1.7rem] leading-[1.45] text-[#2a2825]`}>{bio}</p>
            </Section>
          )}

          {jobs.length > 0 && (
            <Section id="classic-experience" title="Experience">
              <ol className="ml-[5px] border-l border-[#d9d2c3] space-y-10">
                {jobs.map((job, i) => (
                  <li key={i} className="relative pl-8">
                    <span aria-hidden className="absolute -left-[5.5px] top-[7px] h-[10px] w-[10px] rounded-full border-2 border-[#0e5a5a] bg-[#faf8f4]" />
                    <p className="text-xs tracking-wide text-[#8a8473] uppercase">
                      {[formatRange(job), job.location].filter(Boolean).join("  ·  ")}
                    </p>
                    <h3 className={`${serif} text-xl font-bold mt-1`}>{job.title}</h3>
                    <p className={`${accent} font-medium`}>{job.company}</p>
                    <Bullets text={job.description} />
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {projects.length > 0 && (
            <Section id="classic-projects" title="Selected projects">
              <ul className="grid gap-6 sm:grid-cols-2 items-stretch">
                {projects.map((project, i) => (
                  <li
                    key={i}
                    className="flex h-full flex-col border border-[#e3ddd0] bg-white/70 p-6 transition-shadow hover:shadow-[0_10px_30px_-18px_rgba(28,27,25,0.35)] sm:[&:last-child:nth-child(odd)]:col-span-2"
                  >
                    {project.media?.[0] && (
                      <img src={project.media[0]} alt={project.title} loading="lazy" className="mb-5 h-40 w-full object-cover" />
                    )}
                    <h3 className={`${serif} text-xl font-bold leading-snug`}>{project.title}</h3>
                    <Bullets text={project.description} />
                    {(project.github || project.deployed) && (
                      <div className="mt-auto flex gap-5 pt-6 text-sm font-medium">
                        {project.github && (
                          <External href={project.github} className={`${accent} inline-flex items-center gap-1 hover:underline underline-offset-4`}>
                            Code <ArrowUpRight size={13} aria-hidden />
                          </External>
                        )}
                        {project.deployed && (
                          <External href={project.deployed} className={`${accent} inline-flex items-center gap-1 hover:underline underline-offset-4`}>
                            Live <ArrowUpRight size={13} aria-hidden />
                          </External>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {education.length > 0 && (
            <Section id="classic-education" title="Education">
              <ul className="divide-y divide-[#e3ddd0] border-y border-[#e3ddd0]">
                {education.map((edu, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-5">
                    <div>
                      <h3 className={`${serif} text-lg font-bold`}>{edu.degree || edu.level}</h3>
                      <p className="text-[15px] text-[#4a4741]">
                        {[edu.institution, edu.fieldOfStudy].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <p className="text-sm text-[#8a8473] sm:text-right">
                      {[edu.yearOfCompletion, edu.status === "Ongoing" && "In progress", edu.score && `Score ${edu.score}`]
                        .filter(Boolean)
                        .join("  ·  ")}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {testimonials.length > 0 && (
            <Section id="classic-testimonials" title="Kind words">
              <div className="grid gap-10">
                {testimonials.map((item, i) => (
                  <figure key={i} className="relative pl-10">
                    <span aria-hidden className={`${serif} ${accent} absolute left-0 -top-3 text-6xl leading-none`}>
                      “
                    </span>
                    <blockquote className={`${serif} italic text-xl leading-relaxed text-[#2a2825]`}>{item.feedback}</blockquote>
                    <figcaption className="mt-3 text-sm text-[#8a8473]">
                      {item.name}
                      {item.role && <span> · {item.role}</span>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Section>
          )}

          <footer className="mt-16 border-t border-[#e3ddd0] pt-6 text-xs text-[#8a8473]">
            © {new Date().getFullYear()} {name}
          </footer>
        </main>
      </div>
    </div>
  );
};

export default TemplateClassic;
