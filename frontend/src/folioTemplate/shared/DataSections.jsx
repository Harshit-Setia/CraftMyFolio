import { BulletList } from "../multipage/shared.jsx";
import { formatRange, sortedExperience } from "../multipage/helpers.js";

export function ExperienceSection({ user, c, title = "Experience" }) {
  const jobs = sortedExperience(user);
  if (!jobs.length) return null;
  return (
    <section className={c.section}>
      <h2 className={c.heading}>{title}</h2>
      <div className={c.list}>
        {jobs.map((job, i) => (
          <article key={i} className={c.card}>
            <h3 className={c.title}>{job.title}</h3>
            <p className={c.sub}>{[job.company, job.location].filter(Boolean).join(" · ")}</p>
            <p className={c.meta}>{formatRange(job)}</p>
            <BulletList text={job.description} className={c.bullets} itemClassName={c.bullet} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function EducationSection({ user, c, title = "Education" }) {
  const items = user?.education || [];
  if (!items.length) return null;
  return (
    <section className={c.section}>
      <h2 className={c.heading}>{title}</h2>
      <div className={c.list}>
        {items.map((edu, i) => (
          <article key={i} className={c.card}>
            <h3 className={c.title}>{edu.degree || edu.level}</h3>
            <p className={c.sub}>{edu.institution}</p>
            <p className={c.meta}>
              {[edu.fieldOfStudy, edu.yearOfCompletion, edu.status, edu.score && `Score ${edu.score}`]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection({ user, c, title = "Testimonials" }) {
  const items = user?.testimonials || [];
  if (!items.length) return null;
  return (
    <section className={c.section}>
      <h2 className={c.heading}>{title}</h2>
      <div className={c.list}>
        {items.map((item, i) => (
          <figure key={i} className={c.card}>
            <blockquote className={c.quote}>“{item.feedback}”</blockquote>
            <figcaption className={c.meta}>
              {item.name}
              {item.role && ` · ${item.role}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
