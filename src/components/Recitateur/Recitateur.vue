<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GetRecitateur } from "../../utils/recitateur";


const recitateur = ref([]);

onMounted(async () => {
  recitateur.value = await GetRecitateur();
  console.log(recitateur.value);
});

</script>

<template>
    <div>
        <h1>Liste des Récitateurs</h1>
            <ul v-if="recitateur.length">
      <li v-for="s in recitateur" :key="s.id">
         <a :href="`/reciters/${s.id}`">{{s.name}}</a>
      </li>
    </ul>

    <p v-else>Aucune sourate trouvée</p>
    </div>
</template>
