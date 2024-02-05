

function calculateExtraRunsConcededIn2016 (matches,deliveries){
  let extraRuns = {};
  for (let data of matches) {
    for(let runs of deliveries){
      if (data.season == '2016' && data.id == runs.match_id) {
        if (extraRuns[runs.bowling_team] === undefined) {
          extraRuns[runs.bowling_team] = 0;
        } else {
          extraRuns[runs.bowling_team] += Number(runs.extra_runs);
        }
      }
    }    }
 
  return extraRuns;
}

   
module.exports = {calculateExtraRunsConcededIn2016};   
   