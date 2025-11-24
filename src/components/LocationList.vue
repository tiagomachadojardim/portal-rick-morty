<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLocations, type Location } from '../services/rickMortyApi';

const locations = ref<Location[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);
const searchName = ref('');
const filterType = ref('');
const filterDimension = ref('');

const loadLocations = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const filter: { name?: string; type?: string; dimension?: string } = {};
    if (searchName.value) filter.name = searchName.value;
    if (filterType.value) filter.type = filterType.value;
    if (filterDimension.value) filter.dimension = filterDimension.value;
    
    const response = await getLocations(currentPage.value, Object.keys(filter).length > 0 ? filter : undefined);
    locations.value = response.locations.results;
    totalPages.value = response.locations.info.pages;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar localizações';
    locations.value = [];
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadLocations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadLocations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  loadLocations();
};

onMounted(() => {
  loadLocations();
});
</script>

<template>
  <div class="location-list">
    <div class="header">
      <h1>🌍 Localizações</h1>
      <p class="subtitle">Explore as dimensões e planetas do multiverso</p>
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
        <input 
          v-model="filterType" 
          type="text" 
          placeholder="Tipo (ex: Planet, Space station)"
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="filter-box">
        <input 
          v-model="filterDimension" 
          type="text" 
          placeholder="Dimensão (ex: C-137)"
          @keyup.enter="handleSearch"
        />
      </div>
      <button @click="handleSearch" class="search-button">Buscar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando localizações...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadLocations">Tentar novamente</button>
    </div>

    <div v-else>
      <div class="locations-grid">
        <div 
          v-for="location in locations" 
          :key="location.id"
          class="location-card"
        >
          <div class="location-header">
            <h2>{{ location.name }}</h2>
            <span class="location-id">#{{ location.id }}</span>
          </div>
          
          <div class="location-info">
            <div class="info-row">
              <span class="info-label">Tipo:</span>
              <span class="info-value">{{ location.type }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Dimensão:</span>
              <span class="info-value">{{ location.dimension }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Residentes:</span>
              <span class="info-value">{{ location.residents.length }} personagens</span>
            </div>
          </div>

          <div class="residents-preview" v-if="location.residents.length > 0">
            <p class="preview-title">Residentes conhecidos:</p>
            <div class="residents-avatars">
              <img 
                v-for="resident in location.residents.slice(0, 5)" 
                :key="resident.id"
                :src="resident.image"
                :alt="resident.name"
                :title="resident.name"
                class="resident-avatar"
              />
              <span v-if="location.residents.length > 5" class="more-residents">
                +{{ location.residents.length - 5 }}
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
.location-list {
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
  background: linear-gradient(90deg, #97ce4c, #7aa83a);
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
  border-color: #97ce4c;
}

.search-button {
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #97ce4c, #7aa83a);
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
  border: 4px solid rgba(151, 206, 76, 0.3);
  border-top-color: #97ce4c;
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

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.location-card {
  background-color: rgb(60, 62, 68);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.location-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(151, 206, 76, 0.3);
  border-color: rgba(151, 206, 76, 0.5);
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.location-header h2 {
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
  flex: 1;
}

.location-id {
  color: rgba(151, 206, 76, 0.8);
  font-weight: bold;
  font-size: 0.9rem;
  background: rgba(151, 206, 76, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-label {
  color: rgb(158, 158, 158);
  font-size: 0.9rem;
}

.info-value {
  color: rgb(255, 255, 255);
  font-weight: 600;
  text-align: right;
}

.residents-preview {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-title {
  color: rgb(158, 158, 158);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.residents-avatars {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.resident-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #97ce4c;
  object-fit: cover;
  transition: transform 0.2s;
}

.resident-avatar:hover {
  transform: scale(1.2);
  z-index: 10;
}

.more-residents {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(151, 206, 76, 0.2);
  color: #97ce4c;
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
  background-color: #97ce4c;
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
  .locations-grid {
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
