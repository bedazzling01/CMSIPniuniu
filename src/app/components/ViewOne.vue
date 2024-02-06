<template>
  <div :class="viewClass">
    <img src="images/p1_bg.png" alt="page1" class="p1-bg" />
    <img src="images/p1-deng01.png" alt="deng01" class="p1-deng01" />
    <img src="images/p1-deng02.png" alt="deng01" class="p1-deng02" />
    <img src="images/p1-bigtitle.png" alt="title" class="p1-title" />
    <div class="p1-slogin cardmask">
      <img src="images/p1-slogin.png" alt="slogin" class="slogin" />
      <img src="images/guang2.png" class="guang" />
    </div>
    <div class="p1-card">
      <img src="images/p1_bigcard.png" alt="card" class="p1-bigcard" />
      <img src="images/p1_txt01.png" alt="card" class="p1-txt01" />
      <img src="images/p1_txt02.png" alt="card" class="p1-txt02" />
      <img src="images/p1_card01.png" alt="card" class="p1-card01" />
      <img src="images/p1_card02.png" alt="card" class="p1-card02" />
      <img src="images/p1_card03.png" alt="card" class="p1-card03" />
    </div>
    <img
      src="images/p1_button.png"
      alt="button"
      class="p1-button"
      @click="clickHandle"
    />
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
import { curpage } from "@/app/pages/index/service/pageState";
const viewClass = ref(["page-view01"]);
const emits = defineEmits(["buttonClick"]);
if (curpage.value === 0) {
  viewClass.value = ["page-view01", "in"];
}
watch(curpage, (nval, oval) => {
  console.log(nval, oval);
  if (nval !== 0) {
    viewClass.value = ["page-view01"];
  } else {
    viewClass.value = ["page-view01", "in"];
  }
});
function clickHandle() {
  emits("buttonClick", { pid: 1 });
}
</script>
<style scope lang="less">
.page-view01 {
  width: 100%;
  height: 100%;
  position: relative;
  & > img {
    display: block;
  }
  .p1-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
  }
  .p1-deng01 {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    top: 0;
    transform: translate(15%, -24%);
    -webkit-transform: translate(15%, -24%);
  }
  .p1-deng02 {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    top: 45%;
    transform: translate(4%, 0%);
    -webkit-transform: translate(4%, 0%);
  }
  .p1-title {
    position: absolute;
    left: 0;
    top: 8%;
    width: 100%;
    height: auto;
    max-height: 3.298%;
  }
  .p1-slogin {
    position: absolute;
    left: 0;
    top: 16%;
    width: 100%;
    height: 12.368%;
    overflow: hidden;
    & > img.slogin {
      width: 100%;
      height: auto;
    }
    & > img.guang {
      width: 100%;
      height: auto;
      position: absolute;
      left: 0;
      top: 0;
      animation: guangswing 2s 0s infinite;
    }
  }
  & > .cardmask {
    -webkit-mask: no-repeat center / 100% auto;
    mask: no-repeat center / 100% auto;
    -webkit-mask-image: url("~images/p1-slogin.png");
    mask-image: url("~images/p1-slogin.png");
  }
  .p1-card {
    position: absolute;
    width: 100%;
    height: 55.772%;
    top: 28.71%;
    left: 0;
    & > img {
      display: block;
      position: absolute;
      width: 100%;
      height: auto;
      left: 0;
      top: 0;
    }
  }
  .p1-button {
    position: absolute;
    top: 85%;
    left: 26.27%;
    width: 47.46%;
    height: auto;
    max-height: 6.83%;
    cursor: pointer;
  }
}
.page-view01.in {
  .p1-deng01 {
    animation: dengSwing01 6s linear 0s infinite;
    -webkit-animation: dengSwing01 6s linear 0s infinite;
  }
  .p1-deng02 {
    animation: dengSwing02 4s linear 0.1s infinite;
    -webkit-animation: dengSwing02 4s linear 0.1s infinite;
  }
  .p1-title {
    opacity: 0;
    animation: fadeIn 0.8s 0s forwards;
    -webkit-animation: fadeIn 0.8s 0s forwards;
  }
  .p1-slogin {
    animation: fadeIn 1s 0s forwards;
    -webkit-animation: fadeIn 1s 0s forwards;
  }
  .p1-card {
    .p1-bigcard {
      opacity: 0;
      animation: fadeIn 1.2s 0.2s forwards;
      -webkit-animation: fadeIn 1.2s 0.2s forwards;
    }
    .p1-txt01 {
      opacity: 0;
      animation: fadeIn 1s 1.2s forwards;
      -webkit-animation: fadeIn 1s 1.2s forwards;
    }
    .p1-txt02 {
      opacity: 0;
      animation: fadeIn 1s 1.5s forwards;
      -webkit-animation: fadeIn 1s 1.5s forwards;
    }
    .p1-card01 {
      opacity: 0;
      transform-origin: 26% 70%;
      animation: flipInY 1.5s 1.4s forwards;
      -webkit-animation: flipInY 1.5s 1.4s forwards;
    }
    .p1-card02 {
      opacity: 0;
      transform-origin: 50% 70%;
      animation: flipInY 1.5s 1.6s forwards;
      -webkit-animation: flipInY 1.5s 1.6s forwards;
    }
    .p1-card03 {
      opacity: 0;
      transform-origin: 75% 70%;
      animation: flipInY 1.5s 1.8s forwards;
      -webkit-animation: flipInY 1.5s 1.8s forwards;
    }
  }
  .p1-button {
    opacity: 0;
    animation: fadeIn 1.2s 2s forwards;
    -webkit-animation: fadeIn 1.2s 2s forwards;
  }
}
@keyframes dengSwing01 {
  0% {
    transform: translate(15%, -24%);
  }
  25% {
    transform: translate(13%, -26%);
  }
  75% {
    transform: translate(17%, -20%);
  }
  100% {
    transform: translate(15%, -24%);
  }
}
@-webkit-keyframes dengSwing01 {
  0% {
    -webkit-transform: translate(15%, -24%);
  }
  25% {
    -webkit-transform: translate(13%, -26%);
  }
  75% {
    -webkit-transform: translate(17%, -20%);
  }
  100% {
    -webkit-transform: translate(15%, -24%);
  }
}
@keyframes dengSwing02 {
  0% {
    transform: translate(4%, 0%);
  }
  50% {
    transform: translate(2%, 10%);
  }
  100% {
    transform: translate(4%, 0%);
  }
}
@-webkit-keyframes dengSwing02 {
  0% {
    -webkit-transform: translate(4%, 0%);
  }
  50% {
    -webkit-transform: translate(2%, 10%);
  }
  100% {
    -webkit-transform: translate(4%, 0%);
  }
}

@keyframes guangswing {
  0% {
    opacity: 1;
    transform: translateX(20%);
  }

  100% {
    opacity: 0;
    transform: translateX(-60%);
  }
}
</style>
