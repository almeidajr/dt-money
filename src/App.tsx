import { SWRConfig } from 'swr'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'
import { useToggle } from './hooks/useToggle'
import { TransactionsProvider } from './hooks/useTransactions'
import { fetcher } from './services/fetcher'
import { GlobalStyle } from './styles/global'

export const App = () => {
  const [isModalOpen, toggleIsModalOpen] = useToggle()

  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />

      <Header onButtonClick={toggleIsModalOpen} />
      <TransactionsProvider>
        <Dashboard />
        <NewTransactionModal isOpen={isModalOpen} onClose={toggleIsModalOpen} />
      </TransactionsProvider>
    </SWRConfig>
  )
}
