import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { lightTheme } from 'themes';

type DeleteDialogProps = DialogProps & {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteDialog({
  onCancel,
  onConfirm,
  title,
  message,
  isLoading,
  ...props
}: DeleteDialogProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Dialog {...props}>
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <DeleteIcon color="error" />

            <Typography variant="h6">{title}</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancelar
          </Button>
          <LoadingButton
            color="error"
            variant="contained"
            onClick={onConfirm}
            autoFocus
            loading={isLoading}
          >
            Excluir
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
