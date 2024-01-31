<script setup>
import { ref, defineProps } from "vue";
defineProps({
  styles: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const year = ref("");
const copyright = ref("");
year.value = new Date().getFullYear();
copyright.value = /Android|webOS|iPhone|iPod|ipad|BlackBerry|HarmonyOS/i.test(
  navigator.userAgent
)
  ? "无忧工作网版权所有"
  : "未经51job同意，不得转载本网站之所有招聘信息及作品";
</script>
<template>
  <div class="section-footer-wrap" :style="styles">
    <h3>{{ copyright }}©1999-{{ year }}</h3>
  </div>
</template>
<style lang="less" scoped>
@import "~@static/styles/variable.less";
.section-footer-wrap {
  width: 100%;
  height: @bottomRowHeight;
  position: fixed;
  bottom: 0px;
  left: @sideColumnWidth;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  //background: transparent;
  z-index: 1999;
  box-sizing: border-box;
  padding-left: @sideColumnWidth;
  & > h3 {
    width: auto;
    height: 100%;
    line-height: @bottomRowHeight;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    font-weight: normal;
  }
}
</style>
