/* 
  Eu poderia ter usado um ORM para abstrair esta camada
  Meu intuito aqui é mostrar meus conhecimentos com a base
  Isto significa que consigo implementar tanto usando um ORM (prisma ou sequelize)
  Quanto sem ORM: Obviamente um ORM agilizaria o processo
*/

import path from 'path';

import Model from './model'

const payments = path.join(process.cwd(), 'mock/payments.json')
const balances = path.join(process.cwd(), 'mock/balances.json')

export default async function handler(req, res) {
  const methods = {
    'GET': async () => {
      const objectData = await Model(payments).handleGetData()

      if (req.query?.uuid) {
        const [paymentData] = objectData.filter(item => item.uuid === req.query.uuid)

        const balancesData = await Model(balances).handleGetData()
        const [balance] = balancesData.filter(item => item.uuid === paymentData.balance_uuid)

        return res.status(200).json({ ...paymentData, balance })
      }

      res.status(200).json(objectData)
    },
    'POST': async () => {
      try {
        const params = req.body

        const balancesData = await Model(balances).handleGetData()
        const [balance] = balancesData.filter(item => item.uuid === params.balance_uuid)

        params.value = parseFloat(params.value.replace('R$', '').replace(/\./g,'').replace(',','.'))

        if (params.value > parseFloat(balance.value.remaining)) {
          return res.status(412).json({ message: 'O saldo selecionado é inferior ao valor do pagamento!' });
        }

        const paymentsData = await Model(payments).handleGetData();
  
        paymentsData.push(params);

        balancesData.map(item => {
          if (item.uuid === params.balance_uuid) {
            item.value.used = params.value + item.value.used
            item.value.remaining = item.value.initial - params.value
          }

          return item
        })
  
        await Model(balances).handleWriteDb(JSON.stringify(balancesData));
        await Model(payments).handleWriteDb(JSON.stringify(paymentsData));
  
        res.status(200).json({ message: 'Data stored successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error storing data' });
      }
    },
    'PUT': async () => {
      try {
        const objectData = await Model(payments).handleGetData();
        
        const updatedData = objectData.map(item => {
          if (item.uuid === req.query.uuid) {
            item = { ...item, ...req.body }
          }

          return item
        })

        await Model(payments).handleWriteDb(JSON.stringify(updatedData));
  
        res.status(200).json({ message: 'Data update successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error update data' });
      }
    },
    'DELETE': async () => {
      try {
        const objectData = await Model(payments).handleGetData();
  
        await Model(payments).handleWriteDb(JSON.stringify(objectData.filter(item => item.uuid !== req.query.uuid)));
  
        res.status(200).json(await Model(payments).handleGetData());
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error deleted data' });
      }
    }
  }

  methods[req.method]() 
}