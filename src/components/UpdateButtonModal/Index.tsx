import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InputFormField from "../Forms/Index";
import { updateBalanceSchema } from "@/schemas/BalanceSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "../IconsComponents/EditIcon";

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

export default function UpdateFunctionModal({
  onSubmit,
}: {
  onSubmit: SubmitHandler<any>;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateBalanceSchema),
  });

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputFormField name="nome" label="Nome" control={control} />
            <InputFormField
              name="descricao"
              label="Descriçao"
              control={control}
            />
            <InputFormField
              name="valor_inicial"
              label="Valor inicial"
              control={control}
            />
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="warning" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                variant="contained"
                color="primary"
              >
                Enviar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
