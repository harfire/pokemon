export default function getPokemonId(url) {
	if (url) {
		return url
			.split('/')
			.filter((val) => Number(val))
			.toString();
	}

	return '';
}
