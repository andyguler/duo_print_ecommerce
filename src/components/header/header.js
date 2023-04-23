import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/context";
import "./header.css";

const Header = () => {
  const { cart } = useContext(Context);
  return (
    <Navbar collapseOnSelect expand="md" style={{ background: "transparent" }}>
      <Container className={"custom-nav-bar"}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="hamburger" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/t-shirt" className="nav-link">T-shirt</Link>
            <Link to="/sweaters" className="nav-link">Sweaters</Link>
            <div style={{ position: "relative" }}>
              <Link to="/cart" className="nav-link">Cart</Link>
              <div className="cart-qty-style">{cart.length || 0}</div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
