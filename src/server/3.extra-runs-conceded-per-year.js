const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateExtraRunsConcededIn2016() {
  let start, end;
  let matches = [];

  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
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

      fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'))
        .pipe(csv({}))
        .on('data', function (data) {
          if (data.match_id >= start && data.match_id <= end) {
            seasonal.push(data);
          }
        })
        .on('end', () => {
          let extras = seasonal.reduce((extraRuns, runs) => {
            if (extraRuns[runs.bowling_team] !== undefined) {
              extraRuns[runs.bowling_team] += Number(runs.extra_runs);
            } else {
              extraRuns[runs.bowling_team] = Number(runs.extra_runs);
            }
            return extraRuns;
          }, {});

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
