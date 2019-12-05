<template>
  <div class="noticeDetail">
    <Userheader></Userheader>
    <div class="detail_body">
      <h3>温泉小学2016年寒假时间通知</h3>
      <div>
        寒假将至，让学生带着老师对您们的问候，带着校长对学生的嘱托回到您的身边，享受天伦之乐，过一个愉快的寒假，望家长在假期中常与孩子沟通，使之健康成长。
      </div>
      <img src="../../images/noticeimg.png" alt="" width="100%" class="pd10" />
      <div>
        一、假期时间：2017年1月22日（农历腊月二十二日）至2017年2月16日（农历正十七日），2月17日（农历正月十八日）8：00正式开学上课，学生返校时要上交寒假作业。
      </div>
    </div>
  </div>
</template>

<script>
import Userheader from "@/components/Userheader";
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    Userheader
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.noticeDetail {
  background: #ffffff !important;
}
.detail_body {
  color: #333333;
  background: #ffffff;
  text-align: center;
  line-height: 30px;
  padding: 10px;
  padding-bottom: 40px;
}
</style>
