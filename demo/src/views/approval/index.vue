<template>
  <div>
    <Approvaltabs></Approvaltabs>
    <router-link to="uploadapprove"
      ><van-button type="info" size="large" class="btn_bottom"
        >发表通知</van-button
      ></router-link
    >
  </div>
</template>

<script>
import Approvaltabs from "@/components/Approvaltabs";

export default {
  data() {
    return {};
  },
  created() {},
  components: { Approvaltabs },
  computed: {},
  watch: {},
  methods: {}
};
</script>
