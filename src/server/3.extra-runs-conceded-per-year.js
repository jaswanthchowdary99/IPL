

function calculateExtraRunsConcededIn2016 (matches,deliveries){
  return deliveries.reduce((extraRuns,runs) => {
    const matchingData = matches.find(match => match.id == runs.match_id && match.season =='2016');
    if(matchingData){
      extraRuns[runs.bowling_team] = (extraRuns[runs.bowling_team] || 0) + Number(runs.extra_runs);
    }
    return extraRuns;
  },{});
}

   
module.exports = {calculateExtraRunsConcededIn2016};   
   