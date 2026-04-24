<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="logo">NEX<span>HUB</span></h2>
    </div>

    <nav class="sidebar-menu">
      <router-link to="/app" class="menu-item" exact>
        <i class="pi pi-home"></i> <span>Dashboard</span>
      </router-link>
      <router-link to="/app/analyse-csv" class="menu-item">
        <i class="pi pi-chart-bar"></i> <span>Analyse CSV</span>
      </router-link>
      <router-link to="/app/gallerie" class="menu-item">
        <i class="pi pi-images"></i> <span>Gallerie</span>
      </router-link>
      <router-link to="/app/password" class="menu-item">
        <i class="pi pi-shield"></i> <span>Coffre</span>
      </router-link>
      <router-link to="/app/reciters" class="menu-item">
        <i class="pi pi-headphones"></i> <span>Récitateurs</span>
      </router-link>
      <router-link to="/app/messages" class="menu-item">
        <i class="pi pi-users"></i> <span>Messages</span>
      </router-link>
        <router-link to="/app/settings" class="menu-item">
            <i class="pi pi-cog"></i> <span>Paramètres</span>
        </router-link>
        <Button label="Déconnexion" class="p-button-danger" @click="logout" style="margin-top: auto;" />
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  /* Dimensions et Placement */
  width: 260px;
  min-width: 260px; /* Empêche la sidebar de s'écraser */
  height: 100vh;
  
  /* Look & Feel */
  background: #0f172a; /* Ton bleu nuit */
  color: white;
  padding: 1.5rem;
  
  /* Structure Interne */
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1e293b;
}

.sidebar-header {
  margin-bottom: 2rem;
}

.logo { 
  font-size: 1.4rem; 
  font-weight: 800; 
  letter-spacing: 1px; 
}

.logo span { 
  color: #3b82f6; /* Le bleu NexHub */
}

.sidebar-menu { 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem; 
  flex-grow: 1; /* Pousse tout ce qui suit (le bouton logout) vers le bas */
}

/* Style de base des liens */
.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: #94a3b8; /* Gris ardoise pour les éléments inactifs */
  padding: 0.8rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent; /* Prévient le saut visuel au clic */
}

.menu-item i { 
  font-size: 1.1rem; 
}

/* État : Survol (Hover) */
.menu-item:hover {
  background: #1e293b;
  color: white;
}

/* État : Actif (Lien exact sur lequel on se trouve) */
.router-link-exact-active {
  background: #1e293b !important;
  color: white !important;
  border-left: 4px solid #3b82f6 !important; /* La barre bleue à gauche */
  border-radius: 4px 10px 10px 4px; /* Arrondi spécifique avec la barre */
}

/* Style spécifique pour le bouton Déconnexion en bas */
.p-button-danger {
  margin-top: auto; /* Se cale tout en bas grâce au flex-grow du menu */
  width: 100%;
  border-radius: 10px;
  font-weight: 600;
  padding: 0.75rem;
}
</style>

<script setup lang="ts">
import Logout from '../utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  await Logout();
  router.push({ name: "Home" });
};
</script>