<template>
  <div id="app" class="bg-primary-light relative text-gray-200 h-screen">
    <Navbar />
    <div class="flex">
      <SideBar :files="fileList" />
      <div class="flex flex-1 ml-64 mt-12 overflow-y-auto px-6">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
export default defineComponent({
  components: { Navbar, SideBar },
  data() {
    return {
      fileList: [],
    };
  },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap");
body {
  -webkit-app-region: drag;
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#sidebar {
  -webkit-app-region: no-drag;
}
</style>
