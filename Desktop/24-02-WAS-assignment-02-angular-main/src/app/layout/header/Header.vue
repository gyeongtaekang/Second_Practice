<template>
  <header :class="{ 'scrolled': isScrolled }">
    <button @click="toggleMobileMenu">Menu</button>
    <button @click="removeKey">Sign Out</button>
    <fa-icon :icon="['fas', 'search']" />
    <fa-icon :icon="['fas', 'user']" />
    <fa-icon :icon="['fas', 'ticket']" />
    <fa-icon :icon="['fas', 'bars']" />
    <fa-icon :icon="['fas', 'times']" />
  </header>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'Header',
  components: {
    'fa-icon': FontAwesomeIcon
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    removeKey() {
      localStorage.removeItem('TMDb-Key');
      this.$router.push('/signin');
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  }
};
</script>

<style scoped>
/* header.component.css 내용을 여기에 복사 */
</style>
