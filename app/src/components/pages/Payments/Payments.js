import api from '../../../utils/api'
import translate from '../../../utils/translate'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import useFlashMessage from '../../../hooks/useFlashMessage'
import Modal from 'react-modal';
import styles from './Dashboard.module.css'

function Payments({ language }) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const [payments, setPayments] = useState([])
    const [token] = useState(localStorage.getItem('token'))
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const [modalIsOpen, setModalOpen] = useState(false);
    const [paymentId, setPaymentIdToRemove] = useState(null);

    const lang = language || 'pt';
    const getTranslation = key => translate[lang][key] || key;

    const [currentPage, setCurrentPage] = useState(1);
    const [paymentsPerPage] = useState(5);
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

    useEffect(() => {
        api.get('/payment', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPayments(response.data.payments)
        })
    }, [token])

    async function removePayment(id) {
        setModalOpen(true);
        setPaymentIdToRemove(id);
    }

    async function confirmRemovePayment() {
        setModalOpen(false);
        let messageType = 'success'

        const data = await api.delete(`/payment/${paymentId}`)
            .then((response) => {
                fetchPayments()
                return response.data
            })
            .catch((error) => {
                messageType = 'error'
                return error.response.data
            })

        setFlashMessage(getTranslation(data.message), messageType)

        if (messageType !== 'error') {
            navigate('/payment')
        }

    }

    async function fetchPayments() {
        api.get('/payment', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPayments(response.data.payments)
        })
    }

    function cancelRemovePayment() {
        setModalOpen(false);
    }

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <section>
            <div className={styles.paymentslist_header}>
                <h1>Pagamentos</h1>
                <Link to="/payment/add">Cadastrar Pagamento</Link>
            </div>
            <div className={styles.paymentslist_container}>

                {payments.length > 0 && (

                    <div className={styles.payments_header} >
                        <div className={styles.column_header}>Nome</div>
                        <div className={styles.column_header_big}>Descrição</div>
                        <div className={styles.column_header}>Valor</div>
                        <div className={styles.column_header}>Ações</div>
                    </div>
                )
                }

                {currentPayments.length > 0 && (
                    currentPayments.map(payment => (
                        <div key={payment.id}>{(<>
                            <div className={styles.payments} >
                                <div className={styles.record}>{payment.name}</div>
                                <div className={styles.record_header_big}>{payment.description.slice(0, 65)}...</div>
                                <div className={styles.record}>{formatter.format(payment.value)}</div>
                                <div className={styles.record}>
                                    <Link className={styles.edit} to={`/payment/edit/${payment.id}`}>Editar</Link>
                                    <button className={styles.delete} onClick={() => {
                                        removePayment(payment.id)
                                    }} >Excluir</button>
                                </div>
                            </div>


                        </>)}

                        </div>
                    )

                    )

                )

                }
                {payments.length === 0 && <p>Não existem saldos para serem mostrados</p>}

                {currentPayments.length > 0 && (
                    <>
                        <div className={styles.pagination}>
                            <div>Página {currentPage} de {Math.ceil(payments.length / paymentsPerPage)}</div>
                            <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                            <button onClick={nextPage} disabled={currentPage === Math.ceil(payments.length / paymentsPerPage)}>Próxima</button>
                        </div>
                    </>
                )}
            </div>

            <Modal
                className={styles.modal}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Excluir pedido"
            >
                <h2>Excluir pagmento?</h2>
                <p>Ao excluir este pagamento a ação não poderá ser revertida. Tem certeza que deseja excluir?</p>
                <button className={styles.delete} onClick={confirmRemovePayment}>Sim</button>
                <button className={styles.no_delete} onClick={cancelRemovePayment}>Não</button>
            </Modal>

        </section >
    )
}

export default Payments