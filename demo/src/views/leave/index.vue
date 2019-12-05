/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="navbar mg-t10">
    <van-tabs
      type="card"
      animated
      swipeable
      title-inactive-color="#1ba2ffff"
      color="#1ba2ffff"
      class="mg-b10"
      v-model="activeName"
      @click="getcontent"
    >
      <van-tab
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :name="item.name"
      >
        <ul>
          <li
            class="pd10 msg mg-t10"
            v-for="(items, indexs) in item.content"
            :key="indexs"
          >
            <div class="inline_box fc-black">
              <div class="hotbox" v-show="indexs == 0">NEW</div>
              <div v-if="activeName == 1">
                <img
                  v-if="items.judge == '同意'"
                  src="../../images/agree .png"
                  alt=""
                  class="seal"
                />
                <img v-else src="../../images/veto.png" alt="" class="seal" />
              </div>
              <span class="fc6 fs14">{{ content.time }}</span>
              <span class="pd010">{{ items.time | _formatDate }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black ">
              <span class="fc6 fs14">{{ content.content }}</span>
              <p class="commom_red">
                {{ items.totime | _formatDate }}<span class="mg010">至</span
                >{{ items.endtime | _formatDate }}
              </p>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.detailed }}</span>
              <span class="fs14 pd010 commom_green">{{ items.cause }} </span>
              <p>{{ items.detailed }}</p>
              <van-divider dashed v-if="activeName == 0"></van-divider>
            </div>
            <div class="in_right" v-if="activeName == 0">
              <van-button
                class="_btn mg020"
                color="#009944"
                plain
                @click="Onagree(indexs)"
                >同意</van-button
              >
              <van-button
                class="_btn  mg020"
                color="#FB562F"
                plain
                @click="Onveto(indexs)"
                >否决</van-button
              >
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <router-link to="uploadleave"
      ><van-button type="info" size="large" class="btn_bottom"
        >开始请假</van-button
      ></router-link
    >
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
// import { mapGetters, mapActions } from "vuex";

export default {
  inject: ["reload"],
  data() {
    return {
      newtime: [],
      currenttime: [],
      false1: false,
      id: null,
      activeName: 0,
      endtime: "",
      dialogShow: false,
      childrenlist: [],
      list: [
        {
          title: "待处理",
          name: 0,
          content: []
        },
        {
          title: "已处理",
          name: 1,
          content: []
        }
      ],
      content: {
        time: "申请时间：",
        content: "请假时间：",
        detailed: "请假原因：",
        totime: "",
        endtime: "",
        judge: "",
        cause: ""
      }
    };
  },
  created() {},
  mounted() {
    this.getcontent();
  },
  components: {},
  computed: {},
  filters: {
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    _formatDate(time) {
      return moment(time).format("MM-DD HH:mm");
    }
  },
  watch: {},
  methods: {
    async getcontent() {
      if (this.activeName == 0) {
        let res = await apis.classleave();
        this.list[0].content = res.data.data;
        // console.log(this.list);
      } else {
        let res = await apis.classleaveend();
        this.list[1].content = res.data.data;
      }
    },
    Onagree(index) {
      console.log(this.list[0].content[index]);
      this.list[0].content[index].judge = "同意";
      apis.switchclassleaveend(this.list[0].content[index]).then(() => {});
      apis.deleteclassleaveend(this.list[0].content[index]).then(() => {});
      this.reload();
    },
    Onveto(index) {
      console.log(this.list[0].content[index]);
      this.list[0].content[index].judge = "否决";
      apis.switchclassleaveend(this.list[0].content[index]).then(() => {});
      apis.deleteclassleaveend(this.list[0].content[index]).then(() => {});
      this.reload();
    }
  }
};
</script>
