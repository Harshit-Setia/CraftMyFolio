import { useState } from "react";
import { Link } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";
import SectionHeader from "./SectionHeader";

const RANGES = [7, 30, 90];

const PAGE_LABELS = {
  home: "Home",
  about: "About",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

const KIND_LABELS = {
  social: "Social",
  project: "Project",
  resume: "Résumé",
  email: "Email",
  phone: "Phone",
  link: "Link",
};

const shortDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

const StatCard = ({ label, value, hint }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

function BarList({ title, rows, empty = "Nothing yet." }) {
  const max = Math.max(...rows.map((r) => r.count), 1);
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {rows.slice(0, 6).map((row) => (
            <li key={row.label}>
              <div className="flex justify-between gap-3 text-sm mb-1">
                <span className="text-gray-700 truncate">{row.label}</span>
                <span className="font-medium text-gray-900 shrink-0">{row.count.toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${(row.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ViewsChart({ series }) {
  const width = 640;
  const height = 180;
  const max = Math.max(...series.map((d) => d.views), 1);
  const slot = width / series.length;
  const bar = Math.max(slot * 0.7, 1);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-48" role="img" aria-label="Views and unique visitors per day">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1="0" x2={width} y1={height - f * (height - 8)} y2={height - f * (height - 8)} stroke="#f3f4f6" />
        ))}
        {series.map((d, i) => {
          const x = i * slot + (slot - bar) / 2;
          const viewsH = (d.views / max) * (height - 8);
          const uniquesH = (d.uniques / max) * (height - 8);
          return (
            <g key={d.date}>
              <title>{`${shortDate(d.date)}: ${d.views} views, ${d.uniques} visitors`}</title>
              <rect x={x} y={height - viewsH} width={bar} height={viewsH} rx="2" fill="#c7d2fe" />
              <rect x={x} y={height - uniquesH} width={bar} height={uniquesH} rx="2" fill="#4f46e5" />
            </g>
          );
        })}
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{shortDate(series[0].date)}</span>
        <span>{shortDate(series[Math.floor(series.length / 2)].date)}</span>
        <span>{shortDate(series[series.length - 1].date)}</span>
      </div>
      <div className="flex gap-4 text-xs text-gray-500 mt-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-200" /> Views
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" /> Unique visitors
        </span>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [days, setDays] = useState(30);
  const [copied, setCopied] = useState(false);
  const { data, isLoading, isError } = useAnalytics(days);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/folio/${data.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Analytics"
        subtitle="See who visits your portfolio and what they click."
        action={
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          {RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setDays(range)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                days === range ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {range} days
            </button>
          ))}
        </div>
        }
      />

      {isLoading && <p className="text-gray-500">Loading analytics...</p>}
      {isError && <p className="text-red-600">Could not load analytics. Please try again.</p>}

      {data?.noFolio && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-700 mb-4">Create your portfolio first, then visits will show up here.</p>
          <Link to="/create" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
            Create My Folio
          </Link>
        </div>
      )}

      {data && !data.noFolio && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Page views" value={data.totals.views} hint={`Last ${data.range.days} days`} />
            <StatCard label="Unique visitors" value={data.totals.uniques} hint="Counted once per day" />
            <StatCard label="Link clicks" value={data.totals.clicks} hint="Projects, socials, résumé, contact" />
          </div>

          {data.totals.views === 0 ? (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <p className="font-semibold text-indigo-900">No visits yet.</p>
              <p className="text-sm text-indigo-800 mt-1">
                Share your link to start seeing traffic. Your own visits aren&apos;t counted while you&apos;re signed in.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <code className="text-sm bg-white border border-indigo-100 rounded-lg px-3 py-2 break-all">
                  {`${window.location.origin}/folio/${data.slug}`}
                </code>
                <button type="button" onClick={copyLink} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </div>
          ) : (
            <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Views over time</h3>
              <ViewsChart series={data.series} />
            </section>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <BarList title="Top pages" rows={data.pages.map((p) => ({ label: PAGE_LABELS[p.key] || p.key, count: p.count }))} />
            <BarList
              title="Where visitors come from"
              rows={data.referrers.map((r) => ({ label: r.key === "direct" ? "Direct / unknown" : r.key, count: r.count }))}
              empty="No referrer data yet."
            />
            <BarList
              title="Devices"
              rows={data.devices.map((d) => ({ label: d.key.charAt(0).toUpperCase() + d.key.slice(1), count: d.count }))}
            />
            <BarList
              title="Most clicked links"
              rows={data.clicks.map((c) => ({
                label: c.kind === c.label || c.kind === "email" || c.kind === "phone" || c.kind === "resume"
                  ? KIND_LABELS[c.kind]
                  : `${KIND_LABELS[c.kind] || c.kind} · ${c.label}`,
                count: c.count,
              }))}
              empty="No link clicks yet."
            />
          </div>

          <p className="text-xs text-gray-400">
            Privacy-friendly: no cookies, no IP addresses stored, and visitors who send Do Not Track aren&apos;t counted. Unique
            visitors are counted per day, so someone returning on another day counts again.
          </p>
        </div>
      )}
    </div>
  );
}
