

const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findTeamsTossAndMatchWins(matches) {
  return matches.reduce((tossAndMatchWins, match) => {
    const tossWon = match.toss_winner;
    const matchWon = match.winner;
    if (tossWon == matchWon) {
      tossAndMatchWins[matchWon] = (tossAndMatchWins[matchWon] || 0) + 1;
    }
    return tossAndMatchWins;
  }, {});
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
      const teamsTossAndMatchWins = findTeamsTossAndMatchWins(matches);
      writeResultToFile(teamsTossAndMatchWins, "../public/output/5.teams-won-toss.json");
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

main();


module.exports = {findTeamsTossAndMatchWins};