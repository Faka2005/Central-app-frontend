<template>
  <header class="navbar">
    <div class="nav-left">
      <h2 class="logo">MyPlatform</h2>
    </div>

    <nav class="nav-menu">
      <router-link to="/app" class="nav-item">
        <i class="pi pi-home"></i>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/analyse-csv" class="nav-item">
        <i class="pi pi-chart-bar"></i>
        <span>Analyse CSV</span>
      </router-link>

      <router-link to="/gallerie" class="nav-item">
        <i class="pi pi-images"></i>
        <span>Gallerie</span>
      </router-link>

      <router-link to="/app/password" class="nav-item">
        <i class="pi pi-shield"></i>
        <span>Coffre</span>
      </router-link>

      

      <router-link to="/reciters" class="nav-item">
        <i class="pi pi-headphones"></i>
        <span>Récitateurs</span>
      </router-link>

      <router-link to="/messages" class="nav-item">
        <i class="pi pi-users"></i>
        <span>Messages</span>
      </router-link>

      <router-link to="/amis" class="nav-item">
        <i class="pi pi-user-plus"></i>
        <span>Amis</span>
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 70px;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.3rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.nav-item:hover {
  background: #1e293b;
}

.router-link-active {
  background: #1e293b;
  font-weight: 500;
}
</style>