import { Container, Navbar as Navs, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <Navs className="bg-white shadow-sm mb-3 py-4" sticky="top">
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 ? (
          <Button onClick={openCart}>Cart {cartQuantity}</Button>
        ) : null}
      </Container>
    </Navs>
  );
};
