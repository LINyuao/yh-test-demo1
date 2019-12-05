<template>
  <div>
    <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="Onexit"
      size="large"
      >退出登陆</van-button
    >
  </div>
</template>

<script>
import { localStorage } from "@/storage";
export default {
  data() {
    return {};
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    Onexit() {
      localStorage.removeFromLocal("token");
      localStorage.removeFromLocal("userDate");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
