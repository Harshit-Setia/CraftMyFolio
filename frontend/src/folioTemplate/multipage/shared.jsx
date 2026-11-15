import { bullets, safeUrl } from "./helpers.js";

export const External = ({ href, className, children }) => (
  <a href={safeUrl(href)} target="_blank" rel="noreferrer" className={className}>
    {children}
  </a>
);

export const BulletList = ({ text, className = "", itemClassName = "" }) => {
  const items = bullets(text);
  if (!items.length) return null;
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i} className={itemClassName}>
          {item}
        </li>
      ))}
    </ul>
  );
};
