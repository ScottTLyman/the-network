<template>
  <div class="d-flex flex-column bg-info p-3">
    <span class="navbar-text">
      <button
        class="
          btn
          selectable
          text-success
          lighten-30
          text-uppercase
          my-2 my-lg-0
        "
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="my-2 my-lg-0" v-else>
        <img
          :src="user.picture"
          alt="user photo"
          height="130"
          class="rounded"
        />
        <span class="badge rounded-pill bg-info mdi mdi-school">{{
          user.graduated
        }}</span>
        <div class="mt-2">
          <span class="mx-3 text-secondary darken-20">{{ user.nickname }}</span>
          <router-link
            :to="{
              name: 'Profile',
              params: { id: account.id },
            }"
          >
            <h4 class="hoverable m-3">My Profile</h4>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable text-danger"
            @click="logout"
          >
            <i class="mdi mdi-logout"></i>
            Log Out
          </div>
        </div>
      </div>
    </span>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
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
}
</style>