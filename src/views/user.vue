<template>
  <div class="flex-1 p-5 text-2xl font-bold bg-gray-50	">
    <header class="flex justify-between px-4">
      <h1 class="font-light">Usuários</h1>
      <Button type="success" @click="insertMode = true">
        Novo
      </Button>
    </header>
    <data-table :headers="headers" :data="users" />
    <insert-user-modal v-model="insertMode" />
  </div>
</template>

<script>
import Button from "@/components/button";
import InsertUserModal from "@/components/user-registration";
import DataTable from "@/components/data-table";

export default {
  components: {
    Button,
    InsertUserModal,
    DataTable,
  },
  data: () => ({
    insertMode: false,
    headers: [
      {
        text: "Nome",
        key: "name",
      },
      {
        text: "E-mail",
        key: "email",
      },
    ],
    users: [
      {
        name: "dwadwad",
        email: "dwoadij@hotmail.com",
      },
      {
        name: "dwadwad",
        email: "dwoadij@hotmail.com",
      },
      {
        name: "dwadwad",
        email: "dwoadij@hotmail.com",
      },
      {
        name: "dwadwad",
        email: "dwoadij@hotmail.com",
      },
    ],
  }),
};
</script>

<style></style>
