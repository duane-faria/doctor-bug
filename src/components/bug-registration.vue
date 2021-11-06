<template>
  <modal v-model="isOpen">
    <template v-slot:content>
      <section class="flex items-center flex-col">
        <h2 class="font-semibold">
          Cadastro de Bug
        </h2>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Relator</label>
          <Select v-model="bug.reporter" :items="users" />
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
            Você inseriu {{ get(bug, 'description.length', 0) }} caracteres
          </p>
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Ambiente</label>
          <Select v-model="bug.enviroment" :items="enviroments" />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Responsável</label>
          <Select v-model="bug.responsible" :items="users" />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Prioridade</label>
          <Select v-model="bug.priority" :items="priorities" />
        </div>
        <div class="w-full">
          <label class="font-semibold text-gray-600 py-2">Status</label>
          <Select v-model="bug.status" :items="status" />
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
import get from 'lodash.get';
import { mapGetters, mapActions } from 'vuex';

import Modal from '@/components/modal';
import Button from '@/components/button';
import Select from '@/components/select';
import bugService from '@/services/bug';
import userService from '@/services/user';

import priorities from '@/constants/priority';
import status from '@/constants/status';
import enviroment from '@/constants/enviroment';

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
      reporter: '',
      responsible: '',
      enviroment: '',
      description: '',
      priority: '',
      status: '',
    },
    users: [],
    enviroments: [...enviroment],
    priorities: [...priorities],
    status,
    loading: false,
  }),
  computed: {
    ...mapGetters(['isLoading', 'getUser']),
    isOpen: {
      get() {
        return this.open;
      },
      set(value) {
        this.clear();
        this.$emit('update:open', value);
      },
    },
    get() {
      return get;
    },
  },
  created() {
    userService
      .getAll(`/${this.getUser.team_id}`)
      .then(({ data: { data: users } }) => {
        this.users = users;
      });
  },
  methods: {
    ...mapActions(['setLoading']),
    clear() {
      this.bug = {};
    },
    async saveBug() {
      this.setLoading(true);
      try {
        const bug = {
          description: this.bug.description,
          enviroment: this.bug.enviroment.key,
          priority: this.bug.priority.key,
          reporter_id: this.bug.reporter.id,
          responsible_id: this.bug.responsible.id,
          status: this.bug.status.key,
        };

        await bugService.create(bug);
        this.$emit('newBug', bug);
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
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 500;
}
</style>
