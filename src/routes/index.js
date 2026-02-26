// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";

// Layouts
import AuthLayout from "../layout/AuthLayout.vue";
import AdminLayout from "../layout/AdminLayout.vue";

// Public Pages
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ServicesPage from "../pages/ServicesPage.vue";
import ServiceUnavailable from "../pages/ServiceUnavailable.vue";

// Reciters
import Recitateur from "../components/Recitateur/Recitateur.vue";
import RecitateurDetail from "../components/Recitateur/RecitateurDetail.vue";

// User
import DashboardPage from "../pages/DashboardPage.vue";
import PasswordPage from "../components/PasswordPage.vue";
// Admin
import AdminDashboard from "../pages/admin/AdminDashboard.vue";
import AdminServicePage from "../pages/admin/AdminServicePage.vue";
import AdminUsers from "../pages/admin/AdminUsers.vue";

const routes = [
  /**
   * 🌍 PUBLIC ROUTES
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
   * 🔐 AUTH ROUTES
   */
  {
    path: "/app",
    component: AuthLayout,
    //meta: { requiresAuth: true },
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
   * 🛡 ADMIN ROUTES
   */
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
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


// 🔐 GLOBAL GUARD
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "Login" });
  }

  if (to.meta.requiresAdmin && user?.role !== "ADMIN") {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
