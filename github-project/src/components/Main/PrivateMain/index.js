import React, { useEffect, useState } from 'react'
import { apiConfig, getUser } from '../../controllers/api'



const ItemResp = props => {
    const repos = props.repos  
    return repos.filter(repos => repos.stargazers_count >= props.searchOption).map((repos, i) =>
        <div key={i} className="p-4 bg-white mt-2">
            <div className="row">
                <div className="col-md-6">{repos.name}</div>
                <div className="col-md-6">
                    <span className="badge bg-color-secundary mx-2">Stars:{repos.stargazers_count}</span>
                    <span className="badge bg-color-secundary mx-2">Language:{repos.language}</span>
                    <span className="badge bg-color-secundary mx-2">Forks:{repos.forks}</span>
                </div>
            </div>
        </div>
    )
}



const PrivateMain = props => {
    const [search, setSearch] = useState('')
    const [repos, setRepos] = useState(null)
    const [searchOption, setSearchOption] = useState('0')

    useEffect(() => {
        const { clientId, clientSecret } = apiConfig
        const reposUrl = `https://api.github.com/search/repositories?q=user%3A${props.user.login}+${search}&${clientId}&${clientSecret}`        
        getUser(repos => setRepos(repos.items), reposUrl)
    }, [search])

    return (
        <main className="container">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-3 bg-white">
                        <div className="p-3">
                            <img src={props.user.avatar_url} className="img-thumbnail  mx-auto d-block img-fluid rounded-circle" alt="..." />
                            <div className="mt-1 mb-3 text-center">
                                <h4>{props.user.name ? props.user.name : props.user.login}</h4>
                                <p className="small text-muted h3">{props.user.email}</p>
                            </div>
                            <ul className="list-group">                               
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
                            <div className="row">
                                <div className="col-10">
                                    <input className="form-control mr-sm-3" type="search" placeholder="Search" onKeyUp={e => setSearch(e.target.value)} aria-label="Search" />
                                </div>
                                <div className="col-2">
                                    <select className="form-control h6" onChange={e => setSearchOption(e.currentTarget.value)}>
                                        <option value={0}>Todos</option>
                                        <option value={1}>Estrela</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {repos ? <ItemResp repos={repos} searchOption={searchOption}/> : ''}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PrivateMain