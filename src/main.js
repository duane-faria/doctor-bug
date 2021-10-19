import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes";
import store from "./store";

import "./styles/main.css";

const globalMixin = {
  methods: {
    console(data) {
      console.log(data);
    },
  },
};

const app = createApp(App, {
  mixins: [globalMixin],
});

app.use(routes);

app.use(store);

app.mount("#app");

// import { createApp } from "vue";
// import App from "./App.vue";
// import "./styles/main.css";

// const app = createApp(App);
// app.mixin = [
//   {
//     methods: {
//       teste() {
//         return false;
//       },
//     },
//   },
// ];
// app.mount("#app");
