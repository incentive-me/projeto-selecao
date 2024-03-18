"use client"

import http from '@/support/http'
// URI
const uri = 'balances'

// Resources
function BalancesResource(data) {
  // Resource para padronizar o retorno
  // Pode ser extraido e usa-lo como herança
  // Em outros resources, o objetivo é retonar um json
  // com os dados que o app precisa

  return {
    uuid: data.uuid,
    display_name: data.name,
    description: data?.description || '',
    payment: null, // se houver pagamento vinculado
    value: {
      initial: data.value,
      used: data.value, // Colocar o calculo para o que foi usado pelo pagamento
      remaining: data.value // Colocar o restante initial - used se houver um pagamento atrelado
    }
  }
}
function BalancesResourcesCollection(result) {
  result.data = result.data.map(item => BalancesResource(item))

  return result
}

// Methods
export async function onListBalances () {
  return await BalancesResourcesCollection(await http(uri).list())
}
export async function onShowBalanceByUuid (uuid) {
  const result = await http(uri).show(uuid)

  return BalancesResource(result.data)
}
export async function onCreateBalance (params) {
  return await http(uri).save(params)
}
export async function onEditBalanceByUuid(params) {
  return await http(uri).edit(params)
}
export async function onRemoveBalanceByUuid(uuid) {
  return await http(uri).delete(uuid)
}