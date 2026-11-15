import { Link } from "react-router-dom";
import { templateInfo } from "../../folioTemplate/index.js";
import { useHomeCta } from "./useHomeCta.js";

export const HOME_TEMPLATE_LIMIT = 15;

export default function TemplateGallery() {
  const { templateTo } = useHomeCta();
  const featured = templateInfo.slice(0, HOME_TEMPLATE_LIMIT);
  const hiddenCount = templateInfo.length - featured.length;

  return (
    <section id="templates" className="scroll-mt-8 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A design for every style</h2>
          <p className="mt-4 text-lg text-gray-600">
            Every template is fully responsive and uses the same content, so you can try another one without
            re-entering anything.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {featured.map((template) => (
            <li key={template.id}>
              <Link
                to={templateTo}
                className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <img
                  src={template.thumbnail}
                  alt={`${template.name} template preview`}
                  width="640"
                  height="330"
                  loading="lazy"
                  className="block aspect-[16/9] w-full object-cover object-top"
                />
                <div className="flex flex-col items-start gap-1 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                  <span className="max-w-full truncate text-sm font-semibold text-gray-800">{template.name}</span>
                  {template.multiPage && (
                    <span className="shrink-0 rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
                      Multi-page
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <p className="mt-10 text-center text-gray-600">
            Plus {hiddenCount} more {hiddenCount === 1 ? "template" : "templates"}.{" "}
            <Link to={templateTo} className="font-semibold text-indigo-600 hover:text-indigo-700">
              See them all when you create your portfolio
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
