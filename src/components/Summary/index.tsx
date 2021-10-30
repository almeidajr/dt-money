import { useMemo } from 'react'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'

export const Summary = () => {
  const { transactions } = useTransactions()

  const balance = useMemo(
    () =>
      transactions.reduce(
        (account, transaction) => {
          if (transaction.type === 'deposit') {
            account.deposits += transaction.amount
            account.total += transaction.amount
          } else {
            account.withdraws += transaction.amount
            account.total -= transaction.amount
          }

          return account
        },
        {
          deposits: 0,
          withdraws: 0,
          total: 0,
        },
      ),
    [transactions],
  )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          -{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.total)}
        </strong>
      </div>
    </Container>
  )
}
