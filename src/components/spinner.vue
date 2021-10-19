<template>
  <!-- :class="{ 'bg-black opacity-80': showBackground }" -->
  <div class="absolute inset-0 z-10 h-full w-full bg-black opacity-80">
    <div class="flex justify-center items-center h-full">
      <div
        class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-32 w-32"
      ></div>
    </div>
  </div>
</template>

<script>
// import get from "lodash.get";
export default {
  data: () => ({
    showBackground: true,
  }),
  mounted() {
    if (document.querySelector(".modal")) {
      this.showBackground = false;
    }
  },
};
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
