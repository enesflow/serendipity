function getTextContent(frequency) {
  return `1 in ~${Math.round(1 / frequency)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("frequency");
  const display = document.getElementById("freqValue");
  const freqDesc = document.getElementById("freqDesc");
  // Load saved frequency or default 0.1
  chrome.storage.sync.get({ frequency: 0.1 }, (items) => {
    slider.value = items.frequency;
    display.textContent = getTextContent(items.frequency);
  });
  // Debounce function to limit storage writes
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const saveFrequency = debounce((val) => {
    chrome.storage.sync.set({ frequency: val });
  }, 300);

  slider.addEventListener("input", () => {
    const val = parseFloat(slider.value);
    display.textContent = getTextContent(val);
    saveFrequency(val);
    freqDesc.style.display = "block";
  });
});
