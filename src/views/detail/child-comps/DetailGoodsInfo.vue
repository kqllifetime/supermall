<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
          :src="item" :key="index" @load="onImageLoaded">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    methods: {
      onImageLoaded() {
        this.$bus.emit('detailImageLoaded')
      }
    },
	}
</script>

<style scoped>
  .goods-info {
    padding: .625rem 0;
    border-bottom: .15625rem solid #f2f5f8;
  }

  .info-desc {
    padding: 0 .46875rem;
  }

  .info-desc .start, .info-desc .end {
    width: 2.8125rem;
    height: .03125rem;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: .15625rem;
    height: .15625rem;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: .46875rem 0;
    font-size: .4375rem;
  }

  .info-key {
    margin: .3125rem 0 .3125rem .46875rem;
    color: #333;
    font-size: .46875rem;
  }

  .info-list img {
    width: 100%;
  }
</style>
