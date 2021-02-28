<template>
  <div class="loading">
    <div v-if="!is_loading_show">上拉加载更多</div>
    <div v-else>-----------------Loading----------------</div>
  </div>
</template>

<script>

export default {
  name: 'PullupLoading',
  props: {
    is_loading_show: false,
  }

}
</script>

<style lang="less" scoped>
  .loading div {
    height: 1.53125rem;
    line-height: 1.53125rem;
    text-align: center;
    background-color: rgba(240, 235, 235, 0.8);
  }
</style>
