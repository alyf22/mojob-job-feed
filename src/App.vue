<template>
  <v-app>
    <v-app-bar app color="white" elevation="0">
      <div class="d-flex align-center">
        <v-img
          alt="Mojob Logo"
          class="shrink mr-2"
          src="./assets/mojob_logo_on_white.png"
          width="135"
          height="50"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
