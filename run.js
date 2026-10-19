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
    // The current section is the last one whose top has scrolled past a quarter of the way down the window.
    var line = Math.max(120, window.innerHeight / 4);
    var current = null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) { current = section; }
    });
    var hash = current ? '#' + current.id : '';
    if (hash !== location.hash) {
      history.replaceState(history.state, '', hash || location.pathname + location.search);
    }
  }
  if (sections.length) {
    window.addEventListener('scroll', function () {
      if (!pending) { pending = true; window.requestAnimationFrame(updateHash); }
    }, { passive: true });
  }
})();
