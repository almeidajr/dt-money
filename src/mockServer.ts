import { createServer, Model } from 'miragejs'

const storageKey = '@dt-money:miragejs'

function getInitialData() {
  const localData = localStorage.getItem(storageKey)

  if (localData) {
    return JSON.parse(localData)
  }

  const data = {
    transactions: [
      {
        id: 1,
        title: 'Freelance de website',
        type: 'deposit',
        category: 'Dev',
        amount: 6000,
        createdAt: new Date('2021-02-12 09:00:00'),
      },
      {
        id: 2,
        title: 'Aluguel',
        type: 'withdraw',
        category: 'Casa',
        amount: 1100,
        createdAt: new Date('2021-02-14 11:00:00'),
      },
    ],
  }

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

function storeData<T>(type: string, data: T) {
  const localData = localStorage.getItem(storageKey)
  if (!localData) {
    return
  }

  const parsedData = JSON.parse(localData)
  parsedData[type].push(data)

  localStorage.setItem(storageKey, JSON.stringify(parsedData))
}

export const runMockServer = () => {
  createServer({
    namespace: 'api',
    timing: 1500,
    models: {
      transaction: Model,
    },

    seeds(server) {
      server.db.loadData(getInitialData())
    },

    routes() {
      this.get('/transactions', () => {
        return this.schema.all('transaction')
      })

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody)
        storeData('transactions', data)
        return schema.create('transaction', data)
      })
    },
  })
  console.info('Mock server is running')
}
