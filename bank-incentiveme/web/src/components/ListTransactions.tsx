import { Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { priceFormatter, dateFormatter } from '../utils/fomatter';
import { TransactionsContext } from '../context/TransactionsContext';
import { api } from '../lib/axios';

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  created_at: string
}

export function ListTransactions() {
  const transactions = TransactionsContext();

  const [listTransactions, setListTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    setListTransactions(transactions)
  })

  function deleteTransaction(id: number) {
    const token = localStorage.getItem('authorization') as string

    const headers = {
      'authorization': `Bearer ${JSON.parse(token)}`
    }

    if (confirm(`Deseja realmente deletar essa transação?`)) {
      api.delete(`/transactions/delete/${id}`, { headers })
        .then(() => {
          alert(`Transação deletada com sucesso!!!`)
        }).catch(err => {
          console.log(err)
        });
    }
  }

  return (
    <table className='w-full rounded-md border-separate border-spacing-x-0 border-spacing-y-2 mt-6'>
      <tbody className='w-full'>
        {listTransactions.map((transaction) => {
          return (
            <tr key={transaction.id} className='mt-2 bg-zinc-800 flex items-center justify-around'>
              <td width='50%' className='text-stone-300 px-5 py-8'>{transaction.description}</td>
              <td className='text-emerald-500 px-5 py-8'>
                <div>
                  {transaction.type == 'income'
                    ? <span className='text-emerald-500'>{priceFormatter.format(transaction.price)}</span>
                    : <span className='text-red-400'>- {priceFormatter.format(transaction.price)}</span>
                  }
                </div>
              </td>
              <td className='text-stone-300 px-5 py-8'>{transaction.category}</td>
              <td className='text-stone-300 px-5 py-8'>
                {dateFormatter.format(new Date(transaction.created_at))}
              </td>

              <a href="/">
                <Trash size={32} onClick={() => deleteTransaction(transaction.id)} className='text-red-500 cursor-pointer' />
              </a>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}