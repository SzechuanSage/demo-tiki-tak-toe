/* global document */
/* global window */
/* global Worker */

const getById = function (id) {
  return document.getElementById(id);
};

const getGC = function () {
  return this.gameCutters;
};

const processMessage = function (message) {
  const table = getById('featureTable');
  const data = JSON.parse(message.data);
  data.collect.forEach((c, i) => {
    table.rows[i + 1].cells[1].textContent = c.spins;
    table.rows[i + 1].cells[2].textContent = c.prize;
    table.rows[i + 1].cells[3].textContent = c.coinIn;
    table.rows[i + 1].cells[4].textContent = c.coinOut;
  });
  table.rows[7].cells[4].textContent = data.total.freeCoin;
  const featureIn = data.total.bet;
  const featureOut = data.total.coin;
  const featureRtp = (100 * featureOut / featureIn).toFixed(2) + "%";
  const featureHRBase = (data.total.baseSpins / data.total.baseHits).toFixed(2);
  const featureHRFree = (data.total.freeSpins / data.total.freeHits).toFixed(2);
  const featureHRAll = ((data.total.baseSpins + data.total.freeSpins) / (data.total.baseHits + data.total.freeHits)).toFixed(2);
  table.rows[9].cells[4].textContent = featureIn;
  table.rows[10].cells[4].textContent = featureOut;
  table.rows[11].cells[4].textContent = featureRtp;
  table.rows[13].cells[4].textContent = featureHRBase;
  table.rows[14].cells[4].textContent = featureHRFree;
  table.rows[15].cells[4].textContent = featureHRAll;
  const gc = getGC();
  gc.sessionIn += featureIn;
  gc.sessionOut += featureOut;
  gc.baseSpins += data.total.baseSpins;
  gc.baseHits += data.total.baseHits;
  gc.freeSpins += data.total.freeSpins;
  gc.freeHits += data.total.freeHits;
  const sessionRtp = (100 * gc.sessionOut / gc.sessionIn).toFixed(2) + "%";
  const sessionHRBase = (gc.baseSpins / gc.baseHits).toFixed(2);
  const sessionHRFree = (gc.freeSpins / gc.freeHits).toFixed(2);
  const sessionHRAll = ((gc.baseSpins + gc.freeSpins) / (gc.baseHits + gc.freeHits)).toFixed(2);
  table.rows[9].cells[1].textContent = gc.sessionIn;
  table.rows[10].cells[1].textContent = gc.sessionOut;
  table.rows[11].cells[1].textContent = sessionRtp;
  table.rows[13].cells[1].textContent = sessionHRBase;
  table.rows[14].cells[1].textContent = sessionHRFree;
  table.rows[15].cells[1].textContent = sessionHRAll;
};

window.onload = function () {
  const workerFeature = new Worker('./dist/workerRandomB.js');
  workerFeature.onmessage = processMessage;

  const config = this['gameCutters'].config;
  this['gameCutters'].sessionIn = 0;
  this['gameCutters'].sessionOut = 0;
  this['gameCutters'].baseSpins = 0;
  this['gameCutters'].baseHits = 0;
  this['gameCutters'].freeSpins = 0;
  this['gameCutters'].freeHits = 0;

  let inAutoplay = false;
  let autoplayInterval = null;

  const runFeature = () => workerFeature.postMessage({config, feature: true});

  const clickFeature = (() => {
    runFeature();
  });

  const clickAutoplay = (() => {
    inAutoplay = !inAutoplay;
    if (inAutoplay) {
      autoplayButton.textContent = 'Stop Autoplay Feature';
      autoplayInterval = setInterval(runFeature, 30);
      featureButton.disabled = true;
    } else {
      autoplayButton.textContent = 'Start Autoplay Feature';
      clearInterval(autoplayInterval);
      featureButton.disabled = false;
    }
  });

  const featureButton = getById('featureButton');
  featureButton.addEventListener('click', clickFeature, false);

  const autoplayButton = getById('autoplayButton');
  autoplayButton.addEventListener('click', clickAutoplay, false);
};
