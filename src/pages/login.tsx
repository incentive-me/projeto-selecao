import { useSession, signIn, signOut } from 'next-auth/client'
import Head from 'next/head'

import Router from 'next/router'

export default function Login() {
    const [session] = useSession()

    function handleSignIn(e) {
        signIn('github', {
            callbackUrl: 'http://localhost:3000'
        })
    }

    return (
        <div>
            <Head>
                <title>Labeled Stars - Login</title>
            </Head>
            <div>
                <div>
                    {!session && <>
                        <p>Signin with Github</p>
                        <button onClick={handleSignIn}>
                            Sign in
                        </button>
                    </>}
                    {session && <>
                        <p>Signed in as <strong>{session.user.email}</strong></p>
                        <button onClick={() => signOut()}>Sign out</button>
                        <button onClick={() => Router.push('/')}>Go Home</button>
                    </>}
                </div>
            </div>
        </div>
    )
}
