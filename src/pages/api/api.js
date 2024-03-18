import fsPromises from 'fs/promises';

// XXX :: Api fake
export default async function Methods(db, req, res) {
  /* 
    Eu poderia ter usado um ORM para abstrair esta camada
    Meu intuito aqui é mostrar meus conhecimentos com a base
    Isto significa que consigo implementar tanto usando um ORM (prisma ou sequelize)
    Quanto sem ORM: Obviamente um ORM agilizaria o processo
  */
  async function handleGetData() {
    const jsonData = await fsPromises.readFile(db)

    return JSON.parse(jsonData)
  }

  async function handleWriteDb(data) {
    await fsPromises.writeFile(db, data);
  }

  const methods = {
    'GET': async () => {
      const objectData = await handleGetData()

      if (req.query?.uuid) {
        return res.status(200).json(objectData.filter(item => item.uuid === req.query.uuid)[0])
      }

      res.status(200).json(objectData)
    },
    'POST': async () => {
      try {
        const objectData = await handleGetData();
  
        objectData.push(req.body);
  
        await handleWriteDb(JSON.stringify(objectData));
  
        res.status(200).json({ message: 'Data stored successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error storing data' });
      }
    },
    'PUT': async () => {
      try {
        const objectData = await handleGetData();
        
        const updatedData = JSON.stringify(objectData.map(item => {
          if (item.uuid === req.query.uuid) {
            item = { ...item, ...req.body }
          }

          return item
        }))

        await handleWriteDb(updatedData);
  
        res.status(200).json({ message: 'Data update successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error update data' });
      }
    },
    'DELETE': async () => {
      try {
        const objectData = await handleGetData();
  
        await handleWriteDb(JSON.stringify(objectData.filter(item => item.uuid !== req.query.uuid)));
  
        res.status(200).json({ message: 'Data deleted successfully' });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Error deleted data' });
      }
    }
  }

  methods[req.method]()
}