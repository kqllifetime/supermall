import {debounce} from './utils'

export const itemListenerMixIn = {
  data() {
    return {
      imgLoadListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    console.log('itemListener mixin');
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.imgLoadListener = () => { this.newRefresh }
    this.$bus.on('itemImageLoaded', this.imgLoadListener)
  },
}


export const loadMoreMixIn = {
  // <pullup-loading :is_loading_show="is_loading_show"
  // v-show="isShowLoadMore"/>

  data() {
    return {
      is_loading_show: false,
      isShowLoadMore: false,
      loadMoreListener: null
    }
  },
  mounted() {
    console.log('loadMore mixin');
    const showLoadMore = debounce(() => {
      this.isShowLoadMore = true
    }, 50)
    this.loadMoreListener = () => { showLoadMore() }
    this.$bus.on('itemImageLoaded', this.loadMoreListener)
  },
  methods: {
    loadMoreLoading() {
      this.is_loading_show = true
    },
    loadMoreDone() {
      this.is_loading_show = false;
      this.isShowLoadMore = false;
    }
  },
}
