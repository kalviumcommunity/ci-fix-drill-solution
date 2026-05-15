const { calculateDiscount } = require('./calculateDiscount');

test('applies no discount when percent is 0', () => {
  expect(calculateDiscount(100, 0)).toBe(100); // This passes
});

test('applies 10 percent discount correctly', () => {
  // Fix: The function correctly returns price - (price * discountPercent / 100)
  // 100 - (100 * 10 / 100) = 90. The previous assertion of 100 was incorrect.
  expect(calculateDiscount(100, 10)).toBe(90);
});
