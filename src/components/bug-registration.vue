<template>
  <modal v-model="open">
    <template v-slot:content>
      <section class="flex items-center flex-col">
        <h2 class="font-semibold">
          Cadastro de Bug
        </h2>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Relator</label>
          <Select />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Description</label>
          <textarea
            required=""
            name="message"
            v-model="bug.description"
            class="w-full min-h-[100px] max-h-[300px] h-28 resize-none	
            appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4 outline-none focus:boder-grey-500"
            spellcheck="false"
          ></textarea>
          <p class="text-xs text-gray-400 text-left my-3">
            Você inseriu {{ get(bug, "description.length", 0) }} caracteres
          </p>
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Ambiente</label>
          <Select />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Responsável</label>
          <Select />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Prioridade</label>
          <Select />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Status</label>
          <Select />
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
import Select from "@/components/select";

export default {
  components: {
    Modal,
    Button,
    Select,
  },
  props: {
    modelValue: { type: Boolean, default: false },
  },
  data: () => ({
    bug: {},
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
      this.bug = {};
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
</style>
