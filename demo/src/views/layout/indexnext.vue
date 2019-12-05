<template>
  <div class="app-container">
    <Top-nav class="top"></Top-nav>
    <div class="container mg-b50">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <!-- <Button></Button> -->
  </div>
</template>

<script>
// import Button from "@/components/Button";
import TopNav from "./components/TopNav";
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    TopNav
    // Button
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
