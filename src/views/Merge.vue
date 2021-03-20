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
export default defineComponent({
  name: "Merge",
});
</script>
