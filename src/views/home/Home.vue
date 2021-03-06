<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
    <tab-control :title="['流行', '新款', '精选']" v-show="isOnPosition"
                  @tabClick="onTabClick" ref="tabControl1" class="tabtop"/>
    <scroll class="content" ref="scroll" :is_pullup_load="{threshold: -50}"
            @scroll="onScroll" @pullingUp="onPullingUp">
      <home-swiper :banner_data="banner" @swiperImageLoad="onSwiperImageLoad"/>
      <home-recommend :recommend_data="recommend"/>
      <home-feature></home-feature>
      <tab-control :title="['流行', '新款', '精选']"
                    @tabClick="onTabClick" ref="tabControl2"/>
      <goods-list :goods_item="showGoods"/>
      <pullup-loading :is_loading_show="is_loading_show"
                      v-show="isShowLoadMore"/>
    </scroll>
    <back-top @click.native="onBackTopClick" v-show="isBackTopShow"/>
    <div class="mask" v-show="isGoodsTabChanged"></div>
  </div>
</template>

<script>
import NavBar from '@/components/common/nav-bar/NavBar'
import Scroll from '@/components/common/scroll/BScroll'
import TabControl from '@/components/content/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import HomeSwiper from './child-comps/HomeSwiper'
import HomeRecommend from './child-comps/HomeRecommend'
import HomeFeature from './child-comps/HomeFeature'

import {getHomeMultidata, getHomeData} from '@/network/home-request'
import {debounce} from '@/common/utils.js'
import {
  itemListenerMixIn,
  loadMoreMixIn,
  backTopMixIn
} from '@/common/mixin.js'

export default {
  name: 'Home',
  data() {
    return {
      result: null,
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      current_type: 'pop',
      tabControlY: 0,
      positionY: 0,
      goodsTabY : {
        'pop': 0,
        'new': 0,
        'sell': 0
      },
      goodsTabChangeListener: null,
      isOnPosition: false,
      isGoodsTabChanged: false,
      isDeactivated: false
    }
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,

    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  computed: {
    showGoods() {
      return this.goods[this.current_type].list
    },
  },
  mixins: [itemListenerMixIn, loadMoreMixIn, backTopMixIn],
  created() {
    console.log('Home created');
    //1.请求banner和reommend数据
    this.getHomeMultidata();
    //2.请求goods数据
    this.getHomeData('pop');
    this.getHomeData('new');
    this.getHomeData('sell');
  },
  mounted() {
    //3.监听图片加载事件
    const emitGoodsTabChanged = debounce( () => {
      this.$bus.emit('goodsTabChanged')
      setTimeout( () => {
        this.isGoodsTabChanged = false
      }, 50)
    }, 100)
    this.goodsTabChangeListener = () => {
      if(this.isGoodsTabChanged) {
        emitGoodsTabChanged()
      }
    }
    this.$bus.on('itemImageLoaded', this.goodsTabChangeListener)
  },
  activated() {
    // 重新激活时，回到上次保存的位置，并刷新dom
    this.$refs.scroll.scrollTo(0, this.positionY)
    this.$refs.scroll.refresh()
    if(this.isDeactivated) {
      this.$bus.on('itemImageLoaded', this.imgLoadListener)
      this.$bus.on('itemImageLoaded', this.loadMoreListener)
      this.$bus.on('itemImageLoaded', this.goodsTabChangeListener)
    }
  },
  deactivated() {
    this.isDeactivated = true
    // 离开页面时，保存当前的位置
    this.positionY = this.$refs.scroll.getScrollY()
    // 调用混入的变量imgLoadListener和loadMoreListener, 离开时关闭监听事件
    this.$bus.off('itemImageLoaded', this.imgLoadListener)
    this.$bus.off('itemImageLoaded', this.loadMoreListener)
    this.$bus.off('itemImageLoaded', this.goodsTabChangeListener)
  },
  unmounted() {
    console.log('Home destroyed');
  },
  methods: {
    /**
     * 事件监听
     */
    onTabClick(index) {
      switch (index) {
        case 0:
          this.changeGoodsTab(this.current_type, 'pop')
          break;
        case 1:
          this.changeGoodsTab(this.current_type, 'new')
          break;
        case 2:
          this.changeGoodsTab(this.current_type, 'sell')
          break;
      }
      console.log(this.goodsTabY);
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },

    onBackTopClick() {
      this.backTopClick()
      for (let k in this.goodsTabY) {
        this.goodsTabY[k] = -this.tabControlY
      }
    },

    onScroll(position) {
      // console.log(position);
      this.showBackTop(-position.y, 1000)
      this.isOnPosition = (-position.y) >= this.tabControlY
    },

    onPullingUp() {
      // 调用混入的loadMoreLoading和loadMoreDone
      this.loadMoreLoading()
      this.getHomeData(this.current_type);
      this.$bus.on('doneGetHomeData', () => {
        this.loadMoreDone()
      })
    },

    onSwiperImageLoad() {

      this.tabControlY = this.$refs.tabControl2.$el.offsetTop
      this.goodsTabY['pop'] = this.goodsTabY['new'] = this.goodsTabY['sell'] = -this.tabControlY
      console.log(this.goodsTabY);
    },
    /**
     * 网络数据请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.result = res.data
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      }).catch(err => {
        console.log(err);
      })
    },

    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
        this.$bus.emit('doneGetHomeData')
      }).catch(err => {
        console.log(err);
      })
    },

    /**
     * 其他
     */
    changeGoodsTab(currentType, newType) {
      if(currentType !== newType && this.$refs.scroll.getScrollY() <= -this.tabControlY) {
        this.isGoodsTabChanged = true;
      }
      this.goodsTabY[currentType] =
              this.$refs.scroll.getScrollY() <= -this.tabControlY
              ? this.$refs.scroll.getScrollY() : -this.tabControlY
      this.current_type = newType;
      this.$bus.on('goodsTabChanged', () => {
        if(this.$refs.scroll.getScrollY() <= -this.tabControlY) {
          this.$refs.scroll.scrollTo(0, this.goodsTabY[this.current_type], 0)
        }
      })
    }

  },
}
</script>

<style lang="less" scoped>
  #home {
    padding-top: 1.375rem;
    height: 100vh;

    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    letter-spacing: .09375rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:10;
  }

  .content {
    position: absolute;
    top: 1.375rem;
    bottom: 1.53125rem;
    left: 0;
    right: 0;
    overflow: hidden;

  }

  .tabtop {
    position: relative;
    z-index: 9;
  }

  .mask {
    position: absolute;
    top: 2.625rem;
    bottom: 1.53125rem;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 1);
    height: calc(100% - 4.15625rem);
    z-index: 9;
  }



</style>
