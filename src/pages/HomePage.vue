<template>
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <h1>Nexhub</h1>
        <p class="subtitle">
          Votre hub central pour toutes vos applications numériques.
        </p>

        <button class="btn-primary" @click="scrollToServices">
          Voir les services
        </button>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="services">
      <div class="container">
        <h2>Nos Services</h2>

        <div v-if="loading">Chargement...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div class="cards" v-if="services.length">
          <div class="card" v-for="service in services" :key="service.name">
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>

            <a
              v-if="service.etat"
              :href="service.link"
              target="_blank"
              class="btn-secondary"
            >
              Accéder
            </a>

            <span v-else class="btn-secondary disabled">
              Bientôt disponible
            </span>
          </div>
        </div>

        <div v-if="!loading && !services.length">
          Aucun service disponible.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { getUser } from "../utils/auth";

interface Service {
  name: string;
  description: string;
  link: string;
  etat: boolean;
}// @ts-ignore


const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

const services = ref<Service[]>([]);
const loading = ref(true);
const error = ref("");

const user = getUser();
if (user && user.id) {
  router.push("/app");
}

onMounted(async () => {
  try {
    const res = await axios.get(`${API_URL}/services`);
    services.value = res.data;
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors du chargement des services.";
  } finally {
    loading.value = false;
  }
});

const scrollToServices = () => {
  const el = document.getElementById("services");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
.page {
  font-family: Inter, sans-serif;
  background: #0f172a;
  color: white;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 6rem 1rem;
  background: linear-gradient(135deg, #1e293b, #334155);
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
}

.subtitle {
  margin-top: 1rem;
  opacity: 0.8;
}

.btn-primary {
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: #2563eb;
  border: none;
  border-radius: 999px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.services {
  padding: 4rem 1rem;
  background: #1e293b;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background: #334155;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  background: #475569;
}

.btn-secondary {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #1db954;
  border-radius: 999px;
  color: white;
  text-decoration: none;
}

.btn-secondary.disabled {
  background: #6b7280;
  cursor: not-allowed;
}

.error {
  color: #f87171;
  margin-top: 1rem;
}
</style>
