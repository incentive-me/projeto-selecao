"use client"

import http from '@/support/http'
// URI
const uri = 'balances'

// Resources
export function BalanceResource(data) {
  // Resource para padronizar o retorno
  // Pode ser extraido e usa-lo como herança
  // Em outros resources, o objetivo é retonar um json
  // com os dados que o app precisa

  return {
    uuid: data.uuid,
    display_name: data.name,
    description: data?.description || '',
    payment: null, // se houver pagamento vinculado
    value: data.value
  }
}
function BalancesResourcesCollection(result) {
  result.data = result.data.map(item => BalanceResource(item))

  return result
}

// Methods
export async function onListBalances () {
  return BalancesResourcesCollection(await http(uri).list())
}
export async function onShowBalanceByUuid (uuid) {
  const result = await http(uri).show(uuid)

  return BalanceResource(result.data)
}
export async function onCreateBalance (params) {
  const value = {
    initial: params.value,
    used: '0',
    remaining: params.value
  }

  return await http(uri).save({ ...params, value })
}
export async function onEditBalanceByUuid(params) {
  return await http(uri).edit(params)
}
export async function onRemoveBalanceByUuid(uuid) {
  return BalancesResourcesCollection(await http(uri).delete(uuid))
}