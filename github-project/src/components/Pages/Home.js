import React,{useState, useEffect} from 'react'
import { getUser } from '../controllers/api'
import PrivateHeader from '../Header/PrivateHeader'
import PrivateMain from '../Main/PrivateMain'


const Home = () => {
    const [user,setUser] = useState('')   

    useEffect(()=> {
        getUser(user => setUser(user))
    },[])

    return (
        <div className="app bg-color-gray">
            {user?<PrivateHeader user={user.name} login={user.login} email={user.email}/>:''}
            {user?<PrivateMain user={user}/>:''}
        </div>
    )
}

export default Home
