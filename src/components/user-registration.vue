<template>
  <modal v-model="open">
    <template v-slot:content>
      <section class="flex items-center flex-col">
        <h2 class="font-semibold">
          Cadastro de Usuário
        </h2>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Nome</label>
          <input
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-white p-1 flex border border-gray-200 rounded"
            v-model="user.name"
          />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">E-mail</label>
          <input
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-white p-1 flex border border-gray-200 rounded"
            v-model="user.email"
            type="email"
          />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Senha</label>
          <input
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-white p-1 flex border border-gray-200 rounded"
            v-model="user.password"
            type="password"
          />
        </div>
      </section>
    </template>
    <template v-slot:actions>
      <Button @click="open = false">cancelar</Button>
      <Button type="success">salvar</Button>
    </template>
  </modal>
</template>

<script>
import get from "lodash.get";

import Modal from "@/components/modal";
import Button from "@/components/button";

export default {
  components: {
    Modal,
    Button,
  },
  props: {
    modelValue: { type: Boolean, default: false },
  },
  data: () => ({
    user: {},
  }),
  computed: {
    open: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.clear();
        this.$emit("update:modelValue", value);
      },
    },
    get() {
      return get;
    },
  },
  methods: {
    clear() {
      this.user = {};
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 28px;
  font-weight: 500;
}

label {
  font-size: 18px;
}
</style>
