// Behaviour for the run pages that the main website's scripts do not provide.
(function () {
  'use strict';

  // Layer selector on the project pages: swap the render and mark the active button.
  var image = document.getElementById('render-image');
  var link = document.getElementById('render-link');
  var buttons = document.querySelectorAll('[data-render]');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      image.src = button.dataset.render;
      link.href = button.dataset.render;
      buttons.forEach(function (other) {
        other.classList.toggle('btn-default', other === button);
        other.classList.toggle('btn-outline-primary', other !== button);
      });
    });
  });

  // Keep the address bar's #fragment on the section being read, so that the address can be copied at any
  // point. replaceState changes the address without adding to the history or scrolling the page.
  var sections = Array.prototype.map.call(document.querySelectorAll('a.run-anchor'), function (anchor) {
    return document.getElementById(anchor.hash.slice(1));
  }).filter(Boolean);
  var pending = false;
  function updateHash() {
    pending = false;
    if (following) { return; }
    // The current section is the one whose top is nearest above a line a quarter of the way down the window.
    // Nearest, rather than last in the page, because some headings sit side by side in columns.
    var line = Math.max(120, window.innerHeight / 4);
    var current = null;
    var best = -Infinity;
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top <= line && top >= best) { current = section; best = top; }
    });
    var hash = current ? '#' + current.id : '';
    if (hash !== location.hash) {
      history.replaceState(history.state, '', hash || location.pathname + location.search);
    }
  }
  // After a followed link (or a page opened at one), leave its #fragment alone until that scroll has
  // finished: the theme scrolls smoothly past other sections, and a section near the bottom of the page
  // may not reach the line at all.
  var following = Boolean(location.hash);
  var settle = null;
  // Set on the click itself: hashchange arrives only after an update queued by an earlier scroll has run.
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href^="#"]');
    if (link && link.hash.length > 1) { following = true; }
  });
  window.addEventListener('hashchange', function () { following = true; });
  if (sections.length) {
    window.addEventListener('scroll', function () {
      if (following) {
        clearTimeout(settle);
        settle = setTimeout(function () { following = false; }, 200);
      } else if (!pending) {
        pending = true;
        window.requestAnimationFrame(updateHash);
      }
    }, { passive: true });
  }
})();
