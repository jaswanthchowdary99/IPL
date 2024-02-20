const fs = require('fs');
const express = require('express');
const server = express();
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 4000;

const directoryPath = path.join(__dirname, 'src', 'public');

server.use(express.json());
server.use(cors());
server.use(express.static(directoryPath));

server.get('/', (request, response) => {
  try {
   
    response.sendFile(path.join(directoryPath, 'index.html'));
  } catch (error) {
    console.error(error);
    response.status(500).send('Error rendering HTML');
  }
});

server.get('/1', async (request, response) => {
  try {
    const result = require('./src/public/output/1.match-per-year.json');
    response.json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/2', async (request, response) => {
  try {
    const result = require('./src/public/output/2.matches-won-per-year.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/3', async (request, response) => {
  try {
    const result = require('./src/public/output/3.extra-runs-conceded-per-year.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/4', async (request, response) => {
  try {
    const result = require('./src/public/output/4.top10-economical-bowler.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/5', async (request, response) => {
  try {
    const result = require('./src/public/output/5.teams-won-toss.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/6', async (request, response) => {
  try {
    const result = require('./src/public/output/6.player-of-the-match.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/7', async (request, response) => {
  try {
    const result = require('./src/public/output/7.strike-rate.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/8', async (request, response) => {
  try {
    const result = require('./src/public/output/8.dissmissed-by-another-player.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.get('/9', async (request, response) => {
  try {
    const result = require('./src/public/output/9.best-economy-superOver.json');
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'Data not found' });
  }
});

server.listen(port, (error) => {
  if (error) {
    console.log(`Error running on port ${port}`);
  } else {
    console.log(`Successfully running on http://localhost:${port}`);
  }
});
