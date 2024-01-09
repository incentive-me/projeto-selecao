import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { useMemo } from 'react';

import { transactions } from '../../mock-dashboard.json';
import { priceFormatter } from '../utils/fomatter';

export function Dashboard() {
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return (
    <div className='flex justify-around items-center my-12'>
      <div className='w-full flex-col justify-start items-start inline-flex gap-3 py-6 px-8  bg-zinc-800 rounded-md'>
        <div className='self-stretch justify-between items-start inline-flex'>
          <span className='text-stone-300 text-base'>Entradas</span>
          <ArrowCircleUp size={32} color='#00B37E' />
        </div>

        <strong className='text-zinc-200 text-[32px] font-bold'>{priceFormatter.format(summary.income)}</strong>
      </div>

      <div className='w-full mx-6 flex-col justify-start items-start inline-flex gap-3 py-6 px-8  bg-zinc-800 rounded-md'>
        <div className='self-stretch justify-between items-start inline-flex'>
          <span className='text-stone-300 text-base'>Saídas</span>
          <ArrowCircleDown size={32} color='#F75A68' />
        </div>

        <strong className='text-zinc-200 text-[32px] font-bold'>{priceFormatter.format(summary.outcome)}</strong>
      </div>

      <div className='w-full flex-col justify-start items-start inline-flex gap-3 py-6 px-8  bg-emerald-800 rounded-md'>
        <div className='self-stretch justify-between items-start inline-flex'>
          <span className='text-stone-300 text-base'>Total</span>
          <CurrencyDollar size={32} color='#FFF' />
        </div>

        <strong className='text-zinc-200 text-[32px] font-bold'>{priceFormatter.format(summary.total)}</strong>
      </div>
    </div>
  )
}