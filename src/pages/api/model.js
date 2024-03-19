import fsPromises from 'fs/promises';

// XXX :: Api fake
export default function Model(db) {
  return {
    handleGetData: async function() {
      const jsonData = await fsPromises.readFile(db)
      return JSON.parse(jsonData)
    },  
    handleWriteDb: async function(data) {
      await fsPromises.writeFile(db, data);
    }
  }
}