import { useContext, useState } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

import { Context } from '../../../context/UserContext'

function Register() {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Digite seu nome'
                    handleOnChange={handleChange}
                />

                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite seu email'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Senha'
                    type='password'
                    name='password'
                    placeholder='Digite sua senha'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Confirmação de Senha'
                    type='password'
                    name='password_confirmation'
                    placeholder='Confirmar sua senha'
                    handleOnChange={handleChange}
                />

                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já tem conta? <Link to='/login'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Register