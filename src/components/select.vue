<template>
  <div class="flex-auto flex flex-col">
    <div class="flex flex-col items-center relative">
      <div class="w-full  svelte-1l8159u">
        <div
          class="my-2 bg-white p-1 flex border border-gray-200 rounded svelte-1l8159u"
        >
          <div class="flex flex-auto flex-wrap"></div>
          <input
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800  svelte-1l8159u "
            v-model="search"
            @focus="showList = true"
          />
            <!-- @blur="showList = false" -->
          <div>
            <button
              class="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none"
              @click="
                () => {
                  select = '';
                  search = '';
                }
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div
            class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u"
          >
            <button
              class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              @click="showList = !showList"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-up w-4 h-4"
                :class="{ 'transform rotate-180': showList }"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
        v-if="showList"
      >
        <div class="flex flex-col w-full">
          <div
            class="cursor-pointer w-full border-gray-100 rounded-t border-b 
            hover:bg-teal-100"
            v-for="item of items"
            :key="item"
          >
            <div
              @click="setItem(item)"
              class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600"
            >
              <div class="w-full items-center flex">
                <div class="mx-2 leading-6">
                  {{ item.name || item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash.get';

export default {
  props: {
    modelValue: { type: Object },
    items: { Type: Array, required: true },
  },
  data: () => ({
    // items: ['Python', 'Javascript', 'Ruby'],
    showList: false,
    search: '',
  }),
  methods: {
    setItem(item) {
      this.showList = false;
      this.select = item;
      this.search = item.text || item.name;
    },
  },
  mounted() {
    console.log(this.$parent);
    // this.$parent.$el.addEventListener('click', (e) => {
    //   console.log(e)
    //   // if()
    //   this.showList = false;
    // });
  },
  computed: {
    select: {
      get() {
        return get(this, 'modelValue.text') || get(this, 'modelValue.name');
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style scoped>
.top-100 {
  top: 100%;
}

.bottom-100 {
  bottom: 100%;
}

.max-h-select {
  max-height: 300px;
}
</style>
