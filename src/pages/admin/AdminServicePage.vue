<template>
  <div class="admin-page">
    <h1>Administration des services</h1>
    <!-- Dialog PrimeVue -->
    <Dialog header="Ajouter un utilisateur" v-model:visible="showAddService" modal :closable="true" :style="{ width: '400px' }">
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">Name</label>
          <InputText id="name" v-model="newService.name" />
        </div>
        <div class="p-field">
          <label for="description">Description</label>
          <InputText id="description" v-model="newService.description" />
        </div>
        <div class="p-field">
          <label for="link">Link</label>
          <InputText id="link" v-model="newService.link" />
        </div>
        <div class="p-field">
          <label for="etat">État</label>
          <Dropdown id="etat" v-model="newService.etat" :options="etats" optionLabel="label" optionValue="value"/>
        </div>
      </div>
      <template #footer>
        <Button label="Annuler" icon="pi pi-times" class="p-button-text" @click="showAddService = false"/>
        <Button label="Ajouter" icon="pi pi-check" class="p-button-success" @click="addService(    )"/>
      </template>
    </Dialog>    <!-- Bouton pour ouvrir le Dialog -->
    <Button label="Ajouter un utilisateur" icon="pi pi-plus" class="p-button-success mb-3" @click="showAddService = true"/>

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
            <button class="btn danger" @click="deleteService(service)">
              Supprimer
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
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

interface Service {
  id:string;
  name: string;
  description: string;
  link: string;
  etat: boolean;
}
const etats = [
  { label: 'En développement', value: false },
  { label: 'Actif', value: true }
]
const services = ref<Service[]>([]);
const showAddService = ref(false)
const newService = ref({ name: '', description: '', link:'',etat: false })
onMounted(async () => {
  const res = await axios.get("http://localhost:3000/services");
  services.value = res.data;
});

const toggleService = async (service: Service) => {
  service.etat = !service.etat;
  await axios.put(`http://localhost:3000/services/${service.id}`, { etat: service.etat });
};


const deleteService = async (service: Service) => {
  const confirmDelete = confirm(
      `Supprimer le service "${service.id}" ?`
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/services/${service.id}`);

    services.value = services.value.filter(
        (s) => s.id !== service.id
    );

  } catch (error) {
    console.error("Erreur suppression:", error);
  }
};
const addService = async () => {
  try {
    const res = await axios.post(`http://localhost:3000/services`, {
        ...newService.value,
    });

    services.value.push(res.data.service);
    newService.value = {
      name: '',
      description: '',
      link: '',
      etat: false
    };
    showAddService.value = false;

  } catch (error: any) {
    console.error("Erreur d'ajout:", error.response?.data || error);
  }
};


const modifyService = async (service: Service) => {
  try {
    const res = await axios.put(
        `http://localhost:3000/services/${service.id}`,
        {
          name: service.name,
          description: service.description,
          link: service.link,
          etat: service.etat,
        }
    );

    const index = services.value.findIndex(
        (s) => s.id === service.id
    );

    if (index !== -1) {
      services.value[index] = res.data.service;
    }

  } catch (error: any) {
    console.error("Erreur modification:", error.response?.data || error);
  }
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