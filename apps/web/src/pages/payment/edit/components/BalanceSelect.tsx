import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { useBalanceApi } from 'services/api/balance';
import { PaymentForm } from '../usePaymentEdit';

export function BalanceSelect(props: Partial<SelectProps>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<PaymentForm>();

  const { findAll } = useBalanceApi();

  const { data } = useQuery({
    queryKey: ['balance', 'findAll'],
    queryFn: () => findAll(),
  });

  return (
    <Controller
      control={control}
      name="balance"
      render={({ field: { onChange, value, ...field } }) => (
        <FormControl error={Boolean(errors.balance?.id)}>
          <InputLabel id="balance-select">Saldo</InputLabel>
          <Select
            labelId="balance-select"
            input={<OutlinedInput label="Saldo" />}
            value={value.id}
            onChange={(event) =>
              onChange({
                id: event.target.value,
                name: data?.find((balance) => balance.id === event.target.value)
                  ?.name,
              })
            }
            error={Boolean(errors.balance?.id)}
            {...field}
            {...props}
          >
            {data?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>

          {Boolean(errors.balance?.id?.message) && (
            <FormHelperText error>{errors.balance?.id?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
