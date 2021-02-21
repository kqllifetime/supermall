<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
    <tab-control :title="['流行', '新款', '精选']" v-show="isOnPosition"
                  @tabClick="tabClick" ref="tabControl1" class="tabtop"/>
    <scroll class="content" ref="scroll" :is_pullup_load="{threshold: -50}"
            @scroll="onScroll" @pullingUp="onPullingUp">
      <home-swiper :banner_data="banner" @swiperImageLoad="onSwiperImageLoad"/>
      <home-recommend :recommend_data="recommend"/>
      <home-feature></home-feature>
      <tab-control :title="['流行', '新款', '精选']"
                    @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods_item="showGoods"/>
      <pullup-loading :is_loading_show="is_loading_show" class="pullup"
                      v-show="isShowLoadMore"></pullup-loading>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/nav-bar/NavBar'
import Scroll from '@/components/common/scroll/BScroll'
import TabControl from '@/components/content/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/back-top/BackTop'
import PullupLoading from '@/components/common/scroll/PullupLoading'

import HomeSwiper from './child-comps/HomeSwiper'
import HomeRecommend from './child-comps/HomeRecommend'
import HomeFeature from './child-comps/HomeFeature'

import {getHomeMultidata, getHomeData} from '@/network/home-request'
import {debounce} from '@/common/utils.js'

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
      isBackTopShow: false,
      is_loading_show: false,
      isShowLoadMore: false,
      isOnPosition: false,
      tabControlY: 0,
      positionY: 0
    }
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    PullupLoading,

    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  computed: {
    showGoods() {
      return this.goods[this.current_type].list
    },
  },
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
    // console.log(this.$bus);
    //3.监听图片加载事件
    // console.log("Home mounted");
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    const loadMore = debounce(this.showLoadMore, 50)
    this.$bus.on('itemImageLoaded', () => {
      // console.log('--------');
      loadMore()
      refresh()
    })
  },
  activated() {
    // console.log('Home activated');
    this.$refs.scroll.scrollTo(0, this.positionY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    console.log('Home deactivated');
    this.positionY = this.$refs.scroll.getScrollY()
    // console.log(this.positionY);
  },
  unmounted() {
    console.log('Home destroyed');
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.current_type = 'pop';
          break;
        case 1:
          this.current_type = 'new';
          break;
        case 2:
          this.current_type = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },

    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    onScroll(position) {
      // console.log(position);
      this.isBackTopShow = (-position.y) > 1000
      this.isOnPosition = (-position.y) >= this.tabControlY
    },

    onPullingUp() {
      this.is_loading_show = true;
      this.getHomeData(this.current_type);
      this.$bus.on('doneGetHomeData', () => {
        this.is_loading_show = false;
        this.isShowLoadMore = false;
      })
    },

    onSwiperImageLoad() {

      this.tabControlY = this.$refs.tabControl2.$el.offsetTop
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
    showLoadMore() {
      // console.log('show load more');
      this.isShowLoadMore = true
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
    z-index: 12;
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



</style>
