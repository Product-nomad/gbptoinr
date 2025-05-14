document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("gbpInput");
  const output = document.getElementById("inrOutput");
  const timestamp = document.getElementById("lastUpdated");
  const toggleBtn = document.getElementById("themeToggle");

  if (!input || !output || !timestamp) {
    console.error("Missing DOM elements");
    return;
  }

  async function fetchRate() {
    try {
      const response = await fetch("https://api.exchangerate.host/latest?base=GBP");
      const data = await response.json();

      if (!data || !data.rates || typeof data.rates.INR === 'undefined') {
        throw new Error("INR rate not found in API response");
      }

      const rate = data.rates.INR;
      const amount = parseFloat(input.value) || 0;
      const result = (rate * amount).toFixed(2);

      output.textContent = result;
      timestamp.textContent = new Date().toLocaleString();
    } catch (error) {
      console.error("API fetch failed:", error);
      output.textContent = "Error";
      timestamp.textContent = "—";
    }
  }

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Set initial theme
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "light");

  input.addEventListener("input", fetchRate);
  toggleBtn?.addEventListener("click", toggleTheme);

  fetchRate(); // Run once on load
});
