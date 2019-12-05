<template>
  <div class="notice_header mg-b10">
    <van-dropdown-menu class="notice_header_options">
      <van-dropdown-item
        v-model="value"
        :options="option"
        class="notice_header_options_font"
      />
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: "七年级1班", value: 0 },
        { text: "七年级2班", value: 1 },
        { text: "七年级3班", value: 2 }
      ]
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.notice_header {
  height: 44px;
  padding-top: 7px;
  background: #1ba2ffff;
}
.notice_header_options {
  width: 70%;
  margin: 0 auto;
  height: 30px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 3px;
  color: #ffffff;
}
</style>
