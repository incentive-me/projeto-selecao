import styled from 'styled-components'

export const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  grid-template-rows: 60px 220px;
  gap: 8px;
  padding: 0 8px 8px;
  width: 100%;
  margin-left: 24px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.42);
  overflow-y: auto;
  transition: .2s;

  @media(max-width: 700px) {
    margin: 12px 0;
  }
`;

export const AddTagForm = styled.div`
display: grid;
place-items: center;
grid-column: 1/-1;
grid-row: 1/-1;

form { 

  > div {
    display: flex;
    justify-content: space-between;
  }

  input {
    height: 50px;
    width: 340px;
    display: block;
    margin-bottom: 8px;
    padding: 8px;
  }

  button {
    background: green;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-weight: 500;
    padding: 8px 16px;
    font-size: 22px;
    transition: .3s;
    cursor: pointer;
    

    :hover {
      filter: opacity(.85); 
    }

    :last-child {
      background-color: red;
    }
  }
}
`

export const CardRepo = styled.div`
min-height: 220px;
height: 220px;
padding: 12px;
border-radius: 12px;
font-size: 14px;
background-color: lightgrey;
display: grid;
grid-template-rows: 1fr 60px;

a {
  color: #203354;

  :hover {
    font-weight: 500;
  }
}
`

export const Tags = styled.div`
  display: flex;
  position: relative;
  border-top: solid 1px #203354;
  margin-top: 2px ;


  p {
    margin: 0 4px;
    
    button {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    border: 0;
    background-color: red;
    color: #fff;
    font-size: 8px;
    }
  }

`;

export const AddTagButton = styled.button`
background: green;
border: 0;
border-radius: 3px;
color: #fff;
font-weight: 500;
height: 25px;
width: 50px;
position: absolute;
right: 0;
top: -29px;
transition: .3s;
cursor: pointer;

:hover {
  filter: opacity(.85);
}
`