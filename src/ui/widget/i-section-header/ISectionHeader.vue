<script setup>
import {defineProps} from 'vue';
defineProps({
  logo:{
    type:String,
    default:''
  },
  title:{
    type:String,
    default:''
  }
});
</script>
<template>
  <div class="section-header-wrap"> 
    <div class="side-header">
      <img v-if="logo!==''" :src="logo" alt="logo" class="logo" />
    </div>   
    <h3 v-if="title!==''">{{title}}</h3>
      <slot></slot>
  </div>
</template>
<style lang="less">
@import "~@static/styles/variable.less";
.section-header-wrap{
  width: 100%;
  height: @topRowHeight ;
  position:fixed;
  top:0px;
  left: 0px; 
  background-color:#fff;
  display:flex;
  flex-direction: row;
  flex-wrap: nowrap; 
  align-items: center;
  box-shadow: 0 2px 5px -1px rgba(0,0,0,0.2);
  z-index: 2000;
  box-sizing: border-box;
  padding-right: 15%;
  &>h3{
    display: inline-block;
    width: auto;
    height: 100%;
    line-height: @topRowHeight ;
    font-size: 20px;
    font-weight: bold;
    color: #5f545a;
    margin-left: 5px;
  }
  .side-header{
    width: @sideColumnWidth;
    height: 100%;
    border-left: 1px solid #c6c6c6;
     border-right: 1px solid #c6c6c6;
    box-sizing: border-box;
     &>.logo{
      display: inline-block;
      width:auto;
      height:calc( @topRowHeight - 5px) ;
      margin-left: 5px;
    }
  } 
   
}
</style>


