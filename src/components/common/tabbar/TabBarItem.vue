<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" class="slot"><slot name="icon"></slot></div>
    <div v-else class="slot"><slot name="icon-active"></slot></div>
    <div :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      if(!this.isActive){
        this.$router.push(this.path)
      }
    }

  },
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 1.375rem;
    text-align: center;
    font-size: .375rem;
  }

</style>
