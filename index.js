import moment from 'moment-timezone'

/**
 * Represents the Moth Flame Optimization with RMI algorithm.
 */
class MothFlameOptimizationWithRMI {
  constructor(data) {
    this.data = data
  }

  /**
   * Calculates the Relative Momentum Index (RMI) for a given period.
   * The RMI is a technical indicator used in financial analysis to measure the strength of price movements.
   * @param {number} period - The period over which to calculate the RMI.
   * @returns {number[]} An array of RMI values calculated for each data point.
   */
  calculateRelativeMomentumIndex(period) {
    let rmiValues = []
    for (let i = 0; i < this.data.length; i++) {
      if (i < period || !this.data[i] || !this.data[i - 1]) {
        rmiValues.push(null)
        continue
      }
      let gains = 0
      let losses = 0
      for (let j = i; j > i - period; j--) {
        if (!this.data[j] || !this.data[j - 1]) {
          rmiValues.push(null)
          continue
        }
        let change = parseFloat(this.data[j][4]) - parseFloat(this.data[j - 1][4])
        if (change > 0) {
          gains += change
        } else {
          losses += Math.abs(change)
        }
      }
      let rmi = 100 - (100 / (1 + gains / losses))
      rmiValues.push(rmi)
    }
    return rmiValues
  }

  /**
   * Detects the trend direction based on the given RMI values.
   * @param {number[]} rmiValues - The RMI values.
   * @returns {string[]} - An array of trend directions ('bullish' or 'bearish').
   */
  detectTrend(rmiValues) {
    let trendDirections = []
    for (let i = 1; i < rmiValues.length; i++) {
      if (!rmiValues[i] || !rmiValues[i - 1]) {
        trendDirections.push(null)
        continue
      }
      if (rmiValues[i] > rmiValues[i - 1]) {
        trendDirections.push('bullish')
      } else {
        trendDirections.push('bearish')
      }
    }
    return trendDirections
  }

  /**
   * Retrieves the result data by calculating the Relative Momentum Index (RMI) and detecting the trend.
   * @returns {Array} The normalized signals with price, timestamp, and direction.
   */
  getResultData() {
    let signals = []
    let signalNormalized = []
    let rmiValues = this.calculateRelativeMomentumIndex(14) // Assuming RMI period as 14
    let trendDirections = this.detectTrend(rmiValues)
    for (let i = 0; i < this.data.length; i++) {
      if (!this.data[i]) continue
      let closingPrice = parseFloat(this.data[i][4])
      let timestamp = moment(this.data[i][0]).format('YYYY-MM-DD HH:mm:ss')
      let direction = trendDirections[i]
      signals.push({ price: closingPrice, timestamp: timestamp, direction: direction })
    }
    for (let i = 0; i < signals.length; i++) {
      if (signals[i].direction !== signals[i + 1]?.direction) {
        signalNormalized.push(signals[i])
      }
    }
    return signalNormalized.reverse()
  }
}

/**
 * Export the class
 */
export default MothFlameOptimizationWithRMI