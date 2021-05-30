import styled from 'styled-components'

export const ProjectCardWrapper = styled.article`
    padding: 1rem;
    width: 100%;

    @media(min-width: 768px) {
        max-width: 350px;
    }
    @media(min-width: 1024px) {
        max-width: 500px;
    }
`

export const ProjectCardContainer = styled.article`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    height: 100%;
    padding: .5rem;
    
    border: 2px solid black;

`
