<template>
  <div class="w-full h-screen">
    <div class="flex justify-end items-center border-b border-gray-400 py-2">
      <button
        @click="openFileDialog"
        type="button"
        class="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-tertiary bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      >
        Select files to merge
      </button>
    </div>
    <div class="mt-4">
      <div class="">
        <label for="destination" class="block text-sm font-medium text-gray-300"
          >Destination Folder</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            id="destination"
            v-model="destinationDir"
            class="shadow-sm focus:ring-gray-500 bg-gray-800 focus:border-gray-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-1 px-2 text-gray-100"
          />
          <button
            @click="openDirectoryDialog"
            class="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer hover:bg-gray-800 text-gray-400 hover:text-gray-100 justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="mt-4">
        <label for="fileOutput" class="block text-sm font-medium text-gray-300"
          >Merged File Name</label
        >
        <div class="mt-1">
          <input
            v-model="mergedFileName"
            type="text"
            name="fileOutput"
            id="fileOutput"
            class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md py-1 px-2 bg-gray-800 text-gray-100"
            aria-describedby="file-description"
          />
        </div>
        <p class="text-red-600 text-sm mt-1">{{ errorMsg }}</p>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          @click="merge"
          type="button"
          class="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-gray-800 bg-tertiary hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 mr-4"
        >
          Merge files
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron";
import { Utils } from "../lib/Utils";
import { mergePdf } from "@/lib/PdfClient";
import { File } from "../types";
export default defineComponent({
  name: "Merge",
  data() {
    return { mergedFileName: "", errorMsg: "" };
  },
  computed: {
    files(): Array<File> {
      return this.$store.state.fileList;
    },
    destinationDir(): string {
      return this.$store.state.destinationDirectory;
    },
  },
  methods: {
    openFileDialog() {
      Utils.openFileDialog();
      //ipcRenderer.send("select-file");
    },
    openDirectoryDialog() {
      Utils.openDirectoryDialog();
      //ipcRenderer.send("select-directory");
    },
    async merge() {
      const files = this.$store.state.fileList;
      if (files.length <= 1) {
        this.errorMsg = "Please select more than one file to merge";
        return;
      }
      if (!this.mergedFileName.trim()) {
        this.errorMsg = "Merged filename is required";
        return;
      }
      const result = await mergePdf(files);
      if (!result.errorMsg) {
        ipcRenderer.send(
          "save-file",
          result.data,
          this.mergedFileName,
          this.destinationDir
        );
      }
    },
  },
  mounted() {
    ipcRenderer.on("file-selected", (_, filePaths) => {
      Utils.selectFiles(filePaths);
    });
    ipcRenderer.on("directory-selected", (_, filePaths) => {
      Utils.selectDirectory(filePaths);
      //this.$store.commit("setDestinationDirectory", filePaths[0]);
    });
  },
});
</script>
