import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteConfirmIcon from "../IconsComponents/DeleteConfirmIcon";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteFunctionModal({
  name,
  balanceId,
  onClick,
}: {
  name: string;
  balanceId: string;
  onClick: (balanceId: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <DeleteIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle>
            <DeleteConfirmIcon />
            Excluir {name}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se excluir este {name}, esta ação não poderá ser revertida. Tem
              certeza que deseja excluir?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                onClick(balanceId);
                handleClose();
              }}
            >
              Excluir
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
