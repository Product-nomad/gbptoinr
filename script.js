document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("gbpInput");
  const output = document.getElementById("inrOutput");
  const timestamp = document.getElementById("lastUpdated");
  const toggleBtn = document.getElementById("themeToggle");

  if (!input || !output || !timestamp || !toggleBtn) {
    console.error("One or more required DOM elements are missing.");
    return;
  }

  // Theme toggle logic
  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Attach event listeners
  toggleBtn.addEventListener("click", toggleTheme);
  input.addEventListener("input", fetchRate);

  // Fetch and update exchange rate
  async function fetchRate() {
    try {
      const res = await fetch("https://api.exchangerate.host/latest?base=GBP");
      const data = await res.json();

      const rate = data?.rates?.INR;
      if (!rate) throw new Error("INR rate missing from response");

      const amount = parseFloat(input.value) || 0;
      output.textContent = (amount * rate).toFixed(2);
      timestamp.textContent = new Date().toLocaleString();
    } catch (err) {
      console.error("Fetch failed:", err);
      output.textContent = "Error";
      timestamp.textContent = "—";
    }
  }

  // Initial load
  fetchRate();
});
