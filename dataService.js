import express from 'express';
import axios from 'axios';
import processData from './processdata.js';

const app = express();
const PORT = process.env.PORT || 5045;

/**
 * Sends back a message with code 200 when requested
 */
app.get('/ping', (req, res) => {
  res.send('Microservice is operational!');
});

/**
 * Sends back a a list of objects with data of the top 100 cryptocurrencies by market cap according to current CoinGecko data.
 * Objects are coins with attributes:
 * image, name, symbol, current_price, price_change_24h, market_cap
 */
app.get('/tophundredcoins', (req, res) => {
  // get request to relevant api
  axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24hr")
    .then(response => {
      // check if request successful
      if (response.status == 200) {
        // processes data and sends processed data if request successful
        const processedData = processData(response.data);
        res.send(processedData);
      }
      // throws descriptive error if not successful
      else {
        throw new Error(`Received response code ${response.status} from CoinGecko`);
      }
    })
    // handles error
    .catch(err => {
      console.error(err);
      res.status(500).json({ Error: `${err}` });
    });
});

// makes REST API listen on PORT
app.listen(PORT, () => {
  console.log(`Microservice listening on port ${PORT}`);
});