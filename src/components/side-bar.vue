<template>
  <div class="relative min-h-screen md:flex">
    <!-- mobile menu bar -->
    <div class="bg-gray-800 text-gray-100 flex justify-between md:hidden">
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
      :class="{ '-translate-x-full': openMobileMenu }"
      class="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out"
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
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
        >
          Home
        </a>
        <a
          href=""
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
        >
          About
        </a>
        <a
          href=""
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
        >
          Features
        </a>
        <a
          href=""
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
        >
          Pricing
        </a>
      </nav>
    </div>

    <!-- content -->
    <div class="flex-1 p-10 text-2xl font-bold">
      content goes here
    </div>
  </div>
</template>

<script>
import img from "@/assets/icons/bug.svg";
export default {
  data: () => ({
    openMobileMenu: false,
    projectTitle: "bug doctor",
    img,
  }),
};
</script>

<style scoped></style>
