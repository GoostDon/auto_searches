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

  if(document.getElementById("compareEngines").checked){
    searchAllEngines();
  } else {
    for (let i=0; i<n; i++) {openLoop2(i,d)}
  }
}


function openLoop2(i,d) {
  setTimeout(function() {openURLS()},d*i)
}


async function openURLS() {
  const wordURL = 'https://random-word-api.herokuapp.com/word?number=1';

  const searchEngines = {
    optionB: 'https://www.bing.com/search?q=',
    optionD: 'https://duckduckgo.com/?q=',
    optionG: 'https://www.google.com/search?q=',
    optionY: 'https://search.yahoo.com/search?q='
  };

  let searchTerm = await fetch(wordURL)
      .then(res => res.json())
      .then(out => out[0])
      .catch(err => { throw err });

  let selectedEngine;
  for (let key in searchEngines) {
    if (document.getElementById(key).checked) {
      selectedEngine = searchEngines[key];
      break;
    }
  }

  let searchURL = selectedEngine.concat(searchTerm);
  window.open(searchURL, '_blank');
}

async function searchAllEngines() {
  const wordURL = 'https://random-word-api.herokuapp.com/word?number=1';

  const searchEngines = {
    optionB: 'https://www.bing.com/search?q=',
    optionD: 'https://duckduckgo.com/?q=',
    optionG: 'https://www.google.com/search?q=',
    optionY: 'https://search.yahoo.com/search?q='
  };

  let searchInput = document.getElementById("customSearch").value;
  let searchTerm;

  if (searchInput) {
    searchTerm = searchInput;
  } else {
    searchTerm = await fetch(wordURL)
      .then(res => res.json())
      .then(out => out[0])
      .catch(err => { throw err });
  }

  for (let engine in searchEngines) {
    let searchURL = searchEngines[engine].concat(searchTerm);
    window.open(searchURL, '_blank');
  }
}



function toggleCompareMode() {
  let compareMode = document.getElementById("compareEngines").checked;
  let compareModeOptions = document.getElementById("compareModeOptions");
  let myEngineOptions = document.querySelector("[for='myEngine']").parentNode;
  let mySearchesOptions = document.querySelector("[for='mySearches']").parentNode;
  let myDelayOptions = document.querySelector("[for='myDelay']").parentNode;

  if (compareMode) {
    compareModeOptions.style.display = "block";
    myEngineOptions.style.display = "none";
    mySearchesOptions.style.display = "none";
    myDelayOptions.style.display = "none";
  } else {
    compareModeOptions.style.display = "none";
    myEngineOptions.style.display = "block";
    mySearchesOptions.style.display = "block";
    myDelayOptions.style.display = "block";
  }
}
