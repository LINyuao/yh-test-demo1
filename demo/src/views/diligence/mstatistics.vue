<template>
  <div id="echarts">
    <div class="circle mg100">
      <ul class="circle_table">
        <li>
          <van-circle
            v-model="currentRate"
            :stroke-width="80"
            :color="gradientColor"
            size="80px"
            text="40人"
          />
          <p class="fs14 fc3">未打卡</p>
        </li>
        <li>
          <van-circle
            v-model="currentRate"
            :stroke-width="80"
            :color="gradientColor2"
            size="80px"
            text="25人"
          />
          <p class="fs14 fc3">早退</p>
        </li>
        <li>
          <van-circle
            v-model="currentRate"
            :stroke-width="80"
            :color="gradientColor3"
            size="80px"
            text="18人"
          />
          <p class="fs14 fc3">迟到</p>
        </li>
      </ul>
    </div>
    <div class="bg_all">
      <van-tabs
        type="card"
        title-inactive-color="#1ba2ffff"
        color="#1ba2ffff"
        class="pd100"
      >
        <van-tab title="迟到"><Echarts></Echarts></van-tab>
        <van-tab title="早退"></van-tab>
        <van-tab title="未打卡">内容 3</van-tab>
      </van-tabs>
    </div>
    <div class=" bg_all mg-t10">
      <van-cell title="非正常考勤日" />
      <ul class="fc3 ">
        <li class="row-bettow pd10 bb">
          <div class="df-center">
            <div class="ball mg010"></div>
            <span>2017-02-18</span>
          </div>

          <div>
            <span class="attendance">
              出勤率:
            </span>
            <span>
              95%
            </span>
          </div>
        </li>
        <li class="row-bettow pd10 bb">
          <div class="df-center">
            <div class="ball mg010"></div>
            <span>2017-02-18</span>
          </div>

          <div>
            <span class="attendance">
              出勤率:
            </span>
            <span>
              95%
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/Echarts";
export default {
  data() {
    return {
      currentRate: 100,
      gradientColor: {
        "0%": "#11C59D",
        "100%": "#51E8C8"
      },
      gradientColor2: {
        "0%": "#3DE7FF",
        "100%": "#329BFF"
      },
      gradientColor3: {
        "0%": "#FB6722",
        "100%": "#FECF84"
      }
    };
  },
  created() {},
  components: { Echarts },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.circle {
  display: flex;
  align-items: center;
  width: 100%;
  height: 130px;
  background: rgba(238, 247, 253, 1);
  .circle_table {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }
}
.ball {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(26, 202, 163, 1);
}
.attendance {
  color: #fb6c26;
}
</style>
