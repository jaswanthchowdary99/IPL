function findMostDismissedBowler(deliveries) {
  const dismissed = deliveries.reduce((acc, runs) => {
    const batsman = runs.player_dismissed;
    const bowler = runs.bowler;

    if (batsman.trim() === '') {
      return acc;
    }

    acc[batsman] = acc[batsman] || {};
    acc[batsman][bowler] = (acc[batsman][bowler] || 0) + 1;
    return acc;
  }, {});

  const playerDismissed = Object.entries(dismissed).reduce(
    (result, [batsman, bowlers]) => {
      Object.entries(bowlers).forEach(([bowlerName, outCount]) => {
        if (outCount > result.count) {
          result = {
            player_dismissed: batsman,
            bowler_name: bowlerName,
            count: outCount,
          };
        }
      });
      return result;
    },
    { player_dismissed: null, bowler_name: null, count: 0 }
  );

  return playerDismissed;
}

module.exports = { findMostDismissedBowler };
