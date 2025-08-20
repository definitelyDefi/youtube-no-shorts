function hideShorts() {
  const feedShorts = document.querySelectorAll(
    'ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, ytd-grid-video-renderer a[href*="/shorts/"], ytd-compact-video-renderer a[href*="/shorts/"]'
  );
  feedShorts.forEach((el) => {
    const parent = el.closest(
      "ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer"
    );
    if (parent) parent.style.display = "none";
  });

  const sidebarShorts = document.querySelectorAll('ytd-compact-video-renderer a[href*="/shorts/"]');
  sidebarShorts.forEach((el) => {
    const parent = el.closest("ytd-compact-video-renderer");
    if (parent) parent.style.display = "none";
  });

  const searchShorts = document.querySelectorAll('ytd-video-renderer a[href*="/shorts/"]');
  searchShorts.forEach((el) => {
    const parent = el.closest("ytd-video-renderer");
    if (parent) parent.style.display = "none";
  });
}

function redirectShortsLinks() {
  document.querySelectorAll('a[href*="/shorts/"]').forEach((link) => {
    const url = new URL(link.href);
    const videoId = url.pathname.split("/").pop();
    link.href = `https://www.youtube.com/watch?v=${videoId}`;
  });
}

hideShorts();
redirectShortsLinks();

const observer = new MutationObserver(() => {
  hideShorts();
  redirectShortsLinks();
});
observer.observe(document.body, {childList: true, subtree: true});

if (location.pathname.startsWith("/shorts/")) {
  const videoId = location.pathname.split("/").pop();
  location.replace(`https://www.youtube.com/watch?v=${videoId}`);
}
