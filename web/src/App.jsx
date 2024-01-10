import { useEffect, useMemo, useState } from "react"
import { FilterTag } from "./componnents/FilterTag"
import { Header } from "./componnents/Header"
import { ListRepositories } from "./componnents/ListRepositories"

import qs from 'query-string'
import axios from "axios"

function App() {

  const [isLogin, setIsLogin ] = useState(false)
  const [user, setUser ] = useState({})


  async function getToken() {
    const { code } = qs.parseUrl(window.location.href).query

    if( code ){
      try {
        const response = await axios.post('http://localhost:3000/register', { code })
        setIsLogin(true)
        setUser(response.data.user)

        // getRepo(response.data)
      } catch (e){
        console.log("err", e)
      }
    }
  }

  useEffect(() => {
    getToken()
  }, [])


  return (
    <>
      <Header user={user}/>

      <main className="">
        <div className="w-full max-w-[80%] mx-auto py-8">
          <div className="w-full flex flex-col gap-4 mt-6">
            
            {isLogin ? (
              <ListRepositories user={user}/>
            ) : (
              <div className="w-full h-fit flex items-center justify-center">
                <a 
                  href={`https://github.com/login/oauth/authorize?client_id=f5cf814e581ebe979fa1`}
                  className="bg-zinc-200 text-zinc-800 hover:brightness-105 px-2.5 py-3 rounded-md mx-auto"
                >
                  entrar com github
                </a>

              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
