import React from "react";
import { Controller } from "react-hook-form";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { MenuItem } from "@mui/material";

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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </>
        )}
      />
    </Box>
  );
};

export default SelectFormField;
