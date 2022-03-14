<template>
  <div>
    <form
      class="row bg-secondary lighten-10 elevation-3 p-2 m-5"
      v-if="user.isAuthenticated"
      @submit.prevent="createPost"
    >
      <div class="d-flex justify-content-around">
        <img :src="account.picture" class="img-fluid" alt="" />
        <div class="col-md-10">
          <textarea
            v-model="state.editable.body"
            required
            type="text"
            class="form-control"
            maxlength="250"
            placeholder="What's Happening Today?"
            aria-describedby="helpId"
          />
        </div>
      </div>
      <div class="col-md-8 p-2 d-flex">
        <label for="" class="form-label"></label>
        <input
          placeholder="Image URL"
          v-model="state.editable.imgUrl"
          type="text"
          class="form-control"
          aria-describedby="helpId"
        />

        <div class="col-md-4 d-flex justify-content-end">
          <button type="submit" class="btn btn-info">Create Post</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";

export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      state,
      async createPost() {
        try {
          await postsService.createPost(state.editable);
        } catch (error) {
          logger.error(error, "can't create post");
          Pop.toast(error.message, "error");
        }
        state.editable = {};
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>