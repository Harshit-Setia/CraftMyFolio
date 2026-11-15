const API_BASE_URL = `${import.meta.env.VITE_BE_URL}`;

const authHeader = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
};

const send = (slug, payload) => {
  fetch(`${API_BASE_URL}/folio/${encodeURIComponent(slug)}/event`, {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  }).catch(() => {});
};

export const trackView = (slug, page, initial) =>
  send(slug, {
    type: "view",
    page,
    initial,
    referrer: initial ? document.referrer : undefined,
  });

export const trackClick = (slug, link) => send(slug, { type: "click", ...link });

const normalize = (url) => String(url || "").trim().replace(/\/+$/, "").toLowerCase();

export const classifyLink = (href, user) => {
  if (!href) return null;
  if (/^mailto:/i.test(href)) return { kind: "email", label: "email" };
  if (/^tel:/i.test(href)) return { kind: "phone", label: "phone" };
  if (!/^https?:\/\//i.test(href)) return null;

  const target = normalize(href);
  if (user?.resume && normalize(user.resume) === target) return { kind: "resume", label: "resume" };

  const social = (user?.social || []).find((item) => normalize(item.url) === target);
  if (social) return { kind: "social", label: social.platform };

  for (const project of user?.projects || []) {
    if (project.github && normalize(project.github) === target) {
      return { kind: "project", label: `${project.title} (code)` };
    }
    if (project.deployed && normalize(project.deployed) === target) {
      return { kind: "project", label: `${project.title} (live)` };
    }
  }

  try {
    const url = new URL(href);
    if (url.origin === window.location.origin) return null;
    return { kind: "link", label: url.hostname.replace(/^www\./, "") };
  } catch {
    return null;
  }
};
