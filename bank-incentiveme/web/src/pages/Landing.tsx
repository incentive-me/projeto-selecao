import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';
import { ListTransactions } from '../components/ListTransactions';

import '../styles/global.css';

export function Landing() {
  return (
    <div className="w-full max-w-5xl mx-auto my-0">
      <Header />
      <Dashboard />
      <ListTransactions />
    </div>
  )
}