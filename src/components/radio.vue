<template>
  <label class="inline-flex items-center mt-3">
    <input
      type="radio"
      class="form-radio h-5 w-5 text-indigo-600"
      v-model="active"
    /><span class="ml-2 text-gray-700">{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    modelValue: { type: Boolean, default: false },
  },
  computed: {
    active: {
      get() {
        return this.modelValue;
      },
      set(active) {
        this.$emit('update:modelValue', active);
      },
    },
  },
};
</script>

<style></style>
