<template>
  <q-page padding>
    <div class="w-full max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6">Registro de Usuario</h1>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Nombre</label>
          <input v-model="name" type="text" id="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Contraseña</label>
          <input v-model="password" type="password" id="password" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Registrar</button>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'

const name = ref('')
const email = ref('')
const password = ref('')

const userStore = useUserStore()

const registerUser = () => {
  userStore.register({ name: name.value, email: email.value, password: password.value })
}
</script>

<style scoped>
</style>
