import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import './style.css';
import PrimeVue from "primevue/config";

// PrimeVue styles (UNE SEULE FOIS)
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";



import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.mount("#app");
