/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// declare module "@vue/runtime-core" {
//   interface State {
//     fileList: any[];
//   }
//   interface ComponentCustomProperties {
//     $store: Store<State>;
//   }
// }
