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
          :error-message="user.userErr"
          @input="Onchangemsg"
        />

        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :error-message="user.pwdErr"
          @input="Onchangemsg"
        />
      </van-cell-group>
      <div class="login-more">
        <router-link to="/register">注册账号</router-link>
        <router-link to="/forgetpwd">忘记密码</router-link>
        <!-- <a href="javaScript:;">注册账号</a>
        <a href="javaScript:;">忘记密码</a> -->
      </div>
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        size="large"
        @click="logining"
        >登陆</van-button
      >
    </div>
  </div>
</template>

<script>
import apis from "@/apis";
import { localStorage } from "@/storage";
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        password: "",
        username: "",
        userErr: "",
        pwdErr: ""
      },
      data: null
    };
  },
  created() {},
  components: {},
  computed: {
    // ...mapGetters(["isLogin"])
  },
  watch: {},
  methods: {
    logining() {
      let userobj = { ...this.user };
      if (userobj.username === "") {
        this.user.userErr = "用户名不能为空";
        return false;
      }
      if (userobj.password === "") {
        this.user.pwdErr = "密码不能为空";
        return false;
      }
      apis.login(userobj).then(res => {
        this.data = res.data.data;
        if (this.data == "") {
          this.$toast.fail("账号输入错误");
        }
        this.data.forEach(e => {
          if (
            e.username == userobj.username &&
            e.password == userobj.password
          ) {
            if (res.data.status == "200") {
              this.$store.dispatch("setUser", true);
              this.$store.commit("userDate", res.data.data[0]);
              localStorage.saveToLocal("userDate", res.data.data[0]);
              localStorage.saveToLocal("token", "islogin");
              this.$toast.success("登陆成功");
              setTimeout(() => {
                this.$router.push({ name: "home" });
              }, 1000);
              console.log("登陆成功");
            }
          } else if (e.username != userobj.username) {
            this.$toast.fail("账号输入错误");
          } else {
            this.$toast.fail("密码输入错误");
          }
        });
      });
    },
    Onchangemsg() {
      let userobj = { ...this.user };
      if (userobj.username != "") {
        this.user.userErr = "";
      }
      if (userobj.password != "") {
        this.user.pwdErr = "";
      }
    }
  }
};
</script>
