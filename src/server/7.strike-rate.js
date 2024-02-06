function calculateHighestBatsmanStrikeRate(matches, deliveries) {
    const batsmanStrike = matches.reduce((acc, match) => {
      if (acc[match.season] === undefined) {
        acc[match.season] = {};
      }
  
      deliveries.forEach((delivery) => {
        if (acc[match.season][delivery.batsman] === undefined) {
          acc[match.season][delivery.batsman] = { runs: 0, balls: 0 };
        } else {
          acc[match.season][delivery.batsman].runs += Number(delivery.batsman_runs);
          acc[match.season][delivery.batsman].balls++;
        }
      });
  
      return acc;
    }, {});
  
    let strikeRate = Object.entries(batsmanStrike).reduce((acc, [season, batsman]) => {
      return acc.concat(
        Object.entries(batsman).map(([batsman, { runs, balls }]) => {
          return { season, batsman, strikeRate1 : (runs / balls) * 100};
        })
      );
    }, []);
  
    return strikeRate;
  }
  
  module.exports = { calculateHighestBatsmanStrikeRate };
  