<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCharacters, type Character } from '../services/rickMortyApi';
import CharacterCard from './CharacterCard.vue';

const characters = ref<Character[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);
const searchName = ref('');
const filterStatus = ref('');

const loadCharacters = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const filter: { name?: string; status?: string } = {};
    if (searchName.value) filter.name = searchName.value;
    if (filterStatus.value) filter.status = filterStatus.value;
    
    const response = await getCharacters(currentPage.value, Object.keys(filter).length > 0 ? filter : undefined);
    characters.value = response.characters.results;
    totalPages.value = response.characters.info.pages;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar personagens';
    characters.value = [];
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadCharacters();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadCharacters();
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  loadCharacters();
};

onMounted(() => {
  loadCharacters();
});
</script>

<template>
  <div class="character-list">
    <div class="header">
      <h1>Portal Rick and Morty</h1>
      <p class="subtitle">Explore todos os personagens da série</p>
    </div>

    <div class="filters">
      <div class="search-box">
        <input 
          v-model="searchName" 
          type="text" 
          placeholder="Buscar por nome..."
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="filter-box">
        <select v-model="filterStatus" @change="handleSearch">
          <option value="">Todos os status</option>
          <option value="alive">Vivo</option>
          <option value="dead">Morto</option>
          <option value="unknown">Desconhecido</option>
        </select>
      </div>
      <button @click="handleSearch" class="search-button">Buscar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando personagens...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadCharacters">Tentar novamente</button>
    </div>

    <div v-else>
      <div class="characters-grid">
        <CharacterCard 
          v-for="character in characters" 
          :key="character.id" 
          :character="character"
        />
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
.character-list {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #00b5cc, #97ce4c);
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
.filter-box select {
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
.filter-box select:focus {
  outline: none;
  border-color: #00b5cc;
}

.search-button {
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #00b5cc, #97ce4c);
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
  border: 4px solid rgba(0, 181, 204, 0.3);
  border-top-color: #00b5cc;
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

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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
  background-color: rgb(80, 82, 88);
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
  .characters-grid {
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
