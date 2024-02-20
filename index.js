const express = require('express');
const port = process.env.PORT || 8000;
const ejs = require('ejs');
const fs =require('fs');
const path = require('path'); 
const Highcharts = require('highcharts')
const matchPerYear = require('./src/server/1.match-per-year.js');
const calculateMatchesWonPerTeamPerYear = require('./src/server/2.match-won-per-year.js');
const calculateExtraRunsConcededIn2016 = require('./src/server/3.extra-runs-conceded-per-year.js');
const calculateTopEconomicalBowlersIn2015 = require('./src/server/4.top10-economical-bowlers.js');
const findTeamsTossAndMatchWins = require('./src/server/5.teams-won-toss.js');
const findMostPOTMAwardsPerSeason = require('./src/server/6.player-of-the-match.js');
const calculateHighestBatsmanStrikeRate = require('./src/server/7.strike-rate.js');
const findMostDismissedBowler = require('./src/server/8.dissmissed-by-another-player.js');
const findBestEconomyInSuperOvers = require('./src/server/9.best-ecocnomy-superOvers.js');
const { request } = require('https');

const server = express();


server.get('/1', async (request, response) => {
  try {
    console.log('output executed succesfully',matchPerYear);
      const result = await require('./src/public/output/1.match-per-year.json');

      const chartConfig = {
          chart: {
              type: 'bar',
          },
          title: {
              text: 'Matches played per year',
          },
          xAxis: {
              categories: Object.keys(result),
              title: {
                  text: 'Years',
              },
          },
          yAxis: {
              title: {
                  text: 'Total Matches played',
              },
          },
          series: [{
              name: '',
              data: Object.values(result),
          }],
      };

      const htmlPath = path.resolve(__dirname, 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

      response.status(200).send(renderedHtml);
  } catch (error) {
      console.error(error);
      response.status(500).send('Error rendering HTML');
  }
});




server.get('/2',async(request,response)=>{
  try{
          console.log('output executed succesfully',calculateMatchesWonPerTeamPerYear);
          const result = await require('./src/public/output/2.matches-won-per-year.json');
         const chartConfig = {
    chart: {
        type: 'column',
    },
    title: {
        text: 'Matches Won per Team per Year in IPL',
    },
    xAxis: {
        categories: Object.keys(result),
        title: {
            text: 'Years',
        },
    },
    yAxis: {
        title: {
            text: 'Wins',
        },
    },
    series: Object.entries(result).map(([year, teamWins]) => ({
        name: year,
        data: Object.entries(teamWins).map(([team, wins]) => ({
            name: team,
            y: wins, // Use the number of wins as the y-axis value
        })),
    })),
};

          
          
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);
  }
  catch(error){
    response.status(500).send('data not found');
  }
})




server.get('/3',async(request,response)=>{
  try{
    console.log('output executed succesfully',calculateExtraRunsConcededIn2016);
    const result = await require('./src/public/output/3.extra-runs-conceded-per-year.json');
           
    const chartConfig = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Extra runs conceded per team in 2016',
        },
        xAxis: {
          categories: Object.keys(result),
          title: {
            text: 'Teams',
          },
        },
        yAxis: {
          title: {
            text: 'Wins',
          },
        },
        series: [{
          name: 'Matches Won',
          data: Object.values(result),
        }],
      };
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);

  }
  catch(error){
       response.status(500).send('data not found');
  }
});







  server.get('/4',async(request,response)=>{
    try{
      console.log('output executed succesfully',calculateTopEconomicalBowlersIn2015);
      const result = await require('./src/public/output/4.top10-economical-bowler.json');

          
      const chartConfig = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Bowler Economy Rates',
        },
        xAxis: {
          categories: result.map(entry => entry.bowlerName),
          title: {
            text: 'Bowler Name',
          },
        },
        yAxis: {
          title: {
            text: 'Economy Rate',
          },
        },
        series: [{
          name: 'Economy Rate',
          data: result.map(entry => entry.economy),
        }],
      };
      
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });
      response.status(200).send(renderedHtml);
    }
    catch(error){
         
      response.status(500).send('data not found');
    }
  
});





