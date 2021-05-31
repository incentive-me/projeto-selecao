import React from 'react'

const PrivateHeader = props =>
    <header className="bg-color-primary">
        <div className="container d-flex align-items-center justify-content-between text-white h-100">
            <h3>GitHub Stars</h3>

            <div className="dropdown show">
                <a className="btn btn-secondary dropdown-toggle"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown link
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" >Action</a>
                    <a className="dropdown-item" >Another action</a>
                    <a className="dropdown-item" >Something else here</a>
                </div>
            </div>
        </div>
    </header>

export default PrivateHeader