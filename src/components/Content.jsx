import React, { useState, useEffect } from 'react';
import constructImageUrl from '../helpers/constructImageUrl';
import getPokemonId from '../helpers/getPokemonId';
import getAPI from '../utils/getAPI';
import LoadingUi from './common/Loading';
import PokemonItem from './PokemonItem';
import PokemonDetail from './PokemonDetail';

export default function Content(props) {
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

  async function getData(params = {}, endpointParam = '', pokemonName = '', isSearch = '') {
    try {
      const { data } = await getAPI('GET', `https://pokeapi.co/api/v2/${endpointParam}/${pokemonName}`, params);

      if (endpointParam === 'pokemon' && pokemonName && isSearch) {
        const url = `https://pokeapi.co/api/v2/pokemon/${data.id}/`;

        setPokemonList(() => [
          {
            name: data.name,
            url: url,
            img: constructImageUrl(url),
          },
        ]);
      } else if (endpointParam === 'pokemon' && pokemonName) {
        setPokemonDetail(data);
      } else if (endpointParam === 'pokemon') {
        setPokemonList([...pokemonList, ...constructDataList(data.results)]);
        setPokemonListOriginal([...pokemonList, ...constructDataList(data.results)]);
        setOffsetParam((val) => (val += 16));
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

  const constructDataList = (data, isByType) => {
    return data.map((val) => ({
      name: isByType ? val.pokemon.name : val.name,
      url: isByType ? val.pokemon.url : val.url,
      img: constructImageUrl(isByType ? val.pokemon.url : val.url),
    }));
  };

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

  const searchPokemonByKeyword = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!keyword) {
      setPokemonList(() => pokemonListOriginal);
      setDataNotFound(false);
      setIsFilteredList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <div className='columns is-multiline is-gapless pokemon-content'>
      <div className='column is-half'>
        {loadingDetail ? (
          <div className='is-clearfix'>
            <LoadingUi></LoadingUi>
          </div>
        ) : (
          <div className='is-clearfix detail-cont'>
            <PokemonDetail detail={pokemonDetail}></PokemonDetail>
          </div>
        )}
      </div>
      <div className='column is-half items-container'>
        <div className='columns is-multiline is-gapless scrolled'>
          {initLoading ? (
            <div className='column is-full has-text-centered'>
              <LoadingUi detail={pokemonDetail}></LoadingUi>
            </div>
          ) : (
            <div className='column is-full'>
              <div className='columns is-variable is-2 is-multiline'>
                <div className='column is-one-third'>
                  <div className='control'>
                    <div className='select is-rounded is-small is-fullwidth'>
                      <select onChange={(e) => filteredPokemonListBy(e, 'type')}>
                        <option value=''>-- All Type --</option>
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
                <div className='column is-one-third'>
                  <div className='control'>
                    <div className='select is-rounded is-small is-fullwidth'>
                      <select onChange={(e) => filteredPokemonListBy(e, 'ability')}>
                        <option value=''>-- All Ability --</option>
                        {pokemonAbility && pokemonAbility.length
                          ? pokemonAbility.map((val, i) => (
                              <option className='is-capitalized' key={`pokemin-type-list-${i}`} value={getPokemonId(val.url)}>
                                {val.name}
                              </option>
                            ))
                          : undefined}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='column is-one-third'>
                  <form onSubmit={() => searchPokemonByKeyword()} className='form'>
                    <div className='field'>
                      <div className={loadingSearch ? `control is-loading` : 'control'}>
                        <input onChange={(e) => setKeyword(e.target.value)} className={'input is-rounded is-small is-fullwidth'} type='text' placeholder='Search' disabled={loadingSearch ? true : false} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className='columns is-multiline list-cont'>
                {loadingOverlay && (
                  <div className='column overlay-loading'>
                    <LoadingUi></LoadingUi>
                  </div>
                )}

                {pokemonList.map((value, index) => (
                  <PokemonItem openDetailPokemon={(pokemonName) => getDetailPokemon('pokemon', pokemonName)} data={value} index={index} key={`list-pokemon-${index}`}></PokemonItem>
                ))}

                {dataNotFound && (
                  <div className='column is-full'>
                    <h5>Pokemon {keyword} not found!</h5>
                  </div>
                )}
              </div>
              {pokemonList && pokemonList.length && !isFilteredList ? (
                <div className='columns is-multiline'>
                  <div className='column is-full has-text-centered'>
                    {loadMoreLoading && !initLoading ? (
                      <button className='button button is-primary is-outlined load-more is-loading'>&nbsp;</button>
                    ) : (
                      <button onClick={() => loadMore()} className='button is-primary is-outlined load-more'>
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
