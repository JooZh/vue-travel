<template>
  <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
    <div v-show="tripShow" class="trip-mode animated">
      <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
        <div v-show="tripShow" class="trip-mode-wrapper animated ">
          <div class="title">
            <span @click.stop="show">取消</span>
            <span @click.stop="sendSelectTrip">确定</span>
          </div>
          <hr class="border-1px">
          <scroll :dataBoolean="tripShow" class="content" ref="scroll">
            <div class="scroll-body">
              <div class="mint-radiolist-label-content" v-for="(item,index) in tripData">
                <label class="mint-radiolist-label">
                  <span class="mint-radio-label">{{item}}</span>
                  <div class="mint-radio-select">
                    <input type="radio" name="trip" class="mint-radio-input" v-model="selectTrip" :value="item">
                    <span class="mint-radio-core"></span>
                  </div>
                </label>
                <hr v-if="index!=tripData.length-1" class="border-1px">
              </div>
            </div>
          </scroll>
        </div>
      </transition>
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
      tripData: ''
    },
    data() {
      return {
        selectTrip: '',
        tripShow: false
      }
    },
    methods: {
      show() {
        this.tripShow = !this.tripShow
      },
      sendSelectTrip() {
        this.$emit('selectTrip', this.selectTrip)
        this.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./tripMode.styl"
</style>

