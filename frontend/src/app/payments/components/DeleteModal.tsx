import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

interface DeleteModalProps {
  name: string;
  onClick: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ name, onClick }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onClick();
    handleClose();
  };

  return (
    <div>
      <Delete onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirmação de Exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se excluir este pedido, esta ação não poderá ser revertida. Tem
            certeza que deseja excluir?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
