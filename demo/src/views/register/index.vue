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
          ref="user"
        />
        <!-- <van-field
          v-model="user.username"
          required
          clearable
          label="真实姓名"
          placeholder="请输入真实姓名"
        /> -->
        <van-field
          v-model="user.school"
          required
          clearable
          label="所在学校"
          placeholder="请输入所在学校"
        />

        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :error-message="user.pwdErr"
          @input="Onchangemsg"
          ref="user"
        />
      </van-cell-group>
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="Onlogin"
        size="large"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import apis from "@/apis";

export default {
  data() {
    return {
      user: {
        password: "",
        username: "",
        school: "",
        userErr: "",
        pwdErr: ""
      },
      data: null
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    Onchangemsg() {
      let userobj = {
        username: this.user.username,
        password: this.user.password
      };
      if (userobj.username != "") {
        this.user.userErr = "";
      }
      if (userobj.password != "") {
        this.user.pwdErr = "";
      }
    },
    Onlogin() {
      let userobj = { ...this.user };
      if (userobj.username === "") {
        this.user.userErr = "用户名不能为空";
        return false;
      }
      if (userobj.password === "") {
        this.user.pwdErr = "密码不能为空";
        return false;
      }
      // let userobj = {
      //   username: this.user.username,
      //   password: this.user.password
      // };
      // let _val = this.$refs.user.value;
      // console.log(userobj);
      apis.login(userobj).then(r => {
        this.data = r.data.data;
        console.log(this.data);
        if (this.data != "") {
          this.$toast.fail("用户名已被注册");
        } else {
          apis.register(userobj).then(res => {
            console.log(res);
            if (res.data.status == 200) {
              this.$toast.success("注册成功");
              setTimeout(() => {
                this.$router.push({ name: "login" });
              }, 1000);
            }
          });
        }
        // this.data.forEach(e => {
        //   if (e.username == userobj.username) {
        //   }
        // });
        console.log(r);
      });
    }
  }
};
</script>
