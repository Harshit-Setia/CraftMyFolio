import { ArrowUpRight } from "lucide-react";
import MultiPageTemplate from "./multipage/MultiPageTemplate.jsx";
import PageLink from "./multipage/PageLink.jsx";
import { External, BulletList } from "./multipage/shared.jsx";
import { formatRange, pad, sortedExperience } from "./multipage/helpers.js";

const serif = "font-['Playfair_Display',Georgia,serif]";
const label = "text-[11px] uppercase tracking-[0.25em] font-semibold";
const vermilion = "text-[#c8321e]";
const doubleRule = "border-t-4 border-double border-neutral-900";

const SECTION_TITLES = {
  about: "Profile",
  projects: "Features",
  experience: "The Record",
  contact: "Letters",
};

const sectionDeck = (key, user) => {
  if (key === "about") return "Background, skills and schooling";
  if (key === "projects") return `${user.projects?.length || 0} pieces of selected work`;
  if (key === "experience") return `${user.experience?.length || 0} roles, newest first`;
  return "Say hello";
};

function Layout({ user, pages, current, children }) {
  const index = Math.max(
    pages.findIndex((p) => p.key === current),
    0,
  );
  const year = new Date().getFullYear();

  return (
    <div className="@container min-h-screen bg-[#f4efe6] text-neutral-900 font-['Georgia',serif]">
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <div className={`${label} flex justify-between py-3 text-neutral-600`}>
          <span>
            Vol. {String(year).slice(2)} · Nº {pad(index + 1)}
          </span>
          <span className="hidden sm:inline">The portfolio of {user.name}</span>
          <span>{year}</span>
        </div>

        <header className={`${doubleRule} pt-6 text-center`}>
          <PageLink
            page="home"
            className={`${serif} w-full block text-[clamp(2.5rem,9cqw,6.5rem)] font-black leading-none tracking-tight`}
          >
            {user.name}
          </PageLink>
          <nav className="flex flex-wrap justify-center items-center gap-x-2 border-y border-neutral-900 mt-6 py-2.5">
            {pages.map((page, i) => (
              <span key={page.key} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-neutral-400">
                  ·
                </span>}
                <PageLink
                  page={page.key}
                  className={`${label} px-2 py-1 hover:text-[#c8321e]`}
                  activeClassName={`${label} px-2 py-1 ${vermilion} underline underline-offset-8 decoration-2`}
                >
                  {page.label}
                </PageLink>
              </span>
            ))}
          </nav>
        </header>

        <main className="py-10 sm:py-14">{children}</main>

        <footer className={`${doubleRule} py-6 flex flex-wrap justify-between gap-2 ${label} text-neutral-500`}>
          <span>© {year} {user.name}</span>
          <span>Set in Playfair Display &amp; Georgia</span>
        </footer>
      </div>
    </div>
  );
}

function Home({ user, pages }) {
  const { name, bio, avatar, testimonials = [], skills = [], experience = [] } = user;
  const current = experience.find((e) => e.isCurrent);
  const firstName = (name || "").split(" ")[0] || "me";
  const quote = testimonials[0];
  const sections = pages.filter((p) => p.key !== "home");
  const hasProjects = pages.some((p) => p.key === "projects");

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <p className={`${label} ${vermilion} mb-5`}>
            Cover story{current ? ` · ${current.company}` : ""}
          </p>
          <h1 className={`${serif} text-[clamp(2.75rem,10cqw,7rem)] font-black leading-[0.95] tracking-tight`}>
            Meet <em className={`${vermilion} font-bold`}>{firstName}.</em>
          </h1>
          {bio && <p className={`${serif} italic text-xl sm:text-2xl leading-relaxed mt-6 text-neutral-700`}>{bio}</p>}
          <p className={`${label} text-neutral-500 mt-6`}>Words &amp; code by {name}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            {hasProjects && (
              <PageLink page="projects" className="px-6 py-3 bg-neutral-900 text-[#f4efe6] text-sm tracking-wide hover:bg-[#c8321e] transition-colors">
                Read the features →
              </PageLink>
            )}
            <PageLink page="contact" className="px-6 py-3 border border-neutral-900 text-sm tracking-wide hover:bg-neutral-900 hover:text-[#f4efe6] transition-colors">
              Write to the editor
            </PageLink>
          </div>
        </div>

        <figure className="lg:col-span-5">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full max-h-[30rem] object-cover grayscale contrast-125 border border-neutral-900" />
          ) : (
            <div className={`${serif} aspect-[4/5] grid place-items-center bg-[#c8321e] text-[#f4efe6] text-8xl font-black italic`}>
              {firstName[0]}
            </div>
          )}
          <figcaption className={`${label} text-neutral-500 mt-2`}>Fig. 1 — {name}, on the cover</figcaption>
        </figure>
      </section>

      <section className={`${doubleRule} border-b-4 border-double pb-6`}>
        <h2 className={`${label} py-5`}>In this issue</h2>
        <ol>
          {sections.map((page, i) => (
            <li key={page.key}>
              <PageLink
                page={page.key}
                className="group flex w-full items-baseline gap-3 py-4 border-t border-neutral-300 text-left hover:text-[#c8321e] transition-colors"
              >
                <span className={`${serif} text-3xl sm:text-5xl font-bold shrink-0`}>{SECTION_TITLES[page.key]}</span>
                <span className="hidden sm:block flex-1 border-b border-dotted border-neutral-400 -translate-y-2" />
                <span className="flex-1 sm:flex-none text-right sm:text-left text-sm italic text-neutral-500 group-hover:text-[#c8321e]">
                  {sectionDeck(page.key, user)}
                </span>
                <span className={`${label} shrink-0`}>p. {pad(i + 2)}</span>
              </PageLink>
            </li>
          ))}
        </ol>
      </section>

      {quote && (
        <blockquote className="text-center max-w-3xl mx-auto">
          <p className={`${serif} italic text-3xl sm:text-4xl leading-snug`}>
            <span className={`${vermilion} text-6xl align-top leading-none`}>“</span>
            {quote.feedback}
          </p>
          <footer className={`${label} mt-5 text-neutral-600`}>
            — {quote.name}
            {quote.role && `, ${quote.role}`}
          </footer>
        </blockquote>
      )}

      {skills.length > 0 && (
        <section className="text-center">
          <h2 className={`${label} mb-4`}>Tools of the trade</h2>
          <p className={`${serif} italic text-2xl sm:text-3xl leading-relaxed text-neutral-700`}>
            {skills.join("  /  ")}
          </p>
        </section>
      )}
    </div>
  );
}

function About({ user }) {
  const { bio, address, skills = [], education = [], testimonials = [] } = user;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <article className="lg:col-span-8">
        <p className={`${label} ${vermilion} mb-3`}>Profile</p>
        <h1 className={`${serif} text-5xl sm:text-7xl font-black leading-[0.95] mb-10`}>
          The person behind the work
        </h1>
        {bio && (
          <p className="text-xl sm:text-2xl leading-relaxed first-letter:float-left first-letter:text-8xl first-letter:font-black first-letter:leading-[0.8] first-letter:pr-3 first-letter:pt-2 first-letter:text-[#c8321e] first-letter:font-['Playfair_Display',Georgia,serif]">
            {bio}
          </p>
        )}
        {testimonials.map((item, i) => (
          <blockquote key={i} className="mt-12 border-l-4 border-[#c8321e] pl-6">
            <p className={`${serif} italic text-2xl leading-snug`}>“{item.feedback}”</p>
            <footer className={`${label} mt-3 text-neutral-600`}>
              — {item.name}
              {item.role && `, ${item.role}`}
            </footer>
          </blockquote>
        ))}
      </article>

      <aside className="lg:col-span-4 border-t-4 border-double border-neutral-900 lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0 space-y-8">
        <h2 className={`${label} ${vermilion}`}>Fact box</h2>
        {address && (
          <div>
            <h3 className={`${label} text-neutral-500 mb-1`}>Based in</h3>
            <p className={`${serif} text-xl`}>{address}</p>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h3 className={`${label} text-neutral-500 mb-2`}>Schooling</h3>
            <ul className="space-y-4">
              {education.map((edu, i) => (
                <li key={i}>
                  <p className={`${serif} text-lg font-bold leading-tight`}>{edu.degree || edu.level}</p>
                  <p className="text-neutral-700">{edu.institution}</p>
                  <p className="text-sm italic text-neutral-500">
                    {[edu.yearOfCompletion, edu.status, edu.score && `Score ${edu.score}`].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <h3 className={`${label} text-neutral-500 mb-2`}>Skills</h3>
            <p className="leading-loose">{skills.join(" · ")}</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Projects({ user }) {
  const { projects = [] } = user;

  return (
    <div>
      <p className={`${label} ${vermilion} mb-3`}>The features</p>
      <h1 className={`${serif} text-5xl sm:text-7xl font-black leading-none`}>Selected work</h1>
      <ol className={`${doubleRule} mt-10`}>
        {projects.map((project, i) => (
          <li key={i} className="group grid gap-5 sm:grid-cols-12 py-9 border-b border-neutral-300">
            <span className={`${serif} sm:col-span-2 text-6xl sm:text-8xl font-black leading-[0.8] text-neutral-300 group-hover:text-[#c8321e] transition-colors`}>
              {pad(i + 1)}
            </span>
            <div className="sm:col-span-7">
              <h2 className={`${serif} text-3xl sm:text-5xl font-bold leading-tight mb-4`}>{project.title}</h2>
              <BulletList
                text={project.description}
                className="space-y-2 text-lg text-neutral-700 leading-relaxed"
                itemClassName="list-none before:content-['—'] before:mr-3 before:text-[#c8321e]"
              />
              {project.media?.[0] && (
                <img src={project.media[0]} alt={project.title} loading="lazy" className="mt-5 w-full max-h-64 object-cover grayscale group-hover:grayscale-0 transition" />
              )}
            </div>
            <div className="sm:col-span-3 flex sm:flex-col gap-4 sm:items-end">
              {project.github && (
                <External href={project.github} className={`${label} inline-flex items-center gap-1 border-b-2 border-neutral-900 pb-1 hover:text-[#c8321e] hover:border-[#c8321e]`}>
                  Read the code <ArrowUpRight size={14} />
                </External>
              )}
              {project.deployed && (
                <External href={project.deployed} className={`${label} inline-flex items-center gap-1 border-b-2 border-neutral-900 pb-1 hover:text-[#c8321e] hover:border-[#c8321e]`}>
                  See it live <ArrowUpRight size={14} />
                </External>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Experience({ user }) {
  const jobs = sortedExperience(user);

  return (
    <div>
      <p className={`${label} ${vermilion} mb-3`}>The record</p>
      <h1 className={`${serif} text-5xl sm:text-7xl font-black leading-none`}>Where I&apos;ve worked</h1>
      <div className={`${doubleRule} mt-10`}>
        {jobs.map((job, i) => (
          <article key={i} className="grid gap-3 sm:grid-cols-12 py-8 border-b border-neutral-300">
            <p className={`${label} sm:col-span-3 text-neutral-500 leading-relaxed`}>
              {formatRange(job)}
              {job.location && (
                <>
                  <br />
                  {job.location}
                </>
              )}
            </p>
            <div className="sm:col-span-9">
              <h2 className={`${serif} text-3xl font-bold leading-tight`}>{job.title}</h2>
              <p className={`${serif} italic text-xl ${vermilion} mb-4`}>{job.company}</p>
              <BulletList
                text={job.description}
                className="space-y-2 text-lg text-neutral-700 leading-relaxed"
                itemClassName="list-none before:content-['—'] before:mr-3 before:text-[#c8321e]"
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
    <div>
      <p className={`${label} ${vermilion} mb-3`}>Letters to the editor</p>
      <h1 className={`${serif} text-5xl sm:text-7xl font-black leading-none mb-8`}>Write to me.</h1>
      {email && (
        <a
          href={`mailto:${email}`}
          className={`${serif} italic block break-all text-[clamp(1.5rem,6cqw,4.5rem)] font-bold leading-tight underline decoration-[#c8321e] decoration-4 underline-offset-8 hover:text-[#c8321e]`}
        >
          {email}
        </a>
      )}
      <div className={`${doubleRule} mt-14 pt-8 grid gap-10 sm:grid-cols-2`}>
        <div className="space-y-5">
          {phone && (
            <div>
              <h2 className={`${label} text-neutral-500 mb-1`}>By telephone</h2>
              <a href={`tel:${phone}`} className={`${serif} text-2xl hover:text-[#c8321e]`}>{phone}</a>
            </div>
          )}
          {address && (
            <div>
              <h2 className={`${label} text-neutral-500 mb-1`}>In person</h2>
              <p className={`${serif} text-2xl`}>{address}</p>
            </div>
          )}
          {resume && (
            <External href={resume} className={`${label} inline-block border-b-2 border-neutral-900 pb-1 hover:text-[#c8321e]`}>
              Download the résumé ↗
            </External>
          )}
        </div>
        {social.length > 0 && (
          <div>
            <h2 className={`${label} text-neutral-500 mb-3`}>Find me elsewhere</h2>
            <ol className="space-y-2">
              {social.map((item, i) => (
                <li key={i}>
                  <External href={item.url} className={`${serif} group flex items-baseline gap-3 text-2xl hover:text-[#c8321e]`}>
                    <span className={`${label} text-neutral-400`}>{pad(i + 1)}</span>
                    {item.platform}
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </External>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="text-center py-16">
      <p className={`${label} ${vermilion} mb-3`}>Erratum</p>
      <h1 className={`${serif} text-5xl sm:text-7xl font-black`}>Page not found</h1>
      <p className="italic text-xl mt-4 mb-8 text-neutral-600">The editor regrets that this page is not in this issue.</p>
      <PageLink page="home" className="px-6 py-3 bg-neutral-900 text-[#f4efe6] text-sm hover:bg-[#c8321e] transition-colors">
        Back to the cover
      </PageLink>
    </div>
  );
}

const views = { home: Home, about: About, projects: Projects, experience: Experience, contact: Contact, notFound: NotFound };

const TemplateMagazine = ({ user, basePath }) => (
  <MultiPageTemplate user={user} basePath={basePath} Layout={Layout} views={views} />
);

export default TemplateMagazine;
