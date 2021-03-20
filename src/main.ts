import "es6-promise/auto";
import { createApp } from "vue";
import { AppStore } from "./store";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

createApp(App).use(AppStore).use(router).mount("#app");
