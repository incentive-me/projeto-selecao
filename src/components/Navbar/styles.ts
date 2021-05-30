import styled from 'styled-components'

export const NavbarWrapper = styled.div`
    display: flex;
    justify-content: center;

    padding: .5rem;
    width: 100%;
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    max-width: 1200px;    
    height: 90px;
    padding: .5rem;

    nav {
        display: flex;
    }
`
export const GithubUserAvatar = styled.img`
    width: 90px;
    height: 90px;
    padding: .5rem;

    border-radius: 50%;
`

export const UserInformationContainer = styled.div`
    text-align: end;
    
    button {
        cursor: pointer;
    }
`