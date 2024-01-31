<template>
  <div class="quiz">
    <div class="progress" :class="`progress-${sq}`"></div>
    <div class="once">
      <div class="title">{{ active.title }}</div>
      <div class="select">
        <div class="option">A.是</div>
        <div class="option">B.否</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const sq = ref(1);
const list = ref([
  {
    title: "我是聚会中的灵魂人物",
  },
  {
    title: "我时常能对他人的情感产生共鸣",
  },
  {
    title: "我能迅速处理好各种日常琐事",
  },
  {
    title: "在职场中我的情绪时常产生波动",
  },
  {
    title: "我经常会产生各种奇思妙想",
  },
  {
    title: "在职场中，我的话很少",
  },
  {
    title: "我对他人的困难不感兴趣",
  },
  {
    title: "我拥有逗别人开心的能力",
  },
  {
    title: "在职场中我很多时候都感到放松",
  },
  {
    title: "我更喜欢一个人做事",
  },
  {
    title: "我在聚会中喜欢和不同的人交谈",
  },
  {
    title: "我喜欢一切都有严谨的秩序",
  },
  {
    title: "我喜欢幕后工作大于台前工作",
  },
  {
    title: "我对他人的想法和情绪不感兴趣",
  },
  {
    title: "遇到困难我会马上求助他人",
  },
  {
    title: "我会主动向别人分享我的经验",
  },
  {
    title: "我喜欢参与商务谈判",
  },
  {
    title: "周末，我更喜欢一个人宅家而不是和朋友一起出去逛街",
  },
  {
    title: "相对于自己跑步，我更喜欢团队运动",
  },
  {
    title: "我喜欢一个人用餐，而不是和同事一起",
  },
]);

const active = computed(() => list.value[sq.value - 1]);
</script>

<style scope lang="less">
.quiz {
  font-size: 0.38rem;
  color: white;
  .progress {
    margin: 23.45% auto 9.5%;
  }
  each(range(20), {
    .progress-@{value} {
      width: 2.03rem;
      height: 0.52rem;
      background: url("~images/numbers/@{value}.png") right center / auto 100%
        no-repeat;
    }
  });

  .once {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 66%;
      margin-bottom: .65rem;
    }
    .select {
      width: 60%;
      .option {
        padding: 10px 0;
        margin-bottom: .45rem;
        border: 0.01rem solid white;
        border-radius: 1rem;
        text-align: center;
      }
    }
  }
}
</style>