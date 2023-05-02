import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Helmet>
        <title>Leafy Lane</title>
      </Helmet>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Leafy Lane</Navbar.Brand>
          </Container>
          <Nav>
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
