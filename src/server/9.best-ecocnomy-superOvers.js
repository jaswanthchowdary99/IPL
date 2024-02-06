const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function findBestEconomyInSuperOvers(matches) {
  const economySuperOver = {};
  
  for (const match of matches) {
    const bowler = match.bowler;
    const superOver = Number(match.is_super_over);
    const totalRuns = Number(match.total_runs);
    const legByRuns = Number(match.legbye_runs);
    const byRuns = Number(match.bye_runs);
    const extraRuns = Number(match.extra_runs);

    if (superOver !== 0) {
      if (!economySuperOver[bowler]) {
        economySuperOver[bowler] = { runs: 0, balls: 0 };
      }

      economySuperOver[bowler].runs += totalRuns - legByRuns - byRuns - extraRuns;
      economySuperOver[bowler].balls++;
    }
  }

  const economyRate = [];
  for (const bowlerName in economySuperOver) {
    const { runs, balls } = economySuperOver[bowlerName];
    economyRate.push({ bowler: bowlerName, superOverEconomy: (runs / balls) * 6 });
  }

  const topBowlers = economyRate.sort((a, b) => a.superOverEconomy - b.superOverEconomy).slice(0, 1);
  return topBowlers;
}

function writeResultToFile(result, outputFileName) {
  fs.writeFileSync(path.join(__dirname, outputFileName), JSON.stringify(result, null, 2));
}

function main() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/deliveries.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      const bestEconomyInSuperOvers = findBestEconomyInSuperOvers(matches);
      writeResultToFile(bestEconomyInSuperOvers, "../public/output/9.best-economy-superOver.json");
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

main();
