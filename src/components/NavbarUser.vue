<template>
  <header class="topbar">
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    
    <div class="topbar-right">
      <i class="pi pi-bell notification-icon"></i>
      <div class="user-profile">
        <img src="https://ui-avatars.com/api/?name=User" alt="avatar" />
        <span>Mon Profil</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 70px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  
  /* SUPPRIME CETTE LIGNE : margin-left: 260px; */
  
  width: 100%; /* Elle prendra tout l'espace disponible dans le main-wrapper */
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Espace entre la cloche et le profil */
}

.notification-icon {
  font-size: 1.2rem;
  color: #64748b;
  cursor: pointer;
}

.user-profile { 
  display: flex; 
  align-items: center; 
  gap: 0.8rem; 
  cursor: pointer; 
}

.user-profile img { 
  width: 35px; 
  height: 35px; 
  border-radius: 50%; 
}
</style>