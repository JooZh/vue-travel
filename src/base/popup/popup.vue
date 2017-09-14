<template>
  <transition enter-active-class="bounceIn" leave-active-class="slideOutUp">
  <div v-if="popupShow" class="popup animated">{{popupMsg}}</div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        popupShow: false,
        popupMsg: ''
      }
    },
    methods: {
      show(string) {
        this.popupShow = true
        this.popupMsg = string
        setTimeout(() => {
          this.popupShow = false
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .popup
    position fixed
    top 0
    left 0
    z-index 100
    background rgba(255, 0, 0, 0.8)
    color #fff
    width 100%
    height 40px
    line-height 40px
    text-align center
    &.animated
      animation-duration: 0.7s
</style>

