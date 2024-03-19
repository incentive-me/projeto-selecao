"use client"

import http from '@/support/http'

import { BalanceResource } from './balances'
import { handleMaskPrice } from '@/support/handlers'

// URI
const uri = 'payments'

// Resources
function PaymentResource(data) {
  // Resource para padronizar o retorno
  // Pode ser extraido e usa-lo como herança
  // Em outros resources, o objetivo é retonar um json
  // com os dados que o app precisa

  return {
    uuid: data.uuid,
    balance: data.balance ? BalanceResource(data.balance) : null, // se houver saldo vinculado
    display_name: data.name,
    description: data?.description || '',
    value: handleMaskPrice(data.value.toFixed(2))
  }
}
function PaymentsResourcesCollection(result) {
  result.data = result.data.map(item => PaymentResource(item))

  return result
}

// Methods
export async function onListPayments () {
  return PaymentsResourcesCollection(await http(uri).list())
}
export async function onShowPaymentByUuid (uuid) {
  const result = await http(uri).show(uuid)

  return PaymentResource(result.data)
}
export async function onCreatePayment (params) {  
  return await http(uri).save(params)
}
export async function onEditPaymentByUuid(params) {
  return await http(uri).edit(params)
}
export async function onRemovePaymentByUuid(uuid) {
  return PaymentsResourcesCollection(await http(uri).delete(uuid))
}