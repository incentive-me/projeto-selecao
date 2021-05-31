const isAuthenticated = () => {
    const tokenUser = localStorage.getItem('token')
    console.log(!!tokenUser)
    if(tokenUser) return true 
    return false
}

export default isAuthenticated