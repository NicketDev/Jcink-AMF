(() => {
  // examples/auto-expand-menu.js
  AMF.plugin("Expand All Menus", () => {
    AMF.addEventListener("menu-frame-load", ({ menuFrame, menuWindow }) => {
      requestAnimationFrame(() => {
        menuWindow.document.querySelectorAll(`a[onclick="change(this)"]`).forEach((a) => menuWindow.change(a));
      });
    });
  });
})();
