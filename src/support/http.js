import { handleGenerateUuid } from './handlers'
/* 
  Serve como um middleware entre o dominio e o database
  é muito util para tratar erros genéricos antes de enviar para o app
  além de adicionar os interceptors
*/
async function handleFetch(url, params) {
  // XXX TODO :: Adicionar aqui a conexão com a api e os interceptors
  // Métodos auxiliares, isto facilita manutenção e troca do endpoint principal
  return await fetch(`/api/${url}`, params)
}
async function handleReturn(response) {
  // Métodos auxiliares, padroniza o retorno, assim
  // se precisar que retorne outras propriedades
  // aplica a todas as requests
  return {
    status: response.status,
    data: await response.json()
  }
}

export default function http (uri) {
  return {
    list: async () => await handleReturn(await handleFetch(uri)),
    show: async (uuid) => await handleReturn(await handleFetch(`${uri}?uuid=${uuid}`)),
    delete: async (uuid) => await handleReturn(await handleFetch(`${uri}?uuid=${uuid}`, { method: 'DELETE' })),
    edit: async ({ uuid, ...params }) => {
      return await handleReturn(await handleFetch(`${uri}?uuid=${uuid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }))
    },
    save: async (params) => {
      return await handleReturn(await handleFetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: handleGenerateUuid(), ...params })
      }))
    }
  }
}