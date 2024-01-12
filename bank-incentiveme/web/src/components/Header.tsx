import { Link } from 'react-router-dom';


export function Header() {
  return (
   <div className="w-full flex justify-between items-center mt-10">
    <Link to='/' className="flex items-center justify-center flex-col">
      <h1 className="text-xl font-bold text-white">BANK</h1>
      <h1 className="text-xl font-bold text-white">INCENTIVEME</h1>
    </Link>

    <Link to="/transactions/create" className="text-base text-white px-5 py-3 bg-emerald-700 rounded-md cursor-pointer">Nova transação</Link>
   </div>
  )
}