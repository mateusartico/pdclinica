const THEME_KEY = "theme";

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = prefersDark ? "dark" : "light";
  applyTheme(systemTheme);
  localStorage.setItem(THEME_KEY, systemTheme);
}

document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
});
