<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import { Login } from "../utils/auth";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const error = ref("");
const isLoading = ref(false);

const isWaiting = computed(() => !form.email || !form.password);

const submit = async () => {
  if (isWaiting.value) return;

  error.value = "";
  isLoading.value = true;

  try {
    await Login(form.email, form.password);
    router.push("/app");
  } catch (err: any) {
    error.value = err.message || "Erreur de connexion";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Connexion</h2>
      <p class="subtitle">Accède à ton espace Nexhub</p>

      <Message v-if="error" severity="error" class="mb-4">
        {{ error }}
      </Message>

      <InputText
        v-model="form.email"
        placeholder="Adresse email"
        class="input"
      />

      <Password
        v-model="form.password"
        placeholder="Mot de passe"
        toggleMask
        :feedback="false"
        class="input"
      />

      <Button
        label="Se connecter"
        class="btn-primary"
        :loading="isLoading"
        :disabled="isWaiting"
        @click="submit"
      />

      <p class="switch">
        Pas encore de compte ?
        <router-link to="/register">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #1e293b, #020617);
  color: #e5e7eb;
  font-family: Inter, system-ui, sans-serif;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #020617;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
}

h2 {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 2.5rem;
}

.input {
  width: 100%;
  margin-bottom: 1.5rem;
}

.btn-primary {
  width: 100%;
  padding: 0.8rem;
  border-radius: 999px;
  background: #2563eb;
  font-weight: 700;
  border: none;
}

.btn-primary:hover {
  background: #1e4fd8;
}

.switch {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #94a3b8;
}

.switch a {
  color: #38bdf8;
  font-weight: 600;
  text-decoration: none;
}
</style>
