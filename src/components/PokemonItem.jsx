import React from 'react';

export default function PokemonItem(props) {
  return (
    <div className='column is-one-quarter'>
      <div onClick={() => props.openDetailPokemon(props.data.name)} className='card pokemon-item'>
        <div className='card-image'>
          <figure className='image'>
            <img src={props.data.img} alt={props.data.name} />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content has-text-centered is-capitalized has-text-weight-semibold m-0'>{props.data.name}</div>
          <div className='has-text-centered is-capitalized is-size-7 has-text-grey-light'>Pokemon #{props.index + 1}</div>
        </div>
      </div>
    </div>
  );
}
