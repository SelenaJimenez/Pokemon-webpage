const URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
const URL_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species';

export const searchPokemon = async (pokemon) => {
  try {
    let url = `${URL_BASE}/${pokemon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const getPokemons = async (limit = 25, offset = 0) => {
  try {
    let url = `${URL_BASE}?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const getPokemonDetail = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}/${id}/`);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const getPokemonSpecies = async (id) => {
  try {
    const response = await fetch(`${URL_SPECIES}/${id}/`);
    const data = await response.json();
    return data;
  } catch (err) {}
};
