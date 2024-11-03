<template>
  <div>
    <!-- 헤더 및 아이콘 표시 -->
    <div class="app-header" :class="{ scrolled: isScrolled }">
      <!-- 아이콘 등 콘텐츠 추가 가능 -->
    </div>
    <BannerComponent />
    <MovieRowComponent :url="popularMoviesUrl" />
    <MovieRowComponent :url="newReleasesUrl" />
    <MovieRowComponent :url="actionMoviesUrl" />
  </div>
</template>

<script>
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import URL from '@/app/util/movie/URL';


import BannerComponent from '@/app/views/home-main/BannerComponent.vue';
import MovieRowComponent from '@/app/views/home-main/MovieRowComponent.vue';




export default {
  name: 'HomeMain',
  components: {
    BannerComponent,
    MovieRowComponent
  },
  data() {
    return {
      faSearch,
      faUser,
      apiKey: localStorage.getItem('TMDb-Key') || '',
      featuredMovie: null,
      popularMoviesUrl: '',
      newReleasesUrl: '',
      actionMoviesUrl: '',
      isScrolled: false
    };
  },
  created() {
    this.urlService = new URLService();
    this.popularMoviesUrl = this.urlService.getURL4PopularMovies(this.apiKey);
    this.newReleasesUrl = this.urlService.getURL4ReleaseMovies(this.apiKey);
    this.actionMoviesUrl = this.urlService.getURL4GenreMovies(this.apiKey, '28');
    this.loadFeaturedMovie();
    this.initializeScrollListener();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  },
  methods: {
    async loadFeaturedMovie() {
      this.featuredMovie = await this.urlService.fetchFeaturedMovie(this.apiKey);
    },
    initializeScrollListener() {
      this.scrollListener = () => {
        this.isScrolled = window.scrollY > 50;
      };
      window.addEventListener('scroll', this.scrollListener);
    }
  }
};
</script>

<style scoped>
/* 추가 스타일을 여기에 정의하세요 */
</style>
