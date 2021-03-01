<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @topTabClick="onTopTabClick" ref="navbar"/>
    <scroll class="content" ref="scroll" :is_pullup_load="{threshold: -50}"
          @scroll="onScroll" @pullingUp="onPullingUp">
      <detail-swiper :images="swiperImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo"
          @detailImageLoaded="onDetailImageLoaded"/>
      <detail-param-info :paramInfo="goodsParams" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <detail-recommend-info :recommendList="recommendData" ref="recommend"/>
      <pullup-loading :is_loading_show="is_loading_show" v-show="isShowLoadMore"/>
    </scroll>
    <detail-bottom-bar @addToCart="onAddToCart"/>
    <back-top @click.native="onBackTopClick" v-show="isBackTopShow"/>
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
import DetailBottomBar from './child-comps/DetailBottomBar'

import Scroll from '@/components/common/scroll/BScroll'

import {
  itemListenerMixIn,
  loadMoreMixIn,
  backTopMixIn,
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
      topTabPositionY: [],
      getTopTabPositionY: null,
      currentIndex: 0,
      isClickTopTab: false,
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
    DetailBottomBar,
    Scroll,
  },
  mixins: [itemListenerMixIn, loadMoreMixIn, backTopMixIn],
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

    this.getTopTabPositionY = debounce( () => {
      this.topTabPositionY = []
      this.topTabPositionY.push(0)
      this.topTabPositionY.push(this.$refs.param.$el.offsetTop - this.$refs.navbar.$el.offsetHeight)
      this.topTabPositionY.push(this.$refs.comment.$el.offsetTop - this.$refs.navbar.$el.offsetHeight)
      this.topTabPositionY.push(this.$refs.recommend.$el.offsetTop - this.$refs.navbar.$el.offsetHeight)
      // 在数组内多加一项最大值，用来简化topTab联动事件的判断条件
      this.topTabPositionY.push(Number.MAX_VALUE)
      // console.log(this.topTabPositionY);
    }, 100)
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
    onTopTabClick(index) {
      this.currentIndex = index
      this.isClickTopTab = true
      this.$bus.on('tabScrollDone', () => {
        this.isClickTopTab = false
      })
      this.$refs.scroll.scrollTo(0, -this.topTabPositionY[index])
    },
    onDetailImageLoaded() {
      // 调用混入的变量函数
      this.newRefresh()
      this.getTopTabPositionY()
    },
    onPullingUp() {
      // 调用混入的loadMoreLoading和loadMoreDone
      this.loadMoreLoading()
      this.getRecommendData();
      this.$bus.on('doneGetRecommendData', () => {
        this.loadMoreDone()
      })
    },
    onBackTopClick() {
      // 调用混入的backTopClick
      this.backTopClick()
    },
    onScroll(position) {
      // 调用混入的showBackTop
      // console.log(position);
      const positionY = -position.y
      // 判断是否显示backTop组件
      this.showBackTop(positionY, 1000)
      // 判断是否是点击topTab的滚动事件
      if(this.isClickTopTab && positionY === this.topTabPositionY[this.currentIndex]) {
        this.$bus.emit('tabScrollDone')
      }
      // 判断topTab的联动, 是点击topTab产生的滚动则不执行
      if(!this.isClickTopTab) {
        const length = this.topTabPositionY.length
        for (let i = 0; i < length-1; i++) {
          // if(this.currentIndex !== i &&
          //     ((i< length - 1 && positionY >= this.topTabPositionY[i] && positionY < this.topTabPositionY[i+1]) ||
          //       (i === length - 1 && positionY >= this.topTabPositionY[i])))
          if(this.currentIndex !==i &&
              (positionY >= this.topTabPositionY[i] &&
                positionY < this.topTabPositionY[i+1]))
          {
            this.currentIndex = i
            this.$refs.navbar.currentIndex = this.currentIndex
          }
        }
      }

    },
    onAddToCart() {
      console.log('add to cart');
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
      height: calc(100% - 1.375rem - 1.53125rem);
      background-color: #fff;
    }
    .detail-nav {
      position: relative;
      z-index: 2;
      background-color: #fff;
    }
  }

</style>
