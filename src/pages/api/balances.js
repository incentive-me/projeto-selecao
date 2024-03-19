/* 
  Eu poderia ter usado um ORM para abstrair esta camada
  Meu intuito aqui é mostrar meus conhecimentos com a base
  Isto significa que consigo implementar tanto usando um ORM (prisma ou sequelize)
  Quanto sem ORM: Obviamente um ORM agilizaria o processo
*/

import path from 'path';

import Model from './model'

const balances = path.join(process.cwd(), 'mock/balances.json')

export default async function handler(req, res) {
  const methods = {
    'GET': async () => {
      const objectData = await Model(balances).handleGetData()

      if (req.query?.uuid) {
        return res.status(200).json(objectData.filter(item => item.uuid === req.query.uuid)[0])
      }

      res.status(200).json(objectData)
    },
    'POST': async () => {
      try {
        const objectData = await Model(balances).handleGetData();

        const params = req.body

        params.value.initial = parseFloat(params.value.initial.replace('R$', '').replace(/\./g,'').replace(',','.'))
        params.value.used = parseFloat(params.value.used.replace('R$', '').replace(/\./g,'').replace(',','.'))
        params.value.remaining = parseFloat(params.value.remaining.replace('R$', '').replace(/\./g,'').replace(',','.'))

        objectData.push(params);

        await Model(balances).handleWriteDb(JSON.stringify(objectData));

        res.status(200).json({ message: 'Data stored successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error storing data' });
      }
    },
    'PUT': async () => {
      try {
        const objectData = await Model(balances).handleGetData();
        
        const updateData = objectData.map(item => {
          if (item.uuid === req.query.uuid) {
            item = { ...item, ...req.body }
          }

          return item
        })

        await Model(balances).handleWriteDb(JSON.stringify(updateData));

        res.status(200).json({ message: 'Data update successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error update data' });
      }
    },
    'DELETE': async () => {
      try {
        const objectData = await Model(balances).handleGetData();

        await Model(balances).handleWriteDb(JSON.stringify(objectData.filter(item => item.uuid !== req.query.uuid)));

        res.status(200).json(await Model(balances).handleGetData());
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error deleted data' });
      }
    }
  }

  methods[req.method]()
}