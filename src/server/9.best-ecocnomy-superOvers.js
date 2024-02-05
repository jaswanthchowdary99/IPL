

function findBestEconomyInSuperOvers(matches){
 const economyRates ={};
 for(let index of matches){
    const bowlers = index.bowler;
    const superOver = Number(index.is_super_over);
    const totalRuns = Number(index.total_runs);
    const legByRuns =Number(index.legbye_runs);
    const  byRuns = Number(index.bye_runs);
    const extraRuns = Number(index.extra_runs);
     if(superOver != 0){

        if(economyRates[bowlers] == undefined){
         economyRates[bowlers] = {runs : 0,balls :0};
        }
        else{
            economyRates[bowlers].runs += totalRuns-legByRuns-byRuns-extraRuns;
            economyRates[bowlers].balls++;
        }
     }
 }
  let economyRate = [];
  for( let bowler1 in economyRates){
    const {runs ,balls} = economyRates[bowler1];
    let economy = (runs / balls) * 6;
    economyRate.push({bowler1,economy});
  }
  let sortedBowlers = economyRate.sort((a,b) => a.economy - b.economy);
  let topBowlers = sortedBowlers.slice(0,1);

  return topBowlers ;
}

module.exports = {findBestEconomyInSuperOvers};