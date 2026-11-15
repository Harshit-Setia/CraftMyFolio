import React, { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Check, ExternalLink, LayoutTemplate } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { GROUP_TITLES, SECTIONS } from "../features/dashboard/sections";

import Overview from "../features/dashboard/Overview";
import BasicDetails from "../features/dashboard/BasicDetails";
import EducationDetails from "../features/dashboard/EducationDetails";
import ExperienceDetails from "../features/dashboard/ExperienceDetails";
import ProjectsDetails from "../features/dashboard/ProjectsDetails";
import SkillsDetails from "../features/dashboard/SkillsDetails";
import SocialLinksDetails from "../features/dashboard/SocialLinks";
import TestimonialsDetails from "../features/dashboard/TestimonialsDetails";
import Analytics from "../features/dashboard/Analytics";

const renderSection = (key, user, goTo) => {
  switch (key) {
    case "basic":
      return <BasicDetails user={user} />;
    case "education":
      return <EducationDetails education={user.education} />;
    case "experience":
      return <ExperienceDetails experience={user.experience} />;
    case "projects":
      return <ProjectsDetails projects={user.projects} />;
    case "skills":
      return <SkillsDetails skills={user.skills} />;
    case "social":
      return <SocialLinksDetails social={user.social} />;
    case "testimonials":
      return <TestimonialsDetails testimonials={user.testimonials} />;
    case "analytics":
      return <Analytics />;
    default:
      return <Overview user={user} goTo={goTo} />;
  }
};

const GROUPS = ["main", "profile", "insights"];

const DashboardPage = () => {
  const { data: user, isLoading, isError } = useUser();
  const [params, setParams] = useSearchParams();

  const requested = params.get("tab");
  const active = SECTIONS.some((s) => s.key === requested)
    ? requested
    : "overview";
  const goTo = (key) => setParams(key === "overview" ? {} : { tab: key });

  useEffect(() => {
    document.title = "Dashboard | CraftFolio";
    window.scrollTo(0, 0);
    document
      .querySelector('[data-mobile-tab="true"][aria-current="page"]')
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-gray-600">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/" />;
  }

  const folio = user.folio_id;

  return (
    <div className="bg-slate-50 lg:flex lg:min-h-[70vh]">
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
        <nav aria-label="Dashboard" className="sticky top-0 space-y-6 p-5 pt-8">
          {GROUPS.map((group) => (
            <div key={group}>
              {GROUP_TITLES[group] && (
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {GROUP_TITLES[group]}
                </p>
              )}
              <ul className="space-y-1">
                {SECTIONS.filter((s) => s.group === group).map(
                  ({ key, label, Icon, done }) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => goTo(key)}
                        aria-current={active === key ? "page" : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          active === key
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-600 hover:bg-white hover:text-gray-900"
                        }`}
                      >
                        <Icon size={18} aria-hidden="true" />
                        <span className="flex-1 text-left">{label}</span>
                        {done && done(user) && (
                          <Check
                            size={15}
                            className="text-green-500"
                            aria-label="Complete"
                          />
                        )}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}

          <div className="space-y-2 border-t border-gray-200 pt-6">
            {folio && (
              <a
                href={`/folio/${folio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900"
              >
                <ExternalLink size={16} /> View portfolio
              </a>
            )}
            <Link
              to="/create"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900"
            >
              <LayoutTemplate size={16} />{" "}
              {folio ? "Change template" : "Create portfolio"}
            </Link>
          </div>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="-mx-4 mb-6 overflow-x-auto px-4 lg:hidden">
          <nav aria-label="Dashboard">
            <ul className="flex w-max gap-2 pb-1">
              {SECTIONS.map(({ key, label }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => goTo(key)}
                    aria-current={active === key ? "page" : undefined}
                    data-mobile-tab="true"
                    className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      active === key
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <main className="max-w-[1400px]">{renderSection(active, user, goTo)}</main>
      </div>
    </div>
  );
};

export default DashboardPage;
