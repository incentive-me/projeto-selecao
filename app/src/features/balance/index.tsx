import React, { useEffect, useReducer, useRef, useState } from 'react'

import Button from '@/components/ui/button'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { EditIcon, Trash } from 'lucide-react'
import { Balance, deleteBalance, findAllBalances } from '@/services/balance.service'
import MutateBalanceSheet from './mutate-balance-sheet'
import DialogDeleteBalance from './dialog-delete-balance'

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

const Balance: React.FC = () => {
  const [balances, setBalance] = useState<Balance[]>([])
  const [balanceToDelete, setBalanceToDelete] = useState<Balance | null>(null)
  const [balanceSelected, setBalanceSelected] = useState<Balance | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [openSheet, toggleOpenSheet] = useReducer(prevState => !prevState, false)
  const [openDialog, toggleOpenDialog] = useReducer(prevState => !prevState, false)

  const tableRef = useRef(null)
  const pageSize = 10

  const getAllBalances = async (isClearable: boolean = false) => {
    try {
      setLoading(true)
      const response = await findAllBalances({
        page: isClearable ? 1 : page,
        pageSize,
      })
      const filteredResponse = response.filter(
        (balance: any) => !balances.find((p: any) => p.id === balance.id)
      )
      setBalance(prevState =>
        isClearable ? response : page === 1 ? filteredResponse : [...prevState, ...filteredResponse]
      )
      setPage(page + 1)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = () => {
    const table = tableRef.current
    if (table) {
      const { scrollTop, scrollHeight, clientHeight } = table
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        getAllBalances()
      }
    }
  }

  const deleteSaldo = async () => {
    try {
      await deleteBalance(balanceToDelete?.id as string)
      setBalance(prevState => prevState.filter(balance => balance.id !== balanceToDelete?.id))
      await getAllBalances(true)
    } catch (error) {
      console.error(error)
    } finally {
      toggleOpenDialog()
    }
  }

  const handleDelete = async (row: Balance) => {
    setBalanceToDelete(row)
    toggleOpenDialog()
  }

  const handleEdit = async (row: Balance) => {
    setBalanceSelected(row)
    toggleOpenSheet()
  }

  useEffect(() => {
    getAllBalances()
  }, [])

  return (
    <React.Fragment>
      <main className={`flex flex-col space-y-4 overflow-hidden`}>
        <header className='flex justify-between items-center p-4 border-b-2 border-gray-200'>
          <h2 className='text-xl font-bold text-gray-800'>Saldo</h2>
          <Button variant='contained' color='primary' onClick={toggleOpenSheet}>
            Cadastrar
          </Button>
        </header>
        <div className='flex-1 flex flex-col  px-4'>
          {balances.length === 0 ? (
            <span className='text-2xl font-bold text-gray-800 text-center mx-auto'>
              Não possui saldos cadastrados
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
                    <StyledTableCell>Valor Inicial</StyledTableCell>
                    <StyledTableCell>Valor Utilizado</StyledTableCell>
                    <StyledTableCell>Valor restante</StyledTableCell>
                    <StyledTableCell align='right' className='pr-16'>
                      Ações
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balances.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component='th' scope='row'>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>{row.initialValue}</StyledTableCell>
                      <StyledTableCell>{row.usedValue}</StyledTableCell>
                      <StyledTableCell>{row.total}</StyledTableCell>
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
        <MutateBalanceSheet
          open={openSheet}
          onClose={() => {
            toggleOpenSheet()
            setBalanceSelected(null)
          }}
          title={balanceSelected ? 'Editar saldo' : 'Cadastrar saldo'}
          refetch={() => getAllBalances(true)}
          balanceSelected={balanceSelected}
        />
      )}
      {openDialog && (
        <DialogDeleteBalance
          open={openDialog}
          onClose={toggleOpenDialog}
          handleDelete={deleteSaldo}
        />
      )}
    </React.Fragment>
  )
}

export default Balance
