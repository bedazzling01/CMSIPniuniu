<script setup>
import { ref, defineProps, defineEmits } from "vue";
defineProps({
  role: {
    type: Object,
    default: () => {
      return {
        face: "images/default-user-face.png",
        name: ""
      };
    }
  },
  logged: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['leave']);
const visible = ref(true);
function quit() {
  emit("leave");
}
</script>
<template>
  <div class="section-admin-wrap" v-show="visible">
    <div class="info-item" v-if="logged">
      <img :src="role.face" alt="头像">
      <span>{{role.name}}</span>
    </div>
    <div class="info-item" @click="quit" v-if="logged">注销</div>
  </div>
</template>
<style lang="less">
@import "~@static/styles/variable.less";
.section-admin-wrap {
  width: 14%;
  height: 100%;
  max-width: 264px;
  position: absolute;
  right: 0px;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  padding-right: 20px;
  box-sizing: border-box;
  & > .info-item {
    height: 100%;
    min-width: 60px;
    margin: 0px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-user-select: none;
    pointer-events: auto;
    & > img {
      display: inline-block;
      height: 60%;
      width: auto;
      border-radius: 100%;
      margin-right: 5px;
    }
  }
  .iconfont {
    font-size: 24px;
  }
}
</style>


