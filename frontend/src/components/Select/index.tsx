import React from "react";
import { Controller } from "react-hook-form";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

type Option = {
  id: string | number;
  label: string;
  value: any;
};

type SelectFormFieldProps = {
  name: string;
  control: any;
  label: string;
  options: Option[];
  defaultValue?: any;
  noOptionsText?: string;
  SelectProps?: Record<string, any>;
};

const SelectFormField: React.FC<SelectFormFieldProps> = ({
  name,
  control,
  label,
  options,
  defaultValue = "",
  noOptionsText = "Opções não disponíveis",
  SelectProps = {},
}) => {
  return (
    <Box mt={2} padding={1}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              variant="outlined"
              fullWidth
              margin="dense"
              error={Boolean(fieldState?.error?.message)}
              {...SelectProps}
            >
              {options.length === 0 && (
                <MenuItem value="">{noOptionsText}</MenuItem>
              )}
              {options.map((option) => (
                <MenuItem value={option.value} key={option.id}>
                  {option.label}
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
