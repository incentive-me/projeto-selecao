/* 
  Estes arquivos são como os models, ficam
  com a camada que consome os bancos
  nestes casos os fakes
  mas poderia facilmente subistituir o balances por uma tabela e passar para o apiMethods
*/

import path from 'path';

import apiMethods from './api'

const balances = path.join(process.cwd(), 'mock/balances.json')

export default async function handler(req, res) { apiMethods(balances, req, res) }