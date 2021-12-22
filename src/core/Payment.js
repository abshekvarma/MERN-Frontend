import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticate } from "../auth/helper";
import { getToken, processPayment } from "../admin/helper/payamentHelper";

export default function Payment({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [info, setinfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;
  //const { user, token } = isAuthenticate();
  //const userId = user._id;
  const getMeToken = (userId, token) => {
    getToken(userId, token).then((data) => {
      if (data.error) {
        setinfo({ ...info, error: info.error });
      } else {
        const clientToken = data.clientToken;
        setinfo({ clientToken });
      }
    });
  };

  const showPaymentDropDown = () => {
    return (
      <div>
        {info.clientToken != null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-outline-success"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getMeToken(userId, token);
  }, []);

  const onPurchase = () => {
    setinfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setinfo({ ...info, success: response.success, loading: false });
            console.log("Payment success");
            //TODO:
          })
          .catch((err) => {
            setinfo({ loading: false, success: false });
            console.log("Payment Failed");
          });
      })
      .catch((err) => console.log(err));
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h1>Payment Section, Your Bill is {getAmount()}</h1>
      {showPaymentDropDown()}
    </div>
  );
}
