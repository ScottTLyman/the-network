<template>
  <div class="img-fluid selectable">
    <img :src="banner.tall" v alt="" />
  </div>
</template>


<script>
export default {
  props: {
    banner: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>