<template>
  <div class="pd10" v-if="getobj[0]">
    <van-dialog
      v-model="childDialogShow"
      title="编辑"
      show-cancel-button
      class="fc-black"
      @confirm="submitDialogBtn"
      @cancel="cancelDialogBtn"
      @open="getdata"
    >
      <van-cell-group>
        <van-field
          rows="1"
          v-model="list[0].project"
          autosize
          label="缴费项目："
          type="textarea"
          placeholder="请在此输入缴费项目"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          rows="1"
          v-model="list[0].explains"
          autosize
          label="备注说明："
          type="textarea"
          placeholder="请输入留言"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import apis from "@/apis";
// 全局注册
Vue.use(Dialog);
export default {
  inject: ["reload"],
  props: {
    getobj: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dialogShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      newlist: {
        project: "",
        explains: ""
      }
    };
  },
  created() {},
  beforeUpdate() {
    this.list = { ...this.getobj };
    // console.log(this.list);
  },
  components: {},
  computed: {
    dialogShowAndCode() {
      return {
        dialogShow: this.childDialogShow
      };
    },
    childDialogShow: {
      get() {
        return this.dialogShow;
      },
      set() {
        // console.log(val);
      }
    }
  },
  watch: {},
  methods: {
    cancelDialogBtn() {
      // this.dialogShow = false; 这里直接修改props里面的值
      // this.$emit('childByValue', this.dialogShow); 传回父组件就会报错
      this.childDialogShow = false;
      this.$emit("childByValue", this.dialogShowAndCode);
    },
    submitDialogBtn() {
      this.childDialogShow = false;
      this.$emit("childByValue", this.dialogShowAndCode);
      apis.editclasspay(this.list[0]).then(() => {
        this.reload();
      });
    },
    getdata() {
      // this.list = { ...this.getobj };
      console.log(this.list);
    }
  }
};
</script>
