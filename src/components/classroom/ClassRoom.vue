<template>
  <div class="class-room">
    <va-button @click="toAdd()"> {{ title }}</va-button>

    <table style="width: 100%" class="va-table center">
      <tbody>
        <tr v-for="row in datas" :key="row.uuid">
          <td style="width: 100%; text-align: center">
            <div class="row">
              <div class="flex md6">
                <span @click="showPerson(row)">{{ row.name }}</span>
              </div>
              <div class="flex md4">
                <a href="#" @click="update(row)">修改</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <va-modal v-model="showModal" :title="title" hide-default-actions overlay-opacity="0.2">
    <ClassRoomAdd v-if="showModal" @closeAdd="closeModal" :item="item"></ClassRoomAdd>
  </va-modal>
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
      item: {},
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
    update(row) {
      this.item = row;
      this.showModal = true;
    },
    closeModal(val) {
      this.init();
      this.showModal = val;
    },
    showPerson(row) {
      this.$emit("toShowPerson", true);
      this.$store.commit("rollcall/setClassRoom", row);
      // this.$store.commit("rollcall/setMess", row.uuid);
    },
  },
};
</script>
<style lang="scss" scoped>
.class-room {
  text-align: center;
}
</style>
