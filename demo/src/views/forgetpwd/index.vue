<template>
  <div class="login pd20">
    <div class="login-box">
      <van-cell-group>
        <van-field
          v-model="user.username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="user.password"
          required
          clearable
          label="密码"
          placeholder="请输入密码"
        />
        <van-field
          v-model="user.password_again"
          required
          clearable
          label="确认密码"
          placeholder="请确认密码"
        />
      </van-cell-group>
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        to="login"
        size="large"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        password: "",
        username: "",
        password_again: ""
      }
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
