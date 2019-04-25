(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (global){
(function (context) {
  const ctx = (context === undefined) ? global : context;
  ctx.gameCutters = Object.create(null);
  ctx.gameCutters.config = {
    name: 'Tiki-Tak-Toe-RAW-V4-97.75',
    symbols: [
      { symbol: 'B', value: 'B', pays: [0, 0, 100, 0, 0] },
      { symbol: 'C', value: 'C', pays: [0, 0, 50, 0, 0] },
      { symbol: 'D', value: 'D', pays: [0, 0, 30, 0, 0] },
      { symbol: 'E', value: 'E', pays: [0, 0, 20, 0, 0] },
      { symbol: 'F', value: 'F', pays: [0, 0, 10, 0, 0] },
      { symbol: 'X', value: 'X', pays: [0, 0, 5, 0, 0] },
      { symbol: 'O', value: 'O', pays: [0, 0, 5, 0, 0] }
    ],
    reels: [
      ['E', 'O', 'D', 'E', 'X', 'D', 'F', 'E', 'O', 'D', 'E', 'X', 'E', 'O', 'D', 'E', 'B', 'D', 'E', 'X', 'D', 'E', 'X', 'O', 'E', 'D', 'E', 'F', 'D', 'E', 'F', 'D', 'E', 'D', 'E', 'C', 'D'],
      ['F', 'X', 'C', 'F', 'O', 'C', 'F', 'X', 'O', 'C', 'F', 'O', 'C', 'F', 'C', 'X', 'O', 'C', 'D', 'F', 'C', 'X', 'F', 'C', 'B', 'F', 'C', 'B', 'F', 'C', 'B', 'F', 'C', 'B', 'F', 'E', 'C'],
      ['E', 'X', 'D', 'O', 'F', 'X', 'B', 'E', 'D', 'F', 'X', 'E', 'D', 'O', 'E', 'B', 'O', 'F', 'X', 'E', 'O', 'D', 'F', 'E', 'B', 'F', 'E', 'D', 'E', 'B', 'D', 'E', 'F', 'B', 'C', 'E', 'D']
    ],
    freeReels: [
      ['E', 'X', 'O', 'E', 'X', 'O', 'D', 'E', 'X', 'O', 'E', 'X', 'O', 'E', 'X', 'O', 'D', 'E', 'X', 'O', 'E', 'X', 'O', 'D', 'E', 'D', 'E', 'X', 'D', 'E', 'O', 'F', 'E', 'B', 'C'],
      ['F', 'X', 'O', 'C', 'F', 'X', 'O', 'C', 'F', 'X', 'O', 'C', 'F', 'X', 'O', 'C', 'D', 'F', 'X', 'O', 'F', 'C', 'B', 'F', 'C', 'B', 'F', 'C', 'B', 'F', 'C', 'B', 'F', 'E', 'C'],
      ['E', 'X', 'O', 'F', 'X', 'B', 'D', 'F', 'X', 'O', 'E', 'B', 'O', 'F', 'X', 'O', 'D', 'F', 'X', 'B', 'F', 'X', 'O', 'D', 'E', 'D', 'E', 'B', 'D', 'E', 'O', 'F', 'E', 'B', 'C']
    ],
    rows: {
      reels: 3,
      freeReels: 5
    },
    collections: {
      trigger: 6,
      prizes: [
        { prize: 2, probability: 349 },
        { prize: 3, probability: 310 },
        { prize: 4, probability: 150 },
        { prize: 5, probability: 100 },
        { prize: 10, probability: 90 },
        { prize: 20, probability: 1 }
      ],
      patterns: [
        { symbol: 'X', positions: [0,3,6] },
        { symbol: 'X', positions: [1,4,7] },
        { symbol: 'X', positions: [2,5,8] },
        { symbol: 'X', positions: [0,1,2] },
        { symbol: 'X', positions: [3,4,5] },
        { symbol: 'X', positions: [6,7,8] },
        { symbol: 'X', positions: [0,4,8] },
        { symbol: 'X', positions: [2,4,6] },
        { symbol: 'O', positions: [0,3,6] },
        { symbol: 'O', positions: [1,4,7] },
        { symbol: 'O', positions: [2,5,8] },
        { symbol: 'O', positions: [0,1,2] },
        { symbol: 'O', positions: [3,4,5] },
        { symbol: 'O', positions: [6,7,8] },
        { symbol: 'O', positions: [0,4,8] },
        { symbol: 'O', positions: [2,4,6] }
      ]
    }
  };
}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (process){
'use strict';

/* global postMessage */
/* global self */

var seedrandom = require('seedrandom');
var rng = seedrandom();

var report = Object.create(null);

report.updater = null;

var config = {};

var server = function server() {
  var REELS = 3;
  var ROWS = 3;
  var PAYLINES = 10; // minimum bet
  var KEEP = 0;
  var DELETE = 1;
  var STICKY = 2;

  var values = {};
  var pays = {};
  var isWild = {};
  var wildX = {};
  var isScatter = {};
  var scatterSymbols = [];
  var isLine = {};
  var isSplatter = {};
  var symbolCountKeys = [];
  var paylineShapes = [];
  var reels = []; // pointer to base and free reels
  var reelsBase = [];
  var reelsFree = [];
  var reelLengths = []; // pointer to base and free reel lengths
  var reelLengthsBase = [];
  var reelLengthsFree = [];
  var reelView = [];
  var valueView = [];
  var reelViewState = new Array(REELS * ROWS).fill(KEEP);
  var cascadeStops = [0, 0, 0, 0, 0];
  var lookupTable = {};
  var pattern = void 0;
  var patternHits = void 0;
  var patternCollections = 0;

  var evaluateLine = function evaluateLine(line) {
    var result = {};
    var index = 0;
    var multiplier = 1;
    result.count = 0;
    result.symbol = line[index];
    while (line[index] === result.symbol || isWild[line[index]] || isWild[result.symbol]) {
      var li = line[index];
      if (isScatter[li]) {
        break;
      }
      result.count += 1;
      if (isWild[li]) {
        result.hasWild = true;
        multiplier = wildX[li];
      }
      if (isWild[result.symbol] && !isWild[li]) {
        result.symbol = li;
      }
      index += 1;
      if (index === line.length) {
        break;
      }
    }

    if (!isScatter[result.symbol]) {
      result.win = pays[result.symbol][result.count - 1];
    }
    if (isLine[result.symbol]) {
      result.win *= multiplier;
    }
    index = 0;
    result.wildCount = 0;
    while (isWild[line[index]]) {
      result.wildCount += 1;
      index += 1;
      if (index === line.length) {
        break;
      }
    }
    if (result.wildCount > 0) {
      var wildWin = pays[line[0]][result.wildCount - 1];
      if (wildWin >= result.win) {
        result.win = wildWin;
        result.symbol = line[0];
        result.count = result.wildCount;
      }
    }
    return result;
  };

  function init() {
    config.symbols.forEach(function (x) {
      var symbolId = x.symbol;
      values[symbolId] = x.value;
      pays[symbolId] = x.pays;
      x.pays.forEach(function (p, i) {
        symbolCountKeys.push(x.value + (i + 1).toString());
      });
      isWild[symbolId] = false;
      wildX[symbolId] = 1;
      isScatter[symbolId] = false;
      isLine[symbolId] = true;
      isSplatter[symbolId] = false;
    });
    if (config.wilds) {
      config.wilds.forEach(function (x) {
        var symbolId = x.symbol;
        isWild[symbolId] = true;
        wildX[symbolId] = x.multiplier;
        isLine[symbolId] = false;
      });
    }
    if (config.scatters) {
      config.scatters.forEach(function (x, i) {
        var symbolId = x.symbol;
        isScatter[symbolId] = true;
        isLine[symbolId] = false;
        scatterSymbols[i] = symbolId;
      });
    }
    if (config.paylines) {
      var uniqueValuesSet = new Set();
      Object.keys(values).forEach(function (v) {
        return uniqueValuesSet.add(values[v]);
      });
      var uniqueValues = Array.from(uniqueValuesSet);
      var uVL = uniqueValues.length;
      for (var i1 = 0; i1 < uVL; i1 += 1) {
        for (var i2 = 0; i2 < uVL; i2 += 1) {
          for (var i3 = 0; i3 < uVL; i3 += 1) {
            for (var i4 = 0; i4 < uVL; i4 += 1) {
              for (var i5 = 0; i5 < uVL; i5 += 1) {
                var iLine = [uniqueValues[i1], uniqueValues[i2], uniqueValues[i3], uniqueValues[i4], uniqueValues[i5]];
                var iEvaluation = evaluateLine(iLine);
                if (iEvaluation.win > 0) {
                  lookupTable[iLine.join('')] = iEvaluation;
                }
              }
            }
          }
        }
      }
      config.paylines.forEach(function (x, i) {
        paylineShapes[i] = x.map(function (row, index) {
          return row + index * ROWS;
        });
      });
    }
    config.reels.forEach(function (x) {
      reelsBase.push(x);
      reelLengthsBase.push(x.length);
    });
    config.freeReels.forEach(function (x) {
      reelsFree.push(x);
      reelLengthsFree.push(x.length);
    });
  }

  var getReelSymbolsAt = function getReelSymbolsAt(reel, index) {
    var result = [];
    var i = index;
    for (var j = 0; j < ROWS; j += 1) {
      result[j] = reel[i];
      i += 1;
      if (i === reel.length) {
        i = 0;
      }
    }
    return result;
  };

  var setNextReelView = function setNextReelView() {
    var x = 0;
    for (var i = 0; i < REELS; i += 1) {
      var stop = Math.floor(rng() * reelLengths[i]);
      cascadeStops[i] = [stop];
      var symbols = getReelSymbolsAt(reels[i], stop);
      for (var j = 0; j < ROWS; j += 1) {
        reelView[x] = symbols[j];
        valueView[x] = values[symbols[j]];
        x += 1;
      }
    }
  };

  var evaluateReelView = function evaluateReelView() {
    var spinResult = {};
    reelViewState = valueView.map(function () {
      return KEEP;
    });
    // check scatters
    spinResult.scatters = [];
    spinResult.scattersTotal = 0;
    scatterSymbols.forEach(function (scatter) {
      var scatterWin = 0;
      var scatterPositions = [];
      var count = reelView.reduce(function (total, symbol, position) {
        var newTotal = void 0;
        if (symbol === scatter) {
          newTotal = total + 1;
          scatterPositions.push(position);
        } else {
          newTotal = total;
        }
        return newTotal;
      }, 0);
      if (count > 0) {
        scatterWin = pays[scatter][count - 1] * PAYLINES;
        scatterPositions.forEach(function (position) {
          reelViewState[position] = DELETE;
        });
      }
      spinResult.scatters.push({ scatter: scatter, count: count, scatterWin: scatterWin });
      spinResult.scattersTotal += scatterWin;
    });
    // check ways of valueView
    var counts = {};
    config.symbols.forEach(function (x) {
      return counts[x.value] = new Array(REELS).fill(0);
    });
    var symbolsToCheck = new Set();
    // examine first reel
    var reel = 0;
    for (var row = 0; row < ROWS; row += 1) {
      var symbol = valueView[row];
      counts[symbol][reel] += 1;
      symbolsToCheck.add(symbol);
    }
    // examine remaining reels
    for (var _row = ROWS; _row < valueView.length; _row += 1) {
      var _symbol = valueView[_row];
      if (_row % ROWS === 0) {
        reel += 1;
      }
      counts[_symbol][reel] += 1;
    }
    // collect ways
    spinResult.ways = [];
    spinResult.total = 0;
    symbolsToCheck.forEach(function (symbol) {
      var ways = 1;
      var count = 0;
      while (counts[symbol][count] > 0) {
        ways *= counts[symbol][count];
        count += 1;
      }
      var win = pays[symbol][count - 1] * ways;
      spinResult.ways.push({ symbol: symbol, count: count, ways: ways, win: win });
      spinResult.total += win;
    });
    // stick wilds
    reelView.forEach(function (value, index) {
      if (isWild[value]) {
        reelViewState[index] = STICKY;
      }
    });
    return spinResult;
  };

  var cascadeReel = function cascadeReel(reelViewIndex, reelIndex) {
    var newReelView = new Array(ROWS).fill('');
    var availableRows = [];

    for (var row = ROWS - 1; row >= 0; row -= 1) {
      var currentRow = reelViewIndex + row;
      switch (reelViewState[currentRow]) {
        case 0:
          // keep
          if (availableRows.length > 0) {
            newReelView[availableRows.shift() - reelViewIndex] = reelView[currentRow];
            availableRows.push(currentRow);
          } else {
            newReelView[row] = reelView[currentRow];
          }
          break;
        case 1:
          // drop
          availableRows.push(currentRow);
          break;
        case 2:
          // sticky
          newReelView[row] = reelView[currentRow];
          break;
        default:
          throw Error('no default');
      }
    }
    while (availableRows.length > 0) {
      cascadeStops[reelIndex] -= 1;
      if (cascadeStops[reelIndex] < 0) {
        cascadeStops[reelIndex] = reels[reelIndex].length - 1;
      }
      newReelView[availableRows.shift() - reelViewIndex] = reels[reelIndex][cascadeStops[reelIndex]];
    }
    // for (let row = 0; row < ROWS; row += 1) {
    //   const currentRow = reelViewIndex + row;
    //   console.log(reelView[currentRow], reelViewState[currentRow], newReelView[row]);
    // }
    return newReelView;
  };

  var processCascade = function processCascade() {
    var newReels = [];
    newReels = newReels.concat(cascadeReel(0, 0));
    newReels = newReels.concat(cascadeReel(3, 1));
    newReels = newReels.concat(cascadeReel(6, 2));
    newReels = newReels.concat(cascadeReel(9, 3));
    newReels = newReels.concat(cascadeReel(12, 4));
    newReels.forEach(function (value, index) {
      reelView[index] = value;
    });
  };

  var getCollectionPrize = function getCollectionPrize() {
    var prob = Math.floor(rng() * 1000);
    var index = 0;
    while (prob >= config.collections.prizes[index].probability) {
      prob -= config.collections.prizes[index].probability;
      index += 1;
    }
    return config.collections.prizes[index].prize * PAYLINES;
  };

  var doSpin = function doSpin(isBase) {
    var FREE_GAMES_AWARDED = 10;

    var spinTotal = 0;
    var freeGamesAwarded = 0;
    var prize = 0;

    setNextReelView();
    var result = evaluateReelView();

    if (isBase) {
      pattern.positions.forEach(function (p, i) {
        if (valueView[p] === pattern.symbol) {
          patternHits[i] = true;
        }
      });
    }

    spinTotal += result.total + result.scattersTotal;

    if (isBase) {
      if (patternHits.every(function (hit) {
        return hit;
      })) {
        patternCollections += 1;
        report.collections += 1;
        prize = getCollectionPrize();
        report.total.collectionCoin += prize;
        spinTotal += prize;
        if (patternCollections === config.collections.trigger) {
          freeGamesAwarded += FREE_GAMES_AWARDED;
          report.freeGameTriggers += 1;
        }
        setPattern();
      }
    }

    var cascadeResult = Object.create(null);
    cascadeResult.cascades = 0;
    cascadeResult.total = 0;
    var cascadeMultiplier = 1;
    //let canCascade = (result.scattersTotal + result.total) > 0;
    var canCascade = false;
    while (canCascade) {
      processCascade();
      var x = 0;
      for (var i = 0; i < REELS; i += 1) {
        for (var j = 0; j < ROWS; j += 1) {
          valueView[x] = values[reelView[x]];
          x += 1;
        }
      }
      var newResult = evaluateReelView();
      cascadeResult.cascades += 1;
      cascadeResult.total += (newResult.scattersTotal + newResult.total) * cascadeMultiplier;
      if (cascadeMultiplier < 6) {
        cascadeMultiplier += 1;
      }
      canCascade = newResult.scattersTotal + newResult.total > 0;

      if (newResult.scattersTotal > 0) {
        // free game trigger
        freeGamesAwarded += FREE_GAMES_AWARDED;
        report.freeGameTriggers += 1;
      }
    }

    spinTotal += cascadeResult.total;

    return { spinTotal: spinTotal, freeGamesAwarded: freeGamesAwarded, prize: prize };
  };

  var setPattern = function setPattern() {
    pattern = config.collections.patterns[Math.floor(rng() * config.collections.patterns.length)];
    patternHits = new Array(REELS).fill(false);
  };

  var runRandomTest = function runRandomTest(spins, allowFree) {
    var ALLOW_FREE_GAMES = allowFree;
    init();
    report.total = {};
    report.total.coin = 0;
    report.total.count = 0;
    report.total.cascadeCoin = 0;
    report.total.freeCoin = 0;
    report.total.collectionCoin = 0;
    report.baseWins = {};
    report.freeGameTriggers = 0;
    report.progress = {};
    report.progress.currentStep = 0;
    report.progress.totalSteps = spins / 1000000;
    report.collections = 0;
    console.time(config.name);
    console.log(config.name);
    setPattern();
    for (var spin = 1; spin <= spins; spin += 1) {
      reels = reelsBase;
      reelLengths = reelLengthsBase;
      ROWS = config.rows['reels'];
      var baseResult = doSpin(true);

      report.total.count += 1;

      var freeGamesRemaining = baseResult.freeGamesAwarded;
      var spinTotal = baseResult.spinTotal;

      if (ALLOW_FREE_GAMES) {
        if (freeGamesRemaining > 0) {
          reels = reelsFree;
          reelLengths = reelLengthsFree;
          ROWS = config.rows['freeReels'];

          while (freeGamesRemaining > 0) {
            freeGamesRemaining -= 1;
            var freeResult = doSpin(false);
            spinTotal += freeResult.spinTotal;
            report.total.freeCoin += freeResult.spinTotal;
          }

          patternCollections = 0;
        }
      }

      if (!report.baseWins[spinTotal]) {
        report.baseWins[spinTotal] = 0;
      }
      report.baseWins[spinTotal] += 1;
      report.total.coin += spinTotal;

      if (spin % 1000000 === 0) {
        report.progress.currentStep += 1;
        report.progress.currentRTP = (100 * report.total.coin / (report.total.count * PAYLINES)).toFixed(3);
        report.updater({ progress: report.progress });
      }
    }
    report.total.bet = spins * PAYLINES;
    report.total.rtp = (report.total.coin / report.total.bet).toFixed(5);
    console.timeEnd(config.name);
  };

  var runFeature = function runFeature() {
    init();
    report.total = {};
    report.total.coin = 0;
    report.total.count = 0;
    report.total.cascadeCoin = 0;
    report.total.freeCoin = 0;
    report.total.collectionCoin = 0;
    report.freeGameTriggers = 0;
    report.collections = 0;
    report.collect = [];
    setPattern();
    var spin = 0;
    var canSpin = true;
    while (canSpin) {
      reels = reelsBase;
      reelLengths = reelLengthsBase;
      ROWS = config.rows['reels'];
      var baseResult = doSpin(true);

      report.total.count += 1;
      spin += 1;

      var freeGamesRemaining = baseResult.freeGamesAwarded;
      var spinTotal = baseResult.spinTotal;
      if (baseResult.prize > 0) {
        report.collect.push({
          spins: spin,
          prize: baseResult.prize,
          coinIn: report.total.count * PAYLINES,
          coinOut: report.total.coin + baseResult.spinTotal
        });
        spin = 0;
      }

      if (freeGamesRemaining > 0) {
        reels = reelsFree;
        reelLengths = reelLengthsFree;
        ROWS = config.rows['freeReels'];

        while (freeGamesRemaining > 0) {
          freeGamesRemaining -= 1;
          var freeResult = doSpin(false);
          spinTotal += freeResult.spinTotal;
          report.total.freeCoin += freeResult.spinTotal;
        }

        patternCollections = 0;
        canSpin = false;
      }

      report.total.coin += spinTotal;
    }
    report.total.bet = report.total.count * PAYLINES;
    report.total.rtp = (report.total.coin / report.total.bet).toFixed(5);
  };

  return {
    doWork: runRandomTest,
    doFeature: runFeature
  };
};

try {
  self.onmessage = function (event) {
    report.updater = function (data) {
      postMessage(JSON.stringify(data));
    };
    config = event.data.config;
    var s = server();
    if (event.data.feature) {
      s.doFeature();
    } else {
      s.doWork(event.data.trials, event.data.allowFree);
    }
    delete report.updater;
    postMessage(JSON.stringify(report));
  };
} catch (error) {
  console.log('NODE start worker');
  report.updater = function (data) {
    console.log('NODE', data);
  };
  var g = require('../config/config.js');
  config = g.gameCutters.config;
  var s = server();
  if (process.argv.length === 4) {
    var trials = parseInt(process.argv[2], 10);
    var allowFree = process.argv[3] === 'true';
    s.doWork(trials, allowFree);
  } else {
    s.doFeature();
  }
  delete report.updater;
  console.log(report);
  console.log('NODE end worker');
}
}).call(this,require('_process'))
},{"../config/config.js":3,"_process":2,"seedrandom":5}],5:[function(require,module,exports){
// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = require('./lib/alea');

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./lib/xor128');

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./lib/xorwow');

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./lib/xorshift7');

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./lib/xor4096');

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = require('./lib/tychei');

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = require('./seedrandom');

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;

},{"./lib/alea":6,"./lib/tychei":7,"./lib/xor128":8,"./lib/xor4096":9,"./lib/xorshift7":10,"./lib/xorwow":11,"./seedrandom":12}],6:[function(require,module,exports){
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],7:[function(require,module,exports){
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],8:[function(require,module,exports){
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],9:[function(require,module,exports){
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);

},{}],10:[function(require,module,exports){
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


},{}],11:[function(require,module,exports){
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],12:[function(require,module,exports){
/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

// Detect the global object, even if operating in strict mode.
// http://stackoverflow.com/a/14387057/265298
var global = (0, eval)('this'),
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
} else {
  // When included as a plain script, set up Math.seedrandom global.
  math['seed' + rngname] = seedrandom;
}


// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

},{"crypto":1}]},{},[4]);
