import {
  Container,
  Navbar,
  Nav,
  Button,
  InputGroup,
  FormControl,
  Form,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const theName = "Leafy Lane";
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

  const [show, setShow] = useState(false);

  const navbarCollapse = (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Link to="#" className="nav-link" onClick={toggleModeHandler}>
          <i className={mode === "dark" ? "fa fa-moon" : "fa fa-sun"}></i>
        </Link>
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
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/orderhistory">
              <NavDropdown.Item>Order History</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
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
  );

  return (
    <div className="d-flex flex-column">
      <Helmet>
        <title>{theName}</title>
      </Helmet>
      <ToastContainer position="bottom-center" limit={10} autoClose={500} />
      <header>
        <Navbar
          expand="lg"
          fixed="top"
          className="p-3 mb-3 d-flex flex-column align-items-stretch "
          id="nav"
        >
          <div className="d-flex justify-content-between align-items-center">
            <LinkContainer to="/">
              <Navbar.Brand>{theName}</Navbar.Brand>
            </LinkContainer>
            <Form className="flex-grow-1 d-flex me-auto p-2">
              <InputGroup>
                <FormControl
                  type="text"
                  name="search"
                  id="search"
                  placeholder={`Search ${theName}`}
                  aria-label={`Search ${theName}`}
                  aria-describedby="button-search"
                ></FormControl>
                <Button
                  variant="outline-primary"
                  type="submit"
                  id="button-search"
                >
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroup>
            </Form>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              id="collapse_togle"
              onClick={() => setShow(!show)}
            />
            {!show && navbarCollapse}
          </div>
          {show && <div>{navbarCollapse}</div>}

          <div className="sub-header">
            <div className="d-flex">
              <Link to="/" className="nav-link navbar-nav p-1">
                <i className="fas fa-bars"> All</i>
              </Link>
            </div>
          </div>
        </Navbar>
      </header>

      <main>
        <Container className="mt-5 py-5">
          <Outlet />
        </Container>
      </main>
      <footer className="d-flex justify-content-center position-absolute w-100 bottom-0 m-2">
        <div className="text-center opacity-50">{theName} 2023</div>
      </footer>
    </div>
  );
}

export default App;
