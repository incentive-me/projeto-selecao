import PaymentEmpty from "./PaymentEmpty";
import PaymentFull from "./PaymentFull";

const PaymentSection = () => {
  const paymentList = [
    {
      name: "Pagamento 1",
      description: "Descrição 1",
      value: "R$ 1.000,00",
    },
    {
      name: "Pagamento 2",
      description: "Descrição 2",
      value: "R$ 2.000,00",
    },
    {
      name: "Pagamento 3",
      description: "Descrição 3",
      value: "R$ 3.000,00",
    },
  ];

  const hasItemsInList = true;

  return (
    <>
      {hasItemsInList ? <PaymentFull list={paymentList} /> : <PaymentEmpty />}
    </>
  );
};

export default PaymentSection;
