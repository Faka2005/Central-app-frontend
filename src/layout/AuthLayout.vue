
<script setup>
import SidebarUser from '../components/SidebarUser.vue';
import NavbarUser from '../components/NavbarUser.vue';
</script>


<template>
  <div class="auth-layout">
    <SidebarUser /> 

    <div class="main-wrapper">
      <NavbarUser />
      <main class="page-container">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex; /* Aligne horizontalement Sidebar et Main-wrapper */
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-wrapper {
  flex: 1; /* Prend tout l'espace restant à droite */
  display: flex;
  flex-direction: column; /* Aligne Navbar et Contenu verticalement */
  height: 100vh;
}

.page-container {
  flex: 1;
  overflow-y: auto; /* Seule cette zone défile */
  padding: 2rem;
  background-color: #f8fafc;
}
</style>