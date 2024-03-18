/* 
  Estes arquivos são como os models, ficam
  com a camada que consome os bancos
  nestes casos os fakes
  mas poderia facilmente subistituir o payments por uma tabela e passar para o apiMethods
*/

import path from 'path';

import apiMethods from './api'

const payments = path.join(process.cwd(), 'mock/payments.json')

export default async function handler(req, res) { apiMethods(payments, req, res) }