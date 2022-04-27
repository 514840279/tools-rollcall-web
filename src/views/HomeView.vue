<template>
  <div class="home">
    <div class="row">
      <div class="flex md2 class-room">
        <ClassRoom @toShowPerson="toShowPerson" />
      </div>
      <div class="flex md10">
        <PersonList v-if="showPerson" :classid="classid" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonList from "@/components/Person.vue";
import ClassRoom from "@/components/classroom/ClassRoom.vue";

export default {
  name: "HomeView",
  components: {
    PersonList,
    ClassRoom,
  },
  data() {
    return {
      classid: "",
      showPerson: false,
    };
  },
  methods: {
    toShowPerson(row) {
      console.log(row);
      this.showPerson = false;
      this.classid = row.uuid;
      this.showPerson = true;
    },
  },
};
</script>
