import { ChartColumn, LayoutTemplate, Link2, Palette, Smartphone, Zap } from "lucide-react";

const features = [
  {
    Icon: LayoutTemplate,
    title: "Multi-page templates",
    text: "Some designs give you real Home, About, Projects, Experience and Contact pages.",
  },
  {
    Icon: ChartColumn,
    title: "Built-in analytics",
    text: "See views, visitors, referrers and which links get clicked, without cookies.",
  },
  {
    Icon: Zap,
    title: "No code required",
    text: "Fill in a simple form and your portfolio updates instantly.",
  },
  {
    Icon: Smartphone,
    title: "Great on every screen",
    text: "Every template adapts from phones to wide monitors.",
  },
  {
    Icon: Link2,
    title: "A link that's yours",
    text: "Claim your own address and share it on your résumé, LinkedIn or GitHub.",
  },
  {
    Icon: Palette,
    title: "Switch designs anytime",
    text: "Your content stays put while you try a different look.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to get noticed
        </h2>
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, text }) => (
            <li key={title}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-100 text-indigo-600">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
