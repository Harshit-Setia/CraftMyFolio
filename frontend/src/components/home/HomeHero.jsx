import { Link } from "react-router-dom";
import { templateInfo } from "../../folioTemplate/index.js";
import { useHomeCta } from "./useHomeCta.js";
import magazine from "../../assets/home/hero-magazine.jpg";
import showreel from "../../assets/home/hero-showreel.jpg";
import desktop from "../../assets/home/hero-desktop.jpg";

const Frame = ({ src, alt, priority = false }) => (
  <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10">
    <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
      <span className="ml-3 max-w-xs flex-1 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-gray-400">
        folio/alex-morgan
      </span>
    </div>
    <img
      src={src}
      alt={alt}
      width="1200"
      height="750"
      loading={priority ? "eager" : "lazy"}
      className="block h-auto w-full"
    />
  </div>
);

export default function HomeHero() {
  const cta = useHomeCta();
  const multiPage = templateInfo.filter((t) => t.multiPage).length;

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 text-center sm:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          {templateInfo.length} templates · {multiPage} multi-page · built-in analytics
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your portfolio,
          <br className="hidden sm:block" />{" "}
          <span className="text-indigo-600">live in minutes.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
          Pick a template, add your details, and share one link. No code required.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={cta.primary.to}
            className="w-full rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            {cta.primary.label}
          </Link>
          <Link
            to={cta.secondary.to}
            className="w-full rounded-lg border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
          >
            {cta.secondary.label}
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-16 h-[250px] max-w-5xl overflow-hidden px-6 sm:mt-20 sm:h-[430px]">
        <div className="absolute left-6 top-10 hidden w-[46%] origin-bottom-left -rotate-3 sm:block">
          <Frame src={showreel} alt="Showreel template preview" />
        </div>
        <div className="absolute right-6 top-10 hidden w-[46%] origin-bottom-right rotate-3 sm:block">
          <Frame src={desktop} alt="Desktop template preview" />
        </div>
        <div className="relative z-10 mx-auto w-full sm:w-[64%]">
          <Frame src={magazine} alt="Magazine template preview" priority />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
    </section>
  );
}
