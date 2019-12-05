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
            @click="Ondetail(indexs)"
          >
            <div class="inline_box fc-black">
              <div class="hotbox" v-show="indexs == 0">NEW</div>
              <div v-if="activeName == 0">
                <img src="../images/await.png" alt="" class="seal" />
              </div>
              <div v-if="activeName == 1">
                <img src="../images/ing.png" alt="" class="seal" />
              </div>
              <div v-if="activeName == 2">
                <img
                  v-if="items.opinion == '同意'"
                  src="../images/agree .png"
                  alt=""
                  class="seal"
                />
                <img v-else src="../images/veto.png" alt="" class="seal" />
              </div>
              <span class="fc6 fs14">{{ content.time }}</span>
              <span class="pd010 commom_red"
                >{{ items.time | _formatDate }}
              </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black ">
              <span class="fc6 fs14">{{ content.content }}</span>
              <span class="pd010 commom_green">{{ items.content }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black" v-if="activeName == 0">
              <span class="fc6 fs14">{{ content.detailed }}</span>
              <span class="pd010">{{ items.detailed }} </span>
              <van-divider dashed v-if="activeName == 0"></van-divider>
            </div>
            <div class="inline_box fc-black" v-if="activeName != 0">
              <span class="fc6 fs14">{{ content.opinion }}</span>
              <span class="pd010"
                >{{ items.approver }}{{ items.opinion }}
              </span>
              <van-divider dashed v-if="activeName == 0"></van-divider>
            </div>
            <div class="in_center" v-if="activeName == 0">
              <van-button
                class="_btn mg020"
                color="#1BA2FF"
                plain
                @click="Ondel(items.id)"
                >撤销</van-button
              >
              <van-button
                class="_btn  mg020"
                color="#FB562F"
                plain
                @click="Onedit(items.id)"
                >编辑</van-button
              >
            </div>
            <div class="in_right" v-if="activeName != 0">
              <span class="fc6 fs12">查看详情 ></span>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <Dialog
      :getobj="childrenlist"
      :dialogShow="dialogShow"
      @childByValue="childByValue"
      v-model="dialogShow"
    ></Dialog>
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
import Dialog from "@/views/approval/components/Dialog";
import { mapGetters, mapActions } from "vuex";

// import Button from "@/components/Button";

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
          title: "待审批",
          name: 0,
          content: []
        },
        {
          title: "审批中",
          name: 1,
          content: []
        },
        {
          title: "已审批",
          name: 2,
          content: []
        }
      ],
      content: {
        time: "发起时间：",
        content: "审批内容：",
        detailed: "审批详情：",
        images: "",
        enclosure: "",
        approver: "",
        remarks: "",
        opinion: "审批意见："
      }
    };
  },
  created() {
    // this.getcontent();
    this.activeName = this.getactive;
  },
  mounted() {
    this.getcontent();
  },
  components: { Dialog },
  computed: { ...mapGetters(["getactive"]) },
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
    async getcontent() {
      if (this.activeName == 0) {
        let res = await apis.office();
        this.list[0].content = res.data.data;
      } else if (this.activeName == 1) {
        let res = await apis.officeing();
        this.list[1].content = res.data.data;
      } else {
        let res = await apis.approvalend();
        this.list[2].content = res.data.data;
      }
    },
    Ondetail(i) {
      if (this.activeName != 0) {
        this.$router.push({
          name: "approvalDetail",
          params: { id: this.list[this.activeName].content[i].id }
        });
      }
    },
    async Onedit(index) {
      this.id = index;
      let r = await apis.oddapproval(this.id);
      this.childrenlist = r.data.data;
      console.log(this.childrenlist);
      this.dialogShow = !this.dialogShow;
    },
    childByValue(childValue) {
      this.dialogShow = !childValue.dialogShow;
    },
    async Ondel(index) {
      this.id = index;
      let r = await apis.deleteapproval(this.id);
      console.log(r);
      this.reload();
    }
  }
};
</script>
