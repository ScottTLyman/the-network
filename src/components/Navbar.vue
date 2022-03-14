<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="../assets/img/network-icon-1897.png" height="45" />
        <h3 class="p-2 text-secondary">TheNetwork</h3>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ></button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
    </div>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
export default {
  setup() {
    return {
      // account: computed(()=> AppState.account),
      // user: computed(() => AppState.user),
      // async login() {
      //   AuthService.loginWithPopup();
      // },
      // async logout() {
      //   AuthService.logout({ returnTo: window.location.origin });
      // },
    };
  },
};
</script>

<style scoped>
/* .dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
} */
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
