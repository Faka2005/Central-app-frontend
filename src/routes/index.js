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
  import PasswordPage from "../pages/PasswordPage.vue";
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
        { path: "reciters", name: "Reciters", component: Recitateur },
        {
          path: "reciters/:name",
          name: "ReciterDetail",
          component: RecitateurDetail,
          props: true,
        },
        { path: "login", name: "Login", component: LoginPage },
        { path: "register", name: "Register", component: RegisterPage },
        { path: "service-unavailable", name: "ServiceUnavailable", component: ServiceUnavailable },
        { path: "password", name: "PasswordPage", component: PasswordPage },
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
        //{ path: '/analyse-csv', component: () => import('../views/AnalyseCSV.vue') },
        //{ path: '/gallerie', component: () => import('../views/Gallerie.vue') },
        { path: "password", name: "PasswordPage", component: PasswordPage },
        { path: "reciters", name: "Reciters", component: Recitateur },
        {
          path: "reciters/:name",
          name: "ReciterDetail",
          component: RecitateurDetail,
          props: true,
        },

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
// src/router/index.js

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 1. Hydratation du store si vide (F5)
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

  // 2. Accès privé sans être connecté
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' });
  }

  // 3. Déjà connecté sur Login -> Rediriger vers l'accueil
  if (to.name === 'Login' && isAuthenticated) {
    const destination = userRole === 'admin' ? 'AdminDashboard' : 'Dashboard';
    return next({ name: destination });
  }

  // 4. Vérification des rôles
  if (to.meta.role) {
    const requiredRole = to.meta.role.toLowerCase();
    if (userRole !== requiredRole) {
      const homePage = userRole === 'admin' ? 'AdminDashboard' : 'Dashboard';
      
      // CRUCIAL : Si on est déjà en train d'aller vers la homePage, on arrête la redirection
      if (to.name === homePage) {
        return next();
      }
      
      return next({ name: homePage });
    }
  }

  // 5. Autoriser la navigation si aucune condition ci-dessus n'a bloqué
  next();
});
  export default router;
