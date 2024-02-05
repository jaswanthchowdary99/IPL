

function calculateTopEconomicalBowlersIn2015(matches,deliveries){
  let bowlersDetails ={};
  for (let data of matches) {
    for(let runs of deliveries){
      if (data.season === '2015' && data.id === runs.match_id) {

        if (bowlersDetails[runs.bowler] === undefined) {
          bowlersDetails[runs.bowler] = { runs1: 0, balls: 0 };

        } else {
          bowlersDetails[runs.bowler].runs1 += Number(runs.total_runs);
          bowlersDetails[runs.bowler].balls++;
        }
      }
    }
  }
  let economicalBowlers = []
  for(let bowlerName in bowlersDetails){
    const {runs1 , balls} = bowlersDetails[bowlerName];
    const economicRate = (runs1 / balls) * 6;
    economicalBowlers.push({bowlerName, economicRate});
  }
  let sortedBowlers = economicalBowlers.sort((a,b) => a.economicRate - b.economicRate);
  let topTenBowlers = sortedBowlers.slice(1,11);
return topTenBowlers;

}
 

module.exports = {calculateTopEconomicalBowlersIn2015};