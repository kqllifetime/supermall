<template>
  <div >
    <router-view v-slot="{ Component}">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>

</template>
<script>
import MainTabBar from '>components/content/main-tabbar/MainTabBar'


export default {
  name: 'App',
  components: {
    MainTabBar
  },
}
</script>

<style lang="less">
@import '~@/assets/css/base.css';


</style>
