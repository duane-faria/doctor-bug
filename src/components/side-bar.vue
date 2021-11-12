<template>
  <div class="relative lg:min-h-screen md:flex">
    <!-- :class="{ 'min-h-screen absolute': openMobileMenu }" -->
    <!-- mobile menu bar -->
    <div class="custom-bg text-gray-100 flex justify-between md:hidden">
      <!-- logo -->
      <a href="#" class="block p-4 text-white font-bold">{{ projectTitle }}</a>

      <!-- mobile menu button -->
      <button
        class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
        @click="openMobileMenu = !openMobileMenu"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- sidebar -->
    <div
      :class="{ '-translate-x-full': !openMobileMenu }"
      class="sidebar min-h-screen custom-bg text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out"
    >
      <!-- logo -->
      <a href="#" class="text-white flex items-center space-x-2 px-4">
        <svg
          class="h-8 w-8 text-red-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
          <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
          <line x1="3" y1="13" x2="7" y2="13" />
          <line x1="17" y1="13" x2="21" y2="13" />
          <line x1="12" y1="20" x2="12" y2="14" />
          <line x1="4" y1="19" x2="7.35" y2="17" />
          <line x1="20" y1="19" x2="16.65" y2="17" />
          <line x1="4" y1="7" x2="7.75" y2="9.4" />
          <line x1="20" y1="7" x2="16.25" y2="9.4" />
        </svg>
        <span class="text-2xl"> {{ projectTitle }}</span>
      </a>

      <!-- nav -->
      <nav>
        <a
          @click="navigate(link.route)"
          :class="{ 'bg-red-500': isActive(link) }"
          class="cursor-pointer block py-2.5 px-4 rounded transition duration-200 hover:bg-red-500 hover:text-white"
          v-for="(link, index) in links"
          :key="link + index"
        >
          {{ link.name }}
        </a>
        <a
          @click="logout"
          class="cursor-pointer block py-2.5 px-4 rounded transition duration-200 hover:bg-red-500 hover:text-white"
        >
          Sair
        </a>
      </nav>
      <div class="flex flex-col pl-3 leading-7	">
        <h4 class="font-bold">Time</h4>
        <span> nome: {{ team.name }} </span>
        <span> código: {{ team.code }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import teamService from "../services/team";

export default {
  data: () => ({
    team: {
      name: "",
      code: ""
    },
    openMobileMenu: false,
    projectTitle: "bug doctor",
    activeMenu: 1,
    links: [
      {
        name: "Usuários",
        route: "Users"
      },
      {
        name: "Projetos",
        route: ["ProjectList", "BugList"]
      }
    ]
  }),
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    ...mapActions(["setUser"]),
    navigate(routeName) {
      let route = routeName;
      if (routeName instanceof Array) {
        route = route[0];
      }
      this.$router.push({ name: route });
      if (this.openMobileMenu) {
        this.openMobileMenu = false;
      }
    },
    isActive(link) {
      const routeName = this.$route.name;

      if (link.route instanceof Array) {
        return link.route.includes(routeName);
      }

      return link.route === routeName;
    },
    logout() {
      this.setUser(null);
      this.$router.push({ name: "Login" });
    }
  },
  created() {
    if (this.getUser) {
      teamService.get(this.getUser.team_id).then(({ data: { data: team } }) => {
        this.team.name = team.name;
        this.team.code = team.code;
      });
    }
  }
};
</script>

<style scoped>
.custom-bg {
  background: #031e2d;
}
</style>
