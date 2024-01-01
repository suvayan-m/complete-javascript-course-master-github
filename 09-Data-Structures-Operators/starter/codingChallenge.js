// #1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// coding challenge #4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const changeText = function (texts) {
  texts = document.querySelector('textarea').value;
  const rows = texts.split('\n');
  // texts.toLowerCase().trim().split('_');
  // console.log(rows);
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    // console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
};
document.querySelector('button').addEventListener('click', changeText);

//
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure
// CODING CHALLENGE #3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

// console.log(gameEvents.keys());

// const eventsArr = gameEvents.values();
// console.log(eventsArr);

// const events = [...new Set(gameEvents.values())];

// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// const time = [...gameEvents.keys()].pop();
// console.log(time);

// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// for (const [keys, values] of gameEvents) {
//   console.log(
//     keys <= 45
//       ? `[FIRST HALF] ${keys}: ${values}`
//       : `[SECOND HALF] ${keys}: ${values}`
//   );
// }
// START OF ME WRITING CODES

// // coding challenge #2
// // ques 1
// for ([x, y] of Object.entries(game.scored)) {
//   console.log(`Goal ${Number(x) + 1}: ${y}`);
// }

// for (const [x, y] of game.scored.entries()) {
//   console.log(`Goal ${x + 1}: ${y}`);
// }

// // ques 2

// const odds = Object.values(game.odds);
// let avg = 0;
// for (const odd of odds) avg += odd;
// avg /= odds.length;
// console.log(avg);

// // ques 3

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   // console.log(team, odd);
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }

// for ques 4

// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  // console.log(player);
  // console.log(scorers[player]);
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

// // for coding challenge #1
// // FOR QUES 1

// const [players1, players2] = game.players;
// console.log(players1, players2);

// // FOR QUES 2

// const [gk, ...fieldPlayers] = players1;
// console.log(gk);
// console.log(fieldPlayers);

// // FOR QUES 3

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // FOR QUES 4

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // FOR QUES 5

// // const { team1, x: draw, team2 } = { ...game.odds };
// // const { team1, x: draw, team2 } = game.odds;
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1);
// console.log(draw);
// console.log(team2);

// // FOR QUES 6

// const printGoals = function (...players) {
//   // for (let index = 0; index < players.length; index++) {
//   //   console.log(players[index]);
//   // }
//   console.log(...players);
//   console.log(`${players.length} no. of goals were scored...`);
// };

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// // FOR QUES 7

// team1 < team2 && console.log(`Team 1 is more likely to win..`);
// team1 > team2 && console.log(`Team 2 is more likely to win..`);
