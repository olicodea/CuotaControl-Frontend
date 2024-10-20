import { useContext } from "react";
import { ThemeContextCustom } from "../Context/ThemeContext";

export default function useTheme() {
  const { theme } = useContext(ThemeContextCustom);

  const styleDarkHome =
    theme === "dark" ? "bg-slate-800  border-slate-100 text-slate-200" : "";

  const darkResumen =
    theme === "dark" ? "border-slate-100 " : "border-slate-900";

  const pDark = theme === "dark" ? "text-slate-400" : "text-slate-900";
  const darkCard = theme === "dark" ? "bg-slate-700" : " ";
  const selectTheme = theme === "dark" ? "bg-slate-600" : "bg-slate-100";

  const alertTheme =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  return {
    styleDarkHome,
    darkResumen,
    pDark,
    darkCard,
    selectTheme,
    alertTheme,
  };
}
