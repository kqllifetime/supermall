<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">
        <span>加入</span>
        <span>购物车</span>
      </div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addToCart')
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 1.53125rem;
    background-color: #fff;
    /* position: relative;
    bottom: 1.53125rem; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: .40625rem;
  }

  .bar-left .icon {
    display: block;
    width: .6875rem;
    height: .6875rem;
    margin: .15625rem auto .09375rem;
    background: url("~@/assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -1.6875rem;
  }

  .bar-left .shop {
    background-position:0 -3.0625rem;
  }

  .bar-right {
    font-size: .46875rem;
    color: #fff;
    line-height: 1.40625rem;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
    display: flex;
    flex-flow: column;
  }
  .cart span {
    font-size: .4375rem;
    display:block;
    height: .75rem;
    line-height: .75rem;
    flex: 1;
  }

  .bar-right .buy {
    background-color: #f69;
  }
</style>
