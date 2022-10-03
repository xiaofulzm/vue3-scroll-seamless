/**
 * @desc AnimationFrame简单兼容
 */

export default  function animationFrame() {
    window.cancelAnimationFrame = function () {
         // @ts-ignore
      return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
        return window.clearTimeout(id);
      };
    }();
    window.requestAnimationFrame = function () {
         // @ts-ignore
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    }();
  };
  