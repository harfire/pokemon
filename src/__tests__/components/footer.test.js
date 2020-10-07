import { renderHook } from '@testing-library/react-hooks';
import Footer from '../../components/Footer';

test('Component => Footer', () => {
  const { result } = renderHook(() => Footer()); // eslint-disable-line
});
