import { Mail, Phone, MapPin, FileText, ArrowUpRight } from "lucide-react";
import { External, BulletList } from "./multipage/shared.jsx";
import { formatRange, initials, sortedExperience } from "./multipage/helpers.js";

const display = "font-['Playfair_Display',Georgia,serif]";
const mono = "font-['JetBrains_Mono',ui-monospace,monospace]";
const kicker = `${mono} text-[11px] uppercase tracking-[0.22em]`;
const wrap = "max-w-5xl mx-auto px-5 sm:px-8";

const toTime = (value) => {
  if (!value) return null;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : time;
};

const byNewest = (a, b) => {
  if (a.time === null && b.time === null) return 0;
  if (a.time === null) return 1;
  if (b.time === null) return -1;
  return b.time - a.time;
};

const buildFeed = (user) => {
  const now = Date.now();
  const items = [];

  sortedExperience(user).forEach((job, i) => {
    items.push({ kind: "work", key: `work-${i}`, time: toTime(job.from), current: Boolean(job.isCurrent), job });
  });

  (user.education || []).forEach((edu, i) => {
    const year = Number(edu.yearOfCompletion);
    const ongoing = edu.status === "Ongoing";
    const stamp = Number.isFinite(year) && year > 0 ? new Date(year, 5, 1).getTime() : null;
    items.push({ kind: "study", key: `study-${i}`, time: ongoing ? now : stamp, current: ongoing, edu });
  });

  const groups = [];
  const addToGroup = (label, item) => {
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push(item);
    else groups.push({ label, items: [item] });
  };

  items.filter((item) => item.current).sort(byNewest).forEach((item) => addToGroup("Now", item));
  items
    .filter((item) => !item.current && item.time !== null)
    .sort(byNewest)
    .forEach((item) => addToGroup(String(new Date(item.time).getFullYear()), item));
  items.filter((item) => !item.current && item.time === null).forEach((item) => addToGroup("Undated", item));

  return groups;
};

const Node = ({ kind, current }) =>
  kind === "work" ? (
    <span aria-hidden className="absolute -left-10 md:-left-12 top-7 grid place-items-center w-3.5 h-3.5">
      {current && <span className="absolute w-full h-full rounded-full bg-[#e8553d] opacity-60 motion-safe:animate-ping" />}
      <span className="relative w-3.5 h-3.5 rounded-full bg-[#e8553d] ring-4 ring-[#f6efe2]" />
    </span>
  ) : (
    <span aria-hidden className="absolute -left-10 md:-left-12 top-7 grid place-items-center w-3.5 h-3.5">
      {current && <span className="absolute w-full h-full rotate-45 bg-[#4a4fd6] opacity-60 motion-safe:animate-ping" />}
      <span className="relative w-3.5 h-3.5 rotate-45 bg-[#4a4fd6] ring-4 ring-[#f6efe2]" />
    </span>
  );

const Badge = ({ kind, current }) => (
  <div className="flex flex-wrap items-center gap-2 mb-3">
    <span
      className={`${kicker} px-2 py-1 rounded-md ${kind === "work" ? "bg-[#e8553d]/10 text-[#c23a24]" : "bg-[#4a4fd6]/10 text-[#3a3fb8]"}`}
    >
      {kind === "work" ? "Work" : "Education"}
    </span>
    {current && (
      <span className={`${kicker} px-2 py-1 rounded-md bg-[#1d1a16] text-[#f6efe2]`}>
        {kind === "work" ? "Present" : "In progress"}
      </span>
    )}
  </div>
);

const WorkCard = ({ job, current }) => (
  <article className="rounded-2xl border border-[#e6dcc6] border-l-4 border-l-[#e8553d] bg-[#fffaf0] p-5 sm:p-6">
    <Badge kind="work" current={current} />
    <h3 className={`${display} text-xl sm:text-2xl font-bold leading-snug`}>{job.title}</h3>
    <p className="mt-1 text-[#4a4338]">
      <span className="font-semibold">{job.company}</span>
      {job.location && <span className="text-[#7a705f]"> · {job.location}</span>}
    </p>
    <p className={`${mono} text-xs text-[#7a705f] mt-2`}>{formatRange(job)}</p>
    <BulletList
      text={job.description}
      className="mt-4 space-y-2 text-[#3b352c] leading-relaxed"
      itemClassName="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-[#e8553d]"
    />
  </article>
);

