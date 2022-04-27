<template>
  <div class="hello">{{ showPid }}</div>
</template>

<script>
export default {
  name: "person-list",
  props: {
    classid: String,
  },
  data() {
    return {
      pid: "",
    };
  },
  created() {
    console.log("123", this.pid);
  },
  mounted() {
    this.pid = this.classid;
    console.log("123", this.pid);
  },
  methods: {
    init() {},
  },
  computed: {
    showPid() {
      return 1;
    },
  },
};
</script>
