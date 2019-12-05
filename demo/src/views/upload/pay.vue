<template>
  <div class="upload_work">
    <van-cell :value="list[0].class">
      <template slot="title">
        <span class="custom-title">发布班级</span>
        <span class="mandatory">必选</span>
      </template>
    </van-cell>
    <van-field
      v-model="list[0].project"
      rows="1"
      autosize
      label="缴费项目"
      type="textarea"
      placeholder="请在此输入缴费项目"
    />
    <van-cell :value="list[0].money" class="_color">
      <template slot="title">
        <span class="custom-title">缴费金额</span>
        <span class="mandatory">必填</span>
      </template>
    </van-cell>
    <van-cell :value="list[0].time" is-link @click="showDatePicker = true">
      <template slot="title">
        <span class="custom-title">截至时间</span>
        <span class="mandatory">必选</span>
      </template>
    </van-cell>
    <van-field
      v-model="list[0].explains"
      rows="1"
      autosize
      label="备注说明"
      type="textarea"
      placeholder="请输入备注信息"
    />
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showDatePicker = false"
        @confirm="OnendTimeChange"
      />
    </van-popup>
    <van-button type="primary" size="large" class="btn_bottom" @click="Oninsert"
      >发表通知</van-button
    >
  </div>
</template>

<script>
import apis from "@/apis";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      minDate: new Date(),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      showDatePicker: false,
      list: [
        {
          project: "",
          money: "100.00",
          explains: "",
          time: "请选择完截至时间",
          remind: "",
          class: "七年一班"
        }
      ]
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    OnendTimeChange(value) {
      this.list[0].time = this.$moment(value).format("YYYY-MM-DD");
      this.showDatePicker = false;
    },
    async Oninsert() {
      console.log(this.list);
      console.log(...this.list);
      if (
        this.list[0].project == "" ||
        this.list[0].time == "请选择完截至时间"
      ) {
        Toast("请输入必填内容");
        return false;
      } else {
        let r = await apis.insertclasspay(...this.list);
        if (r.status == 200) {
          this.$router.go(-1);
        }
        console.log(r);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
._color {
  span {
    color: #fc8163ff;
  }
}
.custom-title {
  color: #323232 !important;
}
</style>
