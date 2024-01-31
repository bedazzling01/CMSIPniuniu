<script setup>
import { onBeforeMount, nextTick, watchEffect } from "vue";
import { touchResolver, swipeTo, resetSwipeTo } from "./service/touchResolver";
import Quiz from "@/app/components/Quiz";
import Painter from '@/app/components/Painter';

let slider = null;
onBeforeMount(() => {
  nextTick(() => {
    touchResolver(document.querySelector("#container"));
    slider = new window.Adapter.SliderPage({
      item: document.querySelectorAll("#container>section"), // 需要滑动的页面class类名（DOM对象）
      cur: 3, // 可设置（初始化当前显示第几页)，一般为0。
      activeClass: "pageOpen", // 给当前项添加的类名
      loop: false, // 默认false 是否要循环
      effect: "vSlide", // 切换方式 另外几种是'vSlide',‘hSlide’
      bindSwiper: false, //如果为true则自动给container绑定滑动事件，如果自定义滑动，可以不设置
      init: () => {
        console.log("滑动内容初始化");
      },
    });
    slider.$on("sliderStart", function (i, n) {
      console.log("islide-sliderStartFn", i, n);
    });
    slider.$on("animateEnd", function (i, n) {
      console.log("islide-animateEndFn", i, n);
    });
  });
});
watchEffect(() => {
  if (swipeTo.value !== "" && slider !== null) {
    switch (swipeTo.value) {
    case "up":
      //上滑
      slider.SwipeNext();
      resetSwipeTo();
      break;
    case "down":
      //下滑
      slider.SwipePrev();
      resetSwipeTo();
      break;
    }
  }
});
</script>
<template>
  <div id="container">
    <section style="background-color: rgb(255, 123, 0)">page1</section>
    <section style="background-color: rgb(179, 255, 0)">page2</section>
    <section style="background-color: rgb(0, 153, 255)">
      <Quiz />
    </section>
    <section style="background-color: rgb(195, 0, 255)">
      <Painter />
    </section>
    <section style="background-color: rgb(255, 0, 64)">page5</section>
    <section style="background-color: rgb(0, 26, 255)">page6</section>
    <section style="background-color: rgb(0, 255, 85)">page7</section>
    <section style="background-color: rgb(70, 70, 61)">page8</section>
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
}
</style>
