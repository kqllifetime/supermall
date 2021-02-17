<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

export default {
  el: 'NavBar',

}
</script>

<style lang="less" scoped>
.nav-bar{
  display: flex;
  height: 1.375rem;
  line-height: 1.375rem;
  text-align: center;
  font-weight: bolder;
  box-shadow: 0 1px 1px rgba(100,100,100,.2);
  .left, .right {
    width: 1.875rem;
  }
  .center {
    flex: 1;
    font-size: .5rem;
  }

}
</style>
