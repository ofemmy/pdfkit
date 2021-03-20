/* eslint-disable */
import { Store } from "vuex";
import { AppStore } from "./store";
declare module "@vue/runtime-core" {
  import { ComponentCustomProperties } from "vue";
  interface State {
    fileList: {
      name: string;
      id: number;
    }[];
  }
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
