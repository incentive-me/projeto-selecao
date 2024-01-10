import { useEffect, useMemo, useState } from "react";
import { Repo } from "./Repo";
import axios from "axios";
import { FilterTag } from "./FilterTag";
import { Loading } from "./Loading"

export function ListRepositories({ user }){

    const [repositories, setRepositories] = useState([])
    const [tag, setTag] = useState([])
    const [isLoding, setIsLoding] = useState(true)

    async function getAllTags() {
        const response = await axios.get(`http://localhost:3000/tags`)
        setTag(response.data)
    }

    useEffect(() => {getAllTags()}, [tag])


    async function getAllRepositories() {
        const response = await axios.get(`http://localhost:3000/${user.id}`)
        setRepositories(response.data)
        setIsLoding(false)
    }

    useMemo(() => {
        getAllRepositories()
    },[user])

    if(isLoding){
        return (
            <div className="text-zinc-200 w-full flex justify-center items-center">
                <Loading/>
            </div>
        )
    }


    return (
        <>
            <div className="flex justify-between">
                <strong className="text-xl text-zinc-200 font-bold">Your stars</strong>
                <FilterTag setRepositories={setRepositories} tags={tag} getAllRepositories={getAllRepositories}/>
            </div>
            <div className="w-full grid grid-cols-2 justify-center  gap-4">
                {
                    repositories.length !== 0 ? 
                        repositories.map(repo => (
                            <Repo key={repo.id} repository={repo}/>
                        ))
                    :
                        ''
                }
                
            </div>
        </>
    )
}