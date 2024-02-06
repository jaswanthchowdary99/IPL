function findBestEconomyInSuperOvers(matches) {
  const economySuperOver = matches.reduce((acc, match) => {
    const bowler = match.bowler;
    const superOver = Number(match.is_super_over);
    const totalRuns = Number(match.total_runs);
    const legByRuns = Number(match.legbye_runs);
    const byRuns = Number(match.bye_runs);
    const extraRuns = Number(match.extra_runs);

    if (superOver !== 0) {
      acc[bowler] = acc[bowler] || { runs: 0, balls: 0 };
      acc[bowler].runs += totalRuns - legByRuns - byRuns - extraRuns;
      acc[bowler].balls++;
    }

    return acc;
  }, {});

  let economyRate = Object.entries(economySuperOver).map(([bowler, { runs, balls }]) => {
    return { bowler, superOverEconomy: (runs / balls) * 6 };
  });

  let topBowlers = economyRate.sort((a, b) => a.superOverEconomy - b.superOverEconomy).slice(0, 1);
  return topBowlers;
}

module.exports = { findBestEconomyInSuperOvers };
