<template>
  <div>
    <nav-bar class="home-nav"><template #center>购物街</template></nav-bar>
    <home-swiper :banner_data="banner"/>
    <home-recommend :recommend_data="recommend"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/nav-bar/NavBar'
import HomeSwiper from './child-comps/HomeSwiper'
import HomeRecommend from './child-comps/HomeRecommend'
import HomeFeature from './child-comps/HomeFeature'

import {getHomeMultidata} from '@/network/home-request'

export default {
  name: 'Home',
  data() {
    return {
      result: null,
      banner: [],
      recommend: [],
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
  },
  created() {
    console.log('Home created');
    getHomeMultidata().then(res => {
      this.result = res.data
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
      console.log(this.recommend);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
  letter-spacing: .09375rem;
}
</style>
