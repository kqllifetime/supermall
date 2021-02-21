<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="item in banner_data" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" @load="swiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  el: 'HomeSwiper',
  props: {
    banner_data: {
      type: Array,
      default() {
        return []
      },
    }
  },
  data() {
    return {
      isLoad: false,
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImageLoad() {
     if(!this.isLoad) {
      this.$emit('swiperImageLoad')
      this.isLoad = true
     }
    }
  },

}
</script>

<style scoped>
  .home-swiper img {
      width: 100%;
    }
</style>
