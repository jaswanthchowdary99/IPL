
fetch('http://localhost:4000/1')
    .then((response) => response.json())
    .then((data) => {
        Highcharts.chart('matchesPerYear', {
            chart: {
                type: 'bar',
            },
            title: {
                text: 'IPL Matches Per Year',
            },
            xAxis: {
                categories: Object.keys(data),
                title: {
                    text: 'Year',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Matches Played',
                },
            },
            series: [
                {
                    name: 'Matches',
                    data: Object.values(data),
                },
            ],
        });
    })
    .catch((error) => {
        console.error('Error fetching Matches Per Year data:', error);
    });


fetch('http://localhost:4000/2')
    .then((response) => response.json())
    .then((data) => {
        const years = Object.keys(data);
        const teamNames = Object.keys(data[years[0]]);
        const seriesData = teamNames.map((team) => ({
            name: team,
            data: years.map((year) => data[year][team]),
        }));

        Highcharts.chart('calculateMatchesWonPerTeamPerYear', {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Matches Won Per Team Per Year',
            },
            xAxis: {
                categories: years,
                title: {
                    text: 'Year',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Matches Won',
                },
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                },
            },
            series: seriesData,
        });
    })
    .catch((error) => {
        console.error('Error fetching Matches Won Per Team Per Year data:', error);
    });


fetch('http://localhost:4000/3')
    .then((response) => response.json())
    .then((data) => {
        Highcharts.chart('calculateExtraRunsConcededIn2016', {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Extra Runs Conceded in 2016',
            },
            xAxis: {
                categories: Object.keys(data),
                title: {
                    text: 'Team',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Extra Runs Conceded',
                },
            },
            series: [
                {
                    name: 'Extra Runs',
                    data: Object.values(data),
                },
            ],
        });
    })
    .catch((error) => {
        console.error('Error fetching Extra Runs Conceded data:', error);
    });


fetch('http://localhost:4000/4')
    .then((response) => response.json())
    .then((data) => {
        Highcharts.chart('calculateTopEconomicalBowlersIn2015', {
            chart: {
                type: 'bar',
            },
            title: {
                text: 'Top Economical Bowlers in 2015',
            },
            xAxis: {
                categories: Object.keys(data),
                title: {
                    text: 'Bowler',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Economy Rate',
                },
            },
            series: [
                {
                    name: 'Economy Rate',
                    data: Object.values(data),
                },
            ],
        });
    })
    .catch((error) => {
        console.error('Error fetching Top Economical Bowlers data:', error);
    });


fetch('http://localhost:4000/5')
    .then((response) => response.json())
    .then((data) => {
        
        const categories = Object.keys(data);
        const tossWinsData = categories.map((team) => data[team].tossWins);
        const matchWinsData = categories.map((team) => data[team].matchWins);

        Highcharts.chart('findTeamsTossAndMatchWins', {
            chart: {
                type: 'bar',
            },
            title: {
                text: "Teams' Toss and Match Wins",
            },
            xAxis: {
                categories: categories,
                title: {
                    text: 'Team',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Wins',
                },
            },
            series: [
                {
                    name: 'Toss Wins',
                    data: tossWinsData,
                },
                {
                    name: 'Match Wins',
                    data: matchWinsData,
                },
            ],
        });
    })
    .catch((error) => {
        console.error("Error fetching Teams' Toss and Match Wins data:", error);
    });


fetch('http://localhost:4000/6')
    .then((response) => response.json())
    .then((data) => {
        Highcharts.chart('findMostPOTMAwardsPerSeason', {
            chart: {
                type: 'line',
            },
            title: {
                text: 'Most Player of the Match (POTM) Awards per Season',
            },
            xAxis: {
                categories: Object.keys(data),
                title: {
                    text: 'Season',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Awards',
                },
            },
            series: [
                {
                    name: 'Player of the Match Awards',
                    data: Object.entries(data).map(([year, playerData]) => ({
                        name: playerData.player,
                        y: playerData.count,
                    })),
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y}',
                    },
                },
            ],
        });
    })
    .catch((error) => {
        console.error('Error fetching Most Player of the Match Awards data:', error);
    });


fetch('http://localhost:4000/7')
    .then((response) => response.json())
    .then((data) => {
        const categories = Object.keys(data);
        const seriesData = [];
        categories.forEach((year) => {
            const batsmanName = data[year].batsman;
            const strikeRate = data[year].strikeRate;

            seriesData.push({
                name: batsmanName, 
                data: [strikeRate],
            });
        });

        Highcharts.chart('calculateHighestBatsmanStrikeRate', {
            chart: {
                type: 'bar',
            },
            title: {
                text: 'Batsman Strike Rate per Season',
            },
            xAxis: {
                categories: categories,
                title: {
                    text: 'Season',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Strike Rate',
                },
            },
            series: seriesData,
        });
    })
    .catch((error) => {
      console.error('Error fetching Dismissal Stats data:', error);
    });  

fetch('http://localhost:4000/8')
    .then((response) => response.json())
    .then((data) => {
    
        const chartData = data.map((dataPoint) => ({
            name: `${dataPoint.batsman} vs ${dataPoint.bowler}`,
            count: dataPoint.count,
        }));

      
        Highcharts.chart('findMostDismissedBowler', {
            chart: {
                type: 'bar',
            },
            title: {
                text: 'Dismissal Stats',
            },
            xAxis: {
                categories: chartData.map((dataPoint) => dataPoint.name),
                title: {
                    text: 'Batsman vs Bowler',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Dismissal Count',
                },
            },
            series: [
                {
                    name: 'Dismissal Count',
                    data: chartData.map((dataPoint) => dataPoint.count),
                },
            ],
        });
    })
    .catch((error) => {
        console.error('Error fetching Dismissal Stats data:', error);
    });

fetch('http://localhost:4000/9')
    .then((response) => response.json())
    .then((data) => {
        const bestEconomyData = {
            'Best Economy in Super Overs': data[1],
        };

        Highcharts.chart('findBestEconomyInSuperOvers', {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Best Economy in Super Overs',
            },
            xAxis: {
                categories: [data[0]],
                title: {
                    text: 'Bowler',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Economy Rate',
                },
            },
            series: [
                {
                    name: 'Economy Rate',
                    data: [data[1]],
                },
            ],
        });
    })
    .catch((error) => {
        console.error('Error fetching Best Economy in Super Overs data:', error);
    });
  

   