<template>
  <va-card :max-width="none">
    <va-card-title>开始点名</va-card-title>
    <va-card-content>
      <div class="row">
        <div class="flex md2">
          <div class="left">
            <va-button color="info" class="mr-4" @click="start()" v-if="!startFlag"
              >开始点名</va-button
            >
            <va-button color="info" class="mr-4" @click="reset()" v-if="startFlag"
              >重置数据</va-button
            >
            <va-button color="info" class="mr-4" @click="pause()" v-if="!nextFlag"
              >暂停</va-button
            >
            <va-button color="info" class="mr-4" @click="next()" v-if="nextFlag"
              >继续</va-button
            >
          </div>
        </div>
        <div class="flex md6">
          <div class="middle">
            <!-- <va-avatar size="150px" font-size="150" icon="person"></va-avatar> -->
            <va-avatar size="600px" font-size="200px" :color="color">{{
              showFirstChar(item.name, 3)
            }}</va-avatar>
            <div class="name">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="flex md3">
          <div class="righe">
            <div class="row" v-for="(per, inc) in winPersons" :key="inc">
              <div class="flex md12">
                <va-avatar size="40px" font-size="20px" color="danger">{{
                  showFirstChar(per.name, 1)
                }}</va-avatar>
                <span class="mg">{{ per.no + "--" + per.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="(per, inc) in persons" :key="inc" class="flex md0.5">
          <va-avatar size="50px" font-size="10px">{{
            showFirstChar(per.name, 1)
          }}</va-avatar>
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>
<script>
export default {
  data() {
    return {
      item: {
        name: "",
      },
      color: "primary",
      persons: [],
      winPersons: [],
      longTime: 5000, // ms
      randTime: 100,
      startFlag: false,
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
      this.persons = this.$store.state.rollcall.persons;
      this.winPersons = [];
    },
    // 开始点名
    start() {
      this.startFlag = !this.startFlag;
      this.win();
    },
    win() {
      var size = this.persons.length - 1;
      var times = setInterval(() => {
        var index = Math.round(Math.random() * size);
        this.item = this.persons[index];
        if (this.count <= 0) {
          this.color = "danger";
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
      this.color = "primary";
      this.win();
    },
    // 重置数据
    reset() {
      this.startFlag = !this.startFlag;
      for (let index = 0; index < this.winPersons.length; index++) {
        const element = this.winPersons[index];
        this.persons.push(element);
      }
      this.winPersons = [];
      this.item = {
        name: "",
      };
      this.color = "primary";
    },
    // 头像里展示的字符长度
    showFirstChar(item, len) {
      if (item) {
        return item.substring(0, len);
      }
    },
  },
  computed: {
    getPersons() {
      return this.$store.state.rollcall.persons;
    },
  },
  watch: {
    getPersons() {
      this.persons = this.$store.state.rollcall.persons;
    },
  },
};
</script>
<style lang="scss" scoped>
.mg {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 200;
}
</style>
