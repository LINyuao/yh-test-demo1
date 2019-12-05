<template>
  <div class="upload_work">
    <van-field
      v-model="list[0].cause"
      rows="1"
      autosize
      label="请假原因"
      type="textarea"
      placeholder="请输入请假原因"
    />
    <span class="mandatory psmand">必选</span>
    <van-cell :value="list[0].totime" is-link @click="showDatePickerto = true">
      <template slot="title">
        <span class="custom-title">截至时间</span>
        <span class="mandatory">必选</span>
      </template>
    </van-cell>
    <van-cell
      :value="list[0].endtime"
      is-link
      @click="showDatePickerend = true"
    >
      <template slot="title">
        <span class="custom-title">截至时间</span>
        <span class="mandatory">必选</span>
      </template>
    </van-cell>
    <van-field
      v-model="list[0].detailed"
      rows="1"
      autosize
      label="备注说明"
      type="textarea"
      placeholder="请输入备注信息"
    />
    <van-popup v-model="showDatePickerto" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showDatePickerto = false"
        @confirm="OnendTimeToChange"
      />
    </van-popup>
    <van-popup v-model="showDatePickerend" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showDatePickerend = false"
        @confirm="OnendTimeEndChange"
      />
    </van-popup>
    <van-button type="primary" size="large" class="btn_bottom" @click="Oninsert"
      >发表请假</van-button
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
      showDatePickerto: false,
      showDatePickerend: false,
      list: [
        {
          time: new Date().toISOString(),
          cause: "",
          totime: "请选择开始时间",
          endtime: "请选择结束时间",
          detailed: ""
        }
      ]
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    OnendTimeToChange(value) {
      this.list[0].totime = this.$moment(value).format("YYYY-MM-DD hh:mm");
      this.showDatePickerto = false;
    },
    OnendTimeEndChange(value) {
      this.list[0].endtime = this.$moment(value).format("YYYY-MM-DD hh:mm");
      this.showDatePickerend = false;
    },
    async Oninsert() {
      console.log(this.list);
      console.log(...this.list);
      if (
        this.list[0].cause == "" ||
        this.list[0].totime == "请选择开始时间" ||
        this.list[0].endtime == "请选择结束时间"
      ) {
        Toast("请输入必填内容");
        return false;
      } else {
        let r = await apis.insertclassleave(...this.list);
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
