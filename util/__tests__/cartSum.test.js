export function checkTotalPrice(cartItems) {
  cartItems.reduce((sum, item) => {
    sum = sum + item.price * item.quantity;
    return sum;
  }, 0);
}

test('checkTotalPrice', () => {
  const cartItems = [
    { id: '1', name: 'Cat Bread Shirt', price: '10', quantity: 1 },
    { id: '2', name: 'Show me your kitty shirt', price: '15', quantity: 2 },
    { id: '3', name: 'Adorable Meow Sweatshirt', price: '20', quantity: 3 },
  ];
  expect(checkTotalPrice(cartItems)).toBe(100);
});
