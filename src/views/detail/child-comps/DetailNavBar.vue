<template>
  <div class="">
    <nav-bar class="detail-nav">
      <template #left>
        <div @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center >
        <div class="detail-nav-center">
          <div v-for="(item, index) in navTab" :key="item" class="detail-nav-tab"
               :class="{active: index === currentIndex}" @click="itemClick(index)">
          {{item}}
          </div>
        </div>
      </template>
    </nav-bar>

  </div>
</template>

<script>
import NavBar from '@/components/common/nav-bar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      navTab: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('topTabClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
  .detail-nav {
    img {
      height: .78125rem;
      vertical-align: middle;
    }
    .detail-nav-center {
      display: flex;
      .detail-nav-tab {
        flex: 1;
      }
      .active {
        color: var(--color-high-text);
      }
    }
  }
</style>
