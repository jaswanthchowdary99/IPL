const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findMostDismissedBowler() {
  let deliveries = [];
  
  fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'))
    .pipe(csv({}))
    .on('data', (data) => deliveries.push(data))
    .on('end', () => {
      let dismissed = {};

      for (const delivery of deliveries) {
        const batsman = delivery.player_dismissed;
        const bowler = delivery.bowler;

        if (batsman.trim() === '') {
          continue;
        }

        if (dismissed[batsman]) {
          if (dismissed[batsman][bowler]) {
            dismissed[batsman][bowler] += 1;
          } else {
            dismissed[batsman][bowler] = 1;
          }
        } else {
          dismissed[batsman] = { [bowler]: 1 };
        }
      }

      let playerDismissedByAnotherPlayer = {
        player_dismissed: null,
        bowler_name: null,
        count: 0,
      };

      for (const batsmanname in dismissed) {
        const bowlers = dismissed[batsmanname];
        for (const bowlerName in bowlers) {
          const outCount = bowlers[bowlerName];

          if (outCount > playerDismissedByAnotherPlayer.count) {
            playerDismissedByAnotherPlayer = {
              player_dismissed: batsmanname,
              bowler_name: bowlerName,
              count: outCount,
            };
          }
        }
      }

      fs.writeFileSync(path.join(__dirname, "../public/output/8.dissmissed-by-another-player.json"), JSON.stringify(playerDismissedByAnotherPlayer, null, 2));
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

findMostDismissedBowler();
