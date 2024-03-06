import { createContext } from "react"

import useAuth from '../hooks/useAuth'

const Context = createContext()

function UserProvider({ children }) {
    const { authenticated, register, login, logout } = useAuth({ language: 'pt' })

    return (<Context.Provider value={{ authenticated, register, login, logout }}>{children}</Context.Provider>)

}

export { Context, UserProvider }