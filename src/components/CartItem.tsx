import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
type StoreItemProps = {
  id: any;
  quantity: number;
};

export const CartItem = ({ id, quantity }: StoreItemProps) => {
  const { removeFromCart, cartItems } = useShoppingCart();
  const items = storeItems.find((item) => item.id == id);
  if (items == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={items.imageUrl}
        alt=""
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div className="">
          {items.name}{" "}
          <span className="text-mutated" style={{ fontSize: ".65rem" }}>
            {quantity}x
          </span>
        </div>
        <div className="text-mutated" style={{ fontSize: ".75rem" }}>
          {formatCurrency(items.price)}
        </div>
      </div>
      <div className="">{formatCurrency(items.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(items.id)}
      >
        X
      </Button>
    </Stack>
  );
};
