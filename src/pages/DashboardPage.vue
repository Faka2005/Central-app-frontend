<template>
  



      <!-- TOPBAR -->
      <div class="topbar">
        <div>
          <h2>Bienvenue {{ user.username }} 👋</h2>
          <p class="subtitle">Voici un aperçu de votre plateforme</p>
        </div>

        <Button
          icon="pi pi-sign-out"
          @click="logout"
          class="logout-btn"
          label="Déconnexion"
        />
      </div>

      <!-- FEATURES -->
      <div class="features-grid">


        <div class="feature-card">
          <div class="icon-box purple">
            <i class="pi pi-images"></i>
          </div>
          <h3>Gestion Médias</h3>
          <p>Organisez vos images, vidéos et fichiers multimédias.</p>
          <Button label="Gérer" class="p-button-sm action-btn" />
        </div>

        <div class="feature-card">
          <div class="icon-box red">
            <i class="pi pi-shield"></i>
          </div>
          <h3>Coffre sécurisé</h3>
          <p>Stockez vos identifiants et mots de passe en toute sécurité.</p>
          <Button label="Accéder" @click="() => router.push({ name: 'PasswordPage' })" class="p-button-sm action-btn" />
        </div>

       

    

        <div class="feature-card">
          <div class="icon-box indigo">
            <i class="pi pi-users"></i>
          </div>
          <h3>Campus</h3>
          <p>Créez des groupes et collaborez facilement.</p>
          <Button label="Accéder" class="p-button-sm p-button-primary" />
        </div>

      </div>

    
  
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Logout from "../utils/auth";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const user = ref({
  username: userStore.user?.username || "Utilisateur"
});
const logout = async () => {
  await Logout();
  router.push({ name: "Home" });
};
</script>

<style scoped>


/* MAIN */
.main {
  flex: 1;
  padding: 2.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  overflow-y: auto;
}

/* TOPBAR */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.topbar h2 {
  margin: 0;
  font-weight: 600;
}

.subtitle {
  margin-top: 4px;
  font-size: 0.9rem;
  color: #64748b;
}

.logout-btn {
  background: white;
  color: #ef4444;
  border-radius: 50%;
}

/* GRID */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem;
}

/* CARD */
.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
}

.feature-card h3 {
  margin: 0;
  font-weight: 600;
}

.feature-card p {
  font-size: 0.9rem;
  color: #64748b;
}

.action-btn {
  margin-top: auto;
}

/* ICON BOX */
.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: white;
}

.blue { background: #3b82f6; }
.purple { background: #8b5cf6; }
.red { background: #ef4444; }
.green { background: #10b981; }
.orange { background: #f59e0b; }
.indigo { background: #6366f1; }

.progress-text {
  font-size: 0.8rem;
  color: #64748b;
}
</style>