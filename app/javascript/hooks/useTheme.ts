import { useEffect, useState } from "react";

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Vérifie si l'utilisateur a une préférence stockée
        if (typeof window !== "undefined") {
            return (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
        }
        return false;
    });

    useEffect(() => {
        // Met à jour le thème dans le localStorage et la classe sur l'élément root
        if (isDarkMode) {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
        } else {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return { isDarkMode, toggleTheme };
};
