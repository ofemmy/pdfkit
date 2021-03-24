import { last } from "lodash";
import { File } from "../types";
import { ipcRenderer } from "electron";
import { AppStore } from "../store";
export const Utils = {
  selectFiles(filePaths: string[]): void {
    const currentCount = AppStore.state.fileList.length;
    const files = filePaths.map((filePath, index) => ({
      id: index + currentCount,
      path: filePath,
      name: last(filePath.split("/")),
    }));
    AppStore.commit("addToFileList", files);
  },
  formatFileName(fileName: string): string {
    const x = fileName.split(".")[0];
    return `${x}.pdf`;
  },
  selectDirectory(dirPath: string[]): void {
    AppStore.commit("setDestinationDirectory", dirPath[0]);
  },
  openFileDialog(): void {
    ipcRenderer.send("select-file");
  },
  openDirectoryDialog(): void {
    ipcRenderer.send("select-directory");
  },
};
