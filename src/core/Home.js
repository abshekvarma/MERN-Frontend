import React, { useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { getProducts } from "./helper/coreapicalls";
import { useEffect } from "react/cjs/react.development";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        seterror(data.error);
      } else {
        setproducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the T-shirt store">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-3 mb-4">
                <Card product={product}></Card>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
