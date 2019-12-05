<template>
  <van-tabbar v-model="active" route v-show="getmeta.showtabbar">
    <van-tabbar-item
      v-for="(item, index) in blist"
      :key="index"
      :name="item.name"
      :icon="item.icon"
      replace
      :to="item.router"
      >{{ item.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
      blist: [
        {
          name: "home",
          icon: "wap-home-o",
          router: "/home",
          title: "首页"
        },
        {
          name: "communication",
          icon: "shopping-cart-o",
          router: "/communication",
          title: "家校交流"
        },
        {
          name: "shopmarket",
          icon: "wap-home-o",
          router: "/shopmarket",
          title: "商城"
        },
        {
          name: "mine",
          icon: "friends-o",
          router: "/mine",
          title: "我的"
        }
      ]
    };
  },
  created() {},
  components: {},
  computed: {
    getmeta() {
      return this.$route.meta;
    }
  },
  watch: {},
  methods: {}
};
</script>
<style lang="scss">
.van-tabbar {
  border-top: 1px solid #ddddddff;
  background: #f8f8f8ff;
}
</style>
