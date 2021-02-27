<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{sellCountFilter(shop.sells)}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailShopInfo",
    props: {
		  shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
    },
    methods: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }

    },
	}
</script>

<style scoped>
  .shop-info {
    padding: .78125rem .25rem;
    border-bottom: .15625rem solid #f2f5f8;
  }

  .shop-top {
    line-height: 1.40625rem;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }

  .shop-top img {
    width: 1.40625rem;
    height: 1.40625rem;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }

  .shop-top .title {
    margin-left: .3125rem;
    vertical-align: center;
  }

  .shop-middle {
    margin-top: .46875rem;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }

  .sells-count, .goods-count {
    font-size: .5625rem;
  }

  .sells-text, .goods-text {
    margin-top: .3125rem;
    font-size: .375rem;
  }

  .shop-middle-right {
    font-size: .40625rem;
    color: #333;
  }

  .shop-middle-right table {
    width: 3.75rem;
    margin-left: .9375rem;
  }

  .shop-middle-right table td {
    padding: .15625rem 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: .3125rem;
  }

  .enter-shop {
    display: inline-block;
    font-size: .4375rem;
    background-color: #f2f5f8;
    width: 4.6875rem;
    height: .9375rem;
    text-align: center;
    line-height: .9375rem;
    border-radius: .3125rem;
  }
</style>
