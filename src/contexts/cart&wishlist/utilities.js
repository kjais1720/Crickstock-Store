export const findCartEstimate = (cartItems) => cartItems.reduce(
    (acc, curr) => ({
      ...acc,
      price: acc.price + curr.prevPrice * curr.qty,
      discount: acc.discount + (curr.prevPrice - curr.price) * curr.qty,
      totalPrice:
        acc.price +
        curr.prevPrice * curr.qty -
        (acc.discount + (curr.prevPrice - curr.price) * curr.qty),
      totalItems: acc.totalItems+ curr.qty
    }),
    {
      price: 0,
      discount: 0,
      totalPrice: 0,
      totalItems:0
    }
  );
