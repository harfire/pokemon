import React from 'react';
// import classes from '../assets/sass/modules/header.module.scss';

export default function Header() {
  return (
    <div className="columns is-gapless is-multiline">
      <div className="column is-one-fifth">&nbsp;</div>
      <div className="column">
        <h1 className="is-size-2 has-text-centered is-family-monospace">Pokédex</h1>
        {/* <h1 className={classes.headerColor}>Pokédex</h1> */}
      </div>
      <div className="column is-one-fifth has-text-right">&nbsp;</div>
    </div>
  );
}
