<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
// Import direto das imagens para garantir resolução correta pelo bundler Vite
import bgPortal from '../assets/rick-and-morty-portal-wallpaper.jpg';
import bg1 from '../assets/rick-and-morty-1.jpg';
import bg2 from '../assets/rick-and-morty-2.jpg';
import bg3 from '../assets/rick-and-morty-3.jpg';
import bg4 from '../assets/rick-and-morty-4.jpg';

const categories = [
  {
    id: 'characters',
    title: 'Personagens',
    description: 'Explore 826 personagens espalhados pelo multiverso',
    icon: '👽',
    color: 'from-[#00b5cc] to-[#0094a6]',
    route: '/characters'
  },
  {
    id: 'locations',
    title: 'Localizações',
    description: 'Descubra 126 localizações e dimensões únicas',
    icon: '🌍',
    color: 'from-[#97ce4c] to-[#7aa83a]',
    route: '/locations'
  },
  {
    id: 'episodes',
    title: 'Episódios',
    description: 'Veja todos os 51 episódios da série',
    icon: '📺',
    color: 'from-[#e89ac7] to-[#d17cb0]',
    route: '/episodes'
  }
];

const navigateTo = (route: string) => {
  window.location.hash = route;
};

// Slideshow de fundo
const backgrounds = [bgPortal, bg1, bg2, bg3, bg4];
const currentIndex = ref(0);
const currentBackground = ref(`url(${backgrounds[0]})`);
let intervalId: number | undefined;

const startSlideshow = () => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % backgrounds.length;
    currentBackground.value = `url(${backgrounds[currentIndex.value]})`;
  }, 8000); // 8s por imagem
};

onMounted(() => {
  startSlideshow();
});

onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId);
});
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section" :style="{ backgroundImage: currentBackground }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-rick">Rick</span>
          <span class="title-and">&</span>
          <span class="title-morty">Morty</span>
        </h1>
        <p class="hero-subtitle">Portal de Exploração Multidimensional</p>
        <p class="hero-description">
          Mergulhe no universo de Rick and Morty e explore personagens, localizações e episódios 
          através da dimensão C-137 e além!
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">826</span>
            <span class="stat-label">Personagens</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">126</span>
            <span class="stat-label">Localizações</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">51</span>
            <span class="stat-label">Episódios</span>
          </div>
        </div>
        <div class="scroll-indicator">
          <span>Explorar</span>
          <div class="arrow-down">↓</div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <h2 class="section-title">Explore o Multiverso</h2>
      <div class="categories-grid">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card"
          @click="navigateTo(category.route)"
        >
          <div class="card-background" :class="`bg-gradient-to-br ${category.color}`"></div>
          <div class="card-content">
            <div class="card-icon">{{ category.icon }}</div>
            <h3 class="card-title">{{ category.title }}</h3>
            <p class="card-description">{{ category.description }}</p>
            <button class="card-button">
              Explorar
              <span class="button-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">🔍</div>
          <h3>Pesquisa Avançada</h3>
          <p>Filtre personagens por nome, status, espécie e muito mais</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <h3>Informações Detalhadas</h3>
          <p>Acesse dados completos sobre cada personagem e localização</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎨</div>
          <h3>Interface Moderna</h3>
          <p>Design inspirado na série com experiência interativa</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <h3>Rápido & Responsivo</h3>
          <p>Navegue pelo multiverso em qualquer dispositivo</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p class="footer-text">
          Dados fornecidos pela 
          <a href="https://rickandmortyapi.com" target="_blank" class="footer-link">
            Rick and Morty API
          </a>
        </p>
        <p class="footer-credits">
          Feito com 💚 usando Vue 3 + TypeScript + GraphQL
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(39,43,51,0.6) 60%, rgba(39,43,51,0.85) 100%);
  pointer-events: none;
}

.hero-section.fade-transition {
  transition: background-image 1s ease-in-out;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(39, 43, 51, 0.7) 0%,
    rgba(39, 43, 51, 0.85) 50%,
    rgba(39, 43, 51, 0.95) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 900px;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 181, 204, 0.5), 0 0 40px rgba(151, 206, 76, 0.3);
  line-height: 1.1;
}

.title-rick {
  background: linear-gradient(135deg, #00b5cc, #00d9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-and {
  color: white;
  margin: 0 0.5rem;
}

.title-morty {
  background: linear-gradient(135deg, #97ce4c, #c5e17a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(60, 62, 68, 0.6);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00b5cc, #97ce4c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 2px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.scroll-indicator {
  position: relative;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  animation: bounce 2.4s ease-in-out infinite;
  opacity: 0.9;
}

.scroll-indicator span { letter-spacing: 2px; font-weight: 600; }

.arrow-down {
  font-size: 1.5rem;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* Categories Section */
.categories-section {
  padding: 6rem 2rem;
  background: rgb(39, 43, 51);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, #00b5cc, #97ce4c, #e89ac7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  position: relative;
  height: 350px;
  border-radius: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 181, 204, 0.3);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.category-card:hover .card-background {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.card-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.card-button {
  padding: 0.75rem 2rem;
  background: white;
  color: rgb(39, 43, 51);
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.card-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.button-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.card-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  background: rgb(32, 35, 41);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;
}

.feature-item p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* Footer */
.footer {
  padding: 3rem 2rem;
  background: rgb(25, 28, 33);
  border-top: 2px solid rgba(0, 181, 204, 0.2);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

.footer-link {
  color: #00b5cc;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #97ce4c;
}

.footer-credits {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .stat-divider {
    width: 60px;
    height: 2px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
