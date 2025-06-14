(() => {
  // examples/right-side-menu.js
  AMF.plugin("Menu on Right", () => {
    AMF.addEventListener("root-frame-load", ({ rootWindow }) => {
      const frameset = rootWindow.document.querySelector("frameset");
      frameset.cols = frameset.cols.split(",").reverse().join(",");
      frameset.appendChild(frameset.querySelector("frame[name='menu']"));
    });
  });
})();
