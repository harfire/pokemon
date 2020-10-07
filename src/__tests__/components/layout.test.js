import { renderHook } from '@testing-library/react-hooks';
import Layout from '../../components/Layout';

test('Component => Layout', () => {
  const { result } = renderHook(() => Layout()); // eslint-disable-line
});
