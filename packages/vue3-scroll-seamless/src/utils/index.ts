/**
 * @desc AnimationFrame简单兼容
 */

export function animationFrame() {
  window.cancelAnimationFrame = (function () {
    // @ts-ignore
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function (id) {
        return window.clearTimeout(id);
      }
    );
  })();
  window.requestAnimationFrame = (function () {
    // @ts-ignore
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}

/**
 * @desc 判断数组是否相等
 * @param {arr1,arr2}
 * @return {Boolean}
 */
export function arrayEqual(arr1: unknown[], arr2: unknown[]): boolean {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
