const fs = require('fs');
const csv = require('csvtojson');

// Import core logic functions for each problem
const problem1 = require('/home/jaswanth-chowdary/ipl/src/server/1.match-per-year.js');
const problem2 = require('/home/jaswanth-chowdary/ipl/src/server/2.match-won-per-year.js');
const problem3 = require('/home/jaswanth-chowdary/ipl/src/server/3.extra-runs-conceded-per-year.js');
const problem4 = require('/home/jaswanth-chowdary/ipl/src/server/4.top10-economical-bowlers.js');
const problem5 = require('/home/jaswanth-chowdary/ipl/src/server/5.teams-won-toss.js');
const problem6 = require('/home/jaswanth-chowdary/ipl/src/server/6.player-of-the-match.js');
const problem7 = require('/home/jaswanth-chowdary/ipl/src/server/7.strike-rate.js');
const problem8 = require('/home/jaswanth-chowdary/ipl/src/server/8.dissmissed-by-another-player.js');
const problem9 = require('/home/jaswanth-chowdary/ipl/src/server/9.best-ecocnomy-superOvers.js');
function main() {
	// Define file paths for data
	const matchesDataPath = 'src/Data/matches.csv';
	const deliveriesDatapath = 'src/Data/deliveries.csv';
	// Define an array of problem numbers to execute
	const problemsToExecute = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	problemsToExecute.forEach((problemNumber) => {
		const outputFilePath = `/home/jaswanth-chowdary/ipl/src/public/output${problemNumber}.json`;

		if (problemNumber === 1) {
			const matchesData = csv().fromFile(matchesDataPath);

			matchesData.then((data) => {
				const result = problem1.matchesPerYear(data)
				writeResultToFile(outputFilePath, result);
			});
		} else if (problemNumber === 2) {
			const matchesData = csv().fromFile(matchesDataPath);

			Promise.all([matchesData]).then(([matches]) => {
				const result = problem2.calculateMatchesWonPerTeamPerYear(matches);
				writeResultToFile(outputFilePath, result);
			});
		} else if (problemNumber === 3) {
			const matchesData = csv().fromFile(matchesDataPath);
			const deliveriesData = csv().fromFile(deliveriesDatapath);

			Promise.all([matchesData, deliveriesData]).then(
				([matches, deliveries]) => {
					const result = problem3.calculateExtraRunsConcededIn2016(
						matches,
						deliveries,
					);
					writeResultToFile(outputFilePath, result);
				},
			);
		} else if (problemNumber === 4) {
			const matchesData = csv().fromFile(matchesDataPath);
			const deliveriesData = csv().fromFile(deliveriesDatapath);

			Promise.all([matchesData, deliveriesData]).then(
				([matches, deliveries]) => {
					const result = problem4.calculateTopEconomicalBowlersIn2015(
						matches,
						deliveries,
					);
					writeResultToFile(outputFilePath, result);
				},
			);
		} else if (problemNumber === 5) {
			const matchesData = csv().fromFile(matchesDataPath);
			Promise.all([matchesData]).then(([matches]) => {
				const result = problem5.findTeamsTossAndMatchWins(matches);
				writeResultToFile(outputFilePath, result);
			});
		} else if (problemNumber === 6) {
			const matchesData = csv().fromFile(matchesDataPath);
			Promise.all([matchesData]).then(([matches]) => {
				const result = problem6.findMostPOTMAwardsPerSeason(matches);
				writeResultToFile(outputFilePath, result);
			});
		} else if (problemNumber === 7) {
			const matchesData = csv().fromFile(matchesDataPath);
			const deliveriesData = csv().fromFile(deliveriesDatapath);

			Promise.all([matchesData, deliveriesData]).then(
				([matches, deliveries]) => {
					const result = problem7.calculateHighestBatsmanStrikeRate(
						matches,
						deliveries,
					);
					writeResultToFile(outputFilePath, result);
				},
			);
		} else if (problemNumber === 8) {
			const deliveriesData = csv().fromFile(deliveriesDatapath);

			Promise.all([deliveriesData]).then(([deliveries]) => {
				const result = problem8.findMostDismissedBowler(deliveries);
				writeResultToFile(outputFilePath, result);
			});
		} else if (problemNumber === 9) {
			const deliveriesData = csv().fromFile(deliveriesDatapath);

			Promise.all([deliveriesData]).then(([deliveries]) => {
				const result = problem9.findBestEconomyInSuperOvers(deliveries);
				writeResultToFile(outputFilePath, result);
			});
		}
	});
}

function writeResultToFile(outputFilePath, result) {
	fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
	console.log(`Problem result written to ${outputFilePath}`);
}

main();