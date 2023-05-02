import { sampleProducts } from "./data";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
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
          <Row>
            {sampleProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image image-responsive"
                />
                <h2>{product.name}</h2>
                <p>£ {product.price}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <footer>
        <div className="text-center">Leafy Lane 2023</div>
      </footer>
    </div>
  );
}

export default App;
