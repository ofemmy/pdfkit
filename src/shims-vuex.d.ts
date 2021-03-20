/* eslint-disable */
import { Store } from "vuex";
declare module "@vue/runtime-core" {
  import { ComponentCustomProperties } from "vue";
  interface State {
    fileList: any[];
  }
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
