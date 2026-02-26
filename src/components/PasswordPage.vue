<template>
  <h1>Gestion des mots de passe</h1>

  <p class="count">
    {{ filteredPasswords.length }} mot{{ filteredPasswords.length > 1 ? "s" : "" }}
    enregistré{{ filteredPasswords.length > 1 ? "s" : "" }}
  </p>

  <!-- 🔍 Barre recherche -->
  <div class="search-bar">
    <InputText v-model="searchQuery" placeholder="Rechercher par site ou email..." class="w-full" />
  </div>

  <div class="actions-bar">
    <Button label="Exporter CSV" icon="pi pi-download" class="p-button-success" @click="exportCSV" />

    <FileUpload mode="basic" accept=".csv" chooseLabel="Importer CSV" customUpload auto @uploader="importCSV"
      class="p-button-secondary" />

    <Button label="Ajouter" icon="pi pi-plus" class="p-button-success" @click="showAddDialog = true" />
  </div>

  <!-- TABLE -->
  <DataTable :value="filteredPasswords" dataKey="id" :loading="loading" paginator :rows="5" stripedRows
    responsiveLayout="scroll">
    <Column field="site" header="Site" sortable />
    <Column field="email" header="Email" sortable />

    <Column header="Password">
      <template #body="{ data }">
        <div class="password-cell">
          <InputText :type="isVisible(data.id) ? 'text' : 'password'" :modelValue="data.password" readonly />
          <Button :icon="isVisible(data.id) ? 'pi pi-eye-slash' : 'pi pi-eye'" class="p-button-text"
            @click="toggleVisibility(data.id)" />
          <Button icon="pi pi-copy" class="p-button-text" @click="copyPassword(data.password)" />
        </div>
      </template>
    </Column>

    <Column field="description" header="Description" />

    <Column header="Actions">
      <template #body="{ data }">
        <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="confirmDelete(data)" />
      </template>
    </Column>
  </DataTable>

  <!-- ⚠️ Dialog confirmation suppression -->
  <Dialog header="Confirmer la suppression" v-model:visible="showDeleteDialog" modal :style="{ width: '350px' }">
    <p>
      Êtes-vous sûr de vouloir supprimer
      <strong>{{ passwordToDelete?.site }}</strong> ?
    </p>

    <template #footer>
      <Button label="Annuler" @click="showDeleteDialog = false" />
      <Button label="Supprimer" class="p-button-danger" @click="deleteConfirmed" />
    </template>
  </Dialog>

  <Dialog header="Ajouter un mot de passe" v-model:visible="showAddDialog" modal :style="{ width: '400px' }" >
     <div class="p-fluid"> <div class="p-field">
       <label>Site</label>
        <InputText v-model="newPassword.site" />
         </div> <div class="p-field">
           <label>Email</label>
            <InputText v-model="newPassword.email" />
             </div> <div class="p-field"> 
              <label>Password</label>
               <div class="password-field"> 
                <InputText v-model="newPassword.password" />
                 <Button label="Générer" class="p-button-secondary" @click="generatePassword()" />
                  </div> </div> <div class="p-field"> <label>Description</label> <InputText v-model="newPassword.description" /> </div> </div> <template #footer> <Button label="Annuler" @click="showAddDialog = false" /> <Button label="Ajouter" class="p-button-success" @click="AddPassword()" /> </template> </Dialog>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import FileUpload from "primevue/fileupload"
import Dialog from "primevue/dialog"

import {
  addPassword,
  getAllPasswords,
  deletePassword,
  type Password
} from "../utils/password"

const passwords = ref<(Password & { id: string })[]>([])
const loading = ref(true)
const showAddDialog = ref(false)
const searchQuery = ref("")
const visiblePasswords = ref<string[]>([])

const showDeleteDialog = ref(false)
const passwordToDelete = ref<(Password & { id: string }) | null>(null)

onMounted(loadPasswords)

const newPassword = ref<Password>({ site: "", email: "", password: "", description: "" }) 
async function loadPasswords() {
  loading.value = true
  try {
    passwords.value = await getAllPasswords()
    visiblePasswords.value = []
  } finally {
    loading.value = false
  }
}

function generatePassword(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?";
  
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }

  newPassword.value.password = result;
}

async function AddPassword() {
  if (!newPassword.value.site || !newPassword.value.email || !newPassword.value.password) {
    alert("Champs obligatoires manquants");
    return;
  }

  try {
    const res = await addPassword(newPassword.value);

    passwords.value.push(res);

    newPassword.value = {
      site: "",
      email: "",
      password: "",
      description: ""
    };

    showAddDialog.value = false;

  } catch (err) {
    console.error("Erreur ajout :", err);
    alert("Erreur lors de l'ajout");
  }
}
const filteredPasswords = computed(() => {
  if (!searchQuery.value) return passwords.value

  return passwords.value.filter(p =>
    p.site.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function toggleVisibility(id: string) {
  if (visiblePasswords.value.includes(id)) {
    visiblePasswords.value = visiblePasswords.value.filter(v => v !== id)
  } else {
    visiblePasswords.value.push(id)
    setTimeout(() => {
      visiblePasswords.value = visiblePasswords.value.filter(v => v !== id)
    }, 5000)
  }
}

function isVisible(id: string) {
  return visiblePasswords.value.includes(id)
}

async function copyPassword(password: string) {
  try {
    await navigator.clipboard.writeText(password)
  } catch (err) {
    console.error(err)
  }
}

/* 🔥 Confirmation suppression */
function confirmDelete(password: Password & { id: string }) {
  passwordToDelete.value = password
  showDeleteDialog.value = true
}

async function deleteConfirmed() {
  if (!passwordToDelete.value) return

  await deletePassword(passwordToDelete.value.id)
  passwords.value = passwords.value.filter(
    p => p.id !== passwordToDelete.value!.id
  )

  showDeleteDialog.value = false
  passwordToDelete.value = null
}

/* ==============================
   EXPORT CSV
============================== */
function exportCSV() {
  if (!passwords.value.length) return

  const headers = ["site", "email", "password", "description"]

  const csvRows = [
    headers.join(","), // ligne des en-têtes
    ...passwords.value.map(p =>
      [p.site, p.email, p.password, p.description]
        .map(value => `"${value?.replace(/"/g, '""')}"`) // échappe les guillemets
        .join(",")
    )
  ]

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "passwords.csv"
  link.click()
}

/* ==============================
   IMPORT CSV
============================== */
function importCSV(event: any) {
  const file = event.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = async (e: any) => {
    const text = e.target.result
    const rows = text.split("\n").slice(1) // ignore header

    for (let row of rows) {
      if (!row.trim()) continue

      // Découpe et nettoie les guillemets
      const [site, email, password, description] = row
        .split(",")
        .map((v: string) => v.replace(/^"|"$/g, "").replace(/""/g, '"'))

      try {
        await addPassword({ site, email, password, description })
      } catch (err) {
        console.error("Erreur d'importation :", err)
      }
    }

    // Recharge la liste après import
    await loadPasswords()
  }

  reader.readAsText(file)
}
</script>
<style scoped>
.count {
  margin-bottom: 1rem;
  font-weight: 500;
  color: #64748b;
}

.search-bar {
  margin-bottom: 1rem;
}

.password-cell {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.actions-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>