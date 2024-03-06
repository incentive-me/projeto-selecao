import api from '../../../utils/api'
import translations from '../../../utils/translate'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from './AddPayment.module.css'
import PaymentForm from '../../form/PaymentForm'
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPayment({ language }) {
    const [payment, setPayment] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const lang = language || 'pt';
    const getTranslation = key => translations[lang][key] || key;

    useEffect(() => {
        api.get(`/payment/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setPayment(response.data.payment)

        }).catch((error) => {
            console.log(error)
        })
    }, [token, id])

    async function updatePayment(payment) {
        let message;
        let messageType = 'success'

        await api.patch(`/payment/${id}`, payment, {
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
            navigate('/payment')
        }
    }

    return (
        <section>
            <div className={styles.addpayment_header}>
                <h1>Editar pagamento</h1>
            </div>
            {payment.name && (
                <PaymentForm
                    handleSubmit={updatePayment}
                    btnText='Atualizar'
                    disabled='true'
                    readonly='true'
                    edit='true'
                    paymentData={payment}
                />
            )}
        </section>
    )
}

export default EditPayment