//<script>
//import { useRouter } from 'vue-router';
//
//const router = useRouter(); // <- indispensable
//
//if(user.status!=false && user.role!="admin"){
//  router.push('/')
//}
//</script>
<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <!-- menu admin fixe -->
    </aside>

    <main class="content">
      <RouterView /> <!-- ici s’affiche chaque page enfant -->
    </main>
  </div>
</template>
