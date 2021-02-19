<template>
  <div class="tab-control">
    <div v-for="(item, index) in title" :key="item" @click="itemClick(index)"
      class="tab-control-item" :class="{active: index === currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>

export default {
  el: 'TabControl',
  props: {
    title: {
      type: Array,
      defualt() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
}
</script>

<style lang="less" scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: .4375rem;
    background-color: white;
    .tab-control-item {
      flex: 1;
      height: 1.25rem;
      letter-spacing: .15625rem;
      line-height: 1.25rem;
      span {
        padding: .15625rem 0 .15625rem .15625rem;
      }
    }
    .active {
      color: var(--color-high-text);
      span {
      border-bottom: .09375rem solid var(--color-tint);
      }
    }

  }

</style>
