<template>
  <div>
    <label class="inline-flex items-center">
      <input
        type="radio"
        class="form-radio"
        :name="name"
        :value="option"
        :id="option"
        v-model="active"
      />
      <span class="ml-2">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    modelValue: { type: String },
    option: { type: String },
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
