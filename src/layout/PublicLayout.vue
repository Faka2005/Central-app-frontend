<script setup>
import Navbar from '../components/Navbar.vue';

</script>
<template>

 <Navbar/>

    <main class="content">
      <RouterView /> <!-- ici s’affiche chaque page enfant -->
    </main>
</template>

<style>
.auth-layout {
  display: flex;
}

</style>

