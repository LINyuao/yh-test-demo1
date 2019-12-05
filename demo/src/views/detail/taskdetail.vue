<template>
  <div>
    <Userheader></Userheader>
    <div class="detail_body" v-if="list.length != 0">
      <div class="detail_title">{{ list[0].content_title }}</div>
      <div class="detail_content">
        {{ list[0].content_article }}
      </div>
      <van-divider dashed></van-divider>
      <div>
        <span>班级：</span>
        <span class="_class">{{ list[0].class }}</span>
      </div>
      <van-divider dashed></van-divider>
      <div>
        <span>备注：</span>
        <span class="_remarks">{{ list[0].remarks }}</span>
      </div>
      <van-divider dashed></van-divider>
      <div>
        <span>要求完成时间：</span>
        <span class="_time">{{ list[0].time | formatDate }}</span>
      </div>
    </div>
    <div class="detail_enclosure">
      <span v-if="filename && newpic">相关附件：</span>
      <div>
        <img :src="newpic" alt="" class="_img" />
      </div>
      <div class="_file" v-if="filename">
        <div>{{ this.filename }}</div>
        <div class="_color"></div>
        <span class="_font" v-if="type == 'doc'">w</span>
        <span class="_font" v-if="type == 'xlsx'">x</span>
        <span class="_font" v-if="type == 'pptx'">p</span>
      </div>
    </div>
  </div>
</template>

<script>
import Userheader from "@/components/Userheader";
import apis from "@/apis";
import moment from "moment";
export default {
  data() {
    return {
      list: [],
      pic: "",
      newpic: "",
      filename: "",
      type: ""
    };
  },
  filters: {
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  },
  async created() {
    let r = await apis.taskdetail(this.id);
    this.list = r.data.data;
    console.log(this.list);
    if (this.list[0].pic) {
      this.pic = this.list[0].pic;
      this.newpic = require("../../images/" + this.pic);
    }
    if (this.list[0].filename) {
      this.filename = this.list[0].filename;
      this.type = this.filename.replace(/.+\./, "").toLowerCase();
    }
    console.log(this.pic);
    console.log(this.newpic);
    console.log(this.type);
  },
  components: { Userheader },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.detail_body {
  color: #333333;
  background: #ffffff;
  line-height: 30px;
  padding: 10px;
  margin: 10px;
  padding-bottom: 20px;
  .detail_title {
    text-align: center;
    font-weight: bold;
  }
  .detail_content {
    text-indent: 2em;
  }
  ._class {
    color: #1ba2ff;
  }
  ._remarks {
    color: #15bc9e;
  }
  ._time {
    color: #fb562f;
  }
}
.detail_enclosure {
  color: #333333;
  margin: 10px;
  ._img {
    width: 135px;
    height: 100px;
  }
  ._file {
    width: 135px;
    height: 100px;
    font-size: 12px;
    background: #ffffff;
    padding: 10px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    border: 1px solid rgba(72, 179, 253, 1);
    border-radius: 4px;
  }
  ._font {
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    position: absolute;
    right: 5px;
    bottom: 0;
  }
  ._color {
    position: absolute;
    right: -35px;
    bottom: -36px;
    transform: rotate(225deg);
    border-top: 35px transparent dashed;
    border-left: 35px transparent dashed;
    border-bottom: 35px transparent dashed;
    border-right: 35px #48b3fd solid;
  }
}
</style>
