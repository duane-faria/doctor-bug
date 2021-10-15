<template>
  <div class="flex-1 p-5 text-2xl font-bold bg-gray-50	">
    <header class="flex justify-between px-4">
      <h1 class="font-light">Usuários</h1>
      <Button type="success" @click="openInsertBug = true">
        Cadastrar novo
      </Button>
    </header>
    <!-- <data-table :headers="headers" :data="bugs" /> -->
  </div>
</template>

<script>
import Button from "@/components/button";

export default {
  components: {
    Button,
  },
};
</script>

<style></style>
