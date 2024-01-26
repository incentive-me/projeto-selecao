import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ValidacaoSaldoModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="div">
          Não é possível excluir o saldo, pois há pagamentos vinculados a ele.
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default ValidacaoSaldoModal;
