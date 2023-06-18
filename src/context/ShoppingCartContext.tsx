import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderContextProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({
  children,
}: ShoppingCartProviderContextProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((items) => {
      if (items.find((item) => item.id == id) == null) {
        return [...items, { id, quantity: 1 }];
      } else {
        return items.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((items) => {
      if (items.find((item) => item.id == id)?.quantity == 1) {
        return items.filter((i) => i.id !== id);
      } else {
        return items.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((items) => {
      if (items.find((item) => item.id == id) !== null) {
        return items.filter((item) => item.id !== id);
      } else {
        return items;
      }
    });
  }

  function openCart() {
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
