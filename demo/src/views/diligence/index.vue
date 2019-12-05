<template>
  <div class="diligence">
    <form action="/">
      <van-search
        class="_search"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="classform pd10">
      <ul>
        <li>
          <div class="public_blue crown">学生</div>
          <div class="public_green crown">上午</div>
          <div class="public_red crown">下午</div>
          <div class="public_orange crown">晚自习</div>
        </li>
        <li class=" bg_all" v-for="(item, index) in table" :key="index">
          <div class="crown fc-black">
            <div>{{ item.name }}</div>
          </div>
          <div class="crown bg_morning">
            <p class="fc-black">{{ item.morning }}</p>
            <p class="commom_red">{{ item.afternoon }}</p>
          </div>
          <div class="crown bg_Afternoon">
            <p class="fc-black">{{ item.morning }}</p>
            <p class="commom_red">{{ item.afternoon }}</p>
          </div>
          <div class="crown bg_evening">
            <p class="fc9">{{ item.evening }}</p>
            <p class="commom_red">{{ item.afternoon }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      table: [
        {
          name: "林晓晓",
          morning: "8:30",
          afternoon: "10:30",
          evening: "未打卡"
        },
        {
          name: "林晓晓",
          morning: "8:30",
          afternoon: "10:30",
          evening: "未打卡"
        },
        {
          name: "林晓晓",
          morning: "8:30",
          afternoon: "10:30",
          evening: "未打卡"
        },
        {
          name: "林晓晓",
          morning: "8:30",
          afternoon: "10:30",
          evening: "未打卡"
        }
      ]
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    onSearch() {},
    onCancel() {}
  }
};
</script>
