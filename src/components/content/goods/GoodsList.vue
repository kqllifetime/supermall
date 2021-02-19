<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, id) in goods_item" :list_item="item" :key="id"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  el: 'GoodsList',
  props: {
    goods_item: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }

}
</script>

<style lang="less" scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
