document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    openLoop1();
  }
});

document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  openLoop1();
});


function openLoop1() {
  let n = document.getElementById("mySearches").value;
  let d = document.getElementById("myDelay").value*1000;
  for (let i=0; i<n; i++) {openLoop2(i,d)}
}

function openLoop2(i,d) {
  setTimeout(function() {openURLS()},d*i)
}

function openURLS() {
  const wordURL = 'https://random-word-api.herokuapp.com/word?number=1';

  const searchEngines = {
    optionB: 'https://www.bing.com/search?q=',
    optionD: 'https://duckduckgo.com/?q=',
    optionG: 'https://www.google.com/search?q=',
    optionY: 'https://search.yahoo.com/search?q='
  };

  fetch(wordURL)
    .then(res => res.json())
    .then((out) => {
      let selectedEngine;
      
      for (const [key, value] of Object.entries(searchEngines)) {
        if (document.getElementById(key).checked) {
          selectedEngine = value;
          break;
        }
      }
      
      let searchURL = selectedEngine.concat(out);
      window.open(searchURL, '_blank');
    })
    .catch(err => { throw err });
}
