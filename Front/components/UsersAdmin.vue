<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Administración de Usuarios</h2>
      <table class="min-w-full divide-y ">
        <thead class="">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium ">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium ">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium ">Acciones</th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.userName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900">Editar</button>
              <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900 ml-4">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <q-dialog v-model="showEditPopup" transition-show="scale" transition-hide="scale">
        <q-card class="q-pa-md" style="width: 350px; max-width: 80vw;">
          <q-card-section class="text-center">
            <div class="text-h5 q-mt-md">Editar Usuario</div>
            <q-form @submit="updateUser">
              <q-input
                v-model="editUserForm.userName"
                label="Nombre de usuario"
                type="text"
                required
                class="q-mb-md"
              />
              <q-input
                v-model="editUserForm.email"
                label="Email"
                type="email"
                required
                class="q-mb-md"
                @blur="showEmailError=false"
              />
              <q-banner v-if="showEmailError" class="q-mt-md color-red" dense>
                    <span> Este email ya esta en uso</span>
            </q-banner>
              <q-card-actions align="center">
                <q-btn type="submit" label="Actualizar" color="primary" class="q-mr-sm" />
                <q-btn flat label="Cancelar" color="primary" @click="showEditPopup = false" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  //Usamos hoks de composition para cargar componentes y ref para usar valores en vue 
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '~/stores/user';
  //Usamos el store de usuarios
  const store = useUserStore();
  const showEmailError=ref(false)
  const showEditPopup = ref(false);
  const editUserForm = ref({ id: 0, userName: '', email: '', password: '' });
  onMounted(async () => {
  await store.fetchUsers();
});
  // Obtenemos la lista de usuarios del store de manera reactiva
const users = computed(() => store.users);

// Usamos el hook onMounted para cargar los usuarios cuando el componente se monta

  //funcion para el handle de edit donde obtenemos los valores del usuario 
  const editUser = (user: { id: number, userName: string, email: string, password: string }) => {
    editUserForm.value = { ...user };
    showEditPopup.value = true;
  };
  //funcion para handle de confirmar edit
  const updateUser = async () => {
    //Hazemos un try para mandar llamar a la funcion updateuser del store de pinia 
    try{
        await store.updateUser(editUserForm.value.id, {
      userName: editUserForm.value.userName,
      email: editUserForm.value.email,
      password: editUserForm.value.password
    });
    showEditPopup.value = false;
    }catch(err){
        showEmailError.value=true
    }

  };
  //Funcion para eliminar usuario donde llamamos deleteUser() y mandamos el id 
  const deleteUser = async (id: number) => {
    await store.deleteUser(id);
  };
  
  store.fetchUsers();
  </script>
  <style scoped>
  .color-red{
    color: red;}
  </style>
