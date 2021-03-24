<template>
  <div
    class="bg-primary fixed w-full z-10 h-10 shadow-sm border-b border-gray-800"
  >
    <ul class="space-x-4 flex justify-center items-center">
      <li
        class="hover:text-tertiary-dark text-sm py-3 cursor-pointer"
        :class="[isMergeRoute ? 'text-tertiary' : 'text-gray-300']"
      >
        <router-link to="/merge">Merge PDF</router-link>
      </li>
      <li
        class="hover:text-tertiary-dark text-sm py-3 cursor-pointer"
        :class="[isSplitRoute ? 'text-tertiary' : 'text-gray-300']"
      >
        <router-link to="/split">Split PDF</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isMergeRoute() {
      return this.$route.path === "/" || this.$route.path === "/merge";
    },
    isSplitRoute() {
      return this.$route.path === "/split";
    },
  },
};
</script>
