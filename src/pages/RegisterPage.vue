<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const error = ref("");

// 🔥 équivalent useMemo / derived state
const isWaiting = computed(() => {
  return !form.name || !form.email || !form.password;
});


const submit = () => {
  if (isWaiting.value) {
    error.value = "Tous les champs sont obligatoires";
    return;
  }

  error.value = "";
  console.log("Formulaire envoyé :", form);
};
</script>

<template>
  <div class="p-4">
    <h2>Inscription</h2>



    <InputText v-model="form.name" placeholder="Nom" class="mb-3 w-full" />
    <InputText v-model="form.email" placeholder="Email" class="mb-3 w-full" />
    <Password
      v-model="form.password"
      placeholder="Mot de passe"
      class="mb-3 w-full"
    />
    <Message v-if="error" severity="error" class="mb-3">
      {{ error }}
    </Message>
    <Button
      label="Créer le compte"
      @click="submit"
      :disabled="isWaiting"
    />
  </div>
</template>
