const isAuthenticated = () => {
    const tokenUser = localStorage.getItem('token')   
    if(tokenUser) return true 
    return false
}

export default isAuthenticated