import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type BalanceFormFieldProps = {
  name: string;
  label: string;
  control: any;
};

const BalanceFormField: React.FC<BalanceFormFieldProps> = ({
  name,
  label,
  control,
}) => {
  return (
    <Box mt={2} padding={1}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              label={label}
              margin="dense"
              error={Boolean(fieldState?.error?.message)}
              helperText={fieldState?.error?.message}
            />
          </>
        )}
      />
    </Box>
  );
};

export default BalanceFormField;
