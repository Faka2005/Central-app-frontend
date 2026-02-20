<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import {getUser} from '../utils/auth.ts'
import Sidebar from '../components/Sidebar.vue';
// Ici, on récupère l’état de connexion depuis localStorage ou un store
const router = useRouter();
const user = getUser(); // ou depuis un store comme Pinia ou Vuex

onMounted(() => {

  // si pas connecté → redirige vers la page de login
  if (!user || user.role === "") {
    router.push({ name: 'Login' });
  }
});

</script>

<template>
  <div class="auth-layout">
    <Sidebar /> <!-- barre latérale commune à toutes les pages protégées -->

    <main class="content">
      <RouterView /> <!-- ici s’affiche chaque page enfant -->
    </main>
  </div>
</template>

<style>
.auth-layout {
  display: flex;
}

</style>
