<template>
  <div class="admin-page">
    <h1>Administration des services</h1>


<Dialog
  header="Ajouter un mot de passe"
  v-model:visible="showAddDialog"
  modal
  :style="{ width: '400px' }"
>
  <div class="p-fluid">
    <div class="p-field">
      <label>Site</label>
      <InputText v-model="newPassword.site" />
    </div>

    <div class="p-field">
      <label>Email</label>
      <InputText v-model="newPassword.email" />
    </div>

    <div class="p-field">
      <label>Password</label>
      <InputText v-model="newPassword.password" />
    </div>

    <div class="p-field">
      <label>Description</label>
      <InputText v-model="newPassword.description" />
    </div>
  </div>

  <template #footer>
    <Button label="Annuler" @click="showAddDialog = false" />
    <Button label="Ajouter" class="p-button-success" @click="AddPassword()" />
  </template>
</Dialog>

<Button
  label="Ajouter un mot de passe"
  icon="pi pi-plus"
  class="p-button-success mb-3"
  @click="showAddDialog = true"
/>


  <table>
  <thead>
    <tr>
      <th>Site</th>
      <th>Email</th>
      <th>Password</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="p in passwords" :key="p.id">
      <td>
        <InputText v-model="p.site" />
      </td>
      <td>
        <InputText v-model="p.email" />
      </td>
      <td>
        <InputText v-model="p.password" />
      </td>
      <td>
        <InputText v-model="p.description" />
      </td>
      <td>
        <Button
          label="Save"
          class="p-button-success mr-2"
          @click="UpdatePassword(p.id)"
        />
        <Button
          label="Delete"
          class="p-button-danger"
          @click="DeletePassword(p.id)"
        />
      </td>
    </tr>
  </tbody>
</table>

  </div>



</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import Dialog from "primevue/dialog"
import InputText from "primevue/inputtext"
import Button from "primevue/button"

import {
  getAllPasswords,
  addPassword,
  deletePassword,
  updatePassword,
  type Password
} from "../utils/password"

const passwords = ref<(Password & { id: string })[]>([])
const showAddDialog = ref(false)

const newPassword = ref<Password>({
  site: "",
  email: "",
  password: "",
  description: ""
})

onMounted(async () => {
  await loadPasswords()
})

async function loadPasswords() {
  try {
    const res = await getAllPasswords()
    passwords.value = res
  } catch (err) {
    console.error("Erreur chargement :", err)
  }
}

async function AddPassword() {
  try {
    const res = await addPassword(newPassword.value)
    passwords.value.push(res)
    newPassword.value = {
      site: "",
      email: "",
      password: "",
      description: ""
    }
    showAddDialog.value = false
  } catch (err) {
    console.error("Erreur ajout :", err)
  }
}

async function DeletePassword(id: string) {
  try {
    await deletePassword(id)
    passwords.value = passwords.value.filter(p => p.id !== id)
  } catch (err) {
    console.error("Erreur suppression :", err)
  }
}

async function UpdatePassword(id: string) {
  const password = passwords.value.find(p => p.id === id)
  if (!password) return

  try {
    await updatePassword(id, {
      site: password.site,
      email: password.email,
      password: password.password,
      description: password.description
    })
  } catch (err) {
    console.error("Erreur modification :", err)
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