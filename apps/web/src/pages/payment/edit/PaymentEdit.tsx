import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { usePaymentEdit } from './usePaymentEdit';
import { BalanceSelect } from './components';

export function PaymentEdit() {
  const { id } = useParams<{ id: string }>();

  const { isPending, isLoading, onSubmit, form } = usePaymentEdit(id);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  if (isLoading)
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: '100%' }}
    >
      <FormProvider {...form}>
        <Stack justifyContent="space-between" height="100%">
          <Stack spacing={4}>
            <Typography variant="h5">
              {id ? 'Editar pagamento' : 'Criar pagamento'}
            </Typography>

            <Stack spacing={2}>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Nome"
                    placeholder="Digite o nome do pagamento"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Descrição"
                    placeholder="Digite a descrição do pagamento"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="value"
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Valor"
                    disabled={Boolean(id)}
                    placeholder="Digite o valor"
                    error={Boolean(error)}
                    helperText={error?.message}
                    onChange={(event) =>
                      onChange(
                        Number(event.target.value.replace(/[^0-9]/g, '')),
                      )
                    }
                    {...field}
                  />
                )}
              />

              <BalanceSelect disabled={Boolean(id) } />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={!isDirty}
            >
              Cancelar
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!isDirty}
              loading={isPending}
            >
              {id ? 'Salvar' : 'Criar'}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </form>
  );
}
