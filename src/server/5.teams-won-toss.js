const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findTeamsTossAndMatchWins() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      let teamsWonTossAndMatch = {};

      for (const info of matches) {
        const tossWinner = info.toss_winner;
        const matchWinner = info.winner;

        if (tossWinner == matchWinner) {
          if (teamsWonTossAndMatch[tossWinner] === undefined) {
            teamsWonTossAndMatch[tossWinner] = 1;
          } else {
            teamsWonTossAndMatch[tossWinner]++;
          }
        }
      }

      fs.writeFileSync(path.join(__dirname, "../public/output/5.teams-won-toss.json"), JSON.stringify(teamsWonTossAndMatch, null, 2));
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

findTeamsTossAndMatchWins();
