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
              <span
                class="school"
                :class="[items.buer ? 'schoolcolor-y' : 'schoolcolor-b']"
                >{{ items.school }}</span
              >
              <span class="fc-normal mg010">{{ items.content_title }}</span>
              <div class="hotbox" v-show="items.hotbox">NEW</div>
            </div>
            <van-divider dashed class="mg100"></van-divider>
            <div>
              <div class="article">{{ items.content_article }}</div>
              <div class="msg_bottom">
                <span>{{ items.time | formatDate }}</span>
                <span :style="{ color: items.buer ? '' : 'red' }">未读</span>
              </div>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li class="edit">
            <img src="../images/pic.png" alt="" class="edit_img" />
            <p class="fc-normal">您暂时没有任何通知！</p>
            <van-button type="primary" size="large" class="addnotice"
              >发起通知</van-button
            >
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <!-- <Button
      v-cloak
      v-show="activeName != 0 && list[activeName].content != 0"
    ></Button>switchtask -->
    <van-button
      type="primary"
      size="large"
      class="btn_bottom"
      v-show="activeName != 0 && list[activeName].content != 0"
      >发表通知</van-button
    >
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
// import Button from "@/components/Button";

export default {
  data() {
    return {
      activeName: 0,
      list: [
        {
          title: "班级通知",
          name: 0,
          content: []
        },
        {
          title: "校园通知",
          name: 1,
          content: []
        },
        {
          title: "教务通知",
          name: 2,
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
        let res = await apis.noticeClass();
        this.list[0].content = res.data.data;
        console.log(this.list);
      } else if (this.activeName == 1) {
        let res = await apis.noticeSchool();
        this.list[1].content = res.data.data;
      } else {
        let res = await apis.noticeDean();
        this.list[2].content = res.data.data;
      }
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
