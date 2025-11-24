<script setup lang="ts">
import { defineProps } from 'vue';
import type { Character } from '../services/rickMortyApi';
import { traduzStatus, traduzEspecie } from '../i18n/pt';
import { traduzNomePersonagem } from '../i18n/nomesPersonagens.pt';
import { computed } from 'vue';

defineProps<{
  character: Character;
}>();

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Alive':
      return '#55cc44';
    case 'Dead':
      return '#d63d2e';
    default:
      return '#9e9e9e';
  }
};
</script>

<template>
  <div class="character-card">
    <div class="character-image">
      <img :src="character.image" :alt="character.name" />
    </div>
    <div class="character-info">
      <h2 :title="character.name">{{ traduzNomePersonagem(character.name) }}</h2>
      <div class="status">
        <span class="status-indicator" :style="{ backgroundColor: getStatusColor(character.status) }"></span>
        <span>{{ traduzStatus(character.status) }} - {{ traduzEspecie(character.species) }}</span>
      </div>
      <div class="info-section">
        <span class="label">Última localização conhecida:</span>
        <span class="value">{{ character.location.name }}</span>
      </div>
      <div class="info-section">
        <span class="label">Origem:</span>
        <span class="value">{{ character.origin.name === 'unknown' ? 'Desconhecida' : character.origin.name }}</span>
      </div>
      <div class="info-section" v-if="character.episode.length > 0">
        <span class="label">Primeira aparição:</span>
        <span class="value">{{ character.episode[0].name }} ({{ character.episode[0].episode }})</span>
      </div>
      <div class="info-section" v-if="character.episode.length > 0">
        <span class="label">Episódios:</span>
        <span class="value">{{ character.episode.length }} episódio(s)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  background-color: rgb(60, 62, 68);
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.character-image {
  flex: 2;
  overflow: hidden;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.character-info {
  flex: 3;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.character-info h2 {
  margin: 0;
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(255, 255, 255);
}

.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  color: rgb(158, 158, 158);
  font-size: 0.875rem;
}

.value {
  color: rgb(255, 255, 255);
  font-weight: 500;
}

@media (max-width: 768px) {
  .character-card {
    flex-direction: column;
  }
  
  .character-image {
    flex: none;
    height: 300px;
  }
}
</style>
