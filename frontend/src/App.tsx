import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Store } from "./Store";
import { useContext, useEffect } from "react";

function App() {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const toggleModeHandler = () => {
    dispatch({ type: "TOGGLE_MODE" });
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Helmet>
        <title>Leafy Lane</title>
      </Helmet>
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">Leafy Lane</Navbar.Brand>
          </Container>
          <Nav>
            <Button
              onClick={toggleModeHandler}
              variant="secondary"
              className="rounded-circle size-sm  m-1"
            >
              <i className={mode === "dark" ? "fa fa-moon" : "fa fa-sun"}></i>
            </Button>
            <Nav.Item>
              <Nav.Link href="/cart" className="nav-link">
                Cart
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signin" className="nav-link">
                Sign In
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </header>
      <hr />
      <main>
        <Container className="mt-5">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">Leafy Lane 2023</div>
      </footer>
    </div>
  );
}

export default App;
