<template>
  <div class="movie-row" ref="sliderWindow" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @wheel.prevent="handleWheel">
    <h2>{{ title }}</h2>
    <div class="slider" ref="slider" :style="{ transform: `translateX(-${scrollAmount}px)` }">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
        <button @click="toggleWishlist(movie)">
          {{ isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </button>
      </div>
    </div>
    <button v-if="showButtons && !atLeftEdge" @click="slide('left')">Left</button>
    <button v-if="showButtons && !atRightEdge" @click="slide('right')">Right</button>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import wishlist from '@/app/util/movie/wishlist';


export default {
  name: 'MovieRowComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    fetchUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const movies = ref([]);
    const scrollAmount = ref(0);
    const showButtons = ref(false);
    const isScrolling = ref(false);
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const maxScroll = ref(0);

    const slider = ref(null);
    const sliderWindow = ref(null);

    const wishlistService = new WishlistService();

    onMounted(async () => {
      await fetchMovies();
      calculateMaxScroll();
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    const fetchMovies = async () => {
      try {
        const response = await axios.get(props.fetchUrl);
        movies.value = response.data.results;
        setTimeout(() => calculateMaxScroll(), 0);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const getImageUrl = (path) => {
      return `https://image.tmdb.org/t/p/w300${path}`;
    };

    const slide = (direction) => {
      const slideAmount = sliderWindow.value.clientWidth * 0.8;
      if (direction === 'left') {
        scrollAmount.value = Math.max(0, scrollAmount.value - slideAmount);
      } else {
        scrollAmount.value = Math.min(maxScroll.value, scrollAmount.value + slideAmount);
      }
    };

    const handleMouseMove = () => {
      showButtons.value = true;
    };

    const handleMouseLeave = () => {
      showButtons.value = false;
    };

    const handleWheel = (event) => {
      if (isScrolling.value) return;
      isScrolling.value = true;
      const direction = event.deltaY > 0 ? 'right' : 'left';
      slide(direction);
      setTimeout(() => {
        isScrolling.value = false;
      }, 500);
    };

    const handleTouchStart = (event) => {
      touchStartX.value = event.touches[0].clientX;
      touchEndX.value = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      touchEndX.value = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const touchDiff = touchStartX.value - touchEndX.value;
      const minSwipeDistance = 50;
      if (Math.abs(touchDiff) > minSwipeDistance) {
        const direction = touchDiff > 0 ? 'right' : 'left';
        slide(direction, Math.abs(touchDiff));
      }
    };

    const calculateMaxScroll = () => {
      if (slider.value && sliderWindow.value) {
        maxScroll.value = Math.max(0, slider.value.scrollWidth - sliderWindow.value.clientWidth);
      }
    };

    const handleResize = () => {
      calculateMaxScroll();
      scrollAmount.value = Math.min(scrollAmount.value, maxScroll.value);
    };

    const toggleWishlist = (movie) => {
      wishlistService.toggleWishlist(movie);
    };

    const isInWishlist = (movieId) => {
      return wishlistService.isInWishlist(movieId);
    };

    const atLeftEdge = computed(() => scrollAmount.value <= 0);
    const atRightEdge = computed(() => scrollAmount.value >= maxScroll.value);

    return {
      movies,
      scrollAmount,
      showButtons,
      atLeftEdge,
      atRightEdge,
      getImageUrl,
      slide,
      handleMouseMove,
      handleMouseLeave,
      handleWheel,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      toggleWishlist,
      isInWishlist,
      slider,
      sliderWindow
    };
  }
};
</script>

<style scoped>
.movie-row {
  padding: 10px;
  position: relative;
}

.slider {
  display: flex;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
}

.movie {
  min-width: 150px;
  margin-right: 10px;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

button:first-of-type {
  left: 10px;
}

button:last-of-type {
  right: 10px;
}
</style>
