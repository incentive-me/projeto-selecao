import { useState, useEffect } from "react";
import BalanceFull from "./BalanceFull";
import BalanceEmpty from "./BalanceEmpty";
import axios from "axios";

const BalanceSection = () => {
  const [balanceList, setBalanceList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/balances").then((response) => {
      if (response.data.content) {
        setBalanceList(response.data.content);
      }
    });
  }, []);

  return (
    <>
      {balanceList.length > 0 ? (
        <BalanceFull list={balanceList} />
      ) : (
        <BalanceEmpty />
      )}
    </>
  );
};

export default BalanceSection;
