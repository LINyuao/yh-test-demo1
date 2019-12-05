<template>
  <div class="app-container">
    <Top-nav class="top"></Top-nav>
    <div class="container" :class="[getmeta.pdb50 ? 'mg-b50' : '']">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <BottonNav></BottonNav>
  </div>
</template>

<script>
import BottonNav from "./components/BottonNav";
import TopNav from "./components/TopNav";
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    TopNav,
    BottonNav
  },
  computed: {
    getmeta() {
      return this.$route.meta;
    }
  },
  watch: {},
  methods: {}
};
</script>
