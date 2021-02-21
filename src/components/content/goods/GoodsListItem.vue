<template>
  <div class="goods-item" @click="itemClick">
    <img :src="list_item.show.img" @load="imageLoad">
    <div class="goods-info">
      <p>{{list_item.title}}</p>
      <span class="price">{{'￥'+ list_item.price}}</span>
      <span class="collect">{{list_item.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  el: 'GoodsListItem',
  props: {
    list_item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad(){
      this.$bus.emit('itemImageLoaded')
    },
    itemClick() {
      this.$router.push('/detail/' + this.list_item.iid)
    }
  },

}
</script>

<style lang="less" scoped>
  .goods-item {
    padding-bottom: 1.25rem;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: .15625rem;
  }

  .goods-info {
    font-size: .375rem;
    position: absolute;
    bottom: .15625rem;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: .09375rem;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: .825rem;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -0.46875rem;
    top: -1px;
    width: .4375rem;
    height: .4375rem;
    background: url("~@/assets/img/common/collect.svg");
    background-size: .4375rem .4375rem;
    background-position: 0 0;
  }

</style>
