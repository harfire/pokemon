import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'unistore';
import { Provider } from 'unistore/react';

import 'bulma/css/bulma.css';
import './assets/sass/main.scss';

import * as serviceWorker from './serviceWorker';

import Layout from './components/Layout';

const store = createStore({
  count: 0,
  stuff: []
});

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
