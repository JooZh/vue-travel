<template>
  <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
    <div class="memberList animated" v-show="flag">
      <div class="memberList-wrapper">
        <div class="member-title">
          <span>{{userTitle}}</span>
        </div>
        <scroll :dataBoolean="flag" class="member-item" ref="scroll">
          <div class="scroll-body">
            <dl class="" v-for="item in userData">
              <dt class="item-department">{{item.department}}</dt>
              <dd class="item-member" v-for="(value,index) in item.peopleInfo">
                <div class="member-wrapper">
                  <span class="name">{{value.user_name}}</span>
                  <span class="job">{{value.job_name}}</span>
                  <div class="select">
                    <label class="mint-checklist-label">
                      <span class="mint-checkbox">
                        <input type="checkbox" class="mint-checkbox-input" v-model="selectNames"
                               :value="value">
                        <span class="mint-checkbox-core"></span>
                      </span>
                    </label>
                  </div>
                </div>
                <hr v-if="index!=item.length-1" class="border-1px">
              </dd>
            </dl>
          </div>
        </scroll>
        <div class="member-footer">
          <div class="top-wrapper">
            <span class="left">已选：</span>
            <div class="right">
              <div class="selectNames">
                <span class="selectName" v-for="name in dataName">{{name}}</span>
              </div>
              <div class="noName" v-if="selectNames.length===0">暂无选择人员</div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <a class="reset" @click.prevent="selectNames = []">清空</a>
            <a class="send" @click.prevent="sendSelectName">确定</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  export default {
    components: {
      Scroll
    },
    props: {
      userData: {},
      userType: Number,
      userTitle: String,
      sendData: Array
    },
    data() {
      return {
        flag: false,
        selectNames: []
      }
    },
    computed: {
      dataName() {
        let arr = []
        this.selectNames.forEach((value) => {
          arr.push(value.user_name)
        })
        return arr
      }
    },
    methods: {
      show() {
        this.flag = !this.flag
        this.selectNames = this.sendData
      },
      sendSelectName() {
        this.$emit('selectName', this.selectNames)
        this.show()
        this.selectNames = []
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./memberList.styl"
</style>

