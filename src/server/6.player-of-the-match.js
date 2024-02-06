const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findMostPOTMAwardsPerSeason(matches) {
  const result = matches.reduce((acc, match) => {
    const season = match.season;
    const playerOfMatch = match.player_of_match;

    acc[season] = acc[season] || {};
    acc[season][playerOfMatch] = (acc[season][playerOfMatch] || 0) + 1;

    return acc;
  }, {});

  const highestPlayers = Object.entries(result).reduce((players, [season, playersObj]) => {
    let maxAwards = 0;
    let playerOfMatch = null;

    Object.entries(playersObj).forEach(([player, awards]) => {
      if (awards > maxAwards) {
        maxAwards = awards;
        playerOfMatch = player;
      }
    });

    players.push({ season, playerOfMatch });
    return players;
  }, []);

  return highestPlayers;
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
      const mostPOTMAwardsPerSeason = findMostPOTMAwardsPerSeason(matches);
      writeResultToFile(mostPOTMAwardsPerSeason, "../public/output/6.player-of-the-match.json");
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

main();


  