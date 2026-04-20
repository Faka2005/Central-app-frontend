
// PrimeVue components
import Button from "primevue/button";

// PrimeVue styles (une seule fois)
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import './style.css'


import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

// IMPORTATION DU SERVICE (Indispensable pour les Toasts)
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice'; // Utile pour ConfirmDialog

// PrimeVue components

import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FileUpload from "primevue/fileupload";
import Dialog from "primevue/dialog";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import Avatar from "primevue/avatar"; // Ajouté pour ton template spécial

// PrimeVue styles
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import './style.css'

const app = createApp(App);

// Plugins
app.use(router);
app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService); // ✅ Ajouté ici
app.use(ConfirmationService); // ✅ Ajouté ici pour ton ConfirmDialog

// Composants globaux (pratique pour éviter les imports partout)
app.component("Button", Button);
app.component("InputText", InputText);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("FileUpload", FileUpload);
app.component("Dialog", Dialog);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Toast", Toast); // ✅ Ne pas oublier de l'enregistrer aussi
app.component("Avatar", Avatar); // ✅ Pour tes toasts avec template

app.mount("#app");