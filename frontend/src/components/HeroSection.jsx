import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-white">
      <div className="text-center w-full mx-auto py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
          <span className="block text-indigo-700">Build Your Developer</span>
          <span className="block text-indigo-700">Portfolio in Minutes</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
          Choose from dozens of professional templates. No coding required.
        </p>

        {/* Call to Action Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/signup"
            className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 duration-300 ease-in-out"
          >
            Create Your Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
