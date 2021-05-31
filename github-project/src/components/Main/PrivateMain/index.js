import React, { useEffect, useState } from 'react'
import { codeAuthApi, getUser } from '../../controllers/api'
import Icons from '../../Icons'


const ItemResp = props => {
    const repos = props.repos
    console.log(repos)
    return repos.map((repos,i) =>
        <div key={i} className="p-4 bg-white mt-2">
            <div className="row">
                <div className="col-md-6">{repos.name}</div>
                <div className="col-md-6">
                    <span class="badge bg-color-secundary mx-2">Stars:{repos.stargazers_count}</span>
                    <span class="badge bg-color-secundary mx-2">Language:{repos.language}</span>
                    <span class="badge bg-color-secundary mx-2">Forks:{repos.forks}</span>
                </div>
            </div>
        </div>
    )
}



const PrivateMain = props => {
    const [search, setSearch] = useState(null)
    const [repos, setRepos] = useState(null)

    useEffect(() => {
        const reposUrl = `https://api.github.com/users/${props.user.login}/repos`
        getUser(repos => setRepos(repos), reposUrl)        
    }, [])

    return (
        <main className="container">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-3 bg-white">
                        <div className="p-3">
                            <img src={props.user.avatar_url} className="img-thumbnail  mx-auto d-block img-fluid rounded-circle" alt="..." />
                            <div className="mt-1 mb-3 text-center">
                                <h4>{props.user.name?props.user.name:props.user.login}</h4>
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

                    <div className="col-lg-9">
                        <div className="p-4 bg-white">
                            <input className="form-control mr-sm-3" type="search" placeholder="Search" onKeyUp={e => setSearch(e.target.value)} aria-label="Search" />
                        </div>
                        {repos? <ItemResp repos={repos} search={search}/> : ''}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PrivateMain