<template>
  <div class="detail">
    <h1>详情页</h1>
    <h2>{{itemid}}</h2>
  </div>
</template>

<script>

export default {
  name: 'Detail',
  data() {
    return {
      itemid: '',
    }
  },
  created() {
    this.itemid = this.$route.params.iid
    console.log('Detail created');
  },
  activated() {
    console.log('Detail activated')
  },
}
</script>

<style lang="less" scoped>

</style>
