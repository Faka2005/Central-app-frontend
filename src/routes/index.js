    // src/router/index.ts
    import { createRouter, createWebHistory } from "vue-router";


    // Layouts
    import AuthLayout from "../layout/AuthLayout.vue";
    import AdminLayout from "../layout/AdminLayout.vue";

    // Public Pages
    import HomePage from "../pages/HomePage.vue";
    import LoginPage from "../pages/auth/LoginPage.vue";
    import RegisterPage from "../pages/auth/RegisterPage.vue";
    import ServicesPage from "../pages/ServicesPage.vue";
    import ServiceUnavailable from "../pages/ServiceUnavailable.vue";

    // Reciters
    import Recitateur from "../components/Recitateur/Recitateur.vue";
    import RecitateurDetail from "../components/Recitateur/RecitateurDetail.vue";

    // User
    import DashboardPage from "../pages/DashboardPage.vue";
    import PasswordPage from "../pages/Service/PasswordPage.vue";
    import AnalyseCSV from "../pages/Service/AnalyseCSV.vue";
    import Gallerie from "../pages/Service/Gallerie.vue";
    import MessageChannel from "../pages/Service/MessageChannel.vue";
    // Admin
    import AdminDashboard from "../pages/admin/AdminDashboard.vue";
    import AdminServicePage from "../pages/admin/AdminServicePage.vue";
    import AdminUsers from "../pages/admin/AdminUsers.vue";

    
    import { useUserStore } from "../store/user";
    import { getUser } from "../utils/auth";

    const routes = [
      /**
       *  PUBLIC ROUTES
       */
      {
        path: "/",
        component: () => import("../layout/PublicLayout.vue"),
        children: [
          { path: "", name: "Home", component: HomePage },
          { path: "services", name: "Services", component: ServicesPage },

          { path: "login", name: "Login", component: LoginPage },
          { path: "register", name: "Register", component: RegisterPage },

        ],
      },

      /**
       * AUTH ROUTES
       */
      {
        path: "/app",
        component: AuthLayout,
        meta: { requiresAuth: true, role: 'user'},
        children: [
          {
            path: "",
            name: "Dashboard",
            component: DashboardPage,
          },
          {
            path: 'maintenance',
            name: 'Maintenance',
            component: ServiceUnavailable,
          },
          { path: 'analyse-csv', 
            component: AnalyseCSV, 
            meta: { requiresAuth: true, role: 'user', serviceKey: 'csv_module' } 
          },

          { path: 'gallerie',
            component: Gallerie , 
            meta: { requiresAuth: true, role: 'user', serviceKey: 'gallerie' }
          },
          { path: "password", 
            name: "PasswordPage", 
            component: PasswordPage,
            meta: { requiresAuth: true, role: 'user', serviceKey: 'passwords' }
            
          },
          { path: "reciters",
            name: "Reciters",
              component: Recitateur,
              meta: { requiresAuth: true, role: 'user', serviceKey: 'reciters' },
          },
          {
            path: "reciters/:name",
            name: "ReciterDetail",
            component: RecitateurDetail,
            props: true,
              meta: { requiresAuth: true, role: 'user', serviceKey: 'reciters' },

          },
          {
            path: "messages",
            name: "Messages",
            component: () => MessageChannel,
            meta: { requiresAuth: true, role: 'user', serviceKey: 'messages' },
          }
          //{ path: '/cours', component: () => import('../views/Cours.vue') },
          //{ path: '/sourates', component: () => import('../views/Sourates.vue') },
        
          //{ path: '/amis', component: () => import('../views/Amis.vue') }
        ],
      },

      /**
       * ADMIN ROUTES
       */
      {
        path: "/admin",
        component: AdminLayout,
        meta: { requiresAuth: true, role: 'admin' },
        children: [
          {
            path: "",
            name: "AdminDashboard",
            component: AdminDashboard,
          },
          {
            path: "services",
            name: "AdminServices",
            component: AdminServicePage,
          },
          {
            path: "users",
            name: "AdminUsers",
            component: AdminUsers,
          },
          //{
          //  path: "signalement-users",
          //  name: "SignalementUsers",
          //   component: SignalementUsers,
          //},
        ],
      },

      /**
       * 404
       */
      {
        path: "/:pathMatch(.*)*",
        redirect: "/",
      },
    ];

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });


    //  GLOBAL GUARD

    const maintenanceStates = {
    csv_module: false,  // Ce service est bloqué
    passwords: true,  // Ce service est ouvert
    reciters: false,   // Ce service est bloqué
    csv_module: false,  // Ce service est bloqué
    gallerie: false,  // Ce service est bloqué
    messages: false,  // Ce service est bloqué
  };

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 1. Hydratation (F5)
  if (!userStore.user && to.name !== 'Login') {
    try {
      const user = await getUser();
      if (user) userStore.setUser(user);
    } catch (e) {
      console.error("Session check failed");
    }
  }

  const isAuthenticated = !!userStore.user;
  const userRole = userStore.user?.role?.toLowerCase();
  const isPublicRoute = !to.meta.requiresAuth;

  // 2. Redirection si déjà connecté (Login/Home -> Dashboard)
  if (isAuthenticated && isPublicRoute) {
    const destination = userRole === 'admin' ? 'AdminDashboard' : 'Dashboard';
    return next({ name: destination });
  }

  // 3. Accès privé sans être connecté
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' });
  }

  // 4. Vérification des rôles
  if (to.meta.role) {
    const requiredRole = (to.meta.role ).toLowerCase();
    if (userRole !== 'admin' && userRole !== requiredRole) {
      return next({ name: 'Dashboard' });
    }
  }

  // --- LOGIQUE DE MAINTENANCE ---
  // On récupère la clé du service définie dans la route meta
  const serviceKey = to.meta.serviceKey ;

  // Si la clé existe et que l'état est à FALSE (Maintenance)
  // Note: j'ai inversé pour que true = ouvert, false = maintenance (plus logique)
  if (serviceKey && maintenanceStates[serviceKey] === false) {
    return next({ name: 'Maintenance' });
  }

  next();
});
    export default router;
