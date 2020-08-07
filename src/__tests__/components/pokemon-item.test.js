import { renderHook } from '@testing-library/react-hooks';
import PokemonItem from '../../components/PokemonItem';

test('Component => PokemonItem', () => {
  const { result } = renderHook(() => PokemonItem());
});
