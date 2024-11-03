<template>
  <div>
    <MovieWishlistComponent />
  </div>
</template>

<script>
// 정확한 경로로 import를 수정합니다.
import MovieWishlistComponent from './HomeWishlist.vue';

export default {
  name: 'HomeWishlist',
  components: {
    MovieWishlistComponent
  }
};
</script>

<style scoped>
/* 추가 스타일을 여기에 정의하세요 */
</style>
