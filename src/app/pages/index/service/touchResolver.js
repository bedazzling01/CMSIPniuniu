import { ref } from "vue";
const swipeTo = ref("");

function touchResolver(domEle) {
  let startX = null; // 记录开始时的X坐标
  let startY = null; // 记录开始时的Y坐标
  // touchstart事件处理函数
  const handleTouchStart = (event) => {
    const touches = event.changedTouches || event.touches;
    if (touches && touches[0]) {
      startX = touches[0].pageX;
      startY = touches[0].pageY;
      domEle.addEventListener("touchmove", handleTouchMove, true);
      domEle.addEventListener("touchend", handleTouchEnd, true);
    }
  };
  // touchmove事件处理函数
  const handleTouchMove = (event) => {
    const touches = event.changedTouches || event.touches;
    if (touches && touches[0] && startX !== null && startY !== null) {
      const deltaX = touches[0].pageX - startX;
      const deltaY = touches[0].pageY - startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        console.log("上下滑动");
        if (Math.abs(deltaY) < 5) {
          swipeTo.value = "";
          return;
        } else {
          if (deltaY < 0) {
            swipeTo.value = "up";
          } else {
            swipeTo.value = "down";
          }
        }
        // 根据需求进行相应操作
      } else {
        console.log("左右滑动");

        // 根据需求进行相应操作
      }
    }
  };

  // touchend事件处理函数
  const handleTouchEnd = () => {
    startX = null;
    startY = null;
    domEle.removeEventListener("touchmove", handleTouchMove, true);
    domEle.removeEventListener("touchend", handleTouchEnd, true);
  };
  domEle.addEventListener("touchstart", handleTouchStart, true);
}

function resetSwipeTo() {
  swipeTo.value = "";
}

export { touchResolver, swipeTo, resetSwipeTo };
