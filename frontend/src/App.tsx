import {
  Container,
  Navbar,
  Nav,
  Button,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    const nav = document.getElementById("nav");
    nav!.classList.remove("bg-light");
    nav!.classList.remove("bg-dark");
    nav!.classList.add(`bg-${mode}`);
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const toggleModeHandler = () => {
    dispatch({ type: "TOGGLE_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <div className="d-flex flex-column ">
      <Helmet>
        <title>Leafy Lane</title>
      </Helmet>
      <ToastContainer position="bottom-center" limit={10} autoClose={500} />
      <header>
        <Navbar
          expand="lg"
          fixed="top"
          className="p-3 mb-3 d-flex flex-column align-items-strech"
          id="nav"
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Leafy Lane</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Item>
                  <Button
                    onClick={toggleModeHandler}
                    variant="secondary"
                    className="rounded-circle size-sm  m-1"
                  >
                    <i
                      className={mode === "dark" ? "fa fa-moon" : "fa fa-sun"}
                    ></i>
                  </Button>
                </Nav.Item>
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container className="mt-5 pt-5 pb-30">
          <Outlet />
        </Container>
      </main>
      <footer className="d-flex justify-content-center position-absolute w-100 bottom-0 m-4">
        <div className="text-center opacity-50">Leafy Lane 2023</div>
      </footer>
    </div>
  );
}

export default App;
