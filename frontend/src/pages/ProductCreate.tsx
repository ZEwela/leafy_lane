import { Helmet } from "react-helmet-async";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import { useCreateProductMutation } from "../hooks/productHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

function ProductCreate() {
  const navigate = useNavigate();
  const { mutateAsync: createProduct } = useCreateProductMutation();
  const handleSave = async (product: Product) => {
    try {
      const data = await createProduct(product);
      navigate(`/product/${data.product.slug}`);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };
  return (
    <>
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      <h1>Create Product</h1>
      <ProductForm submitHandler={handleSave} actionType="Save" />
    </>
  );
}

export default ProductCreate;
