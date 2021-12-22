import React, { useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./card";
import { useEffect } from "react/cjs/react.development";
import { loadCart } from "../admin/helper/cartHelper";
import Payment from "./Payment";

export default function Cart() {
  const [products, setproduct] = useState([]);
  const [reload, setreload] = useState(false);

  useEffect(() => {
    setproduct(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCartFlag={false}
              setReload={setreload}
              reload={reload}
            ></Card>
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Checkout Items">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        <div className="col-6">
          <Payment products={products} setReload={setreload} />
        </div>
      </div>
    </Base>
  );
}
