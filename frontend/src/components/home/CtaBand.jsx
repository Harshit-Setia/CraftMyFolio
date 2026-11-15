import { Link } from "react-router-dom";
import { useHomeCta } from "./useHomeCta.js";

export default function CtaBand() {
  const { primary } = useHomeCta();

  return (
    <section className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-indigo-600 px-6 py-14 text-center sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to build yours?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">It only takes a few minutes.</p>
        <Link
          to={primary.to}
          className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
        >
          {primary.label}
        </Link>
      </div>
    </section>
  );
}
