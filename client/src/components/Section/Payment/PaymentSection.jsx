import { useState, useEffect } from "react";
import PaymentEmpty from "./PaymentEmpty";
import PaymentFull from "./PaymentFull";
import axios from "axios";

const PaymentSection = () => {
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/payments").then((response) => {
      setPaymentList(response.data.content);
    });
  }, []);

  return (
    <>
      {paymentList.length > 0 ? (
        <PaymentFull list={paymentList} />
      ) : (
        <PaymentEmpty />
      )}
    </>
  );
};

export default PaymentSection;
