import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

// PrimeVue components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FileUpload from "primevue/fileupload";
import Dialog from "primevue/dialog";
import ConfirmDialog from "primevue/confirmdialog";

// PrimeVue styles (une seule fois)
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import './style.css'

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue);

app.component("Button", Button);
app.component("InputText", InputText);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("FileUpload", FileUpload);
app.component("Dialog", Dialog);
app.component("ConfirmDialog", ConfirmDialog);

app.mount("#app");