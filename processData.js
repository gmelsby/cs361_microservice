export default function processData(data) {
  const coinList = data.map(({image, name, symbol, current_price, price_change_24h, market_cap}) => 
    (
      { image, name, symbol, current_price, price_change_24h, market_cap }
    ));
  
  return coinList;
}