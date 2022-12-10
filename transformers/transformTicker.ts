/**
 * transformTicker.ts
 * Ensure ticker types are converted from string to actual types.
 * Currently only an issue for 'active' property.
 */
const transformTicker = (ticker: Record<string, string>): Record<string, unknown> => {
  return {
    ...ticker,
    active: Boolean(ticker.active),
  };
};

export default transformTicker;
