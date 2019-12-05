<template>
  <div>
    <van-cell title="图片">
      <template slot="label">
        <van-uploader
          v-model="fileList"
          multiple
          preview-size="50px"
          @input="Onpic"
        />
      </template>
    </van-cell>
    <van-cell title="文件附件">
      <template slot="label">
        <!-- <van-uploader
          v-model="fileList1"
          multiple
          preview-size="50px"
          :deletable="buer"d
          :before-read="beforeRead"
        >
        </van-uploader> -->
        <van-uploader preview-size="50px"></van-uploader>
        <input type="file" name="" id="" @change="previewFiles" />
        <div class="preview">
          <div class="df-col">
            <p
              v-for="(item, index) in list.icon"
              :key="index"
              style="display: inline;"
            >
              <img
                v-if="item == 'pptx.jpg'"
                src="../../../images/pptx.jpg"
                alt=""
                width="16px"
                height="16px"
              />
              <img
                v-if="item == 'xlsx.jpg'"
                src="../../../images/xlsx.jpg"
                alt=""
                width="16px"
                height="16px"
              />
              <img
                v-if="item == 'word.jpg'"
                src="../../../images/word.jpg"
                alt=""
                width="16px"
                height="16px"
              />
            </p>
          </div>
          <div>
            <p v-for="(item, index) in list.text" :key="index + 5">
              {{ item }}
            </p>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    pic: {
      type: String
    }
  },
  data() {
    return {
      fileList: [],
      fileList1: [],
      buer: false,
      list: {
        icon: [],
        text: []
      },
      imgfile: ""
    };
  },
  created() {},
  components: {},
  computed: {},
  watch: {
    fileList1(n) {
      console.log(n);
    }
  },
  methods: {
    beforeRead(file) {
      console.log(file);
      let xlsx =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      let doc = "application/msword";
      let pptx =
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      console.log(xlsx, doc, pptx);
      if (file.type == xlsx) {
        return true;
      } else if (file.type == doc) {
        return true;
      } else if (file.type == pptx) {
        return true;
      } else {
        return false;
      }
    },
    previewFiles(e) {
      let values = e.target.value.slice(12);
      let Suffix = values.substr(values.lastIndexOf("."));
      if (Suffix == ".xlsx") {
        this.list.icon.push("xlsx.jpg");
      }
      if (Suffix == ".pptx") {
        this.list.icon.push("pptx.jpg");
      }
      if (Suffix == ".doc") {
        this.list.icon.push("word.jpg");
      }
      this.list.text.push(values);
      this.$emit("flie", this.list.icon, this.list.text);
      console.log(this.list.text, this.list.icon, Suffix);
    },
    Onpic(e) {
      this.imgfile = e[0].file.name;
      this.$emit("imgfile", this.imgfile);
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
input[type="file"] {
  width: 50px;
  height: 50px;
  position: relative;
  top: -22px;
  left: -58px;
  opacity: 0;
}
.preview {
  display: flex;
}
</style>
