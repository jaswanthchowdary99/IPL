const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateHighestBatsmanStrikeRate(matches, deliveries) {
  const batsmanStrike = matches.reduce((acc, match) => {
    if (acc[match.season] === undefined) {
      acc[match.season] = {};
    }

    deliveries.forEach((delivery) => {
      if (acc[match.season][delivery.batsman] === undefined) {
        acc[match.season][delivery.batsman] = { runs: 0, balls: 0 };
      } else {
        acc[match.season][delivery.batsman].runs += Number(delivery.batsman_runs);
        acc[match.season][delivery.batsman].balls++;
      }
    });

    return acc;
  }, {});

  let strikeRate = Object.entries(batsmanStrike).reduce((acc, [season, batsman]) => {
    return acc.concat(
      Object.entries(batsman).map(([batsmanName, { runs, balls }]) => {
        return { season, batsman: batsmanName, strikeRate: (runs / balls) * 100 };
      })
    );
  }, []);

  return strikeRate;
}

function writeResultToFile(result, outputFileName) {
  fs.writeFileSync(path.join(__dirname, outputFileName), JSON.stringify(result, null, 2));
}

function main() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      let deliveries = [];
      fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'))
        .pipe(csv({}))
        .on('data', (data) => deliveries.push(data))
        .on('end', () => {
          const highestBatsmanStrikeRate = calculateHighestBatsmanStrikeRate(matches, deliveries);
          writeResultToFile(highestBatsmanStrikeRate, "../public/output/7.strike-rate.json");
        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

main();
