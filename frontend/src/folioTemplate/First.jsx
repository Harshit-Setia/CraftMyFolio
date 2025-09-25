import React from "react";

const First = ({
  name = "",
  bio = "",
  avatar = "",
  resume = "",
  education = [],      // ✅ default to array
  social = [],         // ✅ default to array
  skills = [],         // ✅ default to array
  projects = [],       // ✅ default to array
  experience = [],     // ✅ default to array
  testimonials = [],   // ✅ default to array
  accent_color = "#007bff" // ✅ added default accent color
}) => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
      color: "#333",
      minHeight: "100vh",
      padding: "2rem",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `3px solid ${accent_color}`, // ✅ give border a color
    },
    name: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    bio: {
      marginTop: "0.5rem",
      fontSize: "1.1rem",
    },
    section: {
      marginTop: "2rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      color: "#555",
      marginBottom: "0.5rem",
    },
    card: {
      border: `1px solid ${accent_color}`, // ✅ give border a color
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <img src={avatar} alt={name} style={styles.avatar} />
        <div>
          <h1 style={styles.name}>{name}</h1>
          <p style={styles.bio}>{bio}</p>
          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accent_color }}
            >
              Download Resume
            </a>
          )}
        </div>
      </header>

      {/* Social Links */}
      {social.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Connect</h2>
          <ul>
            {social.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={styles.card}>
              <h3>{edu.level}</h3>
              <p>
                {edu.institution} ({edu.yearOfCompletion})
              </p>
              <p>{edu.degree ? `${edu.degree}, ${edu.fieldOfStudy}` : ""}</p>
              <p>{edu.score}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <ul>
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={styles.card}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {p.deployed && (
                <a
                  href={p.deployed}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "1rem" }}
                >
                  Live
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={styles.card}>
              <h3>
                {exp.title} @ {exp.company}
              </h3>
              <p>
                {new Date(exp.from).getFullYear()} -{" "}
                {exp.isCurrent
                  ? "Present"
                  : exp.to
                  ? new Date(exp.to).getFullYear()
                  : ""}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Testimonials</h2>
          {testimonials.map((t, i) => (
            <div key={i} style={styles.card}>
              <p>"{t.feedback}"</p>
              <p>
                — {t.name}, {t.role}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default First;
