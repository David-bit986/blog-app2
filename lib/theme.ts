export function setTheme(theme: "light" | "dark") {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

export function getSavedTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return (localStorage.getItem("theme") as "light" | "dark") || "light";
}