<template>
  <div id="approval">
    <top>
      <div class="title">
        <router-link tag="div" class="tab-item" to="/approval/launch">我发起的</router-link>
        <router-link tag="div" class="tab-item" to="/approval/wait">待我审批</router-link>
        <router-link tag="div" class="tab-item" to="/approval/cctome">抄送给我</router-link>
      </div>
    </top>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from 'components/top/top'
  
  export default {
    components: {
      Top
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "./approval.styl"
</style>

