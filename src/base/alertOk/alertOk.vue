<template>
  <div v-if="showData" class="alert-ok">
    <div class="alert">
      <div class="title" v-text="type_sell[button]"></div>
      <div class="content">
        <div class="ok" @click="postTrue">确定</div>
        <div class="no" @click="show">取消</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const TYPE_SELL = ['是否撤销申请', '是否同意申请', '是否拒绝申请', '是否转交审核']
  export default {
    props: {},
    data() {
      return {
        showData: false,
        button: 0,
        type_sell: TYPE_SELL
      }
    },
    methods: {
      show(i) {
        this.button = i
        this.showData = !this.showData
      },
      postTrue() {
        this.$emit('post', this.button)
        this.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .alert-ok
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 999
    background rgba(0, 0, 0, 0.5)
    display flex
    justify-content center
    align-items center
    .alert
      width 200px
      background #fff
      border-radius 10px
      .title
        line-height 45px
        text-align center
        border-bottom 0.5px solid #ccc
      .content
        display flex
        text-align center
        div
          flex 1
          line-height 40px
          &.ok
            border-right 0.5px solid #ccc

</style>

