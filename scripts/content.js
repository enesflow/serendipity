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

chrome.storage.sync.get(
  { frequency: 0.1, targets: DEFAULT_TARGETS },
  ({ frequency, targets }) => {
    const FREQUENCY = frequency;
    const TARGETS = targets;
    function getRandomTarget() {
      let target = TARGETS[Math.floor(Math.random() * TARGETS.length)];
      if (target === "useless-web") {
        target =
          USELESS_SITES[Math.floor(Math.random() * USELESS_SITES.length)];
      }
      return target;
    }

    const links = document.querySelectorAll("a");
    const length = links.length;

    // select at most length / frequency links
    // first lets select indexes of links to select
    const indexes = [];
    for (let i = 0; i < length; i++) {
      if (Math.random() < FREQUENCY) {
        indexes.push(i);
      }
    }
    for (let i = 0; i < indexes.length; i++) {
      const link = links[indexes[i]];
      const randomLink = getRandomTarget();
      link.href = randomLink;
    }
  }
);
