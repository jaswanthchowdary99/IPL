const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateExtraRunsConcededIn2016() {
  let start, end;
  let matches = [];

  const matchesReadStream = fs.createReadStream(path.join(__dirname, '../Data/matches.csv'));
  matchesReadStream.pipe(csv({}))
    .on('data', function (datarowMatches) {
      if (datarowMatches.season === '2016') {
        if (!start) {
          start = +datarowMatches.id;
        } else {
          end = +datarowMatches.id;
        }
      }
    })
    .on('end', () => {
      let seasonal = [];

      const deliveriesReadStream = fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'));
      deliveriesReadStream.pipe(csv({}))
        .on('data', function (data) {
          if (data.match_id >= start && data.match_id <= end) {
            seasonal.push(data);
          }
        })
        .on('end', () => {
          let extras = {};

          for (const runs of seasonal) {
            if (extras[runs.bowling_team] !== undefined) {
              extras[runs.bowling_team] += Number(runs.extra_runs);
            } else {
              extras[runs.bowling_team] = Number(runs.extra_runs);
            }
          }

          fs.writeFileSync(path.join(__dirname, "../public/output/3.extra-runs-conceded-per-year.json"), JSON.stringify(extras, null, 2));
        })
        .on('error', (error) => {
          console.error('Error:', error);
        });
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

calculateExtraRunsConcededIn2016();
module.exports = {calculateExtraRunsConcededIn2016}