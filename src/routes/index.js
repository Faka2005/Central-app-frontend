// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import ServiceUnavailable from "../pages/ServiceUnavailable.vue";
// Pages publiques
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";

// Composants Recitateur
import Recitateur from "../components/Recitateur/Recitateur.vue";
import RecitateurDetail from "../components/Recitateur/RecitateurDetail.vue";

// Layouts et pages protégées
import AdminDashboard from "../pages/admin/AdminDashboard.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import AuthLayout from "../layout/AuthLayout.vue";
import DashboardPage from "../pages/DashboardPage.vue"; // layout utilisateur connecté
import ServicesPage from "../pages/ServicesPage.vue";
import AdminServicePage from "../pages/admin/AdminServicePage.vue";
import AdminUsers from "../pages/admin/AdminUsers.vue";
const routes = [
  // Routes publiques
  { path: "/", name: "Home", component: HomePage },
  { path: "/reciters", name: "Recitateur", component: Recitateur },
  {
    path: "/reciters/:name",
    name: "RecitateurDetail",
    component: RecitateurDetail,
    props: true, // important pour passer :name comme prop
  },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  {path:"/services",name:"Service",component:ServicesPage},
    {
    path: "/service-unavailable",
    name: "ServiceUnavailable",
    component: ServiceUnavailable,
  },
  // Routes accessibles uniquement si connecté (layout utilisateur)
{
  path: "/app",
  name: "App",
  component: AuthLayout, // layout parent pour tout ce qui est connecté
  children: [
    {
      path: "", 
      name: "Dashboard", 
      component: DashboardPage
    }
    //,
    //{
    //  path: "password",
    //  component: PasswordLayout, // layout spécifique pour la partie gestionnaire de mot de passe
    //  children: [
    //    { path: "", name: "PasswordHome", component: PasswordHomePage },
    //    { path: "generate", name: "PasswordGenerate", component: PasswordGeneratePage },
    //  ]
    //},
    //{
    //  path: "csv",
    //  component: CsvLayout,
    //  children: [
    //    { path: "", name: "CsvViewer", component: CsvViewerPage },
    //  ]
    //}
  ]
}
,

  // Routes admin (layout admin)
  {
    path: "/admin",
    name: "Admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
          {
      path: "services", 
      name: "AdminServicePage", 
      component: AdminServicePage
    },
       {
         path: "users",
         name: "AdminUsers",
         component: AdminUsers,
       },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
