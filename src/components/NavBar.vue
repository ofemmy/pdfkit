<template>
  <div
    class="bg-primary fixed w-full z-10 h-10 shadow-sm border-b border-gray-800"
  >
    <ul class="space-x-4 flex justify-center items-center">
      <li class="text-gray-300 hover:text-gray-400 text-sm py-3 cursor-pointer">
        <router-link to="/merge">Merge pdfs</router-link>
      </li>
      <li class="text-gray-300 hover:text-gray-400 text-sm py-3 cursor-pointer">
        <router-link to="/split">Split pdfs</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
