const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findMostPOTMAwardsPerSeason() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      let match = {};
      
      for (const index of matches) {
        const season = index.season;
        const playerOfMatch = index.player_of_match;

        if (match[season] === undefined) {
          match[season] = {};
        }

        if (match[season][playerOfMatch] === undefined) {
          match[season][playerOfMatch] = 1;
        } else {
          match[season][playerOfMatch]++;
        }
      }

      let highestPlayers = [];

      for (const season in match) {
        let maxAwards = 0;
        let playerOfMatch = null;

        for (const player in match[season]) {
          if (match[season][player] > maxAwards) {
            maxAwards = match[season][player];
            playerOfMatch = player;
          }
        }

        highestPlayers.push({ season, playerOfMatch });
      }

      fs.writeFileSync(path.join(__dirname, "../public/output/6.player-of-the-match.json"), JSON.stringify(highestPlayers, null, 2));
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

findMostPOTMAwardsPerSeason();
