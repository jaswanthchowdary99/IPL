const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function calculateMatchesWonPerTeamPerYear() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      const result = matches.reduce((acc, match) => {
        const { season, winner } = match;
        if (acc[season] == undefined) {
          acc[season] = {};
        }
        if (acc[season][winner] == undefined) {
          acc[season][winner] = 1;
        } else {
          acc[season][winner]++;
        }
        return acc;
      }, {});

      fs.writeFileSync(path.join(__dirname, "../public/output/2.match-won-per-year.json"), JSON.stringify(result, null, 2));
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

calculateMatchesWonPerTeamPerYear();





 