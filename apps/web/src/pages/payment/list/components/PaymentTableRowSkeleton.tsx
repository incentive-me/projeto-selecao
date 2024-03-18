import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';

export function PaymentTableRowSkeleton() {
  const rows = Array.from({ length: 6 }, (_, index) => index + 1);

  return rows.map((row) => (
    <TableRow key={row}>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          <Skeleton width={20} variant="circular" />
          <Skeleton width={20} variant="circular" />
        </Stack>
      </TableCell>
    </TableRow>
  ));
}
