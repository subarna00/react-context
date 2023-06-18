import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </Stack>
        <div className="ms-auto fw-bold fs-5 mt-5">
          Total:{" "}
          {formatCurrency(
            cartItems.reduce((total, item) => {
              const items = storeItems.find((i) => i.id == item.id);
              return total + (items?.price || 0) * item.quantity;
            }, 0)
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
