<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view>
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :list_item="item"></goods-list-item>
    </grid-view>
  </div>
</template>

<script>
  import GridView from '@/components/common/gridView/GridView'
  import GoodsListItem from '@/components/content/goods/GoodsListItem'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  GridView,
      GoodsListItem
    },
    props: {
		  recommendList: {
		    type: Array
      }
    }
	}
</script>

<style scoped>
  .recommend-info {
    padding: .15625rem;
  }

  .info-header {
    line-height: 1.25rem;
    padding-left: .25rem;
    font-size: .46875rem;
    color: #333;
  }
</style>
