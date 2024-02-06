const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findMostDismissedBowler(deliveries) {
  const dismissed = deliveries.reduce((acc, runs) => {
    const batsman = runs.player_dismissed;
    const bowler = runs.bowler;

    if (batsman.trim() === '') {
      return acc;
    }

    acc[batsman] = acc[batsman] || {};
    acc[batsman][bowler] = (acc[batsman][bowler] || 0) + 1;
    return acc;
  }, {});

  const playerDismissed = Object.entries(dismissed).reduce(
    (result, [batsman, bowlers]) => {
      Object.entries(bowlers).forEach(([bowlerName, outCount]) => {
        if (outCount > result.count) {
          result = {
            player_dismissed: batsman,
            bowler_name: bowlerName,
            count: outCount,
          };
        }
      });
      return result;
    },
    { player_dismissed: null, bowler_name: null, count: 0 }
  );

  return playerDismissed;
}

function writeResultToFile(result, outputFileName) {
  fs.writeFileSync(path.join(__dirname, outputFileName), JSON.stringify(result, null, 2));
}

function main() {
  let deliveries = [];
  fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'))
    .pipe(csv({}))
    .on('data', (data) => deliveries.push(data))
    .on('end', () => {
      const mostDismissedBowler = findMostDismissedBowler(deliveries);
      writeResultToFile(mostDismissedBowler, "../public/output/8.dissmissed-by-another-player.json");
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

main();
