/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="navbar">
    <van-tabs
      type="card"
      animated
      swipeable
      title-inactive-color="#1ba2ffff"
      color="#1ba2ffff"
      class="mg-b10"
      v-model="activeName"
      sticky
      @click="getcontent"
    >
      <van-tab
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :name="item.name"
      >
        <ul v-if="item.content.length != 0">
          <li
            class="pd010 msg mg-t10 toe"
            v-for="(items, indexs) in item.content"
            :key="indexs"
            @click="Ondetail(indexs)"
          >
            <div class="mg-t10  msg-head">
              <span class="fc-normal mg010 ">{{ items.content_title }}</span>
            </div>
            <van-divider dashed class="mg100"></van-divider>
            <div>
              <div class="article">{{ items.content_article }}</div>
              <div class="msg_bottom">
                <span
                  >预计
                  <span class="fc-warn fs12">{{
                    items.time | formatDate
                  }}</span>
                  发布</span
                >
                <span :style="{ color: items.buer ? '' : 'red' }"
                  >查看详情 ></span
                >
              </div>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li class="edit">
            <img src="../../images/pic.png" alt="" class="edit_img" />
            <p class="fc-normal">您暂时没有任何通知！</p>
            <van-button type="primary" size="large" class="addnotice"
              >发起作业</van-button
            >
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
export default {
  data() {
    return {
      activeName: 0,
      list: [
        {
          title: "已发布",
          name: 0,
          content: []
        },
        {
          title: "待发布",
          name: 1,
          content: []
        }
      ]
    };
  },
  filters: {
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  },
  created() {
    this.getcontent();
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    async getcontent() {
      if (this.activeName == 0) {
        let res = await apis.classes();
        this.list[0].content = res.data.data;
      }
      //     else if (this.activeName == 1) {
      //     let res = await apis.taskAwait();
      //     this.list[1].content = res.data.data;
      //   }
    },
    Ondetail(i) {
      this.$router.push({
        name: "noticeDetail",
        params: { id: this.list[this.activeName].content[i].id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.msg-head {
  text-align: center;
}
</style>
