
const { log } = require('console');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function matchesPerYear() {
  let matches = [];
  fs.createReadStream(path.join(__dirname, '../Data/matches.csv'))
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
      const matchesPerSeason = {};
      
      for (let i = 0; i < matches.length; i++) {
        const season = matches[i].season;
        matchesPerSeason[season] = (matchesPerSeason[season] || 0) + 1;
      }

      writeResultToFile(matchesPerSeason, "../public/output/1.match-per-year.json");
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

function writeResultToFile(result, outputFileName) {
  fs.writeFileSync(path.join(__dirname, outputFileName), JSON.stringify(result, null, 2));
}

matchesPerYear();

    
    
   