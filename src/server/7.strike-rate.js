const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateHighestBatsmanStrikeRate() {
  let matches = [];
  let deliveries = [];
  
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'))
        .pipe(csv({}))
        .on('data', (data) => deliveries.push(data))
        .on('end', () => {
          let batsmanStrike = {};

          for (const match of matches) {
            const season = match.season;

            if (batsmanStrike[season] === undefined) {
              batsmanStrike[season] = {};
            }

            for (const delivery of deliveries) {
              const batsman = delivery.batsman;

              if (batsmanStrike[season][batsman] === undefined) {
                batsmanStrike[season][batsman] = { runs1: 0, balls: 0 };
              } else {
                batsmanStrike[season][batsman].runs1 += Number(delivery.batsman_runs);
                batsmanStrike[season][batsman].balls++;
              }
            }
          }

          let strikeRate = [];

          for (const season1 in batsmanStrike) {
            for (const batsman1 in batsmanStrike[season1]) {
              const { runs1, balls } = batsmanStrike[season1][batsman1];
              const strikeRate1 = (runs1 / balls) * 100;
              strikeRate.push({ season: season1, batsman: batsman1, strikeRate: strikeRate1 });
            }
          }

          fs.writeFileSync(path.join(__dirname, "../public/output/7.strike-rate.json"), JSON.stringify(strikeRate, null, 2));
        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

calculateHighestBatsmanStrikeRate();
module.exports = {calculateHighestBatsmanStrikeRate}