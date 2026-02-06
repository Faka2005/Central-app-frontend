<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getSourateByRecitateurId } from "../../utils/sourate";
import { GetRecitateur } from "../../utils/recitateur";

const props = defineProps<{ name: string }>();
const route = useRoute();
const surahs = ref([]);

onMounted(async () => {
  const slug = route.params.name as string;
  const reciterId=GetRecitateurById()
  surahs.value = await getSourateByRecitateurId(slug);
});

</script>

<template>
  <div>
    <h1>Récitateur  {{ props.name.toUpperCase() }}</h1>

    <ul v-if="surahs.length">
      <li v-for="s in surahs" :key="s.id">
        {{ s.number }} - {{ s.name }}
      </li>
    </ul>

    <p v-else>Aucune sourate trouvée</p>
  </div>
</template>
