<template>
  <div id="my">
    <top>
      <div class="title">我的</div>
    </top>
    <div class="content">
      <div class="my-self">孟某某的大名</div>
      <div class="block">
        <div class="lt">所属部门：</div>
        <div class="ls">{{data.department_name}}</div>
      </div>
      <div class="block">
        <div class="lt">当前职位：</div>
        <div class="ls">{{data.job_name}}</div>
      </div>
      <div class="block">
        <div class="lt">联系电话：</div>
        <div class="ls">{{data.tel}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入 api
  import {getMySelf} from 'assets/js/api'
  // mock 数据
  import {mockMy} from 'util/mockData.js'
  
  import Top from 'components/top/top'
  export default {
    components: {
      Top
    },
    data() {
      return {
        data: {}
      }
    },
    created() {
      mockMy()
      this.$http.get(getMySelf, {}).then((response) => {
        if (response.body.err_ok === 0) {
          this.data = response.body.user[0]
          console.log(JSON.stringify(this.data, null, 4))
        }
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #my
    padding 20px
    .my-self
      border 0.5px solid #ccc
      color #5a5a5a
      border-radius 5px
      line-height 100px
      text-align center
      font-size 20px
      height 100px
      margin-bottom 20px
    .block
      display flex
      line-height 40px
      border-bottom 0.5px solid #ccc
      .lt
        flex 0 0 80px
        width 80px
      .ls
        flex 1
</style>

