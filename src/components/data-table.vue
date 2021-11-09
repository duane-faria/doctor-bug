<template>
  <div class="mt-5 w-full shadow-sm overflow-x-scroll sm:overflow-x-hidden">
    <!-- <section>title</section> -->
    <table class="my-3 w-full">
      <thead class="my-3 pb-1 bg-white" style="height:40px;">
        <tr class="mb-3">
          <th
            v-for="header of headers"
            :key="header"
            class="text-left text-gray-600 font-medium text-sm px-2"
          >
            {{ header.text }}
          </th>
          <th
            v-if="config"
            class="text-left text-gray-600 font-medium text-sm px-2"
          >
            ações
          </th>
        </tr>
      </thead>
      <slot name="teste"></slot>
      <tbody
        v-for="col of data"
        :key="col.responsible + Math.random()"
        class="w-full h-auto"
      >
        <tr class="bg-gray-50" style="height:1.5px"></tr>
        <tr
          class="font-light text-sm w-full bg-white px-3 cursor-pointer"
          style="height:40px;"
          @click="$emit('rowClick', col)"
        >
          <td
            v-for="{ key } of Object.values(headers)"
            :key="Math.random() + key"
            class="px-2 leading-6"
          >
            {{ col[key] }}
          </td>
          <td v-if="config">
            <button @click="$emit('edit', col)">editar</button>
            <button @click="$emit('delete', col.id)">deletar</button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="data.length === 0">
        <tr
          class="font-light text-sm w-full bg-white px-3 cursor-pointer"
          style="height:40px;"
          @click="$emit('rowClick', col)"
        >
          <td :colspan="headers.length * 2" class="w-full text-center">Nenhum dado encontrado</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: Array,
    data: Array,
    config: Object
  },
  mounted() {
    this.componentRules();
  },
  methods: {
    componentRules() {
      // if (this.headers.length !== this.data.length) {
      //   throw new Error("The number of headers must match the content");
      // }
    },
    console(_info) {
      console.log(_info);
    }
  }
};
</script>

<style scoped>
td:first-child,
th:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
td:last-child,
th:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

td {
  width: 20%;
}
</style>
