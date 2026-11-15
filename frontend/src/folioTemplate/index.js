import MagazineImg from "../assets/templates/magazine.jpg";
import ShowreelImg from "../assets/templates/showreel.jpg";
import DesktopImg from "../assets/templates/desktop.jpg";
import HeroImg from "../assets/templates/hero.jpg";
import HazardImg from "../assets/templates/hazard.jpg";
import BentoImg from "../assets/templates/bento.jpg";
import CyberpunkImg from "../assets/templates/cyberpunk.jpg";
import DevImg from "../assets/templates/dev.jpg";
import GlassImg from "../assets/templates/glass.jpg";
import NeoBrutalImg from "../assets/templates/neobrutal.jpg";
import ClassicImg from "../assets/templates/classic.jpg";
import NeoPopImg from "../assets/templates/neopop.jpg";
import ResumeImg from "../assets/templates/resume.jpg";
import TerminalImg from "../assets/templates/terminal.jpg";
import TimelineImg from "../assets/templates/timeline.jpg";

import TemplateMagazine from "./TemplateMagazine";
import TemplateShowreel from "./TemplateShowreel";
import TemplateDesktop from "./TemplateDesktop";
import TemplateHazard from "./TemplateHazard";
import TemplateBento from "./TemplateBento";
import TemplateClassic from "./TemplateClassic";
import TemplateCyberpunk from "./TemplateCyberpunk";
import TemplateDev from "./TemplateDev";
import TemplateGlass from "./TemplateGlass";
import TemplateNeoBrutal from "./TemplateNeoBrutal";
import TemplateNeoPop from "./TemplateNeoPop";
import TemplateResume from "./TemplateResume";
import TemplateTerminal from "./TemplateTerminal";
import TemplateTimeline from "./TemplateTimeline";
import TemplatePro from "./TemplateHero";

export const templateInfo = [
  { id: "Magazine", name: "Magazine", thumbnail: MagazineImg, component: TemplateMagazine, multiPage: true },
  { id: "Showreel", name: "Showreel", thumbnail: ShowreelImg, component: TemplateShowreel, multiPage: true },
  { id: "Desktop", name: "Desktop", thumbnail: DesktopImg, component: TemplateDesktop, multiPage: true },
  { id: "Hero", name: "Hero", thumbnail: HeroImg, component: TemplatePro },
  { id: "Industry Hazard", name: "Industry Hazard", thumbnail: HazardImg, component: TemplateHazard },
  { id: "Bento", name: "Bento", thumbnail: BentoImg, component: TemplateBento },
  { id: "CyberPunk", name: "CyberPunk", thumbnail: CyberpunkImg, component: TemplateCyberpunk },
  { id: "Dev", name: "Dev", thumbnail: DevImg, component: TemplateDev },
  { id: "Glass", name: "Glass", thumbnail: GlassImg, component: TemplateGlass },
  { id: "NeoBrutual", name: "NeoBrutual", thumbnail: NeoBrutalImg, component: TemplateNeoBrutal },
  { id: "Classic", name: "Classic", thumbnail: ClassicImg, component: TemplateClassic },
  { id: "NeoPop", name: "NeoPop", thumbnail: NeoPopImg, component: TemplateNeoPop },
  { id: "Resume", name: "Feels Like a Resume", thumbnail: ResumeImg, component: TemplateResume },
  { id: "Terminal", name: "Terminal", thumbnail: TerminalImg, component: TemplateTerminal },
  { id: "Timeline", name: "Timeline", thumbnail: TimelineImg, component: TemplateTimeline },
];
