<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods-list :goods_item="recommendList"/>
  </div>
</template>

<script>
  import GoodsList from '@/components/content/goods/GoodsList'

	export default {
		name: "DetailRecommendInfo",
    components: {
      GoodsList
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
