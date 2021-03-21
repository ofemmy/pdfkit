<template>
  <div id="sidebar" class="h-screen bg-gray-900 w-64 flex fixed flex-col mt-10">
    <div class="px-4 py-6 flex items-center justify-between mt-2">
      <span class="uppercase text-xs inline text-gray-400">file explorer</span>
      <div class="inline-block cursor-pointer text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
    <div class="space-y-2" v-if="files.length > 0">
      <draggable
        v-model="files"
        tag="transition-group"
        ghost-class="ghost"
        item-key="id"
      >
        <template #item="{ element }">
          <div
            class="flex items-center p-1 px-4 hover:bg-gray-800 text-sm rounded-sm cursor-move text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-4 h-4 mr-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="text-xs">{{ shorten(element.name) }}</span>
            <button class="ml-auto" type="button" @click="removeFile(element)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 hover:bg-gray-300 hover:text-primary rounded-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </template>
      </draggable>
    </div>
    <div v-else class="px-4">
      <p class="text-xs">You have not selected any files yet.</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import { File } from "../types";
import { ipcRenderer } from "electron";
import { truncate } from "lodash";
export default defineComponent({
  name: "SideBar",
  components: {
    draggable,
  },
  computed: {
    files: {
      get(): Array<File> {
        return this.$store.state.fileList;
      },
      set(value): void {
        this.$store.commit("updateList", value);
      },
    },
  },
  methods: {
    removeFile(file: File) {
      this.$store.commit("remove", file);
    },
    shorten(name: string) {
      return truncate(name, { length: 25 });
    },
  },
  mounted() {
    //console.log(state);
  },
});
//   mounted() {
//   //   ipcRenderer.on("file-selected", (_, args) => {
//   //     const fileNames = args.map((filePath) => filePath.split("/").pop());
//   //     console.log(fileNames);
//   //     this.updateList(fileNames);
//   //   });
//   // },
// }
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}
</style>
