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
  const input = document.getElementById("gbpInput");
  const output = document.getElementById("inrOutput");
  const timestamp = document.getElementById("lastUpdated");

  try {
    const response = await fetch("https://api.exchangerate.host/latest?base=GBP");

    if (!response.ok) {
      throw new Error("API response not OK");
    }

    const data = await response.json();

    if (!data.rates || typeof data.rates.INR === "undefined") {
      throw new Error("INR rate not found in response");
    }

    const rate = data.rates.INR;
    const amount = parseFloat(input.value) || 0;
    const result = (rate * amount).toFixed(2);

    output.textContent = result;
    timestamp.textContent = new Date().toLocaleString();

  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    output.textContent = "Error";
    timestamp.textContent = "—";
  }
}


