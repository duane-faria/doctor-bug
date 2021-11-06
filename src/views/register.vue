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
              type="email"
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
          <div class="mb-4" v-if="user.hasTeam == 0">
            <input
              class="block border border-grey-light w-full p-3 rounded"
              name="confirm_password"
              placeholder="Código do time"
              v-model="user.team_code"
              maxlength="4"
              required
              @blur="validateTeamCode"
            />
            <small class="ml-1 text-red-600" v-if="validation.user.team_code">{{
              validation.user.team_code
            }}</small>
          </div>

          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Nome do time"
            v-model="user.team_name"
            required
            v-if="user.hasTeam == 1"
          />

          <radio
            :option="'0'"
            name="time"
            label="Possuo time"
            v-model="user.hasTeam"
          />

          <radio
            name="time"
            label="Criar time"
            :option="'1'"
            v-model="user.hasTeam"
          />

          <button
            type="submit"
            :disabled="!formValid"
            class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-3"
          >
            Criar conta
          </button>
        </form>
      </div>

      <div class="text-grey-dark mt-6 flex flex-col items-center">
        Já tem uma conta?
        <a
          class="no-underline border-b border-blue text-blue mt-2"
          href="../login/"
        >
          Entrar </a
        >.
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash.get';
import pick from 'lodash.pick';
import { mapActions } from 'vuex';

import radio from '@/components/radio';
import userService from '../services/user';
import teamService from '../services/team';
import sessionService from '../services/session';

const userData = () => ({
  name: '',
  email: '',
  password: '',
  team_code: '',
  hasTeam: '0',
  team_name: '',
  team_id: '',
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
  watch: {
    'user.hasTeam'() {
      this.validation.user.team_code = '';
      this.user.team_code = '';
    },
  },
  methods: {
    ...mapActions(['setUser']),
    async register() {
      let team_id = this.user.team_id;

      if (!this.user.team_code) {
        const {
          data: { data: team },
        } = await teamService.create({ name: this.user.team_name });
        team_id = team.id;
      }

      await userService.create({
        ...pick(this.user, ['name', 'email', 'password']),
        team_id,
      });

      await this.login(pick(this.user, ['email', 'password']));
    },
    async login(user) {
      try {
        const {
          data: { data: userData },
        } = await sessionService.create(user);
        console.log(userData);
        if (userData) {
          this.setUser(userData);
          this.$router.push({ name: 'BugList' });
        }
      } catch (e) {
        console.log(e);
      }
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
    async validateTeamCode() {
      console.log('validar codigo do time');
      if (get(this.user, 'team_code.length')) {
        const emailValidationMessage = 'Código do time inválido';
        try {
          const {
            data: { data: teamValidation },
          } = await teamService.validateTeamCode(this.user.team_code);
          this.validation.user.team_code = teamValidation.isCodeValid
            ? ''
            : emailValidationMessage;
          this.user.team_id = teamValidation.teamId;
        } catch (e) {
          this.validation.user.team_code = e;
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
