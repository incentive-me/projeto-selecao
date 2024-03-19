"use client"

import http from '@/support/http'

import { handleMaskPrice } from '@/support/handlers'

import store, { setAlertShow } from '@/app/store'

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
    value: {
      initial: handleMaskPrice(data.value.initial.toFixed(2)),
      used: handleMaskPrice(data.value.used.toFixed(2)),
      remaining: handleMaskPrice(data.value.remaining.toFixed(2))
    }
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

  const result = await http(uri).save({ ...params, value })
 
  if (result.status !== 200) {
    store.dispatch(setAlertShow({
      open: true, 
      message: result.data.message,
      variant: 'error'
    }))
    return
  }

  store.dispatch(setAlertShow({
    open: true, 
    message: result.data.message,
    variant: 'success'
  }))

  return result
}
export async function onEditBalanceByUuid(params) {
  const result = await http(uri).edit(params)

  if (result.status !== 200) {
    store.dispatch(setAlertShow({
      open: true, 
      message: result.data.message,
      variant: 'error'
    }))
    return
  }

  store.dispatch(setAlertShow({
    open: true, 
    message: result.data.message,
    variant: 'success'
  }))

  return result
}
export async function onRemoveBalanceByUuid(uuid) {
  const result = await http(uri).delete(uuid)

  if (result.status !== 200) {
    store.dispatch(setAlertShow({
      open: true, 
      message: result.data.message,
      variant: 'error'
    }))

    return
  }

  store.dispatch(setAlertShow({
    open: true, 
    message: 'Saldo removido!',
    variant: 'success'
  }))

  return BalancesResourcesCollection(result)
}