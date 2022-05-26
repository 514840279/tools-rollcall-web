<template>
  <div class="person-list">
    <div v-text="'当前班级：' + showClassName" class="className"></div>
    <el-button @click="toAdd()"> {{ title }}</el-button>
    <!-- <va-button @click="toRollCall()"> 点名</va-button> -->
    <el-button @click="toRollCall2()"> 点名</el-button>

    <el-row id="person-row">
      <el-col :span="4" v-for="(item, index) in datas" :key="index">
        <el-card>
          <el-card-title>
            <el-row class="row">
              <el-col :span="18" class="row-left">
                {{ item.no }}
              </el-col>
              <el-col :span="6" class="row-right">
                <a href="#" @click="del(item)">刪除</a>
              </el-col>
            </el-row>
          </el-card-title>
          <el-card-content @click="update(item)" class="ocard">
            <!-- <va-avatar size="150px" font-size="150" icon="person"></va-avatar> -->
            <el-avatar :size="150" class="abackg">
              <span class="avatar" v-text="showFirstChar(item.name)"></span>
            </el-avatar>
            <div class="name">
              <span>{{ item.name }}</span>
            </div>
          </el-card-content>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <el-dialog
    v-model="showModal"
    :title="title"
    :modal="true"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <PersonAdd
      v-if="showModal"
      :pid="pid"
      :item="item"
      :destroy-on-close="true"
      @closeAdd="closeModal"
    ></PersonAdd>
  </el-dialog>

  <el-dialog
    v-model="showRollCall"
    :fullscreen="true"
    :message="message"
    hide-default-actions
  >
    <RollCall v-if="showRollCall"></RollCall>
  </el-dialog>

  <el-dialog
    v-model="showRollCall2"
    fullscreen
    :message="message"
    max-width="none"
    hide-default-actions
  >
    <RollCall v-if="showRollCall2"></RollCall>
  </el-dialog>
</template>

<script>
import PersonAdd from "./Add";
import RollCall from "../RollCall";

export default {
  name: "person-list",
  components: { PersonAdd, RollCall },
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
          pageSize: 500,
        })
        .then((response) => {
          _this.datas = response.content;
          console.log(_this.datas);
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
    },
    toAdd() {
      this.item = {};
      this.showModal = true;
    },
    update(item) {
      this.item = item;
      this.showModal = true;
    },
    del(item) {
      let _this = this;
      this.$http
        .post("/rollcall/person/delete", item)
        .then((response) => {
          if (response) {
            _this.init();
          }
        })
        .catch((err) => {
          // TODO
          console.log(err);
        });
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
      if (item) {
        return item.substring(0, 1);
      } else {
        return "未知";
      }
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
  margin-top: 8px;
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
    background-color: beige;
    padding: 0px;
    width: 100%;
    border: 1px solid #c4d67b;
  }
  span {
    font-size: 28px;
  }
  .abackg {
    background-color: rgb(155, 194, 219);
    .avatar {
      font-size: 110px;
      :hover {
        margin-top: 5px;
      }
    }
  }

  .ocard {
    cursor: pointer;
  }
}
</style>
