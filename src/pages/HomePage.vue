<template>
  <div class="page dark">
    <!-- HERO -->
    <section class="section hero">
      <div class="container hero-content">
        <h1>Nexhub</h1>
        <p class="subtitle">
          Votre hub central pour toutes vos applications numériques.
        </p>

        <router-link to="/services" class="btn-primary">
          Voir tous les services
        </router-link>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="section services">
      <div class="container">
          <ServicesPage/>
      </div>
    </section>

    <!-- FOOTER -->

  </div>
</template>



<script setup lang="ts">
import {getUser} from "../utils/auth";
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import axios from "axios";
import ServicesPage from './ServicesPage.vue'
interface Service {
  name: string;
  description: string;
  link: string;
  etat: boolean;
}
const router=useRouter();
if(getUser().id){router.push('/app')}
const services = ref<Service[]>([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/services");
    services.value = res.data;
  } catch (err) {
    console.error("Erreur lors du chargement des services", err);
  }
});

const goToServices = () => {
  const el = document.getElementById("services");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

</script>

<style scoped>
/* Base */
.page {
  font-family: Inter, system-ui, sans-serif;
  color: #e5e7eb;
  background: #0f172a;
}

/* Sections */
.section {
  padding: 5rem 1rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Hero */
.hero {
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #334155);
  color: #f1f5f9;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.85;
}

/* Buttons */
.btn-primary {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.9rem 1.8rem;
  background: #2563eb;
  color: white;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  display: inline-block;
  margin-top: 1.2rem;
  padding: 0.55rem 1.1rem;
  background: #1db954;
  color: white;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
}

.btn-secondary.disabled {
  background: #6b7280;
  cursor: not-allowed;
}

/* Services section */
.services {
  background: #1e293b;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #f1f5f9;
}

.section-header p {
  color: #cbd5e1;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.card {
  background: #334155;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.4);
  background: #475569;
}

.card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.card p {
  color: #cbd5e1;
  font-size: 0.95rem;
}


html {
  scroll-behavior: smooth;
}

</style>

