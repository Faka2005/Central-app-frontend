<template>
  <div class="admin-page">
    <h1>Administration des services</h1>

    <table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Description</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.name">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>
            <span :class="service.etat ? 'active' : 'inactive'">
              {{ service.etat ? "Actif" : "En développement" }}
            </span>
          </td>
          <td>
            <button class="btn" @click="toggleService(service)" :class="service.etat ? 'danger' : 'success'">
              {{ service.etat ? "Désactiver" : "Activer" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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

const toggleService = async (service: Service) => {
  service.etat = !service.etat;
  await axios.put(`http://localhost:3000/services/admin/${service.name}`, { etat: service.etat });
};
</script>

<style scoped>
.admin-page {
  max-width: 1100px;
  margin: 3rem auto;
  padding: 1rem;
}

.subtitle {
  color: #64748b;
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

th, td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f1f5f9;
}

.status {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.status.active {
  background: #dcfce7;
  color: #166534;
}

.status.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn.success {
  background: #22c55e;
  color: white;
}

.btn.danger {
  background: #ef4444;
  color: white;
}
</style>