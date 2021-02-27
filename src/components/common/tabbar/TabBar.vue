<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="less" scoped>

.tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #dadada;
  box-shadow: 0px -2px 2px rgba(100, 100, 100, .2);
  // z-index: 9999;
}
</style>
