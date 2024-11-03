<template>
  <div>
    <MovieSearchComponent />
    <MovieInfiniteScrollComponent />
  </div>
</template>

<script>
import MovieInfiniteScrollComponent from '../../views/views/MovieInfiniteScrollComponent.vue';
import MovieSearchComponent from './HomeSearch.vue';

export default {
  name: 'HomeSearch',
  components: {
    MovieSearchComponent,
    MovieInfiniteScrollComponent
  },
  data() {
    return {
      apiKey: localStorage.getItem('TMDb-Key') || '',
      genreId: '28',
      ageId: -1,
      sortId: 'all',
      genreCode: {
        '장르 (전체)': 0,
        'Action': 28,
        'Adventure': 12,
        'Comedy': 35,
        'Crime': 80,
        'Family': 10751
      },
      sortingCode: {
        '언어 (전체)': 'all',
        '영어': 'en',
        '한국어': 'ko'
      },
      ageCode: {
        '평점 (전체)': -1,
        '9~10': 9,
        '8~9': 8,
        '7~8': 7,
        '6~7': 6,
        '5~6': 5,
        '4~5': 4,
        '4점 이하': -2
      }
    };
  },
  methods: {
    changeOptions(options) {
      this.genreId = `${this.genreCode[options.originalLanguage]}`;
      this.ageId = this.ageCode[options.translationLanguage];
      this.sortId = this.sortingCode[options.sorting];
    }
  }
};
</script>

<style scoped>
/* 추가 스타일을 여기에 정의하세요 */
</style>
