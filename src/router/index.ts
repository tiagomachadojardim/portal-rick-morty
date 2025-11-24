import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import CharacterList from '../components/CharacterList.vue';
import LocationList from '../components/LocationList.vue';
import EpisodeList from '../components/EpisodeList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/characters',
    name: 'Characters',
    component: CharacterList
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationList
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: EpisodeList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
