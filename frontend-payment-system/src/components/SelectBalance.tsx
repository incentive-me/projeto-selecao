import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Balance } from '../redux/balance.slice';
import { useGetBalance } from '../hooks/useGetBalance';

type SelectBalanceProps = {
  setBalance: React.Dispatch<React.SetStateAction<string>>, 
}

export default function SelectBalance({setBalance}:SelectBalanceProps) {
  const balanceState = useGetBalance()
  const [balanceId, setBalanceId] = React.useState('');

  const handleChange = (e: SelectChangeEvent) => {
    setBalanceId(e.target.value);
    setBalance(e.target.value)
  };

  return (
    <FormControl sx={{minWidth: "100%" }}>
      <InputLabel id="demo-select-small-label">Selecione o saldo a utilizar</InputLabel>
      <Select
        value={balanceId}
        label="Selecione o saldo a utilizar"
        onChange={handleChange}
      >
        {balanceState.map((item: Balance) => {
          return(
            <MenuItem  key={item.id} value={item.id}>
              {item.balanceName} - R$ {item.totalValue.toFixed(2)}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  );
}