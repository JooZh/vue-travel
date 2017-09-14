<template>
  <div id="tab">
    <router-link tag="div" class="tab-item" to="/travel">
      <div class="tab-icon">
        <i class="icon-airplane"></i>
      </div>
      <div class="tab-link">出差</div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/approval">
      <div class="tab-icon">
        <i class="icon-pencil"></i>
      </div>
      <div class="tab-link">审批</div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/my">
      <div class="tab-icon">
        <i class="icon-user"></i>
      </div>
      <div class="tab-link">我的</div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #tab
    display flex
    position fixed
    bottom 0px
    left 0px
    z-index 5
    width 100%
    height 60px
    background #f2f2f2
    text-align center
    .tab-item
      flex 1
      &.router-link-active
        .tab-icon
          i
            color #0f88eb
        .tab-link
          color #0f88eb
      .tab-icon
        margin 8px auto
        border-radius 10px
        font-size 22px
        line-height 22px
        i
          color #798798
      .tab-link
        font-size 12px
        line-height 12px
        color #656565
</style>

