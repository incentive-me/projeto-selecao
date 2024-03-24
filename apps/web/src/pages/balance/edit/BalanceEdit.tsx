import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useBalanceEdit } from './useBalanceEdit';

export function BalanceEdit() {
  const { id } = useParams<{ id: string }>();

  const {
    isPending,
    isLoading,
    onSubmit,
    form: {
      control,
      reset,
      handleSubmit,
      formState: { isDirty },
    },
  } = useBalanceEdit(id);

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
      <Stack justifyContent="space-between" height="100%">
        <Stack spacing={4}>
          <Typography variant="h5">
            {id ? 'Editar saldo' : 'Criar saldo'}
          </Typography>

          <Stack spacing={2}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Nome"
                  placeholder="Digite o nome do saldo"
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
                  placeholder="Digite a descrição do saldo"
                  error={Boolean(error)}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="initialValue"
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
                    onChange(Number(event.target.value.replace(/[^0-9]/g, '')))
                  }
                  {...field}
                />
              )}
            />
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
    </form>
  );
}
