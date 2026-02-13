<template>
  <div class="services-page dark">
    <h1>Nos Services</h1>
    <p class="subtitle">
      Tous vos outils numériques réunis dans Nexhub
    </p>

    <div class="services-list">
      <div
        class="service-card"
        v-for="service in services"
        :key="service.name"
      >
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>

        <router-link
          v-if="service.etat"
          :to="service.link"
          class="btn"
        >
          Accéder
        </router-link>
<router-link
  v-else
  :to="{ name: 'ServiceUnavailable' }"
  class="btn disabled"
>
  En développement
</router-link>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Service {
  name: string;
  description: string;
  link: string;
  etat: boolean;
}

const services = ref<Service[]>([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/services");
  services.value = res.data;
});
</script>

<style scoped>
/* Page wrapper */
.services-page {
  min-height: 100vh;
  padding: 4rem 1.5rem;
  background: #0f172a;
  color: #e5e7eb;
  font-family: Inter, system-ui, sans-serif;
}

/* Titles */
h1 {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 800;
  color: #f8fafc;
}

.subtitle {
  text-align: center;
  color: #94a3b8;
  margin: 1rem 0 3rem;
}

/* Grid */
.services-list {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

/* Cards */
.service-card {
  background: #1e293b;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.service-card:hover {
  transform: translateY(-6px);
  background: #334155;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.service-card h3 {
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #f1f5f9;
}

.service-card p {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Buttons */
.btn {
  margin-top: 1.6rem;
  padding: 0.65rem 1.6rem;
  border-radius: 999px;
  background: #2563eb;
  color: white;
  font-weight: 700;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.btn:hover {
  background: #1e4fd8;
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.45);
}
  
</style>

