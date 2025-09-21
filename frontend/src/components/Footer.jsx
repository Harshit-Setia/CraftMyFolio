import React from "react";
import { Link } from "react-router-dom"; // Step 1: Import Link

const Footer = () => {
  // Step 2: Update the data to include a 'path' for each link
  const linkSections = [
    {
      title: "Templates",
      links: [
        { name: "Developer", path: "/templates" },
        { name: "Designer", path: "/templates" },
        { name: "Freelancer", path: "/templates" },
        { name: "Student", path: "/templates" },
      ],
    },
    {
      title: "Features",
      links: [
        { name: "Custom Domain", path: "/features" },
        { name: "SEO Optimization", path: "/features" },
        { name: "Analytics", path: "/features" },
        { name: "Mobile Responsive", path: "/features" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top section with links */}
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
          {linkSections.map((section) => (
            <div key={section.title}>
              <p className="font-bold tracking-wide text-gray-900">
                {section.title}
              </p>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {/* Step 3: Replace <a> with <Link> and href with to */}
                    <Link
                      to={link.path}
                      className="text-gray-700 transition-colors duration-300 hover:text-indigo-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom section with copyright */}
        <div className="flex justify-center pt-5 pb-10">
          <p className="text-sm text-gray-600">
            © 2025 CraftFolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
