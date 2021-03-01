<template>
  <div>
    <div class="title">商品参数</div>
    <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
      <table v-for="(table, index) in paramInfo.sizes"
            class="info-size" :key="index">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
      <table class="info-param">
        <tr v-for="(info, index) in paramInfo.infos" :key="index">
          <td class="info-param-key">{{info.key}}</td>
          <td class="param-value">{{info.value}}</td>
        </tr>
      </table>
      <div class="info-img" v-if="paramInfo.image.length !== 0">
        <img :src="paramInfo.image" alt="">
      </div>
    </div>  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  paramInfo: {
		    type: Object
      }
    }
	}
</script>

<style scoped>
  .title {
    font-size: .5rem;
    line-height: .9375rem;
    padding: 0 .46875rem;

  }
  .param-info {
    padding: .625rem .46875rem;
    font-size: .40625rem;
    border-bottom: .15625rem solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 1.25rem;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 2.96875rem;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
