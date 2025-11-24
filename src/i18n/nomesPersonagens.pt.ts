// Tradução opcional de nomes de personagens. Acrescente conforme necessidade.
// OBS: Nem todos os nomes devem ser traduzidos (nomes próprios geralmente ficam).
// Este mapa permite substituir alguns para fins de apresentação.
export const mapaNomesPersonagens: Record<string,string> = {
  'Amish Cyborg': 'Ciborgue Amish',
  'Ants in my Eyes Johnson': 'Johnson Formigas nos Meus Olhos',
  'Beth Smith': 'Beth Smith',
  'Rick Sanchez': 'Rick Sanchez',
  'Morty Smith': 'Morty Smith',
  'Summer Smith': 'Summer Smith',
  'Jerry Smith': 'Jerry Smith',
  'Birdperson': 'Pessoa Pássaro',
  'Mr. Meeseeks': 'Sr. Meeseeks',
  'Squanchy': 'Squanchy',
  'Abradolf Lincler': 'Abradolf Lincler',
  'Ghost in a Jar': 'Fantasma no Frasco',
  'Mr. Poopybutthole': 'Sr. Poopybutthole',
  'Jaguar': 'Jaguar',
  'Gearhead': 'Cabeça de Engrenagem',
  'Noob-Noob': 'Noob-Noob'
};

export function traduzNomePersonagem(nome: string): string {
  return mapaNomesPersonagens[nome] || nome;
}
