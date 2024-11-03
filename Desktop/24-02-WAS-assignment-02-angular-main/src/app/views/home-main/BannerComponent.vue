<template>
  <div class="banner" v-if="movie">
    <img :src="backdropUrl" alt="Movie Banner" />
  </div>
</template>

<script>
export default {
  name: 'BannerComponent',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    backdropUrl() {
      return this.movie ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}` : '';
    }
  }
};
</script>

<style scoped>
.banner {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
}

.banner img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
