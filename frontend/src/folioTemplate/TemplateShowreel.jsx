import { ArrowUpRight } from "lucide-react";
import MultiPageTemplate from "./multipage/MultiPageTemplate.jsx";
import PageLink from "./multipage/PageLink.jsx";
import { External, BulletList } from "./multipage/shared.jsx";
import { formatRange, initials, pad, sortedExperience } from "./multipage/helpers.js";

const LIME = "#c6f432";
const ACCENTS = ["#c6f432", "#ff8fd0", "#8fd8ff", "#ffb877"];
const kicker = "text-xs uppercase tracking-[0.3em]";
const giant = "font-black uppercase leading-[0.85] tracking-tighter";

const Marquee = ({ items, className = "" }) => {
  const run = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="cmf-marquee flex w-max whitespace-nowrap">
        {run.map((item, i) => (
          <span key={i} className="px-6 flex items-center gap-12">
            {item}
            <span aria-hidden>✺</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const ArrowRow = ({ children, index, ...props }) => (
  <PageLink
    {...props}
    className="group flex w-full items-center justify-between gap-4 border-t border-white/15 px-3 py-6 sm:py-8 text-left hover:bg-[#c6f432] hover:text-black transition-colors"
  >
    <span className="flex items-baseline gap-4 min-w-0">
      <span className="text-sm text-white/40 group-hover:text-black/60">{pad(index + 1)}</span>
      <span className="text-3xl sm:text-6xl font-bold uppercase tracking-tight truncate">{children}</span>
    </span>
    <ArrowUpRight className="shrink-0 w-8 h-8 sm:w-12 sm:h-12 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
  </PageLink>
);

function Layout({ user, pages, children }) {
  return (
    <div className="@container min-h-screen overflow-x-clip bg-[#0b0b0c] text-[#f2f0e8] font-['Space_Grotesk',system-ui,sans-serif]">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-5 sm:px-10 py-4 bg-[#0b0b0c]/80 backdrop-blur">
        <PageLink page="home" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
          <span className="grid place-items-center w-9 h-9 rounded-full text-black" style={{ background: LIME }}>
            {initials(user.name)}
          </span>
          <span className="hidden md:inline">{user.name}</span>
        </PageLink>
        <nav className="flex flex-wrap justify-end gap-1.5">
          {pages.map((page, i) => (
            <PageLink
              key={page.key}
              page={page.key}
              className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-widest hover:border-white/50 transition-colors"
              activeClassName="rounded-full border border-transparent px-3 py-1.5 text-[11px] uppercase tracking-widest bg-[#c6f432] text-black font-bold"
            >
              <span className="opacity-50 mr-1.5">{pad(i + 1)}</span>
              {page.label}
            </PageLink>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="px-5 sm:px-10 pt-24 pb-8 select-none">
        <p
          aria-hidden
          className={`${giant} text-[clamp(3rem,15cqw,13rem)] text-transparent`}
          style={{ WebkitTextStroke: "1px rgba(242,240,232,0.25)" }}
        >
          {user.name}
        </p>
        <p className={`${kicker} text-white/40 mt-6`}>© {new Date().getFullYear()} {user.name}</p>
      </footer>
    </div>
  );
}

function Home({ user, pages }) {
  const { name, bio, avatar, skills = [], projects = [], experience = [] } = user;
  const current = experience.find((e) => e.isCurrent);
  const words = String(name || "Your Name").split(/\s+/);
  const hasProjects = pages.some((p) => p.key === "projects");

  return (
    <div>
      <section className="px-5 sm:px-10 pt-10 sm:pt-16">
        <p className={`${kicker} text-white/50 mb-5`}>{current ? `${current.title} @ ${current.company}` : "Portfolio"}</p>
        <h1 className={`${giant} text-[clamp(3.5rem,17cqw,15rem)]`}>
          {words.map((word, i) => (
            <span key={i} className="block" style={i % 2 ? { color: LIME } : undefined}>
              {word}
            </span>
          ))}
        </h1>
      </section>

      <Marquee
        items={skills.length ? skills : [name]}
        className="my-14 -rotate-2 scale-105 py-3 text-xl sm:text-3xl font-bold uppercase text-black bg-[#c6f432]"
      />

      <section className="px-5 sm:px-10 grid gap-10 sm:grid-cols-12 items-center">
        <p className="sm:col-span-8 text-2xl sm:text-4xl font-medium leading-tight">{bio}</p>
        <div className="sm:col-span-4 flex flex-col items-start sm:items-end gap-5">
          {avatar && (
            <img src={avatar} alt={name} className="w-40 h-40 sm:w-56 sm:h-56 rounded-full object-cover -rotate-6" style={{ boxShadow: `10px 10px 0 ${LIME}` }} />
          )}
          <div className="flex flex-wrap gap-3">
            {hasProjects && (
              <PageLink page="projects" className="rounded-full bg-[#c6f432] px-6 py-3 text-sm font-bold uppercase tracking-widest text-black hover:scale-105 transition-transform">
                See the work
              </PageLink>
            )}
            <PageLink page="contact" className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Say hello
            </PageLink>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="mt-24">
          <p className={`${kicker} text-white/50 px-5 sm:px-10 mb-6`}>Selected work</p>
          <div className="border-b border-white/15">
            {projects.slice(0, 4).map((project, i) => (
              <ArrowRow key={i} page="projects" index={i}>
                {project.title}
              </ArrowRow>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function About({ user }) {
  const { bio, skills = [], projects = [], experience = [], education = [], testimonials = [] } = user;
  const stats = [
    [projects.length, "Projects"],
    [skills.length, "Skills"],
    [experience.length, "Roles"],
    [education.length, "Schools"],
  ].filter(([n]) => n > 0);

  return (
    <div className="px-5 sm:px-10 pt-10 pb-10 space-y-24">
      <section>
        <p className={`${kicker} text-white/50 mb-6`}>About</p>
        <p className="text-[clamp(1.75rem,5.5cqw,4.5rem)] font-medium leading-[1.08]">{bio}</p>
      </section>

      {stats.length > 0 && (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15 rounded-2xl overflow-hidden">
          {stats.map(([n, label]) => (
            <div key={label} className="bg-[#0b0b0c] p-6 sm:p-8">
              <p className="text-6xl sm:text-8xl font-black" style={{ color: LIME }}>{n}</p>
              <p className={`${kicker} text-white/50 mt-2`}>{label}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <p className={`${kicker} text-white/50 mb-6`}>Toolbox</p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <span key={i} className="rounded-full border border-white/25 px-5 py-2.5 text-lg font-medium hover:text-black hover:border-transparent transition-colors hover:bg-[#c6f432]">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <p className={`${kicker} text-white/50 mb-6`}>Education</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, i) => (
              <div key={i} className="rounded-2xl border border-white/15 p-6">
                <p className="text-5xl font-black text-white/20">{edu.yearOfCompletion || "—"}</p>
                <p className="text-2xl font-bold mt-3">{edu.degree || edu.level}</p>
                <p className="text-white/60">{edu.institution}</p>
                <p className="text-sm text-white/40 mt-1">
                  {[edu.fieldOfStudy, edu.status, edu.score && `Score ${edu.score}`].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((item, i) => (
            <figure key={i} className="rounded-[2rem] p-8 text-black" style={{ background: ACCENTS[(i + 1) % ACCENTS.length] }}>
              <blockquote className="text-2xl font-bold leading-snug">“{item.feedback}”</blockquote>
              <figcaption className={`${kicker} mt-5`}>
                {item.name}
                {item.role && ` · ${item.role}`}
              </figcaption>
            </figure>
          ))}
        </section>
      )}
    </div>
  );
}

function Projects({ user }) {
  const { projects = [] } = user;

  return (
    <div className="px-5 sm:px-10 pt-10 pb-24">
      <h1 className={`${giant} text-[clamp(3.5rem,16cqw,14rem)] mb-12`}>
        Work<span style={{ color: LIME }}>.</span>
      </h1>
      <div>
        {projects.map((project, i) => (
          <article
            key={i}
            className="sticky rounded-[2rem] p-6 sm:p-8 mb-6 min-h-[18rem] text-black shadow-2xl"
            style={{ top: `${5 + i * 4.5}rem`, background: ACCENTS[i % ACCENTS.length] }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="text-3xl sm:text-5xl font-black leading-none">{pad(i + 1)}</span>
                <h2 className={`${giant} text-3xl sm:text-5xl truncate`}>{project.title}</h2>
              </div>
              <div className="flex flex-wrap justify-end gap-2 shrink-0">
                {project.github && (
                  <External href={project.github} className="rounded-full bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                    Code ↗
                  </External>
                )}
                {project.deployed && (
                  <External href={project.deployed} className="rounded-full bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                    Live ↗
                  </External>
                )}
              </div>
            </div>
            <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <BulletList
                text={project.description}
                className="max-w-2xl space-y-1.5 font-medium text-lg sm:text-xl"
                itemClassName="pl-6 relative before:content-['→'] before:absolute before:left-0"
              />
              {project.media?.[0] && (
                <img src={project.media[0]} alt={project.title} loading="lazy" className="hidden sm:block w-56 h-40 object-cover rounded-2xl rotate-3 shrink-0" />
              )}
            </div>
          </article>
        ))}
        <div aria-hidden className="h-[30vh]" />
      </div>
    </div>
  );
}

function Experience({ user }) {
  const jobs = sortedExperience(user);

  return (
    <div className="pt-10 pb-10">
      <h1 className={`${giant} text-[clamp(3.5rem,16cqw,14rem)] px-5 sm:px-10 mb-12`}>
        Path<span style={{ color: LIME }}>.</span>
      </h1>
      <div className="border-b border-white/15">
        {jobs.map((job, i) => (
          <article key={i} className="grid gap-4 sm:grid-cols-12 border-t border-white/15 px-5 sm:px-10 py-8 sm:py-12 hover:bg-white/[0.04] transition-colors">
            <p className={`${kicker} sm:col-span-3 pt-2`} style={{ color: LIME }}>
              {formatRange(job)}
            </p>
            <div className="sm:col-span-9">
              <h2 className={`${giant} text-4xl sm:text-7xl`}>{job.company}</h2>
              <p className="text-xl mt-3 text-white/70">
                {job.title}
                {job.location && ` — ${job.location}`}
              </p>
              <BulletList
                text={job.description}
                className="mt-6 space-y-2 text-white/70 max-w-2xl text-lg"
                itemClassName="pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-[#c6f432]"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Contact({ user }) {
  const { email, phone, address, resume, social = [] } = user;

  return (
    <div className="px-5 sm:px-10 pt-10 pb-10">
      <h1 className={`${giant} text-[clamp(3.5rem,16cqw,14rem)]`}>
        Let&apos;s <span style={{ color: LIME }}>talk.</span>
      </h1>
      {email && (
        <a
          href={`mailto:${email}`}
          className="mt-10 inline-flex items-start gap-3 text-[clamp(1.5rem,6.5cqw,5.5rem)] font-bold leading-tight break-all hover:underline underline-offset-8 decoration-4"
          style={{ color: LIME }}
        >
          {email}
          <ArrowUpRight className="shrink-0 w-[1em] h-[1em]" />
        </a>
      )}
      <div className="mt-14 grid gap-8 sm:grid-cols-3 text-xl">
        {phone && (
          <div>
            <p className={`${kicker} text-white/40 mb-2`}>Call</p>
            <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
          </div>
        )}
        {address && (
          <div>
            <p className={`${kicker} text-white/40 mb-2`}>Based in</p>
            <p>{address}</p>
          </div>
        )}
        {resume && (
          <div>
            <p className={`${kicker} text-white/40 mb-2`}>Résumé</p>
            <External href={resume} className="hover:underline">Download ↗</External>
          </div>
        )}
      </div>
      {social.length > 0 && (
        <div className="mt-20 -mx-5 sm:-mx-10 border-b border-white/15">
          {social.map((item, i) => (
            <External
              key={i}
              href={item.url}
              className="group flex items-center justify-between gap-4 border-t border-white/15 px-5 sm:px-10 py-6 hover:bg-[#c6f432] hover:text-black transition-colors"
            >
              <span className="text-3xl sm:text-6xl font-bold uppercase tracking-tight">{item.platform}</span>
              <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
            </External>
          ))}
        </div>
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="px-5 sm:px-10 py-24">
      <h1 className={`${giant} text-[clamp(3rem,13cqw,11rem)]`}>
        Lost<span style={{ color: LIME }}>?</span>
      </h1>
      <p className="text-2xl text-white/60 mt-6 mb-8">This portfolio doesn&apos;t have that page.</p>
      <PageLink page="home" className="inline-block rounded-full bg-[#c6f432] px-6 py-3 text-sm font-bold uppercase tracking-widest text-black">
        Back home
      </PageLink>
    </div>
  );
}

const views = { home: Home, about: About, projects: Projects, experience: Experience, contact: Contact, notFound: NotFound };

const TemplateShowreel = ({ user, basePath }) => (
  <MultiPageTemplate user={user} basePath={basePath} Layout={Layout} views={views} />
);

export default TemplateShowreel;
