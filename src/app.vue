<script setup>
import { ref, onMounted,onBeforeMount } from "vue";
const test = ref(0);
console.log("test.value=", test);
onMounted(() => {
  document.dispatchEvent(new Event("render-event"));
});
onBeforeMount(() => {
  window.Adapter.useShare({
    title: "汉高杰出雇主之星",
    desc: " ",
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
</script>
<template>
  <div :class="['app-outer']">
    <router-view></router-view>
    <i-section-footer></i-section-footer>
  </div>
</template>
<style lang="less" scoped>
@import "~@static/styles/variable.less";
.app-outer {
  width: 100%;
  background-color: #f8e6d0;
}
</style>
