<template>
  <div class="home">
    <el-row>
      <el-col :span="4">
        <ClassRoom @toShowPerson="toShowPerson" />
      </el-col>
      <el-col :span="20">
        <PersonList v-if="showPerson" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonList from "@/components/person/Person.vue";
import ClassRoom from "@/components/classroom/ClassRoom.vue";

export default {
  name: "HomeView",
  components: {
    PersonList,
    ClassRoom,
  },
  data() {
    return {
      showPerson: false,
      message: "",
    };
  },
  mounted() {},
  methods: {
    toShowPerson(val) {
      this.showPerson = val;
    },
  },
};
</script>
