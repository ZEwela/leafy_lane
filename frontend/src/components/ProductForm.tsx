/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useUploadFileMutation } from "../hooks/fileHooks";
import { Product } from "../types/Product";
import { dirname } from "path";

type Props = {
  product?: Product;
  submitHandler: any;
  actionType: string;
};

function ProductForm({ product, submitHandler, actionType }: Props) {
  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      price: product?.price || "",
      image: product?.image || "",
      brand: product?.brand || "",
      category: product?.category || "",
      countInStock: product?.countInStock || "",
      description: product?.description || "",
      rating: product?.rating || "",
      numReviews: product?.numReviews || "",
    },
    onSubmit: (values) => submitHandler(values),
  });

  const { mutateAsync: upload } = useUploadFileMutation();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files![0];
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log("from product form", __dirname);
    upload(formData);
  };

  return (
    <Form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      className="mw-800px m-auto mt-5"
    >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>{"Name"}</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="slug">
        <Form.Label>Slug</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.slug}
          name="slug"
          onChange={formik.handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={formik.values.price}
          step="0.01"
          name="price"
          onChange={formik.handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleUpload(e);
            formik.setFieldValue(
              "image",
              `../images/${e.target.files![0].name}`
            );
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="countInStock">
        <Form.Label>Count In Stock</Form.Label>
        <Form.Control
          type="number"
          value={formik.values.countInStock}
          name="countInStock"
          onChange={formik.handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="brand">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.brand}
          name="brand"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.category}
          name="category"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.description}
          name="description"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          step="0.1"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="numReviews">
        <Form.Label>Number of Reviews</Form.Label>
        <Form.Control
          type="number"
          name="numReviews"
          value={formik.values.numReviews}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <div className="mb-3">
        <Button variant="primary" type="submit">
          {actionType}
        </Button>
      </div>
    </Form>
  );
}

export default ProductForm;
