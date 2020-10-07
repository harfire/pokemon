export default function constructImageUrl(url) {
  if (url) {
    const pokemonImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

    const split = url
      .split('/')
      .filter((val) => Number(val))
      .toString();

    return `${pokemonImgUrl}${split}.png`;
  }

  return '';
}
