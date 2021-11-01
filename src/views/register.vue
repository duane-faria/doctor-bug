<template>
  <div class="bg-gray-50 min-h-screen flex flex-col w-full">
    <div
      class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 w-full"
    >
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Cadastrar</h1>
        <form @submit.prevent="register">
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Nome"
            required
            v-model="user.name"
          />
          <div class="mb-4">
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded"
              name="email"
              placeholder="Email"
              v-model="user.email"
              @blur="validateEmail"
              required
            />
            <small class="ml-1 text-red-600" v-if="validation.user.email">{{
              validation.user.email
            }}</small>
          </div>

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            v-model="user.password"
            placeholder="Senha"
            required
          />
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Código do time"
            v-model="user.team_id"
            maxlength="4"
            required
          />
          <radio label="Possuo time" v-model="user.hasTeam" />
          <radio label="Criar time" v-model="user.createTeam" />

          <button
            type="submit"
            :disabled="!formValid"
            class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
          >
            Criar conta
          </button>
        </form>
      </div>

      <div class="text-grey-dark mt-6">
        Já tem uma conta?
        <a class="no-underline border-b border-blue text-blue" href="../login/">
          Entrar </a
        >.
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash.get';

import radio from '@/components/radio';
import userService from '../services/user';
import teamService from '../services/team';

const userData = () => ({
  name: '',
  email: '',
  password: '',
  team_id: '',
  hasTeam: null,
  createTeam: null,
  team_name: '',
});

export default {
  components: {
    radio,
  },
  data: () => ({
    user: userData(),
    validation: {
      user: userData(),
    },
    loading: false,
  }),
  methods: {
    async register() {
      console.log('cadastrar');
      let team_id = this.user.team_id;

      if (!this.user.team_id) {
        const {
          data: { data: team },
        } = await teamService.create({ name: this.user.team_name });
        team_id = team.id;
      }

      await userService.create({
        ...pick(this.user, ['name', 'email', 'password']),
        team_id,
      });
    },
    async validateEmail() {
      console.log('validar email');
      if (get(this.user, 'email.length')) {
        const emailValidationMessage = 'E-mail já cadastrado';
        try {
          this.validation.user.email = (
            await userService.validateEmail(this.user.email)
          ).data.data.valid
            ? ''
            : emailValidationMessage;
        } catch (e) {
          this.validation.user.email = e;
        }
      }
    },
  },
  computed: {
    formValid() {
      const rules = [!this.validation.user.email, !this.loading];
      console.log(rules);
      return !rules.includes(false);
    },
  },
};
</script>

<style></style>
