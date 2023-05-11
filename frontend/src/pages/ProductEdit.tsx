/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGetProductDetailsByIdQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import ProductForm from "../components/ProductForm";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsByIdQuery(id!);

  const submitHandler = (values: object) => {
    alert("Product updated");
    //   dispatch({
    //     type: "UPDATE_PRODUCT",
    //     payload: {
    //       fullName,
    //       address,
    //       city,
    //       postalCode,
    //       country,
    //     },
    //   });
    navigate(`/product/${product?.slug}`);
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product not found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3">Edit Product</h1>
      </div>
      {product && (
        <ProductForm
          product={product}
          submitHandler={submitHandler}
          actionType="Edit"
        />
      )}
    </div>
  );
}

export default ProductEdit;
