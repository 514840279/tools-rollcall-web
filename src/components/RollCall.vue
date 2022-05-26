<template>
  <el-row class="row content">
    <el-col :span="4">
      <div class="righe">
        <div class="row" v-for="(per, inc) in winPersons" :key="inc">
          <div class="flex md12">
            <el-avatar :size="40" class="abackg-danger">
              <span class="avatar" v-text="showFirstChar(per.name, 1)"></span>
            </el-avatar>
            <span class="mg">{{ per.no + "--" + per.name }}</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="middle">
        <!-- <va-avatar size="150px" font-size="150" icon="person"></va-avatar> -->
        <el-avatar :size="550" :class="color">
          <span class="bvatar" v-text="showFirstChar(item.name, 3)"></span
        ></el-avatar>
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <el-col :span="24">
        <el-button type="primary abutton" plain @click="reset()">重置</el-button>
      </el-col>
      <el-col :span="24">
        <el-button type="primary abutton" plain @click="pause()" v-if="nextFlag"
          >暂停</el-button
        >
      </el-col>
      <el-col :span="24">
        <el-button type="primary abutton" plain @click="next()" v-if="!nextFlag"
          >开始</el-button
        >
      </el-col>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="1" v-for="(per, inc) in persons" :key="inc">
      <el-avatar :size="50" class="cbackg">
        <span class="cvatar" v-text="showFirstChar(per.name, 1)"></span>
      </el-avatar>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      item: {
        name: "",
      },
      color: "bbackg",
      persons: [],
      winPersons: [],
      nextFlag: false,
      count: 1,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化状态
    init() {
      this.copyPerson();
      this.winPersons = [];
    },
    win() {
      var size = this.persons.length - 1;
      var times = setInterval(() => {
        var index = Math.round(Math.random() * size);
        this.item = this.persons[index];
        if (this.count <= 0) {
          this.color = "bbackg-danger";
          this.winPersons.push(this.item);
          this.persons.splice(index, 1);
          clearInterval(times);
        }
      }, this.randTime); //1000毫秒后执行
    },
    // 点名
    pause() {
      this.nextFlag = !this.nextFlag;
      this.count = 0;
    },
    next() {
      this.nextFlag = !this.nextFlag;
      this.count = 1;
      this.color = "bbackg";
      this.win();
    },
    // 重置数据
    reset() {
      this.nextFlag = false;
      this.startFlag = !this.startFlag;
      this.copyPerson();
      this.winPersons = [];
      this.item = {
        name: "",
      };
      this.color = "primary";
    },
    copyPerson() {
      this.persons = [];
      this.$store.state.rollcall.persons.forEach((e) => {
        this.persons.push(e);
      });
    },
    // 头像里展示的字符长度
    showFirstChar(item, len) {
      if (item) {
        return item.substring(0, len);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.content {
  min-height: 620px;
  .abutton {
    width: 120px;
    text-align: center;
    margin-top: 8px;
  }
  .abackg-danger {
    background-color: rgb(233, 73, 108);
    color: #000;
    .avatar {
      font-size: 20px;
    }
  }
}
.middle {
  text-align: center;
  font-size: 100px;
  .name {
    font-size: 50px;
  }
  .bbackg {
    background-color: rgb(155, 194, 219);
  }
  .bbackg-danger {
    background-color: rgb(233, 150, 73);
    color: #000;
  }

  .bvatar {
    font-size: 130px;
    // font: rgb(134, 230, 230);
  }
}
.cbackg {
  background-color: rgb(155, 194, 219);
  .cvatar {
    font-size: 18px;
  }
}
.mg {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 200;
}
</style>
