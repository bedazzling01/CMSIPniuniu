<template>
  <div class="quiz">
    <div class="progress" :class="`progress-${sq}`"></div>
    <div class="once">
      <div class="title">{{ active.title }}</div>
      <div class="select" :class="{ 'in-process': inProcess }">
        <div
          class="option"
          :class="{ selected: active.selected === 'A' }"
          @click="onClick('A')"
        >
          A.是
        </div>
        <div
          class="option"
          :class="{ selected: active.selected === 'B' }"
          @click="onClick('B')"
        >
          B.否
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from "vue";
import { useAppStore } from "@/app/store/appStore";

const source = [
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
];

const store = useAppStore();
const emit = defineEmits(["on-next", "buttonClick"]);

const props = defineProps({
  restart: Boolean,
});

let escore;

const sq = ref(1);
const inProcess = ref(false);
const list = ref(source.map(({ title }) => ({ title })));

const active = computed(() => list.value[sq.value - 1]);

watch(
  () => props.restart,
  (newVal) => {
    if (newVal) {
      sq.value = 1;
      list.value = source.map(({ title }) => ({ title }));
    }
  }
);

function onClick(type) {
  inProcess.value = true;

  const index = sq.value - 1;
  list.value.splice(index, 1, {
    ...list.value[index],
    selected: type,
  });

  if (index >= 19) {
    escore = list.value.filter((item) => item.selected === "A").length;
    store.saveEscore(escore);
    inProcess.value = false;
    emit("on-next");
    return;
  }

  setTimeout(() => {
    sq.value += 1;
    inProcess.value = false;
  }, 500);
}
// function clickHandle() {
//   emits("buttonClick", { pid: 3 });
// }
</script>

<style scope lang="less">
.quiz {
  font-size: 0.38rem;
  color: white;
  .progress {
    // margin: 23.45% auto 11.5%;
    margin: 0% auto 11.5%;
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
    justify-content: center;
    .title {
      width: auto;
      max-width: 72%;
      margin-bottom: 0.65rem;
      //text-align: center;
    }
    .select {
      width: 60%;
      &.in-process {
        pointer-events: none;
      }
      .option {
        padding: 10px 0;
        margin-bottom: 0.45rem;
        border: 0.01rem solid white;
        border-radius: 1rem;
        text-align: center;
        &.selected {
          border-color: #f4602f;
          color: #f4602f;
        }
      }
    }
  }
}
</style>
