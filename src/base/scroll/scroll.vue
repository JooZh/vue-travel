<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      dataArray: {
        type: Array,
        default: null
      },
      dataBoolean: {
        type: Boolean,
        default: false
      },
      dataString: {
        type: String,
        default: ''
      }
    },
    mounted() {
      setTimeout(() => {
        console.log('BetterScroll：加载开始')
        this._initScroll()
        console.log('BetterScroll：加载完毕')
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
    // 监听数据变化 重新载入Bs
    watch: {
      dataArray() {
        setTimeout(() => {
          this.refresh()
        }, 20)
        console.log('BetterScroll：重载')
      },
      dataBoolean() {
        if (this.dataBoolean) {
          setTimeout(() => {
            this.refresh()
          }, 20)
          console.log('BetterScroll：重载')
        }
      },
      dataString() {
        setTimeout(() => {
          this.refresh()
        }, 20)
        console.log('BetterScroll：重载')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

