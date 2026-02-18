<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { GetRecitateur, type Reciter, type Surah } from "../../utils/recitateur";

const route = useRoute();
  // @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

// --------------------
// État
// --------------------
const reciter = ref<Reciter | null>(null);
const surahs = ref<Surah[]>([]);
const loading = ref(true);

// Playlist
const currentIndex = ref(0);
const audioRef = ref<HTMLAudioElement | null>(null);

// --------------------
// Computed
// --------------------
const currentSurah = computed(() => surahs.value[currentIndex.value] || null);
const currentAudioSrc = computed(() => {
  if (!reciter.value || !currentSurah.value) return "";
  return `${API_URL}/reciters/${reciter.value.slug.toLowerCase()}/${currentSurah.value.audioFile}`;
});

// --------------------
// Lifecycle
// --------------------
onMounted(async () => {
  try {
    const slug = route.params.name as string;
    reciter.value = await GetRecitateur(slug);
    surahs.value = reciter.value.surahs;
  } finally {
    loading.value = false;
  }
});

// --------------------
// Audio
// --------------------
const playSurah = async (index: number) => {
  currentIndex.value = index;
  await nextTick();
  audioRef.value?.play().catch(() => {
    console.warn("Lecture bloquée par le navigateur.");
  });
};

const next = () => {
  if (currentIndex.value < surahs.value.length - 1) {
    playSurah(currentIndex.value + 1);
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    playSurah(currentIndex.value - 1);
  }
};

const onEnded = () => {
  next();
};
</script>
<template>
  <div class="spotify-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="logo">🎧 Quranify</div>

      <nav class="menu">
        <router-link to="/reciters" class="menu-item">
          🎙️ Récitateurs
        </router-link>
      </nav>
    </aside>

    <!-- MAIN -->
    <main class="main">
      <!-- TOP BAR -->
      <header class="topbar">
        <router-link to="/reciters" class="back-btn">←</router-link>
      </header>

      <!-- CONTENT -->
      <section class="content">
        <h1 v-if="reciter" class="reciter-title">
          {{ reciter.name }}
        </h1>

        <p v-if="loading" class="loading">Chargement…</p>

        <!-- PLAYER -->
        <div v-if="currentSurah" class="player">
          <span class="label">Lecture en cours</span>
          <h2>{{ currentSurah.number }} — {{ currentSurah.name }}</h2>

          <audio
            ref="audioRef"
            :key="currentAudioSrc"
            :src="currentAudioSrc"
            controls
            @ended="onEnded"
          />

          <div class="controls">
            <button @click="prev" :disabled="currentIndex === 0">⏮</button>
            <button @click="next" :disabled="currentIndex === surahs.length - 1">⏭</button>
          </div>
        </div>

        <!-- PLAYLIST -->
        <ul v-if="surahs.length" class="playlist">
          <li
            v-for="(s, index) in surahs"
            :key="s.id"
            :class="{ active: index === currentIndex }"
            @click="playSurah(index)"
          >
            <span class="index">
              {{ index === currentIndex ? "▶" : s.number }}
            </span>
            <span class="title">{{ s.name }}</span>
          </li>
        </ul>
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
  padding: 0 1.2rem;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
}

.back-btn:hover {
  background: #1db954;
}

/* Content */
.content {
  padding: 1.5rem;
  overflow-y: auto;
}

.reciter-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

/* Player */
.player {
  background: linear-gradient(180deg, #1e1e1e, #121212);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.player .label {
  font-size: 0.75rem;
  color: #b3b3b3;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.player h2 {
  margin: 0.4rem 0 1rem;
}

/* Controls */
.controls {
  margin-top: 1rem;
}

.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  margin-right: 1rem;
  cursor: pointer;
}

.controls button:hover:not(:disabled) {
  color: #1db954;
}

.controls button:disabled {
  opacity: 0.3;
}

/* Playlist */
.playlist {
  list-style: none;
  padding: 0;
}

.playlist li {
  display: grid;
  grid-template-columns: 40px 1fr;
  padding: 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  color: #b3b3b3;
}

.playlist li:hover {
  background: #1a1a1a;
  color: white;
}

.playlist li.active {
  color: #1db954;
  font-weight: 700;
  background: #1a1a1a;
}

.index {
  text-align: center;
}

/* Loading */
.loading {
  color: #b3b3b3;
}
</style>


