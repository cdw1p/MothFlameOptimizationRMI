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