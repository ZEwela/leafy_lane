/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  useEditProductMutation,
  useGetProductDetailsByIdQuery,
} from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import ProductForm from "../components/ProductForm";
import { Product } from "../types/Product";
import { toast } from "react-toastify";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsByIdQuery(id!);

  const { mutateAsync: edit } = useEditProductMutation();

  const editHandler = async (editedProduct: Product) => {
    editedProduct._id = id!;
    try {
      const data = await edit(editedProduct);
      navigate(`/product/${data.product.slug}`);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
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
      <h1>Edit Product</h1>

      {product && (
        <ProductForm
          product={product}
          submitHandler={editHandler}
          actionType="Edit"
        />
      )}
    </div>
  );
}

export default ProductEdit;
