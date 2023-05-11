import { Helmet } from "react-helmet-async";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import { useContext } from "react";
import { Store } from "../Store";
import { useCreateProductMutation } from "../hooks/productHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

function ProductCreate() {
  const navigate = useNavigate();
  const { mutateAsync: createProduct, isLoading } = useCreateProductMutation();
  //   const { state, dispatch } = useContext(Store);
  const handleSave = async (values: Product) => {
    alert("Product Saved");
    console.log(values);
    try {
      const data = await createProduct(values);
      console.log(data);
      navigate(`/product/${data.product.slug}`);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }

    // dispatch({
    //   type: "SAVE_PRODUCT",
    //   payload: values,
    // });
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
