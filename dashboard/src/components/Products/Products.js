import React, { useEffect, useState } from "react";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";
import products from "../../InfosProject";
export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(() => {
    getAllProducts(products);
  }, []);

  const getAllProducts = (products) => {
    setAllProducts(products)
  };

  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </>
  );
}

