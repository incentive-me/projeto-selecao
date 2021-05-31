import styled from 'styled-components'

export const ProjectListContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;

    h2 {
        margin-bottom: 0;
        padding: 0 1rem;
    }

    @media(min-width: 768px) {
        width: 700px;
    }

    @media(min-width: 1024px) {
        width: 1000px;
    }
`
export const SearchContainer = styled.div`
    width: 100%;
    padding: 1rem;

    input {
        width: 100%;
        max-width: 300px;
        padding: .5rem;

        border: 2px solid #c1c1c1;
        border-radius: .5rem;
    }
    button {
        margin-left: 4px;
        padding: .5rem;

        border: 2px solid #c1c1c1;
        border-radius: .5rem;
        cursor: pointer;
    }
`
