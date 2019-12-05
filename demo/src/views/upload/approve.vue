<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="approval_content">
          <span class="custom-title">
            审批内容
          </span>
          <span class="mandatory">必填</span>
        </div>
      </template>
      <template>
        <van-field
          v-model="list.content"
          placeholder="请填写具体的内容...."
          rows="1"
          autosize
          class="pd010 fx2"
        />
      </template>
    </van-cell>
    <van-cell>
      <template slot="title">
        <span class="custom-title">
          审批详情
        </span>
        <span class="mandatory">必填</span>
      </template>
      <template slot="label">
        <van-field
          v-model="list.detailed"
          placeholder="请填写具体的内容...."
          rows="3"
          autosize
          type="textarea"
          class="pd100"
        />
      </template>
    </van-cell>
    <Uploadimg class="mg100" @flie="Enclosure" @imgfile="Onpicture"></Uploadimg>
    <van-cell value="点击头像可删除">
      <template slot="title">
        <span class="custom-title">
          审批人
        </span>
        <span class="mandatory">必填</span>
      </template>
      <template slot="label">
        <div
          class="dot_box commom_bule"
          v-show="approvalshow"
          @click="Onhidpeople"
        >
          <span class="add_people ">{{ people }}</span>
        </div>
        <van-icon name="down" class="arrow_right" v-show="approvalshow" />
        <div class="dot_box" @click="Onshowpeople">
          <span class="add_icon">+</span>
        </div>
      </template>
    </van-cell>
    <!-- <van-cell title="审批意见" />
    <van-cell>
      <template slot="title">
        <p class="custom-title">
          教导主任 :
          <span class="agree">同意</span>
          <span class="msg_note">02-17 12：40</span>
        </p>
        <p>
          留言备注 :
          <span class="msg_note">
            请做好相应的教学工作安排，谢谢！
          </span>
        </p>
      </template>
    </van-cell> -->
    <van-button type="info" size="large" class="btn_bottom" @click="Onadd"
      >发表审批</van-button
    >
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
import Uploadimg from "./components/Uploadimg";
export default {
  data() {
    return {
      people: "教导主任",
      list: {
        time: new Date().toISOString(),
        content: "",
        detailed: "",
        images: "",
        enclosure: "",
        approver: "",
        remarks: "",
        opinion: ""
      },
      approvalshow: false
    };
  },
  created() {
    console.log(this.list);
  },
  components: { Uploadimg },
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
    Onshowpeople() {
      this.approvalshow = true;
      this.list.approver = this.people;
    },
    Onhidpeople() {
      this.approvalshow = false;
      this.list.approver = "";
    },
    Enclosure(icon, text) {
      this.list.enclosure = text;
      console.log(this.list.enclosure);
    },
    Onpicture(e) {
      this.list.images = e;
    },
    async Onadd() {
      if (
        this.list.content == "" ||
        this.list.detailed == "" ||
        this.list.approver == ""
      ) {
        this.$toast("请输入必填内容");
      } else {
        await apis.insertapproval(this.list);
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// .van-cell__title,
// .van-cell__value {
//   flex: none;
// }
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
