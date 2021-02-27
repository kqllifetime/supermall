<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{showDate(commentInfo.created)}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "@/common/utils";

  export default {
		name: "DetailCommentInfo",
    props: {
		  commentInfo: {
        type: Object,
        default() {
          return { }
        }
      }
    },
    methods: {
		  showDate: function (value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
	}
</script>

<style scoped>
  .comment-info {
    padding: .15625rem .375rem;
    color: #333;
    border-bottom: .15625rem solid #f2f5f8;
  }

  .info-header {
    height: 1.5625rem;
    line-height: 1.5625rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: .46875rem;
  }

  .header-more {
    float: right;
    margin-right: .3125rem;
    font-size: .40625rem;
  }

  .info-user {
    padding: .3125rem 0 .15625rem;
  }

  .info-user img {
    width: 1.3125rem;
    height: 1.3125rem;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: .46875rem;
    top: -0.46875rem;
    margin-left: .3125rem;
  }

  .info-detail {
    padding: 0 .15625rem .46875rem;
  }

  .info-detail p {
    font-size: .4375rem;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: .375rem;
    color: #999;
    margin-top: .3125rem;
  }

  .info-other .date {
    margin-right: .25rem;
  }

  .info-imgs {
    margin-top: .3125rem;
  }

  .info-imgs img {
    width: 2.1875rem;
    height: 2.1875rem;
    margin-right: .15625rem;
  }
</style>
