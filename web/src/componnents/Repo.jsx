import { GitFork, Plus, Star, X } from "lucide-react"
import { Tag } from "./Tag"
import { useEffect, useState } from "react"
import * as Popover from '@radix-ui/react-popover';
import axios from "axios";

export function Repo({repository}) {
    const [name, setName] = useState('')
    const [newTag, setNewTag] = useState([])
    const [tag, setTag] = useState([])
  
    async function addTag(name) {
        const response = await axios.post(`http://localhost:3000/tag`, {
           "RepoId": repository.id,
            "name": name
        })

        setName('')
        const tag = {
            tag: response.data
        }
        setNewTag([...repository.tags ,tag])
    }

    async function getAllTags() {
        const response = await axios.get(`http://localhost:3000/tags`)
        setTag(response.data)
    }

    useEffect(() => {
        setNewTag(repository.tags)
        getAllTags()
    }, [])
    console.log(newTag)

    
    return(
        <div className="group w-full px-3 py-4 flex flex-col gap-4 rounded-lg border border-zinc-600 hover:border-zinc-400  transition-all duration-200 ">
            <div className="w-full text-zinc-200">
                <h3 className="text-lg font-bold">{repository.full_name}</h3>
                <p>{repository.description}</p>
                <div className="w-full flex gap-3">
                    <div className="flex justify-center items-center gap-2">
                        <span className="text-zinc-600">{repository.linguage !== '' ? repository.linguage : "Markdown"}</span>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-zinc-600">
                        <Star size={24}/> 
                        <span className="text-zinc-600">{repository.count_stars}</span>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-zinc-600">
                        <GitFork size={24}/> 
                        <span className="">{repository.count_forks}</span>
                    </div>
                    {/* <span className="text-zinc-600">ultima atualizaões a 2 dias</span> */}
                </div>
            </div>
            <div className=" w-full flex gap-3">
                {
                    newTag.map(tag => (
                        <Tag key={tag.tag.id} tag={tag.tag} repoId={repository.id} setNewTag={setNewTag} />
                    )) 
                }
                
                

                <Popover.Root>
                    <Popover.Trigger>
                        <button className="sr-only group-hover:not-sr-only rounded-full bg-zinc-300 text-zinc-800 transition-all duration-300">
                            <Plus />
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                    <Popover.Content
                        className="rounded p-2 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}
                    >
                        <fieldset className="flex gap-5 items-center">
                            <input
                                className="w-full min-w-32 py-4 inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                                placeholder="digite o nome da tag que deseja"
                                id="tagName"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button onClick={() => addTag(name)}>
                                create
                            </button>   
                        </fieldset>
                        <fieldset className="flex flex-col gap-5 items-center">
                            {tag.map(tag => (
                                <button key={tag.id} onClick={() => addTag(tag.name)}>
                                    {tag.name}
                                </button>
                            ))}
                        </fieldset>
                        {/* <Popover.Close 
                            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                            aria-label="Close"
                        >
                        </Popover.Close> */}
                        <Popover.Arrow className="fill-white"/>
                    </Popover.Content>
                    </Popover.Portal>
            </Popover.Root>
            </div>
        </div>
    )
}