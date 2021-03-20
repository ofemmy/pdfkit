import { createStore } from "vuex";
import { File } from "../types";
interface State {
  fileList: File[];
}
export const AppStore = createStore<State>({
  state() {
    return {
      fileList: [
        {
          name: "Jean",
          path: "/users/jean",
          id: 0,
        },
        {
          name: "John",
          path: "/users/jean",
          id: 1,
        },
        {
          name: "Joao",
          path: "/users/jean",
          id: 2,
        },
      ],
    };
  },
  mutations: {
    remove(state, file: File) {
      state.fileList = state.fileList.filter((f) => f.id !== file.id);
    },
  },
});
