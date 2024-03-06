import api from '../../../utils/api'
import translations from '../../../utils/translate'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styles from './AddBalance.module.css'
import BalanceForm from '../../form/BalanceForm'
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditBalance({ language }) {
    const [balance, setBalance] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const lang = language || 'pt';
    const getTranslation = key => translations[lang][key] || key;

    useEffect(() => {
        api.get(`/balance/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setBalance(response.data.balance)

        }).catch((error) => {
            console.log(error)
        })
    }, [token, id])


    async function updateBalance(balance) {
        let message;
        let messageType = 'success'

        const data = await api.patch(`/balance/${id}`, balance, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            message = response.data.message
            return message;
        }).catch((error) => {

            const typeResponseError = typeof error.response.data.message;

            let errors
            if (typeResponseError === 'object') {
                errors = Object.entries(error.response.data.message).reverse()
            }

            if (typeResponseError === 'string') {
                errors = Object.entries(error.response.data)
            }

            errors.map(([field, messages]) => {

                message = messages
            })
            messageType = 'error'
        })

        setFlashMessage(getTranslation(message), messageType)

        if (messageType !== 'error') {
            navigate('/balance')
        }
    }

    return (
        <section>
            <div className={styles.addbalance_header}>
                <h1>Editar saldo</h1>
            </div>
            {balance.name && (
                <BalanceForm
                    handleSubmit={updateBalance}
                    btnText='Atualizar'
                    disabled='true'
                    readonly='true'
                    edit='true'
                    balanceData={balance}
                />
            )}
        </section>
    )
}

export default EditBalance