<template>
  <div id="class-room-add">
    <va-form style="width: 300px" tag="form" @submit.prevent="add">
      <va-input v-model="params.name" label="名稱" />
      <va-button type="submit" class="mt-2"> 提交 </va-button>
    </va-form>
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
  },
};
</script>
