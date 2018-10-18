const audioElement = new Audio('sounds/intro.mp3');

const endpoint =
  'https://gateway.marvel.com/v1/public/events/29/characters?ts=andrew&limit=100&apikey=58b1be5fc900af8aa150d118572b134f&hash=9cc92bb474717133ddc32997d9781d26';
const container = document.querySelector('.container');
const charactersElement = document.querySelector('.characters');

function getCharacterData() {
  if (localStorage.characterData) {
    //use our local cache instead of repeatedly calling API
    return Promise.resolve(JSON.parse(localStorage.characterData));
  }
  //if not, call the API
  return fetch(endpoint).then(data => {
    return data.json().then(data => {
      localStorage.characterData = JSON.stringify(data);
      return data;
    });
  });
}
const hiddenCharacters = {
  1009652: true,
  1009165: true,
  1009726: true,
  1009299: true
};
getCharacterData().then(({ data }) => {
  const characters = data;
  addCharactersToPage(characters);
});

function addCharactersToPage(characterData) {
  const characters = characterData.results;
  characters.forEach(character => {
    console.log(character);
    const img = document.createElement('img');
    const charElement = document.createElement('div');
    const characterImage =
      character.name !== 'Thanos'
        ? `${character.thumbnail.path}/standard_medium.jpg`
        : '';
    const characterNameElement = document.createElement('h3');
    img.setAttribute('src', characterImage);
    charElement.appendChild(img);
    const showNames =
      character.name !== 'Thanos'
        ? charElement.appendChild(characterNameElement)
        : '';
    characterNameElement.textContent = character.name;
    charactersElement.appendChild(charElement);
  });
}
