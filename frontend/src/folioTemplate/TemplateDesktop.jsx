import { useEffect, useState } from "react";
import {
  House,
  FolderOpen,
  Folder,
  Briefcase,
  Mail,
  Calendar,
  StickyNote,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  FileText,
  Wifi,
  Battery,
} from "lucide-react";
import MultiPageTemplate from "./multipage/MultiPageTemplate.jsx";
import PageLink from "./multipage/PageLink.jsx";
import { External, BulletList } from "./multipage/shared.jsx";
import { formatRange, initials, sortedExperience } from "./multipage/helpers.js";

const APPS = {
  home: { app: "Profile", Icon: House, tint: "from-sky-400 to-blue-600" },
  about: { app: "Notes", Icon: StickyNote, tint: "from-yellow-300 to-amber-500" },
  projects: { app: "Finder", Icon: FolderOpen, tint: "from-cyan-300 to-blue-500" },
  experience: { app: "Calendar", Icon: Calendar, tint: "from-rose-400 to-red-600" },
  contact: { app: "Mail", Icon: Mail, tint: "from-sky-300 to-indigo-600" },
};

const EVENT_COLORS = [
  "border-red-500 bg-red-50/80",
  "border-blue-500 bg-blue-50/80",
  "border-emerald-500 bg-emerald-50/80",
  "border-amber-500 bg-amber-50/80",
];

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{" "}
      {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
    </span>
  );
}

function Window({ title, icon: Icon, children }) {
  return (
    <section className="mx-auto w-full max-w-5xl rounded-2xl bg-white/80 backdrop-blur-2xl shadow-2xl ring-1 ring-black/10 overflow-hidden">
      <div className="flex items-center gap-2 px-4 h-11 bg-white/60 border-b border-black/5">
        <PageLink page="home" className="block w-3 h-3 rounded-full bg-red-500 hover:bg-red-600">
          <span className="sr-only">Close window</span>
        </PageLink>
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <div className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 truncate pr-12">
          {Icon && <Icon size={14} />}
          <span className="truncate">{title}</span>
        </div>
      </div>
      {children}
    </section>
  );
}

function Layout({ user, pages, current, children }) {
  const app = APPS[current]?.app || "Error";

  return (
    <div className="relative min-h-screen overflow-x-clip bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-orange-400 text-slate-900 font-sans">
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-cyan-300/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 -right-24 w-[28rem] h-[28rem] rounded-full bg-pink-300/40 blur-3xl" />

      <header className="sticky top-0 z-40 h-8 px-4 flex items-center justify-between gap-4 bg-black/25 backdrop-blur-xl text-white text-xs font-medium">
        <div className="flex items-center gap-4 min-w-0">
          <PageLink page="home" className="font-bold truncate">
            {user.name}
          </PageLink>
          <span className="hidden sm:inline text-white/80">{app}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Wifi size={13} />
          <Battery size={15} />
          <Clock />
        </div>
      </header>

      <main className="relative px-4 sm:px-8 pt-8 sm:pt-10 pb-8 min-h-[calc(100vh-2rem)]">{children}</main>

      <nav aria-label="Dock" className="sticky bottom-4 z-40 flex justify-center px-4 pb-4">
        <ul className="flex items-end gap-2 sm:gap-3 px-3 py-2.5 rounded-3xl bg-white/25 backdrop-blur-2xl ring-1 ring-white/50 shadow-2xl">
          {pages.map((page) => {
            const { Icon, tint } = APPS[page.key];
            return (
              <li key={page.key}>
                <PageLink page={page.key} className="group relative block">
                  <span
                    className={`grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b ${tint} text-white shadow-lg origin-bottom transition-transform duration-200 group-hover:-translate-y-2 group-hover:scale-125`}
                  >
                    <Icon size={24} />
                  </span>
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {page.label}
                  </span>
                  {current === page.key && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </PageLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

const Widget = ({ page, title, big, sub }) => (
  <PageLink
    page={page}
    className="block w-full text-left rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition"
  >
    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">{title}</span>
    <span className="block text-3xl font-bold mt-1 truncate">{big}</span>
    <span className="block text-sm text-slate-500 truncate">{sub}</span>
  </PageLink>
);

function Home({ user, pages }) {
  const { name, bio, avatar, address, skills = [], projects = [], experience = [] } = user;
  const current = experience.find((e) => e.isCurrent);
  const has = (key) => pages.some((p) => p.key === key);

  return (
    <Window title={`${name} — Profile`} icon={House}>
      <div className="p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          {avatar ? (
            <img src={avatar} alt={name} className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-3xl object-cover shadow-lg ring-4 ring-white" />
          ) : (
            <div className="grid place-items-center w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-4xl font-bold shadow-lg ring-4 ring-white">
              {initials(name)}
            </div>
          )}
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{name}</h1>
            {current && (
              <p className="mt-1 text-slate-500">
                {current.title} · {current.company}
              </p>
            )}
            {bio && <p className="mt-4 text-lg text-slate-700 max-w-xl">{bio}</p>}
            {address && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin size={14} />
                {address}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-8">
          {has("about") && skills.length > 0 && (
            <Widget page="about" title="Skills" big={skills.length} sub={skills.slice(0, 3).join(", ")} />
          )}
          {has("projects") && (
            <Widget page="projects" title="Projects" big={projects.length} sub={projects[0]?.title} />
          )}
          {has("experience") && (
            <Widget
              page="experience"
              title={current ? "Now" : "Experience"}
              big={experience.length}
              sub={current ? current.company : "roles"}
            />
          )}
        </div>
      </div>
    </Window>
  );
}

function About({ user }) {
  const { bio, skills = [], education = [], testimonials = [] } = user;
  const notes = [
    bio && { id: "bio", title: "Bio", snippet: bio },
    skills.length > 0 && { id: "skills", title: "Skills", snippet: `${skills.length} skills` },
    education.length > 0 && { id: "education", title: "Education", snippet: education[0].institution },
    testimonials.length > 0 && { id: "kind-words", title: "Kind words", snippet: testimonials[0].feedback },
  ].filter(Boolean);

  const [activeId, setActiveId] = useState(notes[0]?.id);
  const note = notes.find((n) => n.id === activeId) || notes[0];

  return (
    <Window title="Notes" icon={StickyNote}>
      <div className="grid md:grid-cols-[15rem_1fr] min-h-[28rem]">
        <ul className="flex md:block gap-1 overflow-x-auto border-b md:border-b-0 md:border-r border-black/5 bg-white/40 p-2">
          {notes.map((n) => (
            <li key={n.id} className="shrink-0 md:shrink">
              <button
                type="button"
                onClick={() => setActiveId(n.id)}
                className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${note?.id === n.id ? "bg-yellow-200/80" : "hover:bg-black/5"}`}
              >
                <span className="block text-sm font-semibold">{n.title}</span>
                <span className="block text-xs text-slate-500 truncate max-w-[12rem]">{n.snippet}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="p-6 sm:p-10 bg-[linear-gradient(transparent_31px,rgba(180,140,0,0.16)_32px)] bg-[length:100%_32px] leading-8">
          {!note && <p className="text-slate-500">Nothing here yet.</p>}
          {note?.id === "bio" && (
            <>
              <h1 className="text-3xl font-bold mb-4">Bio</h1>
              <p className="text-xl">{bio}</p>
            </>
          )}
          {note?.id === "skills" && (
            <>
              <h1 className="text-3xl font-bold mb-4">Skills</h1>
              <div className="flex flex-wrap gap-2 leading-normal">
                {skills.map((skill, i) => (
                  <span key={i} className="rounded-md bg-yellow-200 px-2.5 py-1 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
          {note?.id === "education" && (
            <>
              <h1 className="text-3xl font-bold mb-4">Education</h1>
              <ul className="space-y-4 leading-normal">
                {education.map((edu, i) => (
                  <li key={i}>
                    <p className="text-lg font-semibold">{edu.degree || edu.level}</p>
                    <p className="text-slate-700">{edu.institution}</p>
                    <p className="text-sm text-slate-500">
                      {[edu.fieldOfStudy, edu.yearOfCompletion, edu.status, edu.score && `Score ${edu.score}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {note?.id === "kind-words" && (
            <>
              <h1 className="text-3xl font-bold mb-4">Kind words</h1>
              <div className="space-y-6 leading-normal">
                {testimonials.map((item, i) => (
                  <blockquote key={i} className="border-l-4 border-amber-400 pl-4">
                    <p className="text-lg italic">“{item.feedback}”</p>
                    <footer className="text-sm text-slate-500 mt-1">
                      {item.name}
                      {item.role && ` · ${item.role}`}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Window>
  );
}

function Projects({ user }) {
  const { projects = [] } = user;
  const [selected, setSelected] = useState(0);
  const project = projects[selected] || projects[0];

  return (
    <Window title="Projects" icon={FolderOpen}>
      <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-500 border-b border-black/5 bg-white/40">
        <span>Macintosh HD</span>›<span>Projects</span>›
        <span className="font-medium text-slate-800 truncate">{project?.title}</span>
        <span className="ml-auto shrink-0">{projects.length} items</span>
      </div>
      <div className="grid lg:grid-cols-[1fr_20rem] min-h-[26rem]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 content-start">
          {projects.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`rounded-xl p-3 text-center transition-colors ${i === selected ? "bg-blue-500/15 ring-1 ring-blue-500/40" : "hover:bg-black/5"}`}
            >
              <Folder size={64} strokeWidth={1.2} className="mx-auto fill-sky-400 text-sky-500" />
              <span className="block mt-1 text-xs font-medium line-clamp-2">{p.title}</span>
            </button>
          ))}
        </div>
        {project && (
          <aside className="border-t lg:border-t-0 lg:border-l border-black/5 bg-white/50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Get Info</p>
            <div className="flex items-center gap-3 mb-4">
              <Folder size={40} strokeWidth={1.2} className="fill-sky-400 text-sky-500 shrink-0" />
              <h2 className="text-xl font-bold leading-tight">{project.title}</h2>
            </div>
            <BulletList
              text={project.description}
              className="space-y-2 text-sm text-slate-700"
              itemClassName="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-500"
            />
            {project.media?.[0] && (
              <img src={project.media[0]} alt={project.title} loading="lazy" className="mt-4 rounded-lg ring-1 ring-black/10 w-full max-h-44 object-cover" />
            )}
            <div className="flex flex-wrap gap-2 mt-5">
              {project.github && (
                <External href={project.github} className="inline-flex items-center gap-1 rounded-lg bg-slate-900 text-white px-3 py-1.5 text-xs font-medium hover:bg-slate-700">
                  Source <ArrowUpRight size={12} />
                </External>
              )}
              {project.deployed && (
                <External href={project.deployed} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-blue-500">
                  Open <ArrowUpRight size={12} />
                </External>
              )}
            </div>
          </aside>
        )}
      </div>
    </Window>
  );
}

function Experience({ user }) {
  const jobs = sortedExperience(user);
  const groups = [];
  jobs.forEach((job, index) => {
    const year = job.from ? new Date(job.from).getFullYear() : "—";
    const group = groups.find((g) => g.year === year);
    const entry = { job, index };
    if (group) group.items.push(entry);
    else groups.push({ year, items: [entry] });
  });

  return (
    <Window title="Calendar" icon={Calendar}>
      <div className="p-6 sm:p-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Briefcase size={26} className="text-red-500" /> Agenda
        </h1>
        <p className="text-slate-500 mt-1">Every role, newest first.</p>
        {groups.map((group) => (
          <div key={group.year} className="grid sm:grid-cols-[5rem_1fr] gap-3 sm:gap-5 mt-8">
            <p className="text-3xl font-bold text-red-500 sm:text-right">{group.year}</p>
            <div className="space-y-3">
              {group.items.map(({ job, index }) => (
                <article key={index} className={`rounded-xl border-l-4 p-4 shadow-sm ${EVENT_COLORS[index % EVENT_COLORS.length]}`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {[formatRange(job), job.location].filter(Boolean).join(" · ")}
                  </p>
                  <h2 className="text-lg font-bold mt-1">{job.title}</h2>
                  <p className="text-slate-600 mb-3">{job.company}</p>
                  <BulletList
                    text={job.description}
                    className="space-y-1 text-sm text-slate-700"
                    itemClassName="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400"
                  />
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}

function Contact({ user }) {
  const { name, email, phone, address, resume, social = [] } = user;
  const first = String(name || "").split(" ")[0];
  const [subject, setSubject] = useState(`Hello ${first}`);
  const [message, setMessage] = useState("");
  const validEmail = /^[^\s@]+@[^\s@]+$/.test(email || "");

  const send = (event) => {
    event.preventDefault();
    if (!validEmail) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <Window title="New Message" icon={Mail}>
      <div className="grid md:grid-cols-[1fr_16rem]">
        <form onSubmit={send} className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 border-b border-black/5 pb-3">
            <span className="w-16 text-sm text-slate-400">To</span>
            <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm truncate">{email || "no email added yet"}</span>
          </div>
          <div className="flex items-center gap-3 border-b border-black/5 pb-3">
            <label htmlFor="cmf-subject" className="w-16 text-sm text-slate-400">Subject</label>
            <input
              id="cmf-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-medium"
            />
          </div>
          <label htmlFor="cmf-message" className="sr-only">
            Message
          </label>
          <textarea
            id="cmf-message"
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Write to ${first || "me"}…`}
            className="w-full resize-none bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-400">Opens in your mail app.</p>
            <button
              type="submit"
              disabled={!validEmail}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={14} /> Send
            </button>
          </div>
        </form>

        <aside className="border-t md:border-t-0 md:border-l border-black/5 bg-white/50 p-5 space-y-4 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contact card</p>
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-blue-600">
              <Phone size={14} className="text-slate-400" /> {phone}
            </a>
          )}
          {address && (
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-slate-400" /> {address}
            </p>
          )}
          {resume && (
            <External href={resume} className="flex items-center gap-2 hover:text-blue-600">
              <FileText size={14} className="text-slate-400" /> Résumé
            </External>
          )}
          {social.length > 0 && (
            <ul className="space-y-1.5 pt-2 border-t border-black/5">
              {social.map((item, i) => (
                <li key={i}>
                  <External href={item.url} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    {item.platform} <ArrowUpRight size={12} />
                  </External>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </Window>
  );
}

function NotFound() {
  return (
    <Window title="Error" icon={House}>
      <div className="p-10 text-center">
        <p className="text-5xl mb-3">🗂️</p>
        <h1 className="text-2xl font-bold">The page can&apos;t be opened</h1>
        <p className="text-slate-500 mt-2 mb-6">This portfolio doesn&apos;t have that page.</p>
        <PageLink page="home" className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500">
          OK
        </PageLink>
      </div>
    </Window>
  );
}

const views = { home: Home, about: About, projects: Projects, experience: Experience, contact: Contact, notFound: NotFound };

const TemplateDesktop = ({ user, basePath }) => (
  <MultiPageTemplate user={user} basePath={basePath} Layout={Layout} views={views} />
);

export default TemplateDesktop;
