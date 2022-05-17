<template>
  <div class="person-list">
    <div v-text="'当前班级：' + showClassName" class="className"></div>
    <va-button @click="toAdd()"> {{ title }}</va-button>
    <!-- <va-button @click="toRollCall()"> 点名</va-button> -->
    <va-button @click="toRollCall2()"> 点名</va-button>

    <div id="person-row" class="row">
      <div class="flex md4 lg3" v-for="(item, index) in datas" :key="index">
        <va-card>
          <va-card-title>
            <div class="row">
              <div class="flex md10 row-left">
                {{ item.no }}
              </div>
              <div class="flex md2 row-right">
                <a href="#" @click="update(item)">修改</a>
              </div>
            </div></va-card-title
          >
          <va-card-content>
            <!-- <va-avatar size="150px" font-size="150" icon="person"></va-avatar> -->
            <va-avatar size="150px" font-size="100px">
              <span v-text="showFirstChar(item.name)"></span>
            </va-avatar>
            <div class="name">
              <span>{{ item.name }}</span>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>

  <va-modal v-model="showModal" :title="title" hide-default-actions overlay-opacity="0.2">
    <PersonAdd
      v-if="showModal"
      :pid="pid"
      :item="item"
      @closeAdd="closeModal"
    ></PersonAdd>
  </va-modal>

  <va-modal v-model="showRollCall" fullscreen :message="message" hide-default-actions>
    <RollCall v-if="showRollCall"></RollCall>
  </va-modal>

  <va-modal
    v-model="showRollCall2"
    fullscreen
    :message="message"
    max-width="none"
    hide-default-actions
  >
    <RollCall2 v-if="showRollCall2"></RollCall2>
  </va-modal>
</template>

<script>
import PersonAdd from "./Add";
import RollCall from "../RollCall";
import RollCall2 from "../RollCall2";

export default {
  name: "person-list",
  components: { PersonAdd, RollCall, RollCall2 },
  data() {
    return {
      pid: "",
      title: "添加学生",
      showModal: false,
      showRollCall: false,
      showRollCall2: false,
      person: {},
      datas: [],
      item: {},
    };
  },
  mounted() {
    this.pid = this.$store.state.rollcall.classRoom.uuid;
    this.init();
  },
  methods: {
    init() {
      let _this = this;

      this.$http
        .post("/rollcall/person/page", {
          info: { classId: this.pid },
          sortList: [{ sortName: "createTime", sortOrder: "desc" }],
        })
        .then((data) => {
          _this.datas = data.content;
          console.log(_this.datas);
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
    },
    toAdd() {
      this.showModal = true;
    },
    update(item) {
      this.item = item;
      this.showModal = true;
    },
    closeModal(val) {
      this.init();
      this.showModal = val;
    },
    toRollCall() {
      this.$store.commit("rollcall/setPersonList", this.datas);
      this.showRollCall = true;
    },
    toRollCall2() {
      this.$store.commit("rollcall/setPersonList", this.datas);
      this.showRollCall2 = true;
    },
    showFirstChar(item) {
      return item.substring(0, 1);
    },
  },
  computed: {
    showPid() {
      return this.$store.state.rollcall.classRoom.uuid;
    },
    showClassName() {
      return this.$store.state.rollcall.classRoom.name;
    },
  },
  watch: {
    showPid() {
      this.pid = this.$store.state.rollcall.classRoom.uuid;
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
#person-row {
  width: 100%;
  text-align: center;
  .row-left {
    text-align: left;
  }
  .row-right {
    text-align: right;
  }
  .name {
    margin-top: 15px;
  }
  span {
    font-size: 28px;
  }
  i {
    font-size: 150px;
  }
}
</style>
