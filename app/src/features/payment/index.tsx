import React, { useEffect, useReducer, useRef, useState } from 'react'

import Button from '@/components/ui/button'

import { Payments, deletePayment, findAllPayments } from '@/services/payment.service'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { EditIcon, Trash } from 'lucide-react'
import MutatePaymentSheet from './mutate-payment-sheet'
import DialogDeletePayment from './dialog-delete-payment'
import { toast } from 'react-toastify'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6D28D9',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const Payment: React.FC = () => {
  const [payments, setPayments] = useState<Payments[]>([])
  const [paymentToDelete, setPaymentToDelete] = useState<Payments | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payments | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [openSheet, toggleOpenSheet] = useReducer(prevState => !prevState, false)
  const [openDialog, toggleOpenDialog] = useReducer(prevState => !prevState, false)

  const tableRef = useRef(null)
  const pageSize = 10

  const getAllPayments = async (isClearable: boolean = false) => {
    try {
      setLoading(true)
      const response = await findAllPayments({
        page: isClearable ? 1 : page,
        pageSize,
      })
      const filteredResponse = response.filter(
        (payment: any) => !payments.find((p: any) => p.id === payment.id)
      )
      setPayments(prevState =>
        isClearable ? response : page === 1 ? filteredResponse : [...prevState, ...filteredResponse]
      )
      setPage(page + 1)
    } catch (error) {
      toast.error('Erro ao buscar pagamentos')
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = () => {
    const table = tableRef.current
    if (table) {
      const { scrollTop, scrollHeight, clientHeight } = table
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        getAllPayments()
      }
    }
  }

  const deletePagamento = async () => {
    try {
      await deletePayment(paymentToDelete?.id as string)
      setPayments(prevState => prevState.filter(payment => payment.id !== paymentToDelete?.id))
      await getAllPayments(true)
    } catch (error) {
      toast.error('Erro ao deletar pagamento')
    } finally {
      toggleOpenDialog()
    }
  }

  const handleDelete = async (row: Payments) => {
    setPaymentToDelete(row)
    toggleOpenDialog()
  }

  const handleEdit = (row: Payments) => {
    setSelectedPayment(row)
    toggleOpenSheet()
  }

  useEffect(() => {
    getAllPayments()
  }, [])

  return (
    <React.Fragment>
      <main className={`flex flex-col space-y-4 overflow-hidden`}>
        <header className='flex justify-between items-center p-4 border-b-2 border-gray-200'>
          <h2 className='text-xl font-bold text-gray-800'>Pagamentos</h2>
          <Button variant='contained' color='primary' onClick={toggleOpenSheet}>
            Cadastrar
          </Button>
        </header>
        <div className='flex-1 flex flex-col  px-4'>
          {payments.length === 0 ? (
            <span className='text-2xl font-bold text-gray-800 text-center mx-auto'>
              Não possui pagamentos cadastrados
            </span>
          ) : (
            <TableContainer
              component={Paper}
              ref={tableRef}
              onScroll={handleScroll}
              className='my-4 overflow-auto h-[700px]'
            >
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nome</StyledTableCell>
                    <StyledTableCell>Descrição</StyledTableCell>
                    <StyledTableCell>Valor</StyledTableCell>
                    <StyledTableCell align='right' className='pr-16'>
                      Ações
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component='th' scope='row'>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>{row.value}</StyledTableCell>
                      <StyledTableCell align='right'>
                        <Button
                          variant='text'
                          className='bg-transparent'
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon size={20} color='#000' />
                        </Button>
                        <Button
                          variant='text'
                          className='bg-transparent'
                          onClick={() => handleDelete(row)}
                        >
                          <Trash size={20} color='#000' />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </main>
      {openSheet && (
        <MutatePaymentSheet
          open={openSheet}
          onClose={() => {
            toggleOpenSheet()
            setSelectedPayment(null)
          }}
          title={selectedPayment ? 'Editar pagamento' : 'Cadastrar pagamento'}
          refetch={() => getAllPayments(true)}
          payment={selectedPayment}
        />
      )}
      {openDialog && (
        <DialogDeletePayment
          open={openDialog}
          onClose={toggleOpenDialog}
          handleDelete={deletePagamento}
        />
      )}
    </React.Fragment>
  )
}

export default Payment
