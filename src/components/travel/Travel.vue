<template>
  <div class="travel">
    <top><div class="title">出差</div></top>
    <div class="travel-wrapper">
      <div class="items-wrapper">
        <div class="item-title">
          <span><i class="icon-star-empty"></i> 行程明细表 </span>
        </div>
        <section class="item-content">
          <div class="item input textLeft">
            <span class="title">出发地</span>
            <input class="content" type="text" placeholder="添加出发地点 (可为空)" v-model="myAddress">
            <span class="icon icon-checkmark2" :class="isEnter(myAddress)"></span>
          </div>
          <hr class="border-1px">
          <div v-for="(dress,i) in goAddress" class="goDress">
            <div class="item input textLeft">
              <span class="title">出差地 <span v-if="goAddress.length>1">{{i + 1}}</span></span>
              <input class="content" type="text" placeholder="添加出差地点" v-model="goAddress[i]">
              <span @click="delGoAddress(i)"
                    class="icon"
                    :class="{
                    'icon-checkmark':i===0 ||goAddress[i],
                    'icon-cross':i!==0&&!goAddress[i],
                    'active':isEnter(goAddress[i])}">
              </span>
            </div>
            <hr class="border-1px">
          </div>
          <div class="content-add" @click="goAddress.push('')"><span class="icon-plus"></span> 添加下一个出差地点</div>
          <hr class="border-1px">
          <div class="item input textRight">
            <span class="title">开始时间</span>
            <input class="content" readonly @click.prevent="openPicker('star')" type="text" placeholder="选择出发时间(含当天)"
                   v-model="starDate">
            <span class="icon icon-checkmark" :class="isEnter(starDate)"></span>
          </div>
          <hr class="border-1px">
          <div class="item input textRight">
            <span class="title">结束时间</span>
            <input class="content" readonly @click.prevent="openPicker('end')" type="text" placeholder="选择结束时间(含当天)"
                   v-model="endDate">
            <span class="icon icon-checkmark" :class="isEnter(endDate)"></span>
          </div>
          <hr class="border-1px">
          <div class="item input textLeft">
            <span class="title">时长(天)</span>
            <input readonly class="content" type="text" placeholder="0" v-model="dateLong">
          </div>
          <mt-datetime-picker @confirm="handleConfirm" ref="picker" type="date" v-model="pickerValue">
          </mt-datetime-picker>
          <hr class="border-1px">
        </section>
      </div>
      <div class="items-wrapper">
        <div class="item-title">
          <span><i class="icon-star-empty"></i> 事由明细表</span>
        </div>
        <section class="item-content">
          <div class="item input">
            <span class="title">陪同人员</span>
            <input v-model="escortNameCpdName" @click.prevent="openUser" class="content" type="text"
                   placeholder="选填"
                   readonly>
            <span class="icon icon-checkmark2" :class="isEnter(escortName.length)"></span>
          </div>
          <hr class="border-1px">
          <div class="item text-area">
            <span class="title">出差事由</span>
            <div class="content">
              <textarea v-model="brief" maxlength="150" class="text" type="text" placeholder="简要描述"></textarea>
              <div class="text-length">{{brief.length}}/150</div>
            </div>
            <span class="icon icon-checkmark" :class="isEnter(brief)"></span>
          </div>
        </section>
      </div>
      <div class="items-wrapper">
        <div class="item-title">
          <span><i class="icon-star-empty"></i> 交通明细表</span>
        </div>
        <section class="item-content">
          <div class="item input">
            <span class="title">出行方式</span>
            <input v-model="selectTrip" class="content" @click.prevent="openSelectTrip" type="text" placeholder="必选"
                   readonly>
            <span class="icon icon-checkmark" :class="isEnter(selectTrip)"></span>
          </div>
          <hr class="border-1px">
          <div class="item input">
            <span class="title">经费预算</span>
            <input class="content" type="number" placeholder="出差经费预算" v-model="rmb">
            <span class="icon icon-checkmark2" :class="isEnter(rmb)"></span>
          </div>
        </section>
      </div>
      <div class="items-wrapper">
        <div class="item-title">
          <span><i class="icon-star-empty"></i> 审批与抄送</span>
        </div>
        <section class="item-content">
          <div class="item select">
            <p class="title">
              <span class="in">审批人</span>
              <span class="icon icon-checkmark" :class="isEnter(spName[0].length)"></span>
            </p>
            <section class="sp-wrapper">
              <div v-for="(name,i1) in spName" class="sp-content">
                <div class="sp-content-ti">
                  <span class="ti">
                    <span>审核人员</span>
                    <span v-if="spName.length>1">{{i1 + 1}}</span>
                  </span>
                  <span class="icon-arrow-bold-down"></span>
                </div>
                <div class="sp-content-in">
                  <div class="add-po animated" v-if="spName[i1].length===0">
                    <div @click="openSp(i1,0,0,1)" class="member member-f">
                      <p class="name plus"><span class="icon-list-numbered"></span></p>
                      <p class="job">任意单人同意</p>
                    </div>
                    <div @click="openSp(i1,0,0,2)" class="member member-f">
                      <p class="name plus"><span class="icon-tree"></span></p>
                      <p class="job">多人同时同意</p>
                    </div>
                  </div>
                  <div class="add-po" v-if="spName[i1].length>0">
                    <div v-if="name.length!==0" class="member" @click="openSp(i1,i2,0)" v-for="(item,i2) in name">
                      <p class="name" :class="{'bg1':spNameList[i1] ===1,'bg2':spNameList[i1]===2}">
                        {{item.user_name}}</p>
                      <p class="job">{{item.job_name}}</p>
                    </div>
                    <div @click="openSp(i1,0,-1)" class="member">
                      <p class="name plus"><span class="icon-plus"></span></p>
                      <p class="job">添加</p>
                    </div>
                  </div>
                  <div v-show="i1!==0" @click="spliceSp(i1)" class="sp-cross"><span
                    class="icon-cross"></span></div>
                </div>
              </div>
              <hr class="border-1px">
              <div class="content-add" @click="spName.push([])"><span class="icon-plus"></span> 添加审批人</div>
            </section>
          </div>
          <div class="notice">
            <p><span class="icon-star-full"></span> 点击头像可以删除审批人</p>
          </div>
          <div class="item select">
            <p class="title">
              <span class="in">抄送人</span>
              <span class="icon icon-checkmark2" :class="isEnter(ccName.length)"></span>
            </p>
            <section class="member-wrapper">
              <div v-if="ccName.length!==0" class="member" @click="openCC(key)" v-for="(value,key) in ccName">
                <p class="name">{{value.user_name}}</p>
                <p class="job">{{value.job_name}}</p>
              </div>
              <div class="member" @click="openCC(-1)">
                <p class="name plus"><span class="icon-plus"></span></p>
                <p class="job">添加</p>
              </div>
            </section>
            <div class="notice height"><span class="icon-star-full"></span> 审批通过后，抄送给通知人</div>
          </div>
        </section>
      </div>
      <div class="items-wrapper">
        <div class="button-box">
          <a class="button" @click="sendInspect()">提交申请</a>
        </div>
      </div>
    </div>
    <div class="allInfo" v-show="allDis">
      <h2>请确认以下信息</h2>
      <div class="allInfo-content">
        <scroll class="list-box" :dataBoolean="allDis">
          <ul>
            <li class="list" v-if="myAddress">
              <div class="list-title">出发地：</div>
              <div class="list-text">{{myAddress}}</div>
            </li>
            <hr v-if="myAddress" class="border-1px">
            <li class="list" v-for="(value,index) in clearGoAdderss">
              <div class="list-title">目的地 <span v-if="clearGoAdderss.length>1">{{index + 1}}</span>：</div>
              <div class="list-text">{{value}}</div>
            </li>
            <hr class="border-1px">
            <li class="list">
              <div class="list-title">开始时间：</div>
              <div class="list-text">{{starDate}}</div>
            </li>
            <hr class="border-1px">
            <li class="list">
              <div class="list-title">结束时间：</div>
              <div class="list-text">{{endDate}}</div>
            </li>
            <hr class="border-1px">
            <li class="list">
              <div class="list-title">时长(天)：</div>
              <div class="list-text">{{dateLong}}</div>
            </li>
            <hr class="border-1px">
            <li class="list" v-if="escortNameCpdName.length">
              <div class="list-title">陪同人员：</div>
              <div class="list-text">
                <span v-for="(value,index) in escortNameCpdName">
                  {{value}}<span v-if="index!==escortName.length-1">, </span>
                </span>
              </div>
            </li>
            <hr class="border-1px">
            <li class="list">
              <div class="list-title">出差事由：</div>
              <div class="list-text">{{brief}}</div>
            </li>
            <hr class="border-1px">
            <li class="list">
              <div class="list-title">出行方式：</div>
              <div class="list-text">{{selectTrip}}</div>
            </li>
            <hr class="border-1px">
            <li class="list" v-if="rmb">
              <div class="list-title">经费预算：</div>
              <div class="list-text">{{rmb}} 元</div>
            </li>
            <hr class="border-1px">
            <li class="list" v-for="(value,index1) in spName">
              <div class="list-title">审批人<span v-if="spName.length>1">{{index1 + 1}}</span>：</div>
              <div class="list-text">
                <span v-for="(name,index2) in value">
                  {{name.user_name}}<span v-if="index2!==value.length-1">, </span>
                </span>
              </div>
            </li>
            <hr class="border-1px">
            <li class="list" v-if="ccName.length">
              <div class="list-title">抄送人：</div>
              <div class="list-text">
                  <span v-for="(value,index) in ccName">
                    {{value.user_name}}<span v-if="index!==ccName.length-1">, </span></span>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="sendBox">
        <div class="button send-button"><a @click="postData">提交</a></div>
        <div class="button back-button"><a @click="allDis=false">修改</a></div>
      </div>
    </div>
    <popup ref="popup"></popup>
    <trip-mode ref="trip" :tripData="tripData" @selectTrip="selectTripFuc"></trip-mode>
    <member-list :userTitle="userTitle" :userData="userData" :sendData="sendData" ref="memberlist"
                 @selectName="selectNameFuc"></member-list>
    <loading v-if="loading" ref="loading"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入 api
  import {getUser, getTrip, postTravel} from 'assets/js/api'
  // mock 数据
  import {mockUser, mockTrip} from 'util/mockData.js'
  // 组件
  import Top from 'components/top/top'
  import Popup from 'base/popup/popup'
  import Loading from 'base/loading/Loading'
  import Scroll from 'base/scroll/scroll'
  import MemberList from 'components/memberList/MemberList'
  import TripMode from 'components/tripMode/TripMode'
  export default {
    components: {
      Top,
      Popup,
      MemberList,
      TripMode,
      Loading,
      Scroll
    },
    data() {
      return {
        // 控制数据
        allDis: false,
        loading: false,           // loading 加载
        pickerValue: new Date(),  // 初始化时间
        whoClick: '',             // 判断点击的是开始还是结束时间
        sendData: [],             // 保存当前的陪同人员或者是抄送
        userData: {},             // GET 到的用户数据
        userType: 0,              // 谁打开的选择框
        userTitle: '',            // user 标题
        tripData: '',             // 获取到的出行方式
        spNum: 0,                 // 当前选择的审核人员的组
        spType: 0,                // 当前选择的类型
        // 提交的数据
        starDate: '',             // 开始时间
        endDate: '',              // 结束时间
        myAddress: '',            // 我的地址
        goAddress: [''],          // 出差地址
        escortName: [],           // 选择的陪同人对象
        ccName: [],               // 选择的抄送人员
        spName: [[]],             // 选择的审核人员
        spNameList: [],
        brief: '',                // 简介
        selectTrip: '',           // 出行方式
        rmb: ''                   // 经费预算
      }
    },
    created() {
      // mock数据
      mockUser()
      mockTrip()
      // 获取数据
      this.$http.get(getUser, {}).then((response) => {
        if (response.body.peoples) {
          this.userData = response.body.peoples
        } else {
          let arr = {}
          arr.peoples = response.body
          this.userData = response.body.peoples
        }
        // console.log(JSON.stringify(response.body, null, 4))
      })
      this.$http.get(getTrip, {}).then((response) => {
        let data = response.body.items
        let arr = []
        data.forEach((value) => {
          arr.push(value.traffic_name)
        })
        this.tripData = arr
        // console.log(this.tripData)
      })
    },
    computed: {
      escortNameCpdName() {
        let arr = []
        this.escortName.forEach((value) => {
          arr.push(value.user_name)
        })
        return arr
      },
      // 发送出去的陪同人员ID
      escortNameCpdId() {
        let arr = []
        this.escortName.forEach((value) => {
          arr.push(value.user_id)
        })
        return arr
      },
      // 发送出去的抄送人id
      ccNameCpdId() {
        let arr = []
        this.ccName.forEach((value) => {
          arr.push(value.user_id)
        })
        return arr
      },
      // 发送出去的抄送人Name
      ccNameCpdName() {
        let arr = []
        this.ccName.forEach((value) => {
          arr.push(value.user_name)
        })
        return arr
      },
      // 清理掉空白的木目的
      clearGoAdderss() {
        let arr = []
        this.goAddress.forEach((value) => {
          if (value) {
            arr.push(value)
          }
        })
        return arr
      },
      // 发送数据spName处理
      spNameIdArray () {
        let arr = []
        let inId = []
        let inName = []
        this.spName.forEach((value, index) => {
          arr.push([])
          arr[index].push(this.spNameList[index])
          value.forEach((v) => {
            inId.push(v.user_id)
            inName.push(v.user_name)
          })
          arr[index].push(String(inId))
          arr[index].push(String(inName))
          inId = []
          inName = []
        })
        return arr
      },
      // 处理时间
      dateLong() {
        if (this.starDate && this.endDate) {
          let oDate1 = this.starDate.substring(0, 10).split('-')
          let oDate2 = this.endDate.substring(0, 10).split('-')
          let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2])
          let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2])
          // 判断时间的选择是否正确
          if (strDateE - strDateS < 0) {
            this.endDate = ''
            this.$refs.popup.show('时间选择错误')
          } else {
            let iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)
            return iDays + 1
          }
        } else {
          return ''
        }
      }
    },
    methods: {
      // 打开审核人员
      openSp(i1, i2, num, type) {
        if (this.spName[i1].length > 0 && num !== -1) {
          this.spName[i1].splice(i2, 1)
        } else {
          this.loading = true
          this.userType = 3
          if (type) {
            this.spNameList.push(type)
          }
          this.spNum = i1
          this.userTitle = '选择审核人员'
          // 将现有的数据传送给模板
          if (this.spName[i1].length > 0) {
            this.sendData = this.spName[i1]
          }
          setTimeout(() => {
            this.loading = false
            this.$refs.memberlist.show()
          }, 500)
        }
      },
      // 删除当前的内容
      spliceSp(i) {
        this.spName.splice(i, 1)
        this.spNameList.splice(i, 1)
      },
      // 判断当前表单的状态
      isEnter(n) {
        return n ? 'active' : ''
      },
      // 打开添加陪同人员页面
      openUser() {
        this.loading = true
        this.userType = 1
        this.userTitle = '选择陪同人员'
        // 将现有的数据传送给模板
        if (this.escortName.length > 0) {
          this.sendData = this.escortName
        }
        setTimeout(() => {
          this.loading = false
          this.$refs.memberlist.show()
        }, 500)
      },
      // 打开抄送人
      openCC(num) {
        // 先判断点击的是不是增加按钮
        if (this.ccName.length > 0 && num !== -1) {
          this.ccName.splice(num, 1)
        } else {
          this.loading = true
          this.userType = 2
          this.userTitle = '选择抄送人员'
          // 将现有选择传送给选择组件
          if (this.ccName.length > 0) {
            this.sendData = this.ccName
          }
          setTimeout(() => {
            this.loading = false
            this.$refs.memberlist.show()
          }, 500)
        }
      },
      // 添加陪同人员或者抄送人 同时清空保存的数据信息
      selectNameFuc(data) {
        switch (this.userType) {
          case 1 :
            this.escortName = data
            this.sendData = []
            return
          case 2 :
            this.ccName = data
            this.sendData = []
            return
          case 3 :
            this.spName[this.spNum] = data
            this.sendData = []
            return
        }
      },
      // 打开日期选择器
      openPicker(who) {
        this.whoClick = who
        this.$refs.picker.open()
      },
      // 输出日期
      handleConfirm(date) {
        let y = date.getFullYear()
        let M = date.getMonth() + 1
        let d = date.getDate()
        M = M < 10 ? '0' + M : M
        d = d < 10 ? '0' + d : d
        let time = y + '-' + M + '-' + d
        if (this.whoClick === 'star') {
          this.starDate = time
        } else {
          this.endDate = time
        }
      },
      // 打开出行选择列表
      openSelectTrip() {
        this.$refs.trip.show()
      },
      // 添加出行方式
      selectTripFuc(data) {
        this.selectTrip = data
      },
      // 删除添加的目的地
      delGoAddress(i) {
        if (i > 0 && !this.goAddress[i]) {
          this.goAddress.splice(i, 1)
        } else {
          return
        }
      },
      // 发送数据前确认
      sendInspect() {
        if (this.starDate && this.endDate && this.goAddress && this.spName[0].length && this.brief &&
          this.selectTrip.length) {
          this.loading = true
          setTimeout(() => {
            this.allDis = true
            this.loading = false
          }, 2000)
        } else {
          this.$refs.popup.show('必填项未填')
        }
      },
      // 开始发送数据
      postData() {
        this.$http.post(postTravel, {
          'user_id': 1,
          'leave_add': this.myAddress,
          'reach_add': String(this.goAddress),
          'start': this.starDate,
          'end': this.endDate,
          'time': this.dateLong,
          'accompany': [String(this.escortNameCpdId), String(this.escortNameCpdName)],
          'reason': this.brief,
          'traffic': this.selectTrip,
          'money': this.rmb,
          'approver_id': this.spNameIdArray,
          'reader': [String(this.ccNameCpdId), String(this.ccNameCpdName)]
        }, {
          emulateJSON: true
        }).then((response) => {
          console.log(response)
          this.allDis = false
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./travel.styl"
</style>

