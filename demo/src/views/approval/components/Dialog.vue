<template>
  <div class="pd10" v-if="getobj[0]">
    <van-dialog
      v-model="childDialogShow"
      title="编辑"
      show-cancel-button
      class="fc-black"
      @confirm="submitDialogBtn"
      @cancel="cancelDialogBtn"
    >
      <van-cell-group>
        <van-field
          rows="1"
          v-model="list[0].content"
          autosize
          label="审批内容："
          type="textarea"
          placeholder="请在此输入审批内容"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          rows="1"
          v-model="list[0].detailed"
          autosize
          label="审批详情："
          type="textarea"
          placeholder="请输入审批详情"
        />
      </van-cell-group>
      <van-radio-group v-model="list[0].opinion" class="df-center pd10">
        <div class="cell_font ">审批人意见：</div>
        <div class="mg010 df-center">
          <van-radio name="同意"
            ><span class="commom_green">同意</span></van-radio
          >
          <van-radio name="拒绝" class="mg010"
            ><span class="commom_red">拒绝</span></van-radio
          >
        </div>
      </van-radio-group>
      <van-cell-group>
        <van-field
          rows="1"
          v-model="list[0].remarks"
          autosize
          label="备注说明："
          type="textarea"
          placeholder="请输入备注说明"
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
      list: []
    };
  },
  created() {},
  beforeUpdate() {
    this.list = { ...this.getobj };
    console.log(this.list);
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
      apis.editapproval(this.list[0]).then(r => {
        console.log(r);
        console.log(this.list[0].id);
        this.reload();
      });
      if (this.list[0].opinion == "同意" || this.list[0].opinion == "拒绝") {
        apis.insertapprovaling(this.list[0]).then(() => {});
        apis.deleteapproval(this.list[0].id).then(() => {
          this.reload();
        });
      }
    }
  }
};
</script>
