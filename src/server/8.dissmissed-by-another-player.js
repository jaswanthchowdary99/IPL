

function findMostDismissedBowler(deliveries) {
  const dismissed = {};

  for (let index of deliveries) {
    let batsman = index.player_dismissed;
    let bowler = index.bowler;

    if (batsman.trim() == '') {
      continue;
    }

    if (dismissed[batsman]) {
      if (dismissed[batsman][bowler]) {
        dismissed[batsman][bowler] += 1;
      } else {
        dismissed[batsman][bowler] = 1;
      }
    } else {
      dismissed[batsman] = { [bowler]: 1 };
    }
  }

  let playerDismissedByAnotherPlayer = {
    player_dismissed: null,
    bowler_name: null,
    count: 0,
  };

  for (const batsmanname in dismissed) {
    const bowlers = dismissed[batsmanname];
    for (const bowlerName in bowlers) {
      const outCount = bowlers[bowlerName];

      if (outCount > playerDismissedByAnotherPlayer.count) {
        playerDismissedByAnotherPlayer = {
          player_dismissed: batsmanname,
          bowler_name: bowlerName,
          count: outCount,
        };
      }
    }
  }

  return playerDismissedByAnotherPlayer;
}


module.exports = {findMostDismissedBowler};