import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import DeleteConfirmIcon from "../../IconsComponents/DeleteConfirmIcon";
import { deleteBalanceByBalanceId } from "@/services/BalanceFetch";

const DeleteBalanceModal = ({ balanceId }: { balanceId: string }) => {
  return (
    <Box>
      <DialogTitle>
        <DeleteConfirmIcon />
        Excluir saldo?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Se excluir este saldo, esta ação não poderá ser revertida. Tem certeza
          que deseja excluir?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteBalanceByBalanceId(balanceId)}
        >
          Excluir
        </Button>
      </DialogActions>
    </Box>
  );
};

export default DeleteBalanceModal;
