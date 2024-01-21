import { Avatar, Button } from '@mui/material'
import Link from 'next/link'
import React, { useRef } from 'react'
import { deepPurple } from '@mui/material/colors'
import { ArrowLeft, CircleDollarSign, LogOut, MenuIcon, Wallet2 } from 'lucide-react'
import { useRouter } from 'next/router'
import useAuthStore from '@/stores/auth.store'
import { useLoadUser } from '@/hooks/useLoadUser'

const routes = {
  navBarRoutes: [
    {
      paths: [
        {
          name: 'Pagamentos',
          path: '/',
          icon: CircleDollarSign,
        },

        {
          name: 'Saldos',
          path: '/saldo',
          icon: Wallet2,
        },
        {
          name: 'Sair',
          path: '/auth/logout',
          icon: LogOut,
        },
      ],
    },
  ],
} as {
  navBarRoutes: {
    name: string
    paths: {
      name: string
      path: string
      icon: any
      disabled?: boolean
    }[]
  }[]
}

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  useLoadUser()
  const router = useRouter()
  const { user } = useAuthStore()

  const menuRef = useRef<HTMLDivElement>(null)

  const handleOpenMenu = () => {
    if (!menuRef.current) return
    const isOpen = menuRef.current.dataset.open === 'true'
    menuRef.current.dataset.open = isOpen ? 'false' : 'true'
  }

  const isActive = (path: string) => {
    const splitPath = path.split('/')

    if (splitPath.length > 2) {
      return router.pathname.includes(path)
    }

    return router.pathname === path
  }
  return (
    <div className={'flex font-sans antialiased'}>
      <nav
        ref={menuRef}
        data-open='false'
        className={`fixed left-[-100%] top-0 z-40 flex h-screen w-full max-w-[300px] flex-col border-r border-zinc-950	
        bg-zinc-900 transition-all duration-300 ease-in-out data-[open=true]:left-0
        xl:sticky xl:left-0 xl:z-0`}
      >
        <div className='flex h-full flex-1 flex-col'>
          <div className='flex min-h-[80px] items-center gap-2 border-b border-zinc-950	 px-6 text-xl font-bold'>
            <span className='text-neutral-100'>Payments</span>
            <Button
              onClick={handleOpenMenu}
              className='absolute right-[-15px] h-8 w-8 p-0 xl:hidden'
            >
              <ArrowLeft />
            </Button>
          </div>
          <div className='flex-1 overflow-y-auto gap-2'>
            {routes?.navBarRoutes.map((route, index) => (
              <React.Fragment key={index}>
                <div className='space-y-4 text-neutral-100 p-4' key={route.name + 'paths'}>
                  {route.paths.map(({ icon: Icon, name, path, disabled }) => (
                    <Link
                      className={`rounded-[8px] w-full flex items-center justify-start gap-2 p-2 ${
                        disabled && 'pointer-events-none opacity-50'
                      }  ${isActive(path) && 'bg-violet-500'}`}
                      href={path}
                      key={path}
                    >
                      <Icon className='h-5 w-5' />
                      {name}
                    </Link>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      <main className='relative col-span-4 flex-1'>
        <header className='sticky left-0 top-0 z-10 flex h-[80px] items-center justify-between border-b  border-zinc-950	 bg-zinc-900 px-6'>
          <div className='flex items-center gap-6'>
            <Button className='h-10 w-10 rounded-full p-0 lg:hidden' onClick={handleOpenMenu}>
              <MenuIcon size={'5'} />
            </Button>
            <p className='text-sm text-neutral-100'>
              <strong className='text-lg text-neutral-100'>
                Bem vindo, <span className='text-violet-500'>{user?.name}</span> !
              </strong>
            </p>
          </div>

          <div className='flex gap-4'>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {user?.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
            </Avatar>
          </div>
        </header>
        <div className='z-0 bg-zinc-100'>{children}</div>
      </main>
    </div>
  )
}

export default Layout
