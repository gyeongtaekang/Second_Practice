// WishlistService를 JavaScript로 변환한 코드
class WishlistService {
  constructor() {
    this.wishlist = [];
    this.loadWishlist();
  }

  loadWishlist() {
    const storedWishlist = localStorage.getItem('movieWishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  saveWishlist() {
    localStorage.setItem('movieWishlist', JSON.stringify(this.wishlist));
  }

  toggleWishlist(movie) {
    const index = this.wishlist.findIndex(item => item.id === movie.id);

    if (index === -1) {
      // 영화가 위시리스트에 없으면 추가
      this.wishlist.push(movie);
    } else {
      // 영화가 이미 위시리스트에 있으면 제거
      this.wishlist = this.wishlist.filter(item => item.id !== movie.id);
    }

    this.saveWishlist();
  }

  isInWishlist(movieId) {
    return this.wishlist.some(item => item.id === movieId);
  }

  getCurrentWishlist() {
    return this.wishlist;
  }
}

// 사용 예시
const wishlistService = new WishlistService();

// 예: 영화 추가/제거
wishlistService.toggleWishlist({ id: 1, title: 'Inception' });
console.log(wishlistService.getCurrentWishlist());
