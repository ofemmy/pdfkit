import { createStore } from "vuex";
import { File } from "../types";
import { uniqBy } from "lodash";
interface State {
  fileList: Array<File>;
  destinationDirectory: string;
}
export const AppStore = createStore<State>({
  state() {
    return {
      fileList: [],
      destinationDirectory: "",
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
    setDestinationDirectory(state, dirName) {
      state.destinationDirectory = dirName;
    },
    updateList(state, payload) {
      state.fileList = payload;
    },
    clearFileList(state) {
      state.fileList = [];
    },
    updateDirectory(state, dirName: string) {
      console.log(dirName);
    },
  },
});
