<template>
  <button
    :class="[
      `${background}`,
      { 'hover:shadow-lg hover:bg-opacity-80': !disabled },
    ]"
    class="mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border rounded-full"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    background() {
      let style;
      const whiteText = "text-white";
      switch (this.type) {
        case "danger":
          style = `bg-red-500 ${whiteText}`;
          break;
        case "success":
          style = `bg-green-500 ${whiteText}`;
          break;
        default:
          style = "bg-white";
          break;
      }

      return style;
    },
  },
};
</script>

<style></style>
