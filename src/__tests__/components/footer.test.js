import { renderHook } from '@testing-library/react-hooks';
import Footer from '../../components/Footer';

test('Component => Footer', () => {
  const { result } = renderHook(() => Footer()); // eslint-disable-line
});

// import React from 'react';
// import { render } from '@testing-library/react';
// import Footer from '../../components/Footer';

// test('Component => Footer is mounted', () => {
//   const { getByText } = render(<Footer />);
//   const element = getByText(/Haris Rahman/i);

//   expect(element).toBeInTheDocument();
// });
