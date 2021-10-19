<template>
  <modal v-model="isOpen">
    <template v-slot:content>
      <section class="flex items-center flex-col">
        <h2 class="font-semibold">
          Cadastro de Bug
        </h2>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Relator</label>
          <Select v-model="bug.reporter" />
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
          <Select v-model="bug.enviroment" />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Responsável</label>
          <Select v-model="bug.responsible" />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Prioridade</label>
          <Select v-model="bug.priority" />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Status</label>
          <Select v-model="bug.status" />
        </div>
      </section>
    </template>
    <template v-slot:actions>
      <Button @click="isOpen = false" :disabled="loading">cancelar</Button>
      <Button type="success" @click="saveBug" :disabled="loading">
        salvar
      </Button>
    </template>
  </modal>
</template>

<script>
import get from "lodash.get";

import Modal from "@/components/modal";
import Button from "@/components/button";
import Select from "@/components/select";
import bugService from "@/services/bug";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Modal,
    Button,
    Select,
  },
  props: {
    open: { type: Boolean, default: false },
  },
  data: () => ({
    bug: {
      reporter: "",
      responsible: "",
      enviroment: "",
      description: "",
      priority: "",
      status: "",
    },
    loading: false,
  }),
  computed: {
    ...mapGetters(["isLoading"]),
    isOpen: {
      get() {
        return this.open;
      },
      set(value) {
        this.clear();
        this.$emit("update:open", value);
      },
    },
    get() {
      return get;
    },
  },
  methods: {
    ...mapActions(["setLoading"]),
    clear() {
      this.bug = {};
    },
    async saveBug() {
      this.setLoading(true);
      try {
        await bugService.create(this.bug);
        this.$emit("newBug", this.bug);
      } catch (e) {
        console.error(e);
      } finally {
        this.setLoading(false);
        this.isOpen = false;
      }
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
