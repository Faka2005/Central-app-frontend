<template>
  <header class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo">Nexhub</router-link>

      <!-- Burger -->
      <button class="burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Nav -->
      <nav :class="{ open: isOpen }">
        <router-link class="nav-link" to="/">Accueil</router-link>
        <router-link class="nav-link" to="/about">À propos</router-link>

        <!-- SERVICES -->
        <div class="dropdown">
          <button class="nav-link dropdown-btn" @click="toggleServices">
            Services
            <span :class="{ rotate: isServicesOpen }">▾</span>
          </button>

          <div v-if="isServicesOpen" class="dropdown-menu">
            <router-link to="/password-manager">🔐 Mots de passe</router-link>
            <router-link to="/csv-viewer">📊 CSV Viewer</router-link>
            <router-link to="/gallery">🖼 Galerie</router-link>
            <router-link to="/learning">📚 Apprentissage</router-link>
          </div>
        </div>

        <router-link class="nav-link" to="/contact">Contact</router-link>

        <!-- Auth -->
        <template v-if="!isLogin">
          <router-link class="nav-link highlight" to="/login">
            Connexion
          </router-link>
        </template>

        <template v-else>
          <span class="username">{{ username }}</span>
          <button class="btn" @click="logout">Déconnexion</button>
        </template>
      </nav>
    </div>
  </header>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logout from "../utils/auth";

const router = useRouter();

const isLogin = ref(false);
const username = ref("Yassar");

const isOpen = ref(false);           // burger
const isServicesOpen = ref(false);   // dropdown services

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const toggleServices = () => {
  isServicesOpen.value = !isServicesOpen.value;
};

const login = () => router.push("/login");
const register = () => router.push("/register");

const logout = () => {
  Logout();
  isLogin.value = false;
  router.push("/");
};
</script>

<style scoped>
/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #1e293b;
}

.nav-container {
  max-width: 1200px;
  margin: auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LOGO */
.logo {
  font-size: 1.45rem;
  font-weight: 800;
  color: #f8fafc;
  text-decoration: none;
  letter-spacing: 0.5px;
}

/* NAV */
nav {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

/* LINKS */
.nav-link {
  color: #cbd5f5;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #38bdf8;
  transition: width 0.25s ease;
}

.nav-link:hover {
  color: #38bdf8;
}

.nav-link:hover::after {
  width: 100%;
}

/* Highlight login */
.highlight {
  color: #38bdf8;
  font-weight: 600;
}

/* USER */
.username {
  color: #e5e7eb;
  font-size: 0.9rem;
  font-weight: 600;
}

/* BUTTON */
.btn {
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: white;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(56, 189, 248, 0.4);
}

/* BURGER */
.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.burger span {
  width: 22px;
  height: 2px;
  background: #f8fafc;
  border-radius: 2px;
}

/* DROPDOWN */
.dropdown {
  position: relative;
}

.dropdown-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-btn span {
  display: inline-block;
  margin-left: 4px;
  transition: transform 0.25s ease;
}

.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 140%;
  left: 0;
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 12px;
  min-width: 210px;
  padding: 0.4rem 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  animation: fadeIn 0.2s ease;
}

.dropdown-menu a {
  padding: 0.65rem 1rem;
  color: #e5e7eb;
  font-size: 0.9rem;
  text-decoration: none;
  display: block;
}

.dropdown-menu a:hover {
  background: #1e293b;
  color: #38bdf8;
}

/* ANIMATION */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .burger {
    display: flex;
  }

  nav {
    position: absolute;
    top: 64px;
    right: 1rem;
    background: #020617;
    flex-direction: column;
    width: 230px;
    padding: 1.2rem;
    gap: 0.9rem;
    border-radius: 16px;
    border: 1px solid #1e293b;
    display: none;
  }

  nav.open {
    display: flex;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
  }
}
</style>
