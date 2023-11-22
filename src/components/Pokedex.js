import React from 'react';
import Pagination from './Pagination';
import Pokemon from './Pokemon';
import { useWatch } from 'react-hook-form';

const Pokedex = (props) => {
  const { pokemons } = props;

  const loading = useWatch({ name: 'loadingPokemons' });

  return (
    <div>
      <div className="header">
        <Pagination />
      </div>

      {loading && <div>Cargando pokemones...</div>}

      {!loading && (
        <div className="pokedex-grid">
          {pokemons.map((pokemon, idx) => {
            return <Pokemon pokemon={pokemon} key={pokemon.name} />;
          })}
        </div>
      )}

      <div className="header">
        <Pagination />
      </div>
    </div>
  );
};

export default Pokedex;
