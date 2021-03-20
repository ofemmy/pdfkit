<template>
  <div class="w-full h-full">
    <div class="flex justify-end items-center border-b border-gray-400 py-2">
      <button
        type="button"
        class="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-gray-800 bg-tertiary hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 mr-4"
      >
        Merge files
      </button>
      <button
        @click="openFileDialog"
        type="button"
        class="inline-flex uppercase items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-tertiary bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      >
        Select files to merge
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron";
import { uniqueId, last } from "lodash";
export default defineComponent({
  name: "Merge",
  computed: {
    files() {
      return this.$store.state.fileList;
    },
  },
  methods: {
    openFileDialog() {
      ipcRenderer.send("open-file-dialog");
    },
  },
  mounted() {
    ipcRenderer.on("file-selected", (_, filePaths) => {
      const fileNames = filePaths.map((filePath) => ({
        id: uniqueId(),
        path: filePath,
        name: last(filePath.split("/")),
      }));
      this.$store.commit("addToFileList", fileNames);
    });
  },
});
</script>
