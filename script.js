document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");

  const input = document.getElementById("gbpInput");
  const output = document.getElementById("inrOutput");
  const timestamp = document.getElementById("lastUpdated");
  const toggleBtn = document.getElementById("themeToggle");

  if (!input || !output || !timestamp) {
    console.error("DOM elements missing.");
    return;
  }

  async function fetchRate() {
    try {
      const response = await fetch("https://api.exchangerate.host/latest?base=GBP");
      const data = await response.json();
      const rate = data?.rates?.INR;

      if (!rate) {
        throw new Error("INR rate not found in API response.");
      }

      const amount = parseFloat(input.value) || 0;
      const converted = (rate * amount).toFixed(2);
      output.textContent = converted;
      timestamp.textContent = new Date().toLocaleString();

    } catch (err) {
      console.error("Error fetching or parsing rate:", err);
      output.textContent = "Error";
      timestamp.textContent = "—";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Initial setup
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("theme") || "light"
  );

  // Bind events
  input.addEventListener("input", fetchRate);
  toggleBtn?.addEventListener("click", toggleTheme);

  // First fetch
  fetchRate();
});