server.get('/5',async(request,response)=>{
  try{
    console.log('output executed succesfully',findTeamsTossAndMatchWins);
    const result = await require('./src/public/output/5.teams-won-toss.json');
         
    const chartConfig = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Teams won toss',
        },
        xAxis: {
          categories: Object.keys(result),
          title: {
            text: 'Teams',
          },
        },
        yAxis: {
          title: {
            text: '',
          },
        },
        series: [{
          name: 'Wins',
          data: Object.values(result),
        }],
      };
      
      
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);
  }
  catch(error){
    response.status(200).send('data not found');
  }
});





server.get('/6',async(request,response)=>{
  try{
    console.log('output executed succesfully',findMostPOTMAwardsPerSeason);
    const result = await require('./src/public/output/6.player-of-the-match.json');
    const chartConfig = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Player of the Match for Each Season',
      },
      xAxis: {
        categories: [],
        title: {
          text: 'Seasons',
        },
      },
      yAxis: {
        title: {
          text: 'Player of the Match Count',
        },
      },
      series: [{
        name: 'Player of the Match',
        data: [],
      }],
    };

    // Iterate over the JSON data and populate chartConfig
    result.forEach(entry => {
      chartConfig.xAxis.categories.push(`${entry.season}: ${entry.playerOfMatch}`);
      chartConfig.series[0].data.push(1); // Assuming count is always 1 for each player in the provided data
    });
      
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);
  }
  catch(error){
    response.status(200).send('data not found');
  }
});



server.get('/7',async(request,response)=>{
  try{
    console.log('output executed succesfully',calculateHighestBatsmanStrikeRate);
    const result = await require('./src/public/output/7.strike-rate.json');
    const chartConfig = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Batsman Strike Rates for Each Season',
        },
        xAxis: {
          categories: result.map(entry => entry.batsman),
          title: {
            text: 'Batsmen',
          },
        },
        yAxis: {
          title: {
            text: 'Strike Rate',
          },
        },
        series: [{
          name: 'Strike Rate',
          data: result.map(entry => entry.strikeRate),
        }],
      };
      
      
      
      
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);
  }
  catch(error){
    response.status(200).send('data not found');
  }
});








server.get('/8',async(request,response)=>{
  try{
    console.log('output executed succesfully',findMostDismissedBowler);
    const result = await require('./src/public/output/8.dissmissed-by-another-player.json');
    const chartConfig = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Player Dismissals by Bowler',
        },
        xAxis: {
          categories: [result.player_dismissed],
          title: {
            text: 'Players',
          },
        },
        yAxis: {
          title: {
            text: 'Dismissal Count',
          },
        },
        series: [{
          name: 'Dismissal Count',
          data: [result.count],
        }],
      };
      
      
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);
  }
  catch(error){
    response.status(200).send('data not found');
  }
});







server.get('/9',async(request,response)=>{
  try{
    console.log('output executed succesfully',findBestEconomyInSuperOvers);
    const result = await require('./src/public/output/9.best-economy-superOver.json');
    const chartConfig = {
        chart: {
          type: 'bar', 
        },
        title: {
          text: 'Super Over Economy Rates for Bowlers',
        },
        xAxis: {
          categories: result.map(entry => entry.bowler),
          title: {
            text: 'Bowler',
          },
        },
        yAxis: {
          title: {
            text: 'Super Over Economy',
          },
        },
        series: [{
          name: 'Super Over Economy',
          data: result.map(entry => entry.superOverEconomy),
        }],
      };
      
    const htmlPath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const renderedHtml = ejs.render(html, { chartConfig: JSON.stringify(chartConfig) });

    response.status(200).send(renderedHtml);
  }
  catch(error){
    response.status(200).send('data not found');
  }
});

server.listen(port,(error)=>{
      if(error){
        console.log(`error running in port ${port}`)
      }
      else{
        console.log(`succesfully running in http://localhost:${port}`)
      }
})