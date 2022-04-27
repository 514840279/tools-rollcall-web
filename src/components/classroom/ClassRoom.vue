<template>
  <div class="hello">
    <va-button @click="toAdd()"> {{ title }} </va-button>

    <table style="width: 100%" class="va-table center">
      <tbody>
        <tr v-for="row in datas" :key="row.uuid">
          <td style="width: 100%; text-align: center" @click="showPerson(row)">
            {{ row.name }}
          </td>
        </tr>
      </tbody>
    </table>

    <va-modal
      v-model="showModal"
      :title="title"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <ClassRoomAdd v-if="showModal" @closeAdd="closeModal"></ClassRoomAdd>
    </va-modal>
  </div>
</template>

<script>
import ClassRoomAdd from "./Add";

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
      title: "添加班級",
      datas: [],
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
    closeModal(val) {
      this.init();
      this.showModal = val;
    },
    showPerson(row) {
      this.$emit("toShowPerson", row);
    },
  },
};
</script>
