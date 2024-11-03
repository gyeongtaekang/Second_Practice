import Home from '../components/home/Home.vue';
import HomeMain from '../components/home/main/HomeMain.vue';
import HomeWishlist from '../components/home/wishlist/HomeWishlist.vue';
import HomeSearch from '../components/search/HomeSearch.vue';
import HomePopular from '../components/home/popular/HomePopular.vue';
import SignIn from '../components/sign-in/SignIn.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', component: HomeMain },
      { path: 'popular', component: HomePopular },
      { path: 'wishlist', component: HomeWishlist },
      { path: 'search', component: HomeSearch }
    ],
    meta: { requiresAuth: true } // 인증이 필요한 라우트에 meta 속성 추가
  },
  {
    path: '/signin',
    component: SignIn
  }
];

const router = new VueRouter({
  mode: 'history', // 히스토리 모드로 설정하여 URL에 해시(#)가 나타나지 않도록 함
  routes
});

// 인증 가드 설정
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('01bede4653551df3f6f5e17074771100') !== null;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/signin'); // 인증되지 않은 사용자는 /signin으로 리디렉션
  } else {
    next(); // 인증된 사용자는 접근 허용
  }
});

export default router;
