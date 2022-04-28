<template>
  <div id="person-add">
    <va-form style="width: 300px" tag="form" @submit.prevent="add">
      <va-input v-model="params.name" label="名稱" :error-messages="errorMessage" />
      <va-input v-model="params.no" label="工号" />
      <va-button type="submit" class="mt-2"> 提交 </va-button>
    </va-form>
  </div>
</template>
<script>
export default {
  name: "personAdd",
  props: {
    pid: {
      type: String,
    },
  },
  data() {
    return {
      params: {},
      errorMessage: "名称必填",
    };
  },
  mounted() {
    this.params.classId = this.pid;
  },
  methods: {
    init() {},
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
