const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateTopEconomicalBowlersIn2015(matches, deliveries) {
  let bowlerDetails = deliveries.reduce((acc, runs) => {
    const match = matches.filter((index) => index.id == runs.match_id && index.season == '2015');

    if (match.length > 0) {
      if (acc[runs.bowler] == undefined) {
        acc[runs.bowler] = { runs1: 0, balls: 0 };
      } else {
        acc[runs.bowler].runs1 += Number(runs.total_runs);
        acc[runs.bowler].balls++;
      }
    }

    return acc;
  }, {});

  let economicalBowlerDetails = Object.entries(bowlerDetails).map(([bowlerName, { runs1, balls }]) => {
    const economy = (runs1 / balls) * 6;
    return { bowlerName, economy };
  });

  let sortedBowler = economicalBowlerDetails.sort((a, b) => a.economy - b.economy);
  let topTenBowlers = sortedBowler.slice(1, 11);
  return topTenBowlers;
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
          const topBowlers2015 = calculateTopEconomicalBowlersIn2015(matches, deliveries);
          writeResultToFile(topBowlers2015, "../public/output/4.top10-economical-bowler.json");
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
