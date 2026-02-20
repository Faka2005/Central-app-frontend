<template>
        <aside class="sidebar">
      <h2 class="logo">MyPlatform</h2>

      <ul class="menu">
        <li class="active"><i class="pi pi-home"></i> Dashboard</li>
        <li><i class="pi pi-chart-bar"></i> Analyse CSV</li>
        <li><i class="pi pi-images"></i> Médias</li>
        <li><i class="pi pi-shield"></i> Coffre sécurisé</li>
        <li><i class="pi pi-book"></i> Cours</li>
        <li><i class="pi pi-headphones"></i> Sourates</li>
        <li><i class="pi pi-users"></i> Campus</li>
      </ul>
    </aside>
</template>

<style lang="css" scoped>
/* SIDEBAR */
.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  padding: 2rem 1rem;
}
.logo {
  margin-bottom: 2rem;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.menu li.active,
.menu li:hover {
  background: #1e293b;
}
</style>