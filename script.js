function toggleTheme() {
  const html = document.documentElement;
  const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

window.onload = () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  fetchRate();
};

async function fetchRate() {
  const response = await fetch("https://api.exchangerate.host/latest?base=GBP&symbols=INR");
  const data = await response.json();
  const rate = data.rates.INR;

  const amount = parseFloat(document.getElementById("gbpInput").value) || 0;
  document.getElementById("inrOutput").textContent = (rate * amount).toFixed(2);
  document.getElementById("lastUpdated").textContent = new Date().toLocaleString();
}

document.getElementById("gbpInput").addEventListener("input", fetchRate);
