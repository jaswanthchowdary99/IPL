const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateTopEconomicalBowlersIn2015() {
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
          let bowlerDetails = {};
          
          for (const match of matches) {
            if (match.season === '2015') {
              for (const runs of deliveries) {
                if (match.id === runs.match_id) {
                  if (bowlerDetails[runs.bowler] === undefined) {
                    bowlerDetails[runs.bowler] = { runs1: 0, balls: 0 };
                  } else {
                    bowlerDetails[runs.bowler].runs1 += Number(runs.total_runs);
                    bowlerDetails[runs.bowler].balls++;
                  }
                }
              }
            }
          }

          let economicalBowlerDetails = [];
          for (const bowlerName in bowlerDetails) {
            const { runs1, balls } = bowlerDetails[bowlerName];
            const economy = (runs1 / balls) * 6;
            economicalBowlerDetails.push({ bowlerName, economy });
          }

          let sortedBowler = economicalBowlerDetails.sort((a, b) => a.economy - b.economy);
          let topTenBowlers = sortedBowler.slice(1, 11);
          
          fs.writeFileSync(path.join(__dirname, "../public/output/4.top10-economical-bowler.json"), JSON.stringify(topTenBowlers, null, 2));
        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

calculateTopEconomicalBowlersIn2015();
