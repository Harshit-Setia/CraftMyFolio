import TemplateGlass from "./First";
import Third from "./Third";

// export const templates = {
//     TemplateGlass,
//     Second
// }

import FirstImg from '../assets/templates/FirstImg.jpg'
import TemplateClassic from "./TemplateClassic";
import TemplateDev from "./Modern";
import TemplateBento from "./Bento";
import TemplateTerminal from "./Terminal";
import TemplateNeoBrutal from "./Neon";


export const templateInfo = [
    {
        id : "Third",
        name : "Sexist (Real Data)",
        thumbnail : FirstImg,
        component : Third
    },
    {
        id:"Modern",
        name : "Modern Template",
        thumbnail : FirstImg,
        component : TemplateDev
    },
    {
        id:"Bento",
        name : "Bento Template",
        thumbnail : FirstImg,
        component : TemplateBento
    },
    {
        id:"Glass",
        name : "Glass Template",
        thumbnail : FirstImg,
        component : TemplateGlass
    },
    {
        id:"Terminal",
        name : "Terminal Template",
        thumbnail : FirstImg,
        component : TemplateTerminal
    },
    {
        id:"NeoBrutal",
        name : "NeoBrutal Template",
        thumbnail : FirstImg,
        component : TemplateNeoBrutal
    },

]