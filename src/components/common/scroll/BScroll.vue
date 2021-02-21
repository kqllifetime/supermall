<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  el: 'BScroll',
  props: {
    probe_type: {
      type: Number,
      defualt: 0,
    },
    is_pullup_load: {
      type: [Boolean, Object],
      defualt: true
    }

  },
  data() {
    return {
      bscroll: null,
    }
  },
  mounted() {
    this.initBScroll()
  },
  updated() {
    // this.bscroll.refresh()
  },
  methods: {
    initBScroll() {
      this.bscroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probe_type,
        pullUpLoad: this.is_pullup_load,
        click: true
      })

      this.bscroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      this.is_pullup_load && this.onPullingUp();
    },

    onPullingUp() {
      this.bscroll.on('pullingUp', () => {
      console.log('上拉加载');
      this.$emit('pullingUp')
      })
    },

    refresh() {
      // console.log('BScroll refreshed');
      this.bscroll && this.bscroll.refresh()
    },

    finishPullUp() {
      this.bscroll.finishPullUp()
    },

    getScrollY() {
      return this.bscroll ? this.bscroll.y : 0
    },

    scrollTo(x, y, time=300) {
      this.bscroll && this.bscroll.scrollTo(x, y, time)
    }
  },

}
</script>

<style lang="less" scoped>
</style>
