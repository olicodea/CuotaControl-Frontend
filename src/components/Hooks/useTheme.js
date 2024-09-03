import { useContext } from "react";
import { ThemeContextCustom } from "../Context/ThemeContext";

export default function useTheme() {
  const { theme } = useContext(ThemeContextCustom);

  const styleDarkHome =
    theme === "dark" ? "bg-slate-800  border-slate-100 text-slate-200" : "";

  const darkResumen = theme === "dark" ? "border-slate-100 " : "";

  const pDark = theme === "dark" ? "text-slate-400" : "text-slate-900";
  const darkCard = theme === "dark" ? "bg-slate-700" : " ";
  return { styleDarkHome, darkResumen, pDark, darkCard };
}
