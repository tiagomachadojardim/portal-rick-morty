const API_URL = 'https://rickandmortyapi.com/graphql';

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || 'Unknown GraphQL error');
  }

  return result.data;
}

export interface CharactersResponse {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  };
}

export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: Array<{
    id: string;
    name: string;
    episode: string;
  }>;
}

export async function getCharacters(page: number = 1, filter?: { name?: string; status?: string }) {
  const query = `
    query GetCharacters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          status
          species
          type
          gender
          origin {
            name
          }
          location {
            name
          }
          image
          episode {
            id
            name
            episode
          }
        }
      }
    }
  `;

  return fetchGraphQL<CharactersResponse>(query, { page, filter });
}

export async function getCharacter(id: string) {
  const query = `
    query GetCharacter($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          id
          name
          episode
        }
      }
    }
  `;

  return fetchGraphQL<{ character: Character }>(query, { id });
}

  // ============================================
  // LOCATIONS
  // ============================================

  export interface Location {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: Array<{
      id: string;
      name: string;
      image: string;
    }>;
  }

  export interface LocationsResponse {
    locations: {
      info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
      };
      results: Location[];
    };
  }

  export async function getLocations(page: number = 1, filter?: { name?: string; type?: string; dimension?: string }) {
    const query = `
      query GetLocations($page: Int, $filter: FilterLocation) {
        locations(page: $page, filter: $filter) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            type
            dimension
            residents {
              id
              name
              image
            }
          }
        }
      }
    `;

    return fetchGraphQL<LocationsResponse>(query, { page, filter });
  }

  export async function getLocation(id: string) {
    const query = `
      query GetLocation($id: ID!) {
        location(id: $id) {
          id
          name
          type
          dimension
          residents {
            id
            name
            image
          }
        }
      }
    `;

    return fetchGraphQL<{ location: Location }>(query, { id });
  }

  // ============================================
  // EPISODES
  // ============================================

  export interface Episode {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: Array<{
      id: string;
      name: string;
      image: string;
    }>;
  }

  export interface EpisodesResponse {
    episodes: {
      info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
      };
      results: Episode[];
    };
  }

  export async function getEpisodes(page: number = 1, filter?: { name?: string; episode?: string }) {
    const query = `
      query GetEpisodes($page: Int, $filter: FilterEpisode) {
        episodes(page: $page, filter: $filter) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            air_date
            episode
            characters {
              id
              name
              image
            }
          }
        }
      }
    `;

    return fetchGraphQL<EpisodesResponse>(query, { page, filter });
  }

  export async function getEpisode(id: string) {
    const query = `
      query GetEpisode($id: ID!) {
        episode(id: $id) {
          id
          name
          air_date
          episode
          characters {
            id
            name
            image
          }
        }
      }
    `;

    return fetchGraphQL<{ episode: Episode }>(query, { id });
  }
