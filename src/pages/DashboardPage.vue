<template>
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">MyPlatform</h2>

      <ul class="menu">
        <li class="active"><i class="pi pi-home"></i> Dashboard</li>
        <li><i class="pi pi-chart-bar"></i> Analyse CSV</li>
        <li><i class="pi pi-images"></i> Médias</li>
        <li><i class="pi pi-shield"></i> Coffre sécurisé</li>
        <li><i class="pi pi-book"></i> Cours</li>
        <li><i class="pi pi-headphones"></i> Sourates</li>
        <li><i class="pi pi-users"></i> Campus</li>
      </ul>
    </aside>

    <!-- MAIN -->
    <div class="main">

      <!-- TOPBAR -->
      <div class="topbar">
        <h2>Bienvenue {{ user.username }} 👋</h2>
        <Button icon="pi pi-sign-out"  @click="Logout" class="p-button-text p-button-rounded" />
      </div>

      <!-- FEATURE CARDS -->
      <div class="features-grid">

        <div class="feature-card">
          <i class="pi pi-chart-line"></i>
          <h3>Analyse CSV</h3>
          <p>Importez et visualisez vos fichiers CSV avec graphiques dynamiques.</p>
          <Button label="Analyser" class="p-button-sm" />
        </div>

        <div class="feature-card">
          <i class="pi pi-images"></i>
          <h3>Gestion Médias</h3>
          <p>Organisez vos images, vidéos et fichiers multimédias.</p>
          <Button label="Gérer" class="p-button-sm" />
        </div>

        <div class="feature-card">
          <i class="pi pi-shield"></i>
          <h3>Coffre sécurisé</h3>
          <p>Stockez vos identifiants et mots de passe en toute sécurité.</p>
          <Button label="Accéder" class="p-button-sm" />
        </div>

        <div class="feature-card">
          <i class="pi pi-book"></i>
          <h3>Cours & Progression</h3>
          <p>Suivez vos cours et votre avancement.</p>
          <ProgressBar :value="progress" />
          <small>{{ progress }}% complété</small>
        </div>

        <div class="feature-card">
          <i class="pi pi-headphones"></i>
          <h3>Sourates</h3>
          <p>Écoutez vos sourates préférées à tout moment.</p>
          <Button label="Écouter" class="p-button-sm p-button-success" />
        </div>

        <div class="feature-card">
          <i class="pi pi-users"></i>
          <h3>Campus</h3>
          <p>Mettez en relation des étudiants, créez des groupes et collaborez facilement.</p>
          <Button label="Accéder" class="p-button-sm p-button-primary" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Logout from "../utils/auth"
const user = ref({
  username: "Yassar"
});

const progress = ref(65);
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  padding: 2rem 1rem;
}

.logo {
  margin-bottom: 2rem;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.menu li.active,
.menu li:hover {
  background: #1e293b;
}

/* MAIN */
.main {
  flex: 1;
  padding: 2rem;
  background: #f1f5f9;
  overflow-y: auto;
}

/* TOPBAR */
.topbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

/* FEATURES */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card i {
  font-size: 2rem;
  color: #3b82f6;
}
</style>
