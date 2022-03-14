<template>
  {{ profile }}
  <div class="profile container-fluid text-center">
    <div class="row">
      <div class="d-flex justify-content-around">
        <span class="selectable text-uppercase" @click="getNewer" v-if="newer"
          >newer</span
        >|<span> {{ currentPage }}</span> |<span
          class="selectable text-uppercase"
          @click="getOlder"
          v-if="older"
        >
          older</span
        >
      </div>
    </div>
    <div v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        await profilesService.getProfileById(route.params.id);
        await postsService.getPostsByProfileId(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      currentPage: computed(() => AppState.currentPage),
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      async getOlder() {
        try {
          await postsService.getOlder();
        } catch (error) {
          logger.error(error, "could not change page");
          Pop.toast(error.message, "error");
        }
      },
      async getNewer() {
        try {
          await postsService.getNewer();
        } catch (error) {
          logger.error(error, "could not change page");
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>