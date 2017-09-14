<template>
  <div class="wait">
    <div class="wait-wrapper">
      <section
        v-if="travelData || travelData.length!==0"
        @click="showInfo(index,ty)"
        class="item-wrapper"
        v-for="(item,index) in travelData">
        <div class="item" :class="{'normal':item.state == 5}">
          <div class="item-img">
            <span class="img">{{item.user_name}}</span>
          </div>
          <div class="item-content">
            <div class="title-wrapper">
              <h2 class="title">{{item.user_name}}的出差申请</h2>
              <span class="timer">{{item.create_time}}</span>
            </div>
            <div class="block">
              <span class="lt">出差地点：</span>
              <span class="ls">{{item.reach_add.split(',')[0]}}</span>
            </div>
            <div class="block">
              <span class="lt">开始时间：</span>
              <span class="ls">{{item.start}}</span>
            </div>
            <div class="block">
              <span class="lt">结束时间：</span>
              <span class="ls">{{item.end}}</span>
            </div>
            <div class="info">
              <p v-if="item.state == 3" class="success">审批通过</p>
              <p v-if="item.state < 3" class="waited">等待审批</p>
              <p v-if="item.state == 4" class="closed">拒绝审批</p>
              <p v-if="item.state == 5" class="closed">已撤销</p>
            </div>
          </div>
        </div>
        <hr class="border-1px">
      </section>
      <div class="no-data" v-if="!travelData || travelData.length === 0">暂无数据</div>
    </div>
    <Travelinfo ref="travelinfo" :travelData="travelData"></Travelinfo>
  </div>
</template>
<script type="text/ecmascript-6">
  // 引入 api
  import {getMywait} from 'assets/js/api'
  // mock 数据
  import {mockMyTravel} from 'util/mockData.js'
  
  import Travelinfo from 'components/travelInfo/TravelInfo'
  export default {
    created() {
      // mock数据
      mockMyTravel()
      // 获取数据
      this.$http.get(getMywait, {}).then((response) => {
        if (response.body.err_ok === 0) {
          this.travelData = response.body.travelInfo
          // console.log(JSON.stringify(this.travelData, null, 4))
        }
//        if (response.body.err_ok === 0) {
//          let arr = response.body.travelInfo
//          let newArr = []
//          arr.forEach((value) => {
//            newArr.push(value[0])
//          })
//          this.travelData = newArr
//          console.log(JSON.stringify(this.travelData, null, 4))
//        }
      })
    },
    components: {
      Travelinfo
    },
    data() {
      return {
        ty: 2,
        travelData: [],
        nowName: {}
      }
    },
    methods: {
      showInfo(index, ty) {
        this.$refs.travelinfo.show(index, ty)
      },
      refresh() {
        this.$http.get(getMywait, {}).then((response) => {
          if (response.body.err_ok === 0) {
            let arr = response.body.travelInfo
            let newArr = []
            arr.forEach((value) => {
              newArr.push(value[0])
            })
            this.travelData = newArr
            // console.log(JSON.stringify(this.travelData, null, 4))
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/styl/mixin.styl"
  .wait
    .wait-wrapper
      .border-1px
        border-1px(#e5e5e5)
      .item-wrapper
        .item
          padding 15px
          display flex
          .item-img
            flex 0, 0, 50px
            width 50px
            .img
              display block
              width 40px
              height 40px
              line-height 40px
              background #EE7942
              border-radius 50%
              font-size 12px
              text-align center
              color #fff
          .item-content
            flex 1
            .title-wrapper
              display flex
              padding-bottom 5px
              .title
                flex 1
                font-size 16px
                line-height 30px
              .timer
                display flex
                flex 0, 0, 80px
                text-align right
                color #999
                width 80px
                padding-top 5px
                font-size 10px
            .block
              display flex
              font-size 12px
              line-height 15px
              color #888
              .lt
                flex 0 0 60px
              .ls
                flex 1
            .info
              line-height 25px
              font-size 14px
              .success
                color #5cb85c
              .waited
                color #f0ad4e
              .closed
                color #d9534f
    .no-data
      line-height 40px
      text-align center
      font-size 16px
      color #999999
      background #f0f0f0
</style>

