# cs361_microservice
Microservice for CS 361

**To run**
- Setup (Do once): Navigate into the directory and execute 'npm install'
- Then to run, execute 'npm run devstart'
- Default port is 5045 but can be changed through changing env
- Edit the URL or add a new one to the list at app.use(cors({ origin: ["http://localhost:3000"] })); to include the URL your service is running on. Otherwise, the microservice will block your request.

**To Request and Receive Data**
- Because my microservice is a REST API, performing a GET request both requests and receives data.
- Assuming you are using fetch, here is what a call that requests and receives data looks like:
```
const loadCoinData = async () => {
  const response = await fetch("http://localhost:5045/tophundredcoins");
  const data = await response.json();
  setCoinData(data);
}
```
This call makes a GET request to http://localhost:5045/tophundredcoins (the URL of the microservice in this example).
Note that you do not need to send any parameters along with your request.
It then waits on a response.
When it receives a response, it sets 'data' to the json content of the response.
Then, this example calls an externally-defined function 'setCoinData' to set the relevant values in the application to the received data.

Upon a successful request, the value of 'data' will be an array of 100 objects. Each object will contain the information for a cryptocurrency, and objects in the array will be sorted by market cap.
Each object will contain the properties { image, name, symbol, current_price, price_change_24h, market_cap }.
image, name, and symbol are Strings, and current_price, price_change_24h, and market_cap are numbers.

UML Sequence Diagram:
![UML Sequence Diagram](https://user-images.githubusercontent.com/59071144/180659086-259a2a54-e8fc-47e4-8c68-7ce773d649fc.png)
