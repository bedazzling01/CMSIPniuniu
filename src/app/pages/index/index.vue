<script setup>
import { onBeforeMount, nextTick, watchEffect, ref } from "vue";
import { swipeTo, resetSwipeTo } from "./service/touchResolver";
import { changePage, curpage } from "./service/pageState";
import Quiz from "@/app/components/Quiz";
import Painter from "@/app/components/Painter";
import ViewOne from "@/app/components/ViewOne";
import ViewTwo from "@/app/components/ViewTwo";
import ViewThree from "@/app/components/ViewThree";
let slider = null;
const startCode = 0; //起始页码
const restart = ref(false);

onBeforeMount(() => {
  nextTick(() => {
    // touchResolver(document.querySelector("#container"));
    slider = new window.Adapter.SliderPage({
      item: document.querySelectorAll("#container>section"), // 需要滑动的页面class类名（DOM对象）
      cur: startCode, // 可设置（初始化当前显示第几页)，一般为0。
      activeClass: "pageOpen", // 给当前项添加的类名
      loop: false, // 默认false 是否要循环
      effect: "vSlide", // 切换方式 另外几种是'vSlide',‘hSlide’
      bindSwiper: false, //如果为true则自动给container绑定滑动事件，如果自定义滑动，可以不设置
      init: () => {
        console.log("滑动内容初始化");
        changePage(startCode);
      },
    });
    slider.$on("sliderStart", function (i, n) {
      console.log("islide-sliderStartFn", i, n);
    });
    slider.$on("animateEnd", function (i, n) {
      console.log("islide-animateEndFn", i, n);
      changePage(n); //更新页码
    });
  });
});
watchEffect(() => {
  if (swipeTo.value !== "" && slider !== null) {
    switch (swipeTo.value) {
    case "up":
      //上滑
      // slider.SwipeNext();
      resetSwipeTo();
      break;
    case "down":
      //下滑
      // slider.SwipePrev();
      resetSwipeTo();
      break;
    }
  }
});

function onNext() {
  restart.value = false;
  slider.SwipeNext();
}

function onRestart() {
  restart.value = true;
  slider.toPage(2);
}
function clickHandle(e) {
  const { pid } = e;
  console.log("pid===", pid);
  if (pid !== curpage.value) {
    slider.toPage(pid);
  }
}
</script>
<template>
  <div id="container">
    <section style="background-color: rgb(255, 123, 0)">
      <ViewOne @button-click="clickHandle" />
    </section>
    <section style="background-color: rgb(179, 255, 0)">
      <viewTwo @button-click="clickHandle" />
    </section>
    <section style="background-color: rgb(0, 153, 255)">
      <div class="page3-box">
        <ViewThree />
        <Quiz @on-next="onNext" :restart="restart" />
      </div>
    </section>
    <section style="background-color: rgb(195, 0, 255)">
      <Painter @on-restart="onRestart" />
    </section>
  </div>
</template>
<style lang="less">
#container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: block;
  pointer-events: auto;
  & > section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    font-size: 44px;
  }
  .page3-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > .quiz {
      width: 100%;
      height: auto;
      position: relative;
    }
  }
}
</style>
