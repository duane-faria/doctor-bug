<template>
  <div class="md:flex">
    <side-bar v-if="!dontShowSideBar" />
    <router-view></router-view>
    <Spinner v-if="isLoading" />
    <notifications position="top left" class="mt-5"/>
  </div>
</template>

<script>
import SideBar from "@/components/side-bar";
import Spinner from "@/components/spinner";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { SideBar, Spinner },
  data: () => ({ loading: true }),
  computed: {
    ...mapGetters(["isLoading"]),
    dontShowSideBar() {
      const rules = ["Login", "Register", "NotFound"];
      return rules.indexOf(this.$route.name) !== -1;
    },
  },
};
</script>

<style></style>
