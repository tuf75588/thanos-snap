const audioElement = new Audio('sounds/intro.mp3');
const snapElement = document.querySelector('#snap');
const endpoint =
  'https://gateway.marvel.com/v1/public/events/29/characters?ts=andrew&limit=100&apikey=58b1be5fc900af8aa150d118572b134f&hash=9cc92bb474717133ddc32997d9781d26';
const container = document.querySelector('.container');
const charactersElement = document.querySelector('.characters');
const thanosElement = document.querySelector('#thanos');
//page loads, play dramatic music

snapElement.style.opacity = '0';
// audioElement.play();

//initially hide the snap element on page load until event is triggered

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
//trigger event to show snapElement upon clicking thanos
thanosElement.addEventListener('click', () => {
  snapElement.style.opacity = '1';

  setTimeout(() => {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.src = 'sounds/snap.mp3';
    audioElement.play();
    snapElement.style.opacity = '0';
    setTimeout(() => {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = 'sounds/funeral.mp3';
      audioElement.play();
      balanceUniverse();
    }, 2000);
  }, 5000);
});

function balanceUniverse() {
  //start eliminating characters from the page
  //hide 50% of images;
  const characters = [...document.querySelectorAll('.character')];
  let leftToDie = Math.floor(characters.length / 2);
  console.log('Balancing universe, begin killing', leftToDie, 'characters');

  kill(characters, leftToDie);
}
function kill(characters, leftToDie) {
  if (leftToDie > 0) {
    //do the killing 💀👻
    const randomIndex = Math.floor(Math.random() * characters.length);
    const [characterChosen] = characters.splice(randomIndex, 1);
    characterChosen.style.opacity = '1';
    console.log('Killing...', characterChosen.querySelector('h3').textContent);
    setTimeout(() => {
      kill(characters, leftToDie - 1);
    }, 1000);
  }
}
