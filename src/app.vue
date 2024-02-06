<script setup>
import { ref, onMounted, onBeforeMount, watchEffect, nextTick } from "vue";
import { curpage } from "app/pages/index/service/pageState";
const soundStyle = ref({ right: "5%" });
watchEffect(() => {
  if (curpage.value < 4) {
    soundStyle.value = { right: "5%", opacity: 1 };
  } else {
    soundStyle.value = { right: "5%", opacity: 0 };
  }
});
const test = ref(0);
console.log("test.value=", test);

onBeforeMount(() => {
  window.Adapter.useShare({
    title: "职业性格大解密",
    desc: "HR牛牛新年特别策划",
    imgUrl: "images/share.jpg",
    debug: false,
    success: function (res) {
      console.log("okkkkk!!", res);
    },
    fail: function (res) {
      console.log("nonono!!", res);
    },
  });
});
onMounted(() => {
  document.dispatchEvent(new Event("render-event"));
  nextTick(() => {
    musicSwitch();
  });
});
function musicResolver() {
  const audio = document.querySelector("#autoplay");
  if (audio) {
    try {
      // audio.play();
      audio.muted = false;
      audio.pause();
      setTimeout(() => {
        //audio.playbackRate = 0.5;
        audio.play();
      }, 100);
      document.removeEventListener("touchstart", musicResolver, false);
    } catch (e) {
      console.log(e);
    }
  }
}

// 音乐切换
function musicSwitch() {
  const mediaWrap = document.querySelector(".media-wrap");
  const audio = document.querySelector("#autoplay");
  const musicOn = document.querySelector(".music_on");
  const musicOff = document.querySelector(".music_off");
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  // IOS策略，无法自动播放，只能使用原来的方式播放
  const isUseAudioCtx =
    AudioContext &&
    !/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(navigator.userAgent);
  // var isUseAudioCtx = AudioContext;
  window.focus();
  const url = audio.getAttribute("src");
  let isPalying = true;
  if (isUseAudioCtx) {
    loadSound(url, audioCtx);
  } else {
    document.addEventListener("touchstart", musicResolver, false);
    // document.addEventListener(
    //   "WeixinJSBridgeReady",
    //   () => {
    //     audio.play();
    //   },
    //   false
    // );
    audio.addEventListener("ended", () => {
      console.log("audio ended happend");
      audio.load();
      //audio.playbackRate = 0.5;
      audio.play();
    });
  }
  mediaWrap.addEventListener(
    "touchstart",
    () => {
      console.log("点击点击点击");
      audio.muted = false;
      if (isUseAudioCtx) {
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
          isPalying = true;
        } else {
          audioCtx.suspend();
          isPalying = false;
        }
      } else {
        if (audio.paused) {
          //audio.playbackRate = 0.5;
          audio.play();
          isPalying = true;
        } else {
          audio.pause();
          isPalying = false;
        }
      }
      if (isPalying) {
        mediaWrap.classList.add("on");
        musicOn.style.display = "block";
        musicOff.style.display = "none";
      } else {
        mediaWrap.classList.remove("on");
        musicOn.style.display = "none";
        musicOff.style.display = "block";
      }
    },
    true
  );
}
function loadSound(url, context) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  // Decode asynchronously
  const onError = (e) => {
    console.log(e);
  };
  request.onload = function () {
    context.decodeAudioData(
      request.response,
      function (buffer) {
        playSound(buffer, context);
      },
      onError
    );
  };
  request.send();
}
function playSound(buffer, context) {
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
  source.loop = true;
}
</script>
<template>
  <div :class="['app-outer']">
    <router-view></router-view>
    <!--music start-->
    <aside class="media-wrap on" :style="soundStyle">
      <img class="music_on" src="images/music_on.png" alt="" />
      <img class="music_off" src="images/music_off.png" alt="" />
    </aside>
    <!--music end-->
    <!-- <i-section-footer></i-section-footer> -->
  </div>
</template>
<style lang="less" scoped>
@import "~@static/styles/variable.less";
.app-outer {
  width: 100%;
  background-color: #f8e6d0;
}
</style>
