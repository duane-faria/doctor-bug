<template>
  <div class="w-full h-full min-h-screen">
    <div class="flex-1 p-5 text-2xl font-bold bg-gray-50 h-full min-h-screen">
      <header class="flex justify-between px-4">
        <h1 class="font-light">bugs abertos</h1>
        <Button
          type="success"
          @click="
            () => {
              bugParam = null;
              openInsertBug = true;
            }
          "
        >
          Novo
        </Button>
      </header>
      <data-table
        :config="{
          edit: true,
          delete: true
        }"
        :headers="headers"
        :data="bugs"
        @edit="editBug"
        @delete="deleteBug"
      />
    </div>
    <BugRegistration
      :bugParam="bugParam"
      @newBug="addBug"
      v-model:open="openInsertBug"
    />
    <!--  -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import get from "lodash.get";

import DataTable from "@/components/data-table";
import BugRegistration from "@/components/bug-registration";
import Button from "@/components/button";
import bugService from "@/services/bug";

import priorities from "@/constants/priority";
import statuses from "@/constants/status";
import enviroments from "@/constants/enviroment";

export default {
  components: {
    DataTable,
    BugRegistration,
    Button
  },
  data: () => ({
    headers: [
      { text: "bug", key: "description" },
      { text: "relator", key: "reporter" },
      { text: "ambiente", key: "enviroment" },
      { text: "responsável", key: "responsible" },
      { text: "prioridade", key: "priority" },
      { text: "status", key: "status" }
    ],
    bugs: [],
    bug: {},
    openInsertBug: false,
    bugParam: null
  }),
  methods: {
    ...mapActions(["setLoading"]),
    addBug() {
      // this.bugs.push(bug);
      // this.mapBugs();
      this.getBugs();
    },
    editBug(param) {
      this.openInsertBug = true;
      this.bugParam = param;
    },
    async deleteBug(id) {
      await bugService.delete(id);
      this.getBugs();
    },
    mapBugs() {
      this.bugs.forEach(b => {
        b.enviroment = enviroments.find(e => e.key === b.enviroment).text;
        b.priority = priorities.find(e => e.key === b.priority).text;
        b.status = statuses.find(e => e.key === b.status).text;
        b.responsible = b.responsible.name;
        b.reporter = b.reporter.name;
      });
    },
    async getBugs() {
      try {
        this.setLoading(true);
        const {
          data: { data }
        } = await bugService.getAll(`/${this.$route.query.project_id}`);
        this.bugs = data;
        this.mapBugs();
      } catch (e) {
        console.error(e);
      } finally {
        this.setLoading(false);
      }
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.getBugs();
  }
};
</script>

<style></style>
