<template>
  <div ref="gridContainer" class="movie-grid">
    <div v-for="movieGroup in visibleMovieGroups" :key="movieGroup[0].id" class="movie-row">
      <div v-for="movie in movieGroup" :key="movie.id" class="movie-card">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
        <p>{{ movie.title }}</p>
        <button @click="toggleWishlist(movie)">
          {{ isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </button>
      </div>
    </div>
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
import axios from 'axios';
import WishlistService from '../../util/movie/wishlist';

export default {
  name: "MovieGridComponent",
  props: {
    fetchUrl: String
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      rowSize: 4,
      moviesPerPage: 20,
      isMobile: window.innerWidth <= 768,
      wishlistService: new WishlistService(),
      wishlistTimer: null
    };
  },
  async created() {
    await this.fetchMovies();
    this.calculateLayout();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.wishlistTimer) {
      clearTimeout(this.wishlistTimer);
    }
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get(this.fetchUrl);
        this.movies = response.data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w300${path}`;
    },
    toggleWishlist(movie) {
      if (this.wishlistTimer) clearTimeout(this.wishlistTimer);
      this.wishlistTimer = setTimeout(() => {
        this.wishlistService.toggleWishlist(movie);
      }, 2000);
    },
    isInWishlist(movieId) {
      return this.wishlistService.isInWishlist(movieId);
    },
    calculateLayout() {
      const container = this.$refs.gridContainer;
      const containerWidth = container ? container.offsetWidth : 0;
      const movieCardWidth = this.isMobile ? 90 : 200;
      const horizontalGap = this.isMobile ? 10 : 15;
      this.rowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      this.moviesPerPage = this.rowSize * 3; // example layout
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      this.calculateLayout();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    visibleMovieGroups() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      return this.movies.slice(startIndex, startIndex + this.moviesPerPage).reduce((groups, item, index) => {
        const groupIndex = Math.floor(index / this.rowSize);
        if (!groups[groupIndex]) groups[groupIndex] = [];
        groups[groupIndex].push(item);
        return groups;
      }, []);
    },
    totalPages() {
      return Math.ceil(this.movies.length / this.moviesPerPage);
    }
  }
};
</script>

<style scoped>
/* 스타일 적용 */
</style>
