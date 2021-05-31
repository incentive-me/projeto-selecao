import { NavbarContainer, NavbarWrapper, GithubUserAvatar, UserInformationContainer } from "./styles";

import { useSession, signIn, signOut } from 'next-auth/client'

export default function Navbar() {
    const [session] = useSession()

    function handleSignIn(e) {
        signIn('github', {
            callbackUrl: 'http://localhost:3000'
        })
    }
    return (
        <NavbarWrapper>
            <NavbarContainer>
                <header>
                    <h1>★ Github Labels</h1>
                </header>
                <nav>
                    {session ? (
                        <>
                            <UserInformationContainer>
                                <p>{session.user.email}</p>
                                <button onClick={() => signOut()}>Sign out</button>
                            </UserInformationContainer>
                            <GithubUserAvatar src={session.user.image} alt="profile" />
                        </>
                    ) : (
                        <>
                            <UserInformationContainer>
                                <p>Signin with Github</p>
                                <button onClick={handleSignIn}>Sign in</button>
                            </UserInformationContainer>
                        </>
                    )}
                </nav>
            </NavbarContainer>
        </NavbarWrapper>
    )
}