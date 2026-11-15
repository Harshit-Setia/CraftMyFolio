import { createContext, useContext } from "react";

export const PageContext = createContext(null);

export const usePages = () => useContext(PageContext);
