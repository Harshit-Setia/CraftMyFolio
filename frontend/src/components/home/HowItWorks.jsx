import { templateInfo } from "../../folioTemplate/index.js";

const steps = [
  {
    title: "Create your account",
    text: "Sign up and add your projects, experience, skills and links in one simple dashboard.",
  },
  {
    title: "Choose a template",
    text: `Preview ${templateInfo.length} designs with your own content, and switch whenever you like.`,
  },
  {
    title: "Share your link",
    text: "Claim a personal link for your résumé and profiles, then see who visits with built-in analytics.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How it works</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="text-center md:text-left">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-indigo-600 text-sm font-bold text-white md:mx-0">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
