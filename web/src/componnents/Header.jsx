import { Github, User } from "lucide-react";

export function Header({ user }) {
    return(
        <header className="w-fill py-6 bg-zinc-900 border-b border-zinc-700/75 shadow">
            <div className="w-full px-5 flex justify-between items-center">
            <h1 className="text-zinc-100 text-2xl flex gap-2 items-center">
                <div className="p-1 bg-zinc-100 rounded-full text-zinc-950">
                <Github size={32}/>
                </div>
                <span className="font-bold">{user.name  ? `Hello, ${user.name}` : 'Welcome'}</span>
            </h1>

            <div className="w-fit min-w-9 min-h-9 max-w-16 p-[2px] bg-zinc-600/10 shadow rounded-full">
               { user ? (
                <img 
                    src={user.avatar_url} 
                    alt="" 
                    className="object-cover rounded-full"
                />
               ) : (
                <User size={32} color="#fff" className="object-cover rounded-full"/>
               )}
                
            </div>
            </div>
        </header>
    )
}