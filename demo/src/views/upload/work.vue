<template>
  <div class="upload_work">
    <van-cell :value="list[0].class" is-link @click="showPicker = true">
      <template slot="title">
        <span class="custom-title">发布班级</span>
        <span class="mandatory">必选</span>
      </template>
    </van-cell>
    <van-field
      v-model="list[0].content_title"
      rows="1"
      autosize
      label="作业标题"
      type="textarea"
      placeholder="请在此输入作业标题"
    />
    <van-cell class="mg100">
      <template slot="title">
        <span class="custom-title">作业内容</span>
        <span class="mandatory">必填</span>
      </template>
      <template slot="label">
        <van-field
          v-model="list[0].content_article"
          placeholder="请填写具体的作业...."
          rows="3"
          autosize
          type="textarea"
          class="pd100"
        />
      </template>
    </van-cell>
    <Uploadimg @flie="Enclosure" @imgfile="Onpicture"></Uploadimg>

    <van-field
      v-model="list[0].remarks"
      rows="1"
      autosize
      label="备注说明"
      type="textarea"
      placeholder="请在此备注信息"
      class="mg100"
    />
    <van-cell :value="list[0].time" is-link @click="showDatePicker = true">
      <template slot="title">
        <span class="custom-title">完成时间</span>
        <span class="mandatory">必填</span>
      </template>
    </van-cell>
    <van-cell :value="list[0].type" is-link @click="showPicker1 = true">
      <template slot="title">
        <span class="custom-title">发布类型</span>
        <span class="mandatory">必选</span>
      </template>
    </van-cell>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showDatePicker = false"
        @confirm="showDatePicker = false"
        @change="OnendTimeChange"
      />
    </van-popup>
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns1"
        @cancel="showPicker1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <van-button type="primary" size="large" class="btn_bottom" @click="insert"
      >发表通知</van-button
    >
  </div>
</template>

<script>
import Uploadimg from "./components/Uploadimg";
import apis from "@/apis";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  data() {
    return {
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      showPicker: false,
      showDatePicker: false,
      showPicker1: false,
      columns: ["七年一班", "七年二班", "七年三班"],
      columns1: ["立即发布", "立即发布", "立即发布"],
      list_value: ["请选择发布班级", "请选择完成时间", "请选择发布类型"],
      list: [
        {
          task: "语文作业",
          class: "请选择发布班级",
          content_title: "",
          content_article: "",
          time: "请选择完成时间",
          pic: "",
          filename: "",
          filepic: "",
          remarks: "",
          type: "请选择发布类型"
        }
      ]
    };
  },
  created() {},
  components: { Uploadimg },
  computed: {},
  watch: {},
  methods: {
    onConfirm(value) {
      this.list[0].class = value;
      this.showPicker = false;
    },
    onConfirm1(value) {
      this.list[0].type = value;
      this.showPicker1 = false;
    },
    OnendTimeChange(value) {
      let endTimeArr = value.getValues(); //["2019", "03", "22", "17", "28"]
      this.list[0].time = `${endTimeArr[0]}-${endTimeArr[1]}-${
        endTimeArr[2]
      }  ${endTimeArr[3]}:${endTimeArr[4]}:00`;
      this.showPicker = false;
    },
    Enclosure(icon, text) {
      this.list[0].filepic = icon;
      this.list[0].filename = text;
      console.log(this.list[0].filepic, this.list[0].filename);
    },
    Onpicture(e) {
      this.list[0].pic = e;
    },
    async insert() {
      console.log(this.list);
      console.log(...this.list);
      if (
        this.list[0].content_title == "" ||
        this.list[0].content_article == "" ||
        this.list[0].class == "请选择发布班级" ||
        this.list[0].time == "请选择完成时间" ||
        this.list[0].type == "请选择发布类型"
      ) {
        Toast("请输入必填内容");
        return false;
      } else {
        let r = await apis.inserttaskAwait(...this.list);
        if (r.status == 200) {
          this.$router.go(-1);
        }
        console.log(r);
      }
    }
  }
};
</script>
<style lang="scss">
.btn_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
