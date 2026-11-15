import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeHero from "../components/home/HomeHero";
import HowItWorks from "../components/home/HowItWorks";
import TemplateGallery from "../components/home/TemplateGallery";
import FeatureGrid from "../components/home/FeatureGrid";
import CtaBand from "../components/home/CtaBand";

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "CraftFolio | Build your portfolio in minutes";
  }, []);

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div>
      <HomeHero />
      <HowItWorks />
      <TemplateGallery />
      <FeatureGrid />
      <CtaBand />
    </div>
  );
}

export default Home;
