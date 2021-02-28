<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
          :is_pullup_load="{threshold: -50}" @pullingUp="onPullingUp">
      <detail-swiper :images="swiperImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo"
          @detailImageLoaded="onDetailImageLoaded"/>
      <detail-param-info :paramInfo="goodsParams"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <detail-recommend-info :recommendList="recommendData"/>
      <pullup-loading :is_loading_show="is_loading_show" v-show="isShowLoadMore"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './child-comps/DetailNavBar'
import DetailSwiper from './child-comps/DetailSwiper'
import DetailBaseInfo from './child-comps/DetailBaseInfo'
import DetailShopInfo from './child-comps/DetailShopInfo'
import DetailGoodsInfo from './child-comps/DetailGoodsInfo'
import DetailParamInfo from './child-comps/DetailParamInfo'
import DetailCommentInfo from './child-comps/DetailCommentInfo'
import DetailRecommendInfo from './child-comps/DetailRecommendInfo'

import Scroll from '@/components/common/scroll/BScroll'
import PullupLoading from '@/components/common/scroll/PullupLoading'


import {
  itemListenerMixIn,
  loadMoreMixIn,
  } from '@/common/mixin'
import {debounce} from '@/common/utils'
import {
  getDetailData,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
  } from '@/network/detail.js'

export default {
  name: 'Detail',
  data() {
    return {
      itemid: '',
      swiperImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommendData: [],
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    Scroll,
    PullupLoading
  },
  mixins: [itemListenerMixIn, loadMoreMixIn],
  created() {
    console.log('Detail created');
    this.itemid = this.$route.params.iid

    getDetailData(this.itemid).then(res => {
      // console.log(res);
      const data = res.result
      // 获取轮播图的数据
      this.swiperImages = data.itemInfo.topImages
      // 获取商品基本信息数据
      this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取店铺信息数据
      this.shopInfo = new Shop(data.shopInfo)
      // 获取商品详情数据
      this.detailInfo = data.detailInfo
      // 获取商品参数数据
      this.goodsParams = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取评论信息数据
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }).catch(err => {
      console.log(err);
    })

    this.getRecommendData();

  },
  mounted() {
  },
  unmounted() {
    // imgLoadListerner和loadMoreListener为混入mixin的变量，
    // 离开时关闭混入的监听事件
    this.$bus.off('itemImageLoaded', this.imgLoadListener)
    this.$bus.off('itemImageLoaded', this.loadMoreListener)
  },
  methods: {
    onDetailImageLoaded() {
      // 调用混入的变量函数
      this.newRefresh()
    },
    onPullingUp() {
      // 调用混入的loadMoreLoading和loadMoreDone
      this.loadMoreLoading()
      this.getRecommendData();
      this.$bus.on('doneGetRecommendData', () => {
        this.loadMoreDone()
      })
    },
    getRecommendData() {
      getRecommend().then(res => {
      // console.log(res);
      this.recommendData.push(...res.data.list)
      this.$refs.scroll.finishPullUp()
      this.$bus.emit('doneGetRecommendData')
    }).catch(err => {
      console.log(err);
    })
    }
  },
}
</script>

<style lang="less" scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
    .content {
      height: calc(100% - 1.375rem);
      background-color: #fff;
    }
    .detail-nav {
      position: relative;
      z-index: 2;
      background-color: #fff;
    }
  }

</style>
