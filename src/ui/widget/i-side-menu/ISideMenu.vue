<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MenuData } from "@/router.js";
const listData = ref([]);
const currtRoute = ref("/");
const checkActive = computed(() => {
  return (tp, pp)=>{
    pp = pp || "";
    tp = /^\//.test(tp) ? tp : `/${tp}`;
    if (pp === "" && currtRoute.value.fullPath) {
      //没有父一级参数
      let currtPath = currtRoute.value.fullPath.split("/")[1];
      currtPath = `/${currtPath}`;
      if (tp === currtPath) {
        return true;
      }
    }
    if (currtRoute.value.fullPath === `${pp}${tp}`) {
      return true;
    }
    return false;
  };
});
const listGroup=computed(()=>{
  const grouplist={"all":[]};
  listData.value.forEach((item)=>{
    if(item.navsetter.group){
      if(grouplist[item.navsetter.group]){
        grouplist[item.navsetter.group].push(item);
      }else{
        grouplist[item.navsetter.group]=[item];
      }
    }else{
      grouplist["all"].push(item);
    }
  });
  return grouplist;
});
 
const route = useRoute();
const router = useRouter();
watchEffect(
  () => {
    if (route.fullPath && route.fullPath !== "/") {
      
      if (listData.value.length === 0) {
        setListData();
      }
      currtRoute.value = Object.assign({}, route);
      console.log("this.listData00000==", currtRoute.value);
    }
  }
);
function setListData() {
  listData.value = MenuData.map((item) => {
    const { path } = item;
    const { navsetter } = item.meta;
    let children = item.children || null;
    if (children) {
      children = children.filter((val) => {
        return val.meta;
      });
      children = children.map((child) => {
        const { navsetter } = child.meta || null;
        return { path: child.path, navsetter: navsetter || null };
      });
      children = children.filter((child) => {
        return child.navsetter;
      });
    }
    return { path, navsetter, children };
  });
}
function changeNav(tp, pp) {
  pp = pp || "";
  tp = /^\//.test(tp) ? tp : `/${tp}`;
  if (pp === "") {
    router.push({ path: tp });
  } else {
    router.push({ path: `${pp}${tp}` });
  }
}
</script>
<template>
  <div class="side-menu-wrap">
    <ul>
      <!-- <template v-for="(item,index) in listData" :key="index">
        <li :class="[checkActive(item.path)?'active':'',item.children?'has-sublist':'']">
          <div class="first">
            <span @click="changeNav(item.path)">{{item.navsetter.alias}}</span>
          </div>
          <div class="second" v-if="item.children">
            <template v-for="(child,cindex) in item.children" :key="cindex">
              <span
                :class="[checkActive(child.path,item.path)?'active':'']"
                @click="changeNav(child.path,item.path)"
              >{{child.navsetter.alias}}</span>
            </template>
          </div>
        </li>
      </template> -->


      <template v-for="(value,key,vindex) in listGroup"  v-bind:key="vindex+'haha'"> 
        <li v-if="key!=='all'">
          <div class="group-label">
            <h3>{{key}}</h3>
          </div>
        </li>
          <template v-for="(item,index) in value" :key="index">
          <li  :class="[checkActive(item.path)?'active':'',item.children?'has-sublist':'']" >        
            <div class="first">
              <span @click="changeNav(item.path)">
                <i v-if="item.navsetter.icon" :class="['iconfont',item.navsetter.icon]"></i>
                <h3 :class="item.navsetter.icon?'':'noi'">{{item.navsetter.alias}}</h3>
              </span>
            </div>
            <div class="second" v-if="item.children">
              <template v-for="(child,cindex) in item.children"  :key="cindex">
                <span 
                  :class="[checkActive(child.path,item.path)?'active':'']" @click="changeNav(child.path,item.path)"
                >
                <i v-if="child.navsetter.icon" :class="['iconfont',child.navsetter.icon]"></i>
                <h3> {{child.navsetter.alias}}</h3>
                </span>
              </template>
            </div>
          </li>
        </template>
      </template>

    </ul>
  </div>
</template>
<style lang="less" scoped>
@import "~@static/styles/variable.less";
@menuItem: 36px;
@subItem: 32px;
.side-menu-wrap {
  width: @sideColumnWidth;
  height: calc(100% - @topRowHeight);
  position: fixed;
  top: @topRowHeight;
  left: 0px;
  z-index: 2001;
  box-sizing: border-box;
  border-left: 1px solid #c6c6c6;
  border-right:  1px solid #c6c6c6;
   border-top:  1px solid #c6c6c6;
  & > ul {
    width: 100%;
    height: 100%;
    & > li {
      list-style: none;
      display: block;
      width: 100%;
      height: auto;
      min-height: @menuItem;
     // padding-top: 5px;
      & > .second {
        display: none;
      }
      &> .group-label{
        line-height: @menuItem;
        box-sizing: border-box;
        width: 100%;
        font-size: 15px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        padding-right: 10%;  
         &>h3{
          font-size: 15px;
          font-weight: bold;
          flex-grow:2;
          min-width: 50%;
          padding-left: calc(30% - 18px);
          color:#000;
        }
      }
    }
    & > li.active {
      & > .second {
        display: block;
      }
      & >.first>span{
        background-color: rgba(255, 127, 0, 0.2);
        border-right:2px solid  @text-active-color;
        &>i,&>h3{
          color:@text-active-color;
        }
      }
    }
     & > li.active.has-sublist{
       & >.first>span{
        background-color: transparent;
        border-right:none;
      }
     }
  }
  .first {
    width: 100%;
    height: @menuItem; 
    & > span {
      display: inline-block;
      line-height: @menuItem;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      background-color: transparent;
      color: #4c4c4c;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      padding-right: 10%;
      &>i{
        padding-right: 5px;
        font-size: 18px;
        width: 30%;
        text-align: right;
      }
       &>h3{
        font-size: 14px;
        font-weight: normal;
        flex-grow:2;
        min-width: 50%;
      
      }
      &>h3.noi{
        padding-left: calc(30% - 18px);
      }
    }
    & > span:hover {
       color: #fe7e00;
      background-color: rgba(254, 126, 0, 0.1);
    }
  }
  
  .second {
    width: 100%;
    height: auto;
    min-height: @subItem;
    & > span {
      display: inline-block;
      line-height: @subItem;
      padding-left: 10%;
      width: 100%;
      box-sizing: border-box;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      color:@text-inactive-color;
      cursor: pointer;
      background-color: transparent;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      padding-right: 10%;
      border-right:none;
      &>i{
        padding-right: 5px;
        font-size: 16px;
        width: 30%;
        text-align: right;
      }
       &>h3{
        font-size: 12px;
        font-weight: normal;
        flex-grow:2;
        min-width: 50%;
      }
      &>h3.noi{
        padding-left: calc(30% - 16px);
      }
    }
    & > span:hover {
      color:@text-active-color;
      
    }
    & > span.active {
      background-color: rgba(255, 127, 0, 0.2);
      border-right:2px solid  @text-active-color;
      &>i,&>h3{
         color:@text-active-color;
      }
    }
  }
}
</style>


