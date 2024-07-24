<template>
  <div class="container mx-auto p-4">
    <div class="flex items-start justify-between max-w-screen pad-sm bc-grey">
      <h1 class="text-2xl font-bold mb-4">Registro de Usuario</h1>
    </div>
   

    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '~/components/RegisterForm.vue';
</script>

<style>
.text-lg{
  font-size: 1.2rem;
}
.pad-sm{
  padding: 15px;
}
.bc-grey{
  background-color: rgb(37, 37, 37);
  box-shadow: 5px solid black;
}
</style>