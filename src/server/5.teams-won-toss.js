

function findTeamsTossAndMatchWins(matches){
  return matches.reduce((tossAndMatchWins,match)=>{
    const tossWon = match.toss_winner;
    const matchWon = match.winner;
    if(tossWon == matchWon){
      tossAndMatchWins[matchWon] = (tossAndMatchWins[matchWon] || 0) + 1; 
    }
    return tossAndMatchWins;
  },{});

}


module.exports = {findTeamsTossAndMatchWins};