<template>
  <div class="container mx-auto p-4">
    <div class="flex items-start justify-between max-w-screen pad-sm bc-grey">
      <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <div class="flex items-start justify-between">
        <button @click="currentPage = 'register'" class="btn btn-gray m-1">Registrar Usuario</button>
        <button @click="currentPage = 'admin'" class="m-1">Administrar Usuarios</button>
      </div>
    </div>

    <component :is="currentPageComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import RegisterForm from '~/components/RegisterForm.vue';
import UserManagement from '~/components/UsersAdmin.vue';

const currentPage = ref('register');

const currentPageComponent = computed(() => {
  return currentPage.value === 'register' ? RegisterForm : UserManagement;
});
</script>

<style>
.text-lg {
  font-size: 1.2rem;
}
.pad-sm {
  padding: 15px;
}
.bc-grey {
  background-color: rgb(37, 37, 37);
  box-shadow: 5px solid black;
}
</style>
