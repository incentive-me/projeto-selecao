import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';

export function Dashboard() {
  return (
    <div className='flex justify-around items-center my-12'>
      <div className='flex flex-col justify-start items-start inline-flex gap-3 py-6 px-8  bg-zinc-800 rounded-md'>
        <div className='self-stretch justify-between items-start inline-flex'>
          <span className='text-stone-300 text-base'>Entradas</span>
          <ArrowCircleUp size={32} color='#00B37E' />
        </div>

        <strong className='text-zinc-200 text-[32px] font-bold'>R$ 10.000,00</strong>
      </div>

      <div className='flex flex-col justify-start items-start inline-flex gap-3 py-6 px-8  bg-zinc-800 rounded-md'>
        <div className='self-stretch justify-between items-start inline-flex'>
          <span className='text-stone-300 text-base'>Saidas</span>
          <ArrowCircleDown size={32} color='#F75A68' />
        </div>

        <strong className=' text-zinc-200 text-[32px] font-bold'>R$ 5.000,00</strong>
      </div>

      <div className='flex flex-col justify-start items-start inline-flex gap-3 py-6 px-8  bg-emerald-800 rounded-md'>
        <div className='self-stretch justify-between items-start inline-flex'>
          <span className='text-stone-300 text-base'>Total</span>
          <CurrencyDollar size={32} color='#FFF' />
        </div>

        <strong className='text-zinc-200 text-[32px] font-bold'>R$ 5.000,00</strong>
      </div>
    </div>
  )
}