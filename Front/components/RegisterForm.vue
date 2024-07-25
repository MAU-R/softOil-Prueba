
<template>
  <QLayout>
   <QPageContainer>
     <q-page class="flex items-center justify-center min-h-screen">
       <div class="flex  nw">
       <q-card class="p-8 space-y-6  rounded shadow-md max-w-md w-full min-w-96">
       <q-card-section class="bc-gray">
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
           @blur="switchBanner"
         ></q-input>
         <q-banner v-if="showEmailError" class="q-mt-md color-red" dense>
           <span> Este email ya esta en uso</span>
         </q-banner>
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
 
         <q-dialog v-model="showPopup" transition-show="scale" transition-hide="scale">
       <q-card class="q-pa-md" style="width: 350px; max-width: 80vw;">
         <q-card-section class="text-center">
           <img src="/confirm-icon.png" alt="confirmacion">
           <div class="text-h5 q-mt-md">Cuenta creada</div>
           <div class="q-mt-sm">Se envio un correo de confirmacion a tu email</div>
         </q-card-section>
         
         <q-card-actions align="center">
           <q-btn flat label="OK" color="primary" @click="showPopup = false" />
         </q-card-actions>
       </q-card>
     </q-dialog>
 
       </q-form>
     </q-card>
       <q-card class=" sm:hidden flex flex-row  bg-cover bg-center bc-img space-y-6  rounded shadow-md max-w-md w-full min-w-96">
         <img class=" w-1/2 bg-cover bg-center" src="https://static.vecteezy.com/system/resources/previews/006/405/794/non_2x/account-login-flat-illustration-vector.jpg" alt="Registrarte">
       </q-card>
       </div>
     
   </q-page>
   </QPageContainer>
  </QLayout>
 </template>
 
 
 <script setup>
 import { ref } from 'vue';
 import { useUserStore } from '~/stores/user';
 import axios from 'axios';
 /*Variables para mostrar banners, referencias para valores de los input*/ 
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
 const showEmailError=ref(false);
 const showPopup=ref(false)
 
 
//Funcion para cambiar el valor de show banner
 const switchBanner=()=>{if(showEmailError.value)showEmailError.value=false;}
 //Funcion para validar contraseña
 const validatePassword = () => {
  //Los if sirven para revisar si alguna de las condiciones falla
  //checando que tenga ciertos caracteres o longitud correcta
   if (password.value.length < 10 || password.value.length > 15) {
    //El error message se muestra bajo el input para indicar al usuario que falta algo 
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
     errorMessage.value = 'La contraseña debe contener uno de estos simbolos @$!%*?&';
     validPass.value = false;
     formValid.value=false;
     showPasswordError.value=true;
     return;
   }
   //Cuando la contraseña cumple con todos las validaciones se quita el mensaje de error
   showPasswordError.value=false;
   validPass.value=true
   errorMessage.value = '';
   validateConfirmPassword();
 };
 //validacion que las dos contraseñas sean iguales 
 const validateConfirmPassword = () => {
   

   if (password.value !== confirmPassword.value) {
     confirmationErrorMessage.value= 'Las contraseñas no coinciden.';
     validPassConfirm.value = false;
     formValid.value=false
     showConfirmationError.value=true
   } else {
    //Cuando se cumple la condicion donde la contraseña es valida y la confirmacion es igual se habilida el boton para registrartse
     showConfirmationError.value=false
     validPassConfirm.value=true;
     errorMessage.value = '';
     if(validPass.value&&validPassConfirm.value)
     formValid.value = true;
     else
     formValid.value=false;
   }
 };
 

//funcion para registrar el usuario 
 const register = async () => {
   validatePassword();
   if (formValid.value) {
    //usamos axios para registrar el usuario en el backend
     try {
      const usuario =  await axios.post('http://localhost:3005/auth/register', {
         email: email.value,
         password: password.value,
         userName: name.value,
       });
       //Acutalizamos el usuario en el store de pinia 
       userStore.addUser({...usuario});
       //Mostramos un popup para decirle al usuario que todo salio bien 
       showPopup.value=true;
       resetForm();
       
     } catch (error) {
      //En caso de obtener el error de que el email esta en uso mostramos el error de email 
       showEmailError.value=true
     }
   }
 };
 
 const resetForm = () => {
   name.value = '';
   email.value = '';
   password.value = '';
   confirmPassword.value = '';
   errorMessage.value = '';
   confirmationErrorMessage.value = '';
   formValid.value = false;
   showEmailError.value=false;
 };
 
 </script>
 
 <style scoped>
 .nw{
   flex-wrap: nowrap !important;
 }
 .bc-img{
   background-image: url("https://static.vecteezy.com/system/resources/thumbnails/016/839/722/small/2-step-authentication-illustration-concept-secure-login-verification-password-or-sms-with-push-code-message-on-smartphone-or-desktop-pc-computer-for-sites-landing-pages-apps-posters-and-banners-vector.jpg");
 }
 .color-red{
   color: red;
 }
 .w-full {
   width: 100%;
 }
 </style>