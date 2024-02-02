<template>
  <div class="page-view03">
    <div class="p3-bg"><img src="images/p3_bg.png" alt="page3" /></div>
    <img src="images/p3-deng01.png" alt="deng01" class="p3-deng01" />
    <img src="images/p3-deng02.png" alt="deng01" class="p3-deng02" />
    <div class="fireworks1"><img src="images/fireworks.png" alt="" /></div>
    <div class="fireworks2"><img src="images/fireworks.png" alt="" /></div>
  </div>
</template>
<script setup></script>
<style scope lang="less">
.page-view03 {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
  & > img {
    display: block;
  }
  .p3-bg {
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
  .p3-deng01 {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    top: 10%;
    transform: translate(-5%, -5%);
    -webkit-transform: translate(-5%, -5%);
    animation: dengSwing03 9s 0s infinite;
  }
  .p3-deng02 {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    top: 48%;
    transform: translate(0%, 0%);
    -webkit-transform: translate(0%, 0%);
    animation: dengSwing04 5s 0.2s infinite;
  }
  .fireworks1 {
    position: absolute;
    right: -60%;
    top: -10%;
    transform: scale(0);
    animation: fireworks 5s 0s infinite;
    -webkit-animation: fireworks 5s 0s infinite;
  }
  .fireworks2 {
    position: absolute;
    left: -60%;
    bottom: 0%;
    transform: scale(0);
    animation: fireworks2 5s 0.6s infinite;
    -webkit-animation: fireworks2 5s 0.6s infinite;
  }
}
@keyframes dengSwing03 {
  0% {
    opacity: 1;
    transform: translate(-5%, -6%);
  }
  50% {
    opacity: 0.9;
    transform: translate(5%, 2%);
  }
  100% {
    opacity: 1;
    transform: translate(-5%, -6%);
  }
}

@keyframes dengSwing04 {
  0% {
    opacity: 1;
    transform: translate(0%, 0%);
  }
  50% {
    opacity: 0.8;
    transform: translate(0%, 4%);
  }
  100% {
    opacity: 1;
    transform: translate(0%, 0%);
  }
}
@keyframes fireworks {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes fireworks {
  0% {
    -webkit-transform: scale(0);
  }
  80% {
    -webkit-transform: scale(1.1);
  }
  100% {
    opacity: 0;
  }
}
@keyframes fireworks2 {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(0.7);
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes fireworks2 {
  0% {
    -webkit-transform: scale(0);
  }
  80% {
    -webkit-transform: scale(0.7);
  }
  100% {
    opacity: 0;
  }
}
</style>
