import React from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: any;
  name: string;
  price: number;
  imageUrl: string;
};

export const StoreItem = ({ id, name, price, imageUrl }: StoreItemProps) => {
  console.log("render id " + id + " times");
  const {
    getItemQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  let quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img src={imageUrl} height="200px" style={{ objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex align-items-baseline justify-content-between mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity == 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div className="">
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
