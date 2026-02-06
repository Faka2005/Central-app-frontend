<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";

import { useRouter } from 'vue-router';

const router = useRouter(); // <- indispensable

import { Login } from '../utils/auth'; // assure-toi que c'est bien exporté

const form = reactive({
  email: "",
  password: "",
});

const error = ref("");
const isLoading = ref(false);

// Bouton désactivé si champs vides ou en attente
const isWaiting = computed(() => !form.email || !form.password);

const submit = async () => {
  if (isWaiting.value) {
    error.value = "Tous les champs sont obligatoires";
    return;
  }

  error.value = "";
  isLoading.value = true;

  try {
    const user = await Login(form.email, form.password);
    // Ici tu peux rediriger vers la page principale
    router.push('/')
  } catch (err: any) {
    error.value = err.message || "Erreur lors de la connexion";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-4 max-w-sm mx-auto">
    <h2 class="text-xl font-bold mb-4">Connexion</h2>

    <InputText
      v-model="form.email"
      placeholder="Email"
      class="mb-3 w-full"
    />

    <Password
      v-model="form.password"
      placeholder="Mot de passe"
      feedback="false"
      toggleMask
      class="mb-3 w-full"
    />

    <Message v-if="error" severity="error" class="mb-3">
      {{ error }}
    </Message>

    <Button
      label="Se connecter"
      :loading="isLoading"
      @click="submit"
      :disabled="isWaiting || isLoading"
      class="w-full"
    />
  </div>
</template>
