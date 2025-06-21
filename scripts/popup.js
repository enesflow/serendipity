function getTextContent(frequency) {
  return `1 in ~${Math.round(1 / frequency)}`;
}

const DEFAULT_TARGETS = [
  "https://en.wikipedia.org/wiki/Special:Random",
  "https://commons.wikimedia.org/wiki/Special:Random/File",
  "useless-web",
  "https://c.xkcd.com/random/comic/",
  "https://randomstreetview.com/",
  "http://cat-bounce.com/",
  "https://randomwordgenerator.com/fact.php",
  "https://randomword.com/",
  "https://neal.fun/infinite-craft/",
  "https://www.boredbutton.com/random",
  "https://www.window-swap.com/",
];
let targets = [];

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("frequency");
  const display = document.getElementById("freqValue");
  const freqDesc = document.getElementById("freqDesc");
  const listEl = document.getElementById("targetList");
  const inputEl = document.getElementById("newTarget");
  const addBtn = document.getElementById("addTarget");
  const restoreBtn = document.getElementById("restoreDefaults");
  // Load saved frequency or default 0.1
  chrome.storage.sync.get(
    { frequency: 0.1, targets: DEFAULT_TARGETS },
    (items) => {
      // interpret stored frequency as denominator
      const initialDenom = Math.round(1 / items.frequency);
      slider.value = 101 - initialDenom; // reverse: 1 (left) = 1 in 100, 100 (right) = 1 in 1
      display.textContent = getTextContent(items.frequency);
      targets = items.targets;
      renderTargets();
    }
  );
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

  function renderTargets() {
    listEl.innerHTML = "";
    targets.forEach((t, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = "✕";
      btn.addEventListener("click", () => deleteTarget(i));
      li.appendChild(btn);
      const span = document.createElement("span");
      span.textContent = t;
      li.appendChild(span);
      listEl.appendChild(li);
    });
  }

  function deleteTarget(idx) {
    targets.splice(idx, 1);
    chrome.storage.sync.set({ targets });
    renderTargets();
  }

  addBtn.addEventListener("click", () => {
    const url = inputEl.value.trim();
    if (url) {
      targets.push(url);
      chrome.storage.sync.set({ targets });
      renderTargets();
      inputEl.value = "";
    }
  });

  restoreBtn.addEventListener("click", () => {
    targets = Array.from(DEFAULT_TARGETS);
    chrome.storage.sync.set({ targets });
    renderTargets();
  });

  slider.addEventListener("input", () => {
    const denom = 101 - parseInt(slider.value, 10); // reverse
    const freq = 1 / denom;
    display.textContent = getTextContent(freq);
    saveFrequency(freq);
    freqDesc.style.display = "block";
  });
});
