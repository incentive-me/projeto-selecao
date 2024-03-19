export function handleGenerateUuid() {
  const _chars = '0123456789abcdef'.split('')
  const _uuid = []

  let _r

  _uuid[8] = _uuid[13] = _uuid[18] = _uuid[23] = '-'
  _uuid[14] = '4' // version 4

  for (let i = 0; i < 36; i++) {
      if (!_uuid[i]) {
        _r = 0 | Math.random() * 16

        _uuid[i] = _chars[(i === 19) ? (_r & 0x3) | 0x8 : _r & 0xf]
      }
  }

  return _uuid.join('')
}
export function handleMaskPrice (value)  {
  if (!value) value = '0'

  value = value.toString().replace('.', '').replace(',', '').replace(/\D/g, '')

  const result = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 })
    .format(parseFloat(value) / 100)

  return 'R$ ' + result
}