<template>
  <div id="class-room-add">
    <el-form label-width="120px" :model="params">
      <el-form-item label="名稱">
        <el-input v-model="params.name" />
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
  name: "ClassRoomAdd",
  props: {
    item: {
      type: Object,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      params: {},
    };
  },
  methods: {
    init() {
      this.params = this.item;
    },
    add() {
      let _this = this;
      this.$http
        .post("/rollcall/classRoom/save", this.params)
        .then((data) => {
          console.log(data);
          _this.$emit("closeAdd", false);
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
    },
    close() {
      this.$emit("closeAdd", false);
    },
  },
};
</script>
