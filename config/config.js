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
