/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="navbar mg100">
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
        <ul v-if="activeName == 0">
          <li
            class="pd10 msg mg-t10"
            v-for="(items, indexs) in item.content"
            :key="indexs"
          >
            <div class="inline_box fc-black">
              <div class="hotbox" v-show="indexs == 0">NEW</div>
              <span class="fc6 fs14">{{ content.project }}</span>
              <span class="pd010">{{ items.project }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.money }}</span>
              <span class="pd010"
                >{{ items.money }}
                <span v-if="items.money">元</span>
              </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.explain }}</span>
              <span class="pd010">{{ items.explains }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.time }}</span>
              <span class="pd010 color_time">2019-12-12 </span>
              <span v-show="activeName == 0"
                >仅剩<span class="color_over">{{ currenttime[indexs] }}</span
                >天</span
              >
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black" v-show="activeName === 2">
              <span class="fc6 fs14">{{ content.remind }}</span>
              <span class="pd010">尽快联系班主任，完成缴费！ </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="in_right" v-show="activeName == 0">
              <van-button
                class="_btn mg020"
                color="#009944"
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
          </li>
        </ul>
        <ul v-if="gap == 1"></ul>
        <ul v-if="false1 == true">
          <li
            class="pd10 msg mg-t10"
            v-for="(items, indexs) in item.content"
            :key="indexs"
          >
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.project }}</span>
              <span class="pd010">{{ items.project }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.money }}</span>
              <span class="pd010"
                >{{ items.money }}
                <span v-if="items.money">元</span>
              </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.explain }}</span>
              <span class="pd010">{{ items.explain }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.time }}</span>
              <span class="pd010 color_time"
                >{{ items.time | formatDate }}
              </span>
              <span v-show="activeName == 0"
                >仅剩<span class="color_over">{{ currenttime[indexs] }}</span
                >天</span
              >
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black" v-show="activeName === 2">
              <span class="fc6 fs14">{{ content.remind }}</span>
              <span class="pd010">尽快联系班主任，完成缴费！ </span>
              <van-divider dashed></van-divider>
            </div>
          </li>
        </ul>
        <ul v-if="activeName == 1">
          <li
            class="pd10 msg mg-t10"
            v-for="(items, indexs) in item.content.slice(0, 1)"
            :key="indexs"
          >
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.project }}</span>
              <span class="pd010">{{ items.project }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.money }}</span>
              <span class="pd010"
                >{{ items.money }}
                <span v-if="items.money">元</span>
              </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">发起时间：</span>
              <span class="pd010">2019-11-12 </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">{{ content.time }}</span>
              <span class="pd010 color_time">2019-12-12 </span>
              <span
                >仅剩<span class="color_over">{{ currenttime[indexs] }}</span
                >天</span
              >
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">已缴人数：</span>
              <span class="pd010">{{ tablelength }} / {{ totallength }} </span>
              <van-divider dashed></van-divider>
            </div>
            <div class="inline_box fc-black">
              <span class="fc6 fs14">未缴人数：</span>
              <span class="pd010">{{ peole_gap }} </span>
              <van-divider dashed></van-divider>
            </div>
          </li>
        </ul>
        <router-link to="/uploadpay"
          ><Empty v-if="false1 == false && activeName == 2"></Empty
        ></router-link>
      </van-tab>
    </van-tabs>
    <van-button
      type="primary"
      size="large"
      class="btn_bottom"
      v-show="activeName == 0"
      @click="Onadd"
      >发起缴费</van-button
    >
    <Dialog
      :getobj="childrenlist"
      :dialogShow="dialogShow"
      @childByValue="childByValue"
      v-model="dialogShow"
    ></Dialog>
    <!-- </van-dialog> -->
  </div>
</template>

<script>
import apis from "@/apis";
import moment from "moment";
import Dialog from "@/views/classpay/components/Dialog";
import Empty from "@/components/Empty";

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
      tablelength: "",
      totallength: 45,
      dialogShow: false,
      childrenlist: [],
      list: [
        {
          title: "已发起",
          name: 0,
          content: []
        },
        {
          title: "进行中",
          name: 1,
          content: []
        },
        {
          title: "已结束",
          name: 2,
          content: []
        }
      ],
      content: {
        project: "缴费项目：",
        money: "缴费金额：",
        explain: "备注说明：",
        time: "截至时间：",
        remind: "友情提醒："
      }
      // content1: ["缴费项目：", "缴费金额：", "备注说明：", "截至时间："]
    };
  },
  created() {
    this.getcontent();
  },
  components: { Dialog, Empty },
  computed: {
    gap() {
      return this.time_dis();
    },
    peole_gap() {
      return this.totallength - parseInt(this.tablelength);
    }
  },
  filters: {
    formatDate(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  },
  watch: {},
  methods: {
    //所有的可以从一个表里获取
    async getcontent() {
      if (this.activeName == 0) {
        let res = await apis.classpay();
        this.list[0].content = res.data.data;
        this.tablelength = this.list[0].content.length;
        let list0 = this.list[0].content;
        list0.forEach(e => {
          let timer = this.$moment(e.time).format("YYYY-MM-DD");
          this.newtime.push(timer);
        });
      } else if (this.activeName == 1) {
        let res = await apis.classpay();
        this.list[1].content = res.data.data;
      } else {
        let res = await apis.classpay();
        this.list[2].content = res.data.data;
      }
    },
    Ondetail(i) {
      this.$router.push({
        name: "noticeDetail",
        params: { id: this.list[this.activeName].content[i].id }
      });
    },
    Onadd() {
      this.$router.push({ name: "uploadapay" });
    },
    time_dis() {
      let end_time = Date.parse(new Date("2019-12-12"));
      this.newtime.forEach(e => {
        let now_time = Date.parse(new Date(e));
        if (end_time < now_time) {
          return (this._false1 = true);
        } else {
          //计算相差天数
          var time_dis = end_time - now_time;
          var days = Math.floor(time_dis / (24 * 3600 * 1000));
          this.currenttime.push(days);
          return days;
        }
      });
    },
    async Onedit(index) {
      this.id = index;
      let r = await apis.oddclasspay(this.id);
      this.childrenlist = r.data.data;
      console.log(this.childrenlist);
      this.dialogShow = !this.dialogShow;
    },
    childByValue(childValue) {
      this.dialogShow = !childValue.dialogShow;
    },
    async Ondel(index) {
      this.id = index;
      let r = await apis.deleteclasspay(this.id);
      console.log(r);
      this.reload();
    }
  }
};
</script>
