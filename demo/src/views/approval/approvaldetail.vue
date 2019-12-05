<template>
  <div v-if="list[0]">
    <van-cell :value="list[0].content">
      <template slot="title">
        <div class="approval_content">
          <span class="custom-title">
            审批内容
          </span>
        </div>
      </template>
    </van-cell>
    <van-cell :label="list[0].detailed" class="pd-b10">
      <template slot="title">
        <span class="custom-title">
          审批详情
        </span>
      </template>
    </van-cell>
    <div v-if="activeName == 1">
      <img src="../../images/ing.png" alt="" class="_ing" />
    </div>
    <div v-if="activeName == 2">
      <img
        v-if="list[0].opinion == '同意'"
        src="../../images/agree .png"
        alt=""
        class="_ing"
      />
      <img v-else src="../../images/veto.png" alt="" class="_ing" />
    </div>
    <div class="mg100">
      <van-cell title="图片" v-if="list[0].images">
        <template slot="label">
          <div>
            <img :src="imgs" alt="" width="50px" height="50px;" class="mg010" />
          </div>
          <van-uploader multiple preview-size="50px" disabled />
        </template>
      </van-cell>
      <van-cell title="文件附件" v-if="list[0].enclosure">
        <template slot="label">
          <van-uploader preview-size="50px" disabled></van-uploader>
          <input type="file" name="" id="" />
          <img
            v-if="suffix == '.pptx'"
            src="../../images/pptx.jpg"
            alt=""
            width="16px"
            height="16px"
          />
          <img
            v-if="suffix == '.xlsx'"
            src="../../images/xlsx.jpg"
            alt=""
            width="16px"
            height="16px"
          />
          <img
            v-if="suffix == '.doc'"
            src="../../images/word.jpg"
            alt=""
            width="16px"
            height="16px"
          />
          {{ list[0].enclosure }}
        </template>
      </van-cell>
    </div>
    <van-cell>
      <template slot="title">
        <span class="custom-title">
          审批人
        </span>
      </template>
      <template slot="label">
        <div class="dot_box commom_bule">
          <span class="add_people ">{{ people }}</span>
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template slot="title">
        <span><van-icon name="chat-o"/></span>
        <span>审批意见</span>
      </template>
    </van-cell>
    <van-cell>
      <template slot="title">
        <p class="custom-title">
          教导主任 :
          <span v-if="list[0].opinion == '同意'" class="agree">{{
            list[0].opinion
          }}</span
          ><span v-if="list[0].opinion == '拒绝'" class="commom_red">{{
            list[0].opinion
          }}</span>
          <span class="msg_note">{{ list[0].time | _formatDate }}</span>
        </p>
        <p>
          留言备注 :
          <span class="msg_note">
            {{ list[0].remarks }}
          </span>
        </p>
      </template>
    </van-cell>
    <van-button
      v-if="activeName == 1"
      type="info"
      size="large"
      class="okkapproval"
      @click="Onend"
      >完成审批</van-button
    >
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      people: "教导主任",
      list: [],
      suffix: "",
      imgs: require("../../images/details.png"),
      approvalshow: false,
      activeName: ""
    };
  },
  created() {
    this.activeName = this.getactive;
  },
  mounted() {
    this.Rendering();
  },
  components: {},
  computed: {
    ...mapGetters(["getactive"]),
    id() {
      return this.$route.params.id;
    }
  },
  filters: {
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    _formatDate(time) {
      return moment(time).format("MM-DD HH:mm");
    }
  },
  watch: {
    activeName(n) {
      this._saveStatus(n);
    }
  },
  methods: {
    ...mapActions(["_saveStatus"]),
    async Rendering() {
      if (this.activeName == 1) {
        let res = await apis.approvaldetail(this.id);
        this.list = res.data.data;
        let values = this.list[0].enclosure;
        this.suffix = values.substr(values.lastIndexOf("."));
        console.log(this.list);
        console.log(this.id);
        console.log(this.suffix);
      }
      if (this.activeName == 2) {
        let res = await apis.approvalenddetail(this.id);
        this.list = res.data.data;
        console.log(this.list);
        let values = this.list[0].enclosure;
        this.suffix = values.substr(values.lastIndexOf("."));
        console.log(this.suffix);
      }
    },
    async Onend() {
      let res = await apis.switchapproval(this.list[0]);
      console.log(res);
      await apis.deleteapprovaling(this.list[0].id);
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
input[type="file"] {
  width: 50px;
  height: 50px;
  position: relative;
  top: -22px;
  left: -58px;
  opacity: 0;
  z-index: -1;
}
.preview {
  display: flex;
}
.van-cell__label {
  display: flex;
}
.dot_box {
  width: 50px;
  height: 50px;
  line-height: 44px;
  text-align: center;
  border: 1px dotted #333;
  border-radius: 50%;
  margin-top: 10px;
}
._ing {
  width: 72.5px;
  height: 72.5px;
  position: absolute;
  right: 10%;
  z-index: 11;
}
.add_icon {
  font-size: 30px;
}
.add_people {
  font-size: 12px;
  color: #ffffff;
}
.arrow_right {
  font-size: 20px;
  transform: rotate(-90deg);
  color: #333333;
  position: relative;
  left: 20px;
  top: 5px;
}
</style>
