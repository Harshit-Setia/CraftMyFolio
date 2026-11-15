export const bullets = (text) =>
  String(text || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[•\-*]\s*/, "").trim())
    .filter(Boolean);

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "";

export const formatRange = ({ from, to, isCurrent }) => {
  const end = isCurrent || !to ? "Present" : formatDate(to);
  const start = formatDate(from);
  return start ? `${start} – ${end}` : end;
};

export const safeUrl = (url) => {
  const value = String(url || "").trim();
  return /^(https?:\/\/|mailto:|tel:)/i.test(value) ? value : "#";
};

export const buildPages = (user) => {
  const pages = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
  ];
  if (user?.projects?.length) pages.push({ key: "projects", label: "Projects" });
  if (user?.experience?.length) pages.push({ key: "experience", label: "Experience" });
  pages.push({ key: "contact", label: "Contact" });
  return pages;
};

export const sortedExperience = (user) =>
  [...(user?.experience || [])].sort(
    (a, b) => new Date(b.from || 0) - new Date(a.from || 0),
  );

export const initials = (name) =>
  String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export const pad = (n) => String(n).padStart(2, "0");
