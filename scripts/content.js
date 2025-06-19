chrome.storage.sync.get({ frequency: 0.1 }, ({ frequency }) => {
  const FREQUENCY = frequency;
  const TARGETS = [
    "https://en.wikipedia.org/wiki/Special:Random", // Random Wikipedia article
    "https://commons.wikimedia.org/wiki/Special:Random/File", // Random Wikimedia Commons file
    "useless-web", // Random useless web site
    "https://c.xkcd.com/random/comic/", // Random XKCD comic
    "https://randomstreetview.com/", // Random Street View
    "http://cat-bounce.com/", // Cat Bounce
    "https://randomwordgenerator.com/fact.php", // Random fact
    "https://randomword.com/", // Random word
    "https://neal.fun/infinite-craft/", // Infinite Craft
    "https://www.boredbutton.com/random", // Bored Button
    "https://www.window-swap.com/", // Window Swap
  ];
  function getRandomTarget() {
    let target = TARGETS[Math.floor(Math.random() * TARGETS.length)];
    if (target === "useless-web") {
      target = USELESS_SITES[Math.floor(Math.random() * USELESS_SITES.length)];
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
});
