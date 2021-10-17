<template>
  <div
    class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
    v-if="open"
  >
    <div
      class="absolute bg-black opacity-80 inset-0 z-0"
      @click="open = false"
    ></div>
    <div
      class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white "
    >
      <slot name="content"></slot>

      <div
        class="text-center p-5 flex-auto justify-center"
        v-if="text && title"
      >
        <h2 class="text-xl font-bold-500 py-4 ">{{ title }}</h2>
        <p class="text-sm text-gray-500 px-8">
          Do you really want to delete your account? This process cannot be
          undone
          {{ text }}
        </p>
      </div>

      <div class="p-3  mt-2 text-center space-x-4 md:block">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String },
    text: { type: String },
  },
  computed: {
    open: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style></style>
