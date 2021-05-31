import React from 'react'
import { codeAuthApi } from '../../controllers/api'

const Header = () =>
    <header className="bg-color-primary">        
            <div className="container d-flex align-items-center justify-content-between text-white h-100">
                <h3>GitHub Stars</h3>
                <div className="">
                    <button type="button" onClick={codeAuthApi} className="btn btn-light bg-color">Acessar Conta</button>
                </div>
            </div>        
    </header>

export default Header