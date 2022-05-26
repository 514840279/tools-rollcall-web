<template>
  <div class="class-room">
    <el-row class="row">
      <el-col :span="12">
        <el-button type="success" plain @click="toAdd()"> 添加班級</el-button>
      </el-col>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :action="url"
          :auto-upload="true"
          :accept="['.xls', '.xlsx']"
          :before-upload="beforeUpload"
          :on-success="toLoad"
          :on-error="showError"
        >
          <template #trigger>
            <el-button type="success" plain>上传文件</el-button>
          </template>
        </el-upload>
      </el-col>
    </el-row>

    <el-row class="crow" v-for="row in datas" :key="row.uuid">
      <el-col :span="18">
        <span class="olink" @click="showPerson(row)">{{ row.name }}</span>
      </el-col>
      <el-col :span="6">
        <a href="#" @click="update(row)">修改</a>
      </el-col>
    </el-row>
  </div>

  <el-dialog
    v-model="showModal"
    :title="title"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <ClassRoomAdd
      v-if="showModal"
      @closeAdd="closeModal"
      :item="item"
      :destroy-on-close="false"
    ></ClassRoomAdd>
  </el-dialog>
</template>

<script>
import ClassRoomAdd from "./Add";
// import axios from "axios";

export default {
  name: "class-room",
  components: { ClassRoomAdd },
  props: {
    msg: String,
  },
  data() {
    return {
      name: "class",
      showModal: false,
      url: "/rollcall/file/uploadFile",
      datas: [],
      item: {},
      single: [],
      upLoadProgress: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      this.$http
        .post("/rollcall/classRoom/page", {
          sortList: [{ sortName: "createTime", sortOrder: "desc" }],
        })
        .then((data) => {
          _this.datas = data.content;
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
    },
    toAdd() {
      this.showModal = true;
    },
    toAddFile() {},

    update(row) {
      this.item = row;
      this.showModal = true;
    },
    closeModal(val) {
      this.init();
      this.showModal = val;
    },
    // 上傳前校驗類型
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["xls", "xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message({ message: "上传文件只能是 .xls/.xlsx", type: "warning" });
        return false;
      }
    },
    showPerson(row) {
      this.$emit("toShowPerson", true);
      this.$store.commit("rollcall/setClassRoom", row);
      // this.$store.commit("rollcall/setMess", row.uuid);
    },
    toLoad(response, uploadFile) {
      this.$message({
        message: "【" + uploadFile.name + "】已經完成上傳，正在後台導入數，請稍後查看。",
        type: "primary",
      });
      let params = { path: response.data[0] };

      let _this = this;
      this.$http
        .post("/rollcall/file/load", params)
        .then((resp) => {
          console.log(resp);
          _this.$message({
            message:
              "【" + uploadFile.name + "】數據已經加載完成，請刷新頁面查看最新數據",
            type: "primary",
          });
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
    },
    showError(error, uploadFile) {
      this.$message({
        message: "【" + uploadFile.name + "】上傳失敗，消息:" + error.message,
        type: "error",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.class-room {
  text-align: center;
}
.crow {
  margin-top: 10px;
  font-size: 20px;
}
.olink {
  color: blue;
  cursor: pointer;
}
</style>
