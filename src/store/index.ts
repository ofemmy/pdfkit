import { createStore } from "vuex";
import { File } from "../types";
import { uniqBy } from "lodash";
interface State {
  fileList: Array<File>;
}
export const AppStore = createStore<State>({
  state() {
    return {
      fileList: [],
    };
  },
  mutations: {
    remove(state, file: File) {
      state.fileList = state.fileList.filter((f) => file.id !== f.id);
    },
    addToFileList(state, files: File[]) {
      const allEntries = [...state.fileList, ...files];
      state.fileList = uniqBy(allEntries, "name");
    },
  },
});
