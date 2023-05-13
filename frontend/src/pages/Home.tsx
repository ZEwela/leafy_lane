import { Col, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Product } from "../types/Product";
import { useOutletContext } from "react-router-dom";
import { useGetProductsQuery } from "../hooks/productHooks";

function Home() {
  const searchResults: Product[] = useOutletContext();
  const { data: products } = useGetProductsQuery();
  const serachResultArr = searchResults || products;

  return !serachResultArr ? (
    <LoadingBox />
  ) : serachResultArr.length === 0 ? (
    <MessageBox variant="warning">Produnt not found</MessageBox>
  ) : (
    <Row className="justify-content-center">
      {serachResultArr?.map((product: Product) => (
        <Col key={product.slug} sm={6} md={6} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default Home;
