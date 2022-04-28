<template>
  <va-card>
    <va-card-title>{{ item.no }}</va-card-title>
    <va-card-content>
      <!-- <va-avatar size="150px" font-size="150" icon="person"></va-avatar> -->
      <va-avatar size="600px" font-size="200px" :color="color">{{
        showFirstChar(item.name)
      }}</va-avatar>
      <div class="name">
        <span>{{ item.name }}</span>
      </div>
      <div><span class="time">{{}}</span></div>
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
      longTime: 5000, // ms
      randTime: 100,
    };
  },
  mounted() {
    this.persons = this.$store.state.rollcall.persons;
    this.init();
  },
  methods: {
    init() {
      this.count = this.longTime / this.randTime; //赋值3秒
      var size = this.persons.length - 1;
      var times = setInterval(() => {
        this.count--; //递减
        var index = Math.round(Math.random() * size);
        this.item = this.persons[index];
        if (this.count <= 0) {
          this.color = "danger";
          clearInterval(times);
        }
      }, this.randTime); //1000毫秒后执行
    },
    showFirstChar(item) {
      if (item) {
        return item.substring(0, 3);
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
