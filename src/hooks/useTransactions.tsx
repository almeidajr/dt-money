import { createContext, FC, useCallback, useContext } from 'react'
import useSWR from 'swr'
import { api } from '../services/api'

type Transaction = {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionsContextData = {
  transactions: Transaction[]
  isLoading: boolean
  isError: boolean
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const route = '/api/transactions'

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
)

export const TransactionsProvider: FC = ({ children }) => {
  const { data, error, mutate } = useSWR<{ transactions: Transaction[] }>(route)

  const createTransaction = useCallback(
    async (transactionInput: TransactionInput) => {
      const response = await api.post<{ transaction: Transaction }>(route, {
        ...transactionInput,
        createdAt: new Date(),
      })
      const { transaction } = response.data

      mutate({
        transactions: [...(data?.transactions ?? []), transaction],
      })
    },
    [data, mutate],
  )

  return (
    <TransactionsContext.Provider
      value={{
        transactions: data?.transactions ?? [],
        isLoading: !data,
        isError: !!error,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  return context
}
