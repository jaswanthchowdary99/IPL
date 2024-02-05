


function findMostPOTMAwardsPerSeason(matches){

  let match ={};
  for(let index of matches){
    let season = index.season;
    let playerOfMatch = index.player_of_match;
    if(match[season] == undefined){
        match[season] = {};
    }
    if(match[season][playerOfMatch] == undefined){
        match[season][playerOfMatch] = 1
    }
    else{
        match[season][playerOfMatch]++;
    }
  }
  let highestPlayers = [];

  for (let season in match) {
      let maxAwards = 0;
      let playerOfMatch = null;
  
      for (let player in match[season]) {
          if (match[season][player] > maxAwards) {
              maxAwards = match[season][player];
              playerOfMatch = player;
          }
      }
  
      highestPlayers.push(season,playerOfMatch );
  }

  return highestPlayers;
}



 module.exports = {findMostPOTMAwardsPerSeason};

  