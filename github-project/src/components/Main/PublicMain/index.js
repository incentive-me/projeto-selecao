import React from 'react'
import { codeAuthApi } from '../../controllers/Api'
import Icons from '../../Icons'

const Main = () =>
    <main className="container py-5">
        <div className="d-flex align-items-center justify-content-center h-100 bg-white">
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-color-primary m-0 p-0">Organize seu GitHub</h1>  
                <Icons size={100} icon="github" color="var(--color-primary)"/>        
                <button type="button" onClick={codeAuthApi} className="btn btn-lg btn-secondary bg-color-primary mb-5 mt-1">Acessar Conta</button>
            </div>
        </div>
    </main>

export default Main