<template>
  <div class="w-full h-screen">
    <div class="flex justify-end items-center border-b border-gray-400 py-2">
      <button
        @click="openFileDialog"
        type="button"
        class="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-tertiary bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      >
        Select file to split
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
      <div class="mt-6">
        <fieldset>
          <legend class="sr-only">Split PDF setting</legend>

          <div class="bg-gray-800 rounded-md -space-y-px">
            <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" -->
            <div
              class="relative border rounded-tl-md rounded-tr-md p-4 flex"
              :class="[
                splitMode === 'splitSingle' ? 'border-tertiary z-10' : '',
              ]"
            >
              <div class="flex items-center h-5">
                <input
                  id="settings-option-0"
                  type="radio"
                  value="splitSingle"
                  v-model="splitMode"
                  class="focus:ring-tertiary h-4 w-4 text-tertiary cursor-pointer border-gray-300"
                  checked
                />
              </div>
              <label
                for="settings-option-0"
                class="ml-3 flex flex-col cursor-pointer"
              >
                <!-- On: "text-indigo-900", Off: "text-gray-900" -->
                <span
                  class="block text-sm font-medium"
                  :class="[splitMode === 'splitSingle' ? 'text-tertiary' : '']"
                >
                  Split Mode
                </span>
                <!-- On: "text-indigo-700", Off: "text-gray-500" -->
                <span
                  class="block text-sm"
                  :class="[splitMode === 'splitSingle' ? 'text-tertiary' : '']"
                >
                  Select this to split the PDF into single pages
                </span>
              </label>
            </div>

            <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" -->
            <div
              class="relative border border-gray-200 p-4 flex"
              :class="[
                splitMode === 'extractSingle' ? 'border-tertiary z-10' : '',
              ]"
            >
              <div class="flex items-center h-5">
                <input
                  id="settings-option-1"
                  type="radio"
                  value="extractSingle"
                  v-model="splitMode"
                  class="focus:ring-tertiary h-4 w-4 text-tertiary cursor-pointer border-gray-300"
                />
              </div>
              <label
                for="settings-option-1"
                class="ml-3 flex flex-col cursor-pointer"
              >
                <!-- On: "text-indigo-900", Off: "text-gray-900" -->
                <span
                  class="block text-sm font-medium"
                  :class="[
                    splitMode === 'extractSingle' ? 'text-tertiary' : '',
                  ]"
                >
                  Extract mode (Single Page)
                </span>
                <!-- On: "text-indigo-700", Off: "text-gray-500" -->
                <span
                  class="block text-sm"
                  :class="[
                    splitMode === 'extractSingle' ? 'text-tertiary' : '',
                  ]"
                >
                  Select to extract single page from PDF file
                </span>
              </label>
            </div>
            <div
              class="relative border border-gray-200 p-4 flex"
              :class="[
                splitMode === 'extractMultiple' ? 'border-tertiary z-10' : '',
              ]"
            >
              <div class="flex items-center h-5">
                <input
                  id="settings-option-2"
                  type="radio"
                  value="extractMultiple"
                  v-model="splitMode"
                  class="focus:ring-tertiary h-4 w-4 text-tertiary cursor-pointer border-gray-300"
                />
              </div>
              <label
                for="settings-option-2"
                class="ml-3 flex flex-col cursor-pointer"
              >
                <!-- On: "text-indigo-900", Off: "text-gray-900" -->
                <span
                  class="block text-sm font-medium"
                  :class="[
                    splitMode === 'extractMultiple' ? 'text-tertiary' : '',
                  ]"
                >
                  Extract mode (Multiple Pages)
                </span>
                <!-- On: "text-indigo-700", Off: "text-gray-500" -->
                <span
                  class="block text-sm"
                  :class="[
                    splitMode === 'extractMultiple' ? 'text-tertiary' : '',
                  ]"
                >
                  Select to extract multiple pages from PDF file
                </span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <!-- <div class="mt-4" v-if="splitMode === 'splitSingle'">
        <label
          for="folderOutput"
          class="block text-sm font-medium text-gray-300"
          >Name of folder to save the split pages in
        </label>
        <div class="mt-1">
          <input
            v-model="splitFolderName"
            type="text"
            name="folderOutput"
            id="folderOutput"
            class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md py-1 px-2 bg-gray-800 text-gray-100"
          />
        </div>
        <p class="text-red-600 text-sm mt-1">{{ errorMsg }}</p>
      </div> -->
      <div v-if="splitMode === 'extractSingle'" class="mt-6">
        <div class="flex items-center space-x-2">
          <label for="from">Page</label>
          <input
            type="text"
            v-model="singleExtractPage"
            class="shadow-sm w-20 focus:ring-gray-500 bg-gray-600 focus:border-gray-500 block pr-10 sm:text-sm border-gray-300 rounded-md py-2 px-2 text-white"
          />
        </div>
      </div>
      <div v-if="splitMode === 'extractMultiple'" class="mt-6">
        <div class="flex items-center">
          <div class="flex items-center space-x-2">
            <label for="from">From page</label>
            <input
              v-model="fromPage"
              type="text"
              class="shadow-sm w-20 focus:ring-gray-500 bg-gray-600 focus:border-gray-500 block pr-10 sm:text-sm border-gray-300 rounded-md py-2 px-2 text-white"
            />
          </div>
          <div class="flex ml-8 items-center space-x-2">
            <label for="from">To</label>
            <input
              v-model="toPage"
              type="text"
              class="shadow-sm w-20 focus:ring-gray-500 bg-gray-600 focus:border-gray-500 block pr-10 sm:text-sm border-gray-300 rounded-md py-2 px-2 text-white"
            />
          </div>
        </div>
        <div class="flex items-center mt-4">
          <input
            id="merge_extracted"
            name="merge_extracted"
            type="checkbox"
            v-model="mergeExtracted"
            class="h-4 w-4 text-tertiary focus:tertiary border-gray-300 rounded"
          />
          <label for="merge_extracted" class="ml-2 block text-sm text-gray-100">
            Merge extracted pages into single PDF
          </label>
        </div>
      </div>
      <div class="mt-2" v-if="errorMsg">
        <p class="text-red-600 text-xs">{{ errorMsg }}</p>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          type="button"
          @click="splitHandler"
          class="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-gray-800 bg-tertiary hover:bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-dark mr-4"
        >
          Split pdf
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ipcRenderer } from "electron";
import { Utils } from "../lib/Utils";
import {
  splitIntoSinglePages,
  extractSinglePage,
  extractMultiplePages,
} from "../lib/PdfClient";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Split",
  data() {
    return {
      splitFileName: "",
      errorMsg: "",
      splitMode: "splitSingle",
      singleExtractPage: "",
      fromPage: "",
      toPage: "",
      mergeExtracted: true,
    };
  },
  computed: {
    destinationDir(): string {
      return this.$store.state.destinationDirectory;
    },
  },
  methods: {
    openFileDialog() {
      Utils.openFileDialog();
    },
    openDirectoryDialog() {
      Utils.openDirectoryDialog();
    },

    async splitHandler() {
      const file = this.$store.state.fileList[0];
      if (!file) {
        this.errorMsg = "Please select file to split";
        return;
      }
      const pageNum = this.singleExtractPage;
      let result;
      switch (this.splitMode) {
        case "splitSingle":
          result = await splitIntoSinglePages(file);
          if (!result.errorMsg) {
            result.data.forEach((byteArray, i) => {
              ipcRenderer.send(
                "save-file",
                byteArray,
                `${file.name}-${i + 1}.pdf`,
                this.destinationDir
              );
            });
          } else {
            this.errorMsg = result.errorMsg;
          }
          break;
        case "extractSingle":
          result = await extractSinglePage(file, Number.parseInt(pageNum));
          if (!result.errorMsg) {
            ipcRenderer.send(
              "save-file",
              result.data,
              `${file.name}-extract-${pageNum}.pdf`,
              this.destinationDir
            );
          } else {
            this.errorMsg = result.errorMsg;
          }
          break;
        case "extractMultiple":
          if (isNaN(+this.fromPage) || isNaN(+this.toPage)) {
            this.errorMsg = "Please put in valid page numbers";
            return;
          }
          result = await extractMultiplePages(
            file,
            +this.fromPage,
            +this.toPage,
            this.mergeExtracted
          );
          if (!result.errorMsg && this.mergeExtracted) {
            ipcRenderer.send(
              "save-file",
              result.data,
              `${file.name}-extracted.pdf`,
              this.destinationDir
            );
          } else if (!result.errorMsg && !this.mergeExtracted) {
            result.data.forEach((byteArray, i) => {
              ipcRenderer.send(
                "save-file",
                byteArray,
                `${file.name}-${i + 1}.pdf`,
                this.destinationDir
              );
            });
          } else {
            this.errorMsg = result.errorMsg;
          }
          break;
        default:
          break;
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
