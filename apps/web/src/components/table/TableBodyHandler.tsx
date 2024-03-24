import { Button, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { TableFeedback } from '.';

type TableBodyHandlerProps = {
  error: {
    isError: boolean;
    refetch: () => void;
  };
  loading: {
    isLoading: boolean;
    loader: JSX.Element;
  };
  empty: {
    length: number;
    feedback?: JSX.Element;
  };
};

export function TableBodyHandler({
  children,
  empty,
  error,
  loading,
}: PropsWithChildren<TableBodyHandlerProps>) {
  if (loading?.isLoading) return loading.loader;

  if (error?.isError)
    return (
      <TableFeedback>
        <Typography variant="h6">
          Ocorreu um erro ao buscar os dados.
        </Typography>
        <Button color="error" variant="contained" onClick={error.refetch}>
          Tentar novamente
        </Button>
      </TableFeedback>
    );

  if (empty.length < 1)
    return (
      empty.feedback || (
        <TableFeedback>
          <Typography variant="h6">Não há dados para exibir</Typography>
        </TableFeedback>
      )
    );

  return children;
}
