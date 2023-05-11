import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

function AdminProfile() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Link to="/admin/products">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Link to="/admin/users">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Link to="/admin/orders">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Statistics</Card.Title>
              <Link to="/admin/statistics">Check</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminProfile;
