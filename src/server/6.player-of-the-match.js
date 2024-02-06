

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
  
  module.exports = { findMostPOTMAwardsPerSeason };
  

  