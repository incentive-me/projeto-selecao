import { NavLink } from "react-router-dom"

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

import { Context } from '../../context/UserContext'
import { useContext } from "react"

function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <NavLink to="/">
                <div className={styles.navbar_logo} >
                    <img src={Logo} alt="Saldos" />
                    <h2>Payments</h2>
                </div>
            </NavLink>


            {authenticated ? (
                <>
                    <div className={styles.navbar_menu_itens}>
                        <ul className={styles.navbar_menu}>
                            <li >
                                <NavLink to="/balance">Saldos</NavLink>
                            </li>
                            <li >
                                <NavLink to="/payment">Pagamentos</NavLink>
                            </li>

                        </ul>
                        <ul>

                            <li onClick={logout}>Sair</li>
                        </ul>
                    </div>

                </>
            ) : (
                <>
                    <ul>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                    </ul>
                </>
            )
            }


        </nav >
    )


}

export default Navbar