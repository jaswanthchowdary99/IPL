

function findTeamsTossAndMatchWins(matches){
  const teamsWonTossAndMatch = {};

    for (let info of matches) {
      let tossWinner = info.toss_winner;
      let matchWinner = info.winner;
      if(tossWinner == matchWinner){
        if(teamsWonTossAndMatch[tossWinner] == undefined){
          teamsWonTossAndMatch[tossWinner] = 1
        }
        else{
          teamsWonTossAndMatch[tossWinner] = teamsWonTossAndMatch[tossWinner] + 1
        }
      }
    }
    return teamsWonTossAndMatch;
}


module.exports = {findTeamsTossAndMatchWins};