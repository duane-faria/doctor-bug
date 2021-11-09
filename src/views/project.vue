<template>
  <div class="w-full h-full min-h-screen">
    <div class="flex-1 p-5 text-2xl font-bold bg-gray-50 h-full min-h-screen">
      <header class="flex justify-between px-4">
        <h1 class="font-light">projetos</h1>
        <Button type="success" @click="openInsertBug = true">
          Novo
        </Button>
      </header>
      <data-table @rowClick="goToBugs" :headers="headers" :data="projects" />
    </div>
    <ProjectRegistration @addProject="addProject" v-model="openInsertBug" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import DataTable from "@/components/data-table";
import ProjectRegistration from "@/components/project-registration";
import Button from "@/components/button";
import projectService from "@/services/project";

export default {
  components: {
    DataTable,
    ProjectRegistration,
    Button
  },
  data: () => ({
    headers: [
      { text: "Nome", key: "name" },
      { text: "Criado em", key: "createdAtLabel" }
    ],
    projects: [],
    bug: {},
    openInsertBug: false
  }),
  methods: {
    ...mapActions(["setLoading"]),
    // addBug(bug) {
    //   this.bugs.push(bug);
    //   this.mapBugs();
    // },
    // editBug() {
    //   this.openInsertBug = true;
    // },
    // async deleteBug(id) {
    //   await bugService.delete(id);
    //   this.getBugs();
    // },
    goToBugs(params) {
      this.$router.push({
        name: "BugList",
        query: {
          project_id: params.id
        }
      });
    },
    async addProject(projectName) {
      await projectService.create({
        name: projectName,
        team_id: this.getUser.team_id
      });
      this.openInsertBug = false;
      this.getProjects();
    },
    async getProjects() {
      try {
        this.setLoading(true);
        const {
          data: { data }
        } = await projectService.getAll(`/${this.getUser.team_id}`);
        this.projects = data;
        this.projects.forEach(project => {
          if (project.createdAt) {
            project.createdAtLabel = project.createdAt
              .split("T")[0]
              .split("-")
              .reverse()
              .join('/');
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.getProjects();
  }
};
</script>

<style></style>
