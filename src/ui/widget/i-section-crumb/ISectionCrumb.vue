<script setup>
// export default {
//   props: {
//     className: {
//       type: String,
//       default: ""
//     },
//     backBtn: {
//       type: Boolean,
//       default: false
//     }
//   },
//   name: "i-section-crumb",
//   data() {
//     return {
//       defaultLabel: ""
//     };
//   },
//   mounted() {
//     this.defaultLabel = this.checkCrumb() || "page";
//   },
//   computed: {
//     currRoute() {
//       return this.$store.state.RouteInfo;
//     },
//     crumbLabel() {
//       if (this.currRoute.meta) {
//         return this.currRoute.meta.label;
//       } else {
//         return this.defaultLabel;
//       }
//     }
//   },
//   methods: {
//     checkCrumb() {
//       return this.$router.currentRoute.meta.label;
//     },
//     goBack() {
//       this.$router.go(-1);
//     }
//   }
// };
import {defineProps,ref, computed} from 'vue';
import {useRoute } from 'vue-router';
defineProps({
  className:{
    type:String,
    default:''
  },
  backBtn:{
    type: Boolean,
    default: false
  }
});
const defaultLabel=ref('');
const route=useRoute();
const crumbLabel=computed(()=>{
  if(route.meta){
    return route.meta.label;
  }else{
    return defaultLabel;
  }
});
</script>
<template>
  <div :class="[className,'section-crumb-wrap']">
    当前位置：{{crumbLabel}}
    <slot></slot>
  </div>
</template>
<style lang="less">
@import "~@static/styles/variable.less"; 
.section-crumb-wrap {
  position: absolute;
  left: 0px;
  top: 0px;
  width:100%;
  height: @crumbHeight;
  line-height: calc(@crumbHeight -10px) ;
  font-size: 14px;
  z-index: 901;
  padding-left: 18px;
  box-sizing: border-box;
  // background-color: #fff;
  display: flex;
  align-items: center;
  .x-btn-back{
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    margin-left: 14px;
    .icon-chehui{
      font-size: 18px;
    }
  }
}
</style>

