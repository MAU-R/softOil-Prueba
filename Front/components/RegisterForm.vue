
<template>
 <QLayout>
  <QPageContainer>
    <q-page class="flex items-center justify-center min-h-screen">
    <q-card class="p-8 space-y-6  rounded shadow-md max-w-md w-full">
      <q-card-section>
        <h2 class="text-2xl font-bold text-center">Registrarse</h2>
      </q-card-section>
      <q-form @submit="register" @reset="resetForm" class="space-y-4">
        <q-input
          filled
          v-model="name"
          id="name"
          label="Nombre de usuario"
          type="text"
          required
          class="w-full color-black"
        ></q-input>
        <q-input
          filled
          v-model="email"
          id="email"
          label="Email"
          type="email"
          required
          class="w-full color-black "
        ></q-input>
        <q-input
          filled
          v-model="password"
          id="password"
          label="Contraseña"
          type="password"
          required
          class="w-full color-black"
          @blur="validatePassword"
        ></q-input>
        <q-banner v-if="showPasswordError" class="q-mt-md color-red" dense>
          <span>{{ errorMessage }}</span>
        </q-banner>
        <q-input
          filled
          v-model="confirmPassword"
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          required
          class="w-full color-black"
          @blur="validateConfirmPassword"
        ></q-input>
        <q-banner v-if="showConfirmationError" class="q-mt-md color-red" dense>
          <span>{{ confirmationErrorMessage }}</span>
        </q-banner>
        <q-btn type="submit" label="Register" color="primary" class="w-full" @click="register" :disable="!formValid" />
      </q-form>
    </q-card>
  </q-page>
  </QPageContainer>
 </QLayout>
</template>


<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const validPass= ref(false);
const validPassConfirm=ref(false);
const formValid = ref(false);
const userStore = useUserStore();
const showPasswordError = ref(false)
const showConfirmationError = ref(false)
const confirmationErrorMessage = ref('');
const validatePassword = () => {
  if (password.value.length < 10 || password.value.length > 15) {
    errorMessage.value = 'La contraseña debe tener entre 10 y 15 caracteres.';
    validPass.value = false;
    formValid.value=false;
    showPasswordError.value=true;
    return;
  }
  if (!/[A-Z]/.test(password.value)) {
    errorMessage.value = 'La contraseña debe contener al menos una letra mayúscula.';
    validPass.value = false;
    formValid.value=false;
    showPasswordError.value=true;
    return;
  }
  if (!/\d/.test(password.value)) {
    errorMessage.value = 'La contraseña debe contener al menos un número.';
    validPass.value = false;
    formValid.value=false;
    showPasswordError.value=true;
    return;
  }
  if (!/[@$!%*?&]/.test(password.value)) {
    errorMessage.value = 'La contraseña debe contener al menos un carácter especial.';
    validPass.value = false;
    formValid.value=false;
    showPasswordError.value=true;
    return;
  }
  showPasswordError.value=false;
  validPass.value=true
  errorMessage.value = '';
  validateConfirmPassword();
};

const validateConfirmPassword = () => {
  
  console.log("show:: ", showPasswordError.value)
  console.log("si diiii" + formValid.value)
  if (password.value !== confirmPassword.value) {
    confirmationErrorMessage.value= 'Las contraseñas no coinciden.';
    validPassConfirm.value = false;
    formValid.value=false
    showConfirmationError.value=true
  } else {
    showConfirmationError.value=false
    validPassConfirm.value=true;
    errorMessage.value = '';
    if(validPass.value&&validPassConfirm.value)
    formValid.value = true;
    else
    formValid.value=false;
  }
};

const register = () => {
  validatePassword();
  if (formValid.value) {
    userStore.addUser({ name: name.value, email: email.value, password: password.value });
  }
};

</script>

<style scoped>
.color-red{
  color: red;
}
.w-full {
  width: 100%;
}
</style>