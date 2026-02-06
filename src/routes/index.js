  // src/router/index.ts
  import { createRouter, createWebHistory } from "vue-router";
 import HomePage from '../pages/HomePage.vue';
 import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import Recitateur from '../components/Recitateur/Recitateur.vue';
import RecitateurDetail from '../components/Recitateur/RecitateurDetail.vue';
import AdminDashboard from "../pages/admin/AdminDashboard.vue";
import AdminLayout from "../pages/admin/AdminLayout.vue";
  const routes = [
    { path: "/", name: "Home", component: HomePage },
    {
    path: "/reciters/:name",
    name: "RecitateurDetail",
    component: RecitateurDetail,
    props: true, // important pour passer :name comme prop au composant
  },
  { path: "/recitateur", name: "Recitateur", component: Recitateur },
    {path:"/login",name:"Login",component:LoginPage},
    {path:"/register",name:"Register",component:RegisterPage},
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      //{
      //  path: "/user",
      //  name: "AdminListUser",
      //  component: AdminListUser,
      //},
    ],
  },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;
