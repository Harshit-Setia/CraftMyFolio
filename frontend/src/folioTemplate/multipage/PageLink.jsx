import { Link } from "react-router-dom";
import { usePages } from "./pageContext.js";

export default function PageLink({ page, className = "", activeClassName, children }) {
  const { current, href, preview, go } = usePages();
  const classes = activeClassName && current === page ? activeClassName : className;
  const ariaCurrent = current === page ? "page" : undefined;

  if (preview) {
    return (
      <button type="button" onClick={() => go(page)} className={classes} aria-current={ariaCurrent}>
        {children}
      </button>
    );
  }

  return (
    <Link to={href(page)} className={classes} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
}