const StudyCard = ({ edu, current }) => {
  const year = Number(edu.yearOfCompletion);
  const when = Number.isFinite(year) && year > 0 ? (current ? `Expected ${year}` : `Class of ${year}`) : null;
  const details = [edu.fieldOfStudy, edu.score && `Score ${edu.score}`].filter(Boolean).join(" · ");

  return (
    <article className="rounded-2xl border border-[#e6dcc6] border-l-4 border-l-[#4a4fd6] bg-[#fffaf0] p-5 sm:p-6">
      <Badge kind="study" current={current} />
      <h3 className={`${display} text-xl sm:text-2xl font-bold leading-snug`}>{edu.degree || edu.level}</h3>
      <p className="mt-1 font-semibold text-[#4a4338]">{edu.institution}</p>
      {details && <p className="text-[#7a705f]">{details}</p>}
      {when && <p className={`${mono} text-xs text-[#7a705f] mt-2`}>{when}</p>}
    </article>
  );
};

const Timeline = ({ groups }) => {
  let index = 0;
  return (
    <ol aria-label="Career and education timeline">
      {groups.map((group, groupIndex) => (
        <li key={group.label} className="md:flex">
          <div className="mb-4 md:mb-0 md:w-28 md:shrink-0 md:pr-8 md:text-right">
            <h3
              className={`${display} text-3xl md:text-4xl font-black tracking-tight text-[#1d1a16] md:sticky md:top-8`}
            >
              {group.label}
            </h3>
          </div>
          <ol
            className={`relative flex-1 min-w-0 border-l-2 border-[#d9cdb4] pl-8 md:pl-10 space-y-8 ${groupIndex === groups.length - 1 ? "pb-1" : "pb-12"}`}
          >
            {group.items.map((item) => {
              const delay = `${Math.min(index++, 8) * 70}ms`;
              return (
                <li
                  key={item.key}
                  className="relative motion-safe:animate-[tl-rise_0.6s_ease-out_both]"
                  style={{ animationDelay: delay }}
                >
                  <Node kind={item.kind} current={item.current} />
                  {item.kind === "work" ? (
                    <WorkCard job={item.job} current={item.current} />
                  ) : (
                    <StudyCard edu={item.edu} current={item.current} />
                  )}
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
};

const SectionHeading = ({ id, children }) => (
  <h2 id={id} className={`${display} text-3xl sm:text-4xl font-black tracking-tight mb-8`}>
    {children}
  </h2>
);

const TemplateTimeline = ({ user }) => {
  const {
    name,
    bio,
    avatar,
    email,
    phone,
    address,
    resume,
    social = [],
    skills = [],
    projects = [],
    testimonials = [],
    experience = [],
    education = [],
  } = user || {};

  const groups = buildFeed(user || {});
  const hasWork = experience.length > 0;
  const hasStudy = education.length > 0;
  const current = experience.find((job) => job.isCurrent);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f6efe2] text-[#1d1a16] font-['Space_Grotesk',system-ui,sans-serif] selection:bg-[#e8553d] selection:text-white">
      <style>{`@keyframes tl-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>

      <header className={`${wrap} pt-12 sm:pt-20 pb-14`}>
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <div className="relative shrink-0 self-start">
            <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-[#4a4fd6]/25" />
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="relative w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#f6efe2]"
              />
            ) : (
              <div
                className={`${display} relative grid place-items-center w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#f6efe2] bg-[#e8553d] text-[#fffaf0] text-4xl md:text-5xl font-black`}
              >
                {initials(name)}
              </div>
            )}
          </div>

          <div className="min-w-0">
            {current && (
              <p className={`${kicker} text-[#7a705f] mb-3`}>
                {current.title} · {current.company}
              </p>
            )}
            <h1 className={`${display} text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.98] break-words`}>
              {name || "Your Name"}
            </h1>
            {bio && <p className="mt-5 text-lg sm:text-xl leading-relaxed text-[#4a4338] max-w-2xl">{bio}</p>}

            {(email || phone || address || resume) && (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#3b352c]">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-[#e8553d] break-all">
                      <Mail size={15} aria-hidden /> {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone}`} className="inline-flex items-center gap-2 hover:text-[#e8553d]">
                      <Phone size={15} aria-hidden /> {phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="inline-flex items-center gap-2">
                    <MapPin size={15} aria-hidden /> {address}
                  </li>
                )}
                {resume && (
                  <li>
                    <External href={resume} className="inline-flex items-center gap-2 hover:text-[#e8553d]">
                      <FileText size={15} aria-hidden /> Résumé
                    </External>
                  </li>
                )}
              </ul>
            )}

            {social.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social links">
                {social.map((item, i) => (
                  <li key={i}>
                    <External
                      href={item.url}
                      className="inline-flex items-center gap-1 rounded-full border border-[#1d1a16] px-4 py-1.5 text-sm font-medium hover:bg-[#1d1a16] hover:text-[#f6efe2] transition-colors"
                    >
                      {item.platform} <ArrowUpRight size={14} aria-hidden />
                    </External>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      <main>
        {groups.length > 0 && (
          <section aria-labelledby="timeline-heading" className={`${wrap} pb-16`}>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className={`${kicker} text-[#e8553d] mb-2`}>Timeline</p>
                <SectionHeading id="timeline-heading">The story so far</SectionHeading>
              </div>
              {hasWork && hasStudy && (
                <ul className={`${kicker} flex gap-5 text-[#7a705f] mb-8`} aria-label="Legend">
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="w-3 h-3 rounded-full bg-[#e8553d]" /> Work
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="w-3 h-3 rotate-45 bg-[#4a4fd6]" /> Education
                  </li>
                </ul>
              )}
            </div>
            <Timeline groups={groups} />
          </section>
        )}

        {skills.length > 0 && (
          <section aria-labelledby="skills-heading" className="border-t border-[#d9cdb4] py-14">
            <div className={wrap}>
              <SectionHeading id="skills-heading">Skills</SectionHeading>
              <ul className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <li
                    key={i}
                    className={`${mono} text-sm rounded-full border px-4 py-1.5 ${
                      i % 3 === 0
                        ? "border-[#e8553d]/50 bg-[#e8553d]/10 text-[#9c2d1a]"
                        : i % 3 === 1
                          ? "border-[#4a4fd6]/50 bg-[#4a4fd6]/10 text-[#2f3396]"
                          : "border-[#d9cdb4] bg-[#fffaf0] text-[#3b352c]"
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section aria-labelledby="projects-heading" className="bg-[#efe5d1] py-16">
            <div className={wrap}>
              <SectionHeading id="projects-heading">Projects</SectionHeading>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {projects.map((project, i) => (
                  <li key={i} className="min-w-0">
                    <article className="h-full flex flex-col rounded-2xl border border-[#e0d4ba] bg-[#fffaf0] p-5 transition-transform motion-safe:hover:-translate-y-1">
                      {project.media?.[0] && (
                        <img
                          src={project.media[0]}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-36 object-cover rounded-xl mb-4"
                        />
                      )}
                      <h3 className={`${display} text-xl font-bold leading-snug`}>{project.title}</h3>
                      <BulletList
                        text={project.description}
                        className="mt-3 space-y-1.5 text-[#3b352c] text-[15px] leading-relaxed"
                        itemClassName="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-[#4a4fd6]"
                      />
                      {(project.github || project.deployed) && (
                        <div className="mt-auto pt-5 flex gap-5 text-sm font-semibold">
                          {project.github && (
                            <External
                              href={project.github}
                              className="inline-flex items-center gap-1 text-[#2f3396] hover:underline underline-offset-4"
                            >
                              Code <ArrowUpRight size={14} aria-hidden />
                            </External>
                          )}
                          {project.deployed && (
                            <External
                              href={project.deployed}
                              className="inline-flex items-center gap-1 text-[#c23a24] hover:underline underline-offset-4"
                            >
                              Live <ArrowUpRight size={14} aria-hidden />
                            </External>
                          )}
                        </div>
                      )}
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section aria-labelledby="kind-words-heading" className="py-16">
            <div className={wrap}>
              <SectionHeading id="kind-words-heading">Kind words</SectionHeading>
              <div className="grid gap-8 md:grid-cols-2">
                {testimonials.map((item, i) => (
                  <figure key={i} className="relative pl-10">
                    <span
                      aria-hidden
                      className={`${display} absolute left-0 -top-3 text-7xl leading-none ${i % 2 ? "text-[#4a4fd6]" : "text-[#e8553d]"}`}
                    >
                      “
                    </span>
                    <blockquote className={`${display} italic text-xl sm:text-2xl leading-snug`}>{item.feedback}</blockquote>
                    <figcaption className={`${kicker} mt-4 text-[#7a705f]`}>
                      {item.name}
                      {item.role && ` · ${item.role}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-[#d9cdb4] py-8">
        <div className={`${wrap} ${kicker} text-[#7a705f] flex flex-wrap justify-between gap-2`}>
          <span>
            © {new Date().getFullYear()} {name}
          </span>
          <span>Newest first</span>
        </div>
      </footer>
    </div>
  );
};

export default TemplateTimeline;
