document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initConverter();
});

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

function initConverter() {
  const input = document.getElementById("gbpInput");
  input.addEventListener("input", fetchRate);
  fetchRate(); // Run once on load
}

async function fetchRate() {
  try {
    const response = await fetch("https://api.exchangerate.host/latest?base=GBP&symbols=INR");
    const data = await response.json();
    const rate = data.rates.INR;

    const amount = parseFloat(document.getElementById("gbpInput").value) || 0;
    document.getElementById("inrOutput").textContent = (rate * amount).toFixed(2);
    document.getElementById("lastUpdated").textContent = new Date().toLocaleString();
  } catch (error) {
    console.error("Rate fetch failed:", error);
    document.getElementById("inrOutput").textContent = "Error";
  }
}
