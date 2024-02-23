import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Balance } from '../redux/balance.slice';
import { useGetBalance } from '../hooks/useGetBalance';
import { FormHelperText } from '@mui/material';
import { ErrorMessage, initialStateErrMessage } from '../pages/balance/NewBalance';

type SelectBalanceProps = {
  setBalance: React.Dispatch<React.SetStateAction<string>>, 
  err: ErrorMessage,
  setErr: React.Dispatch<React.SetStateAction<ErrorMessage>>
}

export default function SelectBalance({setBalance, err, setErr}: SelectBalanceProps) {
  const balanceState = useGetBalance()
  const [balanceId, setBalanceId] = React.useState('');

  return (
    <FormControl sx={{minWidth: "100%" }} error={err.field === "balance"}>
      <InputLabel id="demo-select-small-label">Selecione o saldo a utilizar</InputLabel>
      <Select
        value={balanceId}
        label="Selecione o saldo a utilizar"
        onChange={(e: SelectChangeEvent) => {
          setBalanceId(e.target.value);
          setBalance(e.target.value)
          setErr(initialStateErrMessage) 
        }}
      >
        {balanceState.map((item: Balance) => {
          return(
            <MenuItem  key={item.id} value={item.id}>
              {item.balanceName} - R$ {item.totalValue.toFixed(2)}
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>
        {err.field === "balance" ? err.message : ""}
      </FormHelperText>
    </FormControl>
  );
}