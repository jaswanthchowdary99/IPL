

function calculateMatchesWonPerTeamPerYear(matches){
  let matchWonPerYear={}
  for(let data of matches){
      if(!matchWonPerYear[data.season]){
          matchWonPerYear[data.season]={}
      }if(!matchWonPerYear[data.season][data.winner]){
          matchWonPerYear[data.season][data.winner]=1
      }else{
          matchWonPerYear[data.season][data.winner]++;
      }
  
      }
      return matchWonPerYear;
}

 
module.exports = {calculateMatchesWonPerTeamPerYear};