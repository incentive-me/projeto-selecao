import { useEffect, useState } from 'react';

import { api } from '../lib/axios'
import { AuthToken } from './AuthToken'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  created_at: string
}

export function TransactionsContext() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  AuthToken();

  const token = localStorage.getItem('authorization') as string

  useEffect(() => {
    api.get('transactions', {
      headers: {
        authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => {
      setTransactions(response.data)
    })
  }, []);

  return transactions
}