// Mapeamentos simples de tradução para exibição. Não altera valores usados pela API.
export function traduzStatus(status: string): string {
  const map: Record<string,string> = {
    Alive: 'Vivo',
    Dead: 'Morto',
    unknown: 'Desconhecido'
  };
  return map[status] || status;
}

export function traduzGenero(gender: string): string {
  const map: Record<string,string> = {
    Male: 'Masculino',
    Female: 'Feminino',
    Genderless: 'Sem gênero',
    unknown: 'Desconhecido'
  };
  return map[gender] || gender;
}

export function traduzEspecie(species: string): string {
  const map: Record<string,string> = {
    Human: 'Humano',
    Alien: 'Alienígena',
    Humanoid: 'Humanoide',
    Robot: 'Robô',
    Animal: 'Animal',
    Disease: 'Doença',
    Poopybutthole: 'Poopybutthole',
    'Mythological Creature': 'Criatura Mitológica',
    Cronenberg: 'Cronenberg',
    Planet: 'Planeta'
  };
  return map[species] || species;
}

export function traduzTipo(type: string): string {
  if (!type) return '—';
  return type;
}
