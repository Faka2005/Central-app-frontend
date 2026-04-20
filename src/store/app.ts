import { defineStore } from 'pinia'

type Theme = 'light' | 'dark' | 'system'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'system' as Theme,
    isSidebarOpen: true,
    // On garde une référence pour le service toast
    toast: null as any 
  }),

  actions: {
    // 1. Initialisation (à appeler dans App.vue)
    setToastService(toastService: any) {
      this.toast = toastService
    },

    // 2. Notifications Standards (Haut-Droite)
    quick(severity: 'success' | 'info' | 'warn' | 'error', title: string, message: string) {
      if (this.toast) {
        this.toast.add({
          severity,
          summary: title,
          detail: message,
          life: 3000
        })
      }
    },

    // 3. Notification avec Template (Bas-Centre)
    action(title: string, user: string, avatar: string) {
      if (this.toast) {
        this.toast.add({
          severity: 'success',
          summary: title,
          group: 'action-toast',
          data: { user, avatar }
        } as any)
      }
    },

    // Raccourcis utilitaires
    success(title: string, msg: string) { this.quick('success', title, msg) },
    error(title: string, msg: string) { this.quick('error', title, msg) },

    // 4. Gestion du Thème
    setTheme(newTheme: Theme) {
      this.theme = newTheme
      // Logique pour appliquer la classe .dark
      const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.toggle('dark', isDark)
    }
  }
})