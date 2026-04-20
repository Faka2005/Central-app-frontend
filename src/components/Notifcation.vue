<template>
  <Toast position="top-right" />

  <Toast position="bottom-center" group="action-toast">
    <template #message="slotProps">
      <div class="flex flex-col items-start flex-auto">
        <div class="flex items-center gap-2">
          <Avatar :image="slotProps.message.data?.avatar" shape="circle" />
          <span class="font-bold">{{ slotProps.message.data?.user }}</span>
        </div>
        <div class="font-medium text-lg my-4">{{ slotProps.message.summary }}</div>
        <Button size="small" label="Répondre" severity="success" @click="onReply"></Button>
      </div>
    </template>
  </Toast>

  <router-view />
</template>
<script setup lang="ts" >
import { useToast } from "primevue/usetoast";
const toast = useToast();
</script>