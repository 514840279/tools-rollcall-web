<template>
  <div class="home">
    <div class="row">
      <div class="flex md2 class-room">
        <ClassRoom @toShowPerson="toShowPerson" />
      </div>
      <div class="flex md10">
        <PersonList v-if="showPerson" />
      </div>
    </div>
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
