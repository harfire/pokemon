import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

test('Component => Header is mounted', () => {
  const { getByText } = render(<Header />);
  const element = getByText(/Pokédex/i);

  expect(element).toBeInTheDocument();
});
