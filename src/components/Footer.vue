<template>
  <footer class="footer-container">
    <div class="footer-main">
      <div class="footer-left">
        <div class="brand">
          <i class="pi pi-box brand-icon"></i>
          <span class="brand-text">NEX<span class="highlight">HUB</span></span>
        </div>
        <p class="copyright">
          &copy; 2026 Nexhub Cloud Solutions.
          <span class="version">v2.4.0-stable</span>
        </p>
      </div>

      <div class="footer-right">
        <div class="status-card">
          <div class="pulse-wrapper">
            <div class="pulse-dot"></div>
            <div class="pulse-ring"></div>
          </div>
          <span class="status-text">Tous les services sont opérationnels</span>
        </div>
        
        <nav class="footer-links">
          <a href="#" class="footer-link">Documentation</a>
          <a href="#" class="footer-link">Support</a>
          <a href="#" class="footer-link">Confidentialité</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
  margin-top: auto; /* Pousse le footer en bas si dans un flex container */
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* --- BRANDING --- */
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.brand-icon {
  font-size: 1.2rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 8px;
  border-radius: 10px;
}

.brand-text {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #1e293b;
}

.highlight {
  color: #3b82f6;
}

.copyright {
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.version {
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.75rem;
}

/* --- STATUS CARD --- */
.status-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f0fdf4;
  border: 1px solid #dcfce7;
  padding: 0.5rem 1rem;
  border-radius: 12px;
}

.status-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #16a34a;
}

/* --- ANIMATION PULSE --- */
.pulse-wrapper {
  position: relative;
  width: 8px;
  height: 8px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
}

.pulse-ring {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 2px solid #22c55e;
  border-radius: 50%;
  top: -8px;
  left: -8px;
  animation: ripple 2s infinite;
  opacity: 0;
}

@keyframes ripple {
  0% { transform: scale(0.4); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 0; }
}

/* --- LINKS --- */
.footer-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.75rem;
  justify-content: flex-end;
}

.footer-link {
  font-size: 0.85rem;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #3b82f6;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .footer-main {
    flex-direction: column;
    text-align: center;
  }
  .footer-links {
    justify-content: center;
  }
  .copyright {
    justify-content: center;
  }
}
</style>