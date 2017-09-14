<template>
  <div id="top">
    <div class="top-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #top
    position fixed
    top 0px
    left 0px
    z-index 5
    width 100%
    height 40px
    background #0f88eb
    .title
      font-size 16px
      line-height 40px
      text-align center
      color #fff
</style>

