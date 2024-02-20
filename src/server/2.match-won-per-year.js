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
      let matchWonPerYear = {};
      
      for (const data of matches) {
        const season = data.season;
        const winner = data.winner;

        if (!matchWonPerYear[season]) {
          matchWonPerYear[season] = {};
        }

        if (!matchWonPerYear[season][winner]) {
          matchWonPerYear[season][winner] = 1;
        } else {
          matchWonPerYear[season][winner]++;
        }
      }

      writeResultToFile(matchWonPerYear, "../public/output/2.matches-won-per-year.json");
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

function writeResultToFile(result, outputFileName) {
  fs.writeFileSync(path.join(__dirname, outputFileName), JSON.stringify(result, null, 2));
}

calculateMatchesWonPerTeamPerYear();

module.exports = {calculateMatchesWonPerTeamPerYear}