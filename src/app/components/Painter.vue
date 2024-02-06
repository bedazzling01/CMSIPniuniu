<template>
  <div class="painter">
    <div class="inner" ref="inner">
      <div class="card-box">
        <!-- <img class="title" src="images/cards/title.png" /> -->
        <div class="card" :class="`card-${type}`"></div>
        <div class="desc">
          <img src="images/cards/desc.png" />
        </div>
      </div>
    </div>
    <div class="inner-cover">
      <div class="card-box">
        <div class="card guang-box guang-mask">
          <img src="images/cards/guang.png" />
        </div>
      </div>
    </div>
    <div class="btns">
      <img src="images/cards/btn_1.png" @click="onPainter" />
      <img src="images/cards/btn_2.png" @click="onRestart" />
    </div>

    <div class="popup animated zoomIn" v-if="show">
      <img class="newimg" :src="base64img" />
      <p class="tip">可长按保存图片分享至朋友圈</p>
      <img class="close" @click="closePop" src="images/cards/close.png" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, defineEmits } from "vue";
import { useAppStore } from "@/app/store/appStore";
import { changePage } from "@/app/pages/index/service/pageState";
import html2canvas from "html2canvas";

const store = useAppStore();
const emit = defineEmits(["on-restart"]);

const type = ref(2);
const show = ref(false);
const inner = ref(null);
const base64img = ref("");

watch(
  () => store.escore,
  (escore) => {
    const iscore = 20 - escore;
    const score = escore - iscore;
    const absScore = Math.abs(score);

    if (score === 0) {
      type.value = 1;
    } else if (score < 0) {
      type.value = iType(absScore);
    } else {
      type.value = eType(absScore);
    }
  }
);

function iType(score) {
  if (score <= 3) {
    return 6;
  } else if (score <= 6) {
    return 7;
  } else if (score <= 8) {
    return 8;
  } else {
    return 9;
  }
}

function eType(score) {
  if (score <= 3) {
    return 2;
  } else if (score <= 6) {
    return 3;
  } else if (score <= 8) {
    return 4;
  } else {
    return 5;
  }
}

async function onPainter() {
  await nextTick();
  html2canvas(inner.value).then(function (canvas) {
    show.value = true;
    changePage(4);
    base64img.value = canvas.toDataURL("image/png", 0.98);
  });
}

function onRestart() {
  emit("on-restart");
}
// watchEffect(() => {
//   if (show.value === false) {
//     changePage(3);
//   } else {
//     changePage(4);
//   }
// });
function closePop() {
  show.value = false;
  changePage(3);
}
</script>

<style scope lang="less">
.painter {
  position: relative;
  height: 100%;
  background: url("~images/cards/p4-bg2.png") no-repeat;
  background-size: cover;
  background-position: center top;

  .inner {
    height: 90.05%;
    padding-top: 7.8%;
    padding-bottom: 4.2%;
    box-sizing: border-box;
    background: url("~images/cards/p4-bg.png") no-repeat;
    background-size: cover;
    background-position: center top;
    display: flex;
    align-items: center;
    .card-box {
      width: 100%;
      height: 78%;
    }
  }
  .inner-cover {
    height: 90.05%;
    width: 100%;
    padding-top: 7.8%;
    padding-bottom: 4.2%;
    //background: url("~images/cards/guang.png") no-repeat;
    background-size: cover;
    background-position: center top;
    top: 0;
    left: 0;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    transform-origin: 50% 50%;
    //
    .card-box {
      width: 100%;
      height: 78%;
      .guang-box {
        overflow: hidden;
        position: relative;
        & > img {
          width: 100%;
          height: auto;
          position: absolute;
          left: 0;
          top: 0;
          animation: cardflash 4s 0.2s infinite;
        }
      }
      .guang-mask {
        -webkit-mask: no-repeat right center / auto 100%;
        mask: no-repeat right center / auto 100%;
        -webkit-mask-image: url("~images/cards/1.png");
        mask-image: url("~images/cards/1.png");
      }
    }
  }
  .popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    & > img.newimg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
    .tip {
      position: absolute;
      top: 92%;
      left: 0;
      width: 100%;
      font-size: 0.28rem;
      color: #6a0c0a;
      text-align: center;
    }
    .close {
      position: absolute;
      top: 1%;
      right: 5%;
      width: 0.54rem;
    }
  }
  .title {
    width: 3.59rem;
    margin: 0 auto 4.5%;
  }

  each(range(9), {
    .card-@{value} {
      background: url("~images/cards/@{value}.png") right center / auto 100%
        no-repeat;
    }
  });
  .card {
    width: 4.12rem;
    height: 5.83rem;
    margin: 0 auto;
    margin-top: 2%;
  }
  //.card-guang {
  // background: url("~images/cards/guang.png") right center / auto 100%
  //   no-repeat;
  // & > img {
  //   height: 100%;
  //   width: auto;
  // }
  // & > .cardmask {
  //   -webkit-mask: no-repeat center / auto 100%;
  //   mask: no-repeat center / auto 100%;
  //   -webkit-mask-image: url("~images/cards/cardrect.png");
  //   mask-image: url("~images/cards/cardrect.png");
  // }
  //}
  .desc {
    margin: 5% 0.205rem 10%;
  }
  .btns {
    position: absolute;
    top: 86%;
    left: 0;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    img {
      height: 0.61rem;
      width: auto;
      margin: 0 0.38rem;
    }
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.zoomIn {
  animation-name: zoomIn;
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes cardflash {
  0% {
    opacity: 1;
    transform: translateX(20%);
  }

  100% {
    opacity: 0;
    transform: translateX(-70%);
  }
}
</style>
