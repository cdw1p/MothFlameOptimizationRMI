# MothFlameOptimizationRMI
Moth Flame Optimization with Relative Momentum Index for market prediction

## Install
```
npm install ccxt
npm install moment-timezone
```
or
```
npm install
```

## Example
```js
import ccxt from 'ccxt'
import MothFlameOptimizationRMI from './index.js'

/**
 * Fetch historical data
 */
const exchange = new ccxt.binance()
const symbol = 'BTC/USDT'
const timeframe = '4h'
const limit = 1000
const historicalData = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit)

/**
 * Analyze historical data
 */
const analyzer = new MothFlameOptimizationRMI(historicalData)
const prediction = analyzer.getResultData()
console.log({ prediction })
```

## Results
```
{
  prediction: [
    {
      price: 69180,
      timestamp: '2024-03-29 19:00:00',
      direction: 'bearish'
    },
    {
      price: 70780.6,
      timestamp: '2024-03-29 03:00:00',
      direction: 'bullish'
    },
    {
      price: 71290.39,
      timestamp: '2024-03-28 19:00:00',
      direction: 'bearish'
    },
    {
      price: 70647.18,
      timestamp: '2024-03-28 15:00:00',
      direction: 'bullish'
    },
    {
      price: 70399.03,
      timestamp: '2024-03-28 11:00:00',
      direction: 'bearish'
    },
    {
      price: 69290,
      timestamp: '2024-03-28 07:00:00',
      direction: 'bullish'
    },
    {
      price: 69469.99,
      timestamp: '2024-03-28 03:00:00',
      direction: 'bearish'
    },
    {
      price: 69725.99,
      timestamp: '2024-03-27 11:00:00',
      direction: 'bullish'
    },
    ...
  ]
}
```

## License
MIT