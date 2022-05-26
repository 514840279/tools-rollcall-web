<template>
  <div id="person-add">
    <el-form label-width="120px" :model="params">
      <el-form-item label="工号">
        <el-input v-model="params.no" />
      </el-form-item>
      <el-form-item label="名稱">
        <el-input v-model="params.name" :error-messages="errorMessage" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">提交</el-button>

        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "personAdd",
  props: {
    pid: {
      type: String,
    },
    item: {
      type: Object,
    },
  },
  data() {
    return {
      params: {},
      errorMessage: "名称必填",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.params = this.item;
      this.params.classId = this.pid;
    },
    close() {
      this.$emit("closeAdd", false);
    },
    add() {
      let _this = this;
      this.$http
        .post("/rollcall/person/save", this.params)
        .then((data) => {
          console.log(data);
          _this.$emit("closeAdd", false);
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
    },
  },
};
</script>
