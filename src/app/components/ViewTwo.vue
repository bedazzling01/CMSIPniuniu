<template>
  <div class="page-view02">
    <div class="p2-bg0"><img src="images/p2_bg0.png" alt="page2" /></div>
    <div class="p2-bg1"><img src="images/p2_bg1.png" alt="page2" /></div>
    <div :class="card1">
      <div class="text-item">
        <span>新岁伊始，万象更新</span>
      </div>
      <div class="text-item">
        <span>理想依然闪光，初心依旧滚烫</span>
      </div>
      <div class="text-item">
        <span>我们依然在追光的路途中</span>
      </div>
      <div class="text-item">
        <span>步履不停</span>
      </div>
      <div class="text-item"></div>
    </div>
    <div :class="card2">
      <div class="text-item">
        <span>回望过去的奋斗时光</span>
      </div>
      <div class="text-item">
        <span>您是否会好奇</span>
      </div>
      <div class="text-item">
        <span>自己在工作中究竟是什么风格？</span>
      </div>
      <div class="text-item">
        <span>您是否真的了解</span>
      </div>
      <div class="text-item">
        <span>属于自己的职场个人特质？</span>
      </div>
    </div>
    <div :class="card3">
      <div class="text-item"></div>
      <div class="text-item">
        <span>今天，HR牛牛就带您一起</span>
      </div>
      <div class="text-item">
        <span>解密您的职业性格</span>
      </div>
      <div class="text-item"></div>
      <div class="text-item"></div>
    </div>
    <img
      src="images/p2_button.png"
      alt="button"
      :class="card4"
      @click="clickHandle"
    />
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
import { curpage } from "@/app/pages/index/service/pageState";
const card1 = ref(["p2-card"]);
const card2 = ref(["p2-card"]);
const card3 = ref(["p2-card"]);
const card4 = ref(["p2-button"]);
const emits = defineEmits(["buttonClick"]);
let tm1 = null,
  tm2 = null;

// const props = defineProps({
//   currtCode: {
//     //当前页码
//     type: Number,
//     default: 0,
//   },
// });
watch(curpage, (nval, oval) => {
  console.log("oval=", oval);
  if (nval !== 1) {
    if (tm1) {
      clearTimeout(tm1);
      tm1 = null;
    }
    if (tm2) {
      clearTimeout(tm2);
      tm2 = null;
    }
    card1.value = ["p2-card"];
    card2.value = ["p2-card"];
    card3.value = ["p2-card"];
    card4.value = ["p2-button"];
  }
  if (nval === 1) {
    card1.value = ["p2-card", "in", "out"];
    tm1 = setTimeout(() => {
      card2.value = ["p2-card", "in", "out"];
      clearTimeout(tm1);
      tm1 = null;
    }, 3500);
    tm2 = setTimeout(() => {
      card3.value = ["p2-card", "in"];
      card4.value = ["p2-button", "in"];
      clearTimeout(tm2);
      tm2 = null;
    }, 7000);
  }
});
function clickHandle() {
  emits("buttonClick", { pid: 2 });
}
</script>
<style scope lang="less">
.page-view02 {
  width: 100%;
  height: 100%;
  position: relative;
  & > img {
    display: block;
  }
  .p2-bg0,
  .p2-bg1 {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center bottom;
    }
  }
  .p2-bg1 {
    width: 110%;
    height: 110%;
    left: -5%;
    top: -5%;
    // animation: bgSwing 6s 0s infinite;
    // -webkit-animation: bgSwing 6s 0s infinite;
  }
  .p2-card {
    position: absolute;
    width: 100%;
    height: 32%;
    left: 0;
    top: 31%;
    opacity: 0;
    & > div.text-item {
      width: 100%;
      height: 20%;
      overflow: hidden;
      position: relative;
      & > span {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        line-height: 100%;
        font-size: 40px;
        text-align: center;
        font-weight: 500;
        color: #ffffff;
        font-family: "'Source Han Sans SC','Microsoft YaHei','black',SimHei,sans-serif" !important;
        white-space: nowrap;
        text-rendering: optimizeLegibility;
        text-shadow: 1px 1px 5px #615e5e;
        opacity: 0;
      }
    }
  }

  .p2-card.in {
    opacity: 1;
    & > div.text-item:nth-child(1) {
      & > span {
        animation: scrolling 0.5s linear 0s forwards;
        -webkit-animation: scrolling 0.5s linear 0s forwards;
      }
    }
    & > div.text-item:nth-child(2) {
      & > span {
        animation: scrolling 0.5s linear 0.5s forwards;
        -webkit-animation: scrolling 0.5s linear 0.5s forwards;
      }
    }
    & > div.text-item:nth-child(3) {
      & > span {
        animation: scrolling 0.5s linear 1s forwards;
        -webkit-animation: scrolling 0.5s linear 1s forwards;
      }
    }
    & > div.text-item:nth-child(4) {
      & > span {
        animation: scrolling 0.5s linear 1.5s forwards;
        -webkit-animation: scrolling 0.5s linear 1.5s forwards;
      }
    }
    & > div.text-item:nth-child(5) {
      & > span {
        animation: scrolling 0.5s linear 2s forwards;
        -webkit-animation: scrolling 0.5s linear 2s forwards;
      }
    }
  }

  .p2-card.in.out {
    animation: cardInOut 3.5s linear 0s forwards;
    -webkit-animation: cardInOut 3.5s linear 0s forwards;
  }

  .p2-button {
    position: absolute;
    top: 77.82%;
    left: 26.27%;
    width: 47.46%;
    height: auto;
    max-height: 6.83%;
    opacity: 0;
    display: none;
  }
  .p2-button.in {
    display: block;
    animation: cardIn 0.7s linear 2.5s forwards;
    -webkit-animation: cardIn 0.7s linear 2.5s forwards;
  }
}

@keyframes scrolling {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@-webkit-keyframes scrolling {
  0% {
    opacity: 0;
    -webkit-transform: translateY(100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0%);
  }
}
@keyframes cardInOut {
  0%,
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes cardInOut {
  0%,
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes cardIn {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@-webkit-keyframes cardIn {
  0% {
    opacity: 0;
    -webkit-transform: translateY(100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0%);
  }
}

@keyframes bgSwing {
  0% {
    opacity: 1;
    transform: scale(1, 1) translate(0%, 0%);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.02, 1.02) translate(0%, 2%);
  }

  100% {
    opacity: 1;
    transform: scale(1, 1) translate(0%, 0%);
  }
}
@-webkit-keyframes bgSwing {
  0% {
    opacity: 1;
    -webkit-transform: scale(1, 1) translate(0%, 0%);
  }

  50% {
    opacity: 0.9;
    -webkit-transform: scale(1.02, 1.02) translate(0%, 2%);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1, 1) translate(0%, 0%);
  }
}
</style>
