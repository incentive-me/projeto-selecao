import axios from "axios"
import { useState } from "react"

export function FilterTag({setRepositories, tags, getAllRepositories}) {

    async function filterBytag(tagId){
        if(tagId == "all"){
            getAllRepositories()
        }
        const response = await axios.get(`http://localhost:3000/filter/${tagId}`)
        
        setRepositories(response.data)
    }

    return (
        <div className="flex gap-2">
            
            <select onChange={(e) => filterBytag(e.target.value)} name="tags" id="tags" className="min-w-[150px] rounded-lg bg-zinc-700 border border-zinc-600 text-zinc-200 text-right">
                <option value="all" defaultChecked>all</option>
                { tags.map(tag => (
                    <option value={tag.id}>{tag.name}</option>
                )) }
            </select>
        </div>

    )

}