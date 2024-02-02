import { ref } from "vue";
const curpage = ref(0);

function changePage(num) {
  if (curpage.value !== num) {
    curpage.value = num;
  }
}

export { curpage, changePage };
