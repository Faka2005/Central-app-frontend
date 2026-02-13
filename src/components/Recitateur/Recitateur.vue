<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GetAllRecitateur, Reciters } from "../../utils/recitateur";

const recitateur = ref<Reciters[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    recitateur.value = await GetAllRecitateur();
    console.log("Récitateurs:", recitateur.value);
  } catch (err) {
    console.error("Erreur lors du chargement des récitateurs :", err);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div class="spotify-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="logo">🎧 Quranify</div>

      <nav class="menu">
        <router-link to="/reciters" class="menu-item active">
          🎙️ Récitateurs
        </router-link>
      </nav>
    </aside>

    <!-- MAIN -->
    <main class="main">
      <!-- TOP BAR -->
      <header class="topbar">
        <h1>Récitateurs</h1>
      </header>

      <!-- CONTENT -->
      <section class="content">
        <p v-if="loading" class="loading">Chargement…</p>

        <div v-else-if="recitateur.length" class="reciter-grid">
          <router-link
            v-for="s in recitateur"
            :key="s.id"
            :to="`/reciters/${s.slug}`"
            class="reciter-card"
          >
            <div class="avatar">🎙️</div>
            <h2>{{ s.name }}</h2>
            <span class="subtitle">Récitateur</span>
          </router-link>
        </div>

        <p v-else class="empty">Aucun réciteur trouvé</p>
      </section>
    </main>
  </div>
</template>


<style scoped>
.spotify-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  background: #121212;
  color: white;
  font-family: Inter, system-ui, sans-serif;
}

/* Sidebar */
.sidebar {
  background: #000;
  padding: 1.2rem;
}

.logo {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

.menu-item {
  display: block;
  padding: 0.6rem 0;
  color: #b3b3b3;
  text-decoration: none;
  font-weight: 600;
}

.menu-item.active,
.menu-item:hover {
  color: white;
}

/* Main */
.main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Topbar */
.topbar {
  height: 64px;
  background: rgba(18, 18, 18, 0.95);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}

.topbar h1 {
  font-size: 1.6rem;
  font-weight: 800;
}

/* Content */
.content {
  padding: 1.5rem;
  overflow-y: auto;
}

/* Grid */
.reciter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

/* Card */
.reciter-card {
  background: #181818;
  border-radius: 12px;
  padding: 1.2rem;
  text-decoration: none;
  color: white;
  transition: background 0.2s, transform 0.2s;
}

.reciter-card:hover {
  background: #282828;
  transform: translateY(-4px);
}

.avatar {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background: #1db954;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.reciter-card h2 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  font-size: 0.85rem;
  color: #b3b3b3;
}

/* States */
.loading,
.empty {
  color: #b3b3b3;
}
</style>

