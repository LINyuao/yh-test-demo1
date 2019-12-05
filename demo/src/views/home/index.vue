<template>
  <div class="homepage">
    <div class="homepage_header mg-b10 pd010">
      <div class="homepage_header_left">
        <div class="homepage_header_picture">
          <div
            class="pic"
            :class="[alluserdata ? 'pic_commom' : 'pic_nmdl']"
          ></div>
        </div>
      </div>
      <div class="homepage_header_right">
        <ul v-if="alluserdata ? true : false" class="wp100">
          <li class="fs18">{{ alluserdata.username }}</li>
          <li>
            {{ alluserdata.school }} <span v-show="alluserdata.identity">,</span
            >{{ alluserdata.identity }}
          </li>
          <li class="tr">{{ alluserdata.class }}</li>
        </ul>
        <div v-else>
          账号未登录
        </div>
      </div>
    </div>
    <div class="homepage_content_frist mg-b10">
      <div class="homepage_content_header pd010">
        <van-icon name="edit" class="homepage_content_icon" />
        <span class="homepage_content_header_font">常态事务</span>
      </div>
      <van-grid :column-num="4" class="homepage_content_boxlist">
        <van-grid-item
          :text="item.text"
          v-for="(item, index) in imageList"
          :key="index"
          :icon="item.img"
          :to="item.go"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <div class="homepage_content_frist mg-b10">
      <div class="homepage_content_header pd010">
        <van-icon name="wap-home-o" />
        <span class="homepage_content_header_font">班主任事务</span>
      </div>
      <van-grid :column-num="4" class="homepage_content_boxlist">
        <van-grid-item
          :text="item.text"
          v-for="(item, index) in imageLists"
          :key="index"
          :icon="item.img"
          :to="item.go"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { localStorage } from "@/storage";
export default {
  data() {
    return {
      logining: false,
      imageList: [
        {
          img: require("../../images/通知公告.png"),
          text: "通知公告",
          go: "/notice",
          dot: "dot"
        },
        {
          img: require("../../images/作业.png"),
          text: "学生作业",
          go: "/task"
        },
        {
          img: require("../../images/成绩.png"),
          text: "学生成绩"
        },
        {
          img: require("../../images/办审批.png"),
          text: "办公审批",
          go: "/approval"
        }
      ],
      imageLists: [
        {
          img: require("../../images/考勤.png"),
          text: "班级通知",
          go: "/classes"
        },
        {
          img: require("../../images/班级缴费.png"),
          text: "班级缴费",
          go: "/classpay"
        },
        {
          img: require("../../images/成绩.png"),
          text: "班级请假",
          go: "leave"
        },
        {
          img: require("../../images/通知公告.png"),
          text: "班级考勤",
          go: "diligence"
        },
        {
          img: require("../../images/班级相册.png"),
          text: "班级相册"
        },
        {
          img: require("../../images/课程.png"),
          text: "班级课程"
        },
        {
          img: require("../../images/定位.png"),
          text: "学生定位",
          go: "location"
        },
        {
          img: require("../../images/学生求救.png"),
          text: "学生求救"
        }
      ]
    };
  },
  created() {},
  components: {},
  computed: {
    alluserdata() {
      return localStorage.loadFromLocal("userDate");
    }
  },
  watch: {},
  methods: {}
};
</script>
