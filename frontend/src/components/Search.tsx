/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
type Prop = {
  theName: string;
  setSearchResults: any;
  products: Product[];
};
const Search = ({ theName, setSearchResults, products }: Prop) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const resultsArray: Product[] | [] = products!.filter(
      (product) =>
        product.name.includes(e.target.value) ||
        product.description.includes(e.target.value) ||
        product.slug.includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };
  return (
    <Form className="flex-grow-1 d-flex me-auto p-2" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          type="text"
          name="search"
          id="search"
          placeholder={`Search ${theName}`}
          aria-label={`Search ${theName}`}
          aria-describedby="button-search"
          onChange={handleSearchChange}
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
