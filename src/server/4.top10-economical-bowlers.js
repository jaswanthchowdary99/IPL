function calculateTopEconomicalBowlersIn2015(matches, deliveries) {
  let bowlerDetails = deliveries.reduce((acc, runs) => {
    const match = matches.filter(index => index.id == runs.match_id && index.season == '2015');

    if (match.length > 0) {
      if (acc[runs.bowler] == undefined) {
        acc[runs.bowler] = { runs1: 0, balls: 0 };
      } else {
        acc[runs.bowler].runs1 += Number(runs.total_runs);
        acc[runs.bowler].balls++;
      }
    }

    return acc;
  }, {});

  let economicalBowlerDetails = Object.entries(bowlerDetails).map(([bowlerName, { runs1, balls }]) => {
    const economy = (runs1 / balls) * 6;
    return { bowlerName, economy };
  });

  let sortedBowler = economicalBowlerDetails.sort((a, b) => a.economy - b.economy);
  let topTenBowlers = sortedBowler.slice(1, 11);
  return topTenBowlers;
}

module.exports = { calculateTopEconomicalBowlersIn2015 };
