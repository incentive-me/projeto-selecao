import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const logOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
}

const PrivateHeader = props =>
    <header className="bg-color-primary">
        <div className="container d-flex align-items-center justify-content-between text-white h-100">
            <h3>GitHub Stars</h3>
            <Dropdown>
                <Dropdown.Toggle variant="light" className="p-2 m-3">
                    {props.user?props.user:props.login}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <span className="px-3">{props.email}</span>                    
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logOut}>Sair</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    </header>

export default PrivateHeader