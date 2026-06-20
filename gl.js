/* Position glossary tooltips within the viewport. The popup is position:fixed
   (so it escapes the .doc overflow:hidden clip); here we place it under the term,
   clamp it to the viewport horizontally, and flip it above when there's no room
   below. CSS handles show/hide via :hover / :focus-within. */
(function () {
  var M = 8;
  function place(gl) {
    var pop = gl.querySelector(".gl-pop");
    if (!pop) return;
    var r = gl.getBoundingClientRect();
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.min(r.left, window.innerWidth - M - pw);
    if (left < M) left = M;
    var top = r.bottom + 4;
    if (top + ph > window.innerHeight - M) {
      var above = r.top - ph - 4;
      top = above > M ? above : Math.max(M, window.innerHeight - M - ph);
    }
    pop.style.left = Math.round(left) + "px";
    pop.style.top = Math.round(top) + "px";
  }
  function handler(e) {
    var t = e.target;
    var gl = t && t.closest ? t.closest(".gl") : null;
    if (gl) place(gl);
  }
  document.addEventListener("mouseover", handler);
  document.addEventListener("focusin", handler);
})();
