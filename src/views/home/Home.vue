<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
    <home-swiper :banner_data="banner"/>
    <home-recommend :recommend_data="recommend"/>
    <home-feature></home-feature>
    <tab-control :title="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  class="tab-control"/>
    <goods-list :goods_item="showGoods"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/nav-bar/NavBar'
import TabControl from '@/components/content/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import HomeSwiper from './child-comps/HomeSwiper'
import HomeRecommend from './child-comps/HomeRecommend'
import HomeFeature from './child-comps/HomeFeature'

import {getHomeMultidata, getHomeData} from '@/network/home-request'

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
    }
  },
  components: {
    NavBar,
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
  created() {
    console.log('Home created');
    //1.请求banner和reommend数据
    this.getHomeMultidata();
    //2.请求goods数据
    this.getHomeData('pop');
    this.getHomeData('new');
    this.getHomeData('sell');
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
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      }).catch(err => {
        console.log(err);
      })
    }

  },
}
</script>

<style lang="less" scoped>
#home {
  padding-top: 1.375rem;
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

.tab-control {
  position: -webkit-sticky;
  position: sticky;
  top: 1.375rem;
  z-index: 9;
}
</style>
