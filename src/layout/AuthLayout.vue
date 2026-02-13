<script setup>
//import { useRouter } from 'vue-router';
//import { onMounted } from 'vue';
//
//// Ici, on récupère l’état de connexion depuis localStorage ou un store
//const router = useRouter();
//const user = JSON.parse(localStorage.getItem('user')); // ou depuis un store comme Pinia ou Vuex
//
//onMounted(() => {
//  // si pas connecté → redirige vers la page de login
//  if (!user || user.status === false) {
//    router.push({ name: 'Login' });
//  }
//});

</script>

<template>
  <div class="auth-layout">
    <aside class="sidebar">
      <!-- menu pour utilisateur connecté -->
    </aside>

    <main class="content">
      <RouterView /> <!-- ici s’affiche chaque page enfant -->
    </main>
  </div>
</template>

<style>
.auth-layout {
  display: flex;
}
.sidebar {
  width: 200px;
  background: #f3f3f3;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
