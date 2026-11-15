import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageContext } from "./pageContext.js";
import { buildPages } from "./helpers.js";

export default function MultiPageTemplate({ user, basePath, Layout, views }) {
  const safeUser = useMemo(() => user || {}, [user]);
  const preview = basePath === undefined;
  const location = useLocation();
  const [previewPage, setPreviewPage] = useState("home");

  const pages = useMemo(() => buildPages(safeUser), [safeUser]);
  const current = preview
    ? previewPage
    : location.pathname.split("/").filter(Boolean)[2] || "home";

  const context = useMemo(
    () => ({
      current,
      preview,
      go: setPreviewPage,
      href: (page) => (page === "home" ? basePath : `${basePath}/${page}`),
    }),
    [current, preview, basePath],
  );

  useEffect(() => {
    if (preview) return;
    const label = pages.find((p) => p.key === current)?.label;
    document.title = [safeUser.name, label && current !== "home" ? label : "Portfolio"]
      .filter(Boolean)
      .join(" | ");
    window.scrollTo(0, 0);
  }, [current, pages, preview, safeUser.name]);

  const View = pages.some((p) => p.key === current) ? views[current] : views.notFound;

  return (
    <PageContext.Provider value={context}>
      <Layout user={safeUser} pages={pages} current={current}>
        <View user={safeUser} pages={pages} />
      </Layout>
    </PageContext.Provider>
  );
}
