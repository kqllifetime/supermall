<template>
  <div class="">
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in images"
                :key="index">
        <img :src="item" alt="" @load="swiperImageLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    images: {
      type: Array,
      defult() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false,
    }
  },
  components: {
    Swiper,
    SwiperItem,
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

<style lang="less" scoped>
  .detail-swiper {
    height: 9.375rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
</style>
