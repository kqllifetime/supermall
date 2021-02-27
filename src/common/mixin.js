import {debounce} from './utils'

export const itemListenerMixIn = {
  data() {
    return {
      imgLoadListener: null
    }
  },
  mounted() {
    console.log('mixin');
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.imgLoadListener = () => { refresh() }
    this.$bus.on('itemImageLoaded', this.imgLoadListener)
  },
}
