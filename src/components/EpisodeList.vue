<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getEpisodes, type Episode } from '../services/rickMortyApi';

const episodes = ref<Episode[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);
const searchName = ref('');
const filterEpisode = ref('');

const loadEpisodes = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const filter: { name?: string; episode?: string } = {};
    if (searchName.value) filter.name = searchName.value;
    if (filterEpisode.value) filter.episode = filterEpisode.value;
    
    const response = await getEpisodes(currentPage.value, Object.keys(filter).length > 0 ? filter : undefined);
    episodes.value = response.episodes.results;
    totalPages.value = response.episodes.info.pages;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar episódios';
    episodes.value = [];
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadEpisodes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadEpisodes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  loadEpisodes();
};

const getSeasonColor = (episodeCode: string) => {
  const season = episodeCode.substring(0, 3);
  const colors: Record<string, string> = {
    'S01': '#00b5cc',
    'S02': '#97ce4c',
    'S03': '#e89ac7',
    'S04': '#f0ad4e',
    'S05': '#9b59b6',
  };
  return colors[season] || '#00b5cc';
};

onMounted(() => {
  loadEpisodes();
});
</script>

<template>
  <div class="episode-list">
    <div class="header">
      <h1>📺 Episódios</h1>
      <p class="subtitle">Todos os episódios de Rick and Morty</p>
    </div>

    <div class="filters">
      <div class="search-box">
        <input 
          v-model="searchName" 
          type="text" 
          placeholder="Buscar por nome do episódio..."
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="filter-box">
        <input 
          v-model="filterEpisode" 
          type="text" 
          placeholder="Código (ex: S01E01)"
          @keyup.enter="handleSearch"
        />
      </div>
      <button @click="handleSearch" class="search-button">Buscar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando episódios...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadEpisodes">Tentar novamente</button>
    </div>

    <div v-else>
      <div class="episodes-grid">
        <div 
          v-for="episode in episodes" 
          :key="episode.id"
          class="episode-card"
        >
          <div class="episode-header">
            <span 
              class="episode-code"
              :style="{ backgroundColor: getSeasonColor(episode.episode) }"
            >
              {{ episode.episode }}
            </span>
            <span class="episode-date">{{ episode.air_date }}</span>
          </div>
          
          <h2 class="episode-title">{{ episode.name }}</h2>
          
          <div class="episode-info">
            <div class="info-item">
              <span class="info-icon">👥</span>
              <span class="info-text">{{ episode.characters.length }} personagens</span>
            </div>
          </div>

          <div class="characters-preview" v-if="episode.characters.length > 0">
            <p class="preview-title">Personagens principais:</p>
            <div class="characters-avatars">
              <img 
                v-for="character in episode.characters.slice(0, 6)" 
                :key="character.id"
                :src="character.image"
                :alt="character.name"
                :title="character.name"
                class="character-avatar"
              />
              <span v-if="episode.characters.length > 6" class="more-characters">
                +{{ episode.characters.length - 6 }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">
          ← Anterior
        </button>
        <span class="page-info">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Próxima →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.episode-list {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #e89ac7, #d17cb0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: rgb(158, 158, 158);
  font-size: 1.2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box,
.filter-box {
  flex: 1;
  min-width: 200px;
}

.search-box input,
.filter-box input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgb(60, 62, 68);
  border: 2px solid rgb(60, 62, 68);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-box input:focus,
.filter-box input:focus {
  outline: none;
  border-color: #e89ac7;
}

.search-button {
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #e89ac7, #d17cb0);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.search-button:hover {
  opacity: 0.9;
}

.loading,
.error {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  border: 4px solid rgba(232, 154, 199, 0.3);
  border-top-color: #e89ac7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #d63d2e;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.episode-card {
  background-color: rgb(60, 62, 68);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.episode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(232, 154, 199, 0.3);
  border-color: rgba(232, 154, 199, 0.5);
}

.episode-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.episode-code {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.episode-date {
  color: rgb(158, 158, 158);
  font-size: 0.9rem;
}

.episode-title {
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.episode-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(158, 158, 158);
  font-size: 0.9rem;
}

.info-icon {
  font-size: 1.2rem;
}

.characters-preview {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-title {
  color: rgb(158, 158, 158);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.characters-avatars {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.character-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #e89ac7;
  object-fit: cover;
  transition: transform 0.2s;
}

.character-avatar:hover {
  transform: scale(1.2);
  z-index: 10;
}

.more-characters {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(232, 154, 199, 0.2);
  color: #e89ac7;
  font-size: 0.8rem;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
}

.pagination button {
  padding: 0.75rem 1.5rem;
  background-color: rgb(60, 62, 68);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: #e89ac7;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: rgb(158, 158, 158);
  font-weight: 500;
}

@media (max-width: 768px) {
  .episodes-grid {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-button {
    width: 100%;
  }
}
</style>
