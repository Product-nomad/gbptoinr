document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initConverter();
});

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }
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
  if (input) {
    input.addEventListener("input", fetchRate);
    fetchRate(); // Initial call on load
  }
}

async function fetchRate() {
  try {
    const input = document.getElementById("gbpInput");
    const output = document.getElementById("inrOutput");
    const timestamp = document.getElementById("lastUpdated");

    const amount = parseFloat(input.value) || 0;

    const response = await fetch("https://api.exchangerate.host/latest?base=GBP&symbols=INR");
    const data = await response.json();
    const rate = data.rates.INR;

    const result = (rate * amount).toFixed(2);
    output.textContent = result;
    timestamp.textContent = new Date().toLocaleString();
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    document.getElementById("inrOutput").textContent = "Error";
  }
}
