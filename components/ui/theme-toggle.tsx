"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/dbutton";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";

    setTheme(next);
    localStorage.setItem("theme", next);

    document.documentElement.classList.toggle("dark");
  }

  return (
    <Button className="px-4 py-2 cursor-pointer" onClick={toggleTheme}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}