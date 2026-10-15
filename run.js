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
})();
