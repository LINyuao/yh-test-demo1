<template>
  <div
    class="topnav"
    :style="{
      background: getmeta.changecolor
        ? ' linear-gradient(#19191eff, #0c2e47ff)'
        : '#1ba2ffff'
    }"
  >
    <div @click="returnprev" class="rt">
      <van-icon name="arrow-left" size="24px" class="arrow" />
      <span class="return">返回</span>
    </div>
    <div>
      <span class="layout_top_font">{{ getmeta.tltle }}</span>
    </div>
    <div v-if="getmeta.relay">
      <van-icon name="share" size="24px" class="share" />
    </div>
    <div v-else>
      <van-icon
        name="ellipsis"
        size="24px"
        class="ellipsis"
        v-show="getmeta.showtabbar"
      />
    </div>
    <router-link to="mstatistics" v-if="getmeta.history">
      <van-button color="#ffffff" plain class="history">历史统计</van-button>
    </router-link>
    <router-link to="rstatistics" v-if="getmeta.rstatistics">
      <van-button color="#ffffff" plain class="history">日统计</van-button>
    </router-link>
    <!-- <van-nav-bar title="标题"m left-text="返回" right-text="按钮" left-arrow v-show /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  components: {},
  computed: {
    getmeta() {
      return this.$route.meta;
    }
  },
  watch: {},
  methods: {
    returnprev() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.topnav {
  display: flex;
  justify-content: space-between;
  .ellipsis,
  .share {
    font-size: 24px;
    position: relative;
    top: 6px;
  }
  .rt {
    display: flex;
    align-items: center;
  }
  .return {
    font-size: 14px;
  }
  .layout_top_font {
    font-size: 17px;
    position: relative;
    // left: -15px;
  }
}
</style>
