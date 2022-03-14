<template>
  <div class="container-fluid flex-grow-1">
    <div class="row mt-1">
      <div class="col-9 p-2 mb-2">
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
        <div v-for="p in posts" :key="p.id">
          <Post :post="p" />
        </div>
      </div>
      <div class="col-2" v-for="b in banners" :key="b.title">
        <Banner :banner="b" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { bannersService } from "../services/BannersService";
import Pop from "../utils/Pop";
export default {
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
        await bannersService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      currentPage: computed(() => AppState.currentPage),
      posts: computed(() => AppState.posts),
      banners: computed(() => AppState.banners),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),
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

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
