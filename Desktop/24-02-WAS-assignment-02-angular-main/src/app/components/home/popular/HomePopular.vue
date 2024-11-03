<template>
  <div>
    <div class="view-toggle">
      <button @click="setView('grid')">
        <font-awesome-icon :icon="faTh" />
      </button>
      <button @click="setView('list')">
        <font-awesome-icon :icon="faBars" />
      </button>
    </div>
    <MovieGridComponent v-if="currentView === 'grid'" :url="fetFetchURL()" />
    <MovieInfiniteScrollComponent v-else :url="fetFetchURL()" />
  </div>
</template>

<script>
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import URL from '@/app/util/movie/URL';
import MovieInfiniteScrollComponent from '@/app/views/views/MovieInfiniteScrollComponent.vue';
import MovieGridComponent from '@/app/views/views/MovieGridComponent.vue';



export default {
  name: 'HomePopular',
  components: {
    MovieGridComponent,
    MovieInfiniteScrollComponent
  },
  data() {
    return {
      faTh,
      faBars,
      apiKey: localStorage.getItem('TMDb-Key') || '',
      currentView: 'grid'
    };
  },
  created() {
    this.urlService = new URLService();
    this.disableScroll();
  },
  methods: {
    setView(view) {
      this.currentView = view;
      if (view === 'grid') {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
    disableScroll() {
      document.body.style.overflow = 'hidden';
    },
    enableScroll() {
      document.body.style.overflow = 'auto';
    },
    fetFetchURL() {
      return this.urlService.getURL4PopularMovies(this.apiKey);
    }
  }
};
</script>

<style scoped>
/* 추가 스타일을 여기에 정의하세요 */
</style>
