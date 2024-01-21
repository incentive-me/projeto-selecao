import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@mui/material";
import { BalanceValues } from "@/@types/BalanceType";
import { getBalancesPerPerson } from "@/services/BalanceFetch";

type selectFormFieldProps = {
  name: string;
  control: any;
  label: string;
};

const SelectFormField: React.FC<selectFormFieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  const [balances, setBalances] = useState<BalanceValues[]>([]);

  useEffect(() => {
    getBalancesPerPerson().then((response) => {
      setBalances(response);
    });
  }, []);
  return (
    <Box mt={2} padding={1}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              variant="outlined"
              fullWidth
              margin="dense"
              error={Boolean(fieldState?.error?.message)}
              {...rest}
            >
              {balances &&
                balances.map((balance) => (
                  <MenuItem value={balance.id} key={balance.id}>
                    {balance.valor_restante}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
    </Box>
  );
};

export default SelectFormField;
