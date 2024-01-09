import { transactions } from '../../mock-dashboard.json';
import { priceFormatter, dateFormatter } from '../utils/fomatter';

export function ListTransactions() {
  return (
    <table className='w-full rounded-md border-separate border-spacing-x-0 border-spacing-y-2 mt-6'>
      <tbody className='w-full'>
        {transactions.map((transaction) => {
          return (
            <tr key={transaction.id} className='mt-2  bg-zinc-800'>
              <td width='50%' className='grow basis-0 text-stone-300 px-5 py-8'>{transaction.description}</td>
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
                {dateFormatter.format(new Date(transaction.createdAt))}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}