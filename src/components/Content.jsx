import React, { useState, useEffect } from 'react';
import constructImageUrl from '../helpers/constructImageUrl';
import getPokemonId from '../helpers/getPokemonId';
import getAPI from '../utils/getAPI';
import LoadingUi from './common/Loading';
import PokemonItem from './PokemonItem';
import PokemonDetail from './PokemonDetail';

export default function Content() {
  const [initLoading, setInitLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonListOriginal, setPokemonListOriginal] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);
  const [pokemonAbility, setPokemonAbility] = useState(null);
  const [offsetParam, setOffsetParam] = useState(0);
  const [isFilteredList, setIsFilteredList] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [keyword, setKeyword] = useState('');

  const delayValue = 500;

  const constructDataList = (data, isByType) => {
    return data.map((val) => ({
      name: isByType ? val.pokemon.name : val.name,
      url: isByType ? val.pokemon.url : val.url,
      img: constructImageUrl(isByType ? val.pokemon.url : val.url)
    }));
  };

  async function getData(params = {}, endpointParam = '', pokemonName = '', isSearch = '') {
    try {
      const { data } = await getAPI('GET', `https://pokeapi.co/api/v2/${endpointParam}/${pokemonName}`, params);

      if (endpointParam === 'pokemon' && pokemonName && isSearch) {
        const url = `https://pokeapi.co/api/v2/pokemon/${data.id}/`;

        setPokemonList(() => [
          {
            name: data.name,
            url,
            img: constructImageUrl(url)
          }
        ]);
      } else if (endpointParam === 'pokemon' && pokemonName) {
        setPokemonDetail(data);
      } else if (endpointParam === 'pokemon') {
        setPokemonList([...pokemonList, ...constructDataList(data.results)]);
        setPokemonListOriginal([...pokemonList, ...constructDataList(data.results)]);
        setOffsetParam((val) => {
          const offsetValue = val;
          const newOffsetValue = offsetValue + 16;

          return newOffsetValue;
        });
      } else if (endpointParam === 'type') {
        if (!pokemonName) {
          setPokemonType(data.results);
        } else {
          setPokemonList(constructDataList(data.pokemon, true));
        }
      } else if (endpointParam === 'ability') {
        if (!pokemonName) {
          setPokemonAbility(data.results);
        } else {
          setPokemonList(constructDataList(data.pokemon, true));
        }
      }
    } catch (error) {
      // TODO: Create proper function to error handling

      if (isSearch && keyword) {
        setDataNotFound(true);
        setPokemonList(() => []);
      }
    } finally {
      setInitLoading(false);
      setLoadMoreLoading(false);
      setLoadingDetail(false);
      setLoadingSearch(false);

      setTimeout(() => setLoadingOverlay(false), delayValue);
    }
  }

  const getDetailPokemon = (endpointParam, pokemonName) => {
    setLoadingDetail(true);
    getData({}, endpointParam, pokemonName);
  };

  const filteredPokemonListBy = (e, type) => {
    setIsFilteredList(true);
    const { value } = e.target;

    if (value) {
      setLoadingOverlay(true);
      getData({}, type, value);
    } else {
      setLoadingOverlay(true);
      setPokemonList(() => []);
      setPokemonList(() => pokemonListOriginal);
      setIsFilteredList(false);

      setTimeout(() => setLoadingOverlay(false), delayValue);
    }
  };

  const searchPokemonByKeyword = (e) => {
    e.preventDefault();

    if (keyword) {
      setLoadingSearch(true);
      setIsFilteredList(true);
      getData({}, 'pokemon', keyword.trim().toLocaleLowerCase(), true);
    }
  };

  const loadMore = () => {
    setLoadMoreLoading(true);
    getData({ offset: offsetParam, limit: 16 }, 'pokemon');
  };

  useEffect(() => {
    getData({ offset: offsetParam, limit: 16 }, 'pokemon');
    getData({}, 'type', undefined);
    getData({}, 'ability', undefined);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!keyword) {
      setPokemonList(() => pokemonListOriginal);
      setDataNotFound(false);
      setIsFilteredList(false);
    }
    // eslint-disable-next-line
  }, [keyword]);

  return (
    <div className="columns is-multiline is-gapless pokemon-content">
      <div className="column is-half">
        {loadingDetail ? (
          <div className="is-clearfix">
            <LoadingUi />
          </div>
        ) : (
          <div className="is-clearfix detail-cont">
            <PokemonDetail detail={pokemonDetail} />
          </div>
        )}
      </div>
      <div className="column is-half items-container">
        <div className="columns is-multiline is-gapless scrolled">
          {initLoading ? (
            <div className="column is-full has-text-centered">
              <LoadingUi detail={pokemonDetail} />
            </div>
          ) : (
            <div className="column is-full">
              {/* Pokemon Detail */}
              <div className="columns is-variable is-2 is-multiline">
                <div className="column is-one-quarter">
                  <div className="control">
                    <div className="select is-rounded is-small is-fullwidth">
                      <select onChange={(e) => filteredPokemonListBy(e, 'type')}>
                        <option value="">-- All Type --</option>
                        {pokemonType && pokemonType.length
                          ? pokemonType.map((val, i) => (
                              <option key={`pokemin-type-list-${i}`} value={getPokemonId(val.url)}>
                                {val.name}
                              </option>
                            ))
                          : undefined}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="column is-one-quarter">
                  <div className="control">
                    <div className="select is-rounded is-small is-fullwidth">
                      <select onChange={(e) => filteredPokemonListBy(e, 'ability')}>
                        <option value="">-- All Ability --</option>
                        {pokemonAbility && pokemonAbility.length
                          ? pokemonAbility.map((val, i) => (
                              <option
                                className="is-capitalized"
                                key={`pokemin-type-list-${i}`}
                                value={getPokemonId(val.url)}
                              >
                                {val.name}
                              </option>
                            ))
                          : undefined}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <form onSubmit={(e) => searchPokemonByKeyword(e)}>
                    <div className="field has-addons">
                      <div className={loadingSearch ? `control is-loading is-expanded` : 'control is-expanded'}>
                        <input
                          onChange={(e) => setKeyword(e.target.value)}
                          className="input is-rounded is-small is-fullwidth"
                          type="text"
                          placeholder="Search"
                          disabled={!!loadingSearch}
                        />
                      </div>
                      <div className="control">
                        <button
                          type="submit"
                          style={{ padding: '0 8px 0 5px', height: '30px' }}
                          className="button is-small is-primary is-rounded"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Pokemon Item */}
              <div className="columns is-multiline list-cont">
                {loadingOverlay && (
                  <div className="column overlay-loading">
                    <LoadingUi />
                  </div>
                )}

                {pokemonList.map((value, index) => (
                  <PokemonItem
                    openDetailPokemon={(pokemonName) => getDetailPokemon('pokemon', pokemonName)}
                    data={value}
                    index={index}
                    key={`list-pokemon-${index}`}
                  />
                ))}

                {dataNotFound && (
                  <div className="column is-full">
                    <h5>Pokemon {keyword} not found!</h5>
                  </div>
                )}
              </div>

              {/* Load more button */}
              {pokemonList && pokemonList.length && !isFilteredList ? (
                <div className="columns is-multiline">
                  <div className="column is-full has-text-centered">
                    {loadMoreLoading && !initLoading ? (
                      <button type="button" className="button button is-primary is-outlined load-more is-loading">
                        &nbsp;
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => loadMore()}
                        className="button is-primary is-outlined load-more"
                      >
                        Load More
                      </button>
                    )}
                  </div>
                </div>
              ) : undefined}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
