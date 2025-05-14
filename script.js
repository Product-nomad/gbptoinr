document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("gbpInput");
  const output = document.getElementById("inrOutput");
  const timestamp = document.getElementById("lastUpdated");
  const toggleBtn = document.getElementById("themeToggle");

  if (!input || !output || !timestamp || !toggleBtn) {
    console.error("Missing required DOM elements.");
    return;
  }

  async function fetchRate() {
    try {
      const res = await fetch("https://api.exchangerate.host/latest?base=GBP");
      const data = await res.json();
      const rate = data?.rates?.INR;

      if (!rate) {
        throw new Error("INR rate not found");
      }

      const amount = parseFloat(input.value) || 0;
      const result = (rate * amount).toFixed(2);
      output.textContent = result;
      timestamp.textContent = new Date().toLocaleString();
    } catch (error) {
      console.error("Conversion error:", error);
      output.textContent = "Error";
      timestamp.textContent = "—";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  // Initial setup
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "light");
  toggleBtn.addEventListener("click", toggleTheme);
  input.addEventListener("input", fetchRate);

  fetchRate(); // Trigger initial conversion
});
