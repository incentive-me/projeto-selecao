import React from 'react'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import { DialogContent, DialogTitle, ModalDialog } from '@mui/joy'
import { Trash } from 'lucide-react'
import Button from '@/components/ui/button'

type DialogDeletePaymentProps = {
  open: boolean
  onClose: () => void
  handleDelete: () => void
}

const DialogDeletePayment: React.FC<DialogDeletePaymentProps> = ({
  open,
  onClose,
  handleDelete,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle className='flex items-center gap-4 mb-8'>
          <Trash size={24} color='red' />
          Excluir Pedido
        </DialogTitle>
        <DialogContent className='flex flex-col items-center justify-center gap-4'>
          <span className='text-gray-800 text-center'>
            Se excluir este pedido, esta ação não poderá ser revertida. Tem certeza que deseja
            excluir?
          </span>
          <div className='flex flex-1 justify-center gap-4 mt-8'>
            <Button variant='outlined' color='inherit' onClick={onClose} className='bg-transparent'>
              Cancelar
            </Button>
            <Button
              variant='contained'
              className='bg-red-500 hover:bg-red-600'
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}

export default DialogDeletePayment
