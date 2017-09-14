<template>
  <transition enter-active-class="slideInRight" leave-active-class="slideOutLeft">
    <scroll ref="scroll" v-show="showNum" class="travel-info animated" :dataArray="spData">
      <div class="in-box">
        <div class="item-avatar">
          <div class="avatar-img">
            <span class="img" v-text="nowData.user_name?nowData.user_name:'孟某某'"></span>
          </div>
          <div class="avatar-state">
            <h3 class="name" v-text="nowData.user_name?nowData.user_name:'孟某某'"></h3>
            <div v-if="nowData.state == 3" class="state success">审核通过</div>
            <div v-if="nowData.state < 3" class="state waited">等待审核</div>
            <div v-if="nowData.state == 4" class="state refuse">拒绝审批</div>
            <div v-if="nowData.state == 5" class="state">已撤销</div>
          </div>
        </div>
        <div class="item-info">
          <div class="block">
            <span class="lt">审批编号：</span>
            <span class="ls">20173456575756</span>
          </div>
          <div class="block">
          <span class="lt">出发地：</span>
          <span class="ls">{{nowData.leave_add}}</span>
          </div>
          <div class="block" v-for="(v,i) in nowData.reach_add.split(',')">
            <span class="lt">出差地<span v-if="nowData.reach_add.length>1">{{i + 1}}</span>：</span>
            <span class="ls">{{v}}</span>
          </div>
          <div class="block">
            <span class="lt">开始时间：</span>
            <span class="ls">{{nowData.start}}</span>
          </div>
          <div class="block">
            <span class="lt">结束时间：</span>
            <span class="ls">{{nowData.end}}</span>
          </div>
          <div class="block">
            <span class="lt">时长(天)：</span>
            <span class="ls">{{nowData.time}}</span>
          </div>
          <div class="block">
            <span class="lt">协同人员：</span>
            <span class="ls">
              <span v-for="(value,index) in nowData.reader.split(',')">{{value}}
                <span v-if="index!==nowData.reader.length-1">, </span></span>
            </span>
          </div>
          <div class="block">
            <span class="lt">出差事由：</span>
            <span class="ls">{{nowData.reason}}</span>
          </div>
          <div class="block">
            <span class="lt">出行方式：</span>
            <span class="ls">{{nowData.traffic}}</span>
          </div>
        </div>
        <div class="item-approval">
          <section class="approval">
            <div class="list">
              <div class="title">
                <div class="img ues" v-text="nowData.user_name?nowData.user_name:'孟某某'"></div>
              </div>
              <div class="text">
                <div class="to">发起申请</div>
                <div class="timer" v-text="time(nowData.create_time)"></div>
              </div>
            </div>
            <div class="line"><span></span></div>
          </section>
          <section v-if="index+1 <= nowData.step" class="approval" v-for="(item,index) in spList">
            <div class="list">
              <div class="title">
                <div class="img" :class="{
                    'ok': name.state == 3,
                    'error': name.state == 4,
                    'next': name.state == 2,
                    'lok': name.state == 1 || nowData.state == 5 ,
                    'default': name.state == 0
                    }"
                     v-for="name in item">
                  <span class="name">{{name.user_name}}</span>
                  <span class="state" v-if="name.state != 1 || nowData.state != 5">
                    <i v-if="name.state == 4" class="icon-cross"></i>
                    <i v-if="name.state == 3" class="icon-checkmark"></i>
                    <i v-if="name.state == 2" class="icon-near_me"></i>
                    <i v-if="name.state == 0 && name.type == 2" class="icon-checkmark2"></i>
                    <i v-if="name.state == 0 && name.type == 1" class="icon-help"></i>
                  </span>
                </div>
              </div>
              <div class="text" v-if="nowData.state != 5">
                <div class="to success" v-if="spState(item) == 2 && nowData.state != 5">审批通过</div>
                <div class="to waited" v-if="spState(item) == 1 && nowData.state != 5">等待审批</div>
                <div class="to refuse" v-if="spState(item) == 3 && nowData.state != 5">审批拒绝</div>
                <div class="timer" v-text="time(nowData.update_time)"></div>
                <div class="timer">已等待33分钟</div>
              </div>
            </div>
            <div v-if="index!==spList.length-1 && index+1 < nowData.step" class="line"><span></span></div>
          </section>
          <section class="approval" v-if="nowData.state > 2">
            <div class="line"><span></span></div>
            <div class="list">
              <div class="title">
                <div class="img ues" v-if="nowData.state == 5">撤销</div>
                <div class="img ues" v-if="nowData.state == 3">成功</div>
                <div class="img ues" v-if="nowData.state == 4">未通过</div>
              </div>
              <div class="text">
                <div class="to">结束审批</div>
                <div class="timer" v-text="time(nowData.create_time)"></div>
              </div>
            </div>
          </section>
        </div>
        <div class="item-copy">
          <div class="title">抄送人 <span>审批通过后通知抄送人</span></div>
          <div class="cc-content">
            <div class="cc-name" v-for="v in nowData.accompany.split(',')">
              <div class="img">{{v}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hd">
        <div class="closed" @click="showNum=false">
          <i class="icon icon-navigate_before"></i>
          <span class="back">返回</span>
        </div>
        <div class="title" v-if="ty===1">我的出差申请</div>
        <div class="title" v-if="ty===2">等待我审批的</div>
        <div class="title" v-if="ty===3">抄送给我的</div>
      </div>
      <div class="ft" v-if="ty===1">
        <div v-if="nowData.state != 5" class="button" @click="deleteEvection(0)">
          <span>撤销</span>
        </div>
        <div v-if="nowData.state == 5" class="button yes">
          <span>已撤销</span>
        </div>
      </div>
      <div class="ft" v-if="ty===2">
        <div class="button" @click="deleteEvection(1)">
          <span>同意</span>
        </div>
        <div class="button" @click="deleteEvection(2)">
          <span>拒绝</span>
        </div>
        <div class="button" @click="deleteEvection(3)">
          <span>转交</span>
        </div>
      </div>
      <alert-ok ref="alert" @post="postTrue"></alert-ok>
    </scroll>
  </transition>
</template>

<script type="text/ecmascript-6">
  // 引入 api
  import {getMySpInfo, postEvection, postYesOrNo} from 'assets/js/api'
  // mock 数据
  import {mockMySpInfo} from 'util/mockData.js'
  
  import Scroll from 'base/scroll/scroll'
  import AlertOk from 'base/alertOk/alertOk'
  export default {
    created() {
      mockMySpInfo()
    },
    components: {
      Scroll,
      AlertOk
    },
    props: {
      travelData: {
        type: Array
      }
    },
    data() {
      return {
        showNum: false,
        nowData: {},
        spData: [],
        ty: 0,
        post: false
      }
    },
    computed: {
      // 审批人分组
      spList() {
        let maxArr = []
        // 取得最大的步数值
        this.spData.forEach((value) => {
          maxArr.push(value.step)
        })
        let max = maxArr[0]
        for (let i = 0; i < maxArr.length; i++) {
          if (max < maxArr[i]) {
            max = maxArr[i]
          }
        }
        // 分组后的数据
        let data = []
        for (let i = 1; i <= max; i++) {
          data.push([])
          this.spData.forEach((value) => {
            if (parseInt(value.step) === i) {
              data[i - 1].push(value)
            }
          })
        }
        // console.log(JSON.stringify(data[0], null, 4))
        return data
      }
    },
    methods: {
      show(index, ty) {
        this.ty = ty
        this.nowData = this.travelData[index]
        // console.log(JSON.stringify(this.nowData, null, 4))
        // 获取审批人信息
        this.$http.post(getMySpInfo, {
          'evection_id': this.nowData.evection_id
        }, {
          emulateJSON: true
        }).then((response) => {
          if (response.body.spInfo) {
            this.spData = response.body.spInfo
          } else {
            let arr = {}
            arr.spInfo = response.body
            this.spData = response.body.spInfo
          }
          // console.log(JSON.stringify(response.body.spInfo, null, 4))
        })
        this.showNum = !this.showNum
        this.$refs.scroll.refresh()
      },
      time(time) {
        return time.substr(0, 16)
      },
      // 审批组状态判断
      spState(item) {
        // console.log(JSON.stringify(item, null, 4))
        let state = []
        let type = 0
        // 取得当前人员状态数组
        item.forEach((value) => {
          type = parseInt(value.type)
          state.push(parseInt(value.state))
        })
        // 获取最大的数字
        let max = Math.max.apply(Math, state)
        // console.log(typeof max)
        // 取得最小的数字
        let min = Math.min.apply(Math, state)
        // console.log(state)
        // 判断是否有拒绝项 有即为审核失败
        if (max === 4) {
          return 3
        }
        // 判断成功
        if (type === 1) {
          if (max === 3) {
            return 2
          }
        } else if (type === 2) {
          if (min === 3) {
            return 2
          }
        }
        // 判断是否有未审核项 有即为待审
        if (min < 3) {
          return 1
        }
      },
      deleteEvection(i) {
        this.$refs.alert.show(i)
      },
      postTrue(data) {
        if (data === 0) {
          this.$http.post(postEvection, {
            'evection_id': this.nowData.evection_id
          }, {
            emulateJSON: true
          }).then((response) => {
            if (response.body) {
              this.showNum = !this.showNum
              this.$emit('refresh')
            }
          })
        }
        if (data === 1 || data === 2) {
          let state = 0
          if (data === 1) {
            state = 3
          }
          if (data === 2) {
            state = 4
          }
          this.$http.post(postYesOrNo, {
            'state': state,
            'evection_id': this.nowData.evection_id
          }, {
            emulateJSON: true
          }).then((response) => {
            if (response.body) {
              this.showNum = !this.showNum
              this.$emit('refresh')
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./travelInfo.styl"
</style>

