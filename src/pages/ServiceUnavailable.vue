<template>
  <div class="unavailable dark">
    <div class="card">
      <h1>🚧 Service en développement</h1>

      <p>
        Ce service n’est pas encore disponible.<br />
        Il arrive très bientôt, reste connecté 😉
      </p>

      <router-link to="/services" class="btn">
        ← Retour aux services
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Page */
.unavailable.dark {
  min-height: 100vh;
  background: #020617; /* noir profond */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e5e7eb;
}

/* Card */
.card {
  background: #0f172a;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  text-align: center;
  max-width: 480px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

/* Title */
h1 {
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #f8fafc;
}

/* Text */
p {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Button */
.btn {
  display: inline-block;
  padding: 0.7rem 1.6rem;
  border-radius: 999px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
}
</style>
