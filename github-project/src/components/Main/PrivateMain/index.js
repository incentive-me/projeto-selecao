import React from 'react'
import { codeAuthApi } from '../../controllers/api'
import Icons from '../../Icons'

const PrivateMain = props =>
    <main className="container">
        <div className="container mt-4">
            <div className="row">
                <div className="col-sm-3 bg-white">
                    <div className="p-3">
                        <img src={props.user.avatar_url} className="img-thumbnail img-fluid rounded-circle" alt="..." />
                        <div className="mt-1 mb-3">
                        <h4>{props.user.name}</h4>
                        <p class="small text-muted h3">{props.user.email}</p>                        
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Repositórios
                                    <span className="badge bg-color-secundary badge-pill text-color-primary">{props.user.public_repos}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Seguidores
                                            <span className="badge bg-color-secundary badge-pill text-color-primary ">{props.user.followers}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Seguindo
                                        <span className="badge bg-color-secundary badge-pill text-color-primary">{props.user.following}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-sm-9">
                    <div className=" p-4 bg-white">
                        <input className="form-control mr-sm-3" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                </div>
            </div>
        </div>

    </main>

export default PrivateMain