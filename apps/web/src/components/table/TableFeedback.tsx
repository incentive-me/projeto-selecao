import { Stack, StackProps } from '@mui/material';

export function TableFeedback(props: StackProps) {
  return (
    <tr>
      <td
        colSpan={100}
        align="center"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          spacing={2}
          marginTop={10}
          sx={{ width: 'fit-content' }}
          {...props}
        />
      </td>
    </tr>
  );
}
