<template>
  <div>
    <header class="detail_head">
      <div class="detail_user_img"></div>
      <div>
        <ul>
          <li>陈大大老师</li>
          <li class="dtimer">2017-03-27 <span> 09:59</span></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.detail_head {
  width: 100%;
  height: 60px;
  background: #ffffff;
  color: #333333ff;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.detail_user_img {
  width: 44px;
  height: 44px;
  background: url("../images/Headportrait.png");
  background-size: 100%;
  margin-right: 10px;
  margin-left: 20px;
}
.dtimer {
  font-size: 13px;
  color: #999999ff;
}
</style>
