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
    
    border: 2px solid #d1d1d1;
    border-radius: .5rem;

    a {
        color: #2f3e46;
    }

    h3 {
        margin: 0;
    }
    
    p {
        margin-top: .5rem;
        color: #666;
    }
`

export const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: auto;
    
    ul {
        display: flex;
        flex-wrap: wrap;
        
        min-height: 28px;
        margin: .5rem 0;
        padding: 0;
        list-style: none;

        li {
            display: flex;
            justify-content: center;
            align-items: center;

            margin: 2px 4px;
            padding: 4px 8px;

            font-size: 14px;
            border-radius: 16px;
            background: #888;
            color: #fff;


            button {
                display: flex;
                justify-content: center;
                align-items: center;

                width: 15px;
                height: 15px;
                margin-left: .5rem;

                line-height: 0;
                border: none;
                border-radius: 50%;

                cursor: pointer;
            }
        }
    }
`

export const LabelInputContainer = styled.div`
    input {
        width: 180px;
        padding: .5rem;

        border: 2px solid #c1c1c1;
        border-radius: .5rem;
    }

    span {
        margin-left: 4px;
        color: red;
    }
`