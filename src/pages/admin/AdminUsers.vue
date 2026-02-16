<template>
  <div class="admin-page">
    <h1>Administration des services</h1>



    <!-- Dialog PrimeVue -->
    <Dialog header="Ajouter un utilisateur" v-model:visible="showAddUser" modal :closable="true" :style="{ width: '400px' }">
      <div class="p-fluid">
        <div class="p-field">
          <label for="username">Username</label>
          <InputText id="username" v-model="newUser.username" />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="newUser.email" type="email"/>
        </div>
        <div class="p-field">
          <label for="password">Mot de passe</label>
          <InputText id="pasword" v-model="newUser.password" type="password"/>
        </div>
        <div class="p-field">
          <label for="role">Role</label>
          <Dropdown id="role" v-model="newUser.role" :options="roles" optionLabel="label" optionValue="value"/>
        </div>
      </div>
      <template #footer>
        <Button label="Annuler" icon="pi pi-times" class="p-button-text" @click="showAddUser = false"/>
        <Button label="Ajouter" icon="pi pi-check" class="p-button-success" @click="AddUser()"/>
      </template>
    </Dialog>    <!-- Bouton pour ouvrir le Dialog -->
    <Button label="Ajouter un utilisateur" icon="pi pi-plus" class="p-button-success mb-3" @click="showAddUser = true"/>


    <table>
      <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Date de création</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.name">
        <td>{{ user.username }}</td>
        <td>{{user.email}}</td>
        <td>{{user.role}}</td>
        <td>{{user.createdAt}}</td>
        <td>
          <button
              class="btn"
              @click="UpdateUserRole(user.id, user.role)"
              :class="user.role === 'admin' ? 'danger' : 'success'"
          >
            {{ user.role === 'admin' ? "Mettre User" : "Mettre Admin" }}
          </button>
          <button
              class="btn"
              @click="DeleteUser(user.id)"
              :class='success'
          >
            Supprimer l'utilisateur
          </button>

        </td>
      </tr>
      </tbody>
    </table>
  </div>



</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

// PrimeVue components
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const users = ref([])
const showAddUser = ref(false)
const newUser = ref({ username: '', email: '', password:'',role: 'user' })

const roles = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' }
]

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/users")
  users.value = res.data
})

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

async function AddUser() {
  if (!newUser.value.username || !newUser.value.email || !newUser.value.password) {
    alert("Tous les champs sont obligatoires")
    return
  }

  try {
    const res = await axios.post("http://localhost:3000/auth/register", newUser.value)
    users.value.push(res.data)
    newUser.value = { username: '', email: '',password: '', role: 'user' }
    showAddUser.value = false
  } catch (err) {
    console.error("Erreur ajout :", err)
  }
}

async function DeleteUser(id) {
  try {
    await axios.delete(`http://localhost:3000/users/${id}`)
    users.value = users.value.filter(u => u.id !== id)
  } catch (err) {
    console.error("Erreur suppression :", err)
  }
}

async function UpdateUserRole(id, role) {
  const user = users.value.find(u => u.id === id)
  if (!user) return
  const newRole = role === "admin" ? "user" : "admin"
  try {
    await axios.patch(`http://localhost:3000/users/${id}/role`, { role: newRole })
    user.role = newRole
  } catch (err) {
    console.error("Erreur changement rôle :", err)
  }
}
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

 .modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0,0,0,0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
 }

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.modal-actions .btn {
  margin-left: 0.5rem;
}


</style>