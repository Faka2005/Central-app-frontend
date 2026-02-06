
<script setup>
import { ref } from "vue";
const isLogin = ref(false);
const isOpen = ref(false);
const firstName = ref("");
import { useRouter } from 'vue-router';

const router = useRouter(); // <- indispensable
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
const login=()=>{
    router.push('/login');
}
</script>
<template>
  <header class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo">
        <a href="/">Central App</a>
      </div>

      <!-- Burger -->
      <button class="burger" @click="toggleMenu">☰</button>

      <!-- Links -->
      <nav :class="{ open: isOpen }">
        <a href="/">Accueil</a>
        <a href="/about">À propos</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
<template v-if="isLogin">
  <span class="username">{{ firstName }}</span>
  <button class="btn" @click="logout">Déconnexion</button>
</template>

<button v-else class="btn" @click='login'>Connexion</button>

      </nav>
    </div>
  </header>
</template>



<style scoped>
/* Global navbar */
.navbar {
  background: #0f172a;
  padding: 1rem 2rem;
  color: white;
}

/* Container */
.nav-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo a {
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

/* Links */
nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

/* Link style */
nav a {
  color: #e5e7eb;
  text-decoration: none;
  font-weight: 500;
}

nav a:hover {
  color: #38bdf8;
}

/* Button */
.btn {
  background: #38bdf8;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  background: #0ea5e9;
}

/* Burger */
.burger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  nav {
    position: absolute;
    top: 64px;
    right: 0;
    background: #020617;
    flex-direction: column;
    width: 200px;
    padding: 1rem;
    display: none;
  }

  nav.open {
    display: flex;
  }
}
</style>
