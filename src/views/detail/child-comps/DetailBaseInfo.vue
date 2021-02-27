<template>
  <div v-if="isShow" class="base-info">
    <div class="info-title" v-if="goods.title">{{goods.title}}</div>
    <div class="info-price" v-if="goods.newPrice">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other" v-if="isColumnsShow">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span v-if="isServicesShow">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service" v-if="isServicesShow">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img src="@/assets/img/common/service-icon.png" alt=""
              v-if="!goods.services[index-1].icon">
        <img :src="goods.services[index-1].icon" v-else>
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
		  goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      isShow() {
        return Object.keys(this.goods).length !== 0
      },
      isServicesShow() {
        return this.goods.services.length !== 0
      },
      isColumnsShow() {
        return this.goods.columns.length !==0
      },
    },
    created() {
    },
    filters: {
    },
    methods: {
    },
	}
</script>

<style scoped>
  .base-info {
    margin-top: .46875rem;
    padding: 0 .25rem;
    color: #999;
    border-bottom: .15625rem solid #f2f5f8;
    font-size: .4375rem;
  }

  .info-title {
    color: #222
  }

  .info-price {
    margin-top: .3125rem;
  }

  .info-price .n-price {
    font-size: .75rem;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: .40625rem;
    margin-left: .15625rem;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: .375rem;
    padding: .0625rem .15625rem;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: .25rem;
    margin-left: .15625rem;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -0.25rem;
  }

  .info-other {
    margin-top: .46875rem;
    line-height: .9375rem;
    display: flex;
    font-size: .40625rem;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    line-height: 1.25rem;
  }

  .info-service-item img {
    width: .4375rem;
    height: .4375rem;
    position: relative;
    top: .0625rem;
  }

  .info-service-item span {
    font-size: .375rem;
    color: #333;
  }
</style>
