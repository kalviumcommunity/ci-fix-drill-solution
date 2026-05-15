const { formatCurrency } = require('./formatCurrency');

test('formats currency correctly', () => {
  // Fix: toBe uses reference equality (===), which fails for objects.
  // toEqual performs a deep value comparison.
  expect(formatCurrency(10.005, 'USD')).toEqual({ amount: 10.01, currency: 'USD' });
});
