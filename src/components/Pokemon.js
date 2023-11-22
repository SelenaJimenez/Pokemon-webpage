import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Pokemon = (props) => {
  const { pokemon } = props;

  const navigate = useNavigate();

  const pokemonInformation = (id) => () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="pokemon-card">
      {/* Sprite */}
      <div className="pokemon-img-container">
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          className="pokemon-img"
          onClick={pokemonInformation(pokemon.id)}
        />
      </div>

      {/* Information */}
      <div className="card-body">
        <div className="card-top">
          <h3 className="title-name">{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>

        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, idx) => {
              const colorType = type.type.name + ' type-detail';
              return (
                <div key={idx} className="pokemon-type-text">
                  <p className={colorType}>{type.type.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* abilities */}
        <div className={'border-' + pokemon.types[0].type.name + ' card-bottom-ability'}>
          <div className=" card-ability">
            <b>Abilities</b>
          </div>

          <div className="card-bottom">
            <div className="pokemon-type">
              <table>
                {pokemon.abilities.map((ability, idx) => {
                  return (
                    <tr>
                      <td key={idx}>{ability.ability.name}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
