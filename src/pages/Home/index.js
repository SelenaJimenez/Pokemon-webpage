import React from 'react';
import Searchbar from 'components/Searchbar';
import Pokedex from 'components/Pokedex';
import { getPokemonData, getPokemons, searchPokemon } from 'api/index';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import _ from 'lodash';

const { useState, useEffect } = React;

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      cantidad: 25,
      loadingPokemons: false,
      total: 0,
      page: 1,
      pages: [],
    },
  });
  const [cantidad, page] = useWatch({
    name: ['cantidad', 'page'],
    control: methods.control,
  });

  useEffect(() => {
    fetchPokemons();
  }, [cantidad, page]);

  const fetchPokemons = async () => {
    try {
      methods.setValue('loadingPokemons', true);

      const data = await getPokemons(cantidad, cantidad * (page - 1));

      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);

      setPokemons(results);

      const total = Math.ceil(data.count / cantidad);

      const pages = Array.from({ length: total }, (_, i) => i + 1);
      if (page <= total - 5) {
        methods.setValue('pages', pages.slice(page - 1, page + 5));
      } else {
        methods.setValue('pages', pages.slice(total - 5, total));
      }
      methods.setValue('total', total);
      setNotFound(false);
    } catch (err) {}
    methods.setValue('loadingPokemons', false);
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      return;
    } else {
      setPokemons([result]);
    }
    setSearching(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="App">
        <Searchbar onSearch={onSearch} />
        {notFound && <div className="not-found-text">No se ha encontrado el Pokemon ingresado</div>}

        {!notFound && <Pokedex pokemons={pokemons} />}
      </div>
    </FormProvider>
  );
};

export default Home;

export const variablePrueba = {};
