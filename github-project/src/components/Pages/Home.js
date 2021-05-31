import React,{useState, useEffect} from 'react'
import { getUser } from '../controllers/Api'
import PrivateHeader from '../Header/PrivateHeader'
import PrivateMain from '../Main/PrivateMain'


const Home = () => {
    const [user,setUser] = useState('')
    useEffect(()=> {
        getUser(data => setUser(data))
    },[])

    return (
        <div className="app bg-color-gray">
            <PrivateHeader user={user.name} />
            <PrivateMain />
        </div>
    )
}

export default Home
