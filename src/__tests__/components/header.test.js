import { renderHook } from '@testing-library/react-hooks';
import Header from '../../components/Header';

test('Component => Header', () => {
	const { result } = renderHook(() => Header()); // eslint-disable-line
});
