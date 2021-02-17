<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="#37a2da">
        <template #icon><img src="@/assets/img/home.svg" alt=""></template>
        <template #icon-active><img src="@/assets/img/home_active.svg" alt=""></template>
        <template #text><div>首页</div></template>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#37a2da">
        <template #icon><img src="@/assets/img/category.svg" alt=""></template>
        <template #icon-active><img src="@/assets/img/category_active.svg" alt=""></template>
        <template #text><div>分类</div></template>
      </tab-bar-item>
      <tab-bar-item path="/shopcart" activeColor="#37a2da">
        <template #icon><img src="@/assets/img/shop-cart.svg" alt=""></template>
        <template #icon-active><img src="@/assets/img/shop-cart_active.svg" alt=""></template>
        <template #text><div>购物车</div></template>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#37a2da">
        <template #icon><img src="@/assets/img/profile.svg" alt=""></template>
        <template #icon-active><img src="@/assets/img/profile_active.svg" alt=""></template>
        <template #text><div>我的</div></template>
      </tab-bar-item>
    </tab-bar>
  </div>

</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'


export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  }

}
</script>

<style scoped>
  img {
        margin-top: .09375rem;
        margin-bottom: .0625rem;
        width: .75rem;
        height: .75rem;
        vertical-align: middle;
      }
</style>
