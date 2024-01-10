import axios from "axios";
import { X } from "lucide-react";

export function Tag({repoId, tag, setNewTag}){

    
    async function removeTag() {
        const response = await axios.delete(`http://localhost:3000/tag/${tag.id}/${repoId}`)

        console.log(response.data.tags)
        setNewTag(response.data.tags)
    }

    return (
        <span className="px-3  rounded-full bg-zinc-300 text-zinc-800 flex gap-1 justify-center items-center">
            {tag.name}
            <button onClick={() => removeTag()} className="sr-only group-hover:not-sr-only text-zinc-800 transition-all duration-300">
                <X size={16}/>
            </button>
        </span>
    )
}