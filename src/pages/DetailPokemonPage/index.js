import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail, getPokemonSpecies, getPokemonData } from 'api';
import LoadingWrapper from 'wrappers/LoadingWrapper';
import { isString } from 'lodash';

const DetailPokemonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [preEvolution, setPreEvolution] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    try {
      setLoading(true);
      // const respEvolution = await getPokemonSpecies(id);
      // const respuesta = await getPokemonDetail(id);
      const [respEvolution, respuesta] = await Promise.all([getPokemonSpecies(id), getPokemonDetail(id)]);

      setEvolution(respEvolution);
      setPokemon(respuesta);

      if (respEvolution?.evolves_from_species?.name) {
        const preResp = await getPokemonDetail(respEvolution?.evolves_from_species.name);
        setPreEvolution(preResp);
        setNotFound(true);
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <LoadingWrapper loading={loading}>
      <div className="wrapper">
        <div className="container-wrapper">
          <article className="part card-details">
            <span className={'h1-card-details ' + pokemon?.types[0].type.name}>{pokemon?.name}</span>

            {/* Stats */}

            {/* --------------------------------------------- */}
            <div className="card-body">
              <table>
                <tr>
                  <td className="left-text">Base experience: </td>
                  <td> {pokemon?.base_experience} </td>
                </tr>
                <tr>
                  <td className="left-text">Height: </td>
                  <td> {pokemon?.height} </td>
                </tr>
                <tr>
                  <td className="left-text">Weight: </td>
                  <td> {pokemon?.weight} </td>
                </tr>
                <tr>
                  <td className="left-text">Base happiness: </td>
                  <td> {evolution?.base_happiness} </td>
                </tr>
                <tr>
                  <td className="left-text">Capture ratio: </td>
                  <td> {evolution?.capture_rate} </td>
                </tr>
                <tr>
                  <td className="left-text">Habitat: </td>
                  <td> {evolution?.habitat.name} </td>
                </tr>
                <tr>
                  <td className="left-text">Pre evolution: </td>
                  {notFound && (
                    <td>
                      <img
                        src={preEvolution?.sprites.other.dream_world.front_default}
                        alt={preEvolution?.name}
                        className="img-evolution"
                      />
                      <p>{preEvolution?.name}</p>
                    </td>
                  )}

                  {!notFound && <td> This is the base form </td>}
                </tr>
              </table>
            </div>
            {/* --------------------------------------------- */}
          </article>
          {/* Image */}
          <div className="part bg">
            <img src={pokemon?.sprites.other.dream_world.front_default} alt={pokemon?.name} className="sprite-detail" />
            <div className="add center">
              {pokemon?.types.map((type, idx) => {
                const colorType = type.type.name + ' type-detail-detail';
                return (
                  <div key={idx} className="pokemon-type-text">
                    <p className={colorType}>{type.type.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* MIDDLE SECTION */}
      <div className="wrapper">
        <div className="container-wrapper">
          <article className="part evolution">
            <span className={'evolution-title ' + pokemon?.types[0].type.name}> Stats </span>

            {/* --------------------------------------------- */}
            <div className="card-body paddin-bot">
              {pokemon?.stats.map((stat, idx) => {
                const colorType = pokemon?.types[0].type.name + ' progress-bar-fill';
                return (
                  <div key={idx} className="pokemon-type-text">
                    <p> {stat.stat.name}</p>
                    <div className="wrapper-bar">
                      <div className="progress-bar">
                        <span className={colorType} style={{ width: `${stat.base_stat}%` }}>
                          {stat.base_stat}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* --------------------------------------------- */}
          </article>
        </div>
      </div>
      {/* END OF SECTION */}
    </LoadingWrapper>
  );
};

export default DetailPokemonPage;
