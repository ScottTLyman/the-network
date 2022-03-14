<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid flex-grow-1">
    <div class="row">
      <div class="col-2 p-0">
        <Login />
      </div>
      <div class="col-10">
        <CreatePost />
        <router-view />
      </div>
    </div>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
