<template>
  <div class="flex-1 p-5 text-2xl font-bold bg-gray-50	">
    <header class="flex justify-between px-4">
      <h1 class="font-light">bugs abertos</h1>
      <Button type="success" @click="openInsertBug = true">
        enviar bug
      </Button>
    </header>
    <data-table :headers="headers" :data="bugs" />
  </div>
  <BugRegistration v-model="openInsertBug" />
</template>

<script>
import DataTable from "@/components/data-table";
import BugRegistration from "@/components/bug-registration";
import Button from "@/components/button";

const bugFactory = ({
  reporter,
  responsible,
  description,
  enviroment,
  priority,
  status,
}) => ({
  reporter,
  responsible,
  description,
  enviroment,
  priority,
  status,
});

const bug = bugFactory({
  description:
    "Brazil, officially the Federative Republic of Brazil, is the largest country in both South America and Latin America. At 8.5 million square kilometers and with over 211 million people, Brazil is the world's fifth-largest country by area and the sixth most populous.",
  reporter: "Fernanda",
  responsible: "Duane",
  enviroment: "dev",
  priority: "baixa",
  status: "baixa",
});
const bug2 = bugFactory({
  reporter: "Fernanda",
  description: "dwadwadwadwadwa",
  responsible: "Duane",
  enviroment: "dev",
  priority: "baixa",
  status: "baixa",
});
export default {
  components: {
    DataTable,
    BugRegistration,
    Button,
  },
  data: () => ({
    headers: [
      { text: "bug", key: "description" },
      { text: "relator", key: "reporter" },
      { text: "ambiente", key: "enviroment" },
      { text: "responsável", key: "responsible" },
      { text: "prioridade", key: "priority" },
      { text: "status", key: "status" },
    ],
    // headers: [
    //   "bug",
    //   "relator",
    //   "ambiente",
    //   "responsável",
    //   "prioridade",
    //   "status",
    // ],
    bugs: [bug, bug, bug, bug2, bug],
    openInsertBug: false,
  }),
  methods: {
    addBug() {
      this.bugs.push(bug);
    },
  },
};
</script>

<style></style>
