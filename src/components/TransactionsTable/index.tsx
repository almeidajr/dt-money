import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'

export const TransactionsTable = () => {
  const { transactions, isLoading, isError } = useTransactions()

  if (isError) {
    return (
      <Container>
        <p className="error">Ocorreu um erro ao obter os dados.</p>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container>
        <p className="loading">Obtendo dados...</p>
      </Container>
    )
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {transaction.type === 'withdraw' && '- '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt),
                  )}
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </Container>
  )
}
