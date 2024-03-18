/* 
  Estes arquivos são como os models, ficam
  com a camada que consome os bancos
  nestes casos os fakes
  mas poderia facilmente subistituir o users por uma tabela e passar para o apiMethods
*/

import path from 'path';

import apiMethods from './api'

const users = path.join(process.cwd(), 'mock/users.json')

export default async function handler(req, res) { apiMethods(users, req, res) }