import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Copy, ExternalLink, LayoutTemplate } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { templateInfo } from "../../folioTemplate/index.js";
import { completionItems } from "./sections";

const Card = ({ title, action, children }) => (
  <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
    {(title || action) && (
      <div className="mb-4 flex items-center justify-between gap-3">
        {title && <h2 className="font-semibold text-gray-900">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </section>
);

function Ring({ percent }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-lg font-bold text-gray-900">{percent}%</span>
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div>
    <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default function Overview({ user, goTo }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { data: stats } = useAnalytics(7);

  const folio = user.folio_id;
  const url = folio ? `${window.location.origin}/folio/${folio.slug}` : null;
  const templateName = folio ? templateInfo.find((t) => t.id === folio.template_id)?.name || folio.template_id : null;

  const items = completionItems(user);
  const doneCount = items.filter((item) => item.done).length;
  const percent = Math.round((doneCount / items.length) * 100);
  const firstName = String(user.name || "").split(" ")[0] || "there";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const openItem = (item) => (item.target === "create" ? navigate("/create") : goTo(item.target));
  const hasStats = folio && stats && !stats.noFolio;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Welcome back, {firstName}</h1>
        <p className="mt-1 text-gray-500">Here&apos;s how your portfolio is doing.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Card title={folio ? "Your portfolio" : "Publish your portfolio"}>
            {folio ? (
              <>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" /> Live
                </p>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <span className="min-w-0 flex-1 truncate font-mono text-sm text-gray-700">{url}</span>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`/folio/${folio.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <ExternalLink size={15} /> View portfolio
                  </a>
                  <Link
                    to="/create"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <LayoutTemplate size={15} /> Change template
                  </Link>
                </div>
                <dl className="mt-5 grid gap-3 border-t border-gray-100 pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-500">Template</dt>
                    <dd className="font-medium text-gray-900">{templateName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Phone number</dt>
                    <dd className="font-medium text-gray-900">
                      {user.showPhone ? "Shown on your portfolio" : "Hidden"}{" "}
                      <button type="button" onClick={() => goTo("basic")} className="font-medium text-indigo-600 hover:underline">
                        Change
                      </button>
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <>
                <p className="text-gray-600">Pick a template and claim your link to put your portfolio online.</p>
                <Link
                  to="/create"
                  className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Create my portfolio
                </Link>
              </>
            )}
          </Card>

          {hasStats && (
            <Card
              title="Last 7 days"
              action={
                <button
                  type="button"
                  onClick={() => goTo("analytics")}
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                >
                  Full analytics <ArrowRight size={14} />
                </button>
              }
            >
              <div className="grid grid-cols-3 gap-4">
                <Stat label="Page views" value={stats.totals.views} />
                <Stat label="Visitors" value={stats.totals.uniques} />
                <Stat label="Link clicks" value={stats.totals.clicks} />
              </div>
              {stats.totals.views === 0 && (
                <p className="mt-4 text-sm text-gray-500">No visits yet. Share your link to start seeing traffic.</p>
              )}
            </Card>
          )}
        </div>

        <Card title="Profile strength">
          <div className="mb-5 flex items-center gap-4">
            <Ring percent={percent} />
            <p className="text-sm text-gray-600">
              {doneCount} of {items.length} steps complete.{" "}
              {percent === 100 ? "Your profile is complete." : "A fuller profile makes a stronger portfolio."}
            </p>
          </div>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => openItem(item)}
                  className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                      item.done ? "border-green-500 bg-green-500 text-white" : "border-gray-300 text-transparent"
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className={item.done ? "text-gray-500" : "font-medium text-gray-800"}>{item.label}</span>
                  {!item.done && <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-indigo-600" />}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
