import React from 'react';
import { connect } from 'unistore/react';
import action from '../action';

const Footer = connect(
  'count',
  action
)(({ count, increment }) => (
  <div className="columns is-gapless is-multiline footer">
    <div className="column is-full">
      <p className="has-text-left is-size-7">&#169; Haris Rahman</p>

      <p>Count: {count}</p>
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  </div>
));

export default Footer;
