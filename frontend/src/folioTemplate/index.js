import First from "./First";
import Second from "./Second";
import Third from "./Third";

export const templates = {
    First,
    Second
}

import FirstImg from '../assets/templates/FirstImg.jpg'

export const templateInfo = [
    {
        id : "First",
        name : "Minimalist (Static)",
        thumbnail : FirstImg,
        component : First
    },
    {
        id : "Second",
        name : "Industralist (Static)",
        thumbnail : FirstImg,
        component : Second
    },
    {
        id : "Third",
        name : "Sexist (Real Data)",
        thumbnail : FirstImg,
        component : Third
    }
]