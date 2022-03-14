<template>
  <div class="rounded shadow bg-light text-center d-flex flex-column">
    <div class="card-body d-flex">
      <router-link :to="{ name: 'Profile', params: { id: post.creatorId } }">
        <div>
          <img
            :src="post.creator.picture"
            alt=""
            style="min-height: 5vh; max-height: 7vh"
            class="rounded-circle selectable"
            @click="setActive"
          />
        </div>
      </router-link>
      <div class="">
        <h6 class="">{{ post.creator.name }}</h6>
        <small class="p-3">posted 3 hours ago</small>
        <i
          v-if="account.id == post.creatorId"
          class="mdi mdi-trash-can-outline text-danger selectable"
          @click="deletePost(post.id)"
        ></i>
      </div>
    </div>
    <div class="d-flex flex-column p-2">
      <p class="">{{ post.body }}</p>
    </div>
    <img v-if="post.imgUrl != null" :src="post.imgUrl" class="" alt="..." />
    <b
      @click="updateLike(post.id)"
      class="mdi mdi-heart-outline fs-1 align-self-end pe-2 selectable"
    >
      {{ post.likes.length }}
    </b>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      async updateLike(id) {
        try {
          await postsService.updateLike(id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async deletePost(id) {
        try {
          if (await Pop.confirm("Are you sure you want to delete this?")) {
            await postsService.deletePost(id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account),
      setActive() {
        postsService.setActive(props.post);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>