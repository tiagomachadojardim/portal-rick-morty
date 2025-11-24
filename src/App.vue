<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const showMenu = ref(false);

const menuItems = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Personagens', path: '/characters', icon: '👽' },
  { name: 'Localizações', path: '/locations', icon: '🌍' },
  { name: 'Episódios', path: '/episodes', icon: '📺' }
];

const navigateTo = (path: string) => {
  router.push(path);
  showMenu.value = false;
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar" v-if="route.path !== '/'">
      <div class="nav-container">
        <div class="nav-logo" @click="navigateTo('/')">
          <span class="logo-text">Rick & Morty</span>
          <span class="logo-portal">🌀</span>
        </div>
        
        <div class="nav-menu" :class="{ active: showMenu }">
          <a 
            v-for="item in menuItems" 
            :key="item.path"
            @click="navigateTo(item.path)"
            class="nav-item"
            :class="{ active: isActive(item.path) }"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.name }}</span>
          </a>
        </div>

        <button class="hamburger" @click="showMenu = !showMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
}

/* Navigation Bar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(39, 43, 51, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(0, 181, 204, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(90deg, #00b5cc, #97ce4c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-portal {
  font-size: 1.5rem;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.nav-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.nav-item:hover {
  background: rgba(0, 181, 204, 0.1);
  color: #00b5cc;
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(0, 181, 204, 0.2), rgba(151, 206, 76, 0.2));
  color: white;
  border: 1px solid rgba(0, 181, 204, 0.5);
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-text {
  font-size: 1rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    flex-direction: column;
    background: rgba(39, 43, 51, 0.98);
    width: 100%;
    padding: 2rem;
    gap: 1.5rem;
    transition: left 0.3s;
    border-top: 2px solid rgba(0, 181, 204, 0.3);
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    width: 100%;
    justify-content: center;
    padding: 1rem;
    font-size: 1.1rem;
  }
}
</style>
