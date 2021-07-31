<template>
  <div>
    <router-view />
    <div id="mainwrapper"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
