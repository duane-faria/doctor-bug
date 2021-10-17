<template>
  <div class="flex">
    <side-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from "@/components/side-bar";

export default {
  name: "App",
  components: { SideBar },
};
</script>

<style></style>
