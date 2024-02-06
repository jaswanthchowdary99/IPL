const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function matchesPerYear() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))  // Adjusted the path
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      const matchesPerSeason = matches.reduce((acc, match) => {
        const season = match.season;
        acc[season] = (acc[season] || 0) + 1;
        return acc;
      }, {});

      fs.writeFileSync(path.join(__dirname, "../public/output/1.match-per-year.json"), JSON.stringify(matchesPerSeason, null, 2));
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

matchesPerYear();



    
    
   