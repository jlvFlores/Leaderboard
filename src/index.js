import './style.css';

const refresh = document.getElementById('refresh-btn');
const add = document.getElementById('add-btn');
const name = document.getElementById('name-input');
const score = document.getElementById('score-input');
const recentScores = document.querySelector('.scores');

const removeChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const getScores = async () => {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Kam0cZKamTISyp4S5fjz/scores/', {
    headers: {
       'Accept': 'application/json'
    }
  })
    .then(response => response.text())
    .then(response => {
      removeChildren(recentScores);
      const results = JSON.parse(response);
      results['result'].forEach(result => {
        recentScores.insertAdjacentHTML('beforeend', `
          <p>${result['user']}: ${result['score']}</p>
        `);
      });
    });
}

const postScore = async () => {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Kam0cZKamTISyp4S5fjz/scores/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "user": name.value,
      "score": +score.value
    })
  })
   .then(response => response.json())
  name.value = '';
  score.value = '';
}

refresh.addEventListener('click', () => getScores());
add.addEventListener('click', () => postScore());