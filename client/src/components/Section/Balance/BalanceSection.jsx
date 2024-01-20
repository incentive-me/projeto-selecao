import BalanceFull from "./BalanceFull";
import BalanceEmpty from "./BalanceEmpty";

const BalanceSection = () => {
  const balanceList = [
    {
      name: "Pagamento 1",
      description: "Descrição 1",
      initialValue: "R$ 1.000,00",
      usedValue: "R$ 500,00",
      remainingValue: "R$ 42",
    },
    {
      name: "Pagamento 2",
      description: "Descrição 1",
      initialValue: "R$ 1.000,00",
      usedValue: "R$ 500,00",
      remainingValue: "R$ 42",
    },
    {
      name: "Pagamento 3",
      description: "Descrição 1",
      initialValue: "R$ 1.000,00",
      usedValue: "R$ 500,00",
      remainingValue: "R$ 42",
    },
    {
      name: "Pagamento 4",
      description: "Descrição 1",
      initialValue: "R$ 1.000,00",
      usedValue: "R$ 500,00",
      remainingValue: "R$ 42",
    },
    {
      name: "Pagamento 5",
      description: "Descrição 1",
      initialValue: "R$ 1.000,00",
      usedValue: "R$ 500,00",
      remainingValue: "R$ 42",
    },
  ];

  const hasItemsList = true;

  return (
    <>{hasItemsList ? <BalanceFull list={balanceList} /> : <BalanceEmpty />}</>
  );
};

export default BalanceSection;
