<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { getUser } from '../utils/auth'
import NavbarAuth from '../components/NavbarAuth.vue'

const router = useRouter()
const user = getUser()

//onMounted(() => {
//  if (!user || user.role === "") {
//    router.push({ name: 'Login' })
//  }
//})
</script>

<template>
  <div class="auth-layout">
    <NavbarAuth />

    <div class="page-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;   /* IMPORTANT : vertical */
  height: 100vh;
  width: 100%;
}

/* CONTENU SOUS NAVBAR */
.page-container {
  flex: 1;
  overflow-y: auto;
  background: #f8fafc;
  padding: 2rem;
}
</style>