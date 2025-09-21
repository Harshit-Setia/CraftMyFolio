import React from "react";

// SVG Icon Components for demonstration
const TemplateIcon = () => (
  <svg
    className="h-7 w-7 text-indigo-600"
    xmlns="http://www.w.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    className="h-7 w-7 text-indigo-600"
    xmlns="http://www.w.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const ResponsiveIcon = () => (
  <svg
    className="h-7 w-7 text-indigo-600"
    xmlns="http://www.w.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <TemplateIcon />,
      title: "Stunning Templates",
      description:
        "Choose from a library of professionally designed templates built for developers, designers, and creatives.",
    },
    {
      icon: <CodeIcon />,
      title: "No Code Required",
      description:
        "Get your site online in minutes without writing a single line of code. Just add your content and publish.",
    },
    {
      icon: <ResponsiveIcon />,
      title: "Fully Responsive",
      description:
        "Your portfolio will look amazing on any device, from desktop monitors to mobile phones.",
    },
  ];

  return (
    <div className="bg-slate-50 py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Showcase Your Skills, Beautifully
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          CraftFolio gives you the tools to create a stunning portfolio that
          impresses recruiters and lands you the job.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-left"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
