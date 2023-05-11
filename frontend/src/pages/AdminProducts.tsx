/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Button, Table } from "react-bootstrap";
import { useGetProductsQuery } from "../hooks/productHooks";

function AdminProducts() {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h1>Products</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products!.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)} </td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    Preview
                  </Button>{" "}
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => {
                      navigate(`/admin/product/${product._id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AdminProducts;
