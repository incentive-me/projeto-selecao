import { ChangeEvent, FormEvent, useState } from 'react';
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
// import * as z from 'zod';

import { Header } from "../components/Header";
import { api } from '../lib/axios';
import { AuthToken } from '../context/AuthToken';

// const newTransactionFormSchema = z.object({
//   description: z.string(),
//   price: z.string(),
//   category: z.string(),
//   type: z.string(),
// });

// type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function FormCreateTransaction() {
  const navigate = useNavigate();

  AuthToken();
  
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    category: '',
    type: '',
  });

  const {
    description,
    price,
    category,
    type
  } = formData;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.persist()

    const { id, name, type, value } = event.target;

    if (type == 'radio') {
      setFormData(formData => ({ ...formData, type: id }))
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const token = localStorage.getItem('authorization') as string

    const headers = {
      'authorization': `Bearer ${JSON.parse(token)}`
    }

    const data = {
      description,
      price: Number(price),
      category,
      type
    }

    await api.post('transactions/create', data, { headers }).then(() => {
      alert('Transação criada com sucesso!!!')

      navigate('/')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="w-full h-screen max-w-5xl mx-auto my-0 flex flex-col items-center relative bg-gradient">
      <Header />

      <div className="bg-neutral-800 min-w-[32rem] rounded-md px-10 py-12 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-2xl text-zinc-200 font-bold text-center mb-6">Nova Transação</legend>
            <input
              onChange={handleInputChange}
              type="text"
              id="description"
              name="description"
              placeholder="Descrição"
              value={description}
              required
              className="w-full my-3 p-4 text-white bg-neutral-900 rounded-md justify-start items-start gap-2 inline-flex"
            />

            <input
              onChange={handleInputChange}
              type="number"
              id="price"
              name="price"
              placeholder="Preço"
              value={price}
              required
              className="w-full my-3 p-4 text-white bg-neutral-900 rounded-md justify-start items-start gap-2 inline-flex"
            />

            <input
              onChange={handleInputChange}
              type="text"
              id="category"
              name="category"
              placeholder="Categoria"
              value={category}
              required
              className="w-full my-3 p-4 text-white bg-neutral-900 rounded-md justify-start items-start gap-2 inline-flex"
            />


            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <input type="radio" id="income" name="income" className='peer/income hidden' checked={type == 'income'} onChange={handleInputChange} />
                <label htmlFor="income" className='w-full px-6 py-4 bg-zinc-800 rounded-md items-center flex items-center justify-center gap-2 text-stone-300 text-base peer-checked/income:border-emerald-500 peer-checked/income:border-2'>
                  <ArrowCircleUp size={32} className='text-emerald-500' />
                  Entrada
                </label>
              </div>

              <div>
                <input type="radio" id="outcome" name="outcome" className='peer/outcome hidden' checked={type == 'outcome'} onChange={handleInputChange} />
                <label htmlFor="outcome" className='w-full px-6 py-4 bg-zinc-800 rounded-md items-center flex items-center justify-center gap-2 text-stone-300 text-base peer-checked/outcome:border-2 peer-checked/outcome:border-red-500'>
                  <ArrowCircleDown size={32} className='text-red-500' />
                  Saída
                </label>
              </div>
            </div>

            <button
              type="submit"
              className='w-full px-8 py-4 bg-emerald-700 rounded-md text-center text-white mt-8'
            >
              Cadastrar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
} 