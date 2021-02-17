<template>
  <div class="recommend">
    <div v-for="item in recommend_data" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  el: 'HomeRecommend',
  props: {
    recommend_data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: .375rem;
    padding: .3125rem 0 .625rem;
    border-bottom: .25rem solid #eee;
    .recommend-item {
      flex: 1;
      img {
        width: 80%;
        margin-bottom: .3125rem;
      }
    }
  }
</style>
