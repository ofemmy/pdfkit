/* eslint-disable */
import { Store } from "vuex";
import { AppStore } from "./store";
import { File } from "./types";
declare module "@vue/runtime-core" {
  import { ComponentCustomProperties } from "vue";
  interface State {
    fileList: Array<File>;
    destinationDirectory: "";
  }
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
