import axios from "axios";

class URLService {
  // 인기 영화 데이터를 가져오는 함수
  async fetchFeaturedMovie(apiKey) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`);
      console.log(response.data.results[0]);
      return response.data.results[0];
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    }
  }

  // 인기 영화 URL 생성
  getURLForPopularMovies(apiKey, page = 1) {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
  }

  // 현재 상영 중인 영화 URL 생성
  getURLForNowPlayingMovies(apiKey, page = 1) {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
  }

  // 특정 장르의 영화 URL 생성
  getURLForGenreMovies(apiKey, genre, page = 1) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  }
}

// 사용 예시
const urlService = new URLService();
