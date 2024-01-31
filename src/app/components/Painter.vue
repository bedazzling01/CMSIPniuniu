<template>
  <div class="painter">
    <img class="title" src="images/cards/title.png" />
    <img class="card" src="images/cards/1.png" />
    <div class="desc">
      <img src="images/cards/desc.png" >
    </div>
    <div class='btns'>
      <img src="images/cards/btn_1.png" >
      <img src="images/cards/btn_2.png" >
    </div>
  </div>
</template>

<script setup>
</script>

<style scope lang="less">
.painter {
  .title {
    width: 3.59rem;
    margin:  7.8% auto 4.5%;
  }
  .card {
    width: 4.12rem;
    margin: 0 auto;
  }
  .desc {
    margin: 5% .22rem 10%;
  }
  .btns {
      display: flex;
      align-content: center;
      justify-content: center;
    img {
      height: .61rem;
      width: auto;
      margin: 0 .38rem;
    }
  }
}
</style>