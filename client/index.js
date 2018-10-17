const endpoint =
  'https://gateway.marvel.com:443/v1/public/series/24044/characters?ts=andrew&apikey=58b1be5fc900af8aa150d118572b134f&hash=9cc92bb474717133ddc32997d9781d26';
const container = document.querySelector('.container');
const getMarvelHeros = async () => {
  const url = await fetch(endpoint);
  const response = await url.json();
  return response.data.results;
};
getMarvelHeros().then(hero => {
  hero.forEach(hero => {
    console.log(hero);
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', hero.thumbnail.path + '/standard_medium.jpg');
    div.appendChild(img);
    container.appendChild(div);
  });
});
