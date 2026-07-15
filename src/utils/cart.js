export function addItemToCart(setCart, item) {
  setCart((prev) => {
    const existing = prev.find((i) => i.id === item.id);

    if (existing) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }

    return [...prev, { ...item, quantity: 1 }];
  });
}
