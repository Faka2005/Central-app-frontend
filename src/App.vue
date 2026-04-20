<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from "primevue/usetoast"
import { useAppStore } from './store/app'

const toast = useToast()
const appStore = useAppStore()

onMounted(() => {
  // On donne l'accès au service toast au store
  appStore.setToastService(toast)
})
import Toast from 'primevue/toast';
import Footer from './components/Footer.vue'
</script>

<template>
  <Toast position="bottom-center" group="action-toast">
  <template #message="slotProps">
    <div class="flex items-center gap-3">
      <Avatar :image="slotProps.message.data?.avatar" shape="circle" size="large" />
      
      <div class="flex flex-col">
        <span class="font-bold text-blue-600">{{ slotProps.message.data?.user }}</span>
        <span class="text-gray-700">{{ slotProps.message.summary }}</span>
      </div>
    </div>
  </template>
</Toast>
  <router-view />
  <Footer />
</template>