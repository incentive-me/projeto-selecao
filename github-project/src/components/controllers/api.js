import React from 'react'
import axios from 'axios'
import isAuthenticated from './isAuthenticated'

export const apiConfig = {
    clientId: "7936086d7194dec29682",
    clientSecret: "aab9e4763e54f602df6e365210b3907fe012b852",
    getUrl: "https://github.com/login/oauth/authorize",
    postUrl: "https://github.com/login/oauth/access_token",
    userUrl: "https://api.github.com/user",
    isAuth: false
}

export const codeAuthApi = () => {
    if (!isAuthenticated()) {
        const { getUrl, clientId } = apiConfig
        window.location.href = `${getUrl}?client_id=${clientId}`
    } else {
        console.log(isAuthenticated())
    }
}


const urlParam = paramName => {
    const param = window.location.href.split(`${paramName}=`)[1]
    return param
}


const setTokenLcStorage = token => {
    localStorage.setItem('token', token)
}



const tokenUser = userCode => {
    const { clientId, clientSecret } = apiConfig
    axios(`/api`, {
        params: {
            clientId: clientId,
            clientSecret: clientSecret,
            code: userCode
        }
    }).then(response => {
        if (response.data.error) {
            console.log(response.data.error)
            alert(`Erro de autenticação: ${response.data.error_description} - ${response.data.error}`)
        }
        else if (response.data.access_token) {
            console.log(response.data.access_token)
            setTokenLcStorage(response.data.access_token)
            window.location.href = '/'
        }
    })
}


export const getUser = cb => {
    const token = localStorage.getItem('token')
    if (token) {
        const config = {
            method: 'get',
            url: "https://api.github.com/user",
            headers: {
                'Authorization': `bearer ${token}`,                
            }
        }
        axios(config)
            .then(response => {
                cb(response.data)
            })
            .catch(err => {
                console.log(err.response.data)
                localStorage.removeItem('token')
                codeAuthApi()
            })
    }
    else (
        cb('Cliente não autenticado')
    )
}




export const AuthPage = () => {
    const code = urlParam('code')
    if (code) tokenUser(code)

    return (
        <h1>teste</h1>
    )
}