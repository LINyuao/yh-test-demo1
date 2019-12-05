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
                class="task_box"
                :class="[items.buer ? 'schoolcolor-y' : 'schoolcolor-b']"
                >{{ items.task }}</span
              >
              <div
                class="circular"
                :class="[items.buer ? 'schoolcolor-y' : 'schoolcolor-b']"
              ></div>
              <span class="fc-normal mg010 posr">{{
                items.content_title
              }}</span>
              <div class="hotbox" v-show="indexs == 0">NEW</div>
            </div>
            <van-divider dashed class="mg100"></van-divider>
            <div>
              <div class="article">{{ items.content_article }}</div>
              <div class="msg_bottom">
                <span>{{ items.time | formatDate }}</span>
                <span :style="{ color: items.buer ? '' : 'red' }">详情</span>
              </div>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li class="edit">
            <img src="../images/pic.png" alt="" class="edit_img" />
            <p class="fc-normal">您暂时没有任何通知！</p>
            <router-link to="/uploadwork">
              <van-button type="primary" size="large" class="addnotice mg100"
                >发起作业</van-button
              >
            </router-link>
          </li>
          <Button v-show="index != 0 && item.content.length != 0"></Button>
        </ul>
      </van-tab>
    </van-tabs>
    <van-button
      type="primary"
      size="large"
      class="btn_bottom"
      v-show="activeName != 0 && list[activeName].content != 0"
      @click="Onchange"
      >发表通知</van-button
    >
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  inject: ["reload"],
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
    this.activeName = this.getactiveName;
    this.getcontent();
  },
  components: {},
  computed: { ...mapGetters(["getactiveName"]) },
  watch: {
    activeName(n) {
      this.saveStatus(n);
    }
  },
  methods: {
    ...mapActions(["saveStatus"]),
    async getcontent() {
      if (this.activeName == 0) {
        let res = await apis.taskAlready();
        this.list[0].content = res.data.data;
      } else if (this.activeName == 1) {
        let res = await apis.taskAwait();
        this.list[1].content = res.data.data;
      }
    },
    async Onchange() {
      let res = await apis.switchtask();
      console.log(res);
      if (res.status == 200) {
        // eslint-disable-next-line no-unused-vars
        apis.deletetask().then(r => {
          this.reload();
        });
      }
    },
    Ondetail(i) {
      this.$router.push({
        name: "taskDetail",
        params: { id: this.list[this.activeName].content[i].id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.task_box {
  padding: 5px;
  font-size: 12px;
  z-index: 333;
  position: relative;
  left: -13px;
  top: -8.2px;
}
.posr {
  position: relative;
  top: -7.2px;
}
.circular {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  left: -25px;
}
</style>
