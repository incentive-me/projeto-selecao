import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

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

type ButtonComponentModalProps = {
  children: React.ReactNode | any;
  name: string | JSX.Element;
  variantColor: "contained" | "text";
};

export default function ButtonComponentModal({
  children,
  name,
  variantColor,
}: ButtonComponentModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="primary" variant={variantColor}>
        {name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          display={"flex"}
          justifyContent={"center"}
          boxSizing={"content-box"}
          p={2}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
}
