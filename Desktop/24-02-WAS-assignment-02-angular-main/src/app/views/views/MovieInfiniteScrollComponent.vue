<template>
  <div ref="gridContainer" class="movie-infinite-scroll">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
      <p>{{ movie.title }}</p>
    </div>
    <div ref="loadingTrigger" v-if="hasMore" class="loading">Loading...</div>
    <button v-if="showTopButton" @click="scrollToTopAndReset">Top</button>
  </div>
</template>

<script>
import axios from 'axios';
import wishlist from '@/app/util/movie/wishlist';




export default {
  name: "MovieInfiniteScrollComponent",
  props: {
    genreCode: String,
    apiKey: String,
    sortingOrder: { type: String, default: "all" },
    voteEverage: { type: Number, default: 100 }
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      rowSize: 4,
      isLoading: false,
      isMobile: window.innerWidth <= 768,
      hasMore: true,
      showTopButton: false,
      wishlistService: new WishlistService(),
      wishlistTimer: null
    };
  },
  async created() {
    await this.fetchMovies();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    if (this.wishlistTimer) {
      clearTimeout(this.wishlistTimer);
    }
  },
  methods: {
    async fetchMovies() {
      if (this.isLoading || !this.hasMore) return;
      this.isLoading = true;
      try {
        const url = this.genreCode === "0" ? 'https://api.themoviedb.org/3/movie/popular' : 'https://api.themoviedb.org/3/discover/movie';
        const params = { api_key: this.apiKey, page: this.currentPage };
        if (this.genreCode !== "0") params.with_genres = this.genreCode;
        const response = await axios.get(url, { params });
        this.movies.push(...response.data.results);
        this.currentPage++;
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        this.isLoading = false;
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w300${path}`;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
    handleScroll() {
      this.showTopButton = window.scrollY > 300;
    },
    scrollToTopAndReset() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.resetMovies();
    },
    resetMovies() {
      this.movies = [];
      this.currentPage = 1;
      this.hasMore = true;
      this.fetchMovies();
    },
    toggleWishlist(movie) {
      if (this.wishlistTimer) clearTimeout(this.wishlistTimer);
      this.wishlistTimer = setTimeout(() => {
        this.wishlistService.toggleWishlist(movie);
      }, 800);
    }
  }
};
</script>

<style scoped>
/* 스타일 적용 */
</style>
