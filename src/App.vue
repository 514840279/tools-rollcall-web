<template>
  <div id="app">
    <div class="row">
      <div class="flex md2 class-room">
        <PersonList msg="Welcome to Your Vue.js App" />
      </div>
      <div class="flex md10">
        <ClassRoom msg="Welcome to Your Vue.js App" />
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from "./components/Person.vue";
import ClassRoom from "./components/ClassRoom.vue";

export default {
  name: "App",
  components: {
    PersonList,
    ClassRoom,
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .class-room {
    min-height: 560px;
  }
}
</style>
