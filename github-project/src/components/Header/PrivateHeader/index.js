import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Icons from '../../Icons'

const logOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
}

const PrivateHeader = props =>
    <header className="bg-color-primary">
        <div className="container d-flex align-items-center justify-content-between text-white h-100">
            <h3>GitHub Stars</h3>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {props.user}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>{props.email}</Dropdown.Item>                    
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logOut}>
                        Sair
                        </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    </header>

export default PrivateHeader